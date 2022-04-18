---
layout: blogdetail
author: Milan Kaucha
title: Django API Permissions
categories: Django
excerpt_separator: <!--more-->
---

Security is an important part of any website but it is doubly important with web APIs. Currently our Blog API allows anyone full access. There are no restrictions; any user can do anything which is extremely dangerous.

<!--more-->

Django REST Framework ships several permission settings that we can use to secure our API. These can be applied at a project-level, a view-level, or at any individual model level.

#### 1. Add log in to the browsable API

Whenever we want to switch between user accounts we'll need to jump into Django admin, log out of one account and log in to another. Each and every time. This is such a common occurrence that Django REST Framework has one-line setting to add log in and log out directly to the browsable API itself.

Within project-level **urls.py** file, add a new URL route that includes **rest_framework.urls**.<br>
The actual route specified can be anything we want, what matters is that **rest_framework.urls** is included somewhere.

We will use the route **api-auth** that matches official documentation.

###### config/urls.py

<pre>
<code>
    from django.contrib import admin
    from django.urls import include, path

    urlpatterns = [
        path('admin/', admin.site.urls),
        path('api/v1/', include('posts.urls')),
        path('api-auth', include('rest_frameworks.urls')),    # new
    ]
</code>
</pre>

Navigate to our browsable API at **http://127.0.0.1:8000/api/v1/**.

![api login](/assets/images/api_login.png)

The name appears on the upper righthand link, click on the link and a dropdown menu with "Log out" appears. Click on it.

That link changes to "Log in" So click on that. We are redirected to Django REST Framework's log in page. Use our **testuser** acoount here.

#### 2. AllowAny

Currently, any annonymous non-authorized user can access our **PostList** endpoint. Even worse, any one has full access to create, edit, update or delete a post!

![api detail logout](/assets/images/api_detail.png)

The reason we can still see the **Post List** endpoint and also the **Detail List** endpoint is that we previously set the project-level permissions on our project ot **AllowAny** in our **config/settings.py** file.

###### config/settings.py

<pre>
<code>
    REST_FRAMEWORK = {
        'DEFAULT_PERMISSION_CLASSES': [
            'rest_framework.permissions.AllowAny',
        ]
    }
</code>
</pre>

#### 3. View-Level Permissions

We want now is to restrict API access to authenticated users. There are multiple palces we could do this:

- project level
- view level
- object level.

Let's start with view level, In our **posts/views.py** file, import **permissions** at the top from Django REST Framework and then add a **permission_classes** field to each view.

###### posts/views.py

<pre>
<code>
    from rest_framework import generics, permission   # new
    from .models import Post
    from .serializers import PostSerializer

    class PostList(generics.ListCreateAPIView):
        permission_classes = (permission.IsAuthenticated,)  # new
        queryset = Post.objects.all()
        serializer_class = PostSerializer

    class PostDetail(generics.RetrieveUpdateDestroyAPIView):
        permission_classes = (permission.IsAuthentcated,)   # new
        queryset = Post.objects.all()
        serializer_class = PostSerializer
</code>
</pre>

Refresh the browsable API at **http://127.0.0.1:8000/api/v1/**.

![post list logged out](/assets/images/post_list.png)

We no longer see our Post List page. Instead we see **HTTP 403 Forbidden** status code since we are not logged in. And also there are no forms in the browsable API to edit.

We will see a similar message with **Post Detail**. Therefore at this point only logged-in users can view our API.

**But if our API grows in complexity, adding a dedicated permission_classes to each view seems repetitive**.

#### 4. Project-Level Permissions

It is much simpler and safer approach to set a strict permissions policy at the project-level and loosen it as needed at the view level.

Fortunately Django REST Framework ships with a number of built-in-project-level permissions setting we can use,

- **AllowAny**: any user, authenticated or not, has full access

- **IsAuthenticated**: only authenticated, registered users have access

- **IsAdminUser**: only admins/superusers have access

- **IsAuthenticatedOrReadOnly**: unauthorized users can view any page, but only authenticated users have write, edit, or delete privileges

Let's switch to **IsAuthenticated** so only authenticated, or logged in, users can view the **API**.

###### config/settings.py

<pre>
<code>
    REST_FRAMEWORK = {
        'DEFAULT_PERMISSION_CLASSES': [
            'rest_framework.permissions.IsAuthenticated',   # new
        ]
    }
</code>
</pre>

Delete the permissions changes we made.

###### posts/views.py

<pre>
<code>
    from rest_framework import generics
    form .models import Post
    from .serializers import PostSerializer

    class PostList(generics.ListCreateAPIView):
        queryset = Post.objects.all()
        serializer_class = PostSerializer

    class PostDetail(generics.RetrieveUpdateDestroyAPIView):
        queryset = Post.objects.all()
        serializer_class = PostSerializer
</code>
</pre>

If we refresth the **Post List** and **Detail List** we will still see the same **403** status code.

#### 5. Custom permissions

A brief recap; we have two users, **testuser** and the **superuser** account.

We want only the author of a specific blog post to be able to edit or delete it; otherwise the blog post should be read-only. So the superuser account should have full CRUD access to individual blog instance, but the regular user testuser should not.

Let's create a new **permissions.py** file in our **posts** app.

###### Command Line

<pre>
<code>
    (blogapi) $ touch posts/permissions.py
</code>
</pre>

Internally, Django REST Framework relies on a **BasePermission** class from which all other permission classes inherit.

###### Souce code of BasePermission

<pre>
<code>
    class BasePermission(object):
        """
        A base class from which all permission classes should inherit.
        """

        def has_permission(self, request, view):
            """
            Return `True` if permission is granted, `False` otherwise.
            """
            return True
            
        def has_object_permission(self, request, view, obj):
            """
            Return `True` if permission is granted, `False` otherwise.
            """
            return True
</code>
</pre>

To create our own custom permission, we will override the **has_object_permission** method. We want to allow read-only for all requests but for any write requests, such as edit or delete, the author must be the same as the current logged-in user.

Here is what our **posts/permissions.py** file looks like:

###### posts/permissions.py

<pre>
<code>
    from rest_framework import permissions

    class IsAuthorOrReadOnly(permissions.BasePermission):
        
        def has_object_permission(self, request, view, obj):
            # Read-only permissions are allowed for any request
            if request.method in permissions.SAFE_METHODS:
                return True

            # Write permissions are only allowed to the author of a post
            return obj.author == request.user
</code>
</pre>

We import **permissions** and then create custom class **IsAuthorOrReadOnly** which extends **BasePermission**. Then we override **has_object_permission**.<br>
If a request contains verbs included in **SAFE_METHODS** - a tuple containing GET, OPTIONS, and HEAD - then it is a read-only request and permission is granted.

Updating the API resources either **create, delete, or edit** functionality, we check if the author of the object which is our blog post **obj.author** mathces the user making the request **request.user**.

Back in the **views.py** file we should import **IsAuthorOrReadOnly** and then we can add **permission_classes** for **PostDetail**.

###### Code

<pre>
<code>
    from rest_framework imports generics
    from .models import Post
    from .permissions import IsAuthorOrReadOnly   # new
    form .serializers import PostSerializer

    class PostList(generics.ListCreateAPIView):
        queryset = Post.objects.all()
        serializer_class = PostSerializer

    class PostDetail(generics.RetrieveUpdateDestroyAPIView):
        permission_classes = (IsAuthorOrReadOnly,)  # new
        queryset = Post.objects.all()
        serializer_class = PostSerializer
</code>
</pre>

![api detail testuser](/assets/images/detail_testuser.png)

We can view **Post Detail** page with **testuser** login since read-only permissions are allowed. However we **can not** make any PUT or DELETE requests due to our custom **IsAuthorOrReadOnly** permission class.

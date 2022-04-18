---
layout: blogdetail
author: Milan Kaucha
title: Django Blog API
categories: Django
excerpt_separator: <!--more-->
---

{% raw %}

Our project is a Blog API using the full set of Django REST Framework features. Let's explore users, permissions, and allow for full CRUD functionality. Also explore viewsets, routers, and documentation.

<!--more-->

#### 1. Initial Set Up

Navigate into our code directory and within it create the project blogapi. Then install Django a new virtual environment and create a new Django project(config) and app for blog entries(posts).

<pre>
<code>
    $ mkdir blogapi && cd blogapi
    $ pipenv install django~=3.1.0
    $ pipenv shell
    (blogapi) $ django-admin startproject config .
    (blogapi) $ python manage.py startapp posts
</code>
</pre>

We've added a new app we need to tell Django about it.

###### config/settings.py

<pre>
<code>
    INSTALLED_APPS = [
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',
    'posts', #new
  ]
</code>
</pre>

Run **migrate** for the first time to sync our database with Django's default settings and the new app.

###### Command Line

<pre>
<code>
    (blogapi) $ python manage.py migrate
</code>
</pre>

#### 2. Model

Let's create a database model which will have five fields: **author, title, body, created_at, and updated_at**.

###### posts/models.py

<pre>
<code>
    from django.db import models
    form django.contrib.auth.models import User

    class Post(models.Model):
        author = models.ForeignKey(User, on_delete=models.CASCADE)
        title = models.CharField(max_length=50)
        body = models.TextField()
        created_at = models.DateTimeField(auto_now_add=True)
        updated_at = models.DateTimeField(auto_now=True)

        def __str__(self):
            return self.title
</code>
</pre>

Now update database by first creating new migration file and running migrate to sync the database with our model changes.

###### Command Line

<pre>
<code>
    (blogapi) $ python manage.py makemigrations posts
    (blogapi) $ python manage.py migrate
</code>
</pre>

We want to view our data in Django's built-in app so lets add it.

###### posts/admin.py

<pre>
<code>
    from django.contrib import admin
    from .models import Post

    admin.site.register(Post)
</code>
</pre>

Then create a superuser account so we can access the admin.

<pre>
<code>
    (blogapi) $ python manage.py createsuperuser
    # ....
    (blogapi) $ python manage.py runserver
</code>
</pre>

Navigate to **http://127.0.0.1:8000/admin/** and log in with superuser credentials and create a new blog post.

#### 3. Django REST Framework

Django REST Framework takes care of transforming our database models into a RESTful API. There are three main steps to this process:

- urls.py file for the URL routes

- serializers.py file to transform the data into JSON

- views.py file to apply logic to each API endpoint

Use **pipenv** to install Django REST Framework.

<pre>
<code>
    (blogapi) $ pipenv install djangorestframework~=3.11.0
</code>
</pre>

Add it to the **INSTALLED_APPS** section of our **config/settings.py** file. <br>
It's also a good idea to explicity set our permissions which by default in Django REST Framework are configured to **AllowAny**.

###### config/settings.py

<pre>
<code>
    INSTALLED_APPS = [
        'django.contrib.admin',
        'django.contrib.auth',
        'django.contrib.contenttypes',
        'django.contrib.sessions',
        'django.contrib.messages',
        'django.contrib.staticfiles',
        'rest_framework',   #new
        'posts',
    ]

    # new
    REST_FRAMEWORK = {
        'DEFAULT_PERMISSIONS_CLASSES': [
            'rest_framework.permissions.AllowAny',
        ]
    }
</code>
</pre>

We need to create our URLs, views, and serializers.

#### 4. URLs

Set URL routes for the actual location of the endpoints. Update the project-leverl **urls.py** file with the **include** import and a new **api/v1/** route for our posts app.

###### config/urls.py

<pre>
<code>
    from django.contrib import admin
    from django.urls import include, path  # new

    urlpatterns = [
        path('admin/', admin.site.urls),
        path('api/v1/', include('posts.urls')),   # new
    ]
</code>
</pre>

It is a good practice to always version your APIs- v1/, v2/, etc - since when we make a large change there may be some lag time before various consumers of the API can also update.<br>
That way we can support a v1 of an API for a period of time while also launching a new, updated v2 and avoid breaking other apps that rely on your API back-end.

For basic projects like this one, its preferable to avoid **api** app that is just used for routing.

Create our **posts** app **urls.py** file.

###### Command Line

<pre>
<code>
    (blogapi) $ touch posts/urls.py
</code>
</pre>

And then include the code below:

###### posts/urls.py

<pre>
<code>
    from django.urls import path
    from .views import PostList, PostDetail

    urlpatterns = [
        path('&lt;int:pk&gt;/', PostDetail.as_view()),
        path('', PostList.as_view()),
    ]
</code>
</pre>

All blog routes will be at **api/v1/** so our **PostList** view has empty string '' will be at **api/v1/** and the **PostDetail** view at **api/v1/#** where # represents the primary key of the entry.

#### 5. Serializers

Create a new **serializers.py** file in our **posts** app.

###### Command Line

<pre>
<code>
    (blogapi) $ touch posts/serializers.py
</code>
</pre>

The serializer not only transforms data into JSON, it can specify which fields to include or exclude. In our case we will include **id** field Django automatically adds to database models but we will exclude the **updated_at** field by not including it in our fields.

The ability to include/exclude fields in our API which is a remarkable feature.

###### posts/serializers.py

<pre>
<code>
    from rest_framework import serializers
    from .models import Post

    class PostSerializer(serializers.ModelSerializer):
        class Meta:
            fields = ('id', 'author', 'title', 'body', 'created_at')
            model = Post
</code>
</pre>

We have imported Django REST Framework's **serializers** class and our own models. Then we created a **PostSerializer** and added a **Meta** class where we specified which fields to include and explicitly set the model to use.

#### 6. Views

The final step is to create our views. Django REST Framework has several generic views that are helpful. Such as:

- **ListAPIView** to create a **read-only** endpoint collection

- **RetrieveAPIView** for a **read-only** single endpoint

- **ListCreateAPIView** which is similar to the **ListAPIView** but allows for writes.

- **RetriveUpdateDestroyAPIView** which allows read, update or delete single endpoints.

Update the **views.py** file as follows.

###### posts/views.py

<pre>
<code>
    from rest_framework import generics
    from .models import Post
    from .serializers import PostSerializer

    class PostList(generics.ListCreateAPIView):
        queryset = Post.objects.all()
        serializer_class = PostSerializer

    class PostDetail(generics.RetrieveUpdateDestroyAPIView):
        queryset = Post.objects.all()
        serializer_class = PostSerializer
</code>
</pre>

Its preety amazing that all we have to do is update our generic view to radically change the behaviors of a given API endpoint. This is the advantage of using a full-featured framework like Django REST Framework.

#### 7. Browsable API

Start up the local server to interact with our API.

<pre>
<code>
    (blogapi) $ python manage.py runserver
</code>
</pre>

Then got to **http://127.0.0.1:8000/api/v1/** to see the Post List endpoint.

![post list](/assets/images/v1.png)

Go to **http://127.0.0.1:8000/api/v1/1/**.

![post detail](/assets/images/v1_1.png)

We can see in the header that GET, PUT, PATCH, and DELETE are supported but not POST. And in fact we can use the HTML form below to make changes or even use the red "DELETE" button to delete the instance.

{% endraw %}

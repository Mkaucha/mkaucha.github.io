---
layout: blogdetail
author: Milan Kaucha
title: Django REST Framework
categories: Django
excerpt_separator: <!--more-->
---

{% raw %}

Django REST framework is a powerful and flexible toolkit for building Web APIs.

<!--more-->

#### 1. Django REST Framework

###### Command Line

<pre>
<code>
    (library) $ pienv install djangorestframework~=3.11.0
</code>
</pre>

Add **rest_framework** to the **INSTALLED_APPS** config in our **config/settings.py** file.

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
        'rest_framework',
        'books',
    ]
</code>
</pre>

Ultimately, our API will expose a single endpoint that lists out all books in JSON. So we will need a **new URL route**, a new view, and a new **serializer file**.

There are multiple ways we can organize these files; one is to create a dedicated **api** app. So, that all API-specific files for the entire project will live in a dedicated **api** app.

Let's create a new **api** app.

<pre>
<code>
    (library) $ python manage.py startapp api
</code>
</pre>

Then add it to **INSTALLED_APPS**.

###### config/settings.py

<pre>
<code>
    INSTALLED_APPS = [
        'books',
        'api.apps.ApiConfig',
        'rest_framework',
        'django.contrib.admin',
        'django.contrib.auth',
        'django.contrib.contenttypes',
        'django.contrib.sessions',
        'django.contrib.messages',
        'django.contrib.staticfiles',
    ]
</code>
</pre>

The **api** app will not have its own database models so there is no need to create a migration file and run migrate to update the database.

#### 2. URLs

At the project-level we need to include the **api** app and configure **URL route**, which will be **api/**.

###### config/urls.py

<pre>
<code>
    from django.contrib import admin
    from django.urls import path, include

    urlpatterns = [
        path('admin/', admin.site.urls),
        path('api/', include('api.urls')),
        path('', include('books.urls')),
    ]
</code>
</pre>

Create a **urls.py** file within the **api** app.

<pre>
<code>
    (library) $ touch api/urls.py
</code>
</pre>

And update is as:

###### api/urls.py

<pre>
<code>
    from django.urls import path
    from .views import BookAPIView

    urlpatterns = [
        path('', BookAPIView.as_view()),
    ]    
</code>
</pre>

#### 3. Views

The **views.py** file which relies on Django REST framework's built-in generic class views which mimic traditional Django's generic class-based views in format which is not the same thing.

###### api/views.py

<pre>
<code>
    from rest_framework import generics
    from books.model import Book
    from .serializers import BookSerializer

    class BookAPIView(generics.ListAPIView):
        queryset = Book.objects.all()
        serializer_class = BookSerializer
</code>
</pre>

We import Django REST Framework's generic class of views, the models of our books app, and serializers from our api app.

We create a BookAPIView that uses ListAPIView to create a read-only endpoint for all book instances.

The only two steps required in our view are to specify the **queryset** which is all available books, and then the **serializer_class** which will be **BookSerializer**.

#### 4. Serializers

A serializer translates data into a format that is easy to consume over the internet, typically JSON, and is displayed at an API endpoint.

Make a **serializers.py** file within our **api** app.

###### Command Line

<pre>
<code>
    (library) $ touch api/serializers.py
</code>
</pre>

Then update it as:

###### api/serializers.py

<pre>
<code>
    from rest_framework import serializers
    from books.models import Book

    class BookSerializer(serializers.ModelSerializer):
        class Meta:
            model = Book
            fields = ('title', 'subtitle', 'author', 'isbn')
</code>
</pre>

We import Django REST Framework's **serializers** class and the **Book** mdoel from our books app. We extend Django REST Framework's **ModelSerializer** into a **BookSerializer** class that specifies our database model **Book** and the **database fields** we wish to expose:

##### That's it! We're done.

#### 5. cURL

We want to see that our API endpoints looks like. We know it should return JSON at the URL **http://127.0.0.1:8000/api/**.<br>
**Ensure that our local Django server is running.**

We can use the popular **cURL** program to execute HTTP requests via the command line. All we need for a basic GET request it to specify curl and the URL we want to call.

###### Command Line

<pre>
<code>
    $ curl http://127.0.0.1:8000/api/
    [
        {
            "author" : "William S. Vincent",
            "isbn" : "9843142132",
            "subtitle" : "Build Websites with Python and Django",
            "title" : "Django For Beginners"
        }
    ]

</code>
</pre>

{% endraw %}

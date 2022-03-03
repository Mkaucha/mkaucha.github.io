---
layout: django
author: Milan Kaucha
title: Django Getting Started
categories: Django
excerpt_separator: <!--more-->
---

Before you can start learning how to use Django, you must first install some software on your computer.

<!--more-->

#### 1. Initial Setup

These files are:

- manage.py, a command-line utility that lets you interact with your Django project in various ways.
- init.py, an empty file that tells Python that this directory should be considered a Python package.
- settings.py, will tell you all about how settings work.
- urls.py, the URL declarations for this Django project.
- wsgi.py, an entry-point for WSGI-compatible web servers to serve your project.

##### Django settings

INSTALLED_APPS settings at the top of the file holds the names of all Django applications that are activated in Django instance. By default, INSTALLED_APPS contains the following apps, all of which come with Django:

- django.contrib.admin: The admin site.
- django.contrib.auth: An authentication system.
- django.contrib.contenttypes: A framework for content types.
- django.contrib.sessions: A session framework.
- django.contrib.messages: A messaging framework.
- django.contrib.staticfiles: A framework for managing static files.

Some of these applications makes use of at least one database table, so we need to create the tables in the database before we can use them. To do that, run the following command:

**python manage.py migrate**

The migrate command looks at the INSTALLED_APPS setting and creates any necessary database tables according to the database settings in settings.py file.

##### The development server

Run the following commands:

**python manage.py runserver**

With this you've started the Django development server, a lightweight web server written purely in Python.

> Note
>
> Do not use this server in anything resembling a production environment. It's intended only for use while developing.

##### The Model-View-Controller (MVC) design pattern

MVC has been around as a concept for a long time, but has seen exponential growth since the advent of the internet because it is the best way to design client-server applications.

- The **Model(M)** is a model or representation of your data. It's not the actual data, but an interface to the data. The model allows you to pull data from your database without knowing the intricacies of the underlying database. The model usually also provides an abstraction layer with your database, so that you can use the same model with multiple databases.

- The **View(V)** is what you see. It's the representation layer for your model. The view is what you see in the browser for a web app, or the UI for desktop app. The view also provides an interface to collect user input.

- The **Controller(C)** controls the flow of information between the model and the view. It uses programmed logic to decide what information is pulled from the database via the model and what information is passed to the view. It also gets information from the user via the _view_ and implements business logic: either by changing the view, or modifying data through the model, or both.

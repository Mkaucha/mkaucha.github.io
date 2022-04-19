---
layout: blogdetail
author: Milan Kaucha
title: Django API User Authentication
categories: Django
excerpt_separator: <!--more-->
---

Authentication is the process by which a user can register for a new account, log in with it, and log out.

Django website authentication is simpler and involves a session based cookie pattern. The HTTP is a stateless protocol so there is no built-in way to remember if a user is authenticated from one request to the next. Each time a user requests a restricted resource it must verify itself.

The solution is to pass along a unique identifier with each HTTP request. Django REST Framework ships with four different built-in authentication options:

- basic
- session
- token
- and default

And there are many more third-party packages that offer additional features like JSON Web Tokens (JWTs).

<!--more-->

#### 1. Basic Authentication

The most common form of HTTP authentication is known as **Basic Authentication**.

The complete request/response flow looks like this:

1. Client makes an HTTP request.

2. Server responds with an HTTP response containing a **401(Unauthorized)** status code and **WWW-Authenticate** HTTP header with details on how to authorize.

3. Client sends credentials back via the **Authorization** HTTP header.

4. Server checks credentials and responds with either **200 OK** or **403 Forbidden** status code.

Once approved, the client sends all future requests with the **Authorization** HTTP header credentials.

###### Diagram

![basic authentication](/assets/images/authorization_http.png)

The credentials sent are the uncrypted base64 encoded version of **&lt;username&gt;:&lt;password&gt;**. So in this case, this is **milan:password123** which with base64 encoding d3N2OnBhc3N3b3JkMTIz.

The primary advantage of this approach is its simplicity.<br>
There are several major downsides. First, on every single request the server must look up and verify the username and password, which is inefficient.
Second, user credentials are being passed in clear text-not encrypted at all-over the internet which is incredibly insecure.

Basic authentication should **only** be used via **HTTPS**, the secure version of HTTP.

#### 2. Session Authentication

Django have long used an alternative authentication scheme that is combination of **sessions and cookies**. The client authenticates with its credentials(username/password) and then receives a **session ID** from the server which is stored as a **cookie**. This **session ID** is then passed in the header of every future HTTP request.

When the session ID is passed, the server uses it to look up session object containing all available information for a given user, including credentials.

This approach is stateful because a record must be kept and maintained on both the server(the session object) and the client(the session ID).

Let's review the basic flow:

1. A user enters their log in credentials(typically username/password).

2. The server verifies the credentials are correct and generates a session object that is then stored in the database.

3. The server sends the client a session ID - not the session object itself- which is stored as a cookie on the browser.

4. On all future request the session ID is included in HTTP header and, if verified by the database, the request proceeds.

5. Once a user logs out of an application, the session ID is destroyed by both the client and server.

6. If the user later logs in again, a new session ID is generated and stored as a cookie on the client.

The advantage of this approach is that it is more secure since user credentials are only sent once, not on every request/response cycle as **Basic Authentication**. It is also more efficient since the server does not have to verify the user's credentials each time.

However, there are several downsides. First, a session ID is only valid within the browser where log in was performed; it will not work across multiple domains.

Second, the session object must be kept up-to-date which can be challenging in large sites with multiple servers.

Third, the cookies is sent out for every single request, even those that don't require authentication, which is inefficient.

As a result, it is generally not advised to use a session-based authentication scheme for any API that will have multiple front-ends.

#### 3. Token Authentication

This is the most popular approach in recent years due to the rise of single page applications.

Token-based authentication is **stateless**: once a client sends the initial user credentials to the server, a unique token is generated and then stored by the client as either a **cookie** or in **local storage**.

This token is then passed in the header of each incomming HTTP request and the server uses it to verify that a user is authenticated. The server itself does not keep a record of the users, just whether a token is valid or not.

> Cookies vs localStorage
>
> Cookies are used for reading **server-side** information. They are smaller(4KB) in size and automatically sent with each HTTP request.
>
> LocalStorage is designed for **client-side** information. It is much larger (5120KB) and its contents are not sent by default with each HTTP request.
>
> Tokens stored in both cookies and localStorage are vulnerable to XSS attacks. The current best practice is to store tokens in cookie with the **httpOnly** and **Secure** cookie flags.

![token authentication](/assets/images/token_auth.png)

There are multiple benefits to this approach. Since tokens are stored on the client, scaling the servers to maintain up-to-date session objects is no longer required. Tokens can be shared among multiple fron-ends; the same token can represent a user on a website and the same user on a mobile app.

A potential downside is that tokens can grow quite large. A token contains all user information and are sent on every request, managing its size can became a performance issue.

Django REST Frameworks built-in **TokenAuthentication** is quite basic. As a result, it does not support setting tokens to expire, also generates one token per user, So a user on a website and then later a mobile app will use the same token.<br>
Since information about the user is stored locally, this can cause problems with maintaining and updating two sets of client information.

> JSON Web Tokens(JWTs):
>
> JWTs are a new, enhanced version of tokens that can be added to Django REST Framework via several third-party packages. JWTs have ability to generate unique client tokens and token expiration. They can be generated on the server or with a third-party service like **Auth0**. Also it can be encrypted which makes them safer to send over unsecured HTTP connections.

#### 4. Default Authentication

The **DEFAULT_AUTHENTICATION_CLASSES** are set by default so let's explicitly add both **SessionAuthentication** and **BasicAuthentication** to our **config/settings.py** file.

###### config/setting.py

<pre>
<code>
    REST_FRAMEWORK = {
      'DEFAULT_PERMISSION_CLASSES': [
          'rest_framework.permissions.IsAuthenticated',
      ],
      'DEFAULT_AUTHENTICATION_CLASSES': [
          'rest_framework.authentication.SessionAuthentication',
          'rest_framework.authentication.BasicAuthentication'
      ],
    }
</code>
</pre>

Sessions are used to power Browsable API and the ability to log in and log out of it. BasicAuthentication is used to pass session ID in the HTTP headers for the API itself.

#### 5. Implementing token authentication

We need to update our authentication system to use tokens.

###### config/settings.py

<pre>
<code>
    REST_FRAMEWORK = {
        'DEFAULT_PERMISSION_CLASSES': [
            'rest_framework.permissions.IsAuthenticated',
        ],
        'DEFAULT_AUTHENTICATION_CLASSES': [
            'rest_framework.authentication.SessionAuthentication',
            'rest_framework.authentication.TokenAuthentication',  # new
        ],
    }
</code>
</pre>

We keep **sessioinAuthentication** since we still need it for our Browsable API, but now use tokens to pass authentication credentials back and forth in our HTTP headers.

We also need to add the **authtoken** app which generates the tokens on the server. It comes included with Django REST Framework but must be added to our INSTALLED_APPS setting:

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
        'rest_framework.authtoken',   # new
        'posts',
    ]
</code>
</pre>

Since we have made changes to our **INSTALLED_APPS** we need to sync our database.

###### Command Line

<pre>
<code>
    (blogapi) $ python manage.py migrate
    (blogapi) $ python manage.py runserver
</code>
</pre>

The tokens are only generated after there is an API call for a user to log in.

#### 6. Endpoints

We also need to create endpoints so users can log in and log out. We could create a dedicated users app for this purpose and then add our own urls, views, and serializers.

We will use **dj-rest-auth** in combination with **django-allauth** to simplify things.

#### 7. dj-rest-auth

First we will add log in, log out and password reset API endpoints. These come out of the box with the popular dj-rest-auth package.

<pre>
<code>
    (blogapi) $ pipenv install dj-rest-auth==1.1.0
</code>
</pre>

Add the new app to the **INSTALLED_APPS** config in our **config/settings.py** file.

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
        'rest_framework.authtoken',
        'dj_rest_auth',     # new
        'posts',
    ]
</code>
</pre>

Update our **config/urls.py** file with the **dj_rest_auth** package.<br>
We are setting the URL routes to **api/v1/dj-rest-auth**. Make sure to note that URLs should have a dash.

###### config/urls.py

<pre>
<code>
    from django.contrib import admin
    from django.urls import include, path

    urlpatterns = [
        path('admin/', admin.site.urls),
        path('api/v1/', include('posts.urls')),
        path('api-auth/', include('rest_framework.urls')),
        path('api/v1/dj-rest-auth/', include('dj_rest_auth.urls')),  # new
    ]
</code>
</pre>

Now we can spin up the server to see what **dj-rest-auth** has provided.

###### Command Line

<pre>
<code>
    (blogapi) $ python manage.py runserver
</code>
</pre>

We have a working log in endpoint at **http://127.0.0.1:8000/api/v1/dj-rest-auth/login/**.

![api login endpoint](/assets/images/api_login_endpoint.png)

We have a log out endpoint at **http://127.0.0.1:8000/api/v1/dj-rest-auth/logout/**.

![api logout endpoint](/assets/images/api_logout_endpoint.png)

There is also endpoint for password reset, which is located at **http://127.0.0.1:8000/api/v1/dj-rest-auth/password/reset**.

![api password reset endpoint](/assets/images/api_passwordreset_endpoint.png)

And for password reset confirmed, which is located at **http://127.0.0.1:8000/api/v1/dj-rest-auth/password/reset/confirm**

![api passwordresetconfirm endpoint](/assets/images/api_passwordresetconfirm_endpoint.png)

#### 8. User Registration

Traditional Django does not ship with build in views or URLs for user registration and neither does Django REST Framework.

A popular approach it to use the third-party package **django-allauth** which comes with user registration as well as a number of additional features to the Django auth system such as social authentication.

###### Command Line

<pre>
<code>
    (blogapi) $ pipenv install django-allauth~=0.42.0
</code>
</pre>

Update our **INSTALLED_APPS** setting.

- django.contrib.sites

- allauth

- allauth.account

- allauth.socialaccount

- dj_rest_auth.registration

Make sure to also include **EMAIL_BACKEND** and **SITE_ID**. It's common to add additional configs like that at the bottom.

###### config/setting.py

<pre>
<code>
    INSTALLED_APPS = [
        'django.contrib.admin',
        'django.contrib.auth',
        'django.contrib.contenttypes',
        'django.contrib.sessions',
        'django.contrib.messages',
        'django.contrib.staticfiles',
        'django.contrib.sites',     # new
        'rest_framework',  
        'rest_framework.authtoken',
        'allauth',      # new
        'allauth.account',  # new
        'allauth.socialaccount',    # new
        'dj_rest_auth',
        'dj_rest_auth.registration',
        'posts',
    ]

    EMAIL_BACKEND = 'django.core.mail.backends.console.EmailBackend'    # new

    SITE_ID = 1     # new
</code>
</pre>

The email back-end config is needed since by default an email will be sent when a new user is registered, asking them to confirm their account.

Rather than set up an email server, we will output the emails to the console with the **console.EmailBackend** setting.

**SITE_ID** is part of the built-in Django "sites" framework, which is a way to host multiple websites from the same Django project.

Since, we've added new apps so it's time to update the database.

###### Command Line

<pre>
<code>
    (blogapi) $ python manage.py migrate
</code>
</pre>

Then add a new URL route for registration.

###### config/urls.py

<pre>
<code>
    from django.contrib import admin
    from django.paths import include, path

    urlpatterns = [
        path('admin/', admin.site.urls),
        path('api/v1/', include('posts.urls')),
        path('api-auth/', include('rest_framework.urls')),
        path('api/v1/dj-rest-auth/', includes('dj_rest_auth.urls')),
        path('api/v1/dj-rest-auth/registration/', include('dj_rest_auth.registration.urls')),   # new
    ]
</code>
</pre>

There is now a user registration endpoint at **http://127.0.0.1:8000/api/v1/dj-rest-auth/registration/**.

![api register endpoint](/assets/images/api_register_endpoint.png)

#### 9. Tokens

To make sure everything works, create a third user account via the browsable API endpoint.

We will get the status code **HTTP 201 Created** at the top and the return value **key** is the auth token for this new user.

![api auth key](/assets/images/api_auth_key.png)

If we look at the command line console, an email has been automatically generated by **django-allauth**.

![api console](/assets/images/api_console.png)

Switch over to the Django admin in our web browser at **http://127.0.0.1:8000/admin/** with superuser account. Then click on the link for **Tokens** at the top.

![api token](/assets/images/api_token.png)

A token has been generated by Django REST Framework for the **testuser2** user. As additional users are created via the API, their tokens will appear here too.

![api auth login](/assets/images/api_auth_login.png)

In our front-end framework, we would need to capture and store this **token**. Traditionally this happens on the client, either in **localStorage** or as a **cookie**, and then all future requests include the token in the header as a way to authenticate the user.

> Note:
>
> There are additional security concerns on this topic so we should take care to implement the best practices of our fron-end framework of choice.

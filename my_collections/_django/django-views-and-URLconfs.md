---
layout: django
author: Milan Kaucha
title: Django Views and URLconfs
categories: Django
excerpt_separator: <!--more-->
---

With Django, we specify two key pieces of information about the web page: its contents and its URL in a different way. The contents of the page are produced by a **view function**, and the URL is specified in a **URLconf**.

<!--more-->

##### 1. Your first view

<pre>
<code>
    from django.http import HttpResponse

    def hello(response):
        return HttpResponse("Hello world")
</code>
</pre>

Step through this code one line at a time:

- First, we import the class **HttpResponse**, which lives in the **django.http** module.
- Next, we define a function called **hello** - the view function.

Each view function takes at least one parameter, called **request** by convention. This is an object that contains information about the current web request that has triggered this view, and is an instance of the class django.HttpRequest.

The function is a simple one-liner: it merely returns an **HttpResponse** object that has been instantiated with the text **Hello world**.

##### 2. Your first URLconf

To hook a view function to a particular URL with Django, we use a URLconf. A URLconf is like a table of contents for Django-powered web site. Basically, its a mapping between URLs and the view functions that should be called for those URLs.

For example, when somebody visits the URL /foo/, call the view function foo_view(), which lives in the Python module views.py. **django-admin startproject** script created URLconf for you automatically: the file **urls.py**.

###### urls.py

<pre>
<code>
    """mysite URL Configuration
    The urlpatterns list routes URLs to views. For more information please
    see:
        https://docs.djangoproject.com/en/1.8/topics/http/urls/
    Examples:
    Function views
        1. Add an import: from my_app import views
        2. Add a URL to urlpatterns: url(r'^$', views.home, name='home')
    Class-based views
        1. Add an import: from other_app.views import Home
        2. Add a URL to urlpatterns: url(r'^$', Home.as_view(), name='home')
    Including another URLconf
        1. Add an import: from blog import urls as blog_urls
        2. Add a URL to urlpatterns: url(r'^blog/', include(blog_urls))
    """

    from django.conf.urls import include, url
    from django.contrib import admin

    urlpatterns = [
        url(r'^admin/', include(admin.site.urls)),
    ]

</code>
</pre>

###### Essence of a URLconf:

<pre>
<code>
    from django.conf.urls import include, url
    from django.contrib import admin

    urlpatterns = [
        url(r'^admin/', include(admin.site.urls)),
    ]
</code>
</pre>

Step through this code one line at a time:

- The first line imports two functions from the **django.conf.urls** module:<br>
  **include** which allows you to include a full Python import path to another URLconf module, and **url** which uses a regular expression to pattern match the URL in your browser to a module in your Django project.

- The second line calls the function **admin** from the **django.contrib** module. This function is called by the **include** function to load the URLs for the Django admin site.

- The third line is **urlpatterns** - a simple list of url() instances.

Django expects to find the variable **urlpatterns** in your URLconf module. This variable defines the mapping between URLs and the code that handles those URLs.

To add a URL and view to the URLconf, just add a mapping between URL pattern and the view function.

<pre>
<code>
    from django.conf.urls import include, url
    from django.contrib import admin
    from mysite.views import hello

    urlpatterns = [
        url(r'^admin/', include(admin.site.urls)),
        url(r'^hello/$', hello),
    ]
</code>
</pre>

We made two changes here:

- First, we imported the hello view from its module– **mysite/views.py**, which translates into **mysite.views** in Python import syntax.

- Next, we added the line **url(r'^hello/$', hello)**, to **urlpatterns**. This line is referred to as a URLpattern. The **url()** function tells Django how to handle the URL that you are configuring. The first argument is a pattern matching string and the second argument is the view function to use for that pattern.

The **r** character in front of the regular expression string tells Python that the string is a **raw string** - it's contents should not interpret backslashes.

In a nutshell, we just told Django that any request to the URL **/hello/** should be handled by the **hello** view function.

Although we want to match URL /hello/, the pattern looks a bit different than that. Here's why:

- Django removes the slash from the front of every incoming URL before it checks the URL patterns. This means our URL pattern doesn't include the leading slash in **/hello/**.

- The pattern includes a caret (^) and a dollar sign ($). These are regular expression characters that have a special meaning: the caret means **require that the pattern matches the start of the string**, and the dollar sign means **require that the pattern matches the end of the string**.

By default, any request to a URL that doesn't match a URLpattern and doesn't end with a slash will be redirected to the same URL with a trailing slash.

> Note
>
> We've passed the hello view function as an object without calling the function. This is a key feature of Python: functions are first-class objects, which means you can pass them around just like any other variables.

##### 3. Regular Expression

Regular expressions (or regexes) are a compact way of specifying patterns in text. Django URLconfs allow arbitary regexes for powerful URL matching. Here's the list of common regex symbols.

- **. (dot)**: Any single character

- **\d**: Any single digit

- **[A-Z]**: Any character between A and Z (uppercase)

- **[a-z]**: Any character between a and z (lowercase)

- **[A-Za-z]**: Any character between a and z (case-insensitive)

- **+**: One or more of the previous expression (for example, \d+ matches one or more digits)

- **[^/]+**: One or more characters until (and not including) a forward slash

- **?**: Zero or one of the previous expression (for example, \d? matches zero or one digits)

- **\***: Zero or more of the previous expression (for example, \d\* matches zero, one or more than one digit)

- **{1,3}**: Between one and three (inclusive) of the previous expression (for example, \d{1,3} matches one, two or three digits)

##### 4. A quick note about 404 errors

Django displays **Page not found** message if you requested a URL that's not defined in your URLconf.

The utility of this page goes beyond the basic 404 error message. It also tells you precisely which URLconf Django used and every pattern in that URLconf.

> Note
>
> If this were a production site deployed live on the Internet, you wouldn't want to expose that information to the public. For that reason, this **Page not found** page is only displayed if your Django project is in **debug mode**.

##### 5. A quick note about the site root

If you view the site root - **http://127.0.0.1:8000/**. Django doesn't magically add anything to the site root; that URL is not special-cased in any way.

It's up to you to assign it to a URLpattern, just like every other entry in your URLconf.

When you're ready to implement a view for the site root, use the URLpattern ^$, which matches an empty string. For example:

<pre>
<code>
    from mysite.views import hello,my_homepage_view

    urlpatterns = [
        url(r'^$', my_homepage_view),
    # ...
</code>
</pre>

##### 6. How Django processes a request

When you run **"python manage.py runserver"**, the script looks for a file called settings.py in the inner **mysite** directory which was automatically created by the script **"django-admin startproject mysite"**. This **settings.py** file contains all sorts of configuration for particular Django project, all in uppercase: **TEMPLATE_DIRS, DATABASES**, and so on. The most import setting is called **ROOT_URLCONF**. **ROOT_URLCONF** tells Django which Python module should be used as the URLconf for this web site.

###### mysite/setting.py

<pre>
<code>
    ROOT_URLCONF = 'mysite.urls'
</code>
</pre>

This corresponds to the file **mysite/urls.py**. When a request comes in for a particular URL - say, a request for **/hello/** - Django loads the URLconf pointed to by the **ROOT_URLCONF** setting. Then it checks each of the URL patterns in that URLconf, in order, comparing the requested URL with the patterns one at a time, until it finds one that matches.

When it finds one that matches, it calls the view function associated with the pattern, passing it an **HttpRequest** object as the first parameter. A view function must return and **HttpResponse**.

Once it does this, Django does the rest, converting the Python object to a proper web response with the appropriate HTTP headers and body (i.e. the content of the web page).

##### 7. Your second view: dynamic content

Let's create something more dynamic - a web page that displays current date and time. It doesn't involve a database or any user input - just the output of the server's internal clock. This view need to do two things: calculate the current time and date, and return an **HttpResponse** containing that value. Python includes a **datetime** module for calculating dates. Here's how to use it:

<pre>
<code>
    >>> import datetime
    >>> now = datetime.datetime.now()
    >>> now
    datetime.datetime(2022, 3, 4, 13, 47, 58, 856144)
    >>> print (now)
    2022-03-04 13:47:58.856144
</code>
</pre>

To make a Django view that displays the current date and time, we just need to hook this **datetime.datetime.now()** statement into view and return an **HttpResponse**. Here's what views.py looks like:

<pre>
<code>
    form django.http import HttpResponse
    import datetime

    def hello(request):
        return HttpResponse("Hello World")
    
    def current_datetime(request):
        now = datetime.datetime.now()
        html = "< html >< body >It is now %s.< /body >< /html >" % now
        return HttpResponse(html)
</code>
</pre>

Step through changes we've made to **views.py**

- We've added an **import datetime** to the top of the module, so we can calculate dates.

- The new **current_datetime** function calculates the current date and time, as a **datetime.datetime** object, and stores that as the local variable **now**.

- The second line of code within the view contructs an HTML response using Python's **format-string** capability. The **%s** within the string is a placeholder, and the percetn sign after the string means Replace the **%s** in the following string with the value of the variable **now**.<br>
  The **now** variable is technically a **datetime.datetime** object, not a string, but the %s format character converts it to its string representation, which is something like "2022-03-04 13:47:58.856144".

- Finally, the view returns an HttpResponse object that contains the generated response.

After this, add the URL pattern to **urls.py** to tell Django which URL should handle this view. Something like **/time/** would make sense:

<pre>
<code>
    from django.conf.urls import include, url
    from django.contrib import admin
    from mysite.views import hello, current_datetime

    urlpatterns = [
        url(r'^admin/', include(admin.site.urls)),
        url(r'^hello/$', hello),
        url(r'^time/$', current_datetime),
    ]
</code>
</pre>

We've made two changes. First, we imported the **current_datetime** function at the top. Second, and more importantly, we added URL pattern mapping the URL **/time/** to that new view.

##### 7. URLconfs and loose coupling

Key philosophy behind URLconfs and behind Django in general: the principle of loose coupling. Simply put, loose coupling is a software development approach that values the importance of making pieces interchangeable. If tow pieces of code are loosely coupled, then changes made to one of the pieces will have little or no effect on the other.

In a Django web application, the URL definitions and the view functions they call are loosely coupled; i.e. the decision of what the URL should be for a given function, and the implementation of the function itself, reside in two separate places.

For example, consider our **current_datetime** view. If we wanted to change the URL for the application - say, to move it from **/time/** to **/current-time/** - we could make a quick change in URLconf, without worrying about the view itself. <br>
Similary, if we want to change the view function - altering its logic - we could do that without affecting the URL to which the function is bound.

In this example, our **current_datetime** is available at two URLs.

<pre>
<code>
    urlpatterns = [
        url(r'^admin/', include(admin.site.urls)),
        url(r'^hello/$', hello),
        url(r'^time/$', current_datetime),
        url(r'^another-time-page/$', current_datetime),
    ]
</code>
</pre>

URLconfs and views are loose coupling in action.

##### 8. Your third view: dynamic URLs

Let's create a third view that displays the current date and time offset by a certain number of
hours. The goal is to craft a site in such a way that the page **/time/plus/1**, the page **/time/plus/2/** and the page **/time/plus/3** displays the date/time hours into the future.

<pre>
<code>
    # Bad Code
    urlpatterns = [
        url(r'^time/$', current_datetime),
        url(r'^time/plus/1/$', one_hour_ahead),
        url(r'^time/plus/2/$', two_hours_ahead),
        url(r'^time/plus/3/$', three_hours_ahead),
    ]

    # Use wildcard patterns
     urlpatterns = [
         # ...
        url(r'^time/plus/\d{1,2}/0$', hours_ahead),
         # ...
    ]
    
</code>
</pre>

With that taken care of, let's write the **hours_ahead** view.

<pre>
<code>
    from django.http import Http404, HttpResponse
    import datetime

    def hours_ahead(request, offset):
        try:
            offset = int(offset)
        expect ValueError:
            raise Http404()
        dt = datetime.datetime.now() + datetime.timedelta(hours=offset)
        html = "< html >< body >In %s hour(s), it will be %s. < /body >< /html >" % (offset, dt)
        return HttpResponse(html)
</code>
</pre>

Take a close look at this code.<br>
The view function, **hours_ahead**, takes two parameter: **request** and **offset**:

- **request** is an **HttpRequest** object, Remember that, each view always takes HttpRequest object as its first parameter.

- **offset** is the string captured by the parentheses in the URL pattern. For example, if the requested URL were **/time/plus/3/**, then offset would be the string '3'.

> Note
>
> The captured values will always be Unicode objects, not integers, even if the string is composed of only digits, such as '21'.

The first thing we do within the function is call **int()** on **offset**. This converts the Unicode sting value to an integer.

Python will raise a **ValueError** execption if you call **int()** on a value that cannot be converted to an integer, such as the string **foo**. If we encounter the **ValueError**, we raise the exception **django.http.Http404**, which results in a **404 Page not found** error.

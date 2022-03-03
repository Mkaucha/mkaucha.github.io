---
layout: django
author: Milan Kaucha
title: Django Views and URLconfs
categories: Django
sub-categories: Scope and Closure
---

##### Your first view

<pre>
<code>
    from django.http import HttpResponse

    def hello(response):
        return HttpResponse("Hello world")
</code>
</pre>

Step through this code one line at a time:

- First, we import the class _HttpResponse_, which lives in the _django.http_ module.
- Next, we define a function called _hello_ - the view function.

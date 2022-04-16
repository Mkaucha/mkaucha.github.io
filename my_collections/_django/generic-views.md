---
layout: blogdetail
author: Milan Kaucha
title: Generic Views
categories: Django
excerpt_separator: <!--more-->
---

{% raw %}
Django's **generic views** take certain common idioms and patterns found in view developmenent and abstract them so that we can quickly write common views of data without having to write too much code.

These views provide easy interfaces to perform the most common tasks developers encounter when displaying database data in views.

#### 1. Generic views of objects

Django's generic views really shine when it comes to presenting views of our database content. Django comes with a handful of build-in generic views that make generating list and detail views of objects incredibly easy.

Let's use these models:

###### models.py

<pre>
<code>
  from django.db import models
  
  class Publisher(models.Model):
      name = models.CharField(max_length=30)
      address = models.CharField(max_length=50)
      city = models.CharField(max_length=60)
      sate_province = models.CharField(max_length=30)
      country = models.CharField(max_length=50)
      website = models.URLField()

      class Meta:
          ordering = ["-name"]
      
      def__str__(self):
          return self.name

  class Author(models.Model):
      salutation = models.CharField(max_length=10)
      name = models.CharField(max_length=200)
      email = models.EmailField()
      headshot = models.ImageField(upload_to='author_headshots')

      def __str__(self):
          retrun self.name
  
  class Book(models.Model):
      title = models.CharField(max_length=100)
      authors = models.ManyToManyField('Author')
      publisher = models.ForeignKey(Publisher)
      publication_date = models.DateField()
</code>
</pre>

Define a view:

###### views.py

<pre>
<code>
    from django.views.generic import ListView
    from books.models import Publisher

    class PublisherList(ListView):
        model = Publisher
</code>
</pre>

Finally hook the view into urls:

###### urls.py

<pre>
<code>
    from django.conf.urls import url
    form books.views import PublisherList

    urlpatterns = [
        url(r'^publishers/$', PublisherList.as_view()),
    ]
</code>
</pre>

We could explicitly tell the view which template to use by adding a **template_name** attribute to the view.<br>
In the absence of an explicit temlate Django will infer one from the object's name. In this case, the inferred template will be **books/publisher_list.html** - the books part comes from the name of the **app** that defines the model, while the **"publisher"** bit is just the lowercased version of the model's name.

When the **APP_DIRS** option of a **DjangoTemplates** backend is set to **True** in **TEMPLATES**, a template location could be:

- /path/to/project/books/templates/books/publisher_list.html

This template will be rendered against a context containing a variable called **object_list** that contains all the publisher objects. A very simple template might look like:

<pre>
<code>
    {% extends "base.html" %}

    {% block content %}
        < h2>Publishers< /h2>
        < ul>
            {% for publisher in object_list %}
                < li>{{ publisher.name }}</ li>
            {% endfor %}
        </ ul>
    {% endblock %}
</code>
</pre>

#### 2. Making "friendly" template contexts

In Django, if we're dealing with a model object, this is already done for us. When we are dealing with an object or queryset, Django populates the context using the lower cased version of the model class name. This is provided in addition to the default **object_list** entry, but contains exactly same data, that is **publisher_list**.

We can manually set the name of the context variable. The **context_object_name** attribute on a generic view specifies the context variable to use:

###### views.py

<pre>
<code>
    from django.views.generic import ListView
    form books.models import Publisher

    class PublisherList(ListView):
        model = Publisher
        context_object_name = 'my_favorite_publishers'
</code>
</pre>

Providing a useful **context_object_name** is always a good idea.

#### 3. Adding extra context

Let's think of showing a list of all the books on each publisher detail page. The **DetailView** generic view provides the publisher to the context, but **how do we get additional information in that template?**

The answer is to subclass **DetailView** and provide our own implementation of the **get_context_data** method. The default implementaion simply adds the object being displayed to the template, but we can override it to send more.

<pre>
<code>
    from django.views.generic import DetailView
    from books.models import Publisher, Book

    class PublisherDetail(DetailView):
        model = Publisher

        def get_context_data(self, **kwargs):
            # Call the base implementation first to get a context
            context = super(PublisherDetail, self).get_context_data(**kwargs)
            context['book_list'] = Book.object.all()
            return context
</code>
</pre>

> Note:
>
> Generally, **get_context_data** will merge the context data of all parent classes with those of the current class. To preserve this behavior in your own classes where you want to alter the context, you should be sure to call **get_context_data** on the **super class**. When no two classes try to define the same key, this will give the expected results.
>
> However, if any class attempts to override a key after parent classes have set it (after the call to super), any children of that class will also need to explicitly set it after super if they want to be sure to override all parents. If you're having trouble, review the method resolution order of your view.

#### 4. Viewing subsets of objects

The **model** argument, which specifies the database model that the view will operate upon, is available on all the generic views that operate on a single object or a collection of objects. We can also specify the list of objects using the **queryset** argument:

<pre>
<code>
    from django.views.generic import DetailView
    from books.models import Publisher

    class PublisherDetail(DetailView):
        context_object_name = 'publisher'
        queryset = Publisher.objects.all()
</code>
</pre>

Specifying **model = Publisher** is really just shorthand for saying **queryset = Publisher.objects.all()**.<br>
However, by using **queryset** to define a filtered list of objects we can be more specific about the objects that will be visible in the view.

For example, if we want to order a list of books by publication date, with the most recent first:

<pre>
<code>
    from django.views.generic import ListView
    from books.models import Book

    class BookList(ListView):
        queryset = Book.objects.order_by('-publication_date')
        context_object_name = 'book_list'
</code>
</pre>

If we want to present a list of books by a particular publisher:

<pre>
<code>
    from django.views.generic import ListView
    form django.models import Book

    class AcmeBookList(ListView):
        context_object_name = 'book_list'
        queryset = Book.objects.filter(publisher__name='Acme Publishing')
        template_name = 'book/acme_list.html'
</code>
</pre>

Here, along with a **queryset**, we're also using a custom template name. If we didn't, the generic view would use the same template as "vanilla" object list, which might not be what we want.

#### 5. Dynamic filtering

Another common need to filter down the objects given in a list page by some key in the URL.

Handily, the **ListView** has a **get_queryset()** method we can override. We can add more logic with it instead of just returning the value with **queryset** attribute.

Various useful things are stored on **self**; as well as the request **(self.request)**, this includes the positional **(self.args)** and name-based **(self.kwargs)** arguments captured according to URLconf.

URLconf with a single captured group:

###### urls.py

<pre>
<code>
    from django.conf.urls import url
    from books.views import PublisherBookList

    urlpatterns = [
        url(r'^books/([\w-]+)/$', PublisherBookList.as_view()),
    ]
</code>
</pre>

Let's write the view:

###### views.py

<pre>
<code>
    from django.shortcuts import get_object_or_404
    from django.views.generic import ListView
    from books.models import Book, Publisher

    class PublisherBookList(ListView):
        template_name = 'books/books_by_publisher.html'

        def get_queryset(self):
            self.publisher = get_object_or_404(Publisher name=self.args[0])
            return Book.objects.filter(publisher=self.publisher)
    # Also if we want we could use <strong>self.request.user</strong> to filter using the current user,
    # or other more complex logic

        def get_context_data(self, **kwargs):
          # Call the base implementation first to get a context
          context = super(PublisherBookList, self).get_context_data(**kwargs)

          # Add in the publisher
          context['publisher'] = self.publisher
          return context
</pre>
</code>

###### 6. Performing extra work

Imagine we had a **last_accessed** field on our **Author** model that we were using to keep track of the last time anybody looked at that author.

###### models.py

<pre>
<code>
    from django.db import models

    class Author(models.Model):
        salutation = models.CharField(max_length=10)
        name = models.CharField(max_length=200)
        email = models.EmailField()
        headshot = models.ImageField(upload_to='author_headshots')
        last_accessed = models.DateTimeField()
</code>
</pre>

Lets add an author detail bit in the URLconf to point to a custom view:

<pre>
<code>
    from django.conf.urls import url
    form books.views import AuthorDetailView

    urlpatterns = [
        # ...
        url(r'^authors/(?P<pk>[0-9]+)/$', AuthorDetailView.as_view(), name='author-detail'),
    ]
</code>
</pre>

We'd write our new view - **get_object** the method that retrives the object.

<pre>
<code>
    from django.views.generic import DetailView
    from django.utils import timezone
    from books.models import Author

    class AuthorDetailView(DetailView):
        queryset = Author.objects.all()
        
        def get_object(self):
            object = super(AuthorDetailView, self).get_object()

            # Record the last accessed date
            object.last_accessed = timezone.now()
            object.save()
            # Return the object
            return object
</code>
</pre>

The URLconf here uses the named group pk - this name is the default name that **DetailVIew** uses to find the value of the primary key used to filter the queryset.
{% endraw %}

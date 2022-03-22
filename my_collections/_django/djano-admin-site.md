---
layout: blogdetail
author: Milan Kaucha
title: Django Admin Site
categories: Django
excerpt_separator: <!--more-->
---

An **admin** interface is an essential part of the infrastructure. This is a web-based interface, limited to trusted site administrators, that enables the adding, editing and deletion of site content.

<!--more-->

#### 1. Using the admin site

All you need to do is create an admin user (superuser) and then can log into the admin site.

###### To create an admin user, run the following command:

<pre>
<code>
    python manage.py createsuperuser
</code>
</pre>

##### Start the development server

<pre>
<code>
    python manage.py runserver
</code>
</pre>

Open a web browser and go to /admin/ on your local domain–for example,http://127.0.0.1:8000/admin/. You should see the admin's login screen.

##### Adding your models to the admin site

Add our own models to the admin site, so we can add, change and delete objects in our custom database tables.

###### mysite/books/admin.py

<pre>
<code>
    form django.contrib import admin
    from .models import Publisher, Author, Book

    admin.site.register(Publisher)
    admin.site.register(Author)
    admin.site.register(Book)
</code>
</pre>

This tells the Django admin site to offer an interface for each of these models. A **foreignKey** is represented by a select box, and the **ManyToManyField** is represented by a multiple-select box.

#### 2. Making fields optional

In many cases you'd want certain fields to be optional. Simply add **blank=True** to the required filed you want.

<pre>
<code>
    class Author(models.Mode):
        first_name = models.CharField(max_length=30)
        last_name = models.CharField(max_length=40)
        email = models.EmailField(blank=True)
</code>
</pre>

This tells **Django** that a blank value is indeed allowed for author's e-mail address. By default, all fields have **blank=False**, which means blank values are not allowed.

##### Making date and numeric fields optional

Django's automatically generated **CREATE TABLE** statements add an explicit **NOT NULL** to each column definition.

<pre>
<code>
    CREATE TABLE "books_author" (
        "id" serial NOT NULL PRIMARY KEY,
        "first_name" varchar(30) NOT NULL,
        "last_name" varchar(40) NOT NULL,
        "email" varchar(75) NOT NULL
    );
</code>
</pre>

The **Django admin site**, which insert an empty string (not a **NULL** value) when you leave a character field blank.

But there's an exception with database column types that do not accept empty strings as valid values - such as **dates, times, and numbers**. If you try to insert an empty string into date or integer column, you'll likely get a database error, depending on which database you're using. In this case, **NULL** is the only way to specify an empty value.

In Django models, you can specify that **NULL** is allowed by adding **null=True** to a field. If you want to allow blank values in a date field(for example **DateField, TimeField, DateTimeField**) or numeric field (for example **IntegerField, DecimalField, FloatField**), you'll need to use both **null=True** and **blank=True**

<pre>
<code>
    class Book(models.Model):
        title = models.CharField(max_length=100)
        authors = models.ManyToManyField(Author)
        publisher = models.ForeignKey(Publisher)
        publication_date = models.DateField(blank=True, null=True)
</code>
</pre>

Adding **null=True** changes the semantic of the database, i.e. it changes **CREATE TABLE** statement to remove the **NOT NULL** from **publication_date** field.

##### Customizing field labels

The **Book** model's **publication_date** field has the label **Publication Date**. Django just replaces underscores with spaces and capitalizes the first character.

In some cases if you might want to customize a label. You can do this by specifying **verbose_name** in the appropriate model field.

<pre>
<code>
    class Author(models.Model):
        first_name = models.CharField(max_length=30)
        last_name = models.CharField(max_length=40)
        email = models.EmailField(blank=True, verbose_name='e-mail')
</code>
</pre>

#### 3. Custom model admin classes

Django admin site offers a wealth of options that let you customize how the admin site works for a particular model. Such options live in **ModelAdmin classes**, which are classes that contain configuration for a specific model in specific admin site instance.

##### Customizing change lists

By default, the change list displays the result of **\_\_str\_\_()** for each object.<br>
We can improve on this default behavior by adding a few other fields to the change list display. We'll define **ModelAdmin** class, this class is the key to customizing the admin, and lets you specify the list of fields to display.

###### mysite/books/admin.py

<pre>
<code>
    from djano.contrib import admin
    from mysite.books.models import Publisher, Author, Book

    class AuthorAdmin(admin.ModelAdmin):
        list_display = ('first_name', 'last_name', 'email')
    
    admin.site.register(Publiser)
    admin.site.register(Author, AuthorAdmin)
    admin.site.register(Book)

</code>
</pre>

Here's what we've done:

- We created the class AuthorAdmin. This class, which subclasses **django.contrib.admin.ModelAdmin**, holds custom configuration for a specific admin model. We've only specified one customization – **list_display**, which is set to a tuple of field names to display on the change list page.

- We altered the **admin.site.register()** call to add **AuthorAdmin** after **Author**. You can read this as: Register the **Author** model with the **AuthorAdmin** options.

- The **admin.site.register()** function takes a ModelAdmin subclass as an optional second argument. If you don't specify a second argument, Django will use the default admin options for that model.

We can also add a simple search bar. Add **search_fields** to the **AuthorAdmin**

<pre>
<code>
    class AuthorAdmin(admin.ModelAdmin):
        list_display = ('first_name', 'last_name', 'email')
        search_fields = ('first_name', 'last_name')
</code>
</pre>

Let's add **date filters** to our **Book** model's change list page:

###### mysite/books/admin.py

<pre>
<code>
    from django.contrib import admin
    from mysite.books.models import Publisher, Author, Book

    class AuthorAdmin(admin.ModelAdmin):
        list_display = ('first_name', 'last_name', 'email')
        search_field = ('first_name', 'last_name')

    class BookAdmin(admin.ModelAdmin):
        list_display = ('title', 'publisher', 'publication_date')
        list_filter = ('publication_date',)
        
    admin.site.register(Publisher)
    admin.site.register(Author, AuthorModel)
    admin.site.register(Book, BookAdmin)
</code>
</pre>

We used **list_filter**, which is set of **tuple of fields** to use to create filters along the right side of change list page. Django provides shortcuts to filter the list to **Today, Past 7 days, This month, and This year**.

**list_filter** also works on fields of other types, not just DateField. **(BooleanField and ForeignKey fields etc)** The filters show up as long as there are at least two values to choose from.

Another way to offer **date filters** is to use the **date_hierarchy** admin option.

<pre>
<code>
    class BookAdmin(admin.ModelAdmin):
        list_display = ('title', 'publisher', 'publication_date')
        list_filter = ('publication_date',)
        date_hierarchy = 'publicatoin_date'
</code>
</pre>

> Note
>
> **date_hierarchy** takes a string, not a **tuple**, because only one date field can be used to make the hierarchy.

Just pass a list or tuple of field names,and add a minus sign to a field to use descending sort order.

<pre>
<code>
    class BookAdmin(admin.ModelAdmin):
        list_display = ('title', 'publisher', 'publication_date')
        list_filter = ('publication_date',)
        date_hierarchy = 'publicatoin_date'
        ordering = ('-publication_date',)
</code>
</pre>

##### Customizing edit forms

By default, the **order of fields** in an edit form corresponds to the order they're defined in the model. We can change that using the fields option in our **ModelAdmin** subclass:

<pre>
<code>
    class BookAdmin(admin.model.Admin):
        list_display = ('title', 'publisher', 'publication_date')
        list_filter = ('publication_date',)
        date_heirarchy = 'publication_date'
        ordering = ('-publication_date')
        fields = ('title', 'authors', 'publisher', 'publication_date')

</code>
</pre>

Another useful thing the fields option lets you do is to **exclude** certain fields from being edited entirely. Just leave out the **field(s)** you want to exclude.

<pre>
<code>
    class BookAdmin(admin.model.Admin):
        list_display = ('title', 'publisher', 'publication_date')
        list_filter = ('publication_date',)
        date_heirarchy = 'publication_date'
        ordering = ('-publication_date')
        fields = ('title', 'authors', 'publisher')
</code>
</pre>

When a user uses this **incomplete form** to add a new book, Django will simply set the **publication_date** to **None** – so make sure that field has **null=True**.

I'd highly recommend using **filter_horizontal** for any **ManyToManyField** that has more than ten items. It's far easier to use than a simple multiple-select widget.

<pre>
<code>
    class BookAdmin(admin.model.Admin):
        list_display = ('title', 'publisher', 'publication_date')
        list_filter = ('publication_date',)
        date_heirarchy = 'publication_date'
        ordering = ('-publication_date')
        filter_horizontal = ('authors',)
</code>
</pre>

**ModelAdmin** classes also support a **filter_vertical** option. This works exactly as **filter_horizontal**.

**filter_horizontal and filter_vertical** only work on **ManyToManyField fields**, not
ForeignKey fields. By default, the admin site uses simple \<select> boxes for **ForeignKey
fields**, but, as for ManyToManyField

**\<select>** box have to load every publisher as the database grows to thousand of publishers which would take a while to load. The way to fix this is to use option called **raw_id_fields**

<pre>
<code>
    class BookAdmin(admin.ModelAdmin):
    list_display = ('title', 'publisher','publication_date')
    list_filter = ('publication_date',)
    date_hierarchy = 'publication_date'
    ordering = ('-publication_date',)
    filter_horizontal = ('authors',)
    raw_id_fields = ('publisher',)
</code>
</pre>

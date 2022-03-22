---
layout: blogdetail
author: Milan Kaucha
title: Django Models
categories: Django
excerpt_separator: <!--more-->
---

A view is responsible for doing some arbitary logic, and then returning a response. In modern web applications, the arbitary logic often involves interacting with a database. A database-driven website connects to a database server, retrieves some data out of it, and displays that data on a web page.

<!--more-->

Django is well suited for making database-driven websites because it comes with easy yet powerful tools for performing database queries using Python.
{% raw %}

##### The "dumb" way to do database queries in views

<pre>
<code>
    from django.shortcuts import render
    import MySQLdb

    def book_list(request):
        db = MySQLdb.connect(user='me', db='mydb', passwd = 'secret', host = 'localhost')
        cursor = db.cursor()
        cursor.execute('SELECT name FROM books ORDER BY name')
        names = [row[0] for row in cursor.fetchall()]
        db.close()
        return render(reques, 'book_list.html', {'name': names})
</code>
</pre>

This approach works, but some problems will occur immediately:

- We're hard coding the database connection parameters. **Ideally, these parameters would be stored in the Django configuration**.

- We're having to write a fair bit of boilerplate code: creating a connection, creating a cursor, executing a statement, and closing the connection. **Ideally, all we'd have to do is specify which results we wanted**.

- It ties us to MySQL. If, down the road, we switch from MySQL to PostgresSQL, we'll most likely have to rewrite a large amount of our code. **Ideally, the database server we're using would be abstracted, so that a database server change could be made in a single pace**.

Django's database layer solves these problems.

#### 1. Configuing the database

Let's explore the initial configuration that was added to **settings.py** when created the application:

<pre>
<code>
    # Database
    #
    DATABASES = {
        'default': {
            'ENGINE': 'django.db.backends.sqlite3',
            'NAME': os.path.join(BASE_DIR, 'db.sqlite3'),
        }
    }
</code>
</pre>

Here's a rundown of each settings.

- **ENGINE**: It tells Django which database engine to use. As we are using SQLite, **django.db.backends.sqlite3**.

- **NAME**: It tells Django the name of your database. For example: **'NAME': 'mydb',**

Since, we're using SQLite, **startproject** created a full filesystem path to the database file for us.

#### 2. Your first app

**Django app** -- a bundle of Django code, including models and views, that live together in a single Python package and represent a full Django application. **What's the difference between a project and an app?**

- A project is an instance of a certain set of Django apps, plus the configuration for those apps. **Technically, the only requirement of a project is that it supplies a settings file, which defines the database connection information, the list of installed apps, the DIRS, and so forth**.

- An app is a portable set of Django functionality, usually including **models and views**, that live together in a single Python package.

There's one requirement regarding the app convention: If you're using Django's database layer(models), you must create a Django app. Models must live within apps. Thus, in order to start writing our models, we'll need to create a new app.

Type this command to create a **books** app:

<pre>
<code>
    python manage.py startapp books
</code>
</pre>

This command create a **books** directory within the **root** directory. Let's look at the contents of that directory:

<pre>
<code>
    books/
        /migrations
        __init__.py
        admin.py
        models.py
        tests.py
        views.py
</code>
</pre>

#### 3. Defining Models in Python

A Django model is a description of the data in your database, represented as Python code.<br>
Django uses a model to execute SQL code behind the scenes and return convenient Python data structures representing the rows in you database tables. Django also uses models to represent higher-level concepts that SQL can't necessarily handle.

**"Isn't it redundant to define data models in Python instead of in SQL?" Django works the way it does for several reasons:**

- Introspection requires overhead and is imperfect. In order to provide convenient data-access APIs, Django needs to know database layout, and there are two ways of accomplishing this. The first way would be to explicitly describe the data in Python, and the second way would be to introspect the database at runtime to determine the data models.

- This second way seems cleaner, because the metadata about your tables lives in only one place, but it introduces a few problems. First, introspecting a database at runtime obviously requires overhead. If the framework had to introspect the database each time it processed a request, or even only when the web server was initialized, this would incur an unacceptable level of overhead. Second, some databases, notably older versions of MySQL, do not store sufficient metadata for accurate and complete introspection.

- SQL allows for only a certain level of metadata about a data layout. Most database systems, for example, do not provide a specialized data type for representing email addresses or URLs. Django models do. The advantage of higher-level data types is higher productivity and more reusable code.

A drawback of this approach, however, is that it's possible for the Python code to get out of sync with what's actually in the database. If you make changes to a Django model, you'll need to make the same changes inside your database to keep your database consistent with the model.

##### Your first model

Suppose the following concepts, fields, and realtionships:

- An author has a first name, a last name, and an email address.
- A publisher has a name, a street address, a city, a state/province, a country, and a website
- A book has a title and a publication date. It also has one or more authors (a many-to-many relationship with authors) and a single publisher (a one-to-many relationship–aka foreign key–to publishers).

###### books/models.py

<pre>
<code>
    from django.db import models

    class Publisher(models.Model):
        name = models.CharField(max_length=30)
        address = models.CharField(max_length=50)
        city = models.CharField(max_length=60)
        state_province = models.CharField(max_length=30)
        country = models.CharField(max_length=50)
        website = models.URLField()

    class Author(models.Model):
        first_name = models.CharField(max_length=30)
        last_name = models.CharField(max_length=40)
        email = models.EmailField()

    class Book(models.Model):
        title = models.CharField(max_length=100)
        authors = models.ManyToManyField(Author)
        publisher = models.ForeignKey(Publisher, on_delete=models.CASCADE)
        publication_date = models.DateField()
</code>
</pre>

Each model is represented by a Python class that is a subclass of **django.db.models.Model**. THe parent class, **Model**, makes these objects capable of interacting with a database -- and leaves our models solely for defining their fields, in a nice and compact syntax.

> Note
>
> Django creates an additional table - **a many-to-many join table** - that handles the mapping of books to authors.
>
> Django automatically gives every model an auto incrementing integer primary key field called **id**. Each Django model is required to have a single-column primary key.

##### Installing the Model

First step is to activate these models in our Django project. We do that by adding the **books** app to the list of installed apps in the settings file.

###### mysite/setting.py

<pre>
<code>
    INSTALLED_APPS = (
        'django.contrib.admin',
        'django.contrib.auth',
        'django.contrib.contenttypes',
        'django.contrib.sessions',
        'django.contrib.messages',
        'django.contrib.staticfiles',
        'books',
    )
</code>
</pre>

Now that the Django app has been activated in the settings file, we can create the databasee tables in our database. Let's validate the models by running this command:

<pre>
<code>
    python manage.py check
</code>
</pre>

The check command runs the Django system check framework–a set of static checks for validating Django projects.<br>
Anytime you think you have problems with your models, run **python manage.py check**. It tends to catch all the common model problems.

Run the following command to tell Django that you have made some changes to your models.

<pre>
<code>
    python manage.py makemigrations books
</code>
</pre>

Migrations are how Django stores changes to your model (and thus your database schema)- they're just files on disk. You wil find file names **0001_initial.py** in migrations folder of the **books** app. The **migrate** command will take your last migration file and update your database schema automatically.

The **sqlmigrate** command takes migration names and returns their SQL. It just prints output to the screen so you can see what SQL Django would execute if you asked it.

<pre>
<code>
    python manage.py sqlmigrate books 0001
</code>
</pre>

> Note
>
> Table names are automatically generated by combining the name of the app **(books)** and lowercase name of model **(publisher, book and author)**
>
> Django adds a primary key for each table automatically–the **id** fields. By convention, Django appends **"\_id"** to the foreign key field name. We can override this behavior.
>
> The foreign key relationship is made explicit by a **REFERENCES** statement.

These **CREATE TABLE** statements are tailored to the database you're using, so database specific field types such as **auto_increment (MySQL), serial (PostgreSQL), or integer primary key (SQLite)** are handled for you automatically.

Django provides an easier way of committing the SQL to the database: the **migrate** command:

<pre>
<code>
    python manage.py migrate
</code>
</pre>

The first time you run migrate, Django will also create all the system tables that Django needs for the **inbuilt apps**. Migrations are Django's way of propagating changes you make to your models (adding a field, deleting a model, and so on.) into your database schema.

#### 4. Basic data access

Django automatically provides a high-level Python API for working with those models. Try it out by running **python manage.py shell**.

<pre>
<code>
    >>> from books.models import Publisher
    >>> p1 = Publisher(name='Apress', address='2885 Telegraph Avenue', city='Berkley', state_province='CA', country='USA', website='http://www.apress.com/')
    >>> p1.save()
    >>> p2 = Publisher(name="O'Reilly", address='10 Fawcett St.', city='Cambridge', state_province='MA', country='U.S.A', website='http://www.oreilly.com/')
    >>> p2.save()
    >>> publisher_list = Publisher.objects.all()
    >>> publisher_list
    <QuerySet [<Publisher: Publisher object (1)>, <Publisher: Publisher object (2)>]>

</code>
</pre>

Here are the highlights of code:

- First, we import our **Publisher** model class. This lets us interact with the database table that contains publishers.

- We create a **Publisher** object by instantiating it with values for each field - **name, address, and so on**.

- To save the object to the database, call its **save()** method. Behind the scenes, Django executes an SQL **INSERT** statement here.

- To retrieve publishers from the database, use the attribute **Publisher.objects**. Fetch a list of all **Publisher** objects in the database with the satement **Publisher.objects.all()**. Behind the scenes, Django executes an SQL **SELECT** satement here.

When you're creating objects using **Django model API**, Django doesn't save the objects to the database until you call the **save()** method.

If you want to create an object and save it to the database in a single step, use the **objects.create()** method.

<pre>
<code>
    >>> from books.models import Publisher
    >>> p1 = Publisher.objects.create(name='Apress', address='2885 Telegraph Avenue', city='Berkley', state_province='CA', country='USA', website='http://www.apress.com/')
    >>> p2 = Publisher.objects.create(name="O'Reilly", address='10 Fawcett St.', city='Cambridge', state_province='MA', country='U.S.A', website='http://www.oreilly.com/')
    >>> publisher_list = Publisher.objects.all()
    >>> publisher_list
    <QuerySet [<Publisher: Publisher object (1)>, <Publisher: Publisher object (2)>]>
</code>
</pre>

##### Adding model string representations

When we printed out the list of publishers, we got unhelpful display that makes it difficult to tell the **Publisher** objects apart:

<pre>
<code>
    <QuerySet [<Publisher: Publisher object (1)>, <Publisher: Publisher object (2)>]>
</code>
</pre>

We can fix this easily by adding a method called **\_\_str()\_\_** to our **Publisher** class. A **\_\_str()\_\_** method tells Python how to dislay a human-readable representation of an object.

<pre>
<code>
    from django.db import models

    class Publisher(models.Model):
        name = models.CharField(max_length=30)
        address = models.CharField(max_length=50)
        city = models.CharField(max_length=60)
        state_province = models.CharField(max_length=30)
        country = models.CharField(max_length=50)
        website = models.URLField()

        def __str__(self):
            return self.name

    class Author(models.Model):
        first_name = models.CharField(max_length=30)
        last_name = models.CharField(max_length=40)
        email = models.EmailField()

        def __str__(self):
            return u'%s %s' %(self.first_name, self.last_name)

    class Book(models.Model):
        title = models.CharField(max_length=100)
        authors = models.ManyToManyField(Author)
        publisher = models.ForeignKey(Publisher, on_delete=models.CASCADE)
        publication_date = models.DateField()

        def __str__(self):
            return self.title
</code>
</pre>

Here, the **\_\_str()\_\_** methods for **Publisher** and **Book** simply return the object's name and title, respectively, but the **\_\_str()\_\_** for **Author** is slightly more complex - it pieces together the **first_name** and **last_name** fields, seperated by a space. If **\_\_str()\_\_** doesn't return string object - if it returns, say, an integer - then Python will raise a **TypeError** with a message:

<pre>
<code>
    TypeError: __str()__ returned non-string (type int).
</code>
</pre>

Now the list of Publisher objects is much easier to understand:

<pre>
<code>
    [<Publisher: Publisher: Apress>, <Publisher: O'Reilly>]
</code>
</pre>

##### Inserting and updating data

First create an instance of your model using keyword arguments. This act of instantiating a model class does not touch the database.

The record isn't saved into the database until you call **save()**.

<pre>
<code>
    >>> p = Publisher(name='Apress', 
            address='2885 Telegraph Avenue',
            city='Berkley', state_province='CA',
            country='USA', website='http://www.apress.com/')
    
    >>> p.save()

    ''' In SQL, this can roughly be translated into the following:
        INSERT INTO books_publisher
            (name, address, city, state_province, country, website)
        VALUES
            ('Apress', '2855 Telegraph Ave.', 'Berkeley', 'CA',
            'U.S.A.', 'http://www.apress.com/'); '''
</code>
</pre>

Because the **Publisher** model uses an auto-incrementing primary key id, the initial call to **save()** does one more thing: it calculates the primary key value for the record and sets it to the **id** attribute on the instance:

Subsequent calls to save() will save the record in place, without creating a new record (that is, performing an SQL **UPDATE** statement instead of an **INSERT**):

<pre>
<code>
    >>> p.name = 'Apress Publishing'
    
    >>> p.save()

    ''' In SQL, this can roughly be translated into the following:
        INSERT INTO books_publisher
            (name, address, city, state_province, country, website)
        VALUES
            ('Apress Publishing', '2855 Telegraph Ave.', 'Berkeley', 'CA', 'U.S.A.', 'http://www.apress.com/'); '''
</code>
</pre>

##### Selecting objects

Way to retrieve every records for a given model

<pre>
<code>
    >>> Publisher.objects.all()
    <Publisher: Publisher: Apress>, <Publisher: O'Reilly>]

    ''' In SQL, this can roughly be translated into the following:

        SELECT id, name, address, city, state_province, country, website FROM books_publisher; '''
</code>
</pre>

Let's take a look at each part of this **Publisher.objects.all()** line:

- First, we have the model we defined, **Publisher**. When you want to look up data, you use the model for that data.

- Next, we have **objects** attribute. This is called **manager**. Manager take care of all table-level operations on data including, data lookup. All models automatically get an **objects** manager; you'll use it anytime you want to look up model instances.

- Finally, we have **all()**. This is a method on the objects manager that returns all the rows in the database. Though this object looks like a list, it's actually a **QuerySet** – an object that represents a specific set of rows from the database.

##### Filtering data

In the Django API, you can filter your data using the **filter()** method. **filter()** takes keyword arguments that get translated inot the appropriate SQL **where** clauses.

<pre>
<code>
    >>> Publisher.objects.filter(name="Apress")
    [<Publisher: Apress>]

    ''' In SQL, this can roughly be translated into the following:

        SELECT id, name, address, city, state_province, country, website 
        FROM books_publisher
        WHERE name = "Apress"; '''

</code>
</pre>

You can pass multiple arguments into **filter()**.

<pre>
<code>
    >>> Publisher.objects.filter(country="U.S.A.", state_province="CA")
    [<Publisher: Apress>]

    ''' In SQL, this can roughly be translated into the following:

        SELECT id, name, address, city, state_province, country,website 
        FROM books_publisher
        WHERE country = "U.S.A." 
        AND state_province = "CA" '''

</code>
</pre>

Other lookup types are available:

<pre>
<code>
    >>> Publisher.objects.filter(name__contains="press")
    [<Publisher: Apress>]

    ''' In SQL, this can roughly be translated into the following:

        SELECT id, name, address, city, state_province, country,website 
        FROM books_publisher
        WHERE name LIKE "%press%" '''

</code>
</pre>

Here, the **\_\_contains** part gets translated by Django into a SQL **LIKE** statement:

Many other types of lookups are available, including **icontains (case-insensitive LIKE)**, **startswith** and **endswith**, and **range (SQL BETWEEN queries)**.

##### Retrieving single objects

The **filter()** examples above all returned a **QuerySet**, which you can treat like a list. But to fetch only a **single object**, as opposed to a list. That's what the **get()** method is for:

<pre>
<code>
    >>> Publisher.objects.get(name="Apress")
    [<Publisher: Apress>]
</code>
</pre>

Instead of a **list (rather, QuerySet)**, only a single object is returned. So, a query resulting in multiple objects will cause an exception:

<pre>
<code>
    >>> Publisher.objects.get(country="U.S.A.")
    Traceback (most recent call last):
    ...
    MultipleObjectsReturned: get() returned more than one Publisher -- it
    returned 2! Lookup parameters were {'country': 'U.S.A.'}

    # A query that returns no objects also causes an exception:

    >>> Publisher.objects.get(name="Penguin")
    Traceback (most recent call last):
    ...
    DoesNotExist: Publisher matching query does not exist.
</code>
</pre>

The **DoesNotExist** exception is an attribute of the model's class - **Publisher.DoesNotExist**. In your application, you can trap these exceptions, like this:

<pre>
<code>
    try:
        p = Publisher.objects.get(name="Apress")
    except Publisher.DoesNotExist:
        print ("Apress isn't in the database yet.")
    else:
        print ("Apress is in the database.")
</code>
</pre>

In your Django applications, you'll probably want to order your results according to a certain value–say, alphabetically. To do this, use the **order_by()** method:

<pre>
<code>
    >>> Publisher.objects.order_by("name")
    [<Publisher: Apress>, <Publisher: O'Reilly>]

    ''' In SQL, this can roughly be translated into the following:

    SELECT id, name, address, city, state_province, country, website
    FROM books_publisher
    ORDER BY name; '''

    # You can order by any field you like:
    >>> Publisher.objects.order_by("address")
    [<Publisher: O'Reilly>, <Publisher: Apress>]

    >>> Publisher.objects.order_by("state_province")
    [<Publisher: Apress>, <Publisher: O'Reilly>]

    # To order by multiple fields use multiple arguments:
    >>> Publisher.objects.order_by("state_province", "address")
    [<Publisher: Apress>, <Publisher: O'Reilly>]

    # You can also specify reverse ordering by prefixing the field name with a "-"
    >>> Publisher.objects.order_by("-name")
    [<Publisher: O'Reilly>, <Publisher: Apress>]
</code>
</pre>

All the time it can be quire repetitive. Django lets you specify a default ordering in the model:

<pre>
<code>
    class Publisher(models.Model):
        name = models.CharField(max_length=30)
        address = models.CharField(max_length=50)
        city = models.CharField(max_length=60)
        state_province = models.CharField(max_length=30)
        country = models.CharField(max_length=50)
        website = models.URLField()

        def__str__(self):
            return self.name
        
        class Meta:
            ordering = ['name']
</code>
</pre>

You can use this **Meta** class on any model to specify various model-specific options. Now, all **Publisher** objects should be ordered by the **name** field whenever they're retrieved with the **Django database API**.

##### Chaining lookups

To filter data, and order it, you simply chain the lookups together:

<pre>
<code>
    >>> Publisher.objects.filter(country="U.S.A.").order_by("-name")
    [<Publisher: O'Reilly>, <Publisher: Apress>]

    ''' This translates to a SQL query with both WHERE and an ORDER BY:
    SELECT id, name, address, city, state_province, country, website
    FROM books_publisher
    WHERE country = 'U.S.A'
    ORDER BY name DESC; '''
</code>
</pre>

##### Slicing data

Another common need is to look up only a fixed number of rows. If you have thousands of publishers in your database, but you want to display only the first one.

You cna do this using Python's standard list slicing syntax:

<pre>
<code>
    >>> Publisher.objects.order_by('name')[0]
    <Publisher: Apress>

    ''' In SQL, this can roughly be translated into the following:

    SELECT id, name, address, city, state_province, country, website
    FROM books_publisher
    ORDER BY name 
    LIMIT 1; '''

    # You can retrieve a specific subset of data using Python's range-slicing syntax:
    >>> Publisher.objects.order_by('name')[0:2]

     ''' In SQL, this can roughly be translated into the following:

    SELECT id, name, address, city, state_province, country, website
    FROM books_publisher
    ORDER BY name 
    OFFSET 0 LIMIT 1; '''
</code>
</pre>

> Note
>
> Negative slicing is not supported:

<pre>
<code>
    >>> Publisher.objects.order_by('name')[-1]
    Traceback (most recent call last):
    ...
    AssertionError: Negative indexing is not supported.

    # The easy to get around though. Just change the order_by() statement.
    >>> Publisher.objects.order_by('-name')[0]

</code>
</pre>

##### Updating multiple objects in one statement

The update() method works on any QuerySet, which means you can edit multiple records in bulk.

<pre>
<code>
    >>> Publisher.objects.filter(id=52).update(name="Apress Publishing")

    ''' In SQL, this can roughly be translated into the following:

    UPDATE books_publisher
    SET name = 'Apress Publishing'
    WHERE id = 52; '''

    >>> Publisher.objects.all().update(country='USA')
    2
</code>
</pre>

The **update()** method has a return value–an integer representing how many records changed. In the above example, we got **2**.

##### Deleting objects

To delete an object from your database, simply call the object's **delete()** method:

<pre>
<code>
    >>> p = Publisher.objects.get(name="O'Reilly")
    >>> p.delete()
    >>> Publisher.objects.all()
    [<Publisher: Apress Publishing>]

    # You can also delete objects in bulk by calling delete() on the result of any QuerySet. 
    >>> Publisher.objects.filter(country='USA').delete()
    >>> Publisher.objects.all().delete()
    >>> Publisher.objects.all()
    []
</code>
</pre>

Django requires you to explicitly use **all()** if you want to delete everything in your table.

<pre>
<code>
    >>> p = Publisher.objects.delete()
    Traceback (most recent call last):
    File "", line 1, in
    AttributeError: 'Manager' object has no attribute 'delete'  

    # But it'll work if you add the all() method:
    >>> Publisher.objects.all().delete()
</code>
</pre>

{% endraw %}

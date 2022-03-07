---
layout: django
author: Milan Kaucha
title: Django Template
categories: Django
excerpt_separator: <!--more-->
---

###### on this page

[Using the template system](#section-1)

A Django template is a string of text that is intended to seperate the presentation of a document from its data. A template defines placeholders and various bits of basic logic that regulates how the document should be displayed.

<!--more-->

The template is basic HTML with some variables and template tags. Let's step through it.

{% raw %}

- Any text surrounded by a pair of braces **{{ person_name }}** is a **variable**. This means _insert the value of the variable with the given name_. Any text surrounded by curly braces and percent signs {% if ordered_warranty %} is a template tag. A tag tells template system to do something.

- Template contains a for tag ({% for item in item_list %})
  and an if tag ({ % if ordered_warranty %}). A for tag works very much like a for statement in Python, letting you loop over each item in a sequence.

- Template contains filter, which is the most convenient way to alter the formatting of a variable. {{ ship_date\|date:"F j, Y" }}, we're passing the ship_date variable to the date filter, giving the date filter the argument "F j, Y". Filters are attached using a pipe character (\|), as a reference to Unix pipes.

#### Using the template system {#section-1}

Django ships with a build-in backend for its own template system the **Django Template Lanugage (DTL)**. Django's template system in Python code:

1. Create a **Template** object by providing the raw template code as a string.

2. Call the **render()** method of the **Template** object with a given set of variables (the context). This returns a full rendered template as a string.

In code, here's what that looks like:

<pre>
<code>
    >>> from django import template
    >>> t = template.Template('My name is {{ name }}.')
    >>> c = template.Context({'name': 'Nige'})
    >>> print (t.render(c))
    My name is Nige.
    >>> c = template.Context({'name': 'Barry'})
    >>> print (t.render(c))
    My name is Barry.
</code>
</pre>

##### Creating template objects

The easiest way to create a **Template** object is to instantiate it directly. The **Template** class lives in the **django.template** module, and the constructor takes one argument, the raw template code. Type **python manage.py shell** to start the interactive interpreter.

<pre>
<code>
  >>> from django.template import Template
  >>> t = Template('My name is {{ name }}.')
  >>> print (t)
</code>
</pre>

You'll see something like this:

_<django.template.base.Template object at 0x7fed77b6e110>_

That _0x7fed77b6e110_ will be different every time, it's Python "identity" of the **Template** object.

When you create a **Template** object, the template system compiles the raw template code into optimized form, ready for rendering. But if template code includes any syntax error, the call to **Template()** will cause a **TemplateSyntaxError** exception:

<pre>
<code>
  >>> from django.template import Template
  >>> t = Template('{% notatag%}')
  Traceback (most recent call last):
  File "", line 1, in ?
  ...
  django.template.base.TemplateSyntaxError: Invalid block tag: 'notatag'
</code>
</pre>

The term **"block tag"** refers to {% notatag %}. **Block tag** and **"Template tag"** are synonymous. The system raises a **TemplateSyntaxError** exception for any of the following cases:

- Invalid tags
- Invalid arguments to valid tags
- Invalid filters
- Invalid arguments to valid filters
- Invalid template syntax
- Unclosed tags (for tags thar require closing tags)

##### Rendering a template

Once you have a **Template** object, you can pass it data by giving it a **context**. A context is simply a set of template variable names and their associated values. A context is represented in Django by the **Context** class, which lives in the **django.template** module. Its constructor takes one optional argument: a dictionary mapping variable names to variable values.

Call the **Template** object's **render()** method with the context to fill the template:

<pre>
<code>
  >>> from django.template import Context, Template
  >>> t = Template('My name is {{ name }}.')
  >>> c = Context({'name': 'Stephane'})
  >>> t.render(c)
  'My name is Stephane.'
</code>
</pre>

> Note
>
> Many parts of Django, including the template system, rely on your
> settings, and you won't be able to use them unless the framework knows
> which settings to use.
>
> Django looks for an environment variable called **DJANGO_SETTINGS_MODULE**, which
> should be set to the import path of your settings.py. For example,
> **DJANGO_SETTINGS_MODULE** might be set to 'mysite.settings',
> assuming mysite is on your Python path. When you run python manage.py shell, the
> command takes care of setting **DJANGO_SETTINGS_MODULE** for you. You will need to > use **python manage.py shell** in these examples or Django will throw an exception.

##### Multiple contexts, same template

Once you have a **Template** object, you can render multiple contexts through is.

<pre>
<code>
  >>> from django.template import Template, Context
  >>> t = Template('Hello, {{ name }}')
  >>> print (t.render(Context({'name': 'John'})))
  Hello, John
  >>> print (t.render(Context({'name': 'Julie'})))
  Hello, Julie
  >>> print (t.render(Context({'name': 'Pat'})))
  Hello, Pat
</code>
</pre>

Whenever you're using the same template source to render multiple contexts, it's more efficient to create **Template** object once, and then call **render()** on it multiple times:

<pre>
<code>
  # Bad
  for name in ('John', 'Julie', 'Pat'):
    t = Template('Hello, {{ name }}')
    print (t.render(Context({'name': name})))

  # Good
    t = Template('Hello, {{ name }}')
    for name in ('John', 'Julie', 'Pat'):
      print (t.render(Context({'name': name})))
</code>
</pre>

##### Context variable lookup

The template system elegantly handles more complex data structures, such as lists, dictionaries, and custom objects. The key to traversing complex data structures in Django templates is the **dot character(".")**. Use a dot to access dictionary keys, attributes, methods, or indices of an object.

For instance, if you're passing a Python dictionary to a template. To access the values of that dictionary by dictionary key, use a dot:

<pre>
<code>
  >>> from django.template import Template, Context
  >>> person = {'name': 'Sally', 'age': '43'}
  >>> t = Template('{{ person.name }} is {{ person.age }} years old.')
  >>> c = Context({'person': person})
  >>> t.render(c)
  'Sally is 43 years old.'
</code>
</pre>

Similary, dots also allow access to object attributes. For example, a python **datetime.date** object has **year, month and day** attributes, and you can use a dot to access those attributes in Django template:

<pre>
<code>
  >>> from django.template import Template, Context
  >>> import datetime
  >>> d = datetime.date(1993, 5, 2)
  >>> d.year
  1993
  >>> d.month
  5
  >>> d.day
  2
  >>> t = Template('The month is {{ date.month }} and the year is {{
  date.year }}.')
  >>> c = Context({'date': d})
  >>> t.render(c)
  'The month is 5 and the year is 1993.'
</code>
</pre>

Dots can also allow attribute access on arbitary objects:

<pre>
<code>
  >>> from django.template import Template, Context
  >>> class Person(object):
  ...    def __init__(self, first_name, last_name):
  ...        self.first_name, self.last_name = first_name, last_name
  >>> t = Template('Hello, {{ person.first_name }} {{ person.last_name }}.')
  >>> c = Context({'person': Person('John', 'Smith')})
  >>> t.render(c)
  'Hello, John Smith.'
</code>
</pre>

Dots can also refer to methods of objects. For example, each Python has the methods **upper()** and **isdigit()**, and you can call those in Django templates using the same dot syntax:

<pre>
<code>
  >>> from django.template import Template, Context
  >>> t = Template('{{ var }} -- {{ var.upper }} -- {{ var.isdigit }}')
  >>> t.render(Context({'var': 'hello'}))
  'hello -- HELLO -- False'
  >>> t.render(Context({'var': '123'}))
  '123 -- 123 -- True'
</code>
</pre>

Finally, dots are also used to access list indices.

<pre>
<code>
  >>> from django.template import Template, Context
  >>> t = Template('Item 2 is {{ items.2 }}.')
  >>> c = Context({'items': ['apples', 'bananas', 'carrots']})
  >>> t.render(c)
  'Item 2 is carrots.'
</code>
</pre>

When the template system encounters a dot in a variable name, it tries the following lookups, in this order:

- Dictionary lookup (for example, **foo["bar"]**)
- Attribute lookup (for example, **foo.bar**)
- Method call (for example, **foo.bar()**)
- List-index lookup (for example, **foo[2]**)

##### Method call behavior

Method calls are slightly more complex than the other lookup types. Here are some things to keep in mind:

1. If, during the method lookup, a method raises an exception, the exception will be
   propagated, unless the exception has an attribute **silent_variable_failure**
   whose value is **True**. If the exception does have a **silent_variable_failure** attribute, the variable will render as the value of the engine's **string_if_invalid** configuration option (an empty string, by default)

      <pre>
      <code>
         >>> t = Template("My name is {{ person.first_name }}.")
         >>> class PersonClass3:
         ...     def first_name(self):
         ...         raise AssertionError("foo")
         >>> p = PersonClass3()
         >>> t.render(Context({"person": p}))
         Traceback (most recent call last):
         ...
         AssertionError: foo
         >>> class SilentAssertionError(Exception):
         ...     silent_variable_failure = True
         >>> class PersonClass4:
         ...     def first_name(self):
         ...         raise SilentAssertionError
         >>> p = PersonClass4()
         >>> t.render(Context({"person": p}))
        'My name is .'
      </code>
      </pre>

2. By design, Django intentionally limits the amount of logic processing available in
   the template, so it's not possible to pass arguments to method calls accessed from
   within templates. Data should be calculated in views and then passed to
   templates for display.

3. Say, for instance, you have a **BankAccount** object that has a delete() method. If a template includes something like {{ account.delete }}, where account is a BankAccount object, the object would be deleted when the template is rendered! To prevent this, set the function attribute alters_data on the method:
   <pre>
   <code>
     def delete(self):
         # Delete the account
         delete.alters_data = True
   </code>
   </pre>

   The template system won't execute any method marked in this way. Continuing
   the preceding example, if a template includes **{{ account.delete }}** and the
   **delete()** method has the alters_data=True, then the **delete()** method will
   not be executed when the template is rendered, the engine will instead replace
   the variable with **string_if_invalid**.

   > Note
   >
   > The dynamically-generated **delete()** and **save()** methods on Django model objects get **alters_data=true** set automatically.

##### How invalid variables are handled

Generally, if a variable doesn't exist, the template system inserts the value of the engine's **string_if_invalid** configuration option, which is an empty string by default.

<pre>
<code>
  >>> from django.template import Template, Context
  >>> t = Template('Your name is {{ name }}.')
  >>> t.render(Context())
  'Your name is .'
  >>> t.render(Context({'var': 'hello'}))
  'Your name is .'
  >>> t.render(Context({'NAME': 'hello'}))
  'Your name is .'
  >>> t.render(Context({'Name': 'hello'}))
  'Your name is .'
</code>
</pre>

This behavior is better than raising an exception because it's intended to be resilient to human error. In the real world, it's unacceptable for a web site to become inaccessible due to a small template syntax error.

<!-- #### Basic template-tags and filters

##### Tags

##### if/else

The **{% if %}** tag evaluates a variable, and if that variable is True (that is, it exists, is not empty, and is not a **false** Boolean value), the system will display everything between **{% if %}** and **{% endif %}**

An **{% else %}** tag is optional

The if tag may also take one or several **{% elif %}** clauses as well

The **{% if %}** tag accepts **and, or, not** for testing multiple variables, or to negate a given variable.

Use of both and and or clauses within the same tag is allowed, with **and** having higher precedence than **or**

Make sure to close each **{% if %}** with an **{% endif %}**. Otherwise, Django will throw a **TemplateSyntaxError**.

##### for

The **{% for %}** tag allows you to loop over each item in a sequence. As in Python's for statement, the syntax is **for X in Y**, where **Y** is the sequence to loop over and **X** is the name of the variable to use for a particular cycle of the loop. The template system will render everything between **{% for %}** and **{% endfor %}**

Add **reversed** to the tag to loop over the list in reverse. It's possible to nest **{% for %}** tags: -->

#### Template loading

Django provides a convenient and powerful API for loading templates from the filesystem, with the goal of removing redundancy both in template-loading calls and in your templates themselves. In order to use this template-loading API, first you'll need to tell the framework where you store your templates.

In your **setting.py** find **TEMPLATES** setting.

<pre>
<code>
  TEMPLATES = [
    {
      'BACKEND': 'django.template.backends.django.DjangoTemplates',
      'DIRS': [],
      'APP_DIRS': True,
      'OPTIONS': {
        # ... some options here ...
      },
    },
  ]
</code>
</pre>

**BACKEND** is a dotted Python path to a template engine class implementing Djnago's template backend API. The built-in backends are<br>
**django.template.backends.django.DjnagoTemplates** and **django.template.backends.jinja2.Jinja2**.<br>
Since most engines load templates from files, the top-level configuration for each engine contains three common settings:

1. **DIRS** defines a list of directories where the engine should look for template source files, in search order.

2. **APP_DIRS** tells whether the engine should look for templates inside installed application. By convention, when **APP_DIRS** is set to **True, DjangoTemplates** looks for a "templates" subdirectory in each of the **INSTALLED_APPS"**. This allows the template engine to find application templates even if **DIRS** is empty.

3. **OPTIONS** contains backend-specific settings.

#### Template directories

> Note
>
> If you want to have a set of master templates at project root, for example, > **mysite/templates**, you do need to set **DIRS**
>
> **'DIRS': [ os.path.join(BASE_DIR, 'templates') ],**

As we have not yet created a Django app, you will have to set DIRS to [os.path.join(BASE_DIR, 'templates')] as per the example preceding for the code below to work as expected.

<pre>
<code>
  from django.template.loader import get_template
  from django.template import Context
  from django.http import HttpResponse
  import datetime

  def current_datetime(request):
      now = datetime.datetime.now()
      t = get_template('current_datetime.html')
      html = t.render(Context({'current_date': now}))
      return HttpResponse(html)
</code>
</pre>

In this example, we're using the function **django.template.loader.get_template()** rather than loading the template from the filesystem manualluy. The **get_template()** function takes a template name as its argument, figures out where the template lives on the filesystem, opens that file, and returns a compiled **Template** object.
To determine the location of the template on your filesystem, get_template() will look in order:

- If **APP_DIRS** is set to True, and assuming you are using the DTL, it will look for a **templates** directory in the current app.

- If it does not find your template in the current app, **get_template()** combines
  your template directories from **DIRS** with the template name that you pass to
  **get_template()** and steps through each of them in order until it finds your
  template.If the first entry in your **DIRS** is set to **'/home/django/mysite/templates'**, the preceding **get_template()** call<br>
  would look for the template<br>
  **/home/django/mysite/templates/current_datetime.html**.

- If **get_template()** cannot find the template with the given name, it raises a
  **TemplateDoesNotExist** exception.

#### render()

So far, to load a template we've fill a **Context** and return an **HttpResponse** object with the result of the rendered template. Next step was to optimize it to use **get_template()** instead of hard-coding templates and template paths.

In practice, Django provides a much easier way to do this because this is a common idiom. Django needed a shortcut that could do all this in one line of code. This shortcut is a function called **render()**, which lives in the module **django.shortcuts**.

So, use **render()** rather than loading templates and creating **Context** and **HttpResponse** objects manually.<br>
Here's the ongoing current_datetime example rewritten to use **render()**:

<pre>
<code>
  from django.shortcuts import render
  import datetime

  def current_datetime(response):
      now = datetime.datetime.now()
      return render(request, 'current_datetime.html', {'current_date': now})
</code>
</pre>

**render()** returns an **HttpResponse** object, we can simply **return** the value in the view.<br>
The first argument to **render()** is the request, the second is the name of the template to use. The third argument, if given, should be a dictionary to use in creating a **Context** for that template. If you don't provide a third argument, **render()** will use an empty dictionary.

#### Template subdirectories

Storing templates in subdirectories of your template directory is easy. In your calls to **get_template()**, just include the subdirectory name and a slash before the template name:

<pre>
<code>
  t = get_template('dateapp/current_datetime.html')
</code>
</pre>

Because **render()** is a small wrapper around **get_template()**, you can do the same thing with the second argument to **render()**

<pre>
<code>
  return render(request, 'dateapp/current_datetime.html', {'current_date': now})
</code>
</pre>

##### The include template tag

A built-in template tag **{% include %}** allows you to include the contents of another template. <br>

<pre>
<code>
  # This example includes the contents of the template includes/nav.html:
  {% include 'includes/nav.html' %}

  # This example includes the contents of the template whose name is contained in the variable template_name:
  {% include template_name %}
</code>
</pre>

If, in an **{% include %}** tag, a template with the given name isn't found, Django will do one of two things:

- If **DEBUG** is set to **True**, you'll see the **TemplateDoesNotExist** exception on a Django error page.

- If **DEBUG** is set to **False**, the tag will fail silently, displaying nothing in the place of the tag.

{% endraw %}

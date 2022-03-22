---
layout: blogdetail
author: Milan Kaucha
title: Django Forms
categories: Django
excerpt_separator: <!--more-->
---

HTML forms are the backbone of interactive websites.

{% raw %}

#### 1. Getting data from the Request Object

**HttpRequest** objects, such as the variable **request** have a number of attributes and methods. We can use these attributes to get information about current request, at the time the view function is executed.

##### Information about the URL

**HttpRequest** objects contain several pieces of information about the currently requested **URL**.

{: .table }
| Atrribute | Description | Example |
| ----------------------- | ------------------------------------------------------------------------------------------ | ------------------------------------- |
| request.path | The full path, not including the domain but including the leading slash | "/hello/" |
| request.get_host() | The host, i.e. the "domain" in comman parlance | "127.0.0.1:8000" or "www.example.com" |
| request.get_full_path() | The <strong>path</strong>, plus query string(if available) | "/hello/?print=true" |
| request.is_secure() | <strong>True</stront> if the request was made via HTTPS. Otherwise, <strong>False</strong> | True or False |

> Note
>
> Always use these attributes/methods instead of hard-coding URLs in your views.

<pre>
<code>
    # BAD!
    def current_url_view_bad(request):
        return HttpResponse("Welcome to the page at /current/")
    
    # GOOD
    def current_url_view_good(request):
        return HttpResponse("Welcome to the page at %s" % request.path)
</code>
</pre>

##### Other information about the Request

**request.META** is a Python dictionary containing all available HTTP headers for the given request - including the user's IP address and user agent (generally the name and version of the web browser).

> Note
>
> The full list of available headers depends on which headers the user sent and which headers your web server sets.

Some commonly available keys in this dictionary are:

- **HTTP_REFERER**: The referring URL, if any.
- **HTTP_USER_AGENT**: The user's browser's user-agent string, if any. For example, **"Mozilla/5.0 (X11; U; Linux i686; fr-FR;rv:1.8.1.17) Gecko/20080829 Firefox/2.0.0.17"**.
- **REMOTE_ADDR**: The IP address of the client, for example, **"12.345.67.89" ( list of IP address, for example, "12.345.67.89,23.456.78.90")**

You'll get a **KeyError** exception if you try to access a key that doesn't exist. **HTTP headers are external data - that is, they're submitted by your user's browsers - they shouldn't be trusted**. You should either use **try/except** clause or the **get()** method to handle the case of undefined keys:

<pre>
<code>
    # BAD!
    def ua_display_bad(request):
        ua = request.META('HTTP_USER_AGENT') # Might raise KeyError !
        return HttpResponse("Your browser is %s" % ua)

    # GOOD (VERSION 1)
    def ua_display_good1(request):
        try:
            ua =  request.META('HTTP_USER_AGENT')
        except KeyError:
            ua = "unknown"
        return HttpResponse("Your browser is %s" % ua)

    # GOOD (VERSION 2)
    def ua_display_good2(request):
        ua = request.META.get('HTTP_USER_AGENT', 'unknown')
        return HttpResponse("Your browser is %s" % ua)
</code>
</pre>

##### Information about submitted data

Beyond basic metadata about the request, **HttpRequest** objects have two attributes that contain information submitted by the user: **request.GET** and **request.POST**. Both of these are dictionary-like objects that give you access to **GET** and **POST** data.

> Note:
>
> **request.GET** and **request.POST** both have **get()**, **key()** and **values()** methods, and you can iterate over the keys by doing **for key in request.GET**. Both **request.GET** and **request.POST** have additional methods that normal dictionaries don't have.

#### 2. A simple form-handling example

Generally, there are two parts to developing a form: the **HTML user interface** and the **backend view code** that processes the submitted date.

Let's set up a view that displays a search form:

###### mysite/books/templates/search_form.html

<pre>
<code>
    < html >
    < head >
        <title>Search</title>
    </head>
    < body >
        < form action="/search/" method="get" >
            < input type="text" name="q" >
            < input type="submit" value="Search" >
        < /form >
    < /body >
    < /html >
</code>
</pre>

###### mysite/mysite/urls.py

<pre>
<code>
    urlpatterns = [
        # ...
        url(r'^search-form/$', views.search_form),
        url(r'^search/$', views.search),
        # ...
    ]
</code>
</pre>

###### mysite/books/views.py

<pre>
<code>
    form django.shortcuts import render

    def search_form(request):
        return render(request, 'search_form.html')

    def search(request):
        if 'q' in request.GET:
            message = 'You searched for: %r' % request.GET['q']
        else:
            message = 'You submitted an empty form.'
        return HttpResponse(message)
</code>
</pre>

You can make sure the data is being submitted to Django properly. In short:

- The **HTML \<form>** defines a variable **q**. When it's submitted, the value of **q** is sent via **GET(method="get")** to the URL **/search/**.

- The Django view that handles the URL **/search/(search())** has access to the **q** value in request.GET.

> Note:
>
> We shouldn't trust anything submitted by users or even assume that they've submitted anything in the first place. If we didn't add the check, submission of empty form would raise **KeyError** in the view

<pre>
<code>
    # BAD!
    def bad_search(request):
        # The following line will raise KeyError if 'q' hasn't
        # been submitted!
        message = 'You searched for: %r' % request.GET['q]
        return HttpResponse(message)
</code>
</pre>

##### Query string parameters

**GET** data is passed in the query string (for example, **/search/?q=django**), we can use **request.GET** to access query string variables.

**POST** data works the same way as **GET** data - just use **request.POST** instead of **request.GET**.

> Note:
>
> Use **POST** whenever the act of submitting the form will have some effect - **changing data, or sending e-mail, or something else that's beyond simple display of data**.

###### mysite/books/views.py

<pre>
<code>
    from django.http import HttpResponse
    from django.shortcuts import render
    from books.models import Book

    def search(request):
        if 'q' in request.GET and request.GET['q']:
            q = request.GET['q']
            books = Book.objects.filter(title__icontains=q)
            return render(request, 'search_result.html', {'books': books, 'query': q})
        else:
            return HttpResponse('Please submit a search term.')
</code>
</pre>

A couple of notes on what we did:

- Aside from checking that **'q'** exits in **request.GET**, we also make sure that **request.GET['q']** is a non-empty value before passing it to the database query.

- We're using Book.objects.filter(title\_\_icontains=q) to query our book table for all books whose title includes the given submission.

> Note:
>
> We wouldn't recommend using a simple icontains query on a large production database, as it can be slow.

###### mysite/books/templates/search_result.html

<pre>
<code>
    < html >
        < head >
            < title >Book Search</ title >
        </ head >
        < body >
            < p > You searched for: {{ query }} </ p >
            {% if books %}
                < p>Found {{ books|length }}
                   book{{ books|pluralize }}.< /p>
                < ul>
                {% for book in books %}
                    < li>{{ book.title }}< /li>
                {% endfor %}
                </ ul>
                {% else %}
                < p>No books matched your search criteria.</p>
            { % endif % }
        </ body >
    </ html >
</code>
</pre>

##### Improving our simple form-handling example

our search() view's handling of an empty query is poor-we're just displaying a **Please submit a search term**. message, requiring the user to hit the browser's back button. It would be much better to redisplay the form, with an error preceding to it, so that the user can try again immediately.

##### mysite/books/views.py

<pre>
<code>
    from django.http import HttpResponse
    from django.shortcuts import render
    from books.models import Book

    def search(request):
        if 'q' in request.GET and request.GET['q']:
            q = request.GET['q']
            books = Book.objects.filter(title__icontains=q)
            return render(request, 'search_result.html', {'books': books, 'query': q})
        else:
            return render(request, 'search_form.html', {'error': True})
</code>
</pre>

Here, we've improved **search()** to render the **search_form.html** template again, if the query is empty. we need to display an **error** message in that template, we pass a **template variable**. We can edit **search_form.html** to check for the **error** variable:

##### mysite/books/templates/search_form.html

<pre>
<code>
    < html >
    < head >
        < title>Search< /title>
    < /head>
    {% if error %}
        < p style="color: red;">Please submit a search term.< /p>
    {% endif %}
    < body >
        < form action="/search/" method="get" >
            < input type="text" name="q" >
            < input type="submit" value="Search" >
        < /form >
    < /body >
    < /html >
</code>
</pre>

A request to the URL **/search/** (without any GET parameters) will display the empty form (but with an error). We can remove the **search_form()** view, along with its associated URLpattern, as long as we change **search()** to hide the error message when somebody visits **/search/** with no **GET** parameters:

###### mysite/books/views.py

<pre>
<code>
    def search(request):
        error = False
        if 'q' in request.GET:
            q = request.GET['q']
            if not q:
                error = True
            else: 
                books = Book.objects.filter(title__icontains=q)
                return render(request, 'search_result.html', {'books': books, 'query': q})
        return render(request, 'search_form.html', {'error': error})
</code>
</pre>

In this updated view, if a user visits **/search/** with no **GET** parameters, they'll see the search form with no error message. If a user submits the form with an empty value for **'q'**,they'll see the search form with an error message. And, finally, if a user submits the form with a non-empty value for **'q'**, they'll see the search results.

Now that **/search/** handles both **search–form** display and **result** display, the HTML \<form> in **search_form.html** doesn't have to hard-code a URL.

<pre>
<code>
    < form action="/search/" method="get" >

    It can be changed to this:

    < form action="" method="get" >
</code>
</pre>

The **action=""** means **Submit the form to the same URL as the current page**.

##### Simple validation

Let's tweak our **search()** view so that it validates that the search term is less than or equal to 20 characters long.

###### mysite/books/views.py

<pre>
<code>
    def search(request):
        error = False
        if 'q' in request.GET:
            q = request.GET['q']
            if not q:
                error = True
            elif len(q) > 20:
                error = True
            else:
                books = Book.objects.filter(title__icontains=q)
                return render(request, 'search_results.html',{'books': books, 'query': q})
        return render(request, 'search_form.html', {'error': error})
</code>
</pre>

###### mysite/books/templates/search_form.html

<pre>
<code>
    < html >
    < head >
        < title>Search< /title>
    < /head>
    {% if error %}
        < p style="color: red;">Please submit a search term 20 characters or shorter.< /p>
    {% endif %}
    < body >
        < form action="/search/" method="get" >
            < input type="text" name="q" >
            < input type="submit" value="Search" >
        < /form >
    < /body >
    < /html >
</code>
</pre>

Error messages should be specific, unambiguous and not confusing. The problem is in the fact that we're using a simple Boolean value for **error**, whereas we should be using a list of error message strings.

###### mysite/books/views.py

<pre>
<code>
    def search(request):
        errors = []
        if 'q' in request.GET:
            q = request.GET['q']
            if not q:
                errors.append('Enter a search term.')
            elif len(q) > 20:
                errors.append('Please enter at most 20 characters.')
            else:
                books = Book.objects.filter(title__icontains=q)
                return render(request, 'search_results.html',{'books': books, 'query': q})
        return render(request, 'search_form.html', {'error': error})
</code>
</pre>

###### mysite/books/templates/search_form.html

<pre>
<code>
    < html >
    < head >
        < title>Search< /title>
    < /head>
    {% if errors %}
        < ul>
        {% for error in errors %}
            < li>{{ error }}</ li>
        {% endfor %}
        </ ul>
    {% endif %}
    < body >
        < form action="/search/" method="get" >
            < input type="text" name="q" >
            < input type="submit" value="Search" >
        < /form >
    < /body >
    < /html >
</code>
</pre>

##### 3. Making a contact form

As forms get more complex, we have to repeat the preceding steps over and over again for each form field we use. Luckily for us, Django has a higher-level library that handles form–and validation-related tasks.

##### Your first form class

Django comes with a form library, called **django.forms**, that handles many of the issues we've been exploring.

The primary way to use the forms framework is to define a **Form class** for each HTML **\<form>** you're dealing with. This class can live anywhere you want–including directly in your **views.py** file – but community convention is to keep Form classes in a separate file called **forms.py**.

###### mysite/contact/forms.py

<pre>
<code>
    from django import forms

    class ContactForm(forms.Form):
        subject = forms.CharField()
        email = forms.EmailField(required=False)
        message= forms.CharField()
</code>
</pre>

This is pretty intuitive, and it's similar to Django's model syntax. Each field is required by default, so to make **email** optional, we specify **required=False**.

The first thing it can do is display itself as HTML:

<pre>
<code>
    >>> from books.forms import ContactForm
    >>> f = ContactForm()
    >>> print(f)
    < tr>< th>< label for="id_subject">Subject:</label></th>< td>< input type="text" name="subject" required id="id_subject"></td></tr>
    < tr>< th>< label for="id_email">Email:</label></th>< td>< input type="email" name="email" id="id_email"></td></tr>
    < tr>< th>< label for="id_message">Message:</label></th>< td>< input type="text" name="message" required id="id_message"></td></tr>
</code>
</pre>

Django adds a label to each field, along with **\<label>** tags for accessibility. This default output is in the format of an HTML **\<table>**.

<pre>
<code>
    >>> print(f.as_ul())
    < li><label for="id_subject">Subject:</label> < input type="text" name="subject" required id="id_subject"></li>
    < li><label for="id_email">Email:</label> < input type="email" name="email" id="id_email"></li>
    < li><label for="id_message">Message:</label> < input type="text" name="message" required id="id_message"></li>

</code>
</pre>

> Note:
>
> the opening and closing **\<table>**, **\<ul>**, and **\<form>** tags aren't included in the output, so that you can add any additional rows and customization if necessary.

The thing **Form** objects can do is validate data. To validate data, create a **new Form** object and pass it a dictionary of data that maps field names to data:

<pre>
<code>
    >>> f = ContactForm({'subject': 'Hello', 'email': 'admin@example.com', 'message': 'Nice site!'})
</code>
</pre>

Once you've associated data with a Form instance, you've created a **bound** form. Call the **is_valid()** method on any bound Form to find out whether its data is valid.

<pre>
<code>
    >>> f.is_bound
    True
    >>> f.is_valid()
    True
    # Remember, we've specified required=False for the email field.
    >>> f = ContactForm({'subject': 'Hello', 'message': 'Nice site!'})
    >>> f.is_valid()
    True
    # But, if we leave off either subject or message, the Form is no longer valid:
    >>> f = ContactForm({'subject': 'Hello'})
    >>> f.is_valid()
    False
    >>> f = ContactForm({'subject': 'Hello', 'message': ''})
    >>> f.is_valid()
    False
</code>
</pre>

You can drill down to get field-specific error messages:

<pre>
<code>
    >>> f = ContactForm({'subject': 'Hello', 'message': ''})
    >>> f['message'].errors
    ['This field is required.']
    >>> f['subject'].errors
    []
    >>> f['email'].errors
    []
</code>
</pre>

Each bound Form instance has an errors attribute that gives you a dictionary mapping field names to error-message lists:

<pre>
<code>
    >>> f = ContactForm({'subject': 'Hello', 'message': ''})
    >>> f.errors
    {'message': ['This field is required.']}
</code>
</pre>

Django's forms framework not only validates data; it cleans it up by converting values to the
appropriate Python types:

<pre>
<code>
    f = ContactForm({'subject': 'Hello', 'email': 'adrian@example.com','message': 'Nice site!'})
    >>> f.is_valid()
    True
    >>> f.cleaned_data
    {'message': 'Nice site!', 'email': 'adrian@example.com', 'subject':'Hello'}
</code>
</pre>

Our contact form only deals with strings, which are "cleaned" into string objects – but if we
were to use an **IntegerField** or **DateField**, the forms framework would ensure that **cleaned_data** used proper Python integers or **datetime.date objects** for the given fields.

#### 4. Tying form objects into views

Our contact form is not much good to us unless we display it to the user.

###### mysite/contact/views.py

<pre>
<code>
    from django.shortcuts import render
    from mysite.forms import ContactForm
    from django.http import HttpResponseRedirect
    from django.core.mail import send_mail

    def contact(request):
        if request.method == 'POST':
            form = ContactForm(request.POST)
            if form.is_valid():
                cd = form.clean_data
                send_mail(
                    cd ['subject'],
                    cd['message'],
                    cd.get('email', 'noreply@example.com'), ['siteowner@example.com'],
                )
                return HttpResponseRedirect('/contact/thanks/')
        else:
            form = ContactForm()
        return render(request, 'contact_form.html', {'form': form}) 
</code>
</pre>

Next, we have to create our contact form

###### mysite/contact/templates/contact_form.html

<pre>
<code>
    < html >
    < head >
    < title >Contactus</title>
        </head>
    < body >
        < h1 >Contactus</h1>
        {% if form.errors %}
            < p style="color: red;" >
                Please correct the error{{ form.errors|pluralize }} below.
            </p>
        {% endif %}
        < form action="" method="post" >
            < table >
                {{ form.as_table }}
            </table>
                {% csrf_token %}
            < input type="submit" value="Submit" >
        </form>
    </body>
    </html>
</code>
</pre>

And finally, we need to change our **urls.py** to display our contact form at **/contact/**:

<pre>
<code>
    # ...
    from mysite.views import hello, current_datetime, hours_ahead, contact
    
    urlpatterns = [
        # ...
        url(r'^contact/$', contact),
    ]
</code>
</pre>

Since we're creating a **POST** form, we need to worry about **Cross Site Request Forgeries**. Django comes with a very easy-to-use system for protecting against it. In short, all **POST** forms that are targeted at internal URLs should use the {% csrf_token %} template tag.

unless you have configured a mail-server, you will get a **ConnectionRefusedError** when **send_mail()** is called.

#### 5. Changing how fields are rendered

We render our form locally is that the message field is displayed as an **\<input type="text">**, and it ought to be a **\<textarea>**. We can fix that by setting the **field's widget**:

###### mysite/contact/forms.py

<pre>
<code>
    from django import forms

    class ContactForm(forms.Form):
        subject = forms.Charfield()
        email = forms.EmailField(required=False)
        message = forms.CharField(widget=forms.Textarea)
</code>
</pre>

The forms framework separates out the presentation logic for each field into set of widgets. Each field type has a default widget, but can easily override the default, or provide custom widget of your own.

Think of the **Field** classes as representing **validation logic**, while widgets represent **presentation logic**.

#### 6. Setting a maximum length

One of the common validation needs is to check that a field is of a certain size. To do that, use **max_length** to the Field.

###### mysite/contact/forms.py

<pre>
<code>
    from django import forms

    class ContactForm(forms.Form):
        subject = forms.CharField(max_length=100)
        email = forms.EmailField(required=False)
        message = form.CharField(widget=forms.Textarea)
</code>
</pre>

#### 7. Setting initial values

To add an initial value, we can use **initial** argument when we create **Form** instance.

###### mysite/contact/views.py

<pre>
<code>
    def contact(request):
        if request.method == 'POST':
            form = ContactForm(request.POST)
            if from.is_valid():
                cd = form.cleaned_data
                send_mail(
                    cd['subject'],
                    cd['message'],
                    cd.get('email', 
                    ['noreply@example.com](mailto:'noreply%40example.com)'),
                    [['siteowner@example.com](mailto:'siteowner%40example.com)'],
                    )
                return HttpResponseRedirect('/contact/thanks/')
        else:
            form = ContactForm(
                initial = {'subject': 'I love your site!'}
            )
        return render(request, 'contact_form.html', {'form': form})
</code>
</pre>

Now, the **subject** field will be displayed prepopulated with that kind statement.

> Note:
>
> The biggest difference is that if you're just passing initial data, then the form will be unbound, which means it won't have any error messages.

#### 8. Custom validation rules

There are number of ways to hook custom validation into a Django form. Most custom validations are one-off affairs, though, and can be tied directly to the **FORM** class.

###### mysite/contact/forms.py

<pre>
<code>
    from django import forms

    class ContactForm(forms.Form):
        subject = forms.CharField(max_length=100)
        email = forms.EmailField(required=false)
        message = forms.CharField(widget=forms.Textarea)

        def clean_meassage(self):
            message = self.cleaned_data['message']
            num_words = len(message.split())

            if num_words < 4:
                raise forms.ValidationError('Not enough words!')
            return message
</code>
</pre>

Django's form system automatically looks for any method whose name starts with **clean\_** and ends with the name of a **field**. If any such method exists, it's called during validation.

Here, the **clean_message()** method will be called after the default validation logic for a given field (in this case, the validation logic for a required **CharField**).

Because the field data has already been partially processed, we pull it out of **self.cleaned_data**. Also, we don't have to worry about checking that the value exists and is non-empty; that's done by the default validator. We naively use a combination of **len()** and **split()** to count the number of words. If the user has entered too few words, we raise a **forms.ValidationError**.

#### 9. Specifying labels

By default, the labels on Django's auto-generated form HTML are created by replacing underscores with spaces and capitalizing the first letter–so the label for the email field is "Email".

we can customize the label for a given field using **label**.

###### mysite/contact/forms.py

<pre>
<code>
    class ContactForm(forms.Form):
        subject = forms.CharField(max_length=100)
        email = forms.EmailField(required=False, label='Your e-mail address')
        message = forms.CharField(widget=forms.Textarea)
</code>
</pre>

#### 10. Customizing form design

Our **contact_form.html** template uses **{{ form.as_table }}** to display the form, but we can display the form in other ways to get more granular control over display.

The auto-generated error lists use **\<ul class="errorlist">** precisely so that you can target them with CSS.

###### mysite/contact/templates/contact_form.html

<pre>
<code>
    < style type="text/css" >
        ul.errorlist {
            margin: 0;
            padding: 0;
        }
        .errorlist li {
            background-color: red;
            color: white;
            display: block;
            font-size: 10px;
            margin: 0 0 3px;
            padding: 4px 5px;
        }
    </style>
</code>
</pre>

In many cases we'll want to override the default rendering of form's HTML. Everything about the way a form is displayed can be overridden, mostly within template itself.

Each field's widget **(\<input type="text">, \<select>, \<textarea>, and so on.)** can be rendered individually by accessing {{ form.fieldname }} in the template, and any errors associated with a field are available as **{{ form.fieldname.errors }}**.

###### mysite/contact/templates/contact_form.html

<pre>
<code>
    < html >
    < head >
        < title >Contact us</title>
    </head>
    < body >
    < h1 >Contact us</h1>
    {% if form.errors %}
    < p style="color: red;" >
        Please correct the error{{ form.errors|pluralize }} below.
    </p>
    {% endif %}
    < form action="" method="post" >
        < div class="field" >
            {{ form.subject.errors }}
        < label for="id_subject" >Subject:</label>
            {{ form.subject }}
        </div>
        < div class="field" >
            {{ form.email.errors }}
        < label for="id_email" >Your e-mail address:</label>
            {{ form.email }}
        </div>
        < div class="field" >
            {{ form.message.errors }}
        < label for="id_message" >Message:</label>
            {{ form.message }}
        </div>
        {% csrf_token %}
        < input type="submit" value="Submit" >
    </form>
    </body>
    </html>
</code>
</pre>

**{{ form.message.errors }}** displays a **\<ul class="errorlist">** if errors are present
and a blank string if the field is valid (or the form is unbound). We can also treat **form.message.errors** as a Boolean or even iterate over it as a list.

<pre>
<code>
    < div class="field{% if form.message.errors %} errors{% endif %}" >
        {% if form.message.errors %}
    < ul >
    {% for error in form.message.errors %}
    < li >{{ error }}</li>
        {% endfor %}
    </ul>
        {% endif %}
    < label for="id_message" >Message:</label>
        {{ form.message }}  
    </div>
</code>
</pre>

This will add an **"errors"** class to the containing **\<div>** and display the list of errors in an unordered list.

{% endraw %}

---
layout: blogdetail
author: Milan Kaucha
title: Dictionaries
categories: Python
excerpt_separator: <!--more-->
---

Python's dictionaries allow you to connect pieces of related information. Dictionaries allows you to model a variety of real-world objects more accurately.
{% raw %}

#### 1. A Simple Dictionary

###### alien.py

<pre>
<code>
    alien_0 = {'color': 'green', 'points': 5}
    print(alien_0['color'])
    print(alien_0['points'])

    ''' Output:
        green
        5 '''
</code>
</pre>

#### 2. Working with Dictionaries

A **dictionary** in Python is a collection of **key-value** pairs. Each key is associated to a value, and you can use a key to access the value associated with that key. A key's value can be **a number, a string, a list, or even another dictionary**. In fact, you can use any object that you can create in Python as value in a dictionary.

Dictionary is wrapped in braces , **{}**, with a series of key-value pairs inside the braces. Every key is connected to its value by a colon, and individual key-value pairs are seperated by commas.

##### Accessing Values in a Dictionary

To get the value associated with a key, give the name of the dictionary and then place the key inside a set of square brackets.

###### alien.py

<pre>
<code>
    alien_0 = {'color': 'green'} 
    print(alien_0['color'])
    
    ''' Output: 
        green '''

    # We can have an unlimited number of key-value paris in dictionary.

    alien_0 = {'color': 'green', 'points': 5}
    new_points = alien_0['points']
    print(f"You just earned {new_points} points!")

    ''' Output: 
        You just earned 5 points '''
</code>
</pre>

##### Adding New Key-Value Pairs

Dictionaries are dynamic structures, we can add new key-value pairs to dictionary at any time. To add a new key-value pair, you would give the name of the dictionary followed by the new key in square brackets along with the new value.

###### alien.py

<pre>
<code>
    alien_0 = {'color': 'green', 'points': 5}
    print(alien_0)
    
    ''' Output:
        {'color': 'green', 'points': 5}

    alien_0['x_position'] = 0
    alien_0['y_position'] = 25
    print(alien_0)

    ''' Output:
        {'color': 'green', 'points': 5,  'x_position': 0, 'y_position': 25}

</code>
</pre>

> Note:
>
> As of Python 3.7, dictionaries retain the order in which they were defined. When you print a dictionary or loop through its elements, you will see the elements in the same order in which they were added to the dictionary.

##### Starting with an Empty Dictionary

Sometimes it's convenient, or even necessary, to start with an empty dictionary and then add each new item to it. To start filling an empty dictionary, define a dictionary with an empty set of braces and then add each key-value pair on its own line.

###### alien.py

<pre>
<code>
    alien_0 = {}

    alien_0['color'] = 'green'
    alien_0['points'] = 5
    print(alien_0)

    ''' Output:
        {'color': 'green', 'points': 5} '''
</code>
</pre>

Typically, you’ll use empty dictionaries when storing user supplied data in a dictionary or when you write code that generates a large number of key-value pairs automatically.

##### Modifying Values in a Dictionary

To modify a value in a dictionary, give the name of the dictionary with the key in square brackets and the new value you want associated with that key.

###### alien.py

<pre>
<code>
    alien_0 = {'color': 'green'}
    print(f"The alien is {alien_0['color']}")

    ''' Output:
        The alien is green '''
    
    alien_0['color'] = 'yellow'
    print(f"The alien is now {alien_0['color']}.")
</code>
</pre>

For a more interesting example

###### alien.py

<pre>
<code>
    alien_0 = {'x_position': 0, 'y_position': 25, 'speed': 'medium'}
    print(f"Original position: {alien_0['x_position']}")

    ''' Output: 
        Original position: 0 '''

    # Determine how far to move the alien based on its current speed.

    if alien_0['speed'] == 'slow':
        x_increment = 1
    elif alien_0['speed'] == 'medium':
        x_increment = 2
    else:
        x_increment =  3

    alien_0["x_position"] = alien_0["x_position"] + x_increment

    print(f"New position: {alien_0['x_position']}")
</code>
</pre>

##### Removing Key-Value Pairs

We can use the **del** statement to completely remove a key-value pair. All it need is the name of the dictionary and the ky that you want to remove.

<pre>
<code>
    alien_0 = {'color': 'green', 'points': 5}
    print(alien_0)
    ''' Output:
        {'color': 'green', 'points': 5} '''

    del alien_0['points']
    print(alien_0)
    ''' Output:
        {'color': 'green'} '''
</code>
</pre>

> Note:
>
> Be aware that the **deleted key-value** pair is removed permanently.

##### A Dictionary of Similar Objects

You can also use a dictionary to store one kind of information about many objects. A dictionary is useful for storing the results of a simple poll.

###### favorite_languages.py

<pre>
<code>
    favorite_languages = {
        'jen': 'python',
        'sarah': 'C',
        'edward': 'ruby',
        'phil': 'python',
    }

    language = favorite_languages['sarah'].title()
    print(f"Sarah's favorite language is {language}.")

    ''' Output:
        Sarah's favorite language is C. '''
</code>
</pre>

##### Using get() to Access Values

Using keys in square brackets to retrieve the value you're interested in from a dictionary might cause one potential problem. If the key you ask for doesn't exist, you'll get an error.

###### alien_no_points.py

<pre>
<code>
    alien_0 = {'color': 'green', 'speed': 'slow'}
    print(alien_0['points'])

    ''' Output:
        Traceback (most recent call last):
          File "alien_no_points.py", line 2, in < module >
            print(alien_0['points'])
        KeyError: 'points'  '''
</code>
</pre>

The **get()** method requires a key as a first argument. As a second optional argument, we can pass the value to be returned if the key doesn't exist.

###### alien_no_points.py

<pre>
<code>
    # If the key 'points' exists in the dictionary, you’ll get the corresponding value. If it
    # doesn’t, you get the default value.

    alien_0 = {'color': 'green', 'speed': 'slow'}
    point_value = alien_0.get('points', 'No point value assigned')
    print(point_value)

    ''' Output:
        No point value assigned. '''
</code>
</pre>

#### 3. Looping Through a Dictionary

Dictionary can contain large amounts of data, Python lets you loop through a dictionary. You can loop through all of a dictionary's **key-value pairs**, through **its keys**, or through its **values**.

###### users.py

<pre>
<code>
    user_0 = {
        'username': 'efermi',
        'first': 'enrico',
        'last': 'fermi',
    }

    for key, value in user_0.items():
        print(f"\nKey: {key}")
        print(f"\nValue: {value}")

    ''' Output:
        Key: last
        Value: fermi
        Key: first
        Value: enrico
        Key: username
        Value: efermi '''

    # This code would work just as well if you had used abbreviations for the variable names.
    for k,v in user_0.items()
</code>
</pre>

###### favorite_languages.py

<pre>
<code>
    favorite_languages = {
        'jen': 'python',
        'sarah': 'C',
        'edward': 'ruby',
        'phil': 'python',
    }

    for name, language in favorite_languages.items():
        print(f"{name.title()}'s favorite language is {language.title()}")
    
    ''' Output:
        Jen's favorite language is Python.
        Sarah's favorite language is C.
        Edward's favorite language is Ruby.
        Phil's favorite language is Python. '''
</code>
</pre>

##### Looping Through All the Keys in a Dictionary

The **keys()** method is useful when you don't need to work with all of the values in a dictionary.

###### favorite_language.py

<pre>
<code>
    favorite_languages = {
        'jen': 'python', 
        'sarah': 'c', 
        'edward': 'ruby', 
        'phil': 'python', 
    }

    for name in favorite_languages.keys():
        print(name.title())

    ''' Output:
        Jen
        Sarah
        Edward
        Phil '''
</code>
</pre>

> Note:
>
> Looping through the keys is actually the default behavior when looping through a dictionary.
>
> for name in favorite_languages:
>
> rather than ...
>
> for name in favorite_languages.keys():

You can access the value associated with any key you care about inside the loop by using the current key.

###### favorite_languages.py

<pre>
<code>
    favorite_languages = { 
        'jen': 'python', 
        'sarah': 'c', 
        'edward': 'ruby', 
        'phil': 'python', 
    }

    friends = ['phil', 'sarah']
    for name in favorite_languages.keys():
        print(f"Hi {name.title()}")

        if name in friends:
            language = favorite_languages[name].title()
            print(f"\t{name.title()}, I see you love {language}!")

    ''' Output: 
        Hi Jen.
        Hi Sarah.
            Sarah, I see you love C!
        Hi Edward.
        Hi Phil.
            Phil, I see you love Python! '''
</code>
</pre>

The **keys()** method isn’t just for looping: it actually returns a **list** of all the keys.

###### favorite_languages.py

<pre>
<code>
    favorite_languages = { 
        'jen': 'python', 
        'sarah': 'c', 
        'edward': 'ruby', 
        'phil': 'python', 
    } 

    if 'erin' not in favorite_languages.keys():
        print("Erin, please take our poll!")
</code>
</pre>

##### Looping Through a Dictionary’s Keys in a Particular Order

Looping through dictionary rerturns the items in the same order they are inserted. Sometimes, you'll want to loop through a dictionary in a different order.

###### favorite_languages.py

<pre>
<code>
    favorite_languages = { 
        'jen': 'python', 
        'sarah': 'c', 
        'edward': 'ruby', 
        'phil': 'python', 
    } 

    for name in sorted(favorite_languages.keys()):
        print(f"{name.title()}, thank you for taking the poll.")
    
    ''' Output: 
        Edward, thank you for taking the poll.
        Jen, thank you for taking the poll.
        Phil, thank you for taking the poll.
        Sarah, thank you for taking the poll. '''
</code>
</pre>

We've wrapped the **sorted()** function around the **dictionary.keys()** method. This tells Python to list all keys in the dictionary and **sort that list before looping through it**.

##### Looping Through All Values in a Dictionary

We can use the **values()** method to return a list of values without any **keys**.

###### favorite_languages.py

<pre>
<code>
    favorite_languages = { 
        'jen': 'python', 
        'sarah': 'c', 
        'edward': 'ruby', 
        'phil': 'python', 
    }
    
    print("The following languages have been mentioned:")
    for language in favorite_languages.values():
        print(language.title())

    ''' Output:
        The following languages have been mentioned:
        Python
        C
        Python
        Ruby '''
</code>
</pre>

> Note:
>
> This approach pulls all the values from the dictionary without checking for **repeats**.

To see each language choosen without repetition, we can use a set. A **set** is a collection in which each item must be unique.

<pre>
<code>
    favorite_languages = { 
        'jen': 'python', 
        'sarah': 'c', 
        'edward': 'ruby', 
        'phil': 'python', 
    }
    print("The following languages have been mentioned:") 
    for language in set(favorite_languages.values()):
        print(language.title())

    ''' Output:
        The following languages have been mentioned:
        Python
        C
        Ruby '''
</code>
</pre>

> Note:
>
> We can build a **set** directly using braces and seperating the elements with commas:
>
> \>>> languages = {'python', 'ruby', 'python', 'c'}<br> > \>>> languages<br>
> {'ruby', 'python', 'c'}
>
> **When you see braces but no key-value pairs, you’re probably looking at a set. Unlike lists and dictionaries, sets do not retain items in any specific order.**

#### 4. Nesting

Sometimes you’ll want to store **multiple dictionaries** in a **list**, or **a list of items as a value in a dictionary**. This is called **nesting**.

##### A List of Dictionaries

###### aliens.py

<pre>
<code>
    alien_0 = {'color': 'green', 'points': 5}
    alien_1 = {'color': 'yellow', 'points': 10}
    alien_2 = {'color': 'red', 'points': 15}

    aliens = [alien_0, alien_1, alien_2]

    for alien in aliens:
        print(alien)

    ''' Output:
        {'color': 'green', 'points': 5}
    {'color': 'yellow', 'points': 10}
    {'color': 'red', 'points': 15} '''
</code>
</pre>

###### aliens.py

<pre>
<code>
    # Make an empty list for sorting aliens.
    aliens = []

    # Make 30 green aliens.
    for alien_number in range(30):
        new_alien = {'color': 'green', 'points': 5, 'speen': 'slow'}
        aliens.append(new_alien)
    
    # Show the first 5 aliens.
    for alien in aliens[:5]:
        print(alien)
    print("...")

    # Show how many aliens have been created.
    print(f"Total numbers of aliens: {len(aliens)}")

    ''' Output:
        {'speed': 'slow', 'color': 'green', 'points': 5}
        {'speed': 'slow', 'color': 'green', 'points': 5}
        {'speed': 'slow', 'color': 'green', 'points': 5}
        {'speed': 'slow', 'color': 'green', 'points': 5}
        {'speed': 'slow', 'color': 'green', 'points': 5} 

        ... '''

        Total number of aliens: 30 '''
</code>
</pre>

Python considers each one a separate object, which allows us to modify each alien individually.

<pre>
<code>
    # Make an empty list for sorting aliens.
    aliens = []

    # Make 30 green aliens.
    for alien_number in range(30):
        new_alien = {'color': 'green', 'points': 5, 'speen': 'slow'}
        aliens.append(new_alien)

    for alien in aliens[:3]
        if alien['color'] == 'green':
            alien['color'] = 'yellow'
            alien['speed'] = 'medium'
            alien['points'] = 10
    
    # Show the first 5 aliens.
    for alien in aliens[:5]:
        print(alien)
    print("...")

    ''' Output:
        {'speed': 'medium', 'color': 'yellow', 'points': 10}
        {'speed': 'medium', 'color': 'yellow', 'points': 10}
        {'speed': 'medium', 'color': 'yellow', 'points': 10}
        {'speed': 'slow', 'color': 'green', 'points': 5}
        {'speed': 'slow', 'color': 'green', 'points': 5} 
        
        ... '''
</code>
</pre>

##### A List in a Dictionary

It's sometimes useful to put a list inside a dictionary.

###### pizza.py

<pre>
<code>
    # Store information about a pizza being ordered.
    pizza = {
        'crust': 'thick',
        'toppings': ['mushrooms', 'extra cheese'],
    }

    # Summarize the order.
    print(f"You orderd a {pizza['crust']}-crust pizza"
        "with the following toppings:")
    
    for topping in pizza['toppings']:
        print(f"\t{topping}")
    
    ''' Output:
        You ordered a thick-crust pizza with the following toppings:
            mushrooms
            extra cheese '''
</code>
</pre>

We can nest a list inside a dictionary any time you want more than one value to be associated with a single key in a dictionary.

###### favorite_languages.py

<pre>
<code>
    favorite_languages = {
        'jen': ['python', 'ruby'],
        'sarah': ['C'],
        'edward': ['ruby', 'go'],
        'phil': ['python', 'haskell'],
    }

    for name, languages in favorite_languages.items():
        print(f"\n{name.title()}'s favorite languages are:")
        for language in languages:
            print(f"\t{language.title()}")

    ''' Output:
        Jen's favorite languages are:
            Python
            Ruby

        Sarah's favorite languages are:
            C

        Phil's favorite languages are:
            Python
            Haskell

        Edward's favorite languages are:
            Ruby
            Go 
        '''
        
</code>
</pre>

> Note:
>
> You should not nest lists and dictionaries too deeply. If you're nesting items much deeper than what you see in the preceding examples or you’re working with someone else’s code with significant levels of nesting, most likely a simpler way to solve the problem exists.

##### A Dictionary in a Dictionary

We can nest a dictionary inside another dictionary, but our code can get complicated quickly when we do.

###### many_users.py

<pre>
<code>
    users = {
        'aeinstein': {
            'first': 'albert',
            'last': 'einstein',
            'location': 'princeton',
        },

        'mcurie': {
            'first': 'marie',
            'last': 'curie',
            'location': 'paris',
        },
    }

    for username, user_info in users.items():
        print(f"\nUsername: {username}")
        full_name = f"{user_info['first']} {user_info['last']}"
        location = user_info['location']

        print(f"\tFull name: {full_name.title()}")
        print(f"\tLocation: {location.title()}")

    ''' Output:
        Username: aeinstein
            Full name: Albert Einstein
            Location: Princeton
        Username: mcurie
            Full name: Marie Curie
            Location: Paris '''
</code>
</pre>

Notice that the structure of each user’s dictionary is identical. Although not required by Python, this structure makes nested dictionaries easier to work with. If each user’s dictionary had different keys, the code inside the for loop would be more complicated.

{% endraw %}

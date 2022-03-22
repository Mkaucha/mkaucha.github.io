---
layout: blogdetail
author: Milan Kaucha
title: Variables and Simple Data Types
categories: Python
excerpt_separator: <!--more-->
---

{% raw %}

###### hello_world.py

<pre>
<code>
  print("Hello Python world!")
</code>
</pre>

When you run the file **hello_world.py**, the ending **.py** indicates that the file is a Python program. Your editor then runs the file through the **Python interpreter**. When the interpreter sees the word print followed by parentheses, it prints to the screen whatever is inside the parentheses.

#### 1. Variables

###### hello_world.py

<pre>
<code>
  message = "Hello Python world!"
  print(message)

  ''' output:
      Hello Python world! '''
</code>
</pre>

We've added the variable name **message**. Every variable is connected to a value, which is the information associated with that variable.

###### hello_world.py

<pre>
<code>
  message = "Hello Python world!"
  print(message)

  message = "Hello Python Blog world!"
  print(message)
    
  ''' output:
      Hello Python world! 
      Hello Python Blog world! '''

</code>
</pre>

You can change the value of variable in your program at any time, and Python will always keep track of its current value.

##### Naming and Using Variables

When you're using variables in Python, you need to adhere to a few rules and guidelines. Be sure to keep the following rules in mind:

1. Variable names can contain only letters, numbers and underscores. They can start with a letter or an underscore, but not with a number.

2. Space are not allowed in variable names, but underscore can be used to seperate words in variable names.

3. Avoid using Python keywords and function name as variable names.

4. Variable names should be short and descriptive. For example, name is better than n.

> Note
>
> The python variables should be lowercase. You won't get errors if you use uppercase letter, but upper case letters in variable names have special meanings.

##### Avoid Name Errors When Using Variables

We'll write some code that generates an error on purpose.

<pre>
<code>
  message = "Hello Python world!"
  print(mesage)

  ''' Traceback (most recent call last):
        File "hello_world.py", line 2, in < module >
        print(mesage)
      NameError: name 'mesage' is not defined '''
</code>
</pre>

The interpreter provies a traceback when a program cannot run successfully. A **traceback** is a record where the interpreter ran into trouble when trying to execute your code.

The output reports that an error occurs in line 2 of the file **hello_world .py**. It found a **name error** and reports that the variable being printed, message, has not been defined.

#### 2. Strings

A **string** is a series of characters. Anything inside quotes is considered a string in Python, and you can use single or double quotes around your strings like this:

<pre>
<code>
    "This is a string."
    'This is also a string.'

    'I told my friend, "Python is my favorite language!"'
    "The language 'Python' is named after Monty Python, not the snake."
    "One of Python's strengths is its diverse and supportive community." 
</code>
</pre>

##### Changing Case in a String with Methods

###### name.py

<pre>
<code>
    name = "ada lovelace"
    print(name.title())

    ''' Output: 
        Ada Lovelace '''
</code>
</pre>

Here, the variable name refers to the lower case string **"ada lovelace"**. The method **title()** appears after the variable in the **print()** call. A **method** is an action that Python can perform on a piece of data. The **dot (.)** after name in **name.title()** tells Python to make the **title()** method act on variable name. Every method is followed by a set of parentheses, because methods often need additional information to do their work.

Several other useful methods are available for dealing with case as well. For example, you can change a string to all uppercase or all lowercase letters with **name.upper()** and **name.lower()** .

##### Using Variable in Strings

###### full_name.py

<pre>
<code>
    first_name = "ada"
    last_name = "lovelace"
    full_name = f"{first_name} {last_name}"
    print(full_name)

    ''' Output:
        ada lovelace'''

    print(f"Hello, {full_name.title()}!")

    ''' Output:
        Hello, Ada Lovelace! '''

    message = f"Hello, {full_name.title()}!"
    print(message)

    ''' Output:
        Hello, Ada Lovelace! '''
</code>
</pre>

Python will replace each variable with its value when the string is displayed.
These strings are called **f-string**. The **f** is for **format**, because Python formats the string by replaceing the name of any variable in braces with its value.

> Note
>
> **F-strings** were first introduced in Python 3.6. If you’re using Python 3.5 or earlier, you’ll need to use the **format()** method rather than this f syntax.
>
> full_name = "{} {}".format(first_name, last_name)
>
> Each variable is reffered to by a set of braces; the braces will be filled by the values listed in parentheses in the order provided.

##### Adding Whitespace to Strings with Tabs or Newlines

In programming, whitespace refers to any nonprinting character, such as **spaces, tabs and end-of-line** symbols.

<pre>
<code>
    >>> print("Python")
    Python

    >>> print("\tPython")
        Python

    >>> print("Languages:\nPython\nC\nJavascript")
    Languages:
    Python
    C
    Javascript

    >>> print("Languages:\n\tPython\n\tC\n\tJavascript")
    Languages:
        Python
        C
        Javascript
        
</code>
</pre>

To add a newline in a string, use **\n**.<br>
To add a tab in a string, use **\t**.

##### Stripping Whitespace

It's important to think about whitespace, because often you'll want to compare two strings to determine whether they are same.

Python can look for extra whitespace on the right and left sides of a string. To ensure that no whitespace exists on both sides of string use **rstrip()** method.

<pre>
<code>
    >>> favorite_language = 'python  '

    >>> favorite_language
    'python  '

    >>> favorite_language.rstrip()
    'python'

    >>> favorite_language
    'python  '

</code>
</pre>

To remove the whitespace from the string permanently,you have to associate the stripped value with the variable name:

<pre>
<code>
    >>> favorite_language = 'python  '
    >>> favorite_language = favorite_language.rstrip()
    >>> favorite_language
    'python'
</code>
</pre>

You can also strip whitespace from the left side of a string using the **lstrip()** method and **rstrip()** method for trailing space, or from both sides at once using **strip()**.

#### Avoiding Syntax Errors with Strings

A **syntax error** occurs when Python doesn't recognize a section of your program as valid Python code.

##### apostrophe.py

<pre>
<code>
    message = 'One of Python's strenghts is its diverse community.'
    print(message)

    ''' Output:
        File "apostophe.py", line 1
           message = '...
    SyntaxError: invalid syntax '''
</code>
</pre>

#### 3. Numbers

Python treats numbers in several different ways,depending on how they’re being used.

##### Integers

You can add **(+)**, subtract **(-)**, multiply **(\*)**, and divide **(/)** integers in Python.

<pre>
<code>
    >>> 2 + 3
    5
    >>> 3 - 2
    1
    >>> 2 * 3
    6
    >>> 3 / 2
    1.5

    # Python uses two multiplication symbols to represent exponents:
    >>> 3 ** 2
    9
    >>> 3 ** 3
    27
    >>> 10 ** 6
    1000000

    # Python supports the order of operations too, so we can use mutiple operations. We can also use parentheses to modify the order of operations
    >>> 2 + 3 * $
    14
    >>> (2 + 3) * 4
    20
</code>
</pre>

##### Floats

Python calls any number with a decimal point a **float**.

<pre>
<code>
    >>> 0.1 + 0.1
    0.2
    >>> 0.2 + 0.2
    0.4
    >>> 2 * 0.1
    0.2
    >>> 2 * 0.2
    0.4

    # But be aware that you can sometimes get an arbitrary number of decimal places in your answer:
    >>> 0.2 + 0.1
    0.30000000000000004
    >>> 3 * 0.1
    0.30000000000000004 
</code> 
</pre>

##### Integers and Floats

<pre>
<code>
    # When you divide any two numbers, even if they are  integers that result is whole number.
    >>> 4 / 2
    2.0

    # If you mix an integer and a float in any other operation, you’ll get a float as well:
    >>> 1 + 2.0
    3.0
    >>> 2 * 3.0
    6.0
    >>> 3.0 ** 2
    9.0

    # Python defaults to a float in any operation that uses a float, even if the output is a whole number. 
</code>
</pre>

##### Underscores in Numbers

You can group digits using underscores to make large nubmer more readable:

<pre>
<code>
    >>> universe_age = 14_000_000_000
    >>> print(universe_age)
    14000000000
</code>
</pre>

Python ignores the underscores when storing these kinds of values.

##### Multiple Assignment

You can assign values to more than one variable using just a single line.

<pre>
<code>
    >>> x, y, z = 1, 2, 0
</code>
</pre>

As long as the number of values matches the number of variables, Python will match them up correctly.

##### Constants

A constant is like a variable whose value stays the same throughout the life of a program. **Python doesn't have built-in constant types**, but Python programmers use all **capital letters** to indicate a variable should be treated as a **constant** and never be changed

<pre>
<code>
    MAX_CONNECTIONS = 5000
</code>
</pre>

#### 4. Comments

Comments are an exremely useful feature in most programming languages. A **comment** allows you to write notes in English within your programs. The main reason to write comments is to explain what your code is supposed to do and how you are making it work.

###### comment.py

<pre>
<code>
    # Say hello to everyone.
    print("Hello Python people!")
    
    ''' Output:
        Hello Python people!'''

    # Python ignores the first line and executes the second line.
</code>
</pre>

{% endraw %}

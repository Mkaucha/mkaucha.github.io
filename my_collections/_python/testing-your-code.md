---
layout: blogdetail
author: Milan Kaucha
title: Testing Your Code
categories: Python
excerpt_separator: <!--more-->
---

When you write a function or a class, you can also write tests for that code. Testing proves that your code works as it’s supposed to in response to all the input types it’s designed to receive.

<!--more-->

#### 1. Testing a Function

Here’s a simple function that takes in a first and last name, and returns a neatly formatted full name:

###### name_function.py

<pre>
<code>
    def get_formatted_name(first, last):
        """Generate a neatly formatted full name."""
        full_name = f"{first} {last}"
        return full_name.title()
</code>
</pre>

###### names.py

<pre>
<code>
    from name_function import get_formatted_name

    print("Enter 'q' at any time to quit.")
    while True:
        first = input("\nPlease give me a first name: ")
        if first == 'q':
            break
        last = input("Please give me a last name: ")
        if last == 'q':
            break
        formatted_name = get_formatted_name(first, last)
        print(f"\tNeatly formatted name: {formatted_name}.") 

    ''' Output:
        Enter 'q' at any time to quit.

        Please give me a first name: janis 
        Please give me a last name: joplin 
            Neatly formatted name: Janis Joplin.

        Please give me a first name: bob 
        Please give me a last name: dylan 
            Neatly formatted name: Bob Dylan.

        Please give me a first name: q 
    '''
</code>
</pre>

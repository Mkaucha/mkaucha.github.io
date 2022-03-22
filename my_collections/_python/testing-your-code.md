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

Python provides an efficient way to automate the testing of a function’s output. If we automate the testing of **get_formatted_name()**, we can always be confident that the function will work when given the kinds of names we’ve written tests for.

##### Unit Tests and Test Cases

The **module unittest** from the Python standard library provides tools for testing your code. A **unit test** verifies that one specific aspect of a function's behavior is correct.

A **test case** is a collection of **unit tests** that together prove that a function behaves as it’s supposed to, within the full range of situations you expect it to handle.

A **good test case** considers all the possible kinds of input a function could receive and includes tests to represent each of these situation. A test case with **full coverage** includes a full range of **unit tests** covering all the possible ways we can use a function.

> Note:
>
> Its's often good enough to write tests for our code's critical behaviors and then aim for full coverage only if the project starts to see widespread use.

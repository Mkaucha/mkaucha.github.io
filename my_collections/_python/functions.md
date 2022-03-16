---
layout: python
author: Milan Kaucha
title: Functions
categories: Python
excerpt_separator: <!--more-->
---

Functions are named blocks of code that are designed to do one specific task. When we want to perform a particular task that you've defined in a function, we **call** the function responsible for it.

#### 1. Defining a function

###### greeting.py

<pre>
<code>
    def greet_user():
        """Display a simple greeting."""
        print("Hello!")
    
    greet_user()
</code>
</pre>

The keyword **def** inform Python that we are defining a function. This is the **function definition**, which tells Python the name of the function and, if applicable, what kind of information the function needs to do its job. The **parentheses** hold that information.

Any **intended line** after the **function definition** make up the body of the function. Docstrings are enclosed in triple quotes, which Python looks for when it generates documentation for the functions in our programs.

When you want to use this **function**, you call it. A function call tells Python to execute the code in the function. To call a function, you write the **name of the function, followed by any necessary information in parentheses**.

##### Passing Information to a Function

###### greeting.py

<pre>
<code>
    def greet_user(username):
        """Display a simple greeting."""
        print(f"Hello, {username.title()}")

    greet_user('jesse') 

    ''' Output:
        Hello, Jesse! '''
</code>
</pre>

The **function** now expects you to provide a value for username each time you call it. Now, we can call **greet_user()** as often as you want and pass it any name you want to produce a predictable output every time.

##### Arguments and Parameters

The variable username in the definition of **greet_user()** is an example of a **parameter**, a piece of information the function needs to do its job. The value **'jesse'** in **greet_user('jesse')** is an example of a **argument**.

In this example the argument **'jesse'** was passed to the function **greet_user()**, and the value was assigned to the parameter **username**.

#### 2. Passing Arguments

A function can have **multiple parameters**, a function call may need **multiple arguments**. We can pass arguments to our functions in number of ways.

- We can use **positional arguments**, which need to be in the **same order** the **parameters** were written.
- **keyword arguments**, where each argument consists of a **variable name and a value**; and **list and dictionaries of values**.

##### Positional Arguments

When you call a function, Python must match each **argument** in the function call with a **parameter** in the function definition. Values matched this way are called **Positional Arguments**.

###### pets.py

<pre>
<code>
    def describe_pet(animal_type, pet_name):
        """Display information about a pet."""
        print(f"\nI have a {animal_type}.")
        print(f"My {animal_type}'s name is {pet_name.title()}.")

    describe_pet('hamster', 'harry')

    ''' Output:
        I have a hamster.
        My hamster's name is Harry. '''
</code>
</pre>

The **argument 'hamster'** is assigned to **parameter animal_type** and the **argument 'harry'** is assigned to the **parameter pet_name**.

##### Multiple Function Calls

You can call a function as many times as needed.

###### pets.py

<pre>
<code>
    def describe_pet(animal_type, pet_name):
        """Display information about a pet."""
        print(f"\nI have a {animal_type}.")
        print(f"My {animal_type}'s name is {pet_name.title()}.")

    describe_pet('hamster', 'harry')
    describe_pet('dog', 'willie') 

    ''' Output:
        I have a hamster.
        My hamster's name is Harry. 
        
        I have a dog.
        My dog's name is Willie. 
    '''
</code>
</pre>

Here, anytime you want to describe a new pet, you call the function with the new pet's information.x

##### Order Matters in Positional Arguments

You can get unexpected results if you mix up the order of the arguments in a function call when using positional arguments.

###### pets.py

<pre>
<code>
    def describe_pet(animal_type, pet_name):
        """Display information about a pet."""
        print(f"\nI have a {animal_type}.")
        print(f"My {animal_type}'s name is {pet_name.title()}.")

    describe_pet('harry', 'hamster')

     ''' Output:
        I have a harry.
        My harry's name is Hamster. 
    '''
</code>
</pre>

##### Keyword Arguments

A **keyword argument** is a name-value pair that we pass to a function. You directly associates the name and value within the argument. **keyword arguments** free us from having to worry about correctly ordering our arguments in the function call.

###### pets.py

<pre>
<code>
    def describe_pet(animal_type, pet_name):
        """Display information about a pet."""
        print(f"\nI have a {animal_type}.")
        print(f"My {animal_type}'s name is {pet_name.title()}.")

    describe_pet(animal_type='hamster', pet_name='harry')
    describe_pet(pet_name='harry', animal_type='hamster') 

     ''' Output:
        I have a hamster.
        My hamster's name is Harry. 

        I have a hamster.
        My hamster's name is Harry. 
    '''
</code>
</pre>

> Note:
>
> When we use **keyword arguments**, be sure to use the exact names of the **parameters** in the function's definition.

##### Default Values

When writing a function, we can define a default value for each parameter. If an argument for a parameter is provided in the function call, Python uses the argument value.

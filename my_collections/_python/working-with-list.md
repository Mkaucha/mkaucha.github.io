---
layout: python
author: Milan Kaucha
title: Working With Lists
categories: Python
excerpt_separator: <!--more-->
---

#### 1. Looping Through an Entire List

###### magician.py

<pre>
<code>
    magicians = ['alice', 'david', 'carolina']
    for magician in magicians:
        print(magician)

    ''' Output: 
        alice
        david
        carolina '''
</code>
</pre>

##### A Closer Look at Looping

The concept of looping is important because it’s one of the most common ways a computer automates repetitive tasks.

<pre>
<code>
    for magician in magicians:
</code>
</pre>

This line tells Python to retrieve the first value from the **list magicians** and associate it with the variable **magician**. Then python prints the current value with **print()** method.

Because the list contains more value, Python returns to the first line of the loop and retrieves the next value in the list and associate that value with the variable magician.

Using **singular** and **plural** names can help you identify whether a section of code is working with a single element from the list or the entire list.

##### Doing More Work Within a for Loop

###### magicians.py

<pre>
<code>
    magicians = ['alice', 'david', 'carolina'] 
    for magician in magicians:
        print(f"{ magician.title(), that was a great trick!}\n") 

    ''' Output: 
        Alice, that was a great trick!
        David, that was a great trick!
        Carolina, that was a great trick! '''
</code>
</pre>

#### 2. Making Numerical Lists

Lists are ideal for storing sets of numbers, and Python provides a variety of tools to help you work efficiently with lists of numbers.

##### Using the range() Function

Python's **range()** function makes it easy to generate series of numbers.

###### first_numbers.py

<pre>
<code>
    for value in range(1, 5):
        print(value)

    ''' Output: 
        1
        2
        3
        4 '''
</code>
</pre>

Here, **range()** prints only the numbers 1 through 4. This is result of the off-by-one behavior.

You can also pass **range()** only one argument, and it will start the sequence of numbers at **0**. For example, **range(6)** would return the numbers from **0 through 5**.

##### Using range() to Make a List of Numbers

If you want to make a list of numbers, you can convert the results of **range()** directly into a list using the **list()** function.

<pre>
<code>
    numbers = list(range(1, 6))
    print(numbers)

    ''' Output:
        [1, 2, 3, 4, 5]
</code>
</pre>

We can also use the **range()** function to tell Python to skip numbers in a given range. If you pass **third** argument to **range()**, Python uses that value as a step size when generating numbers.

###### even_numbers.py

<pre>
<code>
    even_numbers = list(range(2, 11, 2))
    print(even_numbers)

    ''' Output:
        [2, 4, 6, 8, 10] '''
</code>
</pre>

The **range()** function starts with the value 2 and then adds 2 to that value. It adds 2 repeatedly until it reaches or passes the end value, 11.

###### squares.py

<pre>
<code>
    squares = []
    for value in range(1, 11):
        square = value ** 2
        squares.append(square)
    print(squares)

    ''' Output: 
        [1, 4, 9, 16, 25, 36, 49, 64, 81, 100] '''

    # To write this code more concisely: 
     
    squares = []
    for value in range(1, 11):
        squares.append(value ** 2)
    print(squares)

</code>
</pre>

> Note
>
> Focus first on writing code that you understand clearly, which does what you want it to do. Then look for more efficient approaches as you review your code.

##### Simple Statistics with a List of Numbers

A few Python functions are helpful when working with lists of numbers.

<pre>
<code>
    >>> digits = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0] 
    >>> min(digits)
    0
    >>> max(digits)
    9
    >>> sum(digits)
    45 
</code>
</pre>

##### List Comprehensions

A **list comprehension** allows you to generate list in just one line of code. A list comprehension combines the **for loop** and the **creation of elements** into one line, and automatically appends each new element.

###### squares.py

<pre>
<code>
    squares = [value ** 2 for value in range(1, 11)]
    print(squares)

    ''' Output: 
        [1, 4, 9, 16, 25, 36, 49, 64, 81, 100] '''
</code>
</pre>

#### 4. Working with Part of a list

We can work with a specific group of items in a list, which Python calls a **slice**.

##### Slicing a List

To make a **slice**, you specify the index of the first and last elements you want to work with. As with the **range()** function, Python stops one item before the second index you specify.

###### players.py

<pre>
<code>
    players = ['charles', 'martina', 'michale', 'florence', 'eli']
    print(players[0:3])

    ''' Output:
        ['charles', 'martina', 'michale'] '''

    print(players[1:4])

    ''' Output: 
        ['martina', 'michale', 'florence'] '''
    
    # Without a starting index, Python starts at the beginning of the list: 
    print(players[:4])
    
    ''' Output:
        ['charles', 'martina', 'michale', 'florence'] '''

    # If you want a slice that includes the end of a list.
    print(players[2:])

    ''' Output:
        ['michale', 'florence', 'eli'] '''

    # if we want to output the last three items in a list.
    print(players[-3:])

    ''' Output:
        ['michale', 'florence', 'eli'] '''
</code>
</pre>

##### Looping Through a Slice

You can use a slice in a for loop if you want to loop through a subset of the elements in a list.

<pre>
<code>
    players = ['charles', 'martina', 'michale', 'florence', 'eli']
    for player in players[:3]:
        print(player.title())
    
    ''' Output: 
        Charles
        Martina
        Michale  '''
</code>
</pre>

##### Copying a List

To copy a list, you can make a slice that includes the entire original list by omitting the first index and the second index ([:]).

###### foods.py

<pre>
<code>
    my_foods = ['pizza', 'falafel', 'carrot cake']
    friend_foods = my_foods[:]

    print('My favorite foods are:')
    print(my_foods)

    ''' Output:
            ['pizza', 'falafel', 'carrot cake'] '''

    print("My friend's favorite fruit are:")
    print(friend_foods)

    ''' Output:
            ['pizza', 'falafel', 'carrot cake'] '''

    # To prove that we actually have two separate lists
    my_foods.append('cannoli')
    friend_foods.append('ice cream')

    print(my_foods)
    ''' Output:
            ['pizza', 'falafel', 'carrot cake', 'cannoli'] ''' 

    print(friend_foods)
    ''' Output:
            ['pizza', 'falafel', 'carrot cake', 'ice cream'] ''' 
</code>
</pre>

If we had simply set friend_foods equal to my_foods, **we would not produce two separate lists**.

<pre>
<code>
    my_foods = ['pizza', 'falafel', 'carrot cake'] 
    friend_foods = my_foods

    my_foods.append('cannoli')
    friend_foods.append('ice cream')

    print("My favorite foods are:") 
    print(my_foods) 

    ''' Output:
        My favorite foods are:
        ['pizza', 'falafel', 'carrot cake', 'cannoli', 'ice cream'] '''

    print("My friend's favorite foods are:") 
        print(friend_foods) 
    
    ''' Output:
        My favorite foods are:
        ['pizza', 'falafel', 'carrot cake', 'cannoli', 'ice cream'] '''

</code>
</pre>

#### 4. Tuples

Python refers to values that cannot change as **immutable**, and an immutable list is called a **tuple**.

##### Defining a Tuple

A tuple looks just like a list except you use parentheses instead of square brackets. You can access individual elements in a tuple by using each item's index, just as you would for list.

###### dimensions.py

<pre>
<code>
    dimensions = (200, 50)
    print(dimensions[0])
    print(dimensions[1])

    ''' Output: 
        200
        50 '''
</code>
</pre>

If we try to change one of the items in the tuple. Python returns **type error**. Basically, because you're trying to alter a tuple, which cannot be done to that type of object.

###### dimensions.py

<pre>
<code>
    dimensions = (200, 50)
    dimensions[0] = 250

    Traceback (most recent call last):
      File "dimensions.py", line 2, in < module >
        dimensions[0] = 250
    TypeError: 'tuple' object does not support item assignment 
</code>
</pre>

> Note
>
> If you want to define a tuple with one element, you need to include a trailing comma.
>
> my_t = (3,)

##### Looping Through All Values in a Tuple

You can loop over all the values in a tuple using a for loop.

<pre>
<code>
    dimesions = (200, 50)
    for dimension in dimensions:
        print(dimension)

    ''' Output: 
        200
        50 '''
</code>
</pre>

##### Writing over a Tuple

Although, you can't modify a tuple, you can assign a new value to a variable that represents a tuple.

<pre>
<code>
    dimesions = (200, 50)
    print("Original dimesions:")
    for dimension in dimensions
        print(dimension)
    
    ''' Output: 
        200
        50 '''
    
    dimensions = (400, 100)
    print("Modified dimensions")
    for dimension in dimensions
        print(dimension)
    
    ''' Output: 
        400
        100 '''
</code>
</pre>

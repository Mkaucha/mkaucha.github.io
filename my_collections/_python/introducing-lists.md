---
layout: blogdetail
author: Milan Kaucha
title: Introducing Lists
categories: Python
excerpt_separator: <!--more-->
---

List allows you to store sets of information in one place. Lists are one of Python's most powerful features.

<!--more-->

#### 1. What is List?

A **list** is a collection of items in a particular order. You can make a list that includes the letters of the alphabet, the digits from 0-9 etc. You can put anything you want into a list, and the items in your list don't have to be related in any particular way.

In Python, **square brackets ([])** indicate a list, and individual elements in the list are seperated by commas.

###### bicycles.py

<pre>
<code>
    bicycle = ['trek', 'cannondale', 'redline', 'specialized']
    print(bicycle)

    ''' output:
        ['trek', 'cannondale', 'redline', 'specialized'] '''
</code>
</pre>

##### Accessing Elements in a List

List are ordered collections, so you can access any element in a list by telling Python the position, or index, of the item desired. To access an element in a list, write the name of the list followed by the index of item enclosed in square bracket.

<pre>
<code>
    bicycle = ['trek', 'cannondale', 'redline', 'specialized']
    print(bicycle[0])

    ''' output: 
        trek '''

    # Index position start at 0, Not 1

    print(bicycle[1])
    print(bicycle[3])

    ''' output: 
        cannondale
        specialized '''

     print(bicycle[-1])

    ''' output: 
        specialized '''
</code>
</pre>

By asking for the item at index -1, Python always return the last item in the list. This convention extends to other negative index value as well. The index -2 returns the second item from the end of list, and index -3 return the third item from the end and so forth.

#### 2. Changing, Adding, and Removing Elements

Most lists you create will be dynamic, You'll build a list and then add and remove elements from it as your program runs its course.

##### Modifying Elements in a List

###### motorcycles.py

<pre>
<code>
    motorcycles = ['honda', 'yamaha', 'suzuki']
    print(motorcycles)

    ''' Output: 
        ['honda', 'yamaha', 'suzuki'] '''

    motorcycles[0] = 'ducati'
    print(motorcycles)

    ''' Output: 
        ['ducati', 'yamaha', 'suzuki'] '''

</code>
</pre>

##### Adding Elements to a List

###### Appending Elements to the End of a List

The simplest way to add a new element to a list is to append the item to the list. When you append an item to a list, the new element is added to the end of the list.

###### motorcycles.py

<pre>
<code>
    motorcycles = ['honda', 'yamaha', 'suzuki']
    print(motorcycles)

    ''' Output: 
        ['honda', 'yamaha', 'suzuki'] '''

    motorcycles.append('ducati')
    print(motorcycles)

    ''' Output: 
        ['ducati', 'yamaha', 'suzuki', 'ducati'] '''

    motorcycles = []

    motorcycles.append('honda')
    motorcycles.append('yamaha')
    motorcycles.append('suzuki')

    print(motorcycles)

    ''' Output: 
    ['honda', 'yamaha', 'suzuki'] '''
</code>
</pre>

###### Inserting Elements into a List

You can add a new element at any position in your list by using the **insert()** method. You do this by specifying the index of the new element and the value of the new item.

<pre>
<code>
    motorcycles = ['honda', 'yamaha', 'suzuki']
    motorcycles.insert(0, 'ducati')
    print(motorcycles)

    ''' Output: 
    ['ducati', 'honda', 'yamaha', 'suzuki'] '''
</code>
</pre>

This opeartion shifts every other value in the list one position to the right.

##### Removing Elements from a List

###### Removing an Item using the del Statement

If you know the position of the item you want to remove from a list, use del statement.

<pre>
<code>
    motorcycles = ['honda', 'yamaha', 'suzuki']
    print(motorcycles)

    ''' Output: 
        ['honda', 'yamaha', 'suzuki'] '''

    del motorcycles[0]
    print(motorcycles)

    ''' Output: 
        [yamaha', 'suzuki'] '''
</code>
</pre>

###### Removing an Item using the pop() method

The **pop()** method removes the last item in a list, but it lets you work with that item after removing it.

<pre>
<code>
    motorcycles = ['honda', 'yamaha', 'suzuki']
    print(motorcycles)
    ''' Output:
        ['honda', 'yamaha', 'suzuki'] '''

    popped_motorcyle = motorcycles.pop()
    print(motorcycles)
    ''' output: 
        ['honda', 'yamaha', 'suzuki'] '''

    print(popped_motorcycle)
    ''' output: 
        suzuki '''
</code>
</pre>

###### Popping Items from any Position in a List

We can use **pop()** to remove an item from any position in a list by including index of the item you want to remove in parentheses.

<pre>
<code>
    motorcycles = ['honda', 'yamaha', 'suzuki'] 

    first_owned = motorcycles.pop(0)
    print(f"The first motorcycle I owned was {first_owned.title()}")

    ''' Output:
        The first motorcycle I owned was a Honda. '''
</code>
</pre>

> Note
>
> When you use **pop()**, the item you work with is no longer stored in the list.
>
> when you want to delete an item from a list and not use that item in any way, use the **del** statement; if you want to use an item as you remove it, use the **pop()** method.

###### Removing an Item by Value

If you only know the value of the item you want to remove, use the **remove()** method.

<pre>
<code>
    motorcycles = ['honda', 'yamaha', 'suzuki', 'ducati']
    print(motorcycles)

    ''' Output:
        ['honda', 'yamaha', 'suzuki', 'ducati'] '''

    motorcycles.remove('ducati')
    print(motorcycles)

    ''' Output:
        ['honda', 'yamaha', 'suzuki'] '''
</code>
</pre>

We can also use the **remove()** method to work with a value that's being removed from a list.

<pre>
<code>
    motorcycles = ['honda', 'yamaha', 'suzuki', 'ducati']
    print(motorcycles)
    ''' Output:
        ['honda', 'yamaha', 'suzuki', 'ducati'] '''

    too_expensive = 'ducati'
    motorcycles.remove(too_expensive)
    print(motorcycles)
    ''' Output:
        ['honda', 'yamaha', 'suzuki'] '''

    print(f"A {too_expensive.title} is too expensive for me.")
    ''' Output:
        A Ducati is too expensive for me. '''

</code>
</pre>

#### 3. Organizing a List

Python provides a number of different ways to organize your lists, depending on the situation.

##### Sorting a List Permanently with the sort() Method

The **sort()** method changes the order of the list permanently.

###### cars.py

<pre>
<code>
    cars = ['bmw', 'audi', 'toyota', 'subaru']
    cars.sort()
    print(cars)

    ''' Output: 
        ['audi', 'bmw', 'subaru', 'toyota'] ''' 

    cars.sort(reverse=True)
    print(cars)

    ''' Output:
        ['toyota', 'subaru', 'bmw', 'audi'] '''

</code>
</pre>

##### Sorting a List Temporarily with the sorted() Function

The **sorted()** function lets you display your list in a particular order but doesn't affect the actual order of the list.

<pre>
<code>
    cars = ['bmw', 'audi', 'toyota', 'subaru']
    print("Here is the original list:")
    print(cars)

    ''' Output:
        ['bmw', 'audi', 'toyota', 'subaru'] '''
    
    print("Here is the sorted list:")
    print(sorted(cars))

    ''' Output: 
        ['audi', 'bmw', 'subaru', 'toyota'] '''
    
    print("Here is the original list again:")
    print(cars)

    ''' Output:
        ['bmw', 'audi', 'toyota', 'subaru'] '''    
</code>
</pre>

##### Printing a List in Reverse Order

To reverse the original order of a list, you can use the **reverse()** method. The **reverse()** doesn't sort backward alphabetically, it simply reverses the order of the list. The **reverse()** method changes the order of a list permanently, but you can revert to original order anytime by applying **reverse()** to the same list a second time.

<pre>
<code>
    cars = ['bmw', 'audi', 'toyota', 'subaru']
    print(cars)

    ''' Output:
        ['bmw', 'audi', 'toyota', 'subaru'] '''

    cars.reverse()
    print(cars)

    ''' Output:
        ['subaru', 'toyota', 'audi', 'bmw'] '''


</code>
</pre>

##### Finding the Length of a List

We can find the length of a list by using the **len()** function.

<pre>
<code>
    >>> cars = ['bmw', 'audi', 'toyota', 'subaru']
    >>> len(cars)
    4
</code>
</pre>

> Note
>
> Python counts the items in a list starting with one.

##### Avoiding Index Errors When Working with lists

###### motorcycles.py

<pre>
<code>
    motorcycles = ['honda', 'yamaha', 'suzuki']
    print(motorcycles[3])

    Traceback (most recent call last):
      File "motorcycles.py", line 2, in < module >
        print(motorcycles[3])
    IndexError: list index out of range 

    motorcycles = []
    print(motorcycles[-1]) 
    # No items are in motorcycles, so Python returns another index error: 

    Traceback (most recent call last):
      File "motorcyles.py", line 3, in < module >
        print(motorcycles[-1])
    IndexError: list index out of range
</code>
</pre>

Remember, Python starts indexing at 0. So, the third item index is 2.

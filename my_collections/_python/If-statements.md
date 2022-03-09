---
layout: python
author: Milan Kaucha
title: If Statements
categories: Python
excerpt_separator: <!--more-->
---

Python’s if statement allows you to examine the current state of a program and respond appropriately to that state.

<!--more-->

{% raw %}

#### 1. A Simple Example

The loop in this example first checks if the current value of car is **'bmw'**. If it is, the value is printed in uppercase.

###### cars.py

<pre>
<code>
    cars = ['audi', 'bmw', 'subaru', 'toyota']

    for car in cars:
        if car == 'bmw':
            print(car.upper())
        else:
            print(car.title())
</code>
</pre>

#### 2. Conditional Tests

every if statement is an expression that can be evaluated as **True** or **False** and is called a **conditional test**. If the conditional test evaluates to **True**, Python executes the code following the if statement. If the conditional test evaluates to **False**, Python ignores the code following If statement.

##### Checking for Equality

Most conditional tests compare the current value of a variable to a specific value of interest.

<pre>
<code>
    >>> car = 'bmw'
    >>> car == 'bmw'
    True

    >>> car = 'audi'
    >>> car == 'bmw'
    False
</code>
</pre>

This sets the value of car to 'bmw' using a single equal sign **(=)**. Then checks whether the value of car is 'bmw' using a double equal sign **(==)**. This equality operator returns **True** if the values on the left and right side of the operator match, and **False** if they don’t match.

##### Ignoring Case When Checking for Equality

Two values with different capitalization are not considered equal:

<pre>
<code>
    >>> car = 'Audi'
    >>> car == 'audi'
    False

    >>> car = 'Audi'
    >>> car.lower() == 'audi'
    True
</code>
</pre>

This test would return True no matter how the value 'Audi' is formatted because the test is now case insensitive.

The **lower()** function doesn’t change the value that was **originally** stored in car, so you can do this kind of comparison without affecting the original variable:

<pre>
<code>
    >>> car = 'Audi'
    >>> car.lower() == 'audi'
    True

    >>> car
    'Audi'
</code>
</pre>

##### Checking for Inequality

When you want to determine whether two values are not equal, you can combine an exclamation point and equal sign **(!=)**. The exclamation point represents **not**.

###### toppings.py

<pre>
<code>
    requested_topping = 'mushroom'

    if requested_topping != 'anchovies'
        print("Hold the anchovies")

    ''' Output:
        Hold the anchovies! '''
</code>
</pre>

This compares the value of requested_topping to the value 'anchovies'. If these two values do not match, Python returns True and executes the code following the if statement. If the two value match, Python returns False and does not run the code following the if statement.

##### Numerical Comparisons

<pre>
<code>
    >>> age = 18
    >>> age == 18
    True

    # We can include various mathmatical comparisons in your conditional statements as well.
    >>> age = 19
    >>> age < 21
    True
    >>> age <= 21
    True
    >>> age > 21
    False
    >>> age >= 21
    False
</code>
</pre>

Each mathematical comparision can be used as part of an if statement, which can help you detect the exact conditions of interest.

##### Checking Multiple Conditions

Sometimes, You might need two conditions to be True or might need one condition being True. The keywords **and** and **or** can help you in these situations.

<pre>
<code>
    >>> age_0 = 22
    >>> age_1 = 18
    >>> age_0 >= 21 and age_1 >= 21
    False
    >>> age_1 = 22
    >>> age_0 >= 21 and age_1 >=21
    True
</code>
</pre>

Here, the tests on the left passes, but the test on the right fails, so the overall conditional expression evaluate to **False**. After we change the value of **age_1**, both individual test passes, causing the overall conditional expresstion as **True**.

###### Using or to Check Multiple Conditions

The keyword **or** allows you to check multiple conditions as well, but it passes when either or both of the individual tests pass. It fails only when both individual tests fail.

<pre>
<code>
    >>> age_0 = 22
    >>> age_1 = 18
    >>> age_0 >= 21 or age_1 >= 21
    True

    >>> age_0 = 18
    >>> age_0 >= 21 or age_1 >= 21
    False
</code>
</pre>

##### Checking Whether a Value Is in a List

To find out whether a particular value is already in a list, use the keyword in.

<pre>
<code>
    >>> required_toppings = ['mushroom', 'onions', 'pineapple']
    >>> 'mushroom' in requested_toppings
    True

    >>> 'pepperoni' in requested_toppings
    False
</code>
</pre>

##### Checking Whether a Value Is Not in a List

To know if the value doesnot appear in list. You can use the keyword **not** in this situation.

###### banned_users.py

<pre>
<code>
    banned_users = ['andrew', 'caroline', 'david']
    user = 'marie'

    if user not in banned_users:
        print(f"{user.title()}, you can post a response if you wish.")

    ''' Output: 
        Marie, you can post a response if you wish. '''
</code>
</pre>

Here, if the value of user is not in the list of banned_user, Python returns True and excutes the follwing indented line.

##### Boolean Expressions

A **Boolean Expression** is just another name for a condtional test. A **Boolean value** is either **True** or **False**, just like the value of a conditional expressions after it has been evaluated.

Boolean values provide an efficient way to track the state of a program or a particular condition that is important in your program.

<pre>
<code>
    # To track whether game is running
    game_active = True

    # To track whether a user can edit certain content 
    can_edit = False
</code>
</pre>

{% endraw %}

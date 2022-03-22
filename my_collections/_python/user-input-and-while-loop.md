---
layout: blogdetail
author: Milan Kaucha
title: User Input and While Loops
categories: Python
excerpt_separator: <!--more-->
---

Most program are written to solve an end user's problem. So, you usually need to get some information from the user. We also need to keep our program running as long as users want them to, so they can enter as much information as they need to. Python's **while** loop to keep programs running as long as certain conditions remain **true**.

With the ability to work with user input and the ability to control how long your prgrams run, you'll be able to write fully interactive programs.

<!--more-->

{% raw %}

#### 1. How the input() Function Works

The **input()** function pauses your program and waits for the user to enter some text. Once Python recieves the user's input, it assigns that input to a variable to make it convenient for you to work with.

###### parrot.py

<pre>
<code>
    message = input("Tell me something, and I will repeat it back to you: ")
    print(message)

    ''' Output:
        Tell me something, and I will repeat it back to you: <strong>Hello Everyone!</strong>
        Hello Everyone! ''' 
</code>
</pre>

> Note:
>
> Sublime text and many other editors don't run programs that prompt the user for input.

##### Writing Clear Prompts

Each time we use the **input()** function, we should include a clear, easy-to-follow prompt that tells the user what kind of information you're looking for.

###### greeter.py

<pre>
<code>
    name = input("Please enter your name: ")
    print(f"\nHello, {name}!")

    ''' Output:
        Please enter your name: <strong>Eric</strong>

        Hello, Eric '''
</code>
</pre>

Add a space at the end of your prompts to seperate prompt from the user's response and to make it clear to user where to enter the text.

Sometimes you’ll want to write a prompt that’s longer than one line. For example, you might want to tell the user why you’re asking for certain input. You can assign your prompt to a variable and pass that variable to the **input()** function.

###### greeter.py

<pre>
<code>
    prompt = "If you tell us who you are, we can personalize the messages you see."
    prompt += "\nWhat is your first name? "

    name = input(prompt)
    print(f"\nHello, {name}!")

    ''' Output:
        If you tell us who you are, we can personalize the message you see.
        What is your first name? <strong>Eric</strong>

        Hello, Eric! '''

    # The prompt now spans two lines, again with space after the question mark for clarity.

</code>
</pre>

##### Using int() to Accept Numerical Input

When we use the input() function, Python interprets everything the user enters as a string.

<pre>
<code>
    >>> age = input("How old are you? ")
    How old are you? 21
    >>> age
    '21'
</code>
</pre>

Python interpreted the input as a **string** because the number is now enclosed in quotes. If we want to do is print the input, this works well. But if you try to use the input as a number, you'll get an error.

<pre>
<code>
    >>> age = input("How old are you? ")
    How old are you? 21
    >>> age >= 18
    Traceback (most recent call last):
      File "< stdin >", line 1, in < module >
    TypeError: unorderable types: str() >= int()
</code>
</pre>

Python produces an error because it can't compare a **string** to an **integer**: the string **'21'** that's assigned to age can't be compared to numerical value **18**.

We can resolve this issue by using **int()** function. The **int()** function converts a **string representation** of a number to a **numerical representation**.

<pre>
<code>
    >>> age = input("How old are you? ")
    How old are you? 21
    >>> age = int(age)
    >>> age >= 18
    True
</code>
</pre>

###### rollercoaster.py

<pre>
<code>
    height = input("How tall are you, in inches? ")
    height = int(height)

    if height >= 48:
        print("\nYou're tall enough to ride!")
    else:
        print("\nYou'll be able to ride when you're a little older.")

    ''' Output:
        How tall are you, in inches? <strong>71</strong>

        You're tall enough to ride! '''
</code>
</pre>

##### The Modulo Operator

A useful tool for working with numerical information is the **modulo operator (%)**, which divides one number by another number and returns the **reminder**.

<pre>
<code>
    >>> 4 % 3
    1
    >>> 5 % 3
    2
    >>> 6 % 3
    0
    >>> 7 % 3
    1
</code>
</pre>

The **modulo operator** doesn't tell you how many times one number fits into another; it just tells what the **reminder** is.

###### even_or_odd.py

<pre>
<code>
    number = input("Enter a number, and i'll tell you if it's even or odd: ")
    number = int(number)

    if number % 2 == 0:
        print(f"\nThe number {number} is even.")
    else:
        print(f"\nThe number {number} is odd.")

    ''' Output:
        Enter a number, and i'll tell you if it's even or odd: <strong>42</strong>

        The number 42 is even. '''
</code>
</pre>

#### 2. Introducing while Loops

The for loop takes a collection of items and executes a block of code once for each item in the collection. In contrast, the **while loop** run as long as, or **while**, a certain condition is **true**.

##### The while Loop in Action

You can use a while loop to count up through a series of numbers.

###### counting.py

<pre>
<count>
    current_number = 1
    while current_number <= 5:
        print(current_number)
        current_number += 1
    
    ''' Output:
        1
        2
        3
        4
        5 '''
</count>
</pre>

Python repeats the loop as long as the condition **current_number** <= 5 is **True**. Once the value of **current_number** is greater than 5, the loop stops running and the program ends.

##### Letting the User Choose When to Quit

###### parrot.py

<pre>
<code>
    prompt = "\nTell me something, and i will repeat it back to you:"
    prompt += "\nEnter 'quit' to end the program "
    message = ''
    while message != 'quit':
        message = input(prompt)
        print(message)

    ''' Output:
        Tell me something, and I will repeat it back to you:
        Enter 'quit' to end the program. <strong>Hello everyone!</strong> 
        Hello everyone!

        Tell me something, and I will repeat it back to you:
        Enter 'quit' to end the program. <strong>Hello again.</strong> 
        Hello again.

        Tell me something, and I will repeat it back to you:
        Enter 'quit' to end the program. <strong>quit</strong> 
        quit 
            '''
</code>
</pre>

This program works well, except that it prints the word 'quit' as if it were an actual message. A simple if test fixes this.

###### parrot.py

<pre>
<code>
    prompt = "\nTell me something, and i will repeat it back to you:"
    prompt += "\nEnter 'quit' to end the program "
    message = ''
    while message != 'quit':
        message = input(prompt)
        if message != 'quit':
            print(message)
    

    ''' Output:
        Tell me something, and I will repeat it back to you:
        Enter 'quit' to end the program. <strong>Hello everyone!</strong> 
        Hello everyone!

        Tell me something, and I will repeat it back to you:
        Enter 'quit' to end the program. <strong>Hello again.</strong> 
        Hello again.

        Tell me something, and I will repeat it back to you:
        Enter 'quit' to end the program. quit
         
        '''
</code>
</pre>

##### Using a Flag

We had the program perform certain tasks while a given condition was true. **But what about more complicated programs in which many different events could cause program to stop running?**

For a program that should run only as long as many conditions are true, you can define **one variable** that determines whether or not the entire program is **active**. This variable, called **flag**, acts as a signal to the program. We can write our programs so they run while the flag is set to **True** and stop running when any of several events sets the value of the flag to **False**.

###### parrot.py

<pre>
<code>
    prompt = "\nTell me something, and i will repeat it back to you:"
    prompt += "\nEnter 'quit' to end the program "
    active = True
    while active:
        message = input(prompt)

        if message = 'quit':
            active = False
        else:
            print(message)


    ''' Output:
        Tell me something, and I will repeat it back to you:
        Enter 'quit' to end the program. Hello everyone! 
        Hello everyone!

        Tell me something, and I will repeat it back to you:
        Enter 'quit' to end the program. Hello again. 
        Hello again.

        Tell me something, and I will repeat it back to you:
        Enter 'quit' to end the program. quit
            
        '''
</code>
</pre>

The **flag** which we call **active**, will monitor whether or not the program should continue running.

##### Using break to Exit a Loop

To exit a **while loop** immediately without running any remaining code in the loop, regardless of the results of any conditional test, use the **break statement**.

The break statement directs the flow of our program, we can use it to control which lines are executed and which aren't, so the program only executes code that you want it to, when you want it to.

###### cities.py

<pre>
<code>
    prompt = "\nPlease enter the name of a city you have visited."
    prompt += "\n(Enter 'quit' when you are finished.)"

    while True:
        city = input(prompt)

        if city == 'quit'
            break
        else:
            print(f"I'd love to go to {city.title()!}")

    ''' Output:
        Please enter the name of a city you have visited:
        (Enter 'quit' when you are finished.) <strong>New York</strong> 
        I'd love to go to New York!

        Please enter the name of a city you have visited:
        (Enter 'quit' when you are finished.) <strong>San Francisco</strong>
        I'd love to go to San Francisco!

        Please enter the name of a city you have visited:
        (Enter 'quit' when you are finished.) <strong>quit</strong>
</code>
</pre>

> Note:
>
> We can use the **break statement** in any Python's loop. For example, we can use break to quit a for loop that's working through a list or a dictionary.

##### Using continue in a Loop

Rather than breaking out of a loop entirely without executing the rest of its code, we can use the **continue statement** to return to the begining of the loop based on the result of a conditional test.

###### counting.py

<pre>
<code>
    current_number = 0
    while current_number < 10:
        current_number += 1
        if current_number % 2 == 0:
            continue
        
        print(current_number)

    ''' Output:
        1
        3
        5
        7
        9 ''' 
</code>
</pre>

##### Avoiding Infinite Loops

Every **while loop** needs a way to stop running so it won't continue to run forever.

###### counting.py

<pre>
<code>
    x = 1
    while x <= 5:
        print(x)
        x += 1

    # But if we accidently omit the line <strong>x += 1</strong>, the loop will run forever:
    # This loop runs forever !

    x = 1
    while x <= 5:
        print(x)
</code>
</pre>

> Note:
>
> To avoid writting infinite loops, test every while loop and make sure the loop stops when you expect it to. If the program doesn’t end, scrutinize the way your program handles the value that should cause the loop to exit. Make sure at least one part of the program can make the loop’s condition **False** or cause it to reach a **break statement**.

#### 3. Using a while Loop with Lists and Dictionaries

A **for loop** is effective for looping through a list, but we shouldn't modify list inside a for loop because Python will have trouble keeping track of the items in a list. To modify a list as you work through, use a **while** loop.

Using **while loops** with lists and dictionaries allow you to **collect, store and organize** lots of input to examine and report on later.

##### Moving Items from One List to Another

###### confirmed_users.py

<pre>
<code>
    # Start with users that need to be verified,
    # and an empty list to hold confirmed users.
    unconfirmed_users = ['alice', 'brian', 'candace']
    confirmed_users = []

    # Verify each user until there are no more unconfirmed users.
    # Move each verified user into the list of confirmed users.
    while unconfirmed_users:
        current_user = unconfirmed_users.pop()

        print(f"Verifing user: {current_user.title()}")
        confirmed_users.append(current_user)

    # Display all confirmed users.
    print("\nThe following users have been confirmed.")
    for confirmed_user in confirmed_users:
        print(confirmed_user.title())

    ''' Output:
        Verifing user: Alice
        Verifing user: Brian
        Verifing user: Candace

        The following users have been confirmed.
        Candace
        Brian
        Alice


</code>
</pre>

##### Removing All Instances of Specific Values from a List

We can use **remove()** to remove a specific value from a list. But what if you want to remove all instances of a value from a list?

###### pets.py

<pre>
<code>
    pets = ['dog', 'cat', 'dog', 'goldfish', 'cat', 'rabbit', 'cat']
    print(pets)

    while 'cat' in pets:
        pets.remove('cat')
    
    print(pets)

    ''' Output:
        ['dog', 'cat', 'dog', 'goldfish', 'cat', 'rabbit', 'cat']
        ['dog', 'dog', 'goldfish', 'rabbit', 'cat']
</code>
</pre>

##### Filling a Dictionary with User Input

We can prompt as much input as we need in each pass through a **while loop** and store the data we gather in a **dictionary**.

###### mountain_pool.py

<pre>
<code>
    response = {}

    # Set a flag to indicate that polling is active.
    polling_active = True

    while polling_active:
        # Prompt for the person's name and response.
        name = input("\nWhat is your name? ")
        response = input("Which mountain would you like to climb someday? ")

        # Store the response in the dictionary.
        responses[name] = response

        # Find out if anyone else is going to take the poll.
        repeat = input("Would you like to let another person respond? (yes/no)")

        if repeat == 'no':
            polling_active = False

    # Polling is complete. Show the results.
    print("\n -- Pool results --")
    for name, response in responses.item():
        print(f"{name} would like to climb {response}.")

    ''' Output:
        What is your name? Eric 
        Which mountain would you like to climb someday? Denali 
        Would you like to let another person respond? (yes/ no) yes 

        What is your name? Lynn 
        Which mountain would you like to climb someday? Devil's Thumb 
        Would you like to let another person respond? (yes/ no) no 

        --- Poll Results ---
        Lynn would like to climb Devil's Thumb.
        Eric would like to climb Denali. 

        '''
</code>
</pre>

{% endraw %}

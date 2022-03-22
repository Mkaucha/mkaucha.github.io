---
layout: blogdetail
author: Milan Kaucha
title: Files and Exceptions
categories: Python
excerpt_separator: <!--more-->
---

Learning to work with files and save data will make your programs easier for people to use. Learning to handle exceptions will help us deal with situations that can cause our programs to crash. This will make our programs more robust.

#### 1. Reading from a File

An incredible amount of data is available in text files. Text files can contain whether data, traffic data, socioeconomic data, literary works and more.

Reading from a file is particularly useful in data analysis applications, but it’s also applicable to any situation in which you want to analyze or modify information stored in a file.

When you want to work with the information in a text file, the first step is to
read the file into memory. You can read the entire contents of a file, or you
can work through the file one line at a time.

##### Reading an Entire File

To begin, we need a file with a few lines of text in it.

###### pi_digits.txt

<pre>
<code>
    3.1415926535
      8979323846
      2643383279 
</code>
</pre>

Here's a program that opens this file, reads it, and prints the contents of the file to the screen:

###### file_reader.py

<pre>
<code>
    with open('pi_digits.txt') as file_object:
        contents = file_object.read()
    print(contents)

    ''' Output:
        3.1415926535
          8979323846
          2643383279 

    '''
</code>
</pre>

To do any work with a file, even just printing its content, we first need to **open** the file to access it. The **open()** function needs one argument: the **name** of the file we want to open. Python looks for this file in the directory where the program that's currently being executed is stored.

In the example, **file_reader.py** is currently running, so Python looks for **pi_digits.txt** in the directory where **file_reader.py** is stored. The **open()** function returns an object representing the file. Here, **open('pi_digits.txt')** returns an object representing **pi_digits.txt**. Python assigns this object to **file_object**.

The keyword **with** closes the file once access to it is no longer needed. We could open and close the file by calling **open()** and **close()**, but if a bug in your program prevents the close() method from being executed, the file may never close. Improperly closed files can cause data to be lost or
corrupted. And if you call close() too early in your program, we’ll find ourself trying to work with a closed file (a file you can’t access), which leads to more errors.

It’s not always easy to know exactly when you should close a file, but with the structure shown here, Python will figure that out for you. All you have to do is open the file and work with it as desired, trusting that Python will close it automatically when the with block finishes execution.

Once we have a file object representing **pi_digits.txt**, we use the **read()** to read the entire contents of the file and store it as one long string in contents. When we print the value of contents, we get the entire text file back.

The only difference between this output and the original file is the extra blank line at the end of the output. The blank line appears because **read()** returns an empty string when it reaches the **end of the file**; this empty string shows up as a blank line. If you want to remove the extra blank line, you can use **rstrip()** in the call to **print()**:

###### file_reader.py

<pre>
<code>
    with open('pi_digits.txt') as file_object:
        contents = file_object.read()
    print(contents.rstrip())

    ''' Output:
        3.1415926535
          8979323846
          2643383279 
    '''
</code>
</pre>

##### File Paths

To get Python to open files from a directory other than the one where your program file is stored, you need to provide a **file path**, which tells Python to look in a specific location on your system.

Suppose, **text_files** is inside **python_work**, we could use a relative file path to open a file from **text_files**. A relative file path tells Python to look for a given location relative to the directory where the currently running program file is stored.

<pre>
<code>
    with open('text_files/filename.txt') as file_object: 

    # This tells python to look for the desired <strong>.txt</strong> file in the folder text_files 
    # and assumes that text_files is located inside python_work.
</code>
</pre>

Using absolute paths, you can read files from any location on your system.

<pre>
<code>
    file_path = '/home/ehmatthes/other_files/text_files/filename.txt'
    with open('file_path') as file_object: 
</code>
</pre>

##### Reading Line by Line

When we're reading a file, we'll often want to examine each line of the file. You might be looking for certain information in the file, or you might want to modify the text in the file in some way.

We can use a for loop on the file object to examine each line from a file one at a time:

###### file_reader.py

<pre>
<code>
    filename = 'pi_digits.txt'

    with open(filename) as file_object:
        for line in file_object:
            print(line.rstrip())

    ''' Output:
        3.1415926535
          8979323846
          2643383279
    '''

    # The print function adds its own newline each time we call it, we end up with two newline
    # characters at the end of each line: one from the file and one from print()
</code>
</pre>

To examine the file’s contents, we work through each line in the file by looping over the file object.

##### Making a List of Lines from a File

When we use **with**, the file object returned by **open()** is only available inside the **with** block that contains it. If we want to access to file's contents outside the **with** block, we can store the file's lines in a **list** inside the block and then work with that list.

###### file_reader.py

<pre>
<code>
    filename = 'pi_digits.txt'

    with open(filename) as file_object:
        lines = file_object.readlines()

    for line in lines:
        print(line.rstrip())
</code>
</pre>

The following example stores the lines of **pi_digits.txt** in a **list** inside the **with** block and then prints the lines outside the **with** block.

The **readlines()** method takes each line from the file and stores it in a **list**.

##### Working with a File’s Contents

After we've read a file into memory, we can do whatever we want with that data.

###### pi_string.py

<pre>
<code>
    filename = 'pi_digits.txt'
    
    with open(filename) as file_object:
        lines = file_object.readlines()

    pi_string = ''
    for line in lines:
        pi_string += line.rstrip()
    
    print(pi_string)
    print(len(pi_string))

    ''' Output:
        3.141592653589793238462643383279
        32
    '''
</code>
</pre>

> Note:
>
> When Python reads from a text file, it interprets all text in the file as a **string**. If we read in a number and want to work with that value in numerical context, we'll have to convert it to an **integer** using the **int()** function or convert it to a **float** using the **float()** function.

##### Large Files: One Million Digits

If we start with a text file that contains pi to 1,000,000 decimal places instead of just 30, we can create a single string containing all these digits.

###### pi_string.py

<pre>
<code>
    filename = 'pi_million_digits.txt'

    with open(filename) as file_object:
        lines = file_object.readlines()
    
    pi_string = ""
    for line in lines:
        pi_string += line.strip()

    print(f"{pi_string[:52]}...")
    print(len(pi_string))

    ''' Output:
        3.14159265358979323846264338327950288419716939937510...
        1000002 
    '''

    # The output shows that we do indeed have a string
    # containing pi to 1,000,000 decimal places: 
</code>
</pre>

Python has no inherent limit to how much data we can work with; we can work with as much data as our system's **memory** can handle.

##### Is Your Birthday Contained in Pi?

###### pi_string.py

<pre>
<code>
    filename = "pi_million_digits.txt"

    with open(filename) as file_object:
        lines = file_object.readlines()

    pi_string = ""
    for line in lines:
        pi_string += line.rstrip()

    birthday = input("Enter you birthdate, in the form mmddyy: ")
    if birthday in pi_string:
        print("Your birthdate appears in the first million digits of pi!")
    else:
        print("Your birthdate does not appear in the first million digits of pi!")

    ''' Output:
        Enter your birthdate, in the form mmddyy: 120372 
        Your birthdate appears in the first million digits of pi! 
    '''
</code>
</pre>

#### 2. Writing to a File

One of the simplest ways to save data is to write it to a file. When we write text to a file, the output will still be available after we close the terminal containing our program's output.

##### Writing to an Empty File

To write text to a file, we need to call **open()** with a second argument telling Python that we want to write to the file.

###### write_message.py

<pre>
<code>
    filename = 'programming.txt'

    with open(filename, 'w') as file_object:
        file_object.write('I love programming.')
</code>
</pre>

The call to **open()** in this example has two arguments.

- The first argument is the **name** of the file we want to **open**.
- The second argument, **'w'**, tells Python that we want to open the file in **write mode**.

We can **open** a file in **read mode('r')**, **write mode('w')**, **append mode('a')**, or a mode that allows to **read and write to the file('r+')**.

The **open()** function automatically **creates** the file we're writting to if it doesn't already **exist**.

> Warning:
>
> Be careful opening a file in **write mode ('w')** because if the file does exist, Python will erase the contents of the file before returning the file object.

###### programming.txt

<pre>
<code>
    I love programming.
</code>
</pre>

This file behaves like any other file on our compute.

> Note:
>
> Python can oly wirte **strings** to a text file. If we want to store **numerical data** in a text file, we'll have to convert the data to string format using the **str()** function.

##### Writing Multiple Lines

The **write()** function doesn't add any newlines to the text we write. So if we write more than one line without including **newline** characters, our file may not look the way we want it to:

###### write_message.py

<pre>
<code>
    filename = "programming.txt"

    with open(filename, 'w') as file_object:
        file_object.write("I love programming.")
        file_object.write("I love creating new games.")
</code>
</pre>

###### programming.txt

<pre>
<code>
    I love programming.I love creating new games.
</code>
</pre>

Including newlines in calls to **write()** makes each string appear on its own line:

###### write_message.py

<pre>
<code>
    filename = "programming.txt"

    with open(filename, 'w') as file_object:
        file_object.write("I love programming.\n")
        file_object.write("I love creating new games.\n")
</code>
</pre>

###### programming.txt

<pre>
<code>
    I love programming.
    I love creating new games.
</code>
</pre>

You can also use **spaces, tab characters, and blank lines** to format your output, just as you’ve been doing with terminal-based output.

##### Appending to a File

If we want to add content to a file instead of writting over existing content, we can open the file in **append mode**.<br>
When we open a file in **append mode**, Python doesn't erase the contents of the file before returning the file object.<br>
Any lines we write to the file will be added at the end of the file. If the file doesn't exist yet, Python will create an empty file for you.

Let's modify **write_message.py** by adding some new reasons we love programming to the existing file **programming.txt**:

###### write_message.py

<pre>
<code>
    filename = 'programming.txt'

    with open(filename, 'a') as file_object:
        file_object.write("I also love finding meaning in large datasets.\n")
        file_object.write("I love creating aps that can run in a browser.\n")
</code>
</pre>

###### programming.txt

<pre>
<code>
    I love programming.
    I love creating new games.
    I also love finding meaning in large datasets.
    I love creating apps that can run in a browser.
</code>
</pre>

#### 3. Exceptions

Python uses special objects called **exceptions** to manage errors that arises during a program's execution. Whenever an error occurs that makes Python unsure what to do next, it creates an **exception** object.

If we write code that handle exception, the program will continue running. If we don't handle exception, the program will halt and show a **traceback**, which includes a report of the exception that was raised.

Exceptions are handled with **try-except** blocks. A try-except block asks Python to do something, it also tells Python to do if exception is raised. When we use try-except blocks, our program will continue runnning even if things start to go wrong. Instead of **tracebacks**, which can be confusing for users to read, users will see friendly error messages that we write.

##### Handling the ZeroDivisionError Exception

Let's look at a simple error that causes Python to raise an exception.

###### division_calculator.py

<pre>
<code>
    print(5/0)

    Traceback (most recent call last):
     File "division_calculator.py", line 1, in < module >
      print(5/0)
    ZeroDivisionError: division by zero
</code>
</pre>

The error reported in the traceback, **ZeroDivisionError**, is an exception object. Python creates this kind of object in response to a situation where it can't do what we ask it to. When this happens, Python stops the program and tells us the kindof exception that was raised.

##### Using try-except Blocks

When we think an error may occur, we can write a try-except block to handle the exception that might be raised. We tell Python try running some code, and we tell it what to do if the code results in a particular kind of exception.

###### division_calculator.py

<pre>
<code>
    try:
        print(5/0)
    except ZeroDivisionError:
        print("You can't divide by zero!")

    ''' Output:
        You can't divide by zero!
    '''
</code>
</pre>

We put **print(5/0)**, the line that caused the error, inside a try block. If the code in a try block works, Python skips over the except block.

If the code in **try block** causes an error, Python looks for an **except block** whose error matches the one that was raised and runs the code in that block.

##### Using Exceptions to Prevent Crashes

Handling errors correctly is especially important when the program has more work to do after the error occurs. This happens often in programs that prompt users for input. If the program responds to invalid input appropriately, it can prompt for more valid input instead of crashing.

###### division_calculator.py

<pre>
<code>
    print("Give me two numbers, and I'll divide them.")
    print("Enter 'q' to quit.")

    while True:
        first_number = input("\nFirst number: ")
        if first_number == 'q':
            break
        second_number =  input("Second number: ")
        if second_number == 'q':
            break
        answer = int(first_number)/int(second_number)
        print(answer)
    
    ''' Output: 
        Give me two numbers, and I'll divide them.
        Enter 'q' to quit.
        First number: 5 
        Second number: 0 
        Traceback (most recent call last):
        File "division_calculator.py", line 9, in < module >
        answer = int(first_number) / int(second_number)
        ZeroDivisionError: division by zero 
    '''
</code>
</pre>

It’s also not a good idea to let users see tracebacks.

##### The else Block

We can make this program more error resistant by wrapping the line that might produce errors in **try-except** block. Any code that depends on the try block executing successfully goes in the else block:

###### division_calculator.py

<pre>
<code>
    print("Give me two numbers, and I'll divide them.")
    print("Enter 'q' to quit.")

    while True:
        first_number = input("\nFirst number: ")
        if first_number == 'q':
            break
        second_number =  input("Second number: ")
        if second_number == 'q':
            break
        try:
            answer = int(first_number)/int(second_number)
        except ZeroDivisionError:
            print("You can't divide by 0!")
        else:
            print(answer)

    ''' Output:
        Give me two numbers, and I'll divide them.
        Enter 'q' to quit.
        First number: 5 
        Second number: 0 
        You can't divide by 0!
        First number: 5 
        Second number: 2 
        2.5
        First number: q 
    '''      
</code>
</pre>

The **try-except-else** block works like this: Python attempts to run the code in the **try block**. The only code that should go in a **try block** is code that might cause an **exception** to be raised.<br>
Sometimes we'll have additional code that should run only if the try block was successful; this code goes in **else** block.<br>
The **except block** tells Python what to do in case a certain exception arises when it tries to run the code in the **try block**.

##### Handling the FileNotFoundError Exception

One common issue when working with files is handling missing files. The file we're looking for might be in a different location, the filename may be misspelled, or the file may not exist at all. We can handle all of these situations in a straightforward way with a **try-except** block.

###### alice.py

<pre>
<code>
    filename = "alice.txt"

    with open(filename, encoding="utf-8") as f:
        contents = f.read()
    
    ''' Output:
        Traceback (most recent call last):
         File "alice.py", line 3, in < module >
          with open(filename, encoding='utf-8') as f:
        FileNotFoundError: [Errno 2] No such file or directory: 'alice.txt' 
    '''
</code>
</pre>

The **encoding argument** is needed when our system's default encoding doesn't match the encoding of the file that's being read.

In this example, the **open()** function produces the error, so to handle it, the **try block** will begin with the line that contains **open()**:

###### alice.py

<pre>
<code>
    filename = "alice.txt"

    try:
        with open(filename, encoding="utf-8") as f:
            contents = f.read()
    except FileNotFoundError:
        print(f"Sorry, the file {filename} doesnot exist.")

    ''' Output:
        Sorry, the file alice.txt does not exist. 
    '''
</code>
</pre>

The code in the try block produces a **FileNotFoundError**, so Python looks for an **except block** that matches that error. Python then runs the code in that block.

##### Analyzing Text

We can analyze text files containing entire books.

Let's pull in the text of **Alice in Wonderland** and try to count the number of words from a string.

<pre>
<code>
    >>> title = "Alice in Wonderland"
    >>> title.split()
    ['Alice', 'in', 'Wonderland']
</code>
</pre>

The **split()** method sperates a string into parts wherever it finds a space and stores all the parts of the string in a **list**.
THen we'll count the items in the list to get a rough idea of the numbers of words in the text:

###### alice.py

<pre>
<code>
    filename = "alice.txt"

    try:
        with open(filename, encoding="utf-8") as f:
        contents = f.read()
    except FileNotFoundError:
        print(f"Sorry, the file {filename} doesnot exist.")
    else:
        # Count the approximate number of words in the file.
        words = contents.split()
        num_words = len(words)
        print(f"The file {filename} has about {num_words} words.")
    
    ''' Output:
        The file alice.txt has about 29465 words. 
    '''
</code>
</pre>

##### Working with Multiple Files

###### word_count.py

<pre>
<code>
    def count_words(filename):
        """Count the approximate number of words in a file."""
    
        try:
            with open(filename, encoding="utf-8") as f:
                contents = f.read()
        except FileNotFoundError:
            print(f"Sorry, the file {filename} doesnot exist.")
        else:
            words = contents.split()
            num_words = len(words)
            print(f"The file {filename} has about {num_words} words")
    
    filename = 'alice.txt'
    count_words(filename)
</code>
</pre>

###### word_count.py

<pre>
<code>
    def count_words(filename):
        """Count the approximate number of words in a file."""
    
        try:
            with open(filename, encoding="utf-8") as f:
                contents = f.read()
        except FileNotFoundError:
            print(f"Sorry, the file {filename} doesnot exist.")
        else:
            words = contents.split()
            num_words = len(words)
            print(f"The file {filename} has about {num_words} words")
    
    filename = ['alice.txt', 'siddhartha.txt', 'moby_dick.txt', 'little_women.txt']
    for filename in filenames:
        count_words(filename)

    ''' Output:
        The file alice.txt has about 29465 words.
        Sorry, the file siddhartha.txt does not exist.
        The file moby_dick.txt has about 215830 words.
        The file little_women.txt has about 189079 words. 
    '''
</code>
</pre>

The missing **siddhartha.txt** file has no effect on the rest of the program's execution:

##### Failing Silently

In the previous example, we informed our users that one of the files was unavailable. But we don't need to report every exception we catch.

Sometimes we'll want the program to fail silently when an exception occurs and continue on as if nothing happened.

###### word_count.py

<pre>
<code>
    def count_words(filename):
        """Count the approximate number of words in a file."""
    
        try:
            with open(filename, encoding="utf-8") as f:
                contents = f.read()
        except FileNotFoundError:
            pass
        else:
            words = contents.split()
            num_words = len(words)
            print(f"The file {filename} has about {num_words} words")
    
    filename = ['alice.txt', 'siddhartha.txt', 'moby_dick.txt', 'little_women.txt']
    for filename in filenames:
        count_words(filename)

    ''' Output:
        The file alice.txt has about 29465 words.
        The file moby_dick.txt has about 215830 words.
        The file little_women.txt has about 189079 words. 
    '''
</code>
</pre>

The **pass** statement also acts as a placeholder. It's a reminder that we're choosing to do nothing at a specific point in our program's execution and that we might want to do something there later.

##### Deciding Which Errors to Report

**How do we know when to report an error to our users and when to fail silently?**

Giving users information they aren't looking for can decrease the usablility of our program. Python’s error-handling structures give you fine-grained control over how much to share with users when things go wrong; it’s up to you to decide how much information to share.

#### 4. Storing Data

Many of our program will ask users to input certain kind of information. We might allow users to store preferences in a game or provide data for visualization. Whatever the focus of our program is, we'll store the information users provide in data structures such as lists and dictionaries.

When users close a program, we'll almost always want to save the information they entered. A simple way to do this involves storing our data using the **json module**.

The **json module** allows us to dump simple Python data structures into file and load the data from that file the next time the program runs. We can also use json to share data between different Python programs.

Even better, the **JSON** data format is not specific to Python, so we can share data we store in the **JSON** format with people who work in many other programming languages.

> Note:
>
> The **JSON (JavaScript Object Notation)** format was originally developed for JavaScript. However, it has since become a common format used by many languages, including Python.

##### Using json.dump() and json.load()

The **json.dump()** function takes two arguments:

- a piece of data to store
- a file object it can use to store the data.

###### number_writer.py

<pre>
<code>
    import json

    numbers = [2, 3, 5, 7, 11, 13]

    filename = "numbers.json"
    with open(filename, 'w') as f:
        json.dump(numbers, f)
</code>
</pre>

Here, the file extension **.json** indicate that the data in the file is stored in the JSON format. We use **json.dump()** function to store the list numbers in the file **numbers.json**

Now, we use **json.load()** to read the list back into memory:

###### number_reader.py

<pre>
<code>
    import json

    filename = "numbers.json"
    with open(filename) as f:
        numbers = json.load(f)

    print(numbers)

    ''' Output:
        [2, 3, 5, 7, 11, 13] 
    '''
</code>
</pre>

We use the **json.load()** function to load the information stored in numbers.json, and we assign it to the variable numbers.

This is a simple way to share data between two programs.

##### Saving and Reading User-Generated Data

Let's satart by storing the user's name:

###### remember_me.py

<pre>
<code>
    import json

    username = input("What is your name? ")

    filename = 'username.json'
    with open(filename, 'w') as f:
        json.dump(username, f)
        print(f"We'll remember you when you come back, {username}!")
    
    ''' Output:
        What is your name? Eric
        We'll remember you when you come back, Eric!
    '''
</code>
</pre>

Here, we prompt for a username to store. Then, we use **json.dump()**, passing it a username and a file object, to store the usernmae in a file.

Now, let's write a new program that greets a user whose name has already been stored:

###### greet_user.py

<pre>
<code>
    import json

    filename = 'username.json'

    with open(filename) as f:
        username = json.load(f)
        print(f"Welcome back, {username}!")

    ''' Output:
        Welcome back, Eric! 
    '''
</code>
</pre>

Here we use **json.load()** to read information stored in **username.json** and assign it to the variable username.

We need to combine these two programs into one file.

###### remember_me.py

<pre>
<code>
    import json

    # Load the username, if it has been stored previously.
    # Otherwise, prompt for the username and store it.
    filename = 'username.json'
    try:
        with open(filename) as f:
            username = json.load(f)
    except FileNotFoundError:
        username = input("What is your name? ")
        with open(filename, 'w') as f:
            json.dump(username, f)
            print(f"We'll remember you when you come back, {username}!")
    else:
        print(f"Welcome back, {username}!")

    # If this is the first time the program runs
    ''' Output:
        What is your name? Eric 
        We'll remember you when you come back, Eric!
    ''' 
    # Otherwise:
    ''' Output 
        Welcome back, Eric!
    ''' 
</code>
</pre>

##### Refactoring

We could imporve the code by breaking it up into series of functions that have specific jobs. This process is called **refactoring**. Refactoring makes your code cleaner, easier to understand and easier to extend.

Let's take our **remember_me.py** program and refactor it.

###### remember_me.py

<pre>
<code>
    import json

    def greet_user():
        """Greet the user by name."""
        filename = 'username.json'
        try:
            with open(filename) as f:
                username = json.load(f)
        except FileNotFoundError:
            username = input("What is your name? ")
            with open(filename, 'w') as f:
                json.dump(username, f)
                print(f"We'll remember you when you come back, {useranme}!")
        else:
            print(f"Welcome back, {username}!")
    greet_user()

</code>
</pre>

The function **greet_user()** is doing more than just greeting the user — it's also retrieving a stored username if one exists and prompting for a new username if one doesn't exist.

Let's refactor **greet_user()** so it's not doing so many different tasks.

###### remember_me.py

<pre>
<code>
    import json

    def get_stored_username():
        """Get stored username if available."""
        filename = 'username.json'
        try:
            with open(filename) as f:
                username = json.load(f)
        except FileNotFoundError:
            return None
        else:
            return username

    def greet_user():
        """Greet the user by name."""
        username = get_stored_username()
        if username:
            print(f"Welcome back, {username}")
        else:
            username = input("What is your name? ")
            filename = 'username.json'
            with open(filename, 'w') as f:
                json.dump(username, f)
            print(f"We'll remember you when you come back, {username}!")

    greet_user()
</code>
</pre>

The new function **get_stored_username()** has a clear purpose, as stated in the **docstring** at. This function retrieves a stored username and returns the
username if it finds one. If the file **username.json** doesn’t exist, the function
returns **None**. This is **good practice**: a function should either return the
value you’re expecting, or it should return None.

Again, we should factor one more block of code out of **greet_user()**.

###### remember_me.py

<pre>
<code>
    import json

    def get_stored_username():
        """Get stored username if available."""
        filename = 'username.json'
        try:
            with open(filename) as f:
                username = json.load(f)
        except FileNotFoundError:
            return None
        else:
            return username

    def get_new_username():
        """Prompt for a new username."""
        username = input("What is your name? ")
        filename = 'username.json'
        with open(filename, 'w') as f:
            json.dump(username, f)
        return username

    def greet_user():
        """Greet the user by name."""
        username = get_stored_username()
        if username:
            print(f"Welcome back, {username}")
        else:
            username = get_new_username()
            print(f"We'll remember you when you come back, {username}!")

    greet_user()
</code>
</pre>

Each function in this **final version** of **remember_me.py** has a single, clear purpose.

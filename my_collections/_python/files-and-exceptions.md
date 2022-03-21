---
layout: python
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

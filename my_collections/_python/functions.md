---
layout: python
author: Milan Kaucha
title: Functions
categories: Python
excerpt_separator: <!--more-->
---

Functions are named blocks of code that are designed to do one specific task. When we want to perform a particular task that you've defined in a function, we **call** the function responsible for it.
{% raw %}

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

The variable **username** in the definition of **greet_user()** is an example of a **parameter**, a piece of information the function needs to do its job. The value **'jesse'** in **greet_user('jesse')** is an example of a **argument**.

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

When writing a function, we can define a **default value** for each parameter. If an argument for a parameter is provided in the function call, Python uses the **argument value**. If not, it uses the parameter's default value.

So, when we define a **default value** for a parameter, we can exclude the corresponding argument we'd usually write in the function call. Using default values can simplify your function calls and clarify the ways in which your functions are typically used.

###### pets.py

<pre>
<code>
    def describe_pet(pet_name, animal_type='dog'):
        """Display information about a pet.""" 
        print(f"\nI have a {animal_type}.")
        print(f"My {animal_type}'s name is {pet_name.title()}")

        describe_pet(pet_name='willie') 

    ''' Output:
        I have a dog.
        My dog's name is Willie. 
    '''
</code>
</pre>

> Note:
>
> When you use default values, any parameter with a default value needs to be listed after all the parameters that don’t have default values. This allows Python to continue interpreting positional arguments correctly.

##### Avoiding Argument Errors

Unmatched arguments occur when you provide fewer or more arguments than a function needs to do its work.

###### pets.py

<pre>
<code>
    def describe_pet(animal_type, pet_name):
        """Display information about a pet.""" 
        print(f"\nI have a {animal_type}.") 
        print(f"My {animal_type}'s name is {pet_name.title()}.")

    describe_pet()

    ''' Output:
        Traceback (most recent call last):
          File "pets.py", line 6, in < module >
            describe_pet()
         TypeError: describe_pet() missing 2 required positional arguments: 'animal_type' and 'pet_name' 
    '''
</code>
</pre>

If you provide too many arguments, you should get a similar traceback that can help you correctly match your function call to the function definition.

#### 3. Return Values

A function doesn't always have to display its output directly. Instead, it can process some data and then return a value or set of values. The value a function return is called a **return value**.

The **return statement** takes a value from inside a function and sends it back to the line that called the function.

##### Returning a Simple Value

###### formatted_name.py

<pre>
<code>
    def get_formatted_name(first_name, last_name):
        """Return a full name, neatly formatted"""
        full_name = f"{first_name} {last_name}"
        return full_name.title()

    musician = get_formatted_name('jimi', 'hendrix')
    print(musician)

    ''' Output:
        Jimi Hendrix
    '''
</code>
</pre>

When we call a function that returns a value, you need to provide a variable that the return value can be assigned to.

##### Making an Argument Optional

We can use **default values** to make an argument optional.

###### formatted_name.py

<pre>
<code>
    def get_formatted_name(first_name, last_name, middle_name=''):
        """Return a full name, neatly formatted"""
        if middle_name:
            full_name = f"{first_name} { middle_name } {last_name}"
        else:
            full_name = f"{first_name} {last_name}"

        return full_name.title()

    musician = get_formatted_name('jimi', 'hendrix')
    print(musician)
    ''' Output:
        Jimi Hendrix
    '''

    musician = get_formatted_name('jimi', 'hooker', 'lee')
    print(musician)
        ''' Output:
        Jimi Lee Hooker
    '''
</code>
</pre>

##### Returning a Dictionary

A function can return any kind of value you need it to, including more complicated data structures like lists and dictionaries.

###### person.py

<pre>
<code>
    def build_person(first_name, last_name):
        """Return a dictionary of information about a person"""
        person = {'first': first_name, 'last': last_name}
        return person

    musician = build_person('jimi', 'hendrix')
    print(musician)

    ''' Output:
        {'first': 'jimi', 'last': 'hendrix'} 
    '''

    # You can easily extend this function
    # to accept optional value
    def build_person(first_name, last_name, age=None):
        """Return a dictionary of information about a person"""
        person = {'first': first_name, 'last': last_name}
        if age:
            person[age] = age
        return person

    musician = build_person('jimi', 'hendrix', age=27)
    print(musician)
</code>
</pre>

##### Using a Function with a while Loop

###### greeter.py

<pre>
<code>
    def get_formatted_name(first_name, last_name):
        """Return a full name, neatly formatted"""
        full_name = f"{first_name} {last_name}"
        return full_name.title()

    while True:
        print("\nPlease tell me your name:")
        print("(enter 'q' at any time to quit)")

        f_name = input("First name: ")
        if f_name = 'q':
            break
        l_name = input("last name: ")
        if l_name = 'q':
            break
        
        formatted_name =  get_formatted_name(f_name, l_name)
        print(f"\nHello, {formatted_name}!")

    ''' Output:
        Please tell me your name:
        (enter 'q' at any time to quit)
        First name: eric 
        Last name: matthes 
        Hello, Eric Matthes!

        Please tell me your name:
        (enter 'q' at any time to quit)
        First name: q 
    '''
</code>
</pre>

#### 4. Passing a List

When we pass a **list** to a function, the function gets direct access to the content of the list.

###### greet_users.py

<pre>
<code>
    def greet_users(names):
        """Print a simple greeting to each user in the list."""
        for name in names:
            msg = f"Hello, {name.title()}!"
            print(msg)
        
    usernames = ['hannah', 'ty', 'margot']
    greet_users(usernames)

    ''' Output:
        Hello, Hannah!
        Hello, Ty!
        Hello, Margot!
    '''
</code>
</pre>

##### Modifying a List in a Function

When we pass a **list** to function, the function can modify the list. Any changes made to the list inside the function's body are permanent, allowing us to work efficiently even when we're dealing with large amounts of data.

###### printing_models.py

<pre>
<code>
    # Start with some designs that need to be printed.
    unprinted_designs = ['phone case', 'robot pendant', 'dodecahedron']
    completed_models = []

    # Simulate printing each design, until none are left.
    # Move each design to completed_models after printing.
    while unprinted_designs:
        current_design = unprinted_desings.pop()
        print(f"Printing model: {current_design}")
        completed_models.append(current_design)

    # Display all completed models.
    print("\nThe following models have been printed:")
    for completed_model in completed_models:
        print(completed_model)

    ''' Output:
        Printing model: dodecahedron
        Printing model: robot pendant
        Printing model: phone case

        The following models have been printed:
        dodecahedron
        robot pendant
        phone case
    '''
</code>
</pre>

We can reorganize the above code by writting two functions, each of which does one specific job.

###### printing_models.py

<pre>
<code>
    def print_models(unprinted_designs, completed_models):
        """
        Simulate printing each design, until none are left.
        Move each design to completed_models after printing.
        """
        while unprinted_designs:
            current_design = unprinted_designs.pop()
            print(f"Printing model: {current_design}")
            completed_models.append(current_design)
        
    def show_completed_models(completed_models):
        """Show all models that were printed."""
        print("\nThe following models have been printed:")
        for completed_model in completed_models:
            print(completed_model)
    
    unprinted_designs = ['phone case', 'robot pendant', 'dodecahedron']
    completed_models = []

    print_models(unprinted_designs, completed_models)
    show_completed_models(completed_models)


    ''' Output:
        Printing model: dodecahedron
        Printing model: robot pendant
        Printing model: phone case

        The following models have been printed:
        dodecahedron
        robot pendant
        phone case
    '''
</code>
</pre>

##### Preventing a Function from Modifying a List

Sometimes, we'll want to prevent a function from **modifying** a list. We can do so by passing a function a **copy** of list, not the **original**. Any changes that function makes to the list will affect only the copy, leaving the original list intact.

We can send a **copy of list** to a function like this:

<pre>
<code>
    function_name(list_name[:])
</code>
</pre>

The slice notation **[:]** makes a copy of the list to send to the function.

> Note:
>
> Even though we can preserve the contents of a list by passing a copy of it to our functions, you should pass the **original list** to functions unless you have a specific reason to pass a **copy**.
>
> It's more efficient for a function to work with an existing list to avoid using the **time and memory** needed to make a separate copy, especially when we're working with large **lists**.

#### 5. Passing an Arbitrary Number of Arguments

Sometimes, we won't know how many arguments a function needs to accept. **Python** allows a function to collect an **arbitary number** of arguments from the calling statement.

###### pizza.py

<pre>
<code>
    def make_pizza(*toppings):
        """Print the list of toppings that have been requested."""
        print(toppings)
    
    make_pizza('pepperoni')
    make_pizza('mushrooms', 'green peppers', 'extra cheese')

    ''' Output:
        ('pepperoni',)
        ('mushrooms', 'green peppers', 'extra cheese')
    '''
</code>
</pre>

The asterisk in parameter name **\*toppings** tells Python to make an empty **tuples** called toppings and pack whatever values it recieves into **tuple**.

Now we can replace **print()** call with a loop that runs through the list of **toppings**.

<pre>
<code>
    def make_pizza(*toppings): 
        """Summarize the pizza we are about to make."""
        print("\nMaking a pizza with the following toppings:")
        for topping in toppings:
            print(f"- {topping}")
    
    make_pizza('pepperoni') 
    make_pizza('mushrooms', 'green peppers', 'extra cheese') 

    ''' Output:
        Making a pizza with the following toppings:
        - pepperoni

        Making a pizza with the following toppings:
        - mushrooms
        - green peppers
        - extra cheese 
    '''
</code>
</pre>

##### Mixing Positional and Arbitrary Arguments

If we want a function to accept several different kinds of **arguments**. The parameter that accepts an **arbitary number** of arguments must be placed last in function definition.

Python matches **positional** and **keyword** arguments and then collects any remaining arguments in the final parameter.

###### pizza.py

<pre>
<code>
    def make_pizza(size, *toppings):
        """Summarize the pizza we are about to make."""
        print(f"\nMaking a {size}-inch pizza with the following toppings:")
        for topping in toppings:
            print(f"- {topping}")
    
    ''' Output:
        Making a 16-inch pizza with the following toppings:
        - pepperoni

        Making a 12-inch pizza with the following toppings:
        - mushrooms
        - green peppers
        - extra cheese 
    '''
</code>
</pre>

In the function definition, Python assigns the first value it receives to the parameter size. All other values that come after are stored in the **tuple toppings**.

> Note:
>
> We'll often see the generic parameter name **\*args**, which collects arbitrary positional arguments like this.

##### Using Arbitrary Keyword Arguments

We'll want to accept an **arbitrary number** of arguments, but we won't know what kind of information will be passed to the **function**.

We can write **function** that accept as many **key-value** pairs as the calling statement provides.

###### user_profile.py

<pre>
<code>
    def build_profile(first, last, **user_info):
        """Build a dictionary containing everything we know about a user."""
        user_info['first_name'] = first
        user_info['last_name'] = last
        return user_info

    user_profile = build_profile('albert', 
                                 'einstein',
                                 location='princeton',
                                 field='physics')
    print(user_profile)

    ''' Output:
        {'location': 'princeton', 'field': 'physics', 
        'first_name': 'albert', 'last_name': 'einstein'}
    '''
</code>
</pre>

> Note:
>
> You’ll often see the parameter name **\*\*kwargs** used to collect **non-specific** keyword arguments

#### 6. Storing Your Functions in Modules

One advantage of functions is the way they seperate blocks of code from our main program.<br>
By using descriptive names for our functions, our main program will be much easier to follow. We can **store** our functions in a seperate file called a **module** and then **importing** that module into our main program.

An **import statement** tells Python to make the code in a module available in the currently running program file.

Storing your functions in a **separate** file allows you to **hide** the details of your program’s code and focus on its **higher-level** logic. It also allows you to **reuse** functions in many different programs. When you store your functions in **separate** files, you can **share** those files with other programmers without having to share your **entire program**.

##### Importing an Entire Module

To start importing functions, we first need to create a **module**. A **module** is a file ending in **.py** that contains the code we want to import into our program.

###### pizza.py

<pre>
<code>
    def make_pizza(size, *toppings):
        """Summarize the pizza we are about to make."""
        print(f"\nMaking a {size}-inch pizza with the following toppings:")
        for topping in toppings:
            print(f"- {topping}") 
</code>
</pre>

Now we’ll make a separate file called **making_pizzas.py** in the same directory as **pizza.py**.

###### making_pizzas.py

<pre>
<code>
    import pizza

    pizza.make_pizza(16, 'pepperoni')
    pizza.make_pizza(12, 'mushrooms', 'green peppers', 'extra cheese')

    ''' Output:
        Making a 16-inch pizza with the following toppings:
        - pepperoni

        Making a 12-inch pizza with the following toppings:
        - mushrooms
        - green peppers
        - extra cheese 
    '''
</code>
</pre>

If you use this kind of import statement to import an entire module named **module_name.py**, each **function** in the **module** is available through the following **syntax**:

 <pre>
 <code>
    module_name.function_name() 
 </code>
 </pre>

##### Importing Specific Functions

We can also import a specific function from a module.

 <pre>
 <code>
    from module_name import function_name

    # You can import as many functions as you want from a module 
    # by separating each function’s name with a comma

    from module_name import function_0, function_1, function_2 
 </code>
 </pre>

###### making_pizzas.py

 <pre>
 <code>
    from pizza import make_pizza

    make_pizza(16, 'pepperoni')
    make_pizza(12, 'mushrooms', 'green peppers', 'extra cheese') 
 </code>
 </pre>

With this syntax, you don’t need to use the **dot** notation when you call a function. Because we’ve **explicitly** imported the **function make_pizza()** in the **import** statement, we can call it by name when we use the function.

##### Using as to Give a Function an Alias

If the name of a function we're importing might conflict with an existing name in your program or if the function name is long, you can use a short, unique **alias** — an alternate name similar to a nickname for the function.

###### making_pizzas.py

<pre>
<code>
    from pizza import make_pizza as mp

    mp(16, 'pepperoni')
    mp(12, 'mushrooms', 'green peppers', 'extra cheese') 
</code>
</pre>

The **import** statement shown here renames the function **make_pizza()** to **mp()** in the program. Any time we want to call **make_pizza()** we can simply write **mp()** instead.

The general syntax for providing an **alias** to **function** name is:

<pre>
<code>
    from module_name import function_name as fn 
</code>
</pre>

##### Using as to Give a Module an Alias

We can also provide an **alias** for a **module** name. Giving a module a short **alias**, like p for pizza, allows you to call the module’s functions more quickly.

###### making_pizzas.py

<pre>
<code>
    import pizza as p

    p.make_pizza(16, 'pepperoni')
    p.make_pizza(12, 'mushrooms', 'green peppers', 'extra cheese') 
</code>
</pre>

The general syntax for providing an **alias** to **module** name is:

<pre>
<code>
    import module_name as mn 
</code>
</pre>

##### Importing All Functions in a Module

We can tell Python to import every **function** in a **module** by using the **asterisk(\*)** operator:

<pre>
<code>
    from pizza import *

    make_pizza(16, 'pepperoni')
    make_pizza(12, 'mushrooms', 'green peppers', 'extra cheese')
</code>
</pre>

The **asterisk** in the **import** statement tells Python to copy every **function** from the **module** into this program file.
{% endraw %}

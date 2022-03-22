---
layout: blogdetail
author: Milan Kaucha
title: Classes
categories: Python
excerpt_separator: <!--more-->
---

**Object-oriented** programming is one of the most effective approaches to writting software. **Object-oriented** programming we write classes that represent real-world things and situations and we create objects based on these classes.

When we write a class, we define general behavior that a whole category of object can have. Making an object from a class is called **instantiation**.

{:.page_link}

{% raw %}

#### 1. Creating and Using a Class {#section-1}

We can model almost anything using **classes**.

##### Creating the Dog Class

###### dog.py

<pre>
<code>
    class Dog:
        """A simple attempt to model a dog."""

        def __int__(self, name, age):
            """Initialize name and age attribute"""
            self.name = name
            self.age = age

        def sit(self):
            """Simulate a dog sitting in response to a command"""
            print(f"{self.name} is now sitting.")
        
        def roll_over():
            """Simulate rolling over in response to a command"""
            print(f"{self.name} rolled over!")
</code>
</pre>

By convention, capitalized names refer to **classes** in Python.

##### The \_\_init\_\_() Method

A function that's part of a class is a **method**. The **\_\_init\_\_()** method is a special method that Python runs **automatically** whenever we create **new instance** based on the class. This method has two leading underscores and two trailing underscores, a convention that helps prevent Python's default method names from with our method names.

The **self** parameter is required in the **\_\_init\_\_()** method definition, and if must come first before the other parameters. It must be included in the definition because when Python calls this **method** later, the method call will automatically pass the **self** argument.

Every method call assocaited with an instance automatically passes **self**, which is **reference to the instance itself**; it gives the individual instance access to the attribute and methods in the class.

Any **variable prefixed** with self is available to every **method** in the **class**, and we'll also be able to **access these variables** through any **instance** created from the **class**.

The line **self.name=name** takes the value associated with the parameter **name** and assign it to the variable **name**, which is then attached to the **instance** being created.

##### Making an Instance from a Class

We should think a class as a set of instructions for how to make an instance.

###### dog.py

<pre>
<code>
    class Dog:
        """A simple attempt to model a dog."""

        def __init__(self, name, age):
            """Initialize name and age attribute"""
            self.name = name
            self.age = age

        def sit(self):
            """Simulate a dog sitting in response to a command"""
            print(f"{self.name} is now sitting.")
        
        def roll_over():
            """Simulate rolling over in response to a command"""
            print(f"{self.name} rolled over!")

    # <strong>my_dog refers to a single instance created from a class.</strong>
    my_dog = Dog('Willie', 6)

    print(f"My dog's name is {my_dog.name}.")
    print(f"My dog is {my_dog.age} years old.")

    ''' Output:
        My dog's name is Willie.
        My dog is 6 years old.
    '''
</code>
</pre>

The **\_\_init\_\_() method** creates an instance representing this particular dog and sets name and age attributes using the values we provide.<br>
Python then returns an instance representing this dog. We assign that instance to the variable **my_dog**.

We can usually assume that a capitalized name like Dog refers to a **class**, and a lowercase name like **my_dog** refers to a **single instance** created from a class.

##### Accessing Attributes

To access the **attributes** of an instance, we use **dot** notation. We access the value of **my_dog's** attribute name by writting:

<pre>
<code>
    my_dog.name 
</code>
</pre>

This syntax demonstrate how Python finds an attribute's value. Here Python looks at the instance **my_dog** and then finds the **attribute** name associated with my_dog.

##### Calling Methods

To call a method, give the name of the instance (in this case, **my_dog**) and the method you want to call, seperated by **dot**.

###### dog.py

<pre>
<code>
    class Dog:
        """A simple attempt to model a dog."""

        def __init__(self, name, age):
            """Initialize name and age attribute"""
            self.name = name
            self.age = age

        def sit(self):
            """Simulate a dog sitting in response to a command"""
            print(f"{self.name} is now sitting.")
        
        def roll_over():
            """Simulate rolling over in response to a command"""
            print(f"{self.name} rolled over!")

    # <strong>my_dog refers to a single instance created from a class.</strong>
    my_dog = Dog('Willie', 6)

    my_dog.sit()
    my_dog.roll_over()

    ''' Output:
        Willie is now sitting.
        Willie rolled over!
    '''
</code>
</pre>

##### Creating Multiple Instances

We can create as many instance from a class as we need.

###### dog.py

<pre>
<code>
    class Dog:
        """A simple attempt to model a dog."""

        def __init__(self, name, age):
            """Initialize name and age attribute"""
            self.name = name
            self.age = age

        def sit(self):
            """Simulate a dog sitting in response to a command"""
            print(f"{self.name} is now sitting.")
        
        def roll_over():
            """Simulate rolling over in response to a command"""
            print(f"{self.name} rolled over!")

    my_dog = Dog('Willie', 6)
    your_dog = Dog('Lucy', 3)

    print(f"My dog's name is {my_dog.name}.")
    print(f"My dog is {my_dog.age} years old.")
    my_dog.sit()

    print(f"\nYour dog's name is {your_dog.name}.")
    print(f"Your dog is {your_dog.age} years old.")
    your_dog.sit() 

    ''' Output:
        My dog's name is Willie.
        My dog is 6 years old.
        Willie is now sitting.

        Your dog's name is Lucy.
        Your dog is 3 years old.
        Lucy is now sitting. 
    '''
</code>
</pre>

Here, Even if we used the same name and age for the second dog, Python would still create a separate instance from the Dog class.

#### 2. Working with Classes and Instances

We can use classes to represent many real-world situation. We can modify the attributes of an instance directly or write methods that update attributes in specific ways.

###### cars.py

<pre>
<code>
    class Car:
        """A simple attempt to represent a car."""

        def __init__(self, make, model, year):
            """Initialize attribute to describe a car."""
            self.make = make
            self.model = model
            self.year = year

        def get_descriptive_name(self):
            """Return a neatly formatted descriptive name."""
            long_name = f"{self.year} {self.make} {self.model}"
            return long_name.title()
    
    my_new_car = Car('audi', 'a4', 2019)
    print(my_new_car.get_descriptive_name())

    ''' Output:
        2019 Audi A4 
    '''
</code>
</pre>

##### Setting a Default Value for an Attribute

When an instance is created, **attributes** can be defined without being passed in as **parameters**. These attributes can be defined in the **\_\_init()\_\_** method, where they are assigned a **default** value.

###### cars.py

<pre>
<code>
    class Car:
        """A simple attempt to represent a car."""

        def __init__(self, make, model, year):
            """Initialize attribute to describe a car."""
            self.make = make
            self.model = model
            self.year = year
            self.odometer_reading = 0

        def get_descriptive_name(self):
            """Return a neatly formatted descriptive name."""
            long_name = f"{self.year} {self.make} {self.model}"
            return long_name.title()

        def read_odometer(self):
            """Print a statement showing the car's mileage."""
            print(f"The car has {self.odometer_reading} miles on it.")

    my_new_car = Car('audi', 'a4', 2019) 
    print(my_new_car.get_descriptive_name()) 

    my_new_car.read_odometer() 

    ''' Output:
        2019 Audi A4
        This car has 0 miles on it. 
    '''
</code>
</pre>

##### Modifying Attribute Values

We can change an attribute's value in three ways: **we can change the value directly through an instance, set the value through a method, or increment the value through a method**.

###### 1. Modifying an Attribute’s Value Directly

The simplest way to modify the value of attribute is to access the attribute directly through an instance.

###### cars.py

<pre>
<code>
    class Car:
        """A simple attempt to represent a car."""

        def __init__(self, make, model, year):
            """Initialize attribute to describe a car."""
            self.make = make
            self.model = model
            self.year = year
            self.odometer_reading = 0

        def get_descriptive_name(self):
            """Return a neatly formatted descriptive name."""
            long_name = f"{self.year} {self.make} {self.model}"
            return long_name.title()

        def read_odometer(self):
            """Print a statement showing the car's mileage."""
            print(f"The car has {self.odometer_reading} miles on it.")

    my_new_car = Car('audi', 'a4', 2019) 
    print(my_new_car.get_descriptive_name())

    my_new_car.odometer_reading = 23
    my_new_car.read_odometer() 

    ''' Output:
        2019 Audi A4
        This car has 23 miles on it. 
    '''
</code>
</pre>

###### 2. Modifying an Attribute’s Value Through a Method

Instead of accesing the attribute value directly, we can pass the new value to a method, that handles the updating internally.

###### cars.py

<pre>
<code>
    class Car:
        """A simple attempt to represent a car."""

        def __init__(self, make, model, year):
            """Initialize attribute to describe a car."""
            self.make = make
            self.model = model
            self.year = year
            self.odometer_reading = 0

        def get_descriptive_name(self):
            """Return a neatly formatted descriptive name."""
            long_name = f"{self.year} {self.make} {self.model}"
            return long_name.title()

        def update_odometer(self, mileage):
            """Set the odometer reading to the given value.
               Reject the change if it attempts to roll odometer back.
            """
            if mileage >= self.odometer_reading:
                self.odometer_reading = mileage
            else:
                print("You can't roll back on odometer!")

        def read_odometer(self):
            """Print a statement showing the car's mileage."""
            print(f"The car has {self.odometer_reading} miles on it.")

    my_new_car = Car('audi', 'a4', 2019) 
    print(my_new_car.get_descriptive_name())

    my_new_car.update_odometer(23)
    my_new_car.read_odometer() 

    ''' Output:
        2019 Audi A4
        This car has 23 miles on it. 
    '''
</code>
</pre>

###### 3. Incrementing an Attribute’s Value Through a Method

Instead of accesing the attribute value directly, we can pass the new value to a method, that handles the updating internally.

###### cars.py

<pre>
<code>
    class Car:
        """A simple attempt to represent a car."""

        def __init__(self, make, model, year):
            """Initialize attribute to describe a car."""
            self.make = make
            self.model = model
            self.year = year
            self.odometer_reading = 0

        def get_descriptive_name(self):
            """Return a neatly formatted descriptive name."""
            long_name = f"{self.year} {self.make} {self.model}"
            return long_name.title()

        def update_odometer(self, mileage):
            """Set the odometer reading to the given value.
               Reject the change if it attempts to roll odometer back.
            """
            if mileage >= self.odometer_reading:
                self.odometer_reading = mileage
            else:
                print("You can't roll back on odometer!")

        def read_odometer(self):
            """Print a statement showing the car's mileage."""
            print(f"The car has {self.odometer_reading} miles on it.")

        def increment_odometer(self, miles):
            """Add the given amount to the odometer reading."""
            self.odometer_reading += miles

    my_used_car = Car('subaru', 'outback', 2015) 
    print(my_used_car.get_descriptive_name())

    my_used_car.update_odometer(23_500)
    my_used_car.read_odometer() 

    my_used_car.increment_odometer(100)
    my_used_car.read_odometer()

    ''' Output:
        2015 Subaru Outback
        This car has 23500 miles on it.
        This car has 23600 miles on it. 
    '''
</code>
</pre>

> Note:
>
> Anyone with access to the program can set the odometer reading to any value by accessing the attribute directly. Effective security takes extreme attention to detail in addition to basic checks like those shown here.

#### 3. Inheritance

We don't always have to start from scratch when writting a class. If the class we're writting is a specialized version of another class we wrote, we can use **inheritance**.

When one class **inherits** from another, it takes on the **attributes** and **methods** of the first class. The original class is called the **parent class**, and the new class is the **child class**. The child class can **inherit any or all** of the **attributes and methods** of its **parent class**, but its also free to define **new attributes and methods** of its own.

##### The \_\_init\_\_() Method for a Child Class

When we're writting a new **class** based on **existing** class, we'll often want to call the **\_\_init\_\_()** method from **parent** class. This will initialize any **attributes** that were defined in the parent **\_\_init\_\_()** method and make them available in the **child** class.

###### cars.py

<pre>
<code>
    class Car:
        """A simple attempt to represent a car."""

        def __init__(self, make, model, year):
            """Initialize attribute to describe a car."""
            self.make = make
            self.model = model
            self.year = year
            self.odometer_reading = 0

        def get_descriptive_name(self):
            """Return a neatly formatted descriptive name."""
            long_name = f"{self.year} {self.make} {self.model}"
            return long_name.title()

        def update_odometer(self, mileage):
            """Set the odometer reading to the given value.
               Reject the change if it attempts to roll odometer back.
            """
            if mileage >= self.odometer_reading:
                self.odometer_reading = mileage
            else:
                print("You can't roll back on odometer!")

        def read_odometer(self):
            """Print a statement showing the car's mileage."""
            print(f"The car has {self.odometer_reading} miles on it.")

        def increment_odometer(self, miles):
            """Add the given amount to the odometer reading."""
            self.odometer_reading += miles

    class ElectricCar(Car):
        """Represent aspects of a car, specific to electric vehicles."""

        def __init__(self, make, model, year):
            """Initialize attributes of the parent class."""
            super().__init__(make, model, year)

    my_tesla = ElectricCar('tesla', 'model s', 2019)
    print(my_tesla.get_descriptive_name())

    ''' Output:
        2019 Tesla Model S 
    '''
</code>
</pre>

Here, **super().\_\_init\_\_(make, model, year)** tells Python to call **\_\_init\_\_()** method from **Car**, which gives an **ElectricCar** instances all the attributes defined in that method.

The name of the **parent** class must be included in **parentheses** in the defination of a **child** class.

The **super()** function is a special function that allows you to call a method from the **parent** class. The name **super** comes from a convention of calling the parent class a **superclass** and the child class a **subclass**.

##### Defining Attributes and Methods for the Child Class

Once we have a child class that **inherits** from a parent class, we can add any **new attributes and methods** necessary to **differntiate the child class from the parent class**.

###### cars.py

<pre>
<code>
    class Car:
        """A simple attempt to represent a car."""

        def __init__(self, make, model, year):
            """Initialize attribute to describe a car."""
            self.make = make
            self.model = model
            self.year = year
            self.odometer_reading = 0

        def get_descriptive_name(self):
            """Return a neatly formatted descriptive name."""
            long_name = f"{self.year} {self.make} {self.model}"
            return long_name.title()

        def update_odometer(self, mileage):
            """Set the odometer reading to the given value.
               Reject the change if it attempts to roll odometer back.
            """
            if mileage >= self.odometer_reading:
                self.odometer_reading = mileage
            else:
                print("You can't roll back on odometer!")

        def read_odometer(self):
            """Print a statement showing the car's mileage."""
            print(f"The car has {self.odometer_reading} miles on it.")

        def increment_odometer(self, miles):
            """Add the given amount to the odometer reading."""
            self.odometer_reading += miles

    class ElectricCar(Car):
        """Represent aspects of a car, specific to electric vehicles."""

        def __init__(self, make, model, year):
            """Initialize attributes of the parent class.
               Then initialize attributes specific to an electric car.
            """
            super().__init__(make, model, year)
            self.battery_size = 75

        def describe_battery(self):
            """Print a statement describing the battery size."""
            print(f"This car has a {self.battery_size}-kWh battery.")

    my_tesla = ElectricCar('tesla', 'model s', 2019)
    print(my_tesla.get_descriptive_name())
    my_tesla.describe_battery()

    ''' Output:
        2019 Tesla Model S
        This car has a 75-kWh battery. 
    '''
</code>
</pre>

Here, we can add as many **attributes and methods** as we need to model electric car. An attribute or method that belong to any car, rather than one that's specific to an electric car, should be added to the Car class instead of the ElectricCar class.

##### Overriding Methods from the Parent Class

We can override any method from **parent class**. To do this, we define a **method** in the **child class** with the **same name** as the **method** we want to override in the **parent class**. Python will disregard the parent class method and only pay attention to the method we define in the child class.

###### cars.py

<pre>
<code>
    class Car:
        """A simple attempt to represent a car."""

        def __init__(self, make, model, year):
            """Initialize attribute to describe a car."""
            self.make = make
            self.model = model
            self.year = year
            self.odometer_reading = 0

        def get_descriptive_name(self):
            """Return a neatly formatted descriptive name."""
            long_name = f"{self.year} {self.make} {self.model}"
            return long_name.title()

        <strong>def fill_gas_tank(self):
            # ...</strong>

    class ElectricCar(Car):
        """Represent aspects of a car, specific to electric vehicles."""

        def __init__(self, make, model, year):
            """Initialize attributes of the parent class.
               Then initialize attributes specific to an electric car.
            """
            super().__init__(make, model, year)
            self.battery_size = 75

        def describe_battery(self):
            """Print a statement describing the battery size."""
            print(f"This car has a {self.battery_size}-kWh battery.")

        <strong>def fill_gas_tank(self):
            """Electric cars doesn't have gas tanks."""
            print("This car doesn't need a gas tank!")</strong>

</code>
</pre>

When we use **inheritance**, we can make child classes retain what we need and override anything we don't need from the parent class.

##### Instances as Attributes

We can break our **large class** into **smaller classes** that work together.

###### cars.py

<pre>
<code>
    <strong>class Car:</strong>
        """A simple attempt to represent a car."""

        def __init__(self, make, model, year):
            """Initialize attribute to describe a car."""
            self.make = make
            self.model = model
            self.year = year
            self.odometer_reading = 0

        def get_descriptive_name(self):
            """Return a neatly formatted descriptive name."""
            long_name = f"{self.year} {self.make} {self.model}"
            return long_name.title()

        def update_odometer(self, mileage):
            """Set the odometer reading to the given value.
                Reject the change if it attempts to roll odometer back.
            """
            if mileage >= self.odometer_reading:
                self.odometer_reading = mileage
            else:
                print("You can't roll back on odometer!")

        def read_odometer(self):
            """Print a statement showing the car's mileage."""
            print(f"The car has {self.odometer_reading} miles on it.")

        def increment_odometer(self, miles):
            """Add the given amount to the odometer reading."""
            self.odometer_reading += miles


    <strong>class Battery:</strong>
        """A simple attempt model a battery for an electric car."""

        def __init__(self, battery_size=75):
            """Initialize the battery's attributes."""
            self.battery_size = battery_size

        def describe_battery(self):
            """Print a statement describing the battery size."""
            print(f"This car has a {self.battery_size}-kWh battery.")

    <strong>class ElectricCar(Car):</strong>
        """Represent aspects of a car, specific to electric vehicles."""

        def __init__(self, make, model, year):
            """Initialize attributes of the parent class.
                Then initialize attributes specific to an electric car.
            """
            super().__init__(make, model, year)
            self.battery = Battery()

    my_tesla = ElectricCar('tesla', 'model s', 2019)

    print(my_tesla.get_descriptive_name())
    my_tesla.battery.describe_battery()

    ''' Output:
        2019 Tesla Model S
        This car has a 75-kWh battery. 
    '''
</code>
</pre>

In the **ElectricCar class**, we add an attribute called **self.battery**. **self.battery = Battery()** tells Python to create a new instance of Battery and assign that instance to the attribute **self.battery**

We create an electric car and assign it to the variable **my_tesla**. When we want to describe the battery, we need to work through the car’s battery attribute:

<pre>
<code>
    my_tesla.battery.describe_battery() 
</code>
</pre>

Let's add another method to Battery that reports the range of the car based on the battery size.

###### cars.py

<pre>
<code>
    <strong>class Car:</strong>
        """A simple attempt to represent a car."""

        def __init__(self, make, model, year):
            """Initialize attribute to describe a car."""
            self.make = make
            self.model = model
            self.year = year
            self.odometer_reading = 0

        def get_descriptive_name(self):
            """Return a neatly formatted descriptive name."""
            long_name = f"{self.year} {self.make} {self.model}"
            return long_name.title()

        def update_odometer(self, mileage):
            """Set the odometer reading to the given value.
                Reject the change if it attempts to roll odometer back.
            """
            if mileage >= self.odometer_reading:
                self.odometer_reading = mileage
            else:
                print("You can't roll back on odometer!")

        def read_odometer(self):
            """Print a statement showing the car's mileage."""
            print(f"The car has {self.odometer_reading} miles on it.")

        def increment_odometer(self, miles):
            """Add the given amount to the odometer reading."""
            self.odometer_reading += miles


    <strong>class Battery:</strong>
        """A simple attempt model a battery for an electric car."""

        def __init__(self, battery_size=75):
            """Initialize the battery's attributes."""
            self.battery_size = battery_size

        def describe_battery(self):
            """Print a statement describing the battery size."""
            print(f"This car has a {self.battery_size}-kWh battery.")

        def get_range(self):
            """Print a statement about the range this battrey provides."""
            if self.battery_size == 75:
                range = 260
            elif self.battery_size == 100:
                range = 315

            print(f"This car can go about {range} miles on a full charge.")

    <strong>class ElectricCar(Car):</strong>
        """Represent aspects of a car, specific to electric vehicles."""

        def __init__(self, make, model, year):
            """Initialize attributes of the parent class.
                Then initialize attributes specific to an electric car.
            """
            super().__init__(make, model, year)
            self.battery = Battery()

    my_tesla = ElectricCar('tesla', 'model s', 2019)

    print(my_tesla.get_descriptive_name())
    my_tesla.battery.describe_battery()
    my_tesla.battery.get_range()

    ''' Output:
        2019 Tesla Model S
        This car has a 75-kWh battery. 
        This car can go about 260 miles on a full charge. 
    '''
</code>
</pre>

#### 4. Importing Classes

As we add more functinality to our classes, we'll want to keep our files as uncluttered as possible. Python lets us store classes in modules and then import the classes we need into our main program.

##### Importing a Single Class

###### car.py

<pre>
<code>
    """A class that can be used to represent a car."""

    <strong>class Car:</strong>
        """A simple attempt to represent a car."""

        def __init__(self, make, model, year):
            """Initialize attribute to describe a car."""
            self.make = make
            self.model = model
            self.year = year
            self.odometer_reading = 0

        def get_descriptive_name(self):
            """Return a neatly formatted descriptive name."""
            long_name = f"{self.year} {self.make} {self.model}"
            return long_name.title()

        def update_odometer(self, mileage):
            """Set the odometer reading to the given value.
                Reject the change if it attempts to roll odometer back.
            """
            if mileage >= self.odometer_reading:
                self.odometer_reading = mileage
            else:
                print("You can't roll back on odometer!")

        def read_odometer(self):
            """Print a statement showing the car's mileage."""
            print(f"The car has {self.odometer_reading} miles on it.")

        def increment_odometer(self, miles):
            """Add the given amount to the odometer reading."""
            self.odometer_reading += miles
</code>
</pre>

We should include module-level **docstring** that briefly describes the contents of the module. We should write a **docstring** for each module we create.

###### my_car.py

<pre>
<code>
    from car import Car

    my_new_car = Car('audi', 'a4', 2019)
    print(my_new_car.get_descriptive_name())

    my_new_car.odometer_reading = 23
    my_new_car.read_odometer() 

    ''' Output:
        2019 Audi A4
        This car has 23 miles on it. 
    '''
</code>
</pre>

The **import** statement at tells Python to open the car module and import the **class** Car. Now we can use the Car class as if it were defined in this file.

##### Storing Multiple Classes in a Module

We can store as many **classes** as we need in a single module, although each class in module should be **related** somehow.

###### car.py

<pre>
<code>
    """A set of classes used to represent gas and electric cars."""

    <strong>class Car:</strong>
        """A simple attempt to represent a car."""

        def __init__(self, make, model, year):
            """Initialize attribute to describe a car."""
            self.make = make
            self.model = model
            self.year = year
            self.odometer_reading = 0

        def get_descriptive_name(self):
            """Return a neatly formatted descriptive name."""
            long_name = f"{self.year} {self.make} {self.model}"
            return long_name.title()

        def update_odometer(self, mileage):
            """Set the odometer reading to the given value.
                Reject the change if it attempts to roll odometer back.
            """
            if mileage >= self.odometer_reading:
                self.odometer_reading = mileage
            else:
                print("You can't roll back on odometer!")

        def read_odometer(self):
            """Print a statement showing the car's mileage."""
            print(f"The car has {self.odometer_reading} miles on it.")

        def increment_odometer(self, miles):
            """Add the given amount to the odometer reading."""
            self.odometer_reading += miles


    <strong>class Battery:</strong>
        """A simple attempt model a battery for an electric car."""

        def __init__(self, battery_size=75):
            """Initialize the battery's attributes."""
            self.battery_size = battery_size

        def describe_battery(self):
            """Print a statement describing the battery size."""
            print(f"This car has a {self.battery_size}-kWh battery.")

        def get_range(self):
            """Print a statement about the range this battrey provides."""
            if self.battery_size == 75:
                range = 260
            elif self.battery_size == 100:
                range = 315

            print(f"This car can go about {range} miles on a full charge.")

    <strong>class ElectricCar(Car):</strong>
        """Represent aspects of a car, specific to electric vehicles."""

        def __init__(self, make, model, year):
            """Initialize attributes of the parent class.
                Then initialize attributes specific to an electric car.
            """
            super().__init__(make, model, year)
            self.battery = Battery()
</code>
</pre>

###### my_electric_car.py

<pre>
<code>
    from car import ElectricCar

    my_tesla = ElectricCar('tesla', 'model s', 2019)

    print(my_tesla.get_descriptive_name())
    my_tesla.battery.describe_battery()
    my_tesla.battery.get_range()

    ''' Output:
        2019 Tesla Model S
        This car has a 75-kWh battery. 
        This car can go about 260 miles on a full charge. 
    '''
</code>
</pre>

##### Importing Multiple Classes from a Module

We can import as many classes as we need into a program file.

###### my_cars.py

<pre>
<code>
    from car import Car, ElectricCar

    my_beetle = Car('volkswagen', 'beetle', 2019)
    print(my_beetle.get_descriptive_name())

    my_tesla = ElectricCar('tesla', 'roadster', 2019)
    print(my_tesla.get_descriptive_name()) 

    ''' Output:
        2019 Volkswagen Beetle
        2019 Tesla Roadster
    '''
</code>
</pre>

##### Importing an Entire Module

We can also import an entire modules and then access the classes we need using **dot** notation.

###### my_cars.py

<pre>
<code>
    import car

    my_beetle = car.Car('volkswagen', 'beetle', 2019)
    print(my_beetle.get_descriptive_name()) 

    my_tesla = car.ElectricCar('tesla', 'roadster', 2019)
    print(my_tesla.get_descriptive_name())
</code>
</pre>

Here, we **import** the entire car module. We then access the classes we need through the **module_name.ClassName** syntax.

##### Importing All Classes from a Module

You can import every class from a module using the following syntax:

<pre>
<code>
    from module_name import * 
</code>
</pre>

**This method is not recommended**.

With this approach it’s unclear which classes you’re using from the module. This approach can also lead to confusion with names in the file. If you accidentally import a class with the same name as
something else in your program file, you can create errors that are hard to diagnose.

If you need to import many classes from a module, you’re better off importing the entire module and using the **module_name.ClassName** syntax.

##### Importing a Module into a Module

When you store our classes in several modules, we may find that a class in one module depends on a class in another module. When this happens, we can import the required class into the first module.

###### electric_car.py

<pre>
<code>
    """A set of classes that can be used to represent electric cars."""

    <strong>from car import Car</strong>

     <strong>class Battery:</strong>
        """A simple attempt model a battery for an electric car."""

        def __init__(self, battery_size=75):
            """Initialize the battery's attributes."""
            self.battery_size = battery_size

        def describe_battery(self):
            """Print a statement describing the battery size."""
            print(f"This car has a {self.battery_size}-kWh battery.")

        def get_range(self):
            """Print a statement about the range this battrey provides."""
            if self.battery_size == 75:
                range = 260
            elif self.battery_size == 100:
                range = 315

            print(f"This car can go about {range} miles on a full charge.")

    <strong>class ElectricCar(Car):</strong>
        """Represent aspects of a car, specific to electric vehicles."""

        def __init__(self, make, model, year):
            """Initialize attributes of the parent class.
                Then initialize attributes specific to an electric car.
            """
            super().__init__(make, model, year)
            self.battery = Battery()
</code>
</pre>

###### car.py

<pre>
<code>
    """A class that can be used to represent a car."""

    <strong>class Car:</strong>
        """A simple attempt to represent a car."""

        def __init__(self, make, model, year):
            """Initialize attribute to describe a car."""
            self.make = make
            self.model = model
            self.year = year
            self.odometer_reading = 0

        def get_descriptive_name(self):
            """Return a neatly formatted descriptive name."""
            long_name = f"{self.year} {self.make} {self.model}"
            return long_name.title()

        def update_odometer(self, mileage):
            """Set the odometer reading to the given value.
                Reject the change if it attempts to roll odometer back.
            """
            if mileage >= self.odometer_reading:
                self.odometer_reading = mileage
            else:
                print("You can't roll back on odometer!")

        def read_odometer(self):
            """Print a statement showing the car's mileage."""
            print(f"The car has {self.odometer_reading} miles on it.")

        def increment_odometer(self, miles):
            """Add the given amount to the odometer reading."""
            self.odometer_reading += miles
</code>
</pre>

###### my_cars.py

<pre>
<code>
    <strong>from car import Car</strong>
    <strong>from electric_car import ElectricCar</strong>

    my_beetle = Car('volkswagen', 'beetle', 2019)
    print(my_beetle.get_descriptive_name())

    my_tesla = ElectricCar('tesla', 'roadster', 2019)
    print(my_tesla.get_descriptive_name()) 

    ''' Output:
        2019 Volkswagen Beetle
        2019 Tesla Roadster 
    '''
</code>
</pre>

##### Using Aliases

We can use aliases when importing classes as well:

<pre>
<code>
    <strong>from electic_car import ElectricCar as EC</strong>

    my_tesla = EC('tesla', 'model s', 2019)
</code>
</pre>

#### 5. The Python Standard Library

The **Python standard Library** is a set of modules included with every Python installation. We can use any **function or class** in the standard library by including a simple **import** statement at the top of our file.

<pre>
<code>
    >>> from random import randint
    >>> randint(1, 6)
    3

    >>> from random import choice 
    >>> players = ['charles', 'martina', 'michael', 'florence', 'eli'] 
    >>> first_up = choice(players) 
    >>> first_up 
    'florence'
</code>
</pre>

{% endraw %}

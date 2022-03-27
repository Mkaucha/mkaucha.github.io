---
layout: blogdetail
author: Milan Kaucha
title: Using Clousers
categories: Scope and Closure
excerpt_separator: <!--more-->
---

Closure builds on this approach: for variables we need to use over time, instead of placing them in larger outer scopes, we can **encapsulate** (more narrowly scope) them but still preserve access from inside functions, for broader use. Functions remember these referenced scoped variables via **closure**.

If you’ve ever written a callback that accesses variables outside its own scope... guess what!? That’s **closure**.

**Closure** is one of the most important language characterstics ever invented in programming - it underlies major programming paradigms, including **Functional Programming (FP), modules, and even a bit of class-oriented design**. Getting comfortable with closure is required for mastering JS and effectively leveraging many important design patterns throughout
your code.

#### 1. See the closure

Closure is originally a mathematical concept, from **lambda calculus**.

If you aren’t dealing with a function, closure does not apply. An **object** cannot have closure, nor does a **class** have closure (though its **functions/methods** might). Only functions have **closure**.

For **closure** to be observed, a function must be invoked, and specially it must be invoked in a different branch of the scope chain from where it was originally defined.

A function executing in the **same scope** it was defined would not exhibit any observably different behavior **with or without closure** being possible; by the observational perspective and definition, that is not **closure**.

<pre>
<code>
  // outer/global scope: RED(1)

  function lookupStudent(studentId) {
    // function scope: BLUE(2)

    var students = [
      { id: 14, name: "Kyle" },
      { id: 73, name: "Suzy" },
      { id: 112, name: "Frank" },
      { id: 6, name: "Sarah" }
    ];

    return function greetStudent(greeting) {
      // function scope: GREEN(3)

      var student = students.find(
        student => student.id == studentID
      );

      return `${ greeting }, ${ student.name }!`;
    };
  }

  var chosenStudents = [
    lookupStudent(6),
    lookupStudent(112)
  ];

  // accessing the function's name:
  chosenStudents[0].name;
  // greetStudent

  chosenStudents[0]("Hello");
  // Hello, Sarah!
  
  chosenStudents[1]("Howdy");
  // Howdy, Frank!

</code>
</pre>

The **lookupStudent(..)** outer function creates and returns an inner function called **greetStudent(..)**.<br>
**lookupStudent(..)** is called twice, producing two seperate instances of its inner **greetStudent(..)** function, both of which are saved into the **chosenStudents** array.

We verify that's the case by checking the **.name** property of the returned function saved in **chosenStudents[0]**, and its indeed an instance of the inner **greetStudent(..)**.

After each call to **lookupStudent(..)** finishes, it would seem like all its inner variables would be discarded and grabage collected. The inner function is the only thing that seems to be returned and preserved. But here's where the behavior differs in ways we can start to observe.

While **greetStudent(..)** does recieve a single argument as the parameter named **greeting**, it also makes reference to both **students** and **studentID**, identifiers which come from the enclosing scope of **lookupStudent(..)**. Each of those references from the inner function to the variable in an outher scope is called a **closure**. Each instance of **greetStudent(..)** closes over the outer variable **students** and **studentID**.

**Closure** allows **greetStudent(..)** to continue to access those outer variables even after the outer scope is finished (when each call to **lookupStudent(..)** completes). Instead of the instances of students and studentID being garbage collected, they stay around in memory. At a later time when either instance of the **greetStudent(..)** function is invoked, those variables are still there, holding their current values.

If JS functions did not have closure, the completion of each **lookupStudent(..)** call would immediately tear down its scope and garbage collect the **students** and **studentID** variables. The reasonalbe assumption if **greetStudent(..)** tried to acccess those variable would be **ReferenceError**.

But we don't get an error. The fact that the execution of **chosenStudents[0]("Hello")** works and returns message "Hello, Sarah!", means it was still able to access the **student** and **studentID** variables. This is direct observation of closure!

##### Pointed Closure

The **student => student.id == studentID** arrow function is creating another scope bubble inside the **greetStudent(..)** function scope.

<pre>
<code>
  var student = students.find(
    student => 
        // function scope: ORANGE(4)
        student.id == studentID
  );
</code>
</pre>

The **BLUE(2) studentID** reference is actually inside the **ORANGE(4)** scope rather than the **GREEN(3)** scope of **greetStudent(..);** also, the student parameter of the arrow function is **ORANGE(4)**, shadowing the **GREEN(3)** student.

This arrow function passed as a callback to the array's **find(..)** method which hold the closure over studentID, rather than **greetStudent(..)** holding the closure.

##### Adding Up Closures

Let's examine one of the cannonical examples often cited for closure:

<pre>
<code>
  function adder(num1) {
    return function addTo(num2) {
      return num1 + num2;
    };
  }
  
  var add10To = adder(10);
  var add42To = adder(42);

  add10To(15);    // 25
  add42To(9);     // 51 
</code>
</pre>

Each instance of the inner **addTo(..)** functions is closing over its own **num1** variable (with values 10 and 42, respectively), so those **num1's** don't go away just because **adder(..)** finishes. When we later invoke one of those inner **addTo()** intances, such as the **add10To(15)** call, its closed-over **num1** variable still exists and still holds the original **10** value. The operation is thus able to perform 10 + 15 and return the answer 25.

**Closure** is associated with an instance of a function, rather than its single lexical definition.<br>
Every time the outer **adder(..)** function runs, a **new inner addTo(..)** function instance is created, and for each new instance, a new **closure**. So each inner function instance (labeled **add10To(..)** and **add42To(..)** in our program) has its own **closure** over its own instance of the scope environment from the execution of **adder(..)**

> Note:
>
> Even though closure is based on lexical scope, which is handled at compile time, closure is observed as a runtime characterstic of fucntion instaces.

##### Live Link, Not a Snapshot

We **read the value from a variable** that was held in a closure which makes us feel like clouser might be a snapshot of a value at some given moment. Indeed, that's a common misconception.

**Closure** is actually a live link, preserving access to the full variable itself. By closing over a variable in a function, we can keep using that variable (read and write) as long as that function reference exists in the program and from anywhere we want to invoke that function.<br>
This is why closure is such a powerful technique used widely across many areas of programming!

![closure example](/assets/images/closure.png "Visualizing Closures")

As shown in figure, each call to **adder(..)** creates a new **Blue(2)** scope containing a **num1** variable, as well as a new instance of **addTo(..)** function as a **GREEN(3)** scope. Function instances(**addTo10(..)** and **addTo42(..)**) are present in and invoked from the **RED(1)** scope.

<pre>
<code>
  function makeCounter() {
    var count = 0;
    
    return getCurrent() {
      count = count + 1;
      return count;
    };
  }

  var hits = makeCounter();

  // later

  hits()    // 1

  // later
  
  hits()    // 2
  hits()    // 3
</code>
</pre>

The **count** variable is closed over by the inner **getCurrent()** function, which keeps it around instead of it being subjected to garbage collect. The **hits()** funtion calls access and update variable, returning an incrementing count each time.

Though the enclosing scope of a closure is typically from a function, that's not actually required; there only needs to be inner function present inside an outer scope.

<pre>
<code>
  var hits;
  { // an outer scope (but not a  function)
    let count = 0;
    hits = function getCurrent(){
      count = count = 1;
      return count;
    };
  }
  hits();   // 1
  hits();   // 2
  hits();   // 3
</code>
</pre>

It's so common to mistake closure as value-oriented instead of variable-oriented. Consider:

<pre>
<code>
  var studentName = "Frank";

  var greeting = function hello() {
    // we are closing over `studentName`,
    // not "Frank"
    console.log(
      `Hello, ${ studentName }!`
    );
  }

  // later

  studentName = "Suzy";

  // later

  greeting();
  // Hello, Suzy!
</code>
</pre>

When student Name holds the value "Frank", the mistaken assumption is often that the closure will capture "Frank". But **greeting()** is closed over the variable **studentName**, not its **value**. Whenever **greeting()** is invoked, the current value of the variable is reflected.

The illustration of this mistake is defining functions inside a loop:

<pre>
<code>
  var keeps = [];
  
  for (var i = 0; i < 3; i++) {
    // storing function references in an 
    // array, so we don't need to 
    //consider asynchronus timing
    keeps[i] = function keepI(){
      // closure over `i`
      return i;
    };
  }

  keeps[0]();   // 3 -- Why!?
  keeps[1]();   // 3
  keeps[2]();   // 3
</code>
</pre>

We might have expected the **keeps\[0]()** invocation to retun 0, since that function was created during the first iteration of the loop when i was 0.

Each saved function returns 3, because by the end of the loop, the single **i** variable in the program has been assigned **3**. Each of the three functions in the **keeps array** do have individual closures, but they're all closed over that same shared **i** variable.

Of course, a single variable can only ever hold one value at any given moment. So if you want to preserve multiple values, you need a different variable for each.

Lets create a new variable for each iteration:

<pre>
<code>
  var keeps = [];

  for(var i = 0; i < 3; i++) {
    // new `j` created each iteration, 
    // which gets a copy of the value of 
    // `i` at this moment
    let j = i;

    // the `i` here isn't being closed over, so
    // it's fine to immediately use its current
    // value in each loop iteration
    keeps[i] = function keepEachJ(){
      // close over `j`, not `i`!
      return j;
    };
  }
  keeps[0]();   // 0
  keeps[1]();   // 1
  keeps[2]();   // 2
</code>
</pre>

Each function is now closed over a seperate variable from each iteration, even though all of them are named j. And each **j** gets a copy of the value **i** at that point in the loop iteration; that **j** never gets re-assigned. So all three functions now return their expected values: **0, 1, and 2!**

Passing each inner **keepEachJ()** function into **setTimeout(..)** or some event handler subscription, the same kind of closure behavior would still be observed.

<pre>
<code>
  var keeps = [];

  for (let i = 0; i < 3; i++) {
    // the `let i` gives a new `i` for
    // each iteration, automatically!
    keeps[i] = function keepEachI() {
      return i;
    };
  }
  keeps[0]();   // 0
  keeps[1]();   // 1
  keeps[2]();   // 2
</code>
</pre>

Since we're using let, three i's are created, one for each loop, so each of the three closures just work as expected.

##### Common Closures: Ajax and Events

Closure is most commonly encountered with callbacks:

<pre>
<code>
  function lookupStudentRecord(studentID) {
    ajax(
      `https://some.api/student/${ studentID }`,
      function onRecord(record) {
        console.log(
          `${ record.name } (${ studentID })`
        );
      }
    );
  }
  lookupStudentRecord(114);
  // Frank (114)
</code>
</pre>

The **onRecord(..) callback** is going to be invoked at some point in the future, after the response from the **Ajax** call comes back. This invocation will happen from the internals of the **ajax(..)** utility, wherever that comes from. When that happens, the **lookupStudentRecord(..)** call will long since have completed.

Why then is **studentID** still around and accessible to the callback? **Closure**.

Event handlers are another common usage of closure:

<pre>
<code>
  function listenForClicks(btn, label) {
    btn.addEventListener("click", function onClick(){
      console.log(
        `The ${ label } button was clicked!`
      );
    });
  }
  
  var submitBtn = document.getElementById("submit-btn");

  listenForClicks(submitBtn, "Checkout");
</code>
</pre>

The **label** parameter is closed over by the **onClick(..)** event handler callback. When the button is clicked, **label** still exists to be used. This is **closure**.

##### What If I Can't See It?

If a closure exists but it cannot be observed in our programs, **does it matter? No.**

For example, invoking a function that makes use of lexical scope lookup:

<pre>
<code>
  function say(myName) {
    var greeting = "Hello";
    output();

    function output() {
      console.log(
        `${ greeting }, ${ myName }!`
      );
    }
  }

  say("Kyle");
  //  Hello, kyle!
</code>
</pre>

The inner function **output()** accesses the variables **greeting** and **myName** from its enclosing scope. But the invocation of **output()** happens in that same scope, where of course **greeting** and **myName** are still available; that's just **lexical scope**, not **closure**.

Global scope variables essentially cannot be closed over, because they're always accessible from everywhere. No function can ever be invoked in any part of the scope chain that is not a descendant of the global scope.

Consider:

<pre>
<code>
  var students = [
    { id: 14, name: "Kyle" },
    { id: 73, name: "Suzy" },
    { id: 112, name: "Frank" },
    { id: 6, name: "Sarah" }
  ];

  function getFirstStudent() {
    return function firstStudent() {
      return students[0].name;
    };
  }

  var student = getFirstStudent();

  student();
  // Kyle
</code>
</pre>

The inner **firstStudent()** function does reference **students**, which is a variable outside its own scope. But since **stuents** happens to be from global scope, no matter where that function is invoked in the program, its ability to access **students** is nothing more special than normal **lexical scope**.

Variables that are merely present but never accessed don't result in closure:

<pre>
<code>
  function lookupStudent(studentID) {
    return function nobody(){
      var msg = "Nobody's here yet.";
      console.log(msg);
    };
  }

  var student = lookupStudent(112);

  student();
  // Nobody's here yet.
</code>
</pre>

The inner function **nobody()** doesn't close over any outer variables - it only uses its own variable **msg**. Even though **studentID** is present in the enclosing scope, **studentID** is not referred to by **nobody()**.

Whether JS functions support closure or not, this program behave the same. Therefore, no observed closure here.

If there's no function invocation, closure can't be observed:

<pre>
<code>
  function greetStudent(studentName) {
    return function greeting() {
      console.log(
        `Hello, ${ studentName }!`
      );
    };
  }

  greetStudent("Kyle");

  // nothing else happens
</code>
</pre>

The outer function definetly does get invoked. But inner function is the one that could have **closure**, and yet it's never invoked; the returned function here is just thrown away.

##### Observable Definition

We're now ready to define closure:

**Closure** is observed when a function uses **variables** from outer **scopes** even while running in a scope where those **variables** wouldn't be accessible.

The key parts of this definition are:

- Must be a function involved
- Must reference at least one variable from an outer scope
- Must be invoked in a different branch of the scope chain from the variables

We should look and plan for the direct, concrete effects closure has on our program behavior.

#### 2. The Closure Lifecycle and Garbage Collection (GC)

Since **closure** is inherently tied to a function instance, its closure over a variable lasts as long as there is still a reference to that function.

**Closure** can unexpectedly prevent the GC of a variable that you’re otherwise done with, which leads to run-away memory usage over time. That’s why it’s important to discard function references (and thus their closures) when they’re not needed anymore.

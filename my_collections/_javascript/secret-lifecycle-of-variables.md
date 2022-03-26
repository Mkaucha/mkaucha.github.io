---
layout: blogdetail
author: Milan Kaucha
title: The Secret Lifecycle of Variables
categories: Scope and Closure
excerpt_separator: <!--more-->
---

If a variable declaration appears past the first statement of a scope, how will any references to that identifier before the declaration behave? What happens if you try to declare the same variable twice in a scope?

<!--more-->

#### 1. When Can I Use a Variable?

At what point does a variable become available to use within its scope?

<pre>
<code>
    greeting();
    // Hello!

    function greeting() {
        console.log("Hello!");
    }
</code>
</pre>

Why can we access the identifier **greeting** from line 1 (to retrieve and execute a function refrence), even though the **greeting()** function declaration doesn't occur until line 4?

Every identifier is _created_ at the begining of the scope it belongs to, **every time that scope is entered.**

The variable being visible from the begining of its enclosing scope, even though declaration may appear further down in the scope, is called **hoisting.**

But how does the variable greeting have any value (the function reference) assigned to it, from the moment the scope starts running? <br>
The answer is a special characterstics of formal function declarations, called **function hoisting**.

When a function declaration's name identifier is registered at the top of its scope, it's additionally auto-initailized to that function's reference. That's why the function can be called throughout the entire scope!

One key detail is that both **function hoisting** and **variable hoisting** attach their name identifiers to the nearest enclosing **function scope** (or, if none, the global scope), not a **block scope**.

> Note
>
> Declarations with let and const still hoist. But these two declaration forms attach to their enclosing block rather than just and enclosing function as with var and function declarations.

##### Hoisting: Declaration vs. Expression

**Function hoisting** only applies to formal function declarations, not to function expression assignments.

<pre>
<code>
    greeting();
    // TypeError

    var greeting = function greeting() {
        console.log("Hello!");
    };
</code>
</pre>

**greeting();** throws and error. A **TypeError** means we're trying to do something with a value that is not allowed.

Depending on your **JS environment**, the error message would say something like, **"'undefined' is not a function,"** or helpfully, **"'greeting is not a function.'"**

> Note:
>
> The above error is **not** a **RefernceError**. JS isn't telling us that it couldn't find **greeting** as an identifier in the scope. It's telling us that **greeting** was found but doesn't hold a function reference at that moment. Only fucntion can be invoked, so attempting to invoke non-function value results in an error.

**But what does greeting hold, if not the function reference?**

In addition to being hoisted, **variables** declared with a var are also automatically initialized to **undefined** at the begining of their scope - again, the nearest enclosing function, or the global. Once initialized, they're available to be used (assigned to, retireved from, etc.) throughout the whole scope.

So on that first line, greeting exists, but it holds only the default undefined value. It’s not until line 4 that greeting gets assigned the function reference.

The name of the identifier is hoisted. But the function reference association isn't handled at initialization time (begining of the scope) unless the identifier was created in a formal function declaration.

##### Variable Hoisting

Let's look at this example of **variable hoisting:**

<pre>
<code>
    greeting = "Hello!";
    console.log(greeting);
    //Hello

    var greeting = "Howdy!"
</code>
</pre>

Though **greeting** isn't declared until line 5, it's available to be assigned to as early as line 1. Why?

There's two necessary parts to the explanation:

- the identifier is hoisted,
- and it's automatically initialized to the value undefined from the top of the scope

##### Hoisting: Yet Another Metaphor

The explanation often asserted is that the JS engine will actually **rewrite** that program before execution.

<pre>
<code>
    var greeting;           // hoisted declaration
    greeting = "Hello!";    // the original line 1
    console.log(greeting);  // Hello!
    greeting = "Howdy!";    // 'var' is gone!
</code>
</pre>

Consider

<pre>
<code>
    studentName = "Suzy";
    greeting();
    // Hello Suzy!
    function greeting() {
    console.log(`Hello ${ studentName }!`);
    }
    var studentName;
</code>
</pre>

The **"rule"** of the hoisting metaphor is that **function declarations** are hoisted first, then **variables** are hoisted immediately after all the functions.

<pre>
<code>
    function greeting() {
        console.log(`Hello ${ studentName }!`);
    }

    var studentName;
    studentName = "Suzy";
    greeting();
    // Hello Suzy!
</code>
</pre>

> Note:
>
> Hoisting as a mechanism for **re-ordering code** may be an attractive simplification, but it’s not **accurate**.

The JS engine doesn’t actually re-arrange the code. It can’t magically look ahead and find declarations; the only way to accurately find them, as well as all the scope boundaries in the program, would be to **fully parse** the code.

I assert that hoisting should be used to refer to the compile time operation of generating runtime instructions for the automatic registration of a variable at the beginning of its scope, each time that scope is entered.

#### 3. Re-declaration?

**What do you think happens when a variable is declared more than once in the same scope? Consider:**

<pre>
<code>
    var studentName = "Frank";
    console.log(studentName);
    // Frank

    var studentName;
    console.log(studentName);   // ???
</code>
</pre>

Many believe the second **var studentName** has re-declared the variable (and thus **"reset" it**), so they expect **undefined** to be printed.

But is there such a thing as a variable being "re-decleared" in the same scope? **No**.

If we consider this program from the perspective of the hoisting metaphor; it would be:

<pre>
<code>
    var studentName;
    var studentName;    // clearly a pointless no-op!

    studentName = "Frank";
    // Frank

    console.log(studentName);
    // Frank
</code>
</pre>

Since hoisting is actually about registering a variable at the begining of a scope, there's nothing to be done in the middle of the scope where the original program actually had the **secodn var studentName** statement which is a pointless statement.

It's important to point out that **var studentName;** doesn't mean **var studentName = undefined;**, as most assume.

<pre>
<code>
    var studentName = "Frank";
    console.log(studentName);   //Frank

    var studentName;
    console.log(studentName);   //Frank

    // let's add the initialization explicitly
    var studentName = undefined;
    console.log(studentName);   // undefined <--- see!?
</code>
</pre>

See how the **explicit = undefined** initialization produces a different outcome than assuming it happens when ommited?

Here's another illustration, this time across a function of the same name:

<pre>
<code>
    var greeting;

    function greeting() {
        console.log(greeting);
    }
    // basically, a no-op
    var greeting;

    typeof greeting;    // "function"

    var greeting = "Hello!";

    typeof greeting;    // "string"
</code>
</pre>

The first **greeting** declaration registers the identifier to the **scope**, and because it's a **var** the auto-initialization will be **undefined**. The **function** declaration doesn't need to register the identifier, but because of **function hoisting** it overrides the auto-initialization to use the **function reference**. The **second var greeting** by itself doesn't do anything since **greeting** is already an identifier and **function hoisting** already took precedence for the auto-initialization.

Actually assinging **"Hello!"** to greeting changes its value from the initial **function greeting()** to the **string**; var itself doesn't have any effect.

**What about repeating a declaration within a scope using let or const?**

<pre>
<code>
    let studentName = "Frank";

    console.log(studentName);

    let studentName = "Suzy";
</code>
</pre>

This program will not execute, but instead immediately throw a **SyntaxError**.

It's not just that two declarations involving **let** will throw this error. If either declaration uses **let**, the other can be either **let or var**.

<pre>
<code>
    var studentName = "Frank";

    let studentName = "Suzy";

    and:

    let studentName = "Frank";

    var studentName = "Suzy";
</code>
</pre>

In both cases, a **SyntaxError** is thrown on the second declaration. In other words, the only way to "re-declare" a variable is to use var for all of its declarations.

When **Compiler** asks **Scope Manager** about a declaration, if that identifier has already been declared, and if either/both declarations were made with **let**, an error is thrown.

##### Constants?

The **const** keyword is more contrained than **let**. Like **let**, **const** cannot be repeated with the same identifier in the same scope.

The **const** keyword requires a variable to be initialized, so ommiting an assignment from the declartion results in a **SyntaxError**:

<pre>
<code>
    const empty:    // SyntaxError
</code>
</pre>

**const** declarations create variables that cannot be re-assigned:

<pre>
<code>
    const studentName = "Frank";
    console.log(studentName);
    // Frank

    studentName = "Suzy";   // TypeError
</code>
</pre>

The **studentName** variable cannot be re-assigned because it's declared with a **const**.

> Note:
>
> The error thrown when re-assigning **studetName** is a **TypeError**, not a **SyntaxError**. Syntax errors represent faults in the program that stop it from even starting execution. Type errors represt faults that arise during program execution.

##### Loops

Lets consider what it means for repeated exection of declaration statements in loops. Consider:

<pre>
<code>
    var keepGoing = true;
    while (keepGoing) {
      let value = Math.random();
      if (value > 0.5) {
          keepGoing = false;
      }
    }
</code>
</pre>

**Is value being "re-declared" repeatedly in this program? Will we get errors thrown? No.**

All the rules of scope (including "re-declaration" of let created variables) are aplied **per scope instance**. In other words, each time a scope is entered during execution, everything resets.

Each loop iteration is its own new scope instance, and within each scope instance, value is only being declared once.

What if the value declaration were changed to a var?

<pre>
<code>
    var keepGoing = true;
    while (keepGoing) {
      var value = Math.random();
      if (value > 0.5) {
          keepGoing = false;
      }
    }
</code>
</pre>

Here, **var** is not treated as a block scoping declaration, it attaches itself to the global scope. So there's just one value variable, in the same scope as keepGoing.

What about "re-declaration" with other loop forms, like for-loops?

<pre>
<code>
    for (let i = 0; i < 3; i++) {
        let value = i * 10;
        console.log(`${ i }: ${ value }`)
    }
    // 0: 0
    // 1: 10
    // 2: 10
</code>
</pre>

What about other for-loops forms?

<pre>
<code>
    for (let index in students) {
        // this is fine
    }

    for (let student of students) {
        // so is this
    }
</code>
</pre>

Same thing with **for .. in** and **for .. if** loops: the declared variable is treated inside the loop body, and thus handled per iteration (per scope instance).

Let's explore how **const** impacts these looping constructs.

<pre>
<code>
    var keepGoing = true;
    while (keepGoing) {
      // ooo, a shiny constant!
      const value = Math.random();
      if (value > 0.5) {
          keepGoing = false;
      }
    }      
</code>
</pre>

Just like the **let**, **const** is being run exactly once within each loop iteration, so its safe from "re-declaration" troubles.

**for .. in** and **for .. of** are fine to use with const:

<pre>
<code>
    for (const index in students) {
      // this is fine
    }

    for(const student of students) {
      //this is also fine
    }
</code>
</pre>
<pre>
<code>
    <strong>But not the general for-loop:</strong>
    for (const i = 0; i < 3; i++) {
      // oops, this is going to fail with
      // a Type Error after the first iteration
    }
</code>
</pre>

What's wrong here?<br>
Our **i** is indeed just created once inside the loop. The problem is the conceptual **i** that must be incremented each time with **i++** expression. That's **re-assignment**, which isn't allowed for constant.

The straightforward answer is: const can’t be used with the classic for-loop form because of the required re-assignment.

#### 4. Uninitialized Variables (aka, TDZ)

With **var** declarations, the variable is **"hoisted"** to the top of its scope. But it's also automatically initialized to the **undefined** value, so that the variable can be used throughout the entire scope.

However, **let** and **const** declarations are not quite the same in this respect.

<pre>
<code>
    console.log(studentName);
    // ReferenceError

    let studentName = "Suzy";
</code>
</pre>

Let's try this;

<pre>
<code>
    studentName = "Suzy"; // let's try to initialize it!
    // ReferenceError

    console.log(studentName);

    let studentName;
</code>
</pre>

We still get the **ReferenceError**, For **let/const**, the only way to do so is with an assignment attached to a declaration statement. An assignment by itself is insufficient! Consider:

<pre>
<code>
    let studentName = "Suzy";
    console.log(studentName);   // Suzy
</code>
</pre>

Here, we initializing the **studentName** by way of the let declaration statement from that's coupled with an assignment.

Alternatively:

<pre>
<code>
    // ...

    let studentName;
    // or:
    // let studentName = undefined;

    // ..

    studentName = "Suzy";
    
    console.log(studentName);
    // Suzy
</code>
</pre>

> Note:
>
> **var studentName;** is not the same as **var studentName = undefined;** but with **let**, they behave the same. The difference comes down to the fact that **var studentName** automatically initializes at the top of the scope, where **let studentName** does not.

So, if we analyze what's going on here, we see that an additional nuanceis that **Compiler** is also adding an instruction in the middle of the program, at the point where the variable **studentName** was declared, to handle that declaration's auto initialization. We cannot use the variable at any point prior to that initialization occuring. The same goes for **cosnt/let**

The term coined by **TC39** to refer to this **period of time** from the entering of a scope to where the auto-initialization of the variable occurs is: **Temporal Dead Zone (TDZ)**.

The **TDZ** is the time window where a variable exists but is still uninitialized, and therefore cannot be accessed in any way. Only the execution of the instruction left by **Compiler** at the point of the original declaration can do that initialization. After that, the **TDZ** is done, and the variable is free to be used for the rest of the scope.

Only **let** and **const** have an observable TDZ. A **var** also has technically has a **TDZ**, but it's zero in length and thus unobservable to our programs!

**"temporal"** in TDZ does indeed refer to **time not position in code**. Consider:

<pre>
<code>
    askQuestion();
    // ReferenceError

    let studentName = "Suzy";

    function askQuestion() {
        console.log(`${ studentName }, do you know?`);
    }
</code>
</pre>

Even though positionally the **console.log(..)** reference **studentName** comes after the **let studentName** declaration, timing wise the **askQuestion()** function is invoked **before** the **let** statement is encountered, while **studentName** is still in its **TDZ!** Hence the error.

There's a common misconception that **TDZ** means **let** and **const** do not hoist. This is an inaccurate, or at least slightly misleading, claim. They defintely **hoist**.

The actual difference is that **let/const** declarations do not automatically initialize at the begining of the scope, the way var does. Auto-registration of a variable at the top of the scope and auto-initialization at the top of the scope (to undefined) are distinct operations and shouldn't be lumped together under the single term **"hoisting"**.

We've already seen that **let** and **const** don't auto-initialize at the top of the scope. But let's prove that **let** and **const** do hoist.

<pre>
<code>
    var studentName = "Kyle";

    {
        console.log(studentName);
        // ???

        // ..

        let studentName = "Suzy";

        console.log(studentName);
        // Suzy
    }
</code>
</pre>

So to summarize, **TDZ** errors occur because **let/const** declarations do **hoist** their declarations to the top of their scopes, but unlike **var**, they defer the auto-initialization of their variables until the moment in the codes's sequencing where the original declaration appeared.

**How can we avoid TDZ errors?**

My advice: always put your **let** and **const** declarations at the top of any scope. Shrink the **TDZ** window to zero length, and the it'll be moot.

#### 5. Finally Initialized

**Hoisting, (re)declaration, and the TDZ** are common sources of confusion for developers, especially those who have worked in other languages before comming to JS.

Hoisting is generally cited as an explicit mechanism of the JS engine, but it's really more metaphor to describe the various ways JS handles variable declarations during compilation. It offers useful structure for thinking about the life-cycle of a variabe - when its created, when its available to use, when it goes away.

Declaration and re-declaration of variables tend to cause confusion when thought of as runtime operations. But if we shift to compile-time thinking for these operations, the quirks and shadows diminish.

The TDZ (temporal dead zone) error is strange and frustrating when encountered. Fortunately, TDZ is relatively straightforward to avoid if you’re always careful to place **let/const** declarations at the top of any scope.

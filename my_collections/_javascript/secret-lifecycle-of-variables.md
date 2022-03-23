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

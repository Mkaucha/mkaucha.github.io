---
layout: blogdetail
author: Milan Kaucha
title: Types
categories: Types and Grammer
excerpt_separator: <!--more-->
---

A type is and intrinsic, built-in set of characterstics that uniquely identifies the behavior of a particular value and distinguishes it from other values, both to the egine and to the developer.

In other words, if both the engine and developer treat value 42 (the number) differently than they treat value "42" (the string), then those two values have different types - **number** and **string**, respectively. When we

#### 1. A Type by Any Other Name...

Having a proper understanding of each type and its intrinsic behavior is absolutely essential to understanding how to properly and accurately convert values to different types. Nearly every JS program ever written will need to handle **value coercion** in some shape or form.

If you have the number value 42, but we want to treat it like a **string**, such as pulling out the **"2"** as a character in positon 1, we obviously must first convert (**coerce**) the value from number to string.

There are many different ways that such coercion can happen. Some of these ways are explicit, easy to reason about, and reliable, But if you're not careful, **coercion** can happen in very strange and suprising ways.

#### 2. Built-in Types

Javascript defines seven built-in types:

- null
- undefined
- boolean
- number
- string
- object
- symbol - added in ES6!

> Note:
>
> All of these types except object are called **"primitives"**.

The **typeof** operator inspects the type of the given value, and always returns one of seven string values.

<pre>
<code>
  typeof undefined    === "undefined";    // true
  typeof true         === "boolean";      // true
  typeof 42           === "number";       // true
  typeof "42"         === "string";       // true
  typeof { life: 42 } === "object";       // true

  // added in ES6!
  typeof Symbol()     === "symbol";       // true
</code>
</pre>

These six listed types have values of the corresponding type and return a string value of the same name.

**null is special** -- special in the sense that it's buggy when combined with the **typeof** operator:

<pre>
<code>
  type of null === "object"; // true
</code>
</pre>

If we want to test for a **null** value using its type, we need a compound condition:

<pre>
<code>
  var a = null;

  (!a && typeof a === "object"); // true
</code>
</pre>

**null** is the only primitive value that is "falsy" but which also returns **"object"** from the typeof check.

So what's the seventh string value that typeof can return?

<pre>
<code>
  typeof function a(){ /* .. */ } === "function"; // true
</code>
</pre>

It's easy to think that function would be a top-level built-in type in JS, especially given this behavior of the **typeof** operator. However, if we read the spec, we'll see it's actually somewhat of a **"subtype"** of object. Specially, a function is reffered to as a **"callable object"** -- an object that has an internal **\[[Call]]** property that allows it to be invoked.

The fact that functions are actually objects is quite useful. For example:

<pre>
<code>
  function a(b, c) {
    /* .. */
  }
  // The function object has a length property set to 
  // the number of formal parameters it is declared with:
  a.length; //2


  Since you declared the function with two formal named parameters
  (b and c), the “length of the function” is 2.
</code>
</pre>

What about arrays? They're native to JS, so are they a special type?

<pre>
<code>
  typeof [1,2,3] === "object";  // true
</code>
</pre>

Nope, just **objects**. It’s most appropriate to think of them also as a "subtype" of object, in this case with the additional characterstics of being numerically indxed and maintaining an automatically updated **.length** property.

#### 3. Values as Types

In JavaScript, variables don't have types - **values have types**. Variable can hold any value, at any time.

JS doesn't have "type enforcement", in that the engine doesn't insist that a **variable always** holds values of the **same initial type** that it starts out with. A variable can, in one assignment statement, hold a **string**, and in the next hold a **number**, and so on.

The **value 42** has an intrinsic type of number, and its type cannot be changed. Another value, like **"42"** with the string type, can be created from the number value 42 through a process called coersion.

If we use **typeof** against a variable, it's not asking "Whats's the type of variable?", since JS variable have no types. Instead, it's asking "What's the type of the value in the variable?"

<pre>
<code>
  var a = 42;
  typeof a;  // "number"

  a = true;
  typeof a; // "boolean"

  // The typeof operator always returns a string. So.
  typeof typeof 42;  // "string"

  // The first typeof 42 returns "number", and typeof
  // "number" is "string".
</code>
</pre>

##### undefined Versus "undeclared"

Variables that have no value currently actually have the **undefined** value. Calling typeof against such variables will return "undefined":

<pre>
<code>
  var a;

  type of a;  // "undefined"

  var b = 42;
  var c;

  // later
  b = c;

  typeof b;  // "undefined"
  typeof c;  // "undefined"
</code>
</pre>

An **"undefined"** variable is one that has been declared in the accesible scope, but at the moment has no other value in it. By contrast, an **"undeclared"** variable is one that has not been formally declared in the accessible scope.

<pre>
<code>
  var a;

  a;  // undefined
  b;  // ReferenceError: b is not defined
</code>
</pre>

**"undefined"** and **"is not defined"** are very different things.

There's also a special behavior associated with **typeof** as it relates to undeclared variables.

<pre>
<code>
  var a;
  
  typeof a;  // "undefined"

  typeof b;  // "undefined"
</code>
</pre>

The **typeof** operator returns **"undefined"** even for **"undeclared"** variables. There was no error thrown when we executed typeof b, even though b is an **undecleared** variable.

##### typeof Undeclared

A top-level global var **DEBUG = true** declaration would only be included in a **"debug.js"** file, which you only load into the browser when you’re in development/testing, but not in production.

However, you have to take care in how you check for the global **DEBUG** variable in the rest of your application code, so that you don’t throw a **ReferenceError**.

<pre>
<code>
  // oops, this would throw an error!
  if (DEBUG) {
    console.log( "Debugging is starting" );
  }

  // this is a safe existence check
  if (typeof DEBUG !== "undefined") {
    console.log( "Debugging is starting" );
  }
</code>
</pre>

If you are doing a feature check for a built-in API, you may also find it helpful to check without throwing
an error:

<pre>
<code>
  if (typeof atob === "undefined") {
    atob = function() { /*..*/ };
  }
</code>
</pre>

Another way of doing these checks against global variables but without the safety guard feature of typeof is to observe that all global variables are also properties of the global object, which in the
browser is basically the window object.

<pre>
<code>
  if (window.DEBUG) {
    // ..
  }

  if (!window.atob) {
    // ..
  }
</code>
</pre>

On the other hand, manually referencing the global variable with a window reference is something some developers prefer to avoid.

Imagine a utility function that we want others to copy-and-paste into their program or modules, in which we want to check to see if the including program has defined a certain variable or not:

<pre>
<code>
  function doSomethingCool() {
    var helper = 
        (typeof FeatureXYZ !== "undefined") ?
        FeatureXYZ : function() {/*.. default feature ..*/}
    
    var val = helper();
    // ..
  }
</code>
</pre>

**doSomethingCool()** tests for a variable called **FeatureXYZ**, and if found, uses it, but if not, uses its own. Now, if someone includes this utility into their module/program, it safely checks if they've defined **FeatureXYZ** or not:

<pre>
<code>
  // an IIFE
  (function(){
    function FeatureXYZ() { /*.. my XYZ feature ..*/ }

    // include `doSomethingCool(..)`
    function doSomethingCool() {
      var helper = 
          (typeof FeatureXYZ !== "undefined") ?
          FeatureXYZ:
          function() { /*.. default feature ..*/ };

      var val = helper();
      // ..
    }

    doSomethingCool();
  })();
</code>
</pre>

Here, **FeatureXYZ** is not at all a global variable, but we're still using safety guard of **typeof** to make it safe check for. And importantly, there is no object we can use to make the check, so typeof is quite helpful.

---
layout: blogdetail
author: Milan Kaucha
title: Values
categories: Types and Grammer
excerpt_separator: <!--more-->
---

**arrays**, **strings**, and **numbers** are the most basic building blocks of any program, but Javascript has some unique characterstics with these types.

#### 1. Arrays

JavaScript **arrays** are just containers for any type of value, from **string** to **number** to **object** to even another **array** (which is how we get multidimensional arrays):

<pre>
<code>
  var a = [1, "2", [3]];

  a.length;       // 3
  a[0] === 1      // true
  a[2][0] === 3;  //true
</code>
</pre>

We don't need to presize our arrays, we can just declare them and add values as we see fit:

<pre>
<code>
  var a = [];

  a.length;   // 0
  
  a[0] = 1;
  a[1] = "2";
  a[2] = [3];
  
  a.length;   // 3
</code>
</pre>

> Note:
>
> Using **delete** on an array value will remove that slot from the array, but even if we remove the final element, it does not update the length property.

Be careful about creating **"sparse"** arrays(leaving or creating empty/missing slots):

<pre>
<code>
  var a = [];

  a[0] = 1;
  // no `a[1]` slot set here
  a[2] = [3];

  a[1];     // undefined

  a.length; // 3
</code>
</pre>

While the slot appears to have the **undefined** value in it, it will not behave the same as if the slot is explicitly set (a[1] = undefined).

**arrays** are numerically indexed, but the tricky thing is that they are also are objects that can have string keys/properties added to them (but which don't count toward the length of the array):

<pre>
<code>
  var a = [];

  a[0] = 1;
  a["foobar"] = 2;

  a.length;     // 1
  a["foobar"];  // 2
  a.foobar;     // 2
</code>
</pre>

If a string value intended as a key can be coerced to a standard base-10 number, then it is assumed that we wanted to use it as a number index rather than string key!

<pre>
<code>
  var a = [];

  a["13"] = 42;

  a.length;   // 14
</code>
</pre>

##### Array-Likes

There will be occasions where we need to convert an array-like value into a true array, usually so we can call array utilities (like indexOf(..), concat(..), forEach(..), etc.) against the collection of values. For example, various DOM query operations return lists of DOM elements that are not true arrays but are array-like enough for our conversion purposes.

One very common way to make a conversion.

<pre>
<code>
  function foo() {
    var arr = Array.from(arguments);
    arr.push("bam")
    console.log(arr);
  }

  foo("bar", "baz"); // ["bar", "baz", "bam"]
</code>
</pre>

#### Strings

JavaScript strings are really not the same as arrays of characters.

For example, let's consider these two values:

<pre>
<code>
  var a = "foo";
  var b = ["f", "o", "o"];
  
  a.length;               // 3 
  b.length;               // 3

  a.indexOf("o")          // 1
  b.indexOf("o")          // 1

  var c = a.concat("bar") // "foobar"
  var d = b.concat(["b", "a", "r"]) // ["f", "o", "o", "b", "a", "r"]

  a === c;    // false
  b === d;    // false
</code>
</pre>

Strings are array likes, as above. For instance, both of them have a length property, an indexOf(..) method, and a concat(..) method:

So, are they basically just "arrays of characters?" No.

<pre>
<code>
  a[1] = "O";
  b[1] = "O";

  a; // "foo"
  b; // ["f", "O", "o"]
</code>
</pre>

JavaScript **strings** are immutable, while arrays are quite mutable. The correct approach instead of a[1] has been a.charAt(1).

**String** methods that alter its content can modify in-place, but rather must create and return new strings. By contrast, many of array methods that change array contents actually do modify in place:

<pre>
<code>
  c = a.toUpperCase();
  a === c;    // false
  a;          // "foo"
  c;          // "FOO"

  b.push("!")
  b;          // ["f","O","o","!"]
</code>
</pre>

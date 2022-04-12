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

Many of the array methods that could be helpful when dealing with **strings** are not actually available for them, but can "borrow" nonmutation array methods against our string:

<pre>
<code>
  a.join;   // undefined
  a.map;    // undefined

  var c = Array.prototype.join.call(a, "-");
  var d = Array.prototype.map.call(a, function(v){
    return v.toUpperCase() + ".";
  }).join("");

  c;    // "f-o-o"
  d;    // "F.O.O."
</code>
</pre>

Let's take another example: reversing a **string**. **arrays** have a **reverse()** in-place mutator method, but strings do not:

<pre>
<code>
  a.reverse;      // undefined

  b.reverse();    // ["!", "o", "O", "f"]
  b;              // ["!", "o", "O", "f"]

  // Unfortunately, this "borrowing" doesn't work with array mutators,
  // strings are immutable and thus can't be modified in place

  Array.prototype.reverse.call(a);
  // still returns a String object wrapper 
  // for "foo" :(
</code>
</pre>

Another workaround is to convert the string into an array, perform the desired operation, then convert it back to string:

<pre>
<code>
  var c = a
    // split `a` into an array of characters
    .split("")
    // reverse the array of characters
    .reverse()
    // join the array of characters back to a string
    .join("");
    
    c; // "oof"
</code>
</pre>

> Note:
>
> This approach doesn't work for strings with complex (unicode) characters in them (astral, symbols, multibyte characters, etc).

It's better to just actually store them as arrays rather than as strings, if you are commonly doing tasks on your strings. We can always call join("") on the array of characters whenever we actually need the string representation.

#### Numbers

JavaScript has just one numeric type: **number**. This type includes both **"integer"** vlaues and **fractional decimal numbers**.

In JS, an "integer" is just a value that has no fractional decimal value. That is, 42.0 is as much an "integer" as 42.

Like most modern languages, including practically all scripting languages, the implementation of JavaScript’s numbers is based on the "IEEE 754" standard, often called "floating-point." JavaScript specifically uses the "double precision" format (aka "64-bit binary") of the
standard.

#### Numeric Syntax

Number literals are expressed in JavaScript generally as base-10 decimal literals.

<pre>
<code>
  var a = 42;
  var b = 42.3;

  // The leading portion of a decimal value, if 0, is optional:

  var a = 0.42;
  var b = .42;

  // Similary, the trailing portion (the fractional) of a decimal value after the ., if 0, is optional:

  var a = 42.0;
  var b = 42.;

  // By default, most numbers will be outputted as base-10 decimals, with trailing fractional 0s removed. So:
  var a = 42.300;
  var b = 42.0;

  a;    // 42.3
  b;    // 42
</code>
</pre>

Very large or very small numbers will by default be outputted in exponent form, the same as the output of the **toExponential()** method, like:

<pre>
<code>
  var a = 5E10;
  a;                    // 50000000000
  a.toExponential();    // "5e+10"

  var b = a * a;
  b;                    // 2.5e+21

  var c = 1 / a;
  c;                    // 2e-11

</code>
</pre>

Because number values can be boxed with the **Number** object wrapper, number values can access methods are built into the **Number.prototype**. The **toFixed(..)** method allows you to specify how many fractional decimals places we'd like to be represented with:

<pre>
<code>
  var a = 42.59;

  a.toFixed(0);   // "43"
  a.toFixed(1);   // "42.6"
  a.toFixed(2);   // "42.59"
  a.toFixed(3);   // "42.590"
  a.toFixed(4);   // "42.5900"
</code>
</pre>

The output is actually a string representation of the number, and that the value is 0-padded on the righthand side if we ask for more decimals than the value holds.

**toPrecision(..)** is similar, but specifies how many **significant digits** should be used to represent the value:

<pre>
<code>
  var a = 42.59;

  a.toPrecision(1); //  "4e+1"
  a.toPrecision(2); //  "43"
  a.toPrecision(3); //  "42.6"
  a.toPrecision(4); //  "42.59"
  a.toPrecision(5); //  "42.5900"
</code>
</pre>

We don't have to use a variable with the value in it to access these methods; we can access these methods directly on **number** literals.

Since **.** is a valid numeric character, it will first be interpreted as part of the number literal, instead of being interpreted as a property accessor:

<pre>
<code>
  // invalid syntax:
  42.toFixed(3);    // SyntaxError

  // these are all valid:
  (42).toFixed(3);  // "42.000"
  0.42.toFixed(3);  // "0.420"
  42..toFixed(3);   // "42.000"
</code>
</pre>

**42.toFixed(3)** is invalid syntax, because **.** is swallowed up as part of the **42.** literal and so then there's no **.** property operator present to make the **.toFixed** access.

**42..toFixed(3)** works because the first **.** is part of the number and the second **.** is the property operator.

**number** literals can also be expressed in other bases, like binary, octal, and hexadecimal.

These formats work in current versions of JavaScript:

<pre>
<code>
  0xf3; // hexadecimal for: 243
  0xf3; // ditto

  0363; // octal for: 243
</code>
</pre>

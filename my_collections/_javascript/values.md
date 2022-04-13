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

#### 2. Strings

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

#### 3. Numbers

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

**numbers** can be specified in exponent form, which is common when representing larger numbers, such as:

<pre>
<code>
  var onethousand = 1E3                     // means 1 * 10^3
  var onemilliononehundredthousand = 1.1E6; // means 1.1 * 10^6
</code>
</pre>

**number** literals can also be expressed in other bases, like binary, octal, and hexadecimal.

These formats work in current versions of JavaScript:

<pre>
<code>
  0xf3; // hexadecimal for: 243
  0xf3; // ditto

  0363; // octal for: 243
</code>
</pre>

> Note:
>
> Starting with ES6 + strict mode, the 0363 form of octal literals is no longer allowed. The 0363 form is still allowed in not-strict mode, but should stop using it to be future-friendly.

The following new forms are also valid:

<pre>
<code>
  0o363;      // octal for: 243
  0O363;      // ditto

  0b11110011;  // binary for: 243
  0B11110011;  // ditto
</code>
</pre>

Always use the lower case predicates 0x, 0b, and 0o.

#### Small Decimal Values

The infamous side effect of using binary floating-point nubers (which is true of all languages that use IEEE 754 not just JavaScript) is:

<pre>
<code>
  0.1 + 0.2 === 0.3;  // false
</code>
</pre>

Mathematically, we know that statement should be true. Why is it false?

The representation for 0.1 and 0.2 in binary floating point are not exact, so when they are added, the result is not exactly 0.3, It's really close, 0.30000000000000004.

The question is, if some numbers can't be trusted to be exact, does that mean we can't use numbers at all? Of course not.

There are some applications where we need to be more careful, especially when dealing with fractional decimal values. There are also plenty of applications that only deal with whole numbers ("integers"), and moreover, only deal with numbers in the millions or trillions at maximum.

What if we did need to compare two numbers, like 0.1 + 0.2 to 0.3, knowing that the simple equality test fails?

The most commonly accepted practice is to use a tiny "rounding error" value as the tolerance for comparision. This tiny value is often called "machine epsilon".

We can use this **Number.EPSILON** to compare two numbers for "equality"(within the rounding error tolerance).

<pre>
<code>
  function numbersCloseEnoughToEqual(n1, n2) {
    return Math.abs(n1 - n2) < Number.EPSILON;
  }

  var a = 0.1 + 0.2;
  var b = 0.3;

  numbersCloseEnoughToEqual(a, b);        // true
  numbersCloseEnoughToEqual(0.0000001, 0.0000002); // false
</code>
</pre>

The maximum floating-point value that can be represented is roughly **1.798e+308**, predefined for you as **Number.MAX_VALUE**. On small end, **Number.MIN_VALUE** is roughly **5e-324**, which isn't negative but is really cloe to zero!

#### Testing for Integers

To test if a value is an integer, we can use \*\*Number.isInteger(..):

<pre>
<code>
  Number.isInteger(42);     // true
  Number.isInteger(42.000); // true
  Number.isInteger(42.3);   // false

  // To polyfill <strong>Number.isInteger(..)</strong> for pre-ES6:

  if (!Number.isInteger) {
    Number.isInteger = function(num) {
      return typeof num == "number" && num % 1 == 0;
    };
  }

  // To test if a value is a safe integer, use the ES6-specified Number.isSafeInteger(..):

  Number.isSafeInteger( Number.MAX_SAFE_INTEGER );  // true
  Number.isSafeInteger( Math.pow( 2, 53 ) );  // false
  Number.isSafeInteger( Math.pow( 2, 53 ) - 1 );  // ture

  To polyfill Number.isSafeInteger(..) in pre-ES6 browsers:

  if (!Number.isSafeInteger) {
    Number.isSafeInteger = function(num) {
      return Number.isInteger( num ) &&
        Math.abs( num ) <= Number.MAX_SAFE_INTEGER;
    };
  }
</code>
</pre>

#### 32-Bit(Siged) Integers

While integers can range up to roughly 9 quadrillion safely (53 bits), there are some numeric operations (like the bitwise operators) that are only defined for 32-bit numbers, so the “safe range” for numbers used in that way must be much smaller.

The range then is Math.pow(-2, 31) (-2147483648, about –2.1 billion) up to Math.pow(2, 31)-1 (2147483647, about +2.1 billion).

To force a number value in a to a 32-bit signed integer value, use a \| 0. This works because the \| bitwise operator only works for 32-bit integer values.

#### Special Values

There are several special values spread across the various types that need to be aware of, and use properly.

#### The Nonvalue Values

For the undefined type, there is one and only one value: **undefined**. For the null type, there is one and only one value: **null**.

Both **undefined** and **null** are often taken to be interchageable as either **"empty"** values or **"non"** values. We can distinguish between them as:

- null is an empty value.
- undefined is a missing value.

Or:

- undefined hasn't had a value yet.
- null had a value and doesn't anymore.

Regardless of how we choose to "define" and use these two values, **null** is a special keyword, not an identifier, and thus we cannot treat it as a variable to assign to. However, **undefined** is an identifier. Uh oh.

In both **non-strict** mode and **strict** mode, however, we can create a local variable of the name **undefined** which is terrible idea!

<pre>
<code>
  function foo() {
    "use strict";
    var undefined = 2;
    console.log(undefined);   // 2
  }
</code>
</pre>

**Please don't override undefined. Ever**.

#### void operator

While **undefined** is a build-in identifier that holds the built-in undefined value, any other way to get this value is the **void** operator.

The expression **void** \_\_"voids" out any value, so that the result of the expressioh is always the **undefined** value. It doesn't modify the existing value; it just ensures that no values comes back from the operator expression:

<pre>
<code>
  var a = 42;

  console.log(void a, a);   // undefined 42
</code>
</pre>

By convention (mostly from C-language programming), to represent the **undefined** value standalone by using void, we'd use **void** 0. There's no practical differnce between **void 0, void 1, and undefined**.

If we need to ensure that an expression has no result value (even if has side effects).

<pre>
<code>
  function doSomething() {
    // note: 'App.ready' is provided by our application
    if(!APP.ready) {
      // try again later
      return void setTimeout(doSomething, 100);
    }
    var result;

    // do some other stuff
    return result;
  }
  // were we able to do it right away?
  if (doSomething()) {
    // handle next tasks right away
  }

  // But preferable to do these actions which works the same but doen't use the void operator:
  if(!APP.ready) {
    // try again later
    setTimeout(doSomething, 100);
    return;
  }
</code>
</pre>

In general, if there’s ever a place where a value exists (from some expression) and you’d find it useful for the value to be undefined instead, use the void operator.

#### Special Numbers

The number type includes several special values.

##### The not number, number

**NaN** literally stands for "not a number", though this description is very poor and misleading. It is more accurate to think **NaN** as being an "invalid number," "failed number," or even "bad number," than to think of it as "not a number."

<pre>
<code>
  var a = 2 / "foo";    // Nan

  typeof a === "number";  // true

  // In other words, "the type of not-a-number is number!"
</code>
</pre>

**NaN** is a kind of "sentinel vaue" that represents a special kind of error condition within the **number** set. The error condition is, in essence, **"I tried to perform a mathematic operation but failed. so here's the failed number result instead."**

So, if we have a value in some variable and want to test to see if it's this special failed-number **NaN**, we cannot directly compare to **NaN** itself, as we can with any other value, like **null** or **undefined**. Nope

<pre>
<code>
  var a = 2 / "foo";

  a == NaN;   // false
  a === NaN;  // false
</code>
</pre>

**NaN** is a very special value in that it's never equal to another **NaN** value. It's the only value, in fact, that is not reflexive.

<pre>
<code>
  var a = 2 / "foo";

  isNaN(a); //true
</code>
</pre>

This **isNaN(..)** utitlity has a fatal flaw. Its job is bascially, "test if the thing passed in either not a number or is a number". But that's not quite accurate:

<pre>
<code>
  var a = 2 / "foo";
  var b = "foo";

  a;  // NaN
  b; "foo"

  window.isNaN(a);  // true
  window.isNaN(b);  // true--ouch!
</code>
</pre>

Clearly, **"foo"** is literally not a number, but its definitely not the **NaN** value either! This **bug** has been in JS since the very begining.

As of ES6, finally a replacement utility has been provided: **Number.isNaN(..)**. A simple polyfill for it so that we can safely check NaN value now is:

<pre>
<code>
  if(!Number.isNaN) {
    Number.isNaN = function(n) {
      return (
        typeof n === "number" &&
        window.isNaN(n)
      );
    };
  }
  var a = 2 / "foo";
  var b = "foo";

  Number.isNaN(a);  // true
  Number.isNaN(b);  // false--phew
</code>
</pre>

If you’re currently using just **isNaN(..)** in a program, the sad reality is your program has a **bug**.

##### Infinities

In traditional compiled languages like C are likely to see copiler error or runtime exception, like "divide by zero", for an operation like:

<pre>
<code>
  var a = 1 / 0;
</code>
</pre>

However, in JS, this operation is well-defined and results in the value **Infinity**.

<pre>
<code>
  var a = 1 / 0;  // Infinity
  var b = -1 / 0;   // -Infinity
</code>
</pre>

We can go from finite to infinite but not from infinite back to finite.

Both mathematically and in JavaScript, **Infinity / Infinity** is not a defined operation. In JS, this result in **NaN**.

But, if any positive finite number divided by Infinity? Its result in 0.

##### Zeros

JavaScript has both a normal zero 0 and a negative zero -0. Negative zero also results form certain mathematic operations. For example:

<pre>
<code>
  var a = 0 / -3;   // -0
  var b =  0 * -3;  // -0

  // Addition and subtraction cannot result in a negative zero.
</code>
</pre>

If we try to stringify a negative zero value, it will be reported as "0", according to the spec:

<pre>
<code>
  var a = 0 / -3;

  // (some browser) consoles at least get it right
  a;    // -0

  // but 
  a.toString();   // "0"
  a + "";         // "0"
  String(a);      // "0"

  // even JSON gets in on the description
  JSON.stringify(a);    // "0"

  // Interestingly, the reverse operations (going from string to number)

  +"-0";  // -0
  Number("-0")  // -0
  JSON.parse("-0"); // -0
</code>
</pre>

In addition to stringification of negative zero being deceptive to hide its true value, the comparision operators are also configured to lie:

<pre>
<code>
  var a = 0;
  var b = 0 / -3;

  a == b;   // true
  -0 == 0;  // true

  a === b;   // true
  -0 === 0;   // true

  0 > -0;    // false
  a > b;     // false
</code>
</pre>

Clearly, if we want to distinguish a -0 from a 0 in our code. We have to be a bit more clever:

<pre>
<code>
  function isNegZero(n) {
    n = Number(n);
    return (n === 0) && (1 / n === -Infinity);
  }

  isNegZero(-0);      // true
  isNegZero(0 / -3);  // true
  isNegZero(0);       // false
</code>
</pre>

Preserving the sign of the zero prevents potentially unwanted information loss.

#### 4. Special Equality

As of ES6, there's a new utility that can be used to test two values for absolute equality, without any of these exceptions. It's called **Object.is(..)**:

<pre>
<code>
  var a = 2 / "foo";
  var b = -3 * 0;

  Object.is(a, NaN);    // true
  Object.is(b, -0);     // true

  Object.is(b, 0);      // false
</code>
</pre>

**Object.is(..)** probably shouldn't be used in cases where **==** or **===** are known to be safe, as the operators are likely much more efficient and certainly are more common. **Object.is(..)** is mostly for these special cases of equality.

#### 5. Value Versus Reference

In many other languages, value can either be assigned/passed by **value-copy** or by **reference-copy** depending on the syntax we use.

For example, in C++ if we want to pass a number variable into a function and have that variable's value updated, we can declare the function parameter like **int& myNum**, and when we pass in a variable like **x, myNum** will be a reference to **x**; references are like a special form of pointers, where we obtain a pointer to another variable. If we don't declare a reference parameter, the value passed in will always be copied, even if it's a complex object.

In JavaScript, there are no **pointers**, and references work a bit differently. We cannot have a reference from one JS variable to another variable.

A reference in JS points at a shared value, so if we have 10 different references, they are all always distinct references to a single shared value; **none of them are references/pointers to each other**.

Moreover, in JavaScript, there are no **syntatic** hints that control value versus reference assignment/passing.<br>
Instead, the **type** of the value **solely** controls whether that value will be assigned by **value-copy** or by **reference-copy**.

Let's illustrate:

<pre>
<code>
  var a = 2;
  var b = a;    // 'b' is always be a copy of the value in 'a'
  a;    // 2
  b;    // 3

  var c = [1, 2, 3];
  var d = c;    // 'd' is a reference to the shared '[1, 2, 3]' value d.push(4);
  c;    // [1, 2, 3, 4]
  d;    // [1, 2, 3, 4]
</code>
</pre>

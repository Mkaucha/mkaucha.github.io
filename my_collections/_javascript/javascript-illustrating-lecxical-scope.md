---
layout: javascript
author: Milan Kaucha
title: Illustrating Lexical Scope
categories: Scope and Closure
excerpt_separator: <!--more-->
---

Scope is determined during code compilation, a model called “lexical scope.” The term "lexical" refers to the first stage of compilation (lexing/parsing).

<!--more-->

This blog will illustrate scope with several metaphors. The goal is to think how your program is handled by the JS engine.

#### 1. Marbles, and Buckets, and Bubbles..

Imagine you come across a pile of marbles, and notice that all the marbles are colored red, blue, or green. Let’s sort all the marbles, dropping the red ones into a red bucket, green into a
green bucket, and blue into a blue bucket. After sorting, when you later need a green marble, you already know the green bucket is where to go to get it.

In this metaphor, the marbles are the variables in our program. The buckets are scopes ( functions and blocks ), which we just conceptually assign individual colors for our discussion purposes. The color of each marble is thus determined by which color scope we find the marble originally created in.

Let’s annotate the program:

<pre>
<code>
  // outer/global scope: RED

  var students = [
    { id: 14, name: "Kyle" },
    { id: 73, name: "Suzy" },
    { id: 112, name: "Frank" },
    { id: 6, name: "Sarah" }
  ];

  function getStudentName(studentID) {
    // function scope: BLUE

    for (let student of students) {
        // loop scope: GREEN

      if (student.id == studentID) {
        return student.name;
      }
    }
  }

  var nextStudent = getStudentName(73);
  console.log(nextStudent);  // Suzy
</code>
</pre>

We've designated three scope colors with code comments: **RED ( outermost global scope ), BLUE ( scope of function getStudentName(..) ), and GREEN ( scope of/inside the for loop ).**

- **RED** ecompasses the global scope, which holds three identifiers/variables:students, getStudentName and nextStudent
- **BLUE** ecompasses the scope of the function getStudentName(..), which holds only one identifier/variable: the parameter studentID
- **GREEN** encopasses the scope of the for-loop, which holds just one identifier/variable:
  student.

> Note
>
> Technically, the parameter studentID is not exactly in the BLUE scope. For now, it’s close enough to label studentID a BLUE variable/identifier.

As the JS engine process a program (during compilation), and finds a declaration of variable, it essentially asks, **"Which scope (bubble or bucket) am I currently in?"** The variable is designed as that same color, meaning it belongs to that bucket/bubble/scope. The GREEN scope is wholly nested inside of the BLUE scope and similarly the BLUE scope is wholly nested inside the RED scope. Scopes can nest inside each other, to any depth of nesting as your program needs.

Refrences to variables/identifiers are allowed if there's a matching declaration either in the current scope, or any scope above/outside the current scope, but not with declarations from lower/nested scopes.

An expression in RED scope only has access to RED variables/identifiers, not BLUE or GREEN. An expression in BLUE scope can reference either BLUE or RED variables/identifiers, not GREEN. An expression in GREEN scope has access to RED, BLUE and GREEN variables/identifiers.

Since the students variable reference in the for-loop statement is not a declaration. So, we ask the current BLUE scope if it has a variable matching that name. Since it doesn't, the lookup continues with next outer scope: RED. The RED scope has a variable of name students, so the loop statement's students variable reference is determined to be a RED variable/identifier.

> Note
>
> The JS engine doesn't generally determine these variables/identifiers scope during runtime. During compilation, most or all variable references will match already known scope, so their scope is already determined, and stored with each variable/identifier refrence to avoid unnecessary lookups as the program run.

#### 2. A Conversation Among Friends {#section-2}

Let's meet the members of JS engine that will have conversations as they process our program:

- **Engine:** Responsible for start-to-finish compilation and execution of our JS program.
- **Compiler:** One of Engine's friends who handles all the dirty work of parsing and code generation.
- **Scope manager:** Another friend of Engine's who collects and maintains a lookup list of all declared variables/identifiers, and enforces a set of rules as how these are accessible to currently executing code.

To explore these conversations, lets recall our running program example.

<pre>
<code>
  var students = [
    { id: 14, name: "Kyle" },
    { id: 73, name: "Suzy" },
    { id: 112, name: "Frank" },
    { id: 6, name: "Sarah" }
  ];

  function getStudentName(studentID) {
    for (let student of students) {
      if (student.id == studentID) {
        return student.name;
      }
    }
  }

  var nextStudent = getStudentName(73);
  console.log(nextStudent);  // Suzy
</code>
</pre>

Let's examine how JS is going to process this program. Our focus here will be on the var students = [ .. ] declaration and initialization assignment part. Here's the steps Compiler will follow to handle that statement:

- Encountering var students, Compiler will ask Scope Manager to see if a variable named students already exists for that particular scope. If so, Compiler would ignore this declaration and move on. Otherwise, Compiler will produce code that (at execution time) asks Scope Manager to create a new variable called students in that scope.

- Compiler than produces code for Engine to later execute, to handle the students = [] assignment. The code Engine runs will first ask Scope manager if there is a variable called students accessible in the current scope. If not, Engine keeps looking elsewhere. Once engine finds a variable, it assigns the reference of the [ .. ] array to it.

To review and summarize how a statement like var students = [ .. ] is processed, in two distinct steps:

1. Compiler sets up the declaration of the scope variable ( since it wasn't previously declared in the current scope. )

2. While engine is executing, to process the assignment part of statement, Engine asks Scope manager to look up the variable, initializes it to undefined so it's ready to use, and then assigns the array value to it.

#### 3. Nested Scope

When it comes to execute the getStudentName() function, Engine asks for a Scope Manager instance for the function's scope, and it will look then proceed to look up the parameter( studentID) to assign the 73 argument value to and so on.

The function scope for getStudentName(..) is nested inside the global scope. The block scope for the for-loop is similarly nested inside the function scope. Scopes can be lexically nested to any arbitary depth as the program defines.

Each scope gets its own Scope Manager instance each time that scope is executed(one or more times). Each scope automatically has all its identifiers registered at the start of the scope being executed (this is called "variable hoisting").

At the begining of a scope, if any identifier came from a function declaration, the variable is automatically initialized to its associated function refrence. And if any identifier came from a var declaration ( as opposed to let/const ), that variable is automatically initialized to undefined so that it can be used; otherwise, the variable remains unintialized and cannot used until its full declaration and initialization are executed.

In the for (let student of students) { statement, students is a source refrence that must be looked up. But how will that lookup be handled, since the scope of the function will not find such an identifier?

One of the key aspects of lexical scope is that any time an identifier reference cannot be found in the current scope, the next outer scope in the nesting is consulted; that process is repeated until an answer is found or there are no more scopes to consult.

##### Lookup Failure

When engine exhausts all lexically available scopes (moving outward) and still cannot resolve the lookup of an identifier, an error condition then exists. However, depending on the mode of the program ( strict-mode or not ) and the role of the variable ( i.e. target vs source ), this error condition will be handled differently.

##### Undefined Mess

If a variable is source, an unresolved identifier lookup is considered an undeclared (unknown, missing) variable, which always results in a ReferenceError being thrown. Also, it the variable is a target, and the code at that moment is running in strict-mode, the variable is considered undeclared and similarly throws a ReferenceError.

To perpetuate the confusion, JS typeof operator returns string "undefined" for variable refrences in either state.

<pre>
<code>
  var studentName;
  typeof studentName;   // "undefined"

  typeof doesntExist;   // "undefined"
</code>
</pre>

These two variable references are in very different conditions, but JS sure does muddy the waters. Unfortunately, JS developers just have to pay close attention to not mix up which kind of “undefined” they’re dealing with!

##### Global... What!?

If the variable is a target and strict-mode is not in effect, a confusing and suprising legacy behavior kicks in. The global scope's Scope Manager will just create an accidental global variable to fulfill that target assignment!

<pre>
<code>
  function getStudentName() {
    // assignment to an undeclared variable 
    nextStudent = "Suzy"
  }

  getStudentName();

  console.log(nextStudent);
  // "Suzzy" -- oops, an accidental-global variable!
</code>
</pre>

This sort of accident (almost certain to lead to bugs eventually) is a great example of the beneficial protections offered by strict-mode, and why it’s such a bad idea not to be
using strict-mode. In strict-mode, the Global Scope Manager would instead have responded: _ReferenceError_

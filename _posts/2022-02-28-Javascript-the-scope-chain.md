---
layout: post
author: Milan Kaucha
title: The Scope Chain
categories: Javascript
tags: Scope and Closure
excerpt_separator: <!--more-->
---

The connection between scopes that are nested within other scopes is called the scope chain, which determines the path along which variables can be accessed. The chain is directed, meaning the lookup moves upward/outward only.

<!--more-->

#### 1. "Lookup" Is (Mostly) Conceptual

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

The lookup process thus determined that students is a RED variable/identifier, because we had not yet found a matching variable name we traversed the scope chain, until we arrived at final RED global scope.

Similarly, studentID in the if-statement is determined to be a BLUE variable/identifier.

This suggestion of a runtime lookup process works well for conceptual understanding, but it's not actually how things usually work in practice.

What scope a variable originates from is usually determined during the initial compilation processing. Because lexical scope is pretty much finalized at that point, a scope variable will not changed based on anything that can happen later during runtime.

Since the scope variable is known from compilation, and it's immutable, this information would likely be stored with each variable's entity in the AST; that information is then used explicitly by the executable instructions that constitute the program's runtime.

In other word, the engine doesnot need to lookup through a bunch of scopes to figure out which scope a variable comes from. That information is already known! Avoiding the need for a runtime lookup is a key optimization benefit of lexical scope. The runtime operates more performantly without spending time on all these lookups.

**So in what case would it ever not be known during compilation?**

Consider a reference to a variable that isn’t declared in any lexically available scopes in the current file. If no declaration is found, that’s not necessarily an error. Another file (program) in the runtime may indeed declare that variable in the shared global scope.

So the ultimate determination of whether the variable was ever appropriately declared in some accessible scope may need to be deferred to the runtime.

Any reference to a variable that's initially undeclared is left as an undefined variable during that file's compilation; this variable cannot be determined until other relevant files have been compiled and the application runtime commences. That deferred lookup will eventually resolve the variable to whichever scope the variable is found in (likely the global scope).

#### 2. Shadowing

If variables/identifiers have unique names, it wouldn't matter if all of them were just stored in one scope.

Where having different lexical scope starts to matter more is when you have two or more variables, each in differnt scopes, with the same lexical names. A single scope cannot have two or more variables with the same name; such multiple refrences would be assumed as just one variable.

So if you need to maintain two or more variables of the same name, you must use separate scopes.

<pre>
<code>
  var studentName = "Suzy";

  function printStudent(studentName) {
    studentName = studentName.toUppercase();
    console.log(studentName);
  }

  printStudent("Frank");
  // FRANK

  printStudent(studentName);
  // SUZY

  console.log(studentName)
  // Suzy
</code>
</pre>

The studentName variable on line 1 (the var studentName = .. statement) creates a global scope variable. The same named variable is declared as a function scope variable on line 3, the parameter in the printStudent(..) function definition.

What scope variable will studentName be in the studentName = studentName.toUpperCase() assignment statement and the console.log(studentName) statement? All three studentName references will be function scope variable.

With the conceptual notion of the "lookup", we asserted that it starts with the current scope and works its way outward/upward, stopping as soon as a matching variable is found. The function scope studentName is found right away. The global scope studentName is never even considered.

This is a key aspect of lexical scope behavior, called shadowing. The function scope studentName variable (parameter) shadows the global scope studentName. So, the parameter is shadowing the global variable.

That's why the re-assignemnt of studentName affects the inner (parameter) variable: the function scope studentName not the global scope studentName.

When we choose to shadow a variable from an outer scope, any studentName identifier reference will correspond to that parameter variable, never the global studentName variable. It's lexically impossible to reference the global studentName anywhere inside of the printStudent(..) function (or from any nested scopes).

##### Global Unshadowing Trick

It is possible to access a global variable from a scope where that variable has been shdowed, but not through a typical lexical identifier refernce.

**Please beware: It is not very good practice, as it's limited in utility, confusing for readers of your code, and likely to invite bugs to your program.**

<pre>
<code>
   var studentName = "Suzy"

   function printStudent(studentName) {
     console.log(studentName);
     console.log(window.studentName);
   }

   printStudent("Frank");
   // "Frank"
   // "Suzy"
</code>
</pre>

Notice the window.studentName refrence. This expression is accessing the global variable studentName as a property on window. That's the only way to access a shadowed variable from inside a scope where the shadowing variable is present.

This little "trick" only works for accessing a global scope variable (not a shadowed variable from a nested scope), and even then, only one that was declared with var or function.

<pre>
<code>
  var one = 1;
  let notOne = 2;
  const notTwo = 3;
  class notThree {}

  console.log(window.one);  // 1
  console.log(window.notOne);  // undefined
  console.log(window.notTwo);  // undefined
  console.log(window.notThree);  // undefined
</code>
</pre>

Variables (no matter how they’re declared!) that exist in any other scope than the global scope are completely inaccessible from a scope where they’ve been shadowed:

<pre>
<code>
  var special = 42;

  function lookingFor(special) {
    // The identifier 'special' (parameter) in this 
    // scope is shadowed inside keeplooking(), and
    // is thus inaccessible from that scope.

    function keepLooking() {
      var special = 3.141592;
      console.log(special);
      console.log(window.special);
    }

    keepLooking();
  }

  lookingFor(12358132134)
  // 3.141592
  // 42
</code>
</pre>

The global scope special is shadowed by lookingFor function scope special (parameter) and it is itself shadowed by keepLooking function scope special. We can still access global scope special using the indirect refrence window.special. But there's no way for keepLooking() to access the lookingFor function scope that holds the number 12358132134.

##### Copying Is Not Accessing

<pre>
<code>
  var special = 42;

  function lookingFor(special) {
    var another = {
      special : special
    };

    function keepLooking() {
      var special = 3.141592;
      console.log(special);
      console.log(another.special);  // Ooo, tricky!
      console.log(window.special);
    }

    keepLooking();
  }

  lookingFor(12358132134)
  // 3.141592
  // 12358132134
  // 42
</code>
</pre>

We claim that the special parameter is "completely inaccessible" from inside keepLooking(). This claim is still correct.

**special: special** is copying the value of the special parameter variable into another container (a property of the same name). Of course, if you put a value in another container, shadowing no longer applies. Buth that doesn't mean we're accessing the parameter special; it means we're accessing the copy of the value it had at that moment, by way of another container(object property). We cannot reassign lookingFor() special parameter to a different value from inside keepLooking().

What if I'd used objects or arrays as the values inside of the numbers(12358132134, etc.)? Would i having references to objects instead of copies of primitive values "fix" the inaccessibility?

No. Mutating the contents of the object value via a reference copy is not hte same thing as lexically accessing the variable itself. We still can't reassign the lookingFor() special parameter.

##### Illegal Shadowing

Not all combinations of declaration shadowing are allowed. let can shadow var, but var cannot shadow let:

<pre>
<code>
  function something() {
    var special = "JavaScript";

    {
      let special = 42;  // totally fine shadowing

      // ..
    }
  }

  function another() {
    // .. 
    
    {
      let special = "JavaScript";

      {
        var special = "Javascript";
        // ^^^ Syntax Error

        // ..
      }
    }
  }
</code>
</pre>

The syntax error description in this case indicates that special has already been defined, but that error is a little misleading, no such error happens in something(), as shadowing is generally allowed just fine.

The real reason it's raised as a SyntaxError is because the var is basically trying to "cross the boundary" of(or hop over) the let declaration of the same name, which is not allowed.

<pre>
<code>
  function another() {
    // .. 

    {
      let special = "JavaScript";

      ajax("https://some.url", function callback(){
        // totally fine shadowing
        var special = "JavaScript";

        // ..
      });
    }
  }
</code>
</pre>

That boundary-crossing prohibition effectively stops at each function boundary, so this variant raises no exception.

**Summary: let (in an inner scope) can always shadow an outer scope's var. var (in an inner scope) can only shadow an outer scope's let if there is a function boudary in between.**

#### 3. Function Name Scope

<pre>
<code>
  function askQuestion() {
    // ..
  };
</code>
</pre>

Such a function declaration will create an identifier in the enclosing scope (in this case, the global scope) named askQuestion.

**What about this program?**

<pre>
<code>
  var askQuestion = function() {
    // ..
  };
</code>
</pre>

The same is true for the variable askQuestion being created in an enclosing scope. But since it's a function expression - a function definition used as value instead of a standalone declaration - the function itself will not "hoist".

A named function expression:

<pre>
<code>
  var askQuestion = function ofTheTeacher() {
     // ..
  };
</code>
</pre>

We know askQuestion ends up in the outer scope. **But what about the ofTeacher identifier?** For formal function declarations, the name identifier ends up in the outer/closing scope, But ofTheTeacher is declared as an identifier inside the function itself:

<pre>
<code>
  var askQuestion = function ofTheTeacher() {
    console.log(ofTheTeacher);
  };

  askQuestion();
  // function ofTheTeacher() ...

  console.log(ofTheTeacher);
  // ReferenceError: ofTheTeacher is not defined
</code>
</pre>

Not only is ofTheTeacher declared inside the function rather than outside, but it’s also defined as read-only:

<pre>
<code>
  var askQuestion = function ofTheTeacher() {
    "use strict";
    ofTheTeacher = 42;  // TypeError

    // ..
  };

  askQuestion();
  // TypeError
</code>
</pre>

**What about when a function expression has no name identifier?**

<pre>
<code>
  function askQuestion() {
    // ..
  };
</code>
</pre>

A function expression with a name identifier is reffered as a "named function expression," but one without a name identifier is reffered to as an "anonymous function expression." Anonymous function expressions clearly have no name identifier that effects either scope.

#### 4. Arrow Functions

ES6 added an additional function expression form to the language, called “arrow functions”:

<pre>
<code>
  var askQuestion = () => {
    // ..
  };
</code>
</pre>

The => arrow function doesn't require the word function to define it. Also, the ( .. ) around the parameter list is optional in some simple cases. Likewise, the { .. } around the function body is optional in some cases. And when the { .. } are ommitted, a return value is sent out without using a return keyword.

Arrow function are lexically anonymous, meaning they have no directly related identifier that references the function. The assignment to askQuestion creates an inferred name of "askQuestion", but that's not the same thing as being non-anonymous:

<pre>
<code>
  var askQuestion = () => {
    // ..
  };

  askQuestion.name;  // askQuestion
</code>
</pre>

Arrow functions for some different forms/conditions:

<pre>
<code>
  () => 42;

  id => id.toUpperCase();

  (id,name) => ({ id, name });

  (...args) => {
    return args[args.length - 1];
  };
</code>
</pre>

Other than being anonymous (and having no declarative form), => arrow functions have the same lexical scope rules as function functions do. An arrow function, with or without { .. } around its body, still creates a seperate, inner nested scope. Variable declarations inside this nested scope behave the same as in a function scope.

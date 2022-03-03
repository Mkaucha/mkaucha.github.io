---
layout: javascript
author: Milan Kaucha
title: What's the scope?
categories: Scope and Closure
excerpt_separator: <!--more-->
---

How does JS know which variables are accessible by any given statement, and how does it handle
two variables of the same name?
The answers to questions like these take the form of well-defined rules called scope.

 <!--more-->

##### About This Topic

My focus will be on the scope system and it's fucntion closures, as well as the power of the module design pattern.

_At first, It's important to know how JS engine process our program before it runs._

JS is typically classified as an interpreted scripting language, so its assumed that JS programs are processed in a single, top-down pass. But JS is in fact parsed/compiled in a seprate phase before execution begins. The code author's decisions on where to place variables, functions, and blocks with respect to each other are analyzed according to rules of scope, during initial parsing/compilation phase. The resulting scope structure is generally unaffected by runtime conditions.

JS function are themselves first-class values, they can be assigned and passed around like number or strings. But since these functions hold and access variables, they maintain their original scope no matter where in the program the function are eventually executed. This is called closure.

Modules are a code organization pattern characterized by public methods that have privileged access (via closure) to hidden variables and functions in the internal scope of the module.

#### 1. Compiled vs. Interpreted

Code compilation is a set of steps that process the text of your code and turn into a list of instructions the computer can understand. Typically, the whole source code is transformed at once, and those resulting instructions are saved as output (usually in a file) that can be later executed.

So how is code interpreted different from code being compiled?

Interpretation performs similar task to compilation, in that it transforms your program into machine-understandable instructions. But the processing model is different. Unlike a
program being compiled all at once, with interpretation the source code is transformed line by line; each line or statement is executed before immediately proceeding to processing the
next line of the source code.

Are these two processing models mutually exclusive? Generally, yes. However, Modern JS engines actually employ numerous variations of both compilation and interpretation in handling JS programs.

#### 2. Compiling Code ( Why does it even matter whether JS is compiled or not? )

Scope is primarily determined during compilation, so understanding how compilation and execution relate is key in mastering scope.

In classic compiler theory, a program is processed by a compiler in three basic stages:

- Tokenizing/Lexing:

  Breaking up a string of characters into meaningful chunks, called tokens.

  For instance:
  **Consider a program var a = 2; This program will be broken up into the following tokens: var, a, =, 2 and ; . Whitespace may or may not be persisted as a token, depending on whether it's meaningful or not.**

  ( The difference between tokenizing and lexing is subtle and academic, but it centers on whether or not these tokens are identified in a stateless or stateful way. Simply, if the tokenizer were to invoke stateful parsing rules to figure out whether **a** should be consider a distinct token or just another part of another token, that would be lexing )

- Parsing:

  Taking a stream ( array )of tokens and turning it into tree of nested elements, which collectively represent grammatical structure of the program. This is called an Abstract Syntax Tree (AST).

  For example:
  **The tree for var a = 2; might start with a top-level node called VariableDeclaration, with child node called Identifier ( whose value is a), and another child called AssignmentExpression which itself has a child AssignmentExpression which itself has a child Numeric Literals ( whose value is 2 ).**

- Code Generation:

  Taking AST and turning into executable code. This part varies greatly depending on the language. The JS engine takes the just described AST for var a = 2; and turns it into a set of machine instructions to actually create a variable called **a** ( including reserving memory, etc ), and then store a value into a.

The JS engine is vastly more complex than just these three stages. In the process of parsing and code generation, there are steps to optimize the performance of the execution. In fact, code can be recompiled and re-optimized during the progression of execution.

JS compilation doesn't happen in a build step ahead of time, as with other languages. It usually happens right before the code is executed. To ensure fastest performance under these contraints. JS engines use all kinds of tricks ( like JITs, which lazy compile and even hot recompile)

##### **Required: Two Phases**

Important observation we can make about processing of JS programs is that it occur in (at least) two phases: parsing/compilation first, then execution. While JS specification doesnot require "compilation" explicitly, it requires behavior that is essentially only practical with a compile-then-execution approach.

There are three program characterstics you can observe to prove this: **syntax errors, early errors, and hoisting.**

- **Syntax Errors from the start**

  Consider this program:
  <pre>
  <code>
    var greeting = Hello;
  
    console.log(greeting);
  
    greeting = ."Hi"
    // SyntaxError: unexpected token .
  </code>
  </pre>

  This program produces no output but instead throws a SyntaxError about the unexpected . token right before "Hi" string. Since the syntax error happens after the well-formed console.log(..) statement, if JS was executing top-down line by line, one would expect "Hello" message being printed before the syntax error being thrown. That doesn't happen.

  **In fact, the only way the JS engine could know about the syntax error on the third line, before executing the first and second line, is by the JS engine first parsing entire program before any of it is executed.**

- **Early Errors**

  <pre>
  <code>
    console.log("Howdy");
  
    saySomething("Hello", "Hi");
    // Uncaught SyntaxError: Duplicate parameter name not
    // allowed in this context
  
    function saySomething(greeting, greeting) {
        "use strict";
        console.log(greeting)
    }
  </code>
  </pre>

  The "Howdy" message is not printed, despite being well-formed statement.

  Instead, the Syntax error is thrown before the program is executed. In this case, it's because strict-mode ( opted in for only the saySomething(..) function here ) forbids, among many other things such as functions to have duplicate parameter names, this has always been allowed in non-strict mode. Strict mode is nonetheless required by specification to be thrown as an "early error" before any execution begins.

  **But how does the JS engine know that greeting parameter has been duplicated?**

  _How does it know that saySomething(..) function is even in strict-mode while processing the parameter list ( the "use-strict" pragma apears only later, in the function body? )_

  _Again, the only reasonable explanation is that the code must first be fully parsed before any execution occurs._

- **Hoisting**

  <pre>
  <code>
    function saySomething() {
        var greeting = "Hello";
        {
            greeting = "Howdy"; // error comes from here
            let greeting = "Hi";
            console.log(greeting);
        }
    }
  
    saySomething();
    // ReferenceError: Cannot access 'greeting' before 
    // Initialization 
  </code>
  </pre>

  The noted ReferenceError occurs from the line with the statement greeting = "Howdy". What's happening here is that the greeting variable for that statement belongs to the declaration on the next line, let greeting = "Hi", rather than to the previous var greeting = "Hello" statement.

  The only way JS could know, at the line where the error is thrown, that the next statement would create block-scoped variable of the same name (greeting) is if the JS engine had processed this code in an early pass, and already set up all the scopes and their variable associations. **This processing of scope and declarations can only accurately be accomplished by parsing the program before execution**

  The RefrenceError here technically comes from greeting = "Howdy" accesing the greeting variable **too early**, a conflict reffered as the Temporal Dead Zone ( TDZ ).

##### Warning

It's often asserted that let and const declaration are not hoisted, as an explanation of the TDZ behavior just illustrated. But this is not accurate.

**Now I am convinced that JS programs are parsed before any execution begins. But does it prove they are compiled?**

This is an interesting question to ponder. Could JS parse a program, but then execute that program by interpretting operations represented in the AST without first compiling program? Yes, that's possible. But it's mostly unlikely, mostly because it would be extremely inefficient performance wise.

It's hard to imagine a productin quality JS engine parsing a program into AST but not then converting ( "compiling" ) that AST into the most efficient ( binary ) representation for the engine to then execute.

In Spirit and in practice, what the engine is doing in processing JS programs is **much more alike compilation** than not.

**We need proper mental models of how the JS engine treats our code if we want to understand JS and scope effectively.**

#### 3. Compiler Speak

With awareness of the two-phase processing of a JS program ( compile, then execute ). Let's know about how JS engine identifies variables and determines the scopes of a program as it is compiled.

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

  console.log(nextStudent);
  // Suzy
</code>
</pre>

Other than declarations, all occurences of variables/identifiers in a program serve in one of two "roles": either they're the target of an assignment or they're source of a value.

**How to know if a variable is target or source?** Check if there is a value that is being assigned to it; if so, it's a target. If not, then the variable is a source.

For JS engine to properly handle a program's variable, it must first label each occurance of a variable as target or source.

##### Target

What makes variable target? Consider:

**students = [ // ..** This statement is clearly an assignment operation; the **var students** part is handled entirely as a declartion at compile time. Same with the **nextStudent** = getStudentName(73) statement.

Similary, target assignment operations perhaps less obvious are for (let **student** in students) {. This statement assigns a value to student for each itteration of the loop. Another target refrence getStudentName(73), the argument 73 is assigned to the parameter **studentID**.

Last (subtle) target reference **function getStudentName(studentID) {**. A function declaration is a special type of a target refrence. You can think of it like **var getStudentName = function(studentID)**, but that's not exactly accurate. An identifier **getStudentName** is declared ( at compile time ), but the **= function(studentID)** is also handled at compilation.

The association between **getStudentName and the function** is automatically set up at the beginning of the scope rather than waiting for an **=** assignment statement to be executed.

> Note
>
> This automatic association of function and variable is referred to as “function hoisting”

##### Sources

Now, the other variable references must then be source references.

In for (let student of **students**), students is a source reference. In statement if (**student**.id == **studentID**), both student and studentID are source references. student is also a source refrence in return **student**.name

> Note
>
> id, name, and log are all properties, not variable references.

#### 4. Cheating: Runtime Scope Modifications {#section-4}

Scope is determined as the program is compiled, and should not generally be affected by runtime conditions. However, in non-strict-mode, there are technically still two ways to cheat this rule, modifying a program’s scopes during runtime.

_Neither of these techniques should be used—they’re both dangerous and confusing._

<pre>
<code>
  function badIdea() {
    eval("var oops = 'Ugh!';");
    console.log(oops);
  }

  badIdea();  // Ugh!
</code>
</pre>

If the eval(..) had not been present, the oops variable in console.log(oops) would not exist, and would **throw a RefrenceError.**

Here, eval(..) modifies the scope of the badIdea() function at runtime.

<pre>
<code>
  var badIdea = { oops: "Ugh!" };

  with (badIdea) {
    console.log(oops);  //Ugh!
  }
</code>
</pre>

Here, badIdea was turned into a scope at runtime rather than compile time, and its property oops becomes a variable in that scope.

At all costs, avoid **eval(..)** and **with**.

#### 5. Lexical Scope

JS’s scope is determined at compile time, the term for this kind of scope is "lexical scope"."Lexical" is associated with the “lexing” stage of compilation. The key idea of “lexical scope” is that it’s controlled entirely by the placement of functions, blocks, and variable declarations, in relation to one another.

If you place a variable declaration inside a function, the compiler handles this declaration as it’s parsing the function, and associates that declaration with the function’s scope. If
a variable is block-scope declared ( let / const), then it’s associated with the nearest enclosing { .. } block, rather than its enclosing function (as with var).

Furthermore, a reference (target or source role) for a variable must be resolved as coming from one of the scopes that are lexically available to it; otherwise the variable is said to be "undeclared". If the variable is not declared in the current scope, the next outer/enclosing scope will be consulted. This process of stepping out one level of scope nesting continues until either a matching variable declaration can be found, or the global scope is reached and there’s nowhere else to go.

It’s important to note that compilation doesn’t actually do anything in terms of reserving memory for scopes and variables. None of the program has been executed yet.

Instead, compilation creates a map of all the lexical scopes that lays out what the program will need while it executes. In other words, while scopes are identified during compilation, they’re not actually created until runtime, each time a scope needs to run.

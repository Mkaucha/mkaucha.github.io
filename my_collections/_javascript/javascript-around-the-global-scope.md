---
layout: javascript
author: Milan Kaucha
title: Around the Global Scope
categories: Javascript
excerpt_separator: <!--more-->
---

Fully understanding the global scope is critical in your mastery of using lexical scope to structure your programs.

<!--more-->

#### 1. Why Global Scope?

Most applications are composed of multiple individual JS files. So, How exactly do all those seperate files get stitched together in a single runtime context by the JS engine?

With respect to browser-executed applications, there are three main ways.

1.  First, if you're directly using **ES modules** (not transpiling them into some other module-bundle format), these files are loaded individually by the JS environment. Each module then imports refrences to whichever other modules it needs to access. The seperate module files cooperate with each other exclusively through these shared imports, without needing any shared outer scope.

2.  Second, if you're using a **bundler** in your build process, all the files are typically concatenated together before delivery to the browser and JS engine, which then oly process one big file. Even with all the pieces of the application co-located in a single file, some mechanism is necessary for each piece to register a name to be referred to by other pieces, as well as some facility for the access to occur.<br><br>
    In some build setups, the entire contents of the file are wrapped in a single enclosing scope, such as a wrapper function, universal module (UMD) etc. Each piece can register itself for access from other pieces by way of local variables in that shared scope.

     <pre>
     <code>
         (function wrappingOuterScope(){
             var moduleOne = (function one(){
                 // ..
             })();
    
             var moduleTwo = (function two(){
                 // ..
    
                 function callModuleOne() {
                     moduleOne.someMethod();
                 }
    
                 // ..
             })();
    
         })();
     </code>
     </pre>

    The moduleOne and moduleTwo local variables inside the _wrappingOuterScope()_ function scope are declared so that these modules can access each other for their cooperation.

    The scope of _wrappingOuterScope()_ is a function but not the full environment global scope, it does act as a sort of "application-wide scope", a bucket where all the top-level identifiers can be stored, though not in the real global scope. It's kind of like a stand-in for the global scope in that respect.

3.  And finally, the third way: whether a bundler tool is used for an application, or whether the (non-ES module) files are simply loaded in the browser individually (via dynamic JS resource loading or _< script >_ tag), if there is no single surrounding scope encompassing all these pieces, the **global scope** is only way for them to cooperate with each other:

    A bundled file of this sort often look like this:

       <pre>
       <code>
            var moduleOne = (function one() {
                // ..
            })();
            
            var moduleTwo = (function two() {
                // ..
            
                function callModuleOne() {
                    moduleOne.someMethod();
                }
            
                // ..
            })();
       </code>
       </pre>

    Since, there is no surrounding function scope, these _moduleOne_ and _moduleTwo_ declarations are simply dropped into the global scope.

    This is effectively the same as if the file hadn't been concatenated, but loaded seperately.

    ###### module1.js:

    <pre>
    <code>
        var moduleOne = (function one() {
            // ..
        })();
    </code>
    </pre>

    ###### module2.js:

    <pre>
    <code>
        var moduleTwo = (function two() {
            // ..
    
            function callModuleOne() {
                moduleOne.someMethods();
            }
    
            // ..
        })();
    </code>
    </pre>

    If these files are loaded seperately as normal standalone.js files in a browser environment, each top-level variable declaration will end up as a global variable, since the global scope is the only shared resources between two seperate files. They are independent programs, from the perspective of the JS engine.

    The global scope is also where:

    1. JS exposes its build-ins:<br>

       - primitive: _undefined, null, Infinity, NaN_
       - natives: _Date(), Object(), String(), etc._
       - global functions: _eval(), parseInt(), etc._
       - namespaces: _Math, Atomics, JSON_
       - friends of JS: _Intl, WebAssembly_

    2. The environment hosting the JS engine exposes its own built-ins:

       - _console(and its methods)_
       - _the DOM(window, document, etc)_
       - _timers(setTimeout(..), etc)_
       - _web platform APIs: (navigator, history, geolocation, WebRTC, etc)_

#### 2. Where Exactly is this Global Scope?

It might seem obvious that the global scope is located in the outermost portion of a file; that is, not inside any function or other block. Different JS environments handle the scopes of your programs, especially the global scope, differently.

##### Browser "Window"

With respect to treatment of the global scope, the most pure environment JS can be run in is as a standalone .js file loaded in a web page environment in a browser.

###### .js file:

<pre>
<code>
    var studentName = "Kyle";

    function hello() {
        console.log(`Hello, ${ studentName }!`);
    }

    hello();
    // Hello, Kyle!
</code>
</pre>

This code may be loaded in a web page environment using an inline _< script >_ tag, a _< script src=.. >_ script tag in the markup, or even a dynamically created _< script > DOM_ element. In all three case, the _studentName_ and _hello_ identifiers are declared in the global scope.

That means if you access the global object (commonly, window in the browser), you’ll find properties of those same names there:

<pre>
<code>
    var studentName = "Kyle";

    function hello() {
        console.log(`Hello, ${ window.studentName }!`);
    }

    hello();
    // Hello, Kyle!
</code>
</pre>

The outer scope is the _global scope_ and _studentName_ is legitimately created as global variable. But unfortunately, that won't always be true of all JS environments you encounter.

##### Globals Shadowing Globals

An unusual consequence of the difference between a global variable and a global property of the same name is that, within just the global scope itself, a global object property can be shadowed by a global variable:

<pre>
<code>
    window.something = 42;

    let something = "Kyle";

    console.log(something);
    // Kyle

    console.log(window.something);
    // 42
</code>
</pre>

The let declaration adds a something global variable but not a global object property. The effect then is that the _something_ lexical identifier shadows the _something_ global object property.

It's a bad idea to create a divergence between the global object and the global scope.

A simple way to avoid this is to always use var for globals. Reserve _let_ and _const_ for block scopes.

##### DOM Globals

A DOM element with an id attribute automatically creates a global variable that references it.

<pre>
<code>
    < ul id="my-todo-list">
        //< li id="first">Write a book</ li>
        ..
    </ ul>
    And the JS for that page could include:
    
    first;
    // < li id="first">..</ li>

    window["my-todo-list"];
    // < ul id="my-todo-list">..</ ul>
</code>
</pre>

If the id value is a valid lexical name(like _first_), the lexical variable is created. If not, the only way to access that global is through the global oject (_window[..]_)

The auto-registration of all id-bearing DOM elements as global variables is an old legacy browser behavior. My advice is never to use these global variables,even though they will always be silently created.

##### What’s in a (Window) Name?

<pre>
<code>
    var name = 42;

    console.log(name, typeof name);
    // "42" string
</code>
</pre>

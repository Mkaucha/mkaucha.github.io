---
layout: blogdetail
author: Milan Kaucha
title: Least Exposure
categories: Scope and Closure
excerpt_separator: <!--more-->
---

To begin, we’re going to look at how and why we should be using different levels of scope (functions and locks)to organize our program’s variables, specifically to reduce scope over-exposure.

#### 1. Least Exposure

It make sense that functions define their own scopes. But why do we need blocks to create scopes as well?

Software engineering articulates a fundamental discipline, typically applied to software security, called **"The Principle of Least Privilege"**.

POLP expresses a defensive posture to software architecture: components of the system should be designed to function with least privilage, least access, least exposure. If each piece is connected with minimum-necessary capablities, the overall system is stronger from a security standpoint, because a compromise or failure of one piece has a minimized impact on the rest of the system.

**What do we want to minimize the exposure of?** Simply: the variables registered in each scope.

Why shouldn't we just place all the variables of our program out in the global scope?

When variables used by one part of the program are exposed to another part of the program, via scope, there are three main hazards that often arise:

- **Naming Collisions:** If we use a common and useful variable/function name in two different parts of the program, but the identifiers comes from one shared scope(like the global scope), then name collision occurs, and
  it’s very likely that bugs will occur as one part uses the variable/function in a way the other part doesn’t expect.

For example, imagine if all your loops used a single global i index variable, and then it happens that one loop in a function is running during an iteration of a loop from another function, and now the shared i variable gets an unexpected value.

- **Unexpected Behavior:** If we expose variable/functions whose usage is otherwise private to a piece of the program, it allows other developers to use them in ways we didn't intend, which can violate expected behavior and cause bugs.

For example, if your part of the program assumes an array contains all numbers, but someone else’s code accesses and modifies the array to include booleans and strings, your code may then misbehave in unexpected ways.

- **Unintended Dependency:** If we expose variables/functions unnecessarily, it invites other developers to use and depend on those otherwise privatet pieces. While that doesn't break our program today, it creates a refactoring hazard in the future because we cannot easily refactor that variable or function without potentially breaking other parts of the software that we don't control.

For example, if your code relies on an array of numbers,and you later decide it’s better to use some other data structure instead of an array, you now must take on the liability of adjusting other affected parts of the software.

**Principle Of Least Exposure**, as applied to **variable/function** scoping, default to exposing the bare minimum necessary, keeping everything else as private as possible. Declare variables in as small and deeply nested of scopes as possible, rather than placing everything in the global scope.<br>
If we design our software accordingly, we have a much greater chance of avoiding these three hazards.

Consider:

<pre>
<code>
  function diff(x, y) {
    if (x > y) {
      let tmp = x;
      x = y;
      y = tmp;
    }
    return y - x
  }
  
  diff(3, 7);     // 4
  diff(7, 5);     // 2
</code>
</pre>

In this simple example, it doesn't seem to matter whether **tmp** is inside the **if** block or whether it belongs at the function level - it certainly shouldn;t be a global variable!<br>
However, following the POLE principle, **tmp** should be as hidden in scope as possible. So we block scope **tmp** (using let) to the if block.

#### 2. Hiding in Plain (Function) Scope

Let's consider an example where function scoping can be useful.

<pre>
<code>
  var cache = {}

  function factorial(x) {
    if (x < 2) return 1;
    if (!(x in cache)) {
      cache[x] = x * factorial(x-1);
    }
    return cache[x]
  }

  factorial(6);
  //  720

  cache;
  // {
  //      "2": 2,
  //      "3": 6,
  //      "4": 24,
  //      "5": 120,
  //      "6": 720
  // }

  factorial(7);
  //  5040
</code>
</pre>

We're storing all the computed factorials in **cache** so that across multiple calls to factorail(..), the previous computations remain.<br>
The **cache** variable is preety obviously a **private** detail of how factorial(..) works, not something that should be exposed in an outer scope.

> Note:
>
> factorial(..) here is recursive - a call to itself is made from inside; a non-recursive implementation would yield the same scoping analysis with respect to cache.

Since we need cache to survive multiple calls, it must be located in a scope outside that function.

<pre>
<code>
  // outer/global scope

  function hideTheCache() {
    // "middle scope", where we hide `cache`
    var cache = {};

    return factorial;

    function factorial(x) {
      // inner scope
      if (x < 2) return 1;
      if (!(x in cache)) {
        cache[x] = x * factorial(x - 1);
      }
      return cache[x];
    }
  }

  var factorial = hideTheCache();

  factorial(6);
  //  720

  factorial(7);
  //  5040
</code>
</pre>

The **hideTheCache()** function serves no other purpose than to create a scope for cache to persist in across multiple calls to factorial(..). But for factorial(..) to have access to cache, we have to define factorial(..) inside that same scope. The we return the function reference, as a value from **hideTheCache()**, and store it in an outer scope varaible, also named **factorial**.

Its going to be tedious to define a **hideTheCache(..)** function scope each time such a need for **variable/fucntion** hiding occurs.

Rather than defining a new and uniquely named function each time one of those **scope-only-for-the-purpose-of-hiding-a-variable** situations occurs, a perhaps better solution is to use a function expression:

<pre>
<code>
  var factorial = (function hideTheCache() {
    var cache = {};

    function factorial(x) {
      if(x < 2) return 1;
      if(!(x in cache)) {
        cache[x] = x * factorial(x-1);
      }
      return cache[x];
    }
    return factorial;
  })();

  factorial(6);
  //  720

  factorial(7);
  //  5040
</code>
</pre>

Since **hideTheCache(...)** is defined as a **function expression** instead of a function declaration, its name is in its own scope - essentially the same scope as cache - rather than the **outer/global** scope.

That means we can name every single occurence of such a function expression the exact same name, and never have any collision.

##### Invoking Function Expression Immediately

We surrounded the entire function expression in a set of ( .. ), and then on the end, we added that second () parentheses set; that's actually calling the function expression we just defined.

So, in other words, we're defining a function expression that's then immediately invoked. This common pattern has a name: Immediately Invoked Function Expression (IIFE).

An **IIFE** is useful when we want to create a scope to hide variables/functions. An IIFE can be named, as with **hideTheCache()** or **or unnamed/annoymous**. And it can be **standalone**, or as part of another statement -- **hideTheCache()** returns the **factorial()** function reference which is then = assigned to the variable **factorial**.

For comparison, here's an example of a standalone IIFE:

<pre>
<code>
  // outer scope

  (function(){
    // inner hidden scope
  })();

  // more outer scope
</code>
</pre>

Unlike earlier with **hideTheCache()**, where the outer surrounding (..) were noted as being optional, for a standalone IIFE they're required; they distinguish the function as an expression, not a statement.

##### Function Boundaries

Since **IIFE** is a full function, the function boundary alters the behavior of certain statements/contructs.

For example, a **return** statement in some piece of code would change its meaning if an IIFE is wrapped around it, because now the **return** would refer to the **IIFE's** function. And statements like **break** and **continue** won't operate across an **IIFE** function boundary to control an outer loop or block.

So, if the code you need to wrap a scope around has return, this, break, or continue in it, an IIFE is probably not the best approach. In that case, you might look to create the scope with a block instead of a function.

#### 3. Scoping with Blocks

So far, we understand the merits of scoping scopes to limit identifier exposure via **function(i.e.,IIFE)** scope. But let's now consider using **let** declarations with nested blocks.<br>
In general, any { .. } curly-brace pair which is a statement will act as a block, but not necessarily as a scope.

A block only becomes a scope if necessary, to contain its block-scoped declartaion **(i.e., let or const)**.

<pre>
<code>
  {
      // not necessarily a scope (yet)

      // ..

      // now we know the block needs to be a scope
      let thisIsNowAScope = true;

      for (let i = 0; i < 5; i++){
        // this is also a scope, activated each
        // iteration
      }

      if (i % 2 == 0){
        // this is just a block, not a scope
        console.log(i);
      }
  }
  // 0 2 4
</code>
</pre>

Not all { .. } curly-brace pairs create blocks (and thus are eligible to become scopes):

- Object literals use { .. } curly-brace paris to delimit their key-value lists, but such object values are not scopes.

- class uses { .. } around its body definition, but this is not a block or scope.

- A function uses { .. } around its body, but this is not technically a block - it's a single statement for the function body. It is, however, a (function) scope.

- The { .. } curly-brace pair on a switch statement does not define a block/scope.

In most languages that support block scoping, an explicit
block scope is an extremely common pattern for creating a
narrow slice of scope for one or a few variables. So following the POLE principle, we should embrace this pattern more widespread in JS as well; use (explicit) block scoping to narrow the exposure of identifiers to the minimum practical.

An explicit block scope can be useful even inside of another block (whether the outer block is a scope or not).

<pre>
<code>
  if (somethingHappened) {
    // this is a block, but not a scope

    {
      // this is both a block and an 
      // explicit scope
      let msg = somethingHappened.message();
      notifyOthers(msg);
    }

    // ..

    recoverFromSomething();
  }
</code>
</pre>

Here, the { .. } curly-brace pair inside the if statement is an even smaller inner explicit block scope for msg, since that variable is not needed for the entire if block.

**So does it matter enough to add the extra { .. } pair and indentation level?**

I think you should follow POLE and always (within reason!) define the smallest block for each variable.

If you find yourself placing a let declaration in the middle of a scope, first think, “Oh, no! TDZ alert!” If this let declaration isn’t needed in the first half of that block, you should use an inner explicit block scope to further narrow its exposure!

<pre>
<code>
  function getNextMonthStart(dateStr) {
    var nextMonth, year;

      {
        let curMonth;
        [ , year, curMonth ] = dateStr.match(
        /(\d{4})-(\d{2})-\d{2}/
        ) || [];
        nextMonth = (Number(curMonth) % 12) + 1;
      }

        if (nextMonth == 1) {
          year++;
        }

        return `${ year }-${
            String(nextMonth).padStart(2,"0")
        }-01`;
  }
  getNextMonthStart("2019-12-25"); // 2020-01-01
</code>
</pre>

So why put **curMonth** in an explicit block scope instead of just alongside nextMonth and year in the top-level function scope? Because **curMonth** is only needed for those first two statements; at the function scope level it’s over-exposed.

Let's now look at an even more substantial example:

<pre>
<code>
  function sortNamesByLength(names) {
    var buckets = [];

    for (let firstName of names) {
      if (buckets[firstName.length] == null) {
        buckets[firstName.length] = [];
      }
      buckets[firstName.length].push(firstName);
    }

    // a block to narrow the scope
    {
      let sortedNames = [];

      for (let bucket of buckets) {
        if (bucket) {
          // sort each bucket alphanumerically
          bucket.sort();

          // append the sorted names to our
          // running list
          sortedNames = [
            ...sortedNames,
            ...bucket
          ];
        }
      }
      return sortedNames;
    }
  }

  sortNamesByLength([
    "Sally",
    "Suzy",
    "Frank",
    "John",
    "Jenifer",
    "Scott"
  ]);
  // [ "John", "Suzy", "Frank", "Sally",
  //  "Scott", "Jennifer" ]
</code>
</pre>

We split six identifiers into each inner nested scope as appropriate.<br>
**sortedNames** could have been defined in the top-level function scope, but it’s only needed for the second half of this function. To avoid over-exposing that variable in a higher level scope, we again follow POLE and block-scope it in the inner explicit block scope.

**var and let**

Declaration of var **buckets**. That variable is used across the entire function.

> Note:
>
> The parameter **names** isn't used across the whole function, but there's no way limit the scope of a parameter, so it behaves as a function-wide declaration regardless.

**var** attaches to the nearest enclosing function scope, no matter where it appears. That's true if **var** appears inside a block:

<pre>
<code>
  function diff(x, y) {
    if (x > y) {
      var tmp = x; // `tmp` is function-scoped
      x = y;
      y = tmp
    }

    return y - x;
  }
</code>
</pre>

Even though var is inside a block, its declaration is function scoped (to diff(..)), not block-scoped.

#### Where To let?

My advice to reserve var for (mostly) only a top-level function scope means that most other declarations should use **let**.

The way to decide is to ask, "What is the most minimal scope exposure that’s sufficient for this variable?"

If a declaration belongs in a block scope, use **let**. If it belongs in the function scope, use **var**.

Let's recall diff(..) from earlier:

<pre>
<code>
  function diff(x, y) {
    var tmp;

    if (x > y) {
      tmp = x;
      x = y;
      y = tmp;;
    }

    return y - x;
  }
</code>
</pre>

In this version of diff(..), tmp is clearly declared in the function scope. <br>
Is that appropriate for tmp? I would argue, **no**.

**tmp** is only needed for those few statements. It's not needed for the **return** statement. It should therefore be blocked-scoped.

Another example that was historically based on var but
which should now pretty much always use let is the for
loop:

<pre>
<code>
  for (var i = 0; i < 5; i++) {
    // do something
  }
  // POLE dictates it should be declared with let 
  // instead of var:
  for (let i = 0; i < 5; i++) {
    // do something
  }

  for (let i = 0; i < 5; i++) {
    // do something
  }
</code>
</pre>

Almost the only case where switching a **var** to a **let** in this way would “break” your code is if you were relying on accessing the loop’s iterator (i) outside/after the loop, such as:

<pre>
<code>
  for (var i = 0; i < 5; i++) {
    if (checkValue(i)) {
      break;
    }
  }
  if (i < 5) {
    console.log("The loop stopped early!");
  }

  // it smells like poor code structure. A preferable 
  // approach is to use another outer-scoped variable 
  // for that purpose:

  var lastI;

  for(let i = 0; i < 5; i++){
    lastI = i;
    if (checkValue(i)) {
      break;
    }
  }

  if (lastI < 5) {
    console.log("The loop stopped early!");
  }
</code>
</pre>

##### What's the Catch?

There's one little exception to call out: the **catch** clause.

Since the introduction of **try..catch** the **catch** clause has used an additional block-scoping declaration capability:

<pre>
<code>
  try {
    doesntExist();
  }
  catch (err) {
    console.log(err);
    // ReferenceError: 'doesntExist' is not defined
    // ^^^^ message printed from the caught exception

    let onlyHere = true;
    var outerVariable = true;
  }

  console.log(outerVariable);   // true

  console.log(err);
  // ReferenceError: 'err' is not defined
  // ^^^^ this is another thrown (uncaught) exception
</code>
</pre>

The err variable declared by the catch clause is block-scoped to that block. This catch clause block can hold other block scoped declarations via **let**. But a var declaration inside this block still attaches to the outer **function/global** scope.

#### 5. Function Declarations in Blocks(FiB)

We typically think of function declarations like they’re the equivalent of a var declaration. So are they function-scoped like var is?

Let's dig in:

<pre>
<code>
  if (false) {
    function ask() {
      console.log("Does this run?");
    }
  }
  ask();
</code>
</pre>

What do you expect for this program to do? Three reasonable outcomes:

1. The **ask()** call might fail with a **ReferenceError exception**, because ask identifier is block-scoped to the **if block scope** and thus isn't available in the **outer/global** scope.

2. The **ask()** call might fail with a TypeError exception, because the **ask** identifier exists, but it’s **undefined** (since the if statement doesn’t run) and thus not a callable function.

> Note:
>
> This is one of those few crazy areas where existing legacy behavior betrays a predictable outcome.

The JS specification says that function declarations inside of blocks are block-scoped, so the answer should be **(1)**.

However, most browser-based JS engines (including **v8**, which comes from Chrome but is also used in Node) will behave as **(2)**, meaning the identifier is scoped outside the if block but the function value is not automatically initialized, so it remains **undefined**.

One of the most common use cases for placing a function
declaration in a block is to conditionally define a function one way or another (like with an **if..else** statement)

<pre>
<code>
  if (typeof Array.isArray != "undefined") {
    function isArray(a) {
      return Array.isArray(a);
    }
  }
  else {
    function isArray(a) {
      return Object.prototype.toString.call(a)
        == "[object Array]"
    }
  }
</code>
</pre>

It’s tempting to structure code this way for performance
reasons, since the **typeof Array.isArray** check is only
performed once, as opposed to defining just one **isArray(..)** and putting the if statement inside it—the check would then run unnecessarily on every call.

> Warning:
>
> In addition to the risks of FiB deviations, another problem with conditional - definition of functions is it’s harder to debug such a program. If you end up with a bug in the **isArray(..)** function, you first have to figure out which **isArray(..)** implementation is actually running!

Behaviors in various browsers and non-browser JS environments (JS engines that aren’t browser based) will likely vary. For example:

<pre>
<code>
  if (true) {
    function ask() {
      console.log("Am I called?");
    }
  }

  if (true) {
    function ask() {
      console.log("Or what about me?");
    }
  }

  for (let i = 0; i < 5; i++) {
    function ask() {
      console.log("Or is it one of these?");
    }
  }

  ask();

  function ask() {
    console.log("Wait, maybe, it's this one?")
  }
</code>
</pre>

We might suggest that the final **ask()** in this snippet, with “Wait, maybe...” as its message, would **hoist** above the call to **ask()**. Since it’s the last function declaration of that name, it should "win," right? Unfortunately, **no**.

The only practical answer to avoidingthe vagaries of FiB is to simply avoid FiB entirely. In other word, never place a function declaration directly inside any block. Always place function declarations anywhere in the top-level scope of a function (or in the global scope).

So for the earlier **if..else** example, the better overall approach although may be slightly less performant:

<pre>
<code>
  function isArray(a) {
    if (typeof Array.isArray != "undefined") {
      return Array.isArray(a);
    }
    else {
      return Object.prototype.toString.call(a)
        == "[objectArray]";
    }
  }
</code>
</pre>

I suggest you consider this approach:

<pre>
<code>
  var isArray = function isArray(a) {
    return Array.isArray(a);
  };

  // override the definition, if you must
  if (typeof Array.isArray == "undefined") {
    isArray = function isArray(a) {
      return Object.prototype.toString.call(a)
        == "[object Array]"
    };
  }
</code>
</pre>

Inside the **if statement** we're placing a function expression, not a declaration which is perfectly fine and valid, for function expressions to appear inside blocks.

**FiB is not worth it, and should be avoided**.

#### 5. Blocked Over

The point of lexical scoping rules in a programming language is so we can appropriately organize our program’s variables.

And one of the most important organizational techniques is to ensure that no variable is over-exposed to unnecessary scopes (POLE).

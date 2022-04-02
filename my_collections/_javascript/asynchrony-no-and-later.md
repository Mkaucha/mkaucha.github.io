---
layout: blogdetail
author: Milan Kaucha
title: Asynchrony Now & Later
categories: Async and Performance
excerpt_separator: <!--more-->
---

{% raw %}

One of the most important and yet often misunderstood parts of programming in a language like Javascript is how to express and manipulate program behavior spread out over a period of time.

#### 1. Asychrony Now & Later

This is not just about what happens from the begining of a **for** loop to the end of a **for** loop, which of course takes **some time** to complete. It's about what happens when part of your program runs now, and another part of your program runs later -- there's a gap between **now** and **later** where our program isn't actively executing.

Practically all nontrivial programs ever written have in someway or another had to manage this gap, whether that be in waiting for user input, requesting data from a database or file system, sending data across the network and waiting for a response, or performing a repeated task at a fixed interval of time.

The relationship between the **now** and **later** parts of your program is at the heart of **asynchronous programming**.

The good enough approach has always been the humble **callback function**. But as JS continues to grow in both scope and complexity, we demand for approaches that are both more capable and more reason-able.

#### 2. A Program in Chunks

Program is almost certainly comprised of several chunks, only one of which is going to execute **now**, and the rest of which will execute **later**. The most common unit of chunk is the **function**. Later doesn't happen strictly and immediately after **now**. In other words, tasks that cannot complete now are, by definition, going to complete asynchronously, and thus we will have blocking behavior as we might intuitively expect.

Consider:

<pre>
<code>
  // ajax(..) is some arbitary Ajax function given
  // by a library
  var data = ajax("http://some.url.1");

  console.log(data);
  // Oops! `data` generally won't have the Ajax results
</code>
</pre>

Standard **Ajax** requests don't complete synchronously, which means **ajax(..)** function doesnot yet have any value to retun back to be assigned to **data** variable. If **ajax(..)** could block until the response came back, then the **data = ..** assignment would work fine.

But that's not how we do **Ajax**. We make an asynchronous Ajax request **now**, and we won't get the results back until **later**.

The simplest way of **"waiting"** from **now** until **later** is to use a function commonly called a **callback** function:

<pre>
<code>
  // ajax(..) is some arbitary Ajax function given
  // by a library
  var data = ajax("http://some.url.1", function myCallbackFunction(data){

    console.log(data);    // Yay, I gots me some `data`!

  });
</code>
</pre>

> Warning:
>
> You may have heard that it's possible to make synchronous Ajax requests. While that's technically true, you should never, ever do it, under any circumstances, because it locks the browser UI (buttons, menus, scrolling, etc.) and prevents any user interaction whatsoever.

Consider this code:

<pre>
<code>
  function now() {
    return 21;
  }

  function later() {
    answer = answer * 2;
    console.log("Meaning of life:", answer);
  }

  var answer = now();

  setTimeout(later, 1000);    // Meaning of life: 42
</code>
</pre>

There are two chunks to this program: the stuff that will run **now** and the stuff that will run **later**. Let's be super explicit:

###### Now

<pre>
<code>
  function now() {
    return 21;
  }

  function later() { .. }

  var answer = now();

  setTimeout(later, 1000);
</code>
</pre>

###### Later

<pre>
<code>
  answer = answer * 2;
  console.log("Meaning of life:", answer);
</code>
</pre>

The **now** chunck runs right away, as soon as we execute our program. But **setTimeout(..)** sets up an event(a timeout) to happen **later**, so the content of the **later()** function will be executed at a later time.

Any time we wrap a portion of code into a **function** and specify that it should be executed in response to some event, we are creating a **later** chunk of our code, and thus introducing asynchrony to our program.

#### 3. Async Console

There are some browsers and some conditions that console.log(..) does not actually immediately output
what it's given. . The main reason this may happen is because **I/O** is a very slow and blocking part of many programs. So, it may perform better for a browser to handle **I/O** asynchronously in the background.

<pre>
<code>
  var a = {
    index: 1
  };

  //  later
  console.log(a);  // ??

  // even later
  a.index++;
</code>
</pre>

Most of the time, the preceding code will probably produce an object representation in your developer tools' console that's what we'd expect. But it's possible this same code could run in a situation where the browser felt it needed to defer the
console I/O to the background, in which case it's possible that by the time the object is represented in the browser console, the **a.index++** has already happened, and it shows **{ index: 2 }**.

> Note:
>
> If you run into this rare scenario, the best option is to use breakpoints in your JS debugger. The next best option would be to force a "snapshot" of the object in question by serializing it to a string ,like with **JSON.stringify(..)**.

#### 4. Event Loop

The one common **"thread"** of all those environment where JS run is that they have a mechanism in them that handles executing multiple chunks of our program over time, at each moment invoking the JS engine, called the **"event loop"**.

The JS engine has been an on-demand execution environment and it's the surrounding environment that has always scheduled "events".

For example, when our JS program makes an Ajax request to fetch some data from a server, we set up the **"response"** code in a function (called **"callback"**), and the JS engine tells the hoisting environment, _"Hey, I'm going to suspend execution for now, but whenever you finish with that network request, and you have some data, please call this function back."_

The browser is then set up to listen for the response from the network, and when it has something to give you, it schedules the callback function to be executed by inserting it into the **event loop**.

So what is the **event loop**?

<pre>
<code>
  // `eventLoop` is an array that acts as a queue (first-in, first-out)
  var eventLoop = [];
  var event;

  // Keep going "forever"
  while (true) {
    // Perform a "tick"
    if (eventLoop.length > 0) {
      // get the next event in the queue
      event = eventLoop.shift();

      // now, execute the next event
      try {
        event();
      }
      catch (err) {
        reportError(err);
      }
    }
  }
</code>
</pre>

As you can see, there's a continuously running loop represented by the while loop, and each iteration of this loop is called a "tick." For each tick, if an event is waiting on the queue, it's taken off and executed. These events are your function callbacks.

What if there are already 20 items in the event loop at that moment? Your callback waits. It gets in line behind the others -- there's not normally a path for preempting the queue and skipping ahead in line.

So, in other words, your program is generally broken up into lots of small chunks, which happen one after the other in the **event loop queue**.

> Note:
>
> ES6 now specifies how the event loop works, which means technically it's within the purview of the JS engine, rather than just the hosting environment. One main reason for this change is the introduction of **ES6 Promises**.

#### 5. Parallel Threading

It's very common to conflate the terms **"async"** and **"parallel"**. **Async** is about the gap between now and later. But **parallel** is about things being to occur simultaneously.

The most common tools for parallel computing are **processes** and **threads**. Process and threads execute independently and may execute simultaneously; on seperate processors, or even seperate computers, but multiple threads can share memory of a single process.

An **event loop**, breaks its work into tasks and executes them in serial, disallowing parallel access and changes to shared memory.

In single-threaded environment, nothing can interrupt the thread. But if we have parallel system, where two different threads are operating in the same program, we could very likely have unpredictable behavior.

Consider:

<pre>
<code>
  var a = 20;

  function foo() {
    a = a + 1;
  }

  function bar() {
    a = a * 2;
  }

  //  ajax(..) is some arbitary Ajax function given by a library
  ajax("http://some.url.1", foo);
  ajax("http://some.url.2", bar);
</code>
</pre>

In JavaScript's single-threaded behavior, if foo() runs before bar() , the result is that a has 42 , but if bar() runs before foo() the result in a will be 41.

If JS events sharing the same data executed in parallel. Lets consider two lists of pseudocode tasks as the threads that could respectively run the code in foo() and bar().

Consider:

<pre>
<code>
  <strong>Thread 1 (X and Y are temporary memory locations):</strong>
  foo():
    a. load value of `a` in `X`
    b. store `1` in `Y`
    c. add `X` and `Y`, store result in `X`
    d. store value of `X` in `a`

  <strong>Thread 2 (X and Y are temporary memory locations):</strong>
  bar():
    a. load value of `a` in `X`
    b. store `2` in `Y`
    c. multiply `X` and `Y`, store result in `X`
    d. store value of `X` in `a`
</code>
</pre>

**What's the end result in a if the steps happen like this?**

<pre>
<code>
  1a  (load value of `a` in `X` ==> `20`)
  2a  (load value of `a` in `X` ==> `20`)
  1b  (store `1` in `Y` ==> `1`)
  2b  (store `2` in `Y` ==> `2`)
  1c  (add `X` and `Y`, store result in `X` ==> `22`)
  1d  (store value of `X` in `a` ==> `22`)
  2c  (multiply `X` and `Y`, store result in `X` ==> `44`)
  2d  (store value of `X` in `a` ==> `44`)

  //  The result in a will be 44 . But what about this ordering?

  1a  (load value of `a` in `X` ==> `20`)
  2a  (load value of `a` in `X` ==> `20`)
  2b  (store `2` in `Y` ==> `2`)
  1b  (store `1` in `Y` ==> `1`)
  2c  (multiply `X` and `Y`, store result in `X` ==> `20`)
  1c  (add `X` and `Y`, store result in `X` ==> `21`)
  1d  (store value of `X` in `a` ==> `21`)
  2d  (store value of `X` in `a` ==> `21`)
  
  // The result in a will be 21 .
</code>
</pre>

JavaScript never shares data accross threads, which means that level of nondeterminism isn't a concern. But that doesn't mean JS is always deterministic. Remember where the relative ordering of **foo()** and **bar()** produces different results(41 or 42)

#### 6. Run-to-Completion

Because of Javascript's single-threading, the code inside of **foo()** and **bar()** is atomic, which means that once **foo()** starts running, the entirety of its code will finish before any of the code in **bar()** can run, or vice versa. This is called "run-to-completion" behavior.

Consider:

<pre>
<code>
  var a = 1;
  var b = 2;
  function foo() {
    a++;
    b = b * a;
    a = b + 3;
  }
  function bar() {
    b--;
    a = 8 + b;
    b = a * 2;
  }

  // ajax(..) is some arbitrary Ajax function given by a library
  ajax( "http://some.url.1", foo );
  ajax( "http://some.url.2", bar );
</code>
</pre>

Let us divide above program into chunks.

<pre>
<code>
  // Chunk 1 is synchronous (happens now), but 
  // chunks 2 and 3 are asynchronous (happen later),
  <strong>Chunk 1:</strong>
  var a = 1;
  var b = 2;

  <strong>Chunk 2(foo()):</strong>
  a++;
  b = b * a;
  a = b + 3;

  <strong>Chunk 3(bar()):</strong>
  b--;
  a = 8 + b;
  b = a * 2;

  // Chunks 2 and 3 may happen in either-first
  // order, so there are two possible outcomes for 
  // this program

  <strong>Outcome 1:</strong>
  var a = 1;
  var b = 2;

  // foo()
  a++;
  b = b * a;
  a = b + 3;

  // bar()
  b--;
  a = 8 + b;
  b = a * 2;

  a;  // 11
  b:  // 22

  <strong>Outcome 2:</strong>
  var a = 1;
  var b = 2;

  // bar()
  b--;
  a = 8 + b;
  b = a * 2;

  // foo()
  a++;
  b = b * a;
  a = b + 3;

  a;  // 183
  b:  // 22
</code>
</pre>

As applied to JavaScript's behavior, this function-ordering nondeterminism is the common term **"race condition,"** as **foo()** and **bar()** are racing against each other to see which runs first. Specifically, it's a "race condition" because you cannot predict reliably how **a** and **b** will turn out.

> Note:
>
> If there was a function in JS that somehow did not have **run-to-completion behavior**, we could have many more possible outcomes.

#### 7. Concurrency

Let's imagine a site that displays a list of status updates (like a social network news feed) that progressively loads as the user scrolls down the list. To make such a feature work correctly, (at least) two separate "processes" will need to be
executing simultaneously (i.e., during the same window of time, but not necessarily at the same instant).

The first "process" will respond to onscroll events (making Ajax requests for new content) as they fire when the user has scrolled the page further down. The second "process" will receive Ajax responses back (to render content onto the page).

Obviously, if a user scrolls fast enough, you may see two or more onscroll events fired during the time it takes to get the first response back and process, and thus you're going to have onscroll events and Ajax response events firing rapidly,
interleaved with each other.

Concurrency is when two or more "processes" are executing simultaneously over the same period, regardless of whether
their individual constituent operations happen in parallel (at the same instant on separate processors or cores) or not.

###### "Process" 1 (onscroll events):

<pre>
<code>
  onscroll, request 1
  onscroll, request 2
  onscroll, request 3
  onscroll, request 4
  onscroll, request 5
  onscroll, request 6
  onscroll, request 7
</code>
</pre>

It's quite possible that an onscroll event and an Ajax response event could be ready to be processed at exactly the same
moment.

<pre>
<code>
  onscroll, request 1
  onscroll, request 2   response 1
  onscroll, request 3   response 2
  response 3
  onscroll, request 4
  onscroll, request 5
  onscroll, request 6   response 4
  onscroll, request 7
  response 6
  response 5
  response 7
</code>
</pre>

JS is only going to be able to handle one event at a time, so either onscroll, request 2 is going to happen first or response 1 is going to happen first, but they cannot happen at literally the same moment.

###### Event Loop Queue:

<pre>
<code>
  onscroll, request 1   <--- Process 1 starts
  onscroll, request 2
  response 1              <--- Process 2 starts
  onscroll, request 3
  response 2
  response 3
  onscroll, request 4
  onscroll, request 5
  onscroll, request 6
  response 4
  onscroll, request 7    <--- Process 1 finishes
  response 6
  response 5
  response 7              <--- Process 2 finishes
</code>
</pre>

"Process 1" and "Process 2" run concurrently (task-level parallel), but their individual events run sequentially on the event
loop queue.

The single-threaded event loop is one expression of concurrency

{% endraw %}

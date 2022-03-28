---
layout: blogdetail
author: Milan Kaucha
title: Using Clousers
categories: Scope and Closure
excerpt_separator: <!--more-->
---

Closure builds on this approach: for variables we need to use over time, instead of placing them in larger outer scopes, we can **encapsulate** (more narrowly scope) them but still preserve access from inside functions, for broader use. Functions remember these referenced scoped variables via **closure**.

If you’ve ever written a callback that accesses variables outside its own scope... guess what!? That’s **closure**.

**Closure** is one of the most important language characterstics ever invented in programming - it underlies major programming paradigms, including **Functional Programming (FP), modules, and even a bit of class-oriented design**. Getting comfortable with closure is required for mastering JS and effectively leveraging many important design patterns throughout
your code.

#### 1. See the closure

Closure is originally a mathematical concept, from **lambda calculus**.

If you aren’t dealing with a function, closure does not apply. An **object** cannot have closure, nor does a **class** have closure (though its **functions/methods** might). Only functions have **closure**.

For **closure** to be observed, a function must be invoked, and specially it must be invoked in a different branch of the scope chain from where it was originally defined.

A function executing in the **same scope** it was defined would not exhibit any observably different behavior **with or without closure** being possible; by the observational perspective and definition, that is not **closure**.

<pre>
<code>
  // outer/global scope: RED(1)

  function lookupStudent(studentId) {
    // function scope: BLUE(2)

    var students = [
      { id: 14, name: "Kyle" },
      { id: 73, name: "Suzy" },
      { id: 112, name: "Frank" },
      { id: 6, name: "Sarah" }
    ];

    return function greetStudent(greeting) {
      // function scope: GREEN(3)

      var student = students.find(
        student => student.id == studentID
      );

      return `${ greeting }, ${ student.name }!`;
    };
  }

  var chosenStudents = [
    lookupStudent(6),
    lookupStudent(112)
  ];

  // accessing the function's name:
  chosenStudents[0].name;
  // greetStudent

  chosenStudents[0]("Hello");
  // Hello, Sarah!
  
  chosenStudents[1]("Howdy");
  // Howdy, Frank!

</code>
</pre>

The **lookupStudent(..)** outer function creates and returns an inner function called **greetStudent(..)**.<br>
**lookupStudent(..)** is called twice, producing two seperate instances of its inner **greetStudent(..)** function, both of which are saved into the **chosenStudents** array.

We verify that's the case by checking the **.name** property of the returned function saved in **chosenStudents[0]**, and its indeed an instance of the inner **greetStudent(..)**.

After each call to **lookupStudent(..)** finishes, it would seem like all its inner variables would be discarded and grabage collected. The inner function is the only thing that seems to be returned and preserved. But here's where the behavior differs in ways we can start to observe.

While **greetStudent(..)** does recieve a single argument as the parameter named **greeting**, it also makes reference to both **students** and **studentID**, identifiers which come from the enclosing scope of **lookupStudent(..)**. Each of those references from the inner function to the variable in an outher scope is called a **closure**. Each instance of **greetStudent(..)** closes over the outer variable **students** and **studentID**.

**Closure** allows **greetStudent(..)** to continue to access those outer variables even after the outer scope is finished (when each call to **lookupStudent(..)** completes). Instead of the instances of students and studentID being garbage collected, they stay around in memory. At a later time when either instance of the **greetStudent(..)** function is invoked, those variables are still there, holding their current values.

If JS functions did not have closure, the completion of each **lookupStudent(..)** call would immediately tear down its scope and garbage collect the **students** and **studentID** variables. The reasonalbe assumption if **greetStudent(..)** tried to acccess those variable would be **ReferenceError**.

But we don't get an error. The fact that the execution of **chosenStudents[0]("Hello")** works and returns message "Hello, Sarah!", means it was still able to access the **student** and **studentID** variables. This is direct observation of closure!

##### Pointed Closure

The **student => student.id == studentID** arrow function is creating another scope bubble inside the **greetStudent(..)** function scope.

<pre>
<code>
  var student = students.find(
    student => 
        // function scope: ORANGE(4)
        student.id == studentID
  );
</code>
</pre>

The **BLUE(2) studentID** reference is actually inside the **ORANGE(4)** scope rather than the **GREEN(3)** scope of **greetStudent(..);** also, the student parameter of the arrow function is **ORANGE(4)**, shadowing the **GREEN(3)** student.

This arrow function passed as a callback to the array's **find(..)** method which hold the closure over studentID, rather than **greetStudent(..)** holding the closure.

##### Adding Up Closures

Let's examine one of the cannonical examples often cited for closure:

<pre>
<code>
  function adder(num1) {
    return function addTo(num2) {
      return num1 + num2;
    };
  }
  
  var add10To = adder(10);
  var add42To = adder(42);

  add10To(15);    // 25
  add42To(9);     // 51 
</code>
</pre>

Each instance of the inner **addTo(..)** functions is closing over its own **num1** variable (with values 10 and 42, respectively), so those **num1's** don't go away just because **adder(..)** finishes. When we later invoke one of those inner **addTo()** intances, such as the **add10To(15)** call, its closed-over **num1** variable still exists and still holds the original **10** value. The operation is thus able to perform 10 + 15 and return the answer 25.

**Closure** is associated with an instance of a function, rather than its single lexical definition.<br>
Every time the outer **adder(..)** function runs, a **new inner addTo(..)** function instance is created, and for each new instance, a new **closure**. So each inner function instance (labeled **add10To(..)** and **add42To(..)** in our program) has its own **closure** over its own instance of the scope environment from the execution of **adder(..)**

> Note:
>
> Even though closure is based on lexical scope, which is handled at compile time, closure is observed as a runtime characterstic of fucntion instaces.

##### Live Link, Not a Snapshot

We **read the value from a variable** that was held in a closure which makes us feel like clouser might be a snapshot of a value at some given moment. Indeed, that's a common misconception.

**Closure** is actually a live link, preserving access to the full variable itself. By closing over a variable in a function, we can keep using that variable (read and write) as long as that function reference exists in the program and from anywhere we want to invoke that function.<br>
This is why closure is such a powerful technique used widely across many areas of programming!

![closure example](/assets/images/closure.png "Visualizing Closures")

As shown in figure, each call to **adder(..)** creates a new **Blue(2)** scope containing a **num1** variable, as well as a new instance of **addTo(..)** function as a **GREEN(3)** scope. Function instances(**addTo10(..)** and **addTo42(..)**) are present in and invoked from the **RED(1)** scope.

<pre>
<code>
  function makeCounter() {
    var count = 0;
    
    return getCurrent() {
      count = count + 1;
      return count;
    };
  }

  var hits = makeCounter();

  // later

  hits()    // 1

  // later
  
  hits()    // 2
  hits()    // 3
</code>
</pre>

The **count** variable is closed over by the inner **getCurrent()** function, which keeps it around instead of it being subjected to garbage collect. The **hits()** funtion calls access and update variable, returning an incrementing count each time.

Though the enclosing scope of a closure is typically from a function, that's not actually required; there only needs to be inner function present inside an outer scope.

<pre>
<code>
  var hits;
  { // an outer scope (but not a  function)
    let count = 0;
    hits = function getCurrent(){
      count = count = 1;
      return count;
    };
  }
  hits();   // 1
  hits();   // 2
  hits();   // 3
</code>
</pre>

It's so common to mistake closure as value-oriented instead of variable-oriented. Consider:

<pre>
<code>
  var studentName = "Frank";

  var greeting = function hello() {
    // we are closing over `studentName`,
    // not "Frank"
    console.log(
      `Hello, ${ studentName }!`
    );
  }

  // later

  studentName = "Suzy";

  // later

  greeting();
  // Hello, Suzy!
</code>
</pre>

When student Name holds the value "Frank", the mistaken assumption is often that the closure will capture "Frank". But **greeting()** is closed over the variable **studentName**, not its **value**. Whenever **greeting()** is invoked, the current value of the variable is reflected.

The illustration of this mistake is defining functions inside a loop:

<pre>
<code>
  var keeps = [];
  
  for (var i = 0; i < 3; i++) {
    // storing function references in an 
    // array, so we don't need to 
    //consider asynchronus timing
    keeps[i] = function keepI(){
      // closure over `i`
      return i;
    };
  }

  keeps[0]();   // 3 -- Why!?
  keeps[1]();   // 3
  keeps[2]();   // 3
</code>
</pre>

We might have expected the **keeps\[0]()** invocation to retun 0, since that function was created during the first iteration of the loop when i was 0.

Each saved function returns 3, because by the end of the loop, the single **i** variable in the program has been assigned **3**. Each of the three functions in the **keeps array** do have individual closures, but they're all closed over that same shared **i** variable.

Of course, a single variable can only ever hold one value at any given moment. So if you want to preserve multiple values, you need a different variable for each.

Lets create a new variable for each iteration:

<pre>
<code>
  var keeps = [];

  for(var i = 0; i < 3; i++) {
    // new `j` created each iteration, 
    // which gets a copy of the value of 
    // `i` at this moment
    let j = i;

    // the `i` here isn't being closed over, so
    // it's fine to immediately use its current
    // value in each loop iteration
    keeps[i] = function keepEachJ(){
      // close over `j`, not `i`!
      return j;
    };
  }
  keeps[0]();   // 0
  keeps[1]();   // 1
  keeps[2]();   // 2
</code>
</pre>

Each function is now closed over a seperate variable from each iteration, even though all of them are named j. And each **j** gets a copy of the value **i** at that point in the loop iteration; that **j** never gets re-assigned. So all three functions now return their expected values: **0, 1, and 2!**

Passing each inner **keepEachJ()** function into **setTimeout(..)** or some event handler subscription, the same kind of closure behavior would still be observed.

<pre>
<code>
  var keeps = [];

  for (let i = 0; i < 3; i++) {
    // the `let i` gives a new `i` for
    // each iteration, automatically!
    keeps[i] = function keepEachI() {
      return i;
    };
  }
  keeps[0]();   // 0
  keeps[1]();   // 1
  keeps[2]();   // 2
</code>
</pre>

Since we're using let, three i's are created, one for each loop, so each of the three closures just work as expected.

##### Common Closures: Ajax and Events

Closure is most commonly encountered with callbacks:

<pre>
<code>
  function lookupStudentRecord(studentID) {
    ajax(
      `https://some.api/student/${ studentID }`,
      function onRecord(record) {
        console.log(
          `${ record.name } (${ studentID })`
        );
      }
    );
  }
  lookupStudentRecord(114);
  // Frank (114)
</code>
</pre>

The **onRecord(..) callback** is going to be invoked at some point in the future, after the response from the **Ajax** call comes back. This invocation will happen from the internals of the **ajax(..)** utility, wherever that comes from. When that happens, the **lookupStudentRecord(..)** call will long since have completed.

Why then is **studentID** still around and accessible to the callback? **Closure**.

Event handlers are another common usage of closure:

<pre>
<code>
  function listenForClicks(btn, label) {
    btn.addEventListener("click", function onClick(){
      console.log(
        `The ${ label } button was clicked!`
      );
    });
  }
  
  var submitBtn = document.getElementById("submit-btn");

  listenForClicks(submitBtn, "Checkout");
</code>
</pre>

The **label** parameter is closed over by the **onClick(..)** event handler callback. When the button is clicked, **label** still exists to be used. This is **closure**.

##### What If I Can't See It?

If a closure exists but it cannot be observed in our programs, **does it matter? No.**

For example, invoking a function that makes use of lexical scope lookup:

<pre>
<code>
  function say(myName) {
    var greeting = "Hello";
    output();

    function output() {
      console.log(
        `${ greeting }, ${ myName }!`
      );
    }
  }

  say("Kyle");
  //  Hello, kyle!
</code>
</pre>

The inner function **output()** accesses the variables **greeting** and **myName** from its enclosing scope. But the invocation of **output()** happens in that same scope, where of course **greeting** and **myName** are still available; that's just **lexical scope**, not **closure**.

Global scope variables essentially cannot be closed over, because they're always accessible from everywhere. No function can ever be invoked in any part of the scope chain that is not a descendant of the global scope.

Consider:

<pre>
<code>
  var students = [
    { id: 14, name: "Kyle" },
    { id: 73, name: "Suzy" },
    { id: 112, name: "Frank" },
    { id: 6, name: "Sarah" }
  ];

  function getFirstStudent() {
    return function firstStudent() {
      return students[0].name;
    };
  }

  var student = getFirstStudent();

  student();
  // Kyle
</code>
</pre>

The inner **firstStudent()** function does reference **students**, which is a variable outside its own scope. But since **stuents** happens to be from global scope, no matter where that function is invoked in the program, its ability to access **students** is nothing more special than normal **lexical scope**.

Variables that are merely present but never accessed don't result in closure:

<pre>
<code>
  function lookupStudent(studentID) {
    return function nobody(){
      var msg = "Nobody's here yet.";
      console.log(msg);
    };
  }

  var student = lookupStudent(112);

  student();
  // Nobody's here yet.
</code>
</pre>

The inner function **nobody()** doesn't close over any outer variables - it only uses its own variable **msg**. Even though **studentID** is present in the enclosing scope, **studentID** is not referred to by **nobody()**.

Whether JS functions support closure or not, this program behave the same. Therefore, no observed closure here.

If there's no function invocation, closure can't be observed:

<pre>
<code>
  function greetStudent(studentName) {
    return function greeting() {
      console.log(
        `Hello, ${ studentName }!`
      );
    };
  }

  greetStudent("Kyle");

  // nothing else happens
</code>
</pre>

The outer function definetly does get invoked. But inner function is the one that could have **closure**, and yet it's never invoked; the returned function here is just thrown away.

##### Observable Definition

We're now ready to define closure:

**Closure** is observed when a function uses **variables** from outer **scopes** even while running in a scope where those **variables** wouldn't be accessible.

The key parts of this definition are:

- Must be a function involved
- Must reference at least one variable from an outer scope
- Must be invoked in a different branch of the scope chain from the variables

We should look and plan for the direct, concrete effects closure has on our program behavior.

#### 2. The Closure Lifecycle and Garbage Collection (GC)

Since **closure** is inherently tied to a function instance, its closure over a variable lasts as long as there is still a reference to that function.

**Closure** can unexpectedly prevent the GC of a variable that you’re otherwise done with, which leads to run-away memory usage over time. That’s why it’s important to discard function references (and thus their closures) when they’re not needed anymore.

Consider:

<pre>
<code>
  function manageBtnClickEvents(btn) {
    var clickHandlers = [];

    return function listener(cb){
      if (cb) {
        let clickHandler = 
          function onClick(evt){
            console.log("clicked!")
            cb(evt);
          };
        clickHandlers.push(clickHandler);
        btn.addEventListener(
          "click",
          clickHandler
        );
      };
      else {
        //  passing no callback unsubscribes
        // all click handlers
        for (let handler of clickHandlers) {
          btn.removeEventListener(
            "click",
            handler
          );
        }
        clickHandlers = [];
      }
    };
  }

  // var mySubmitBtn = ..
  var onSubmit = manageBtnClickEvents(mySubmitBtn);

  onSubmit(function checkout(evt){
      // handle checkout
  });

  onSubmit(function trackAction(evt){
      // log action to analytics
  });

  // later, unsubscribe all handlers:
  onSubmit();
</code>
</pre>

In this program, the inner **onClick(..)** function holds a closure over the passed in **cb(the provided event callback).** That means the **checkout()** and **trackAction()** function expression references are held via **closure** (and cannot be GC) for as long as these event handlers are **subscribed**.

When we call **onSubmit()** with no input, all event handlers are unsubscribed, and the **clickHandlers** array is emptied. Once all click handler function references are discarded, the closures of **cb** references to **checkout()** and **trackAction()** are discarded.

When considering the overall health and efficiency of the program, unsubscribing an event handler when it’s no longer needed can be even more important than the initial subscription!

##### Per Variable or Per Scope?

Is the inner **onClick(..)** function closed over only **cb**, or is it also closed over **clickHandler**, **clickHandlers**, and **btn**?

Conceptually, **closure** is **per variable** rather than **per scope**. Ajax callbacks, even handlers, and all other fomrs of fucntion closures are typically assumed to close over only what they explicityly refrence.

But the reality is more complicated than that.

Another program to consider:

<pre>
<code>
  function manageStudentGrades(studentRecords) {
    var grades = studentRecords.map(getGrade);

    return addGrade;

    // ************************

    function getGrade(record){
      return record.grade;
    }

    function sortAndTrimGradesList() {
      // sort by grades, descending
      grades.sort(function desc(g1, g2){
        return g2 - g1;
      });

      // only keep the top 10 grades
      grades = grades.slice(0, 10);
    }

    function addGrade(newGrade) {
      grades.push(newGrade);
      sortAndTrimGradesList();
      return grades;
    }
  }

  var addNextGrade = manageStudentGrades([
    { id: 14, name: "Kyle", grade: 86 },
    { id: 73, name: "Suzy", grade: 87 },
    { id: 112, name: "Frank", grade: 75 },
    // ..many more records..
    { id: 6, name: "Sarah", grade: 91 }
  ]);

  // later

  addNextGrade(81);
  addNextGrade(68);
  // [ .., .., ... ]
</code>
</pre>

The outer function **manageStudentGrades(..)** takes a list of student records, and returns an **addGrade(..)** function reference, which we externally label **addNextGrade(..)**. Each time we call **addNextGrade(..)** with a new grade, we get back a current list of the top 10 grades, sorted numerically descending(**sortAndTrimGradesList()**).

From the end of the original **manageStudentGrades(..)** call, and between the multiple **addNextGrade(..)** calls, the **grades** variable is preserved inside **addGrade(..)** via closure; that's how the running list of top **grades** is mantained.

Thats not the only closure involve, however. **addGrade(..)** references **sortAndTrimGradesList**, that means it's also closed over that identifier, which happens to hold the reference to the **sortAndTrimGradesList()** function. That second inner function has to stay around so that addGrade(..) can keep calling it, which also means any variables it closes over stick around.

**getGrade** variable (and its function); is referenced in the outer scope of **manageStudentGrades(..)** in the **.map(getGrade)** call. But its not referenced in **addGrade(..)** or **sortAndTrimGradesList()**.

If **studentRecords** is closed over, the array of student records is never getting GC’d, which leads to this program holding onto a larger amount of memory than we might assume. But if we look closely again, none of the inner functions reference **studentRecords**.

According to the **per variable** definition of **closure**, since **getGrade** and **studentRecords** are not referenced by the inner functions, they’re not closed over. They should be freely available for **GC** right after the **manageStudentGrades(..)** call completes.

But how reliable is the observation as proof? Consider this program:

<pre>
<code>
  function storeStudentInfo(id, name, grade) {
    return function getInfo(whichValue){
      // warning:
      // using `eval(..)` is a bad idea!
      var val = eval(whichValue);
      return val;
    };
  }
  var info = storeStudentInfo(73, "Suzy", 87);

  info("name");
  // Suzy

  info("grade");
  // 87
</code>
</pre>

The inner function **getInfo(..)** is not explicitly closed over any of **id, name, or grade** variables. And yet, calls to **info(..)** seem to still be able to access the variables, use fo the **eval(..)** lexical scope cheat.

Many modern JS engine do apply an optimization that removes any variables from a closure scope that aren't explicitly referenced. However, as we see with **eval(..)**, there are situations where such an optimization cannot be applied, and the closure scope continues to contain all its original variables.

In cases where a variable holds a large value (like an object or array) and that variable is present in a closure scope, if we don't need that value anymore and don't want that memory held, it's safer to manually discard the value rather than relying on closure optimization/GC.

Let’s apply a fix to the earlier **manageStudentGrades(..)** example to ensure the potentially large array held in **studentRecords** is not caught up in a closure scope unnecessarily:

<pre>
<code>
  function manageStudentGrades(studentRecords) {
    var grades =  studentRecords.map(getGrade);

    // unset `studentRecords` to prevent unwanted
    // memory retention in the closure
    studentRecords = null;

    return addGrade;
    // ..
  }
</code>
</pre>

We're not removing **studentRecords** from the closure scope; that we cannot control. We're ensuring that even if **studentRecords** remains in the closure scope, that variable is no longer referencing the potentially large array of data; the array can be GC'd.

The takeaway: it's important to know where closures appear in our programs, and what variables are included. We should manage these closures carefully so we're only holding onto what's minimally needed and not wasting memory.

<!-- #### 3. An alternative Perspective

Let's recall a code example from earlier in this chapter.

<pre>
<code>
  // outer/global scope: RED(1)

  function adder(num1) {
    // function scope: Blue(2)

    return function addTo(num2) {
      // function scope: Green(3)

      return num1 + num2;
    };
  }

  var add10To = adder(10);
  var add42To = adder(42);

  add10To(15);     // 25
  add42To(9);     //51
</code>
</pre>

Our current perspective suggests that whatever a function is passed and invoked, closure preserves a hidden link back to the originl scope to facilitate the access to the closed-over variables.

![closure example](/assets/images/closure.png "Visualizing Closures")

But there's another way of thinking about closure, and more precisely the nature of functions being passed around.

This alternative model de-emphasizes "functions as first-class values," and instead embraces how functions (like all non-primitive values) are held by **reference in JS**, and assigned/passed by reference-copy.

Insted of thinking about the inner function instance of **addTo(..)** moving to the outer **RED(1)** scope via the **return** and assignment, we can envision that function instances actually just stay in place in their own scope environment, of course with their scope-chain. -->

#### 3. Why Closure?

Let's explore some ways it can improve the code structure and organization of an program.

Imagine we have a button on a page that when clicked, should retrieve and send some data via an Ajax request.<br>
Without using closure:

<pre>
<code>
  var APIendpoints = {
    studentIDs:
      "https://some.api/register-students",
      // ..
  };

  var data = {
    studentIDs: [14, 73, 112, 6],
    // ..
  };

  function makeRequest(evt) {
    var btn = evt.target;
    var recordKind = btn.dataset.kind;
    ajax(
      APIendpoints[recordKind],
      data[recordKind]
    );
  }

  // < button data-kind="studentIDs">
  //  Register Students
  // </ button>
  btn.addEventListner("click", makeRequest);
</code>
</pre>

The **makeRequest(..)** utility only receives an **evt** object from a click event. From there, it has to retrieve the **data-kind** attribute from the target button element, and use that value to lookup both a URL for the API endpoint as well as what data should be included in the AJAX request.

This works OK, but it’s unfortunate (inefficient, more confusing) that the event handler has to read a DOM attribute each time it’s fired.

<pre>
<code>
  var APIendpoints = {
    studentIDs:
      "https://some.api/register-students",
      // ..
  };

  var data = {
    studentIDs: [14, 73, 112, 6];
    // ..
  };

  function setupButtonHandler(btn) {
    var recordKind = btn.dataset.kind;
    btn.addEventListner(
      "click",
      function makeRequest(evt){
        ajax(
          APIendpoints[recordKind],
          data[recordKind]
        );
      }
    );
  }

  // < button data-kind="studentIDs">
  // Register Students
  // </ buttons>

  setupButtonHandler(btn);
</code>
</pre>

With the setupButtonHandler(..) approach, the data-kind attribute is retrieved once and assigned to the record-Kind variable at initial setup. recordKind is then closed over by the inner makeRequest(..) click handler, and its value is used on each event firing to look up the URL and data that should be sent.

**Closure** lets the inner **makeRequest()** function instance remember this variable and access whenever it's needed.

We could have looked up both the URL and data once, at setup:

<pre>
<code>
  function setupButtonHandler(btn) {
    var recordKind = btn.dataset.kind;
    var requestURL = APIendpoints[recordKind];
    var requestData = data[recordKind];

    btn.addEventListener(
      "click",
      function makeRequest(evt){
        ajax(requestURL, requestData);
      }
    );
  }
</code>
</pre>

Now **makeRequest(..)** is closed over requestURL and requestData, which is a little bit cleaner to understand, and
also slightly more performant.

We can further improve the preceding code:

<pre>
<code>
  function defineHandler(requestURL, requestData) {
    return function makeRequest(evt){
      ajax(requestURL, requestData);
    };
  }

  function setupButtonHandler(btn) {
    var recordKind = btn.dataset.kind;
    var handler = defineHandler(
      APIendpoints[recordKind],
      data[recordKind]
    );
    btn.addEventListener("click", handler);
  }
</code>
</pre>

The requestURL and requestData inputs are provided ahead of time, resulting in the makeRequest(..) partially applied function, which we locally label handler. When the event eventually fires, the final input (evt, even though it’s ignored) is passed to handler(), completing its inputs and triggering
the underlying Ajax request.

Behavior-wise, this program is pretty similar to the previous one, with the same type of closure. But by isolating the creation of makeRequest(..) in a separate utility (defineHandler(..)), we make that definition more reusable across the program. We also explicitly limit the closure scope to only the two variables needed.

#### 4. Closer to Closure

We explored two models for mentally tackling closure:

- **Observational**: Closure is a function instance remembering its outer variables even as that function is passed to and invoked in other scopes.

- **Implementational**: Closure is a function instance and its scope environment preserved in-place while any references to it are passed around and invoked from other scopes.

Summarizing the benifits to our programs:

- **Closure** can improve efficiency by allowing a function instance to remember previously determined information instead of having to compute it each time.

- **Closure** can improve code readability, bounding scope exposure by encapsulating variable(s) inside function instances, while still making sure the information in those variables is accessible for future use. The resultant narrower, more specialized function instances are cleaner to interact with, since the preserved information doesn’t need to be passed in every invocation.

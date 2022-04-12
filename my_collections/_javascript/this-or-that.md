---
layout: blogdetail
author: Milan Kaucha
title: this or That?
categories: this and Object Prototypes
excerpt_separator: <!--more-->
---

**this** keyword is a special identifier keyword that's automatically defined in the scope of every function.

<!--more-->

#### Why this?

Let's try to illustrate the motivation and utility of **this**:

<pre>
<code>
  function identify() {
    return this.name.toUpperCase();
  }

  function speak() {
    var greeting = "Hello, I'm" + identify.call( this );
    console.log(greeting);
  }

  var me = {
    name: "Kyle"
  };

  var you = {
    name: "Reader" 
  };

  identify.call(me);
  identify.call(you);

  speak.call(me);
  speak.call(you);
</code>
</pre>

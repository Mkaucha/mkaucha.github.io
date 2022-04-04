---
layout: blogdetail
author: Milan Kaucha
title: Application State with Vuex
categories: Vuejs
excerpt_separator: <!--more-->
---

Transferring data between sibling components can be easy, but imagine making a tree of components react to any change. We will need to trigger an event in an **event bus** or send the event through all the parent components until it reaches over the top of the event chain and then gets sent all the way down to desired component; this process can be very tedious and painful.

**Flux libraries** were developed to help with this process, with the idea of bringing the reactivity outside of the component bounds, as Vuex is capable of maintaining one single source of truth of our data and, at the same time, is the place for us to have our business rules.

#### 1. Simple Vuex Store

Creating a single source of truth in our application gives us the power to simplify the flow of our data, enabling the reactivity of the data to flow into another perspective, where we are not tied to a **parent-child** relationship anymore. The data can now be stored in a single place and everyone can fetch or request data.

##### How it works...

When we declare our **Vuex store**, we need to create three main properties:

- **state**
- **mutations**
- **actions**

These properties act as a single structure, bounded to the Vue application through **$store** injected prototype or the exported **store** variable.

A **state** is a centralized object that holds your information and makes it available to be used by **mutation, actions**, or the components. Changing the **state** always requires a **synchronous** function executed through a **mutation**.

A **mutation** is a **synchronus** function that can change the **state** and is traceable, so when developing, we can time travel through all the executed **mutations** in the Vuex store.

An **action** is an **asynchronus** function, which can be used to hold **business logic**, **API calls**, **dispatch** other **actions**, and execute **mutations**. Those functions are the common entrance point of any change in a Vuex store.

A simple representation of a **Vuex store**:

![vuex store diagram](/assets/images/vuex.png "Vuex Store")

The **Vuex** state is a single source of truth in our application, it works like a global data manager, and it should not be changed directly. This is because we need to prevent the **mutation** of data with a **concurrent** mutation of the same data. To avoid that, we always need to change our state through the **mutations**, because the function are synchronus and controlled by Vuex.

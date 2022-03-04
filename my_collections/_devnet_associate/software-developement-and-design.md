---
layout: devnet
author: Milan Kaucha
title: Software Development and Design
categories: Cisco DevNet Associates
excerpt_separator: <!--more-->
---

Software need to be build using a structure to give it sustainablity, manageabiliy, and coherency.

<!--more-->

#### 1. Software Development Lifecycle

In the world of software, the **Software Development Lifecycle (SDLC)** provides sanity by providing guidance on building sustaianable softwre packages. SDLC lays out a plan for building, fixing, replacing, and making alterations to software. SDLC lays out a plan for building, fixing, replacing, and making alterations to software.

These are the stages of the SDLC:

- **Stage 1 -- Planning**: Identify the current use case or problem the software is intended to solve. Get input from stakeholders, end users, and experts to determine what success looks like. This stage is also known as **requirements analysis**.

- **Stage 2 -- Defining**: This stage involves analyzing the functional specifications of the software - basically defining what the software is supposed to do.

- **Stage 3 -- Designing**: In this phase, you turn the software specifications into a design specification. This is a critical stage as stakeholders need to be in agreement in order to build the software appropriately.

- **Stage 4 -- Building**: Once the software design specification is complete, the programmers get to work on making it a reality. If the previous stages are completed successfully, this stage is often considered the easy part.

- **Stage 5 -- Testing**: In this stage, the programmers check for bugs and defects. The software is continually examined and tested until it successfully meets the original software specifications.

- **Stage 6 -- Deployment**: During this stage, the software is put into production for the end users to put it through its paces. Deployment is often initially done in a limited way to do any final tweaking or detect missed bugs. Once the user has accepted the software and it is in full production, this stage morphs into maintenance, where bug fixes and software tweaks or smaller changes are made at the request of the business user.

There are quite a few **SDLC** models that further refine the generic process just described. They all use the same core concepts but vary in terms of implementation and utility for different projects and teams.

The following are some of the most popular **SDLC** models:

- Waterfall
- Lean
- Agile
- Iterative model
- Spiral model
- V model
- Big Bang model
- Prototyping models

The following sections covers only **Waterfall, Lean and Agile**.

##### Waterfall

Waterfall, which is based on the construction industry approach, became one of the most popular **SDLC** approaches.

Waterfall is a serial approach to software development that is divided into phases:

1. **Requriements/analysis**: Software features and functionality needs are cataloged and assessed to determine the necessary capabilities of the software.

2. **Design**: The software architecture is defined and documented.

3. **Coding**: Software coding begins, based on the previously determined design.

4. **Testing**: The completed code is tested for quality and customer acceptance.

5. **Maintainance**: Bug fixes and patches are applied.

While this approach has worked successfully over the years, a number of shortcomings have become weaknesses in this approach.

**First**, the serial nature of Waterfall, while easy to understand, means that the scope of a software project is fixed at the design phase. In essence, the Waterfall approach does not handle change well at all. When you finally get to the coding phase of the application development process, you might learn that the feature you are building isn't needed anymore to discover a new way of accopmplishing a design goal; however, you cannot deviate from the predetermined architecture without redoing the analysis and design.

The **second** aspect of Waterfall that is challenging is that value is not achieved until the end of whole process. With the waterfall approach, even if you are halfway done with a project, you still have no usable code or value to show to the business.

The **third** aspect of Waterfall that is challenging is quality. When software developers run out of time, testing often suffers or is sacrificed in the name of getting the project out the door.

The three challenges for Waterfall led to the development of a new way of creating software that was faster, better, and more adaptive to a rapidly changing environment.

##### Lean

**The Toyota Production System (TPS)** was the start of the more generalized Lean manufacturing approach that was introduced to the Western world. **TPS** management and manufacturing process focuses on the following important concepts:

1. **Elimination of waste**: If something doesn't add value to the final product, get rid of it. There is no room for wasted work.

2. **Just-in-time**: Don't build something until the customer is ready to buy it. Excess inventory wastes resources.

3. **Continuous improvement (Kizan)**: Always improve processes with lessons learned and communication.

**Lean** led to **Agile** software development, which has served as a lightning rod of change for IT operations.

##### Agile

Agile is an application of Lean principles to software development. With Agile, all the lessons learned in optimizing manufacturing process have been applied to the discipline of creating software.

With the use of existing software development practices resulting; missing deadlines, endless documentation, and the inflexibility, Agile pioneers created the **"Manifesto for Agile Software"**, which codifies the guiding principles for Agile development practices. The following **12 principles are the core of the Agile Manifesto**:

1. Customer satisfaction is provided through early and continuous delivery of valuable software.

2. Changing requirements, even in late development, are welcome.

3. Working software is delivered frequently (in weeks rather than months).

4. The process depends on close, daily cooperation between stakeholders and developers.

5. Projects are built around motivated individuals, who should be trusted.

6. Face-to-face conversation is the best form of communication(co-location).

7. Working software is the principal measure of progress.

8. Sustainable development requires being able to maintain a constant pace.

9. Continous attention is paid to technical excellence and good design.

10. Simplicity -- the art of maximizing the amount of work not done -- is essential.

11. The best architecture, requirements, and designs emerge from organizing teams.

12. A team regularly reflects on how to become more effective and adjusts accordingly.

Developing software through Agile results in very different output than the slow serial manner used with Waterfall. **With Waterfall**, a project is not "finished" and deployable until end. **With Agile**, the time frame is changed: Agile uses smaller time increments (often 2 weeks), or "sprints," that encompass the full process of analysis, design, code, and test but on a much smaller aspect of an application. The goal is to finish a feature or capability for each sprint, resuting in a potentially shippable incremental piece of software. Therefore, with Agile, if you are 40% finished with a project, you have 100% usable code.

By leveraging Agile, you can keep adding value immediately and nimbly adapt to change. If a new capability is needed in the software, or if a feature that was planned is determined to no longer be necessary, the project can pivot quickly and make those adjustments.

#### 2. Common Design Pattern

Many common design paradigms have already been created, and you can reuse them in your software project. These design patterns make you faster and provide tried-and-true solutions that have been tested and refined.

The following sections introduce a couple of design patterns that are really useful for network automation projects: the **Model-View-Controller (MVC)** and **Observer** patterns.

##### Model-View-Controller (MVC) Pattern

The **Model-View-Controller (MVC)** pattern was one of the first design patterns to leverage the seperation of concerns (SoC) principle. The SoC principle is used to decouple an application's interdependencies and functions from its other parts.The goal is to make the various layers of the application—such as **data access, business logic, and presentation (to the end user) modular**. This modularity makes the application easier to construct and maintain while also allowing the flexibility to make changes or additions to business logic.

The classical **MVC pattern** has three main parts:

- **Model**: The model is responsible for retrieving and manipulating data. It conducts all data operations, such as select, insert, update, and delete operations. The model receives instructions from the controller.

- **View**: The view is what the end users see on the devices they are using to interact with the program. It can be tailored to any device and any representation without changin any business logic of the model. The view communicates with controller by sending data or recieving output from the model through the controller. The view's primary function is to render data.

- **Controller**: The controller is the intermediary between what the user sees and the backend logic that manipulates the data. The role of the controller is to receive requests from the user via the view and pass those request on to the model and its underlying data store.

##### Observer Pattern

The Observer pattern was created to address the problem of sharing information between one object to many other object. This type of pattern describes a very useful behavior for distributed systems that need to share configuration information or details on changes as they happen. The Observer pattern consists of only two logical components.

- **Subject**: The subject refers to the object state being observed - in other words, the data that is to be synchronized. The subject has a registration process that allows other components of an application or even remote system to subscribe to the process. Once registered, a subscriber is sent an update notification whenever there is a change in the subject's data so that the remote systems can synchronize.

- **Observer**: The observer is the component that registers with the subject to allow the subject to be aware of the observer and how to communicate to it. The only function of the observer is to synchronize its data with the subject when called. The key thing to understand is Observer does not use a pooling process and Updates are push only.

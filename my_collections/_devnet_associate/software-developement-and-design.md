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

- ##### Waterfall

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

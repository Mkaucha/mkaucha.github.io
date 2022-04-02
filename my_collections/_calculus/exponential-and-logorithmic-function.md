---
layout: blogdetail
author: Milan Kaucha
title: Exponential and Logarithmic Functions
categories: Calculus
excerpt_separator: <!--more-->
---

By the early 1600s, atronomy had progressed to the point of finding accurate information about the motion of the heavenly bodies.

In making the accurate measurements needed in astronomy and navigation, many lengthy calculations had to be performed, and all such calculations had to be done by hand.

Noting that astronomers’ calculations usually involved sines of angles, John Napier ­(1550–1617), a Scottish mathematician,constructed a table of values that allowed multiplication of these sines by addition of values from the table. These tables of logarithms first appeared in 1614. Therefore, logarithms were essentially invented to make multiplications by means of addition, thereby making them easier.

Napier’s logarithms were not in base 10, and the English mathematician Henry Briggs ­(1561–1631) realized that logarithms in base 10 would make the calculations even easier. He spent many years laboriously developing a table of base 10 logarithms, which was not completed until after his death.

Although logarithms are no longer used directly for calculations, they are of great importance in many scientific and technical applications and in advanced mathematics. For example, they are used to measure the intensity of sound, the intensity of earthquakes, the power gains and losses in electrical transmission lines, and to distinguish between a base and an acid. Exponential functions are used in electronics, mechanical systems, thermodynamics, nuclear physics, biology in studying population growth, and in business to calculate compound interest.

#### 1. Exponential Functions

Any rational number can be used as an exponent. Now letting **the exponent be a variable**, we dfine the **exponential function** as

<pre>
<code>
  y =  b<sup>x</sup>
</code>
</pre>

where **b > 0**, **b ≠ 1**, and **x** is any real number. The number **b** is called the **base**.

For an exponential function, we use only real numbers. Therefore, **b > 0**, because if **b** were negative and **x** were a functional exponent with an even-number denominator, **y** would be imaginary. Also, **b ≠ 1**, since 1 to any real power is 1 (y would be constant)

###### EXAMPLE 1 : Exponential funtions

From the definition, **y = 3<sup>x</sup>** is an exponential function, but **y = (-3)<sup>x</sup>** is not because the base is negative.

However, **y = -3<sup>x</sup>** is an exponential function, because it is **-1** times **3<sup>x</sup>**, and any real-number multiple of an exponential function is also an exponential function.

Also, **y = (√3)<sup>x</sup>** is an exponential function since it can be written as **y = 3<sup>x/2</sup>**. As long as **x** is a real number, so is **x/2**. Therefore, the exponent of **3** is real.<br>
The function **y = 3<sup>-x</sup>** is an exponential function. If **x** is real, so is **-x**.<br>
Other exponential functions are: **y = -2(8<sup>-0.55x</sup>)** and **y = 35(1.0001)<sup>x</sup>**.

> Features:
>
> **y = b<sup>x</sup>**
>
> The doamin is all values of **x**; the range is **y > 0**.
>
> The **x-axis** is an aymptote of the graph.
>
> As **x** increases, **b<sup>x</sup>** increses if **b > 1**, and **b<sup>x</sup>** decreases if **b < 1**.

#### 2. Logarithmic Functions

For many uses in mathematics and for many applications, it is necessary to express the exponent **x** in the exponential function **y = b<sup>x</sup>** in terms of **y** and the base **b**. This is done by defining a **logarithm**.<br>
Therefore, if **y = b<sup>x</sup>**, the exponent **x** is the **logarithm** of the number **y** to the base **b**.

<pre>
<code>
  if y = b<sup>x</sup>, then x = log<sub>b</sub>y.
</code>
</pre>

This means that **x** is the power to which the base **b** must be raised in order to equal the number **y**. That is, **x** is a logarithm, and **a logarithm is an exponent**. As with the exponential function, for the equation **x = log<sub>b</sub>y**, **x** may be any real number, **b** is a positive number other than 1, and **y** is a positive real number.

**y = b<sup>x</sup>** is the **exponential form**, and **x = log<sub>b</sub>y** is the **logarithmic form**

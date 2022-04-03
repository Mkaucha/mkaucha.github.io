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

###### <u>EXAMPLE 1 : Exponential funtions</u>

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

###### <u>EXAMPLE 1 : Exponential form and logarithmic form</u>

The equation **y = 2<sup>x</sup>** is written as **x = log<sub>2</sub>y** when written in logarithmic form.<br>
When we choose values of y to find the corresponding values of x from this equation. We ask ourselves **"2 raised to what power x gives y?"**

This means that if **y=8**, we ask **"What power of 2 gives us 8?"**<br>
Then knowing that **2<sup>3</sup> = 8**, we know that **x = 3**. Therefore, **3 = log<sub>2</sub>8**.

###### <u>EXAMPLE 2 : Changing to logarithmic form</u>

3<sup>2</sup> = 9 in logarithmic form is 2 = log<sub>3</sub>9.
4<sup>-1</sup> = 1/4 in logarithmic form is -1 = log<sub>4</sub>(1/4).

> Note:
>
> Remember, the exponent may be negative. The base must be positive.

###### <u>EXAMPLE 3 : Evaluating by changing form</u>

- find b given that -4 = log<sub>b</sub>(1/81).

  Writing this in exponential form, we have<br>
  1/81 = b<sup>-4</sup>. Thus, 1/81 = 1/b<sup>4</sup>or 1/3<sup>4</sup><br>
  Therefore, b = 3.

> Note:
>
> In order to change a function of form **y = ab<sup>x</sup>** into logarithmic form; we must first write it as **y/a = b<sup>x</sup>**. The coefficient of **b<sup>x</sup>** must be equal to 1. In the same way, the coefficient of **log<sub>b</sub>y** must be 1 in order to change it into exponential form.

##### THE LOGARITHMIC FUNCTION

When we are working with functions, we must keep in mind that a function is defined by the operation being performed on the independent variable, and not by the letter chosen to represent it.<br>
However, for consistency, it is standard practice to let **y** represent the dependent variable and **x** represent the independent variable. Therefore, the **logarithmic function is**

<pre>
<code>
  y = log<sub>b</sub>x

  As with the exponential function, b > 0 and b ≠ 1.
</code>
</pre>

###### <u>EXAMPLE 4 : Logarithmic function</u>

For logarithmic function **y = log<sub>2</sub>x**.

if x = 16, y = log<sub>2</sub>16, which means that y = 4, because 2<sup>4</sub> = 16.

if x = 1/16, y = log<sub>2</sub>(1/16), which means that y = -4, because 2<sup>-4</sup> = 1/16.

> Features:
>
> The domain is **x > 0;** the range is all values of **y**.
>
> The negative y-axis is an asymptote of the graph of **y = log<sub>b</sub>x**.
>
> If 0 < x < 1, log<sub>b</sub>x < 0;<br> if x = 1, log<sub>b</sub>x = 0;<br> if x > 1, log<sub>b</sub>x > 0.
>
> if **x > 1**, x increases more rapidly than **log<sub>b</sub>x**.

##### INVERSE FUNCTIONS

For the exponential function **y = b<sup>x</sup>** and the logarithmic function **y = log<sub>b</sub>x**.<br>
If we solve for the independent variable in one of the functions by changing the form, then interchange the variables, we obtain the other function. Such functions are called **inverse functions**.

This means that the x- and y-coordinates of inverse functions are interchanged. As a result, the graphs of inverse functions are mirror images of each other across the line y = x.

###### <u>EXAMPLE 5 : Inverse functions</u>

The functions **y = 2<sup>x</sup>** and **y = log<sub>2</sub>x** are inverse functions.

Writing **y = 2<sup>x</sup>** in logarithmic form gives us **x = log<sub>2</sub>y**. Then interchanging x and y, we have **y = log<sub>2</sub>x**, which is the inverse function.

> Note:
>
> For a function to have an inverse function, there must be only one x for each y. This is true for **y = b<sup>x</sup>** and **y = log<sub>b</sub>x**.

#### 3. Properties of Logarithms

Because a logarithm is an exponent, it must follow the laws of exponents.

> Properties:
>
> b<sup>u</sup>b<sup>v</sup> = b<sup>u+v</sup>
>
> b<sup>u</sup>/b<sup>v</sup> = b<sup>u-v</sup>
>
> (b<sup>u</sup>)<sup>n</sup> = b<sup>nu</sup>

###### <u>EXAMPLE 1 : Sum of logarithms for product</u>

We know that 8 \* 16 = 128. Writing these numbers as powers of 2, we have<br>
8 = 2<sup>3</sup> &nbsp;&nbsp;&nbsp;&nbsp;16 = 2<sup>4</sup> &nbsp;&nbsp;&nbsp;&nbsp;128 = 2<sup>7</sup> = 2<sup>3+4</sup><br>
The logarithmic forms can be written as<br>
3 = log<sub>2</sub>8 &nbsp;&nbsp;&nbsp;&nbsp;4 = log<sub>2</sub>16 &nbsp;&nbsp;&nbsp;&nbsp;3 + 4 = log<sub>2</sub>128<br>
where<br>
8 \* 16 = 128

The **sum of the logarithms of 8 and 16 equals logarithm of 128**, where the product of 8 and 16 equals 128.

Following Example 1, if we let **u = log<sub>b</sub>x** and **v = log<sub>b</sub>y** and write these equation in exponential form, we have, **x = b<sup>u</sup>** and **y = b<sup>v</sup>**. Therefore, forming the product of **x** and **y**, we obtain

<pre>
<code>
  xy = b<sup>u</sup>b<sup>v</sup> = b<sup>u+v</sup> or xy = b<sup>u+v</sup>

  Writing in logarithmic form yields
    u + v = log<sub>b</sub>xy

  This means the <strong>logarithm of a product</strong> can be written as
    log<sub>b</sub>xy = log<sub>b</sub>x + log<sub>b</sub>y
</code>
</pre>

**This states the property that the logarithm of the product of two numbers is equal to the sum of the logarithms of the numbers**.

Using the same definitions of u and v to form the quotient of x and y, we have

<pre>
<code>
  x / y = b<sup>u</sup> / b<sup>v</sup> or x / y = b<sup>u-v</sup>
  
  Writing in logarithmic form yields

  u - v = log<sub>b</sub>(x / y)

  Therefore, the <strong>logarithmic of a quotient</strong> is given by
    log<sub>b</sub>(x \ y) = log<sub>b</sub>x - log<sub>b</sub>y
</code>
</pre>

**This states the property that the logarithm of the quotient of two numbers is equal to the sum of the logarithms of the numerator minux the logarithm of the denominator**.

If we again let **u = log<sub>b</sub>x** and write this in exponential form, we have **x = b<sup>u</sup>**. To find the nth power of x, we write

<pre>
<code>
  x<sup>n</sup> = (b<sup>u</sup>)<sup>n</sup> = b<sup>nu</sup>

  Expressing this equation in logarithmic form yields
  nu = log<sub>b</sub>(x<sup>n</sup>).

  the <strong>logarithm of a power</strong> is given by
    log<sub>b</sub>(x<sup>n</sup>) = n log<sub>b</sub>x
</code>
</pre>

**This states the property that the logarithm of the nth of a number is equal to the n times the logarithm of the number**.

The exponent **n** may be any real number, which, of course,includes all rational and irrational numbers.

###### <u> Example 2 : Logarithms of product, quotient, power</u>

1. log<sub>4</sub>15 = log<sub>4</sub>(3 \* 5) = log<sub>4</sub>3 + log<sub>4</sub>5

2. log<sub>4</sub>(5 / 3) = log<sub>4</sub>5 - log<sub>4</sub>3

3. log<sub>4</sub>(t<sup>2</sup>) = 2 log<sub>4</sub>t

4. log<sub>4</sub>(xy / z) = log<sub>4</sub>(xy) - log<sub>4</sub>z = log<sub>4</sub>x + log<sub>4</sub>y - log<sub>4</sub>z

###### <u>EXAMPLE 3 : Sum or difference of logarithms as a single quantity</u>

1. log<sub>4</sub>3 + log<sub>4</sub>x = log<sub>4</sub>3x

2. log<sub>4</sub>3 - log<sub>4</sub>x = log<sub>4</sub>(3 / x)

3. log<sub>4</sub>3 - 2log<sub>4</sub>x = log<sub>4</sub>3 + log<sub>4</sub>(x<sup>2</sup>) = log<sub>4</sub>3x<sup>2</sup>

4. log<sub>4</sub>3 + 2log<sub>4</sub>x - log<sub>4</sub>y = log<sub>4</sub>(3x<sup>2</sup> / y)

> Note:
>
> log<sub>b</sub>1 = 0 &nbsp;&nbsp;&nbsp;&nbsp; log<sub>b</sub>b = 1
>
> log<sub>b</sub>(b<sup>x</sup>) = x
>
> b<sup>log<sub>b</sub>x</sup> = x

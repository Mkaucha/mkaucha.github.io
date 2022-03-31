---
layout: blogdetail
author: Milan Kaucha
title: Advance DDL and DML
categories: SQL and Relational Database
excerpt_separator: <!--more-->
---

<!--more-->

#### 1. String Patterns, Range and Sets

###### Retrieving rows using a string pattern

<pre>
<code>
  SELECT firstname FROM author WHERE firstname like 'R%'
</code>
</pre>

If we can't remember the name of author, but we remember that their firstname starts with R, we use WHERE clause with the **LIKE** predicate. The **LIKE** predicate is used in a WHERE clause to search for a pattern in a column.<br>
The **percentage** sign is used to define missing letters. The **percentage** sign can be placed before the pattern, after the pattern or both before and after pattern. The percentage sign is called **wild card** character. It is used to substitute other characters.

###### Retrieving rows using a range

<pre>
<code>
  SELECT title, pages FROM book WHERE pages >= 290 AND pages <= 300

  # Instead, we can use a range of numbers to specify same condition.
  SELECT title, pages FROM book WHERE pages BETWEEN 290 AND 300
</code>
</pre>

###### Retrieving rows using set of values

<pre>
<code>
  SELECT firstname, lastname, country FROM author WHERE country = 'AU' OR country = 'BR'

  # Instead, we can use set of values to specify same condition
  SELCET furstname, lastname, country FROM author WHERE country IN ('AU', 'BR')
</code>
</pre>

#### 2. Sorting Result Sets

To dislay the result set in alphabetical order we use the **ORDER BY** clause.

<pre>
<code>
  SELECT title FROM book

  SELECT title FROM book ORDER BY title
</code>
</pre>

To sort in descending order, we use keyword **DESC** .

<pre>
<code>
  SELECT title FROM book ORDER BY title DESC
</code>
</pre>

A Way to specifying the sort column is to indicate the column sequence number.

<pre>
<code>
  SELCET title, pages FROM book ORDER BY 2
</code>
</pre>

We indicate the column sequence number in the query for the sorting order. In this case second column is specified in the column list which is **"Pages"**. So, the sort order is based on the values in the **Pages** column.

#### 3. Grouping Results Set

<pre>
<code>
  SELECT country FROM author ORDER BY 1

  # To eliminate duplicate country use DISTINCT clause
  SELECT DISTINCT(country) FROM author
</code>
</pre>

To display the result set listing the country and number of authors that come from that country.

<pre>
<code>
  # It will create column name 2 for count(country)
  SELECT country, count(country) FROM author GROUP BY country

  # To change column name 2 into count for count(country) we can use AS
  SELECT country, count(country) AS count FROM author GROUP BY country
</code>
</pre>

We can restrict the above result set with **HAVING** clause.

> Note:
>
> **WHERE** clause is for the entire result set, but the **HAVING** clause works only with the **GROUP BY** clause.

To check if there are more than 4 authors form the same country.

<pre>
<code>
  SELECT country, count(country) AS count FROM author GROUP BY country HAVING count(country) > 4
</code>
</pre>

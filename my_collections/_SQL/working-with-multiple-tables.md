---
layout: blogdetail
author: Milan Kaucha
title: Working with Multiple Tables
categories: SQL and Relational Database
excerpt_separator: <!--more-->
---

The next level complexity is retrieving data from two or more tables. To combine data from two tables, we use the **JOIN** operator.

A **JOIN** combines the rows from two or more tables based on relationship between certain columns in these table. We can extract a data set corresponding to the intersection of the two tables involved or we can choose a target data set. We can go up to the point of selecting the combination of all the data from those two tables.

<!--more-->

There are two types of table joins:

- INNER JOIN
- OUTER JOIN

#### 1. Inner Join

An **INNER JOIN** matches the results from two tables and display only the result set that matches the criteria specified in the query. An **INNER JOIN** returns only the rows that matches.

**Using alias is much easier than rewritting whole table name.**

<pre>
<code>
  SELECT B.BORROWER_ID, B.LASTNAME, B.COUNTRY, L.BORROWER_ID, L.LOAN_DATE 
  FROM BORROWER B INNER JOIN LOAN L 
  ON B.BORROWER_ID = L.BORROWER_ID
</code>
</pre>

###### Joining three tables

<pre>
<code>
  SELECT B.LASTNAME, L.COPY_ID, C.STATUS 
  FROM BORROWER B
  INNER JOIN LOAN L 
  ON B.BORROWER_ID = L.BORROWER_ID
  INNER JOIN COPY C
  ON L.COPY_ID = C.COPY_ID  
</code>
</pre>

#### 2. LEFT OUTER JOIN (LEFT JOIN)

In an **OUTER JOIN** first table specified in the **FORM** clause of SQL statement is reffered to as **LEFT** table and remaining table is reffered to as the **RIGHT** table.

A **LEFT JOIN** matches the results from two tables and display all the rows from the left table, and combines the information with rows from the right table that matches the criteria specified in the query.

<pre>
<code>
  SELECT B.BORROWER_ID, B.LASTNAME, B.COUNTRY, L.BORROWER_ID, L.LOAN_DATE
  FROM BORROWER B
  LEFT JOIN LOAN L
  ON B.BORROWER_ID = L.BORROWER_ID
</code>
</pre>

#### 3. RIGHT OUTER JOIN (RIGHT JOIN)

A **RIGHT JOIN** matches the results from two tables and displays all the rows from the right table, and combines the information with rows from the left table that matches the criteria specified in the query.

<pre>
<code>
  SELECT B.BORROWER_ID, B.LASTNAME, B.COUNTRY, L.BORROWER_ID, L.LOAN_DATE
  FROM BORROWER B
  RIGHT JOIN LOAN L
  ON B.BORROWER_ID = L.BORROWER_ID
</code>
</pre>

#### 4. FULL OUTER JOIN (FULL JOIN)

The **FULL JOIN** keyword returns all rows from both table; all rows from the left table and all rows from right table

<pre>
<code>
  SELECT B.BORROWER_ID, B.LASTNAME, L.BORROWER_ID, L.LOAN_DATE
  FROM BORROWER B
  FULL JOIN LOAN L
  ON B.BORROWER_ID = L.BORROWER_ID
</code>
</pre>

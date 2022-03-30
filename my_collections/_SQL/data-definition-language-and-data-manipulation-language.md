---
layout: blogdetail
author: Milan Kaucha
title: Data Definition Language and Data Manipulation Language
categories: SQL and Relational Database
excerpt_separator: <!--more-->
---

**DDL (Data Definition Language)** statements are used to define, change or drop database objects such as tables.<br>
**DML (Data Manipulation Language)** statements are used to read and modify data in tables.

<!--more-->

Common DDL satement type includes:

- CREATE: which is used for creating tables and defining columns.
- ALTER: which is used for altering tables including, adding and droping columns and modifying their datatypes.
- TURNCATE: is used for deleting data in table but not the table itself.
- DROP: is used for deleting tables.

Common DML statement types include:

- INSERT: is used for inserting a row or several rows of data into a table;
- SELECT: reads or selects row or rows from a table;
- UPDATE: edits row or rows in a table;
- DELETE: removes a row or rows of data from a table.

#### 1. CREATE TABLE statement

**CREATE TABLE** statement is one of the DDL statement. This statement is used to create database objects.

<pre>
<code>
  // Syntax
  CREATE TALBE  table_name
    (
      column_name_1 datatype optional_parameter,
      column_name_2 datatype,
      
      ...

      column_name_n datatype
    )

  CREATE TABLE author
    (
      author_id CHAR(2) PRIMARY KEY NOT NULL,
      lastname VARCHAR(15) NOT NULL,
      firstname VARCHAR(15) NOT NULL,
      email VARCHAR(40),
      city VARCHAR(15),
      Country CHAR(2)
    )
</code>
</pre>

Author table is created using **CREATE TABLE** statement. **CHAR** is character string of fixed length. **VARCHAR** is character string of variable length.<br>

> Note:
>
> **Author_ID** is the primary key, this constraint prevents duplicate values in table.

#### 2. INSERT statement

**INSERT statement** is one of the DML statements.

<pre>
<code>
  // Syntax
  INSERT INTO table_name
    ([columnName], ....)
    VALUES ([Value], ...)
  
  INSERT INTO author
  (author_id, lastname, firstname, email, city, country)
  VALUES
  ('A1', 'CHONG', 'RAUL', 'RFC@IBM.com', 'Toronto', 'CA')
</code>
</pre>

Column Names should be equal to the number of values provide. Multiple rows can be inserted by specifying each row in the values clause. Each row is seperated by comma.

#### 3. SELECT statement

**SELECT statement** is one of the DML staetment. This statement is called **query** and the output we get from executing query is called a **Result Set**.

<pre>
<code>
  // Syntax
  SELECT * FROM table_name

  // In this case only the two columns are displayed.
  SELECT book_id, title FROM book

  // The WHERE clause always requires a predicate.
  SELECT book_id FROM book WHERE book_id = 'B1'
</code>
</pre>

A predicate is a condition that evaluates to true, false or unknown. It is used in the search condition of the **WHERE** clause

#### 4. UDATE and DELETE statements

**UPDATE statement** is one of the DML statement. To alter or modify data in the table we use **UPDATE statement**.

**DELETE statement** is one of DML statement. To remove one or more rows from table we use this statement.

<pre>
<code>
  // Syntax
  UPDATE table_name
  SET [ColumnName] = [Value]
  WHERE [condition]

  UPDATE author 
    SET lastname = 'Katta', firstname = 'Lakshmi' 
    WHERE author_id = 'A2'

  // Syntax
  DELETE FROM table_name
  WHERE [condition]

  DELETE FROM author
  WHERE author_id in ('A1', 'A3')
</code>
</pre>

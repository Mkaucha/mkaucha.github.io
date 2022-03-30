---
layout: blogdetail
author: Milan Kaucha
title: SQL and Relational Database
categories: SQL and Relational Database
excerpt_separator: <!--more-->
---

**SQL(Structured Query Language)** is a language used for realational databases to query or get data out of a database. Data is a collection of facts in the form of numbers, words or even pictures. It needs to be stored, secured and accesed quickly.

**Database** is a repository of data. It provides functionality for adding, modifying and quering the data. Data stored in a tabular form is a relational database. A set of software tools for the data in the database is called a database management system.

**RDMS(Relational Database Management System)** is a set of software tools that controls the data, such as access, organize and store. Example: MySQL, Oracle, DB2 Express-C

<!--more-->

##### Basic SQL commands

- Create a table
- Insert
- Select
- Update
- Delete

#### 1. Information and Data Models

![information and data model](/assets/images/info_data_model.png "Information and Data Model Concept")
_fig: Information and data model concept_

An **information model** is an abstract, formal representation of entities that includes their properties, relationships and operations that can be performed on them. An information model is at the conceptual level and defines relationships between objects.

**Data models** are defined at concrete level, are specific and include details. It is the blueprint of any database system.

![hierarchical model](/assets/images/hierarchical.png "Hierarchical Model")
_fig: A type of Information Model(hierarchical Model)_

**Relataional Model** is the most used **data model**. Data is stored in a simple data structure, **tables**. This provide logical data independence, physical data dependence and physical storage independence.

An **Entity-Relationship Data Model** is an alternative to a relational data model. An **ER model** is used as tools to design relational databases. In ER model, entities are objects that exist independently.

The building block of an **ER diagram** are **entities** and **attributes**. Entities have attribute which are data elements that characterize the entity. An entity is drawn as a rectangle and attributes are drawn ovals.

![ER diagram](/assets/images/er_diagram.png "ER diagram")
_fig: ER-diagram of book entity_

##### Types of Relation

Building blocks of a relationships are:

![Building Blocks](/assets/images/building_blocks.png "Building Blocks of Relationship")
_fig: Building Blocks of Relationships_

1. **Entities sets**,
2. **Relationship sets**,
3. **Crows Foot notation**

###### 1. One to One realtionship

![one-to-one relationship](/assets/images/one_to_one.png "One to One Relationship")
_fig: One to One Relationship_

The **thick lines** indicate each entity in the entity set involved in at least one and exactly one relationships. This is called **one-to-one relationship**.

Only entities are used in the relationship diagrams.

###### 2. One to Many or Many to One realtionship

![one-to-many relationship](/assets/images/one_to_many.png "One to Many Relationship")
_fig: One to Many Relationship_

One book entity is participating in more than one relationship in the realtionship set. This is called **one-to-many relationship**. This is also called **many-to-one relationship**; in that many authors write a single book.

###### 3. Many to Many realtionship

![many-to-many relationship](/assets/images/many_to_many.png "Many to Many Relationship")
_fig: Many to Many Relationship_

Each entity in the entity set is participating in more than one relationship. This is called **Many-to-Many relationship**. Many books being written by many authors or Many authors writting many books.

##### Maping Entities to data table

**Entity** becomes a table and all the **attributes** translate into colums in table.

![entities-to-table](/assets/images/entities_to_table.png "Entites to Table")
_fig: Many to Many Relationship_

##### Relational Model Concept

Relational Model was first purposed in 1970. Building blocks of relational model are relation and sets. Relational model of data is based on concept of relation.

A relation is a mathematical concept based on idea of set. It is also mathematical term for a table. A set is an unordered collection of distinct elements.

A relation is made up of 2 parts:

- **Relation Schema**: A relation schema specifies the name of relation schema and the name an type of each column (attributes).<br>
  **Author(Author_id: char, lastname: varchar, firstname: varchar, email: varchar)**

- **Relational Instance**: A relational instance is a table made up of rows and columns. Columns are the attributes or fields. Rows are tuples.<br>
  **Degree** refers to the number of attributes or columns in a relation. **Cardinality** refers to the number of tupels or rows.

---
layout: blogdetail
author: Milan Kaucha
title: Relational Model Contraint and Data Objects
categories: SQL and Relational Database
excerpt_separator: <!--more-->
---

Constraints that are directly applied in the schemas of the data model, by specifying them in the DDL(Data Definition Language).

<!--more-->

#### 1. Relational Model Contraints

![one-to-one relationship](/assets/images/one_to_one.png "One to One Relationship")
_fig: One to One Relationship_

To look up the **Author** information, the **Book** entity refers to the **Author** entity. And to look up the **Book** information, the **Author** entity refers to the **Book** entity. This is called **referencing**. In database, this establishes the **data integrity** between two relations.

![relational model](/assets/images/relational_model.png "Relational Model")
_fig: Relational Model_

In above figure, **Author_ID, Book_ID and Borrower_ID** are primary keys. **Author_ID, Book_ID** in **Author_List** table; **Book_ID** in **Copy** table and **Copy_id, Borrower_ID** in **Loan** table are foreign keys.

A **primary key** of relational table uniquely identifies each row in a table.<br>
A **foreign key** is aste of column referring to a **primary key** of another table.

A table containing **primary key** that is related to at least one **foreign key** is called parent table. A table containing one or more **foreign keys** is called dependent table. (Child table)

#### 2. Contraints and it's types

To identify each tuple in a relation, the relation must have a primary key.

- **Entity Integrity Contraint**:
  The primary key is a unique value that identifies each tuple (or row) in a table. This is called **Entity Integrity Contraint**. It prevents duplicate value in table. To implement these contraints **indexes** are used. The priamry key cannot have an unknown value.<br>
  With the **Entity Integrity Contraint** no attributes participating in the primary key is allowed to accept **NULL** values.

- **Refrential Integrity Contraint**:
  **Refrential Integrity Contraint** defines relationships between tables and ensures that these relationships remain valid. The validity of the data is enforced using a combination of **primary keys** and **foreign keys**.

- **Sementic Integrity Contraint**:
  The **Semantic Integrity Contraint** refers to the corectness of the meaning of the data. It is related to corectness of data.

- **Domain Contraint**:
  The **Domain Contraint** specifies the permissible values of a given attribute.

- **Null Constraint**:
  The **Null Contraint** specifies that attribute values cannot be null.

- **Check Contraint**:
  The **Check Contraint** enforces domain integrity by limiting the values that are accepted by an attribute.

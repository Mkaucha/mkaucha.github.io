---
layout: blogdetail
author: Milan Kaucha
title: Django Web APIs
categories: Django
excerpt_separator: <!--more-->
---

A **"web API"** sits on top of the existing architecture of the world wide web and relies on a host of technologies including HTTP, TCP/IP and more.

#### 1. World Wide Web

The internet is a system of interconnected computers networks. **Hypertext Transfer Protocal(HTTP)**, was the first standard, universal way to share documents over the internet. It ushered in the concept of web pages: discrete documents with a URL, links, and resources such as images, audio, or video.

#### 2. URLs

A URL(Uniform Resource Locater) is the address of a resource on the internet. For example, the Google homepage lives at **https://www.google.com**.

When we type the full URL address into a web browser. Our browser than sends a request out over the internet and is connected to a servert that responds with the data needed to render in our browser.

This **request** and **response** pattern is the basis of all web communication. A client requests information and a server responds with a response.

Since web communication occurs via HTTP these are know more formally as HTTP requests and HTTP responses.

Every URL like **https://python.org/about/** has three potential parts:

- a scheme - https (tells a web browser how to access resources at the location).

- a hostname - www.python.org

- and an (optional) path - /about/

#### 3. Internet Protocol Suite

A whole collection of other technologies must work properly to connect the client with the server and load an actual webpage. This is referred to as the **internet protocol suite**.

Several things happen when a user types **https://www.google.com** into their web browser and hits Enter. First the browser needs to find the desired server on the vast interet. It uses a **domain name service (DNS)** to translate the domain name "google.com" into an **IP address**, which is a unique sequence of numbers representing every connected device on the internet.

After the browser has the IP address for a given domain, it needs a way to set up consistent connection with the desired server. This happens via the **Transmission Control Protocol(TCP)** which provides reliable, ordered, and error-checked delivery of bytes between two application.

To establish a TCP connection between two computers, a three-way "handshake" occurs between the client and server.

1. The client send a **SYN** asking to establish a connection
2. The server responds with a **SYN-ACK** acknowledging the request and passing a connection parameter
3. The client sends an **ACK** back to the server confirming the connection

#### 4. HTTP Verbs

Every webpage contains both an address as well as a list of approved actions known as HTTP verbs. The HTTP protocol contains a number of **request methods** that can be used while requesting information from a server. The four most common map to CRUD functionality. They are **POST, GET, PUT, and DELETE**.

{: .table .table-bordered}
| CRUD | HTTP verbs |
| ------ | ---------- |
| Create | POST |
| Read | GET |
| Update | PUT |
| Delete | DELETE |

To create content we use **POST**, to read content **GET**, to update it **PUT**, and to delete it we use **DELETE**.

#### 5. Endpoints

A web API has **endpoints** which are URLs with a list of available actions (HTTP verbs) that expose data (typically in JSON, which is the most common data format these days and the default for Django REST Framework).

For example, we could create the following API endpoints for a new website called **mysite**.

###### Diagram

<pre>
<code>
    https://www.mysite.com/api/users      # GET returns all users
    https://www.mysite.com/api/users/&lt;id&gt;     # GET returns a single user
</code>
</pre>

In the first endpoint, /api/users, an available GET request returns a list of all available users. This type of endpoint which returns multiple data resources is known as **collection**.

The second endpoint /api/users/\<id> represents a single user. A GET request returns information about just that one use.

If we added **POST** to the first endpoint we could create a new user, while adding **DELETE** to the second endpoint would allow us to delete a single user.

#### 6. HTTP

HTTP is a request-response protocol between two computers that have an existing TCP connection.

Every HTTP message consists of a status line, headers, and optional body data. For example,

###### Diagram

<pre>
<code>
    GET / HTTP/1.1
    Host: google.com
    Accept_Language: en-US
</code>
</pre>

The top line is known as the request line and it specifies the **HTTP** method to use **(GET)**, the path **(/)**, and the specific version of **HTTP** to use **(HTTP/1.1)**.

The two subsequent lines are HTTP headers: **Host** is the domain name and **Accept_Language** is the laguage to use.

HTTP messages also have an optional third section, known as the body.

HTTP response message from a server might look like:

###### Diagram

<pre>
<code>
    HTTP/1.1 200 OK
    Date: Mon, 03 Aug 2020 23:26:07 GMT
    Server: gws
    Accept-Ranges: bytes
    Content-Length: 13
    Content-Type: text/html; charset=UTF-8
    

    Hello, world!
</code>
</pre>

The top line is the response line and it specifies that we are using HTTP/1.1. The status code 200 OK indicates the request by the client was successful.

The next eight lines are HTTP headers. And finally our actual body content of "Hello, world!"

Every request or response, therefore has the following format:

###### Diagram

<pre>
<code>
    Response/request line
    Headers...

    (optional) Body
</code>
</pre>

#### 7. Status Codes

Once our browser has executed an HTTP Request on a URL; there are HTTP Status Codes available to accompany each HTTP response.

We can tell the general type of status code based on the following system:

- **2xx Success** - the action requested by the client was received, understood, and accepted

- **3xx Redirection** - the requested URL has moved

- **4xx Client Error** - there was an error, typically a bad URL, requested by the client

- **5xx Server Error** - the server failed to resolve a request

THe most common ones are 200(OK), 201(Created), 301(Moved Permanently), 404(Not Found), and 500(Server Error).

These status codes are automatically placed in the request/response line at the top of every HTTP message.

#### 8. Statelessness

HTTP is a stateless protocol which means each request/response pair is completely independent of the previous one. There is no stored memory of past interactions, which is know as state.

**Benifit**<br>
If we did not have a stateless protocol, things would constantly break if one request/response cycle didn't go through.

**Downside**<br>
State is how a website remembers that you’ve logged in and how an e-commerce site manages your shopping cart.

Historically state was maintained on the server but it has moved more and more to the client, the web browser, in modern front-end frameworks like React, Angular, and Vue.

#### 9. REST

**Representational State Transfer(REST)** is an architecture first proposed in 2000 by Roy Fielding. It is an approach to build APIs on the top of the web, which means top of the HTTP protocol.

The three main must have triats of every RESTful API:

- is sateless, like HTTP
- supports common HTTP verbs(GET, POST, PUT, DELETE, etc).
- returns data in either the JSON or XML format

---
title: JavaScript, The Beast Within
date: "2018-08-27T23:46:37.121Z"
description: Just the tip of an iceberg.
---

I was amused by JavaScript ever since I saw the things that can be done using it and the ease, with what we can achieve such things. I've been working with React JS and Node JS for almost a year and a half now. Needless to say, I'm a big React fanboy.

Recently, I've started to understand what's really going on under the hood and behind all those layers of abstraction presented to us as developers. This revelation has made go back to basics and understand workings of JavaScript in detail 😲

Every time I look back at all the work I've achieved with JS without knowing really anything about its inner workings is really amusing to me. Please, take that as an ode to the JavaScript community. You guys are amazing 🙌

> Note: In this article, I hope to cover introduction to JS and 4 topics/ features that intrigued me about JavaScript and made me an avid reader of [MDN Web Docs](https://developer.mozilla.org/en-US/docs/Web/JavaScript) and other JS related articles. It'll be useful for folks just getting started with JS or, it'll act as a refresher for the experienced.

I hope you too get inspired to understand this mysterious world of JavaScript 🌎 (or, just learn something new 😉).

Here’s a little introduction to JS from my personal [favourite](https://developer.mozilla.org/en-US/docs/Web/JavaScript/A_re-introduction_to_JavaScript).

1. JavaScript is notorious for being the [world’s most misunderstood programming language](http://crockford.com/javascript/javascript.html).

2. It is often derided as being a toy, but beneath its layer of deceptive simplicity, powerful language features await.( Async pun, eh ? 😜 )

3. JavaScript is now used by an incredible number of high-profile applications, showing that deeper knowledge of this technology is an important skill for any web or mobile developer.

Unlike most programming languages, the JavaScript language has no concept of input or output. It is designed to run as a scripting language in a host environment, and it is up to the host environment to provide mechanisms for communicating with the outside world.

Host environment is usually a _browser_.

JavaScript interpreters can also be found in a huge list of other places, including Adobe Photoshop, SVG images, server-side environments such as Node.js, NoSQL databases like the open source Apache CouchDB, embedded computers, complete desktop environments like GNOME (one of the most popular GUIs for GNU/Linux operating systems), etc.

JavaScript is a multi-paradigm, dynamic language with types and operators, standard built-in objects, and methods. Its syntax is based on the Java and C languages — many structures from those languages apply to JavaScript as well.

> I’ll also point you to some articles, if you wish to read more. These can be features of ES6 or it’s predecessors.

---

## What’s with the name ?

_or, What's ECMAScript ?_

JavaScript was created in 1995 by Brendan Eich (Netscape Engineer). It was originally named Mocha and was changed to be called LiveScript, but it was renamed after a marketing decision that attempted to capitalise on the popularity of Java language at that point in time.

Netscape submitted JavaScript to ECMA (a European standards organisation), it resulted in the first edition of the ECMAScript standard that year.

The standard received a significant update as ECMAScript edition 3 in 1999, and it has stayed pretty much stable ever since.

The fourth edition was abandoned, due to political differences concerning language complexity.
Many parts of the fourth edition formed the basis for ECMAScript edition 5, published in December of 2009, and for the 6th major edition of the standard, published in June of 2015.

So in conclusion, I believe JavaScript is considered the Language which implements a standard called ECMAScript.

> JavaScript is the implementation of the standard that is, ECMAScript.

---

## Prototypal Inheritance and Classes

_One of the most fascinating features for me personally_

_What's prototypal inheritance you ask ?_

JavaScript only has one construct: _objects_. Each object has a private property which holds a link to another object called its _prototype_.

That prototype object has a prototype of its own, and so on until an object is reached with null as its prototype. By definition, null has no prototype, and acts as the final link in this prototype chain.
Nearly all objects in JavaScript are instances of Object which sits on the top of a prototype chain.
Every object in JS can have another object as its prototype. Then the former object inherits all of latter's properties.

An object specifies its prototype via the internal property `[[Prototype]]`. The chain of objects connected by the `[[Prototype]]` property is called the prototype chain

The `__proto__` property exposes the internal prototype linkage.

![prototypal inheritance example](https://cdn-images-1.medium.com/max/800/0*sacpzj7gNySk-x8O.png)

_prototype_ vs `__proto__`

The _prototype_ is a property on a constructor function that sets what will become the `__proto__` property on the constructed object.

```javascript
var animal = {
  eats: true,
  walk() {
    console.log("walking!!")
  },
}

var rabbit = {
  jumps: true,
  __proto__: animal,
}

var bugsBunny = {
  likesEating: "Cartoon Carrots",
  isCartoon: true,
  __proto__: rabbit,
}

bugsBunny.walk() // walking!!!
// resolved by going up the prototype chain to 'animal'

console.log(bugsBunny.jumps) // true
// resolved by going up the prototype chain to 'rabbit'
```

Now, tell me about classes ?

Okay, Now classes in JavaScript are just syntactic sugar on top of it's prototypal inheritance.( Making prototypal inheritance more classy for all OOPs people out there 😅)

ES6 introduced a new set of keywords implementing classes. i.e, class, constructor, static, extends, and super

I'm gonna let you take it from here to find out more about classes.

\_Sources: [Classes](https://medium.com/r/?url=https%3A%2F%2Fdeveloper.mozilla.org%2Fen-US%2Fdocs%2FWeb%2FJavaScript%2FReference%2FClasses)

---

## What is "this " ?

_Spoiler: it's just spell binding_

`this` behaves a little differently in JavaScript compared to other languages. It also has some differences between strict and non-strict mode in Javascript.

The value of `this` is determined by how a function is called.It can't be set by assignment during execution, and it may be different each time the function is called.

### Global Context

In non-strict mode by default this points to the global window object in browser, and in strict mode by default _this_ is _undefined_.

```javascript

In browser
console.log(this === window); //true

In Node
console.log(this === global); //true

'use strict'
console.log(this); //undefined


```

### Function Context

The value of `this` remains at whatever it was set to when entering the execution context.

To pass the value of `this` from one context to another, use call, or apply:

```javascript
var obj1 = { a: "Custom" }

var a = "Global"

function whatIsA() {
  return this.a
}

console.log(whatIsA()) //Global

console.log(whatIsA().call(obj1)) //Custom
```

### Bind()

ES5 introduced a new function for Function.prototype called the bind().

Calling func.bind(someObject)creates a new function with the same body and scope as func, but where this occurs in the original function, in the new function it is permanently bound to the first argument of bind

```javascript

// function WhatIsA from the above example
var obj2 = { a: 'I'm Object 2's a!' };

var whatIsAInObj2 = whatIsA.bind(obj2);

console.log(whatIsAInObj2()); // I'm Object 2's a!


```

### Arrow Functions

With the introduction of arrow functions `this` retains the value of the enclosing lexical context's `this`.

```javascript

var obj = {
  bar: function() {
    var x = () => this
    return x
  },
}

var fn = obj.bar()

console.log(fn() === obj) // true

```

I can keep going.But, for more on this take a look at the [MDN Docs](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/this). 😉

_Note: Read about how this binding is only affected by the most immediate member reference._

---

## Hoisting ⬆️

_Up and up and up ? ( Coldplay fans will get it 🎶)_

Hoisting came in to picture or specification only with ES6.

Hoisting was thought up as a general way of thinking about how execution contexts (specifically the creation and execution phases) work in JavaScript.

A definition of hoisting might suggest that variable and function declarations are physically moved to the top of your code.

It's not true , the variable and function declarations are put into memory during the compile phase, but stay exactly where you typed them in your code.

```javascript

console.log(sayHello("world!")) // Hello world!

console.log(a)

// undefined and not 'ReferenceError' due to hoisting
console.log(sayOla("world!"))

// TypeError: sayOla is not a function
function sayHello(param) {
  return "Hello " + param
}

var a = 1
var sayOla = function(param) {
  return "Hello " + param
}

```

Above example shows hoisting in action.
Conceptually, how your run time sees it is.

```javascript

function sayHello(param) {
  return "Hello " + param
}

var a
var sayOla

console.log(sayHello("world!")) // Hello world!
console.log(a)
// undefined and not 'ReferenceError' due to hoisting
console.log(sayOla("world!"))
// TypeError: sayOla is not a function
a = 1
sayOla = function(param) {
  return "Hello " + param
}

```

_Note: only declarations are hoisted but not assignments. also, class declarations are not hoisted._

---

## Now, Let's bring it to a "Closure" 🔚

_Another JS pun (sorry!)_

A _closure_ is the function bundled together (enclosed) with references to its surrounding state (the _lexical environment_).

Closure gives you access to an outer function's scope from an inner function. In JavaScript, closures are created every time a function is created, at function creation time.

```javascript

function outerFunction() {
  var x = "Hello "
  return function(param) {
    return x + param
  }
}

var newFunc = outerFunction()

console.log(newFunc("World!")) // Hello World!
// Even after returning the function has access to variable x

```

Closures are usually used to give objects data privacy and to fix order of partial application of functions.

```javascript

// partial application

function makeAdder(x) {
  return function(y) {
    return x + y
  }
}

var add5 = makeAdder(5)

console.log(add5(10)) // 15

```

---

I hope this article got you inspired or curious to learn more about JavaScript.

PS: I'll just leave you with my personal favourite JS articles/ docs 💌

1. [A re-Introduction to JavaScript](https://developer.mozilla.org/en-US/docs/Web/JavaScript/A_re-introduction_to_JavaScript)
2. [Event Loop](https://developer.mozilla.org/en-US/docs/Web/JavaScript/EventLoop)
3. [Curry or Partial Application](https://medium.com/javascript-scene/curry-or-partial-application-8150044c78b8)
4. [All About JavaScript functions](https://codeburst.io/all-about-javascript-functions-in-1-article-49bfd94b31ab)
5. [Functional Programming in JS](https://medium.com/javascript-scene/master-the-javascript-interview-what-is-functional-programming-7f218c68b3a0)
6. [Class and Prototypal Inheritance](https://medium.com/javascript-scene/master-the-javascript-interview-what-s-the-difference-between-class-prototypal-inheritance-e4cd0a7562e9)

You can also follow this really interesting [YouTube channel](https://www.youtube.com/channel/UCO1cgjhGzsSYb1rsB4bFe4Q) for cool JS related stuff and more .

---
title: Redux - Predictive state management on the client side
date: "2019-06-30T23:46:37.121Z"
description: My understanding and notes on redux from various sources
---

Hi guys, It’s been a _really long_ time since I wrote a blog post. I’m starting a habit of regularly blogging about the things I learn. I plan to blog about both technical and non-technical subjects.

Without any further ado.

Redux is a state management library for javascript applications. It comes in handy in projects where state management becomes too complicated or state gets difficult to keep track. Redux helps us by making the state predictable, centralized, debuggable and flexible. 

Let’s get into the details of what those mean in a minute. Let’s look at the Flux architecture first. You might be thinking, _“Flux? Why?_” .

It’s really important as Redux was inspired by the Flux architecture. Bear with me.

## Flux

Flux is a pattern for handling data in your application. Flux and React grew up together in Facebook. Just like Redux, Flux and React are mostly used together in applications even though they can be used independently.

Flux was created to fix a very specific problem at the time in facebook. I highly recommend you read this amazing intro to [Flux by Lin Clark](https://code-cartoons.com/a-cartoon-guide-to-flux-6157355ab207).

Flux and Redux are fundamently very similar. You can’t directly mutate the store without firing an action.

The underlying problem they were trying to solve at facebook was the way dat flowed through the application.

They had models which held the data and would pass data to the view layer to render the data. There were several scenarios by which your model can get updated. An user interaction can update the model or, a model can update another model. There were even complex scenarios where cascading updates. Lin in here article makes an analogy of “Throwing a whole bag of ping-pong balls into your Pong game, with them flying all over the place and crossing paths”.
There updates also happened asynchronously. This made things very hard for debugging.

_Solution_ : _*Unidirectional Data Flow*_

Facebook came up with this unidirectional data flow architecture where data flow only in one directi. And, they called it _Flux_.

This is what data flow in flux looks like:

![Flux data flow](https://facebook.github.io/flux/img/flux-simple-f8-diagram-with-client-action-1300w.png)

I’ll not go deeper into Flux in this article as it’s about Redux. I highly recommend that you to read about the flux architecture.

Now back to Redux.

Redux was inspired by Flux architecture. Dan Abramov wanted to improve flux. He wanted to make better tooling around the state management ecosystem and make it extensible. (like, [Time travel debugging](https://www.youtube.com/watch?v=xsSnOQynTHs)).

According to official Redux's official site. Redux can be explained using the follwing [Principles](<(http://redux.js.org/docs/introduction/ThreePrinciples.html)>).

1. Single Soure of truth.
2. State is read only.
3. Changes are made with pure functions

Redux is made up of the following entities:

1. Action creators
2. Reducers
3. Store
4. View i.e, Smart and Dumb components

### The store

_I. Single source of truth_

The store is the data store a place store all your information. By definition of First Principle. The store is the single source of truth for your application.

### Reducers

_II. State is read only_

“To specify how the state tree is transformed by actions, you write pure reducers.”

Reducers are _pure functions_ that take the previous state of the app and return a new state based on the action passed to it.

They look something like this:

```javascript
const initialState = {}

const myReducer = (state = initialState, action) => {
  switch (action.type) {
    case "ADD_TODO": {
      const { id, todo } = payload
      return { ...state, [id]: todo }
    }
  }
}
```

### Action creators

Actions are events that happen in your application which can change in your model (store). They are the only way you can send data from your application to your Redux store.

Actions are plain JavaScript objects and they must have a type property to indicate the _type_ of action to be carried out. They must also have a _payload_ that contains the information that should to worked on by the action.

Actions have this signature:

```javascript
{
  type: "UPDATE_MY_STORE",
  payload: {
    "dummy": "data"
  }
}
```

Actions are created by functions called _Action creators_. They look something like this:

```javascript

const signIn = (username. password) => {
  return({
    type: types.SIGN_IN,
    payload: {
      username,
      password
    }
  });
}

```



_*III. Changes are made with pure functions*_

We dispatch these action using the store's function and the Reducer (a _pure function_) receive's this action and current state and gives us the *new state*.


### Views (Smart and Dumb)

Views are just the components that subscribe to the store.

Smart components = *Containers*

Dumb Components = *Presentational Components*

Smart components can be though of as an inteface between your Redux store and the Dumb components. They only deal with the subscription and passing down of actions and/or state from the store to the Dumb components. Do not email any DOM of their own.

Dumb components are purely responsible for rendering the DOM. Hence are called Presentational Components. They receive the actions and state as props passed to them by the container components.

This distinction is an important pattern followed as a standard across most projects you'll come across. [Read more](https://medium.com/@dan_abramov/smart-and-dumb-components-7ca2f9a7c7d0)


These are some important points to remember when you work with redux:

1. The only way a user should be able to mutate state is through actions.

2. Reducers are pure functions in a state tree. Your app’s state properties are each represented by a function that provides updates to their state. Each reducer is unique to each state property and vice versa.

3. The store is singular and contains the entire state of the app. When we use it this way, we can track each and every change to the state of the app.

4. Reducers can be thought of as behavioral definitions of state tree properties.


If you're building a small application I suggest you use React's component state or the new Context API to share state among your components. Don't make _Redux_ your defacto state management tool for all your React apps or projects. 

(Tradeoffs) Redux asks you to:

1. Describe application state as plain objects and arrays.
2. Describe changes in the system as plain objects.
3. Describe the logic for handling changes as pure functions.

Okay, You don't have to take my word for it. Instead, [believe Dan's]('https://medium.com/@dan_abramov/you-might-not-need-redux-be46360cf367). 

There are _tradeoffs_ in any solution you pick so choose wisely by carefully analysing your use case and the list of available solutions. I always recommend starting with something minimal and moving to something advanced when you hit a roadblock.

If you're interested in how redux works under the hood. I highly recommend you try implementing Redux from [scratch](https://www.jamasoftware.com/blog/lets-write-redux/).

Hope I this article was worth your time. Thank you for reading :)

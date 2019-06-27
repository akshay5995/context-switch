---
title: React's Context API By Implementing a Simple Snack Bar
date: "2018-09-15T23:46:37.121Z"
description: Let's understand React's context API by solving a simple real world of implementing a custom snackbar for your web app.
---

In React, data is passed top-down (parent to child) via props, but this can be cumbersome for certain types of data that is required by many components within an application.
Context provides a way to share values like these between components without having to explicitly pass a prop through every level of the tree.

I'm sure we all have had requirement where we had to implement snack bar for our react application. I'll be showing you how to implement simple snack bar using the React's Context API in this article.
Little background before we dive deep. The Context API before React 16.3 was available as an experimental API. Now it's not experimental anymore and has been shipped as a part of React 16.3+ versions for quite some time.
The goal of the article is to build a minimal Snack Bar component and to understand how to use the Context API and it's use case.

This is a more complex example than the one provided in the official documentation.
Context is designed to share data that can be considered "global" for a tree of React components.
Here in our example we'll be using context to pass down data and handler functions that's needed to control opening/closing our SnackBar anywhere inside your app and as well as data needed for our SnackBar.
Let's use create-react-app to bootstrap a new app called react-context-demo.

File names are provided in comments above every snippet use the same to create files accordingly.

**createContext**

```javascript

/* file: SnackBarContext.jsx */

// Default State of our SnackBar
const DEFAULT_STATE = {
  show: false, // boolean to control show/hide
  displayText: "", // text to be displayed in SnackBar
  timeOut: 2000, // time SnackBar should be visible
};

// Create our Context
const SnackBarContext = React.createContext(DEFAULT_STATE);

```

The created context(SnackBarContext) has properties { Provider, Consumer }.When React renders a context Consumer, it will read the current context value from the closest matching Provider above it in the tree.

**Provider**

```javascript

<Provider value={/* some value */} />

```

A React component that allows Consumers to subscribe to context changes. It accepts a _value_ to be passed on to Consumers that are descendants of this Provider.

Now Let's create a Provider called _SnackBarProvider_.

```javascript

/* file: SnackBarContext.jsx */

export class SnackBarProvider extends PureComponent {
  constructor(props) {
    super(props)
    // DEFAULT_STATE defined earlier
    this.state = Object.assign({}, DEFAULT_STATE)
    this.handleClose = this.handleClose.bind(this)
    this.handleOpen = this.handleOpen.bind(this)
  }
  handleOpen(displayText) {
    // Show the SnackBar with 'displayText'
    this.setState({
      show: true,
      displayText,
    })
    setTimeout(
      // To hide SnackBar after 2s
      () => this.setState({ show: false }),
      this.state.timeOut
    )
  }
  handleClose() {
    // Show the SnackBar with 'displayText'
    this.setState({
      show: false,
      displayText: "",
    })
  }
  render() {
    return (
      <SnackBarContext.Provider
        value={{
          ...this.state,
          handleOpen: this.handleOpen,
          handleClose: this.handleClose,
        }}
      >
        {this.props.children}
      </SnackBarContext.Provider>
    )
  }
}

```

The _SnackBarProvider_ will be a stateful component which will return it's children (this.props.children) inside the _SnackBarContext.Provider_ to provide necessary values (State's Data and Handlers) to be passed on to _SnackBarContext.Consumer_ used by our SnackBar component some where down the component tree of it's children. (!important)

Inside the _SnackBarProvider_ we assign `DEFAULT_STATE` to this.state. `DEFAULT_STATE` has the default values to be passed down to the Consumer.

We need our SnackBar to be stateful for showing and hiding. State's show property will be a boolean used for showing or hiding our SnackBar.
Functions handleClose and handleOpen are used as handlers for state changes to do the same in the will be used in our SnackBar.

handleOpen will accepts an argument displayText the text to displayed in our SnackBar and sets displayText and show to true. And, handleClose will change the show to false and displayText to it's default state i.e, empty string.

Inside render we'll our _SnackBarContext.Provider_ to which will pass in prop named value our SnackBarProvider's state (…this.state) and our handlers (handleOpen and handleClose). _SnackBarContext.Provider_ will enclose our SnackBarProvider's children so we can use _SnackBarContext.Consumer_ access these values and functions down the our children's component tree.

Now that we're done with our Provider let's see how to use our Consumer.

**Consumer**

```javascript

<Consumer>
  {value => /* render something based on the context value */}
</Consumer>

```

Consumer takes a function as a child. The value parameter of the function is the one that contains our prop value passed to our closestProvider.The function receives the current context value and returns a React node.
Let's see how we'll use it in our case.

We'll have a _SnackBar_ component which will use the props from our Provider to control it's visibility (show/hide functionality).

```javascript

const SnackBar = ({ show, handleClose, displayText }) => (
  <div className="snackBarHolder">
    {show && ( // controls visibility
      <div className="snackBar">
        <span>
          {
            displayText // text to be displayed
          }
        </span>
        <button onClick={() => handleClose()}>OK</button>
      </div>
    )}
  </div>
)

```

_show_ will control the visibility, handleClose will be used by the button in our SnackBar to force the SnackBar to hide and displayText is the main text that will be displayed in our SnackBar.

So we know that our SnackBar component requires props show, handleClose, displayText for it to work as required. Let's see how to use SnackBarContext.Consumer to get the required props.

So we'll create a _Higher Order Component_ that will take a Component as a parameter and passes the value from Provider as props to that Component. Let's call it _withSnackBarConsumer_.

```javascript

/* file: SnackBarContext.jsx */

export const withSnackBarConsumer = WrappedComponent => {
  const WrapSnackBarConsumer = props => (
    <SnackBarContext.Consumer>
      {({ show, displayText, handleOpen, handleClose }) => {
        const snackBarProps = {
          show,
          displayText,
          handleOpen,
          handleClose,
        }
        return <WrappedComponent {...snackBarProps} {...props} />
      }}
    </SnackBarContext.Consumer>
  )
  return WrapSnackBarConsumer
}

```

Here, _withSnackBarConsumer_ will accept a WrappedComponent as a parameter and returns WrapSnackBarConsumer which wraps the WrappedComponent with SnackBarContext.Consumer by using our function as a child signature of Consumer.

Using the Consumer we get the values (show, displayText, handleOpen, handleClose) provided by our Provider and pass these values (snackBarProps) to our WrappedComponent as props.
We can use our withSnackBarConsumer to wrap our SnackBar like:

```javascript

*/* file: SnackBar.jsx */*

import { withSnackBarConsumer } from './SnackBarContext';

const SnackBar = ({ show, handleClose, displayText }) => (
  <div className="snackBarHolder">
   {
    show // controls visibility
    && (
      <div className="snackBar" >
       <span>{
         displayText // text to be displayed
        }</span>
       <button onClick={() => handleClose()}>
          OK
        </button>
      </div>
     )
   }
  </div>
);

export default withSnackBarConsumer(SnackBar);

```

Now that we have _connected_ (Just like Redux, eh ?) our SnackBar to values provided by our SnackBarProvider.

We can start on how to use the same withSnackBarConsumer to provide other components in our app ability to make our SnackBar visible using handleChange.

Let's create a SnackBarControl a button with handleOpen using _withSnackBarConsumer_ HOC.

```javascript
/* file: SnackBarControl.jsx */

import { withSnackBarConsumer } from "./SnackBarContext";

const SnackBarControl = ({ text, handleOpen }) => (
  <button onClick={() => handleOpen(text, buttonText)}>Show me!</button>
);

export default withSnackBarConsumer(SnackBarControl);

```

SnackBarControl uses our handleOpen from our SnackBarProvider. We connected SnackBarControl to handleOpen using the our withSnackBarConsumer.

Now that We have SnackBarControl, SnackBar, SnackBarProvider let's see it in action.

```javascript

/* file: App.js from create-react-app */

import React, { Component } from 'react';
import { SnackBarProvider } from './SnackBarContext';
import SnackBarControl from './SnackBarControl.jsx';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  render() {
    return (
      <SnackBarProvider>
         <div className="App">
            <header className="App-header">
             <img src={logo} className="App-logo" alt="logo" />
             <h1 className="App-title">Welcome to React</h1
             </header>
             <SnackBarButton text="Hey There!"/>
          </div>
        <SnackBar />
     </SnackBarProvider>
     );
   }
}

export default App;

```

Add these styles for your SnackBar inside App.css to make it look like a real snackBar!

```css
/* file: App.css from create-react-app */

.SnackBarHolder {
  position: fixed;
  z-index: 50;
  bottom: 20px;
  left: 50%;
  -webkit-animation: fadein 0.5s, fadeout 0.5s 2.5s;
  -moz-animation: fadein 0.5s, fadeout 0.5s 2.5s;
  -ms-animation: fadein 0.5s, fadeout 0.5s 2.5s;
  -o-animation: fadein 0.5s, fadeout 0.5s 2.5s;
  animation: fadein 0.5s, fadeout 0.5s 2.5s;
}
@-webkit-keyframes fadein {
  from {
    bottom: 0;
    opacity: 0;
  }
  to {
    bottom: 20px;
    opacity: 1;
  }
}
@keyframes fadein {
  from {
    bottom: 0;
    opacity: 0;
  }
  to {
    bottom: 20px;
    opacity: 1;
  }
}
@-webkit-keyframes fadeout {
  from {
    bottom: 20px;
    opacity: 1;
  }
  to {
    bottom: 0;
    opacity: 0;
  }
}
@keyframes fadeout {
  from {
    bottom: 20px;
    opacity: 1;
  }
  to {
    bottom: 0;
    opacity: 0;
  }
}
.SnackBar {
  width: 250px;
  padding: 10px;
  background: black;
  display: flex;
  align-items: center;
  justify-content: space-between;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
}
.SnackBar > span {
  color: white;
}
.SnackBar > button {
  background: transparent;
  color: #00b4d2;
  outline: none;
  border: 0;
  cursor: pointer;
}
```

Click on _Show me!_ to see the magic ✨.

Congrats, You've successfully implemented a simple snack bar using React's Context API.

Please do read the [official docs](https://reactjs.org/docs/context.html) for better understanding.

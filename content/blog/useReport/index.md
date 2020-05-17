---
title: useReport Hook and some thoughts on good API design for libraries
date: "2020-05-16T23:46:37.121Z"
description: Let's get powerbi report hooked to your React App (pun intended!)
---

This post covers how to embed your Microsoft PowerBi reports into your React application using _**useReport**_ hook from [powerbi-report-component](https://github.com/akshay5995/powerbi-report-component). I'll go into some depth of inner working of the package and rational behind `useReport`, and some thoughts on good API design libraries.

TLDR; if you just want to use `useReport`, here's how it works.

```javascript
import React, { useEffect, useRef } from "react"
import { useReport } from "powerbi-report-component"

// Some powerbi setting disable your nav and filters from embed
const settings = {
  filterPaneEnabled: false,
  navContentPaneEnabled: false,
}

const MyReport = () => {
  const reportRef = useRef(null)
  // useReport returns `report` the embed instance and setEmbed a function to
  // set your embed into the div
  const [report, setEmbed] = useReport()

  const myReportConfig = {
    embedType: "report",
    tokenType: "Embed",
    accessToken: "", //  your access token
    embedUrl: "", // your embed url
    embedId: "", // your embed Id
    settings,
  }

  // !important
  useEffect(() => {
    // call inside useEffect so the we have the reportRef (reference available)
    // pass in the ref for the div and your config
    setEmbed(reportRef, myReportConfig)
  }, [])

  const handleclick = () => {
    // you can use "report" from useReport like
    if (report) report.print()
  }

  return (
    <div className="report-container">
      <div className="report" ref={reportRef} />
      <button onClick={handleclick}>Print my report</button>
    </div>
  )
}

export default MyReport
```

Now, for those interested in why `useReport`hook and how it works.

So, what do I mean by good API design?

Let's first see what an API is. API is an acronym for Application Programming Interface. It is a software delegate that allows two applications to talk to each other. When we talk about APIs we are usually referring to REST API or HTTP endpoints.

How does it apply to libraries?

Functions or components exposed by your library are also APIs.As it allows the developer to communicate between their application code and your code that exists in the library.

When I first created the component it allowed you to embed a report in your React application. So it exported React component as a default called `Report`.

The library user would've imported it and used it like:

```javascript
import Report from "powerbi-report-component";

<Report
  embedType="report" // or "dashboard"
  ...{otherProps}
/>
```

_(Note: Microsoft PowerBi actually supports multiple types of embeds: Report, Dashboard, Tile)_

This made sense at that time. As it would be used to embed only an Microsoft PowerBi `Report` not `Dashboard` or `Tile`. Soon I added `embedType` as a prop to support embedding `Dashboard`.

This felt a little odd when you're actually embedding a `dashboard` and you still had to use a `<Report />` and pass `dashboard` to `embedType` prop inside your code.

Also, using `embedType` to determine what kind of props can be passed to the component made the library code bloated and less clean with the use of switch is multiple places.

Soon I started getting feature requests to support _Tile_ and for _Create Report_ feature.

Each embed type had to support a lot more handlers and other properties.

For example, You can have handler `onPageChange` handler on `embedType = report` but not in `embedType = dashboard` or `embedType = tile` or, You can have a `pageView` prop for `embedType = dashboard` but not for `embedType = report` or`embedType = tile`.

But, the library just exported a single component (`Report`) and `propTypes` of the component looked like this.

```javascript
Report.propTypes = {
  embedType: PropTypes.string.isRequired,
  tokenType: PropTypes.string.isRequired,
  accessToken: PropTypes.string.isRequired,
  embedUrl: PropTypes.string.isRequired,
  embedId: PropTypes.string,
  pageName: PropTypes.string,
  extraSettings: PropTypes.object,
  permissions: PropTypes.string,
  onLoad: PropTypes.func,
  onError: PropTypes.func,
  onSelectData: PropTypes.func,
  onPageChange: PropTypes.func,
  onTileClicked: PropTypes.func,
  style: PropTypes.object,
  reportMode: PropTypes.string,
  datasetId: PropTypes.string,
}
```

React component is nothing but a `function` and props are nothing but `parameters` that you pass in to the function. This means that `Report` is one function that you can pass _**16**_ parameters into. Library user can never actually know which parameter to pass in unless they go and see the documentation every time they had to make a change.

User's IDE intellisense also becomes useless as suggestions will have _**16**_ props instead of only right props for their use case.

This parameter list was only going to increase in number as I keep adding new handlers or properties based on feature requests. Exporting a single `default export` of a `Report` also was not maintainable.

This is an example of a _**bad**_ API design. As it doesn't compliment the users development environment like the IDE or doesn't help speed the user's workflow.

Having the `embedType` as a prop creates confusion here as the user might be using library to embed a `Tile` but would still be using it as `Report` in their code.

With this in mind. Maintainers and I went ahead refactored the code to export multiple components as named exports. i.e, `Report`, `Dashboard` and `Tile` with their respective props. Now we have multiple named exports based on `embedType` which can be imported like. This also made the library code more maintainable.

Now the library can be used like.

```javascript
import { Tile, Dashboard, Report } "powerbi-report-component";
```

And the `propTypes` of respective exports look like:

```javascript
Report.propTypes = {
  tokenType: PropTypes.string.isRequired,
  accessToken: PropTypes.string.isRequired,
  embedUrl: PropTypes.string.isRequired,
  embedId: PropTypes.string,
  pageName: PropTypes.string,
  extraSettings: PropTypes.object,
  permissions: PropTypes.string,
  style: PropTypes.object,
  reportMode: PropTypes.string,
  datasetId: PropTypes.string,
  onLoad: PropTypes.func,
  onRender: PropTypes.func,
  onError: PropTypes.func,
  onButtonClicked: PropTypes.func,
  onSelectData: PropTypes.func,
  onPageChange: PropTypes.func,
  onCommandTriggered: PropTypes.func,
}
```

```javascript
Dashboard.propTypes = {
  tokenType: PropTypes.string.isRequired,
  accessToken: PropTypes.string.isRequired,
  embedUrl: PropTypes.string.isRequired,
  embedId: PropTypes.string.isRequired,
  pageView: PropTypes.string,
  style: PropTypes.object,
  onLoad: PropTypes.func,
  onTileClicked: PropTypes.func,
}
```

```javascript
Tile.propTypes = {
  tokenType: PropTypes.string.isRequired,
  accessToken: PropTypes.string.isRequired,
  embedUrl: PropTypes.string.isRequired,
  embedId: PropTypes.string.isRequired,
  dashboardId: PropTypes.string.isRequired,
  style: PropTypes.object,
  onLoad: PropTypes.func,
  onClick: PropTypes.func,
}
```

This enables the user to use the library without having to go back and see the docs every time and IDE intellisense will suggest the right props which speeds up the developer's workflow and the user doesn't have to go to see the docs every time they had to make a change.

Since, We made the exports from the library more explicit. User will be able use `Tile` in the place where they are embedding `Tile` or `Dashboard` when they want to embed a `Dashboard`. This solves a lot of confusion and is explicit enough to make sense where it's used in your codebase.

A _**good**_ API design for libraries has to get these right:

1. Complement the tools available in the end user's development environment.
2. Explicit enough to make sense where it's used.

One way to compliment the user's development environment is enabling IDE intellisense to speed up user's workflow. i.e, by making _**exports explicit**_ or using right `propTypes` like what you just saw.

Another way would be to support multiple ways to use your library based on user's development environment.

The library supported embedding your reports using components by exposing React components. This is one way of sharing code or using the API.

Now, React has hooks to share code. (Read more about it [here](https://reactjs.org/docs/hooks-intro.html))

I refactored the library to use the React hooks and it internally looked like this:

```javascript
// private used inside the library to embed
function _useReport(performOnEmbed = null) {
  // store the embed instance
  const [report, _setEmbedInstance] = useState(null)

  const setEmbed = (embedDivRef, embedConfig) => {
    // validate your configuration passed as props
    const errors = validateConfig(embedConfig)
    if (!errors) {
      embed(embedDivRef.current, embedConfig)
    } else {
      throw new Error("invalid configuration passed")
    }
  }

  const embed = (ref, config) => {
    const { reportMode } = config
    // check reportMode
    const isCreateMode = reportMode === "create"
    let embedInstance

    // call the right powerbi library method
    if (isCreateMode) embedInstance = powerbi.createReport(ref, config)
    else {
      embedInstance = powerbi.embed(ref, config)
    }

    if (performOnEmbed) {
      // add handlers to the embedInstance that are passed as props
      // like onPageChange, onSelectData, etc..
      performOnEmbed(embedInstance, ref)
    }

    // set the embed instance in the state
    _setEmbedInstance(embedInstance)
  }

  // expose embed instance and a method to embed
  return [report, setEmbed]
}
```

Since, React now enables sharing of code as a hook. I can remove a lot of library specific code and expose this hook for the end user.

```javascript
// cleaner and a default API to export
function useReport() {
  const [report, _setEmbedInstance] = useState(null)

  const setEmbed = (ref, config) => {
    // create config based on embedType
    const embedConfig = createEmbedConfigBasedOnEmbedType(config)
    // validate the config
    const errors = validateConfig(embedConfig)
    if (!errors) {
      embed(ref.current, embedConfig)
    } else {
      throw new Error("invalid configuration passed")
    }
  }

  const embed = (ref, config) => {
    const embedInstance = powerbi.embed(ref, config)
    _setEmbedInstance(embedInstance)
  }

  // expose instance and method to embed
  return [report, setEmbed]
}
```

By exporting `useReport` from the library the user has more than one way to use the library. This adds to the value of the library as it complements the users development environment by the use React hooks.

The hook exposes an internal function as an API for end user to get the most out of the library and by using the hook user can choose to reduce the extra abstraction and logic that comes along with using the API with an component.

This was the rationale behind the `useReport` hook and my thoughts on good API design for libraries.

If you're interested seeing more of the code you can head here: https://github.com/akshay5995/powerbi-report-component/

PRs or issues welcome for the library.

Thanks for your time!

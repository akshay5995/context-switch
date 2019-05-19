---
title: How To Embed Microsoft Power BI Charts Into Your React Application
date: "2018-08-12T23:46:37.121Z"
description: Embedding Microsoft Power BI charts into your React Application can be breeze with the right tools.
---

Embedding Microsoft Power BI charts into your React Application can be breeze with the right tools.

Note: _This article assumes you have a fairly decent idea about Microsoft Power BI and few related terminologies._

## TL;DR

Intall `powerbi-report-component` using your favourite package manager.

```
npm i powerbi-report-component --save-dev

```

or,

```

yarn add powerbi-report-component --dev

```

Basic usage,

```javascript
import Report from "powerbi-report-component";

<Report
  embedType="report"
  tokenType="Embed"
  accessToken=""
  embedUrl=""
  embedId=""
  permissions="All"
  style={myStyleObject}
/>
```

---

## Now, for the those who stayed :)

Embedding a Power BI report into your React Application can be a pain for a beginner. Even though the Microsoft's documentation on the topic is pretty neat.

I'm just gonna tell you what's need from a React developer's perspective and not go into the details of implementation or architecture.

There are two approaches that you can take to embed your Power BI Report:

1. User Owns Data
2. App Owns Data

The main difference is:

User Owns Data sample is for Embedding for your organisation, the embedded reports readers can be Power BI Pro or free users in your organisation. Users have to log-in with their PBI account. Power BI Premium license is required. (i.e, Users who are part of your AD)

App Owns Data sample is for Embedding for your customers, the embedded report readers can be your own customers(say you're an ISV application provider). So no log-in. Power BI Embedded license is required.(i.e, Users outside your AD)

> Source: https://community.powerbi.com/t5/Developer/App-vs-User-Owns-Data/td-p/300729

You have to choose who will be using your application that's gonna contain your embedded report i.e, Internal users(AD User) vs. External users(Non AD).

Now that you've decided on which approach you're gonna choose.

Hopefully, You have your report ready and are able to view it in https://powerbi.microsoft.com.

Now, navigate to your report under your workspaces your URL should look something like this:

**https://app.powerbi.com/groups/{workspace-id}/reports/{report-id}**

for dashboards you might have something like this:

**https://app.powerbi.com/groups/{workspace-id}/dashboards/{dashboard-id}**

To Embed your report you'll need the following:

1. Report ID: from the URL
2. Workspace ID: also, from the URL
3. Token: AAD or Embed Token (For authetication))

**Note: AAD token is used while taking the User Owns Data Approach and Embed token is used when taking App Owns Data Approach.**

_Embed Url:_ (Will consist of Report ID and Workspace ID)

> https://app.powerbi.com/reportEmbed?reportId=_report-id_&groupId=_workspace-id_

There are mainly two ways you can proceed with embedding the report into your react application.

1. Using an iframe
2. Using Power BI JS API provided by Microsoft

Using an iframe is pretty straightforward but, this doesn't provide the flexibility that a React component would provide, like callbacks or event triggers.

You can use the generated URL to embed using iframe like this,

```html

<iframe
  width="800"
  height="600"
  src="http://myserver/reports/powerbi/Sales?rs:embed=true"
  allowFullScreen="true">
</iframe>


```

But, naturally as JS developers we tend to go with the more flexible JS API.

You can take a look at Microsoft's [demo page](https://microsoft.github.io/PowerBI-JavaScript/demo/v2-demo/index.html#)

They have a very clear explanation and demo in Vanilla JS which uses their Javascript API.

You might be wondering, the demo is in Vanilla JS so if I have to make it a React Component and use it in my app.hmm, that might take a while 🤔

**_powerbi-report-component to the rescue! ✨_**


Check out the [package](https://www.npmjs.com/package/powerbi-report-component).

Usage,

```javascript
import Report from "powerbi-report-component";

<Report
  embedType="report" // or "dashboard"
  tokenType="Embed" // or "Aad"
  accessToken="" // accessToken goes here
  embedUrl="" // embedUrl goes here
  embedId="" // Report or Dashboard ID goes here
  permissions="All" // or "View"
  style={myStyleObject}
/>
```

**Currently supported features:**

1. Custom styling by passing style to your embedded report component.
2. The component also lets you pass callbacks to trigger on events like:

_Page Change_

```javascript

onPageChange={(data) =>
  console.log(`Page name :{data.newPage.displayName}`)
}

```

_Load_

```javascript

onLoad={(report) => {
      console.log('Report Loaded!');
      this.report = report;
// Read docs to know how to use the report object that is returned
    }
}

```

_Data Element Clicked_

```javascript

onSelectData={(data) =>
  console.log(`You clicked on chart: {data.visual.title}`)
}

```

3. Use 'report' object returned to parent component for:

Fullscreen

```javascript
setFullscreen = () => this.report.fullscreen()
```

Print Report

```javascript
printReport = () => this.report.print()
```

Change report mode, show/hide visual headers, filters(set, get, remove)

Change Mode

```javascript
// mode can be "view" or "edit"

changeMode = mode => this.report.switchMode(mode)
```

Show or Hide Visual Headers

```javascript
toggleAllVisualHeaders = bool => {
  const newSettings = {
    visualSettings: {
      visualHeaders: [
        {
          settings: {
            visible: bool,
          },
        },
      ],
    },
  }
  this.report
    .updateSettings(newSettings)
    .then(function() {
      console.log(`Visual header was toggled to {bool}`)
    })
    .catch(function(errors) {
      console.log(errors)
    })
}
```

Set Filters

```javascript

  //example filter object from Microsoft's demo page

    const filter = {
      $schema: "http://powerbi.com/product/schema#basic",
      target: {
        table: "Store",
        column: "Chain"
      },
      operator: "In",
      values: ["Lindseys"]
    };

    // using event handlers

    setFilter = (filter) =>
    this.report.setFilters([filter]).catch(function (errors) {
        console.log(errors);
    });

    // during load of report

    onLoad = (report) => {
      report.setFilters([filter]).catch(function (errors) {
        console.log(errors);
      });
      this.report = report;
    }
  }

```

Get Filters

```javascript
getFilter = () =>
  this.report
    .getFilters()
    .then(function(filters) {
      console.log(filters)
    })
    .catch(function(errors) {
      console.log(errors)
    })
```

Remove Filters

```javascript
removeFilters = () =>
  this.report.removeFilters().catch(function(errors) {
    console.log(errors)
  })
```

More features coming soon! ⚡️

Links: [Demo site](http://akshay5995.github.io/powerbi-report-component), [GitHub](https://github.com/akshay5995/powerbi-report-component)

> I would love to hear your thoughts and feedback (also any request for new features at https://github.com/akshay5995/powerbi-report-component/issues).

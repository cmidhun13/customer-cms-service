# VinPro Crafter CMS React Components

Created October 30, 2020 by Tony Field (tony@kingsway.digital)  
Updated November 12, 2020 by Tony Field (tony@kingsway.digital)

## Features
### RenderCrafterComponent

This component communicates with Crafter CMS that has the Vinpro `vendor-ui-templates` site deployed to display a
Crafter component inside a React app.  The component is pre-rendered
by Crafter CMS, and the rendered markup is directly included.

The current version does not post-process the results.  Links and included
images will not render correctly, as their URLs assume a URL root of /, 
and the React app will not auto-proxy them.  A future enhancement
will introduce processing of the included markup prior to streaming it to
ensure that URLs are "fixed" appropriately.

#### Usage
```
import React from 'react';
import ReactDOM from 'react-dom';
import RenderCrafterComponent from "./components/buttons/RenderCrafterComponent";

ReactDOM.render(
  <>
    <RenderCrafterComponent site={"vendor-ui-template"}
                            path={"/site/components/widgets/0d9bc921-62f2-29be-a634-912f8814f3c9.xml"}/>
  </>,
document.getElementById('crafter-hookup-2')
)
```

such that `path` corresponds to the Crafter CMS path of the component, and `site` is the site in which the component
is found.  Invalid paths or an invalid site will result in an error.

### PendingApprovals Component

This component communicates with Crafter Studio running on Crafter CMS with the 
Vinpro `vendor-ui-templates` site deployed, to retrieve a list of
pending workflow tasks assigned to the roles held by the currently
logged-in user.  It displays a count of the number of sites
requiring attention in a badge, and includes a tooltip for the
badge that lists the number of specific content items requiring
attention by site.

####Usage:

```
import React from 'react';
import ReactDOM from 'react-dom';
import PendingApprovals from "./components/buttons/PendingApprovals";

ReactDOM.render(
    <PendingApprovals sites={["vendor-ui-template", "editorial" ]}/>,
  document.getElementById('crafter-hookup-1')
);
```

where `sites` is an array of valid site IDs to be checked.  If the
specified sites are not all valid, an error will be thrown.

## Configuration

Currently, this integration allows a developer to specify a username and password
to connect to Crafter.  The services that this communicates with
are tuned to support single sign-on through VinPro's SSO proxy.

The URL of the crafter server (or its proxy) must be specified both 
in development mode and production.

Settings file (`.env.development` or `.env.production`):

```
REACT_APP_CRAFTER_BASE_URL=http://susan:8080
REACT_APP_CRAFTER_USER=admin
REACT_APP_CRAFTER_PASSWORD=admin
```

These two components are housed in a trivial sample HTML site,
though this is not at all required for the components
to function.

It may make sense to deploy these two components to a npm repository
like `npmjs.com` but for now the components are here.

## Startup
`yarn start`

## Build production release
`yarn build`

## Known Issues
None yet.
import React, {useEffect, useState} from 'react'
import {handleFetchErrors} from "../../util/fetch-utils";

export default function RenderCrafterComponent(props) {
  const {
    path,
    site
  } = props;

  const [crafterComponent, setCrafterComponent] = useState(null);
  const [error, setError] = useState(null);
  useEffect(() => {
    if (!crafterComponent && !error) {
      const endpoint = process.env.REACT_APP_CRAFTER_BASE_URL + `/api/1/services/vinpro/components/render-component.json?crafterSite=${site}&path=${path}`
      const init = {
        headers: {},
      }
      fetch(endpoint, init)
        .then(handleFetchErrors)
        .then(response => response.json())
        .then(response => setCrafterComponent(response), err => setError(err))
        .catch(err => setError(err))
    }
  }, [path, site, crafterComponent, setCrafterComponent, error, setError])


  if (error) {
    console.log("Error found:", error)
    return <h3>Error rendering component: {JSON.stringify(error)}</h3>
  }

  if (crafterComponent) {
    const html = fixLinks(crafterComponent.markup, site)
    return <section>
      <div dangerouslySetInnerHTML={{__html: `${html}`}}/>
    </section>
  }

  return <h3>Loading...</h3>
}

function fixLinks(html, site) {
  html = fixStaticAssetLinks(html, site)
  return html
}

function fixStaticAssetLinks(html, site) {
  if (html) {
    let pfx = process.env.REACT_APP_CRAFTER_BASE_URL
    html = html.replace("/static-assets/", pfx + "/static-assets/")

    // the following section is ONLY required during development, when hostnames are ambiguous.
    let idx = 0
    while (idx >= 0) {
      idx = html.indexOf("/static-assets/", idx);
      if (idx >= 0) {
        let endQuote = html.indexOf("\"", idx + 1)
        if (endQuote >= 0) {
          let newhtml = html.substr(0, endQuote)
          newhtml += "?crafterSite=" + site+"\""
          newhtml += html.substr(endQuote+1);
          html = newhtml
          idx = endQuote
        }
      }
    }
    return html;
  } else {
    return html;
  }
}
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
        mode: 'cors',
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
    return <section>
      <div dangerouslySetInnerHTML={{__html: `${crafterComponent.markup}`}}/>
    </section>
  }

  return <h3>Loading...</h3>
}

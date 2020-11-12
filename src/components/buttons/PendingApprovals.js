import React, {useEffect, useState} from 'react';
import Button from "@material-ui/core/Button";
import PublishIcon from '@material-ui/icons/Publish';
import makeStyles from "@material-ui/core/styles/makeStyles";
import Tooltip from "@material-ui/core/Tooltip";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles((theme) => ({
  tooltip: {
    minWidth: 400,
    maxWidth: 600,
  },
  overlay: {
    paddingTop: 15,
    paddingBottom: 0,
    paddingRight: 15,
    paddingLeft: 15,
  }
}))

export default (WorkflowBadge)

function WorkflowBadge(props) {
  const {
    sites,
  } = props


  const [data, setData] = useState(null)
  const [error, setError] = useState(null)
  useEffect(() => {
    if (!data) {
      const params = {
        username: process.env.REACT_APP_CRAFTER_USER,
        password: process.env.REACT_APP_CRAFTER_PASSWORD,
        sites: sites
      }
      const init = {
        credentials: "include",
        method: 'POST',
        body: JSON.stringify(params)
      }
      const endpoint = process.env.REACT_APP_CRAFTER_BASE_URL + `/api/1/services/vinpro/workflow/my-task-list.json?crafterSite=${sites[0]}&sites=${sites}`
      fetch (endpoint, init)
        .then(response => response.json())
        .then(response => {
          // console.log("my-task-list RESPONSE:", response)
          if (response.faultcode) {
            setError({
              code: response.faultcode,
              message: response.faultstring
            })
          }
          setData(response)
        })
    }
  }, [data, setData, sites, setError])



  const [count, setCount] = useState(null)
  useEffect(() => {
    if (!count && data) {
      let count = 0;

      for (const site of Object.keys(data.taskinfo)) {
        const items = data.taskinfo[site];
        if (items.length > 0) {
          count++
        }
      }

      setCount(count)
    }
  }, [count, setCount, data])



  if (error) return <div>Error No. {error.code}: {error.message}</div>
  if (data) return <Badge taskinfo={data.taskinfo} count={count}/>
  return <div>Loading...</div>
}

function Badge(props) {
  const {
    count,
    taskinfo,
  } = props

  const classes = useStyles();

  if (!count) return null;

  if (count < 0) return <Button disabled  sizes={"small"} variant={"contained"} startIcon={<PublishIcon />}>Failed to load workflow</Button>

  if (count > 0) {
    return <Tooltip className={classes.tooltip} title={<ListOverlay taskinfo={taskinfo} />} interactive>
      <Button color="secondary" size={"small"}
              variant="contained"
              startIcon={<PublishIcon/>}>{count} Approvals Pending</Button>
    </Tooltip>
  } else {
    return <Button color="primary" size={"small"}
                   variant="contained"
                   startIcon={<PublishIcon/>}>No Approvals Pending</Button>
  }
}

function ListOverlay(props) {
  const {
    taskinfo
  } = props;
  const classes = useStyles();
  if (!taskinfo) return null;
  return <aside className={classes.overlay}>
    <ul>
      {Object.keys(taskinfo).map((site) => {
        const items = taskinfo[site]
        if (items.length > 0) {
          return <li key={site}><Typography variant={"body1"}><strong><em>{site} ({items.length})</em></strong></Typography></li>
        } else {
          return null
        }
      })}
    </ul>
  </aside>
}
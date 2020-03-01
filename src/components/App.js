import React from 'react'
import { Link } from 'react-router-dom'
import Grid from '@material-ui/core/Grid';
import MeetingRoomIcon from '@material-ui/icons/MeetingRoom';
import PersonAddIcon from '@material-ui/icons/PersonAdd';
import Button from '@material-ui/core/Button'
import Header from './Header'
import ProfileSearch from './Profiles'
import {PostMaker, Feed} from './PostComponents'

import { makeStyles } from '@material-ui/core/styles'

import styles from '../app.css'

const useStyles = makeStyles(theme => ({
  headerRoot: {
    marginBottom: theme.spacing(2)
  },
  feedMargin: {
    marginTop: theme.spacing(2)
  }
}))

function App(props) {
  const { authState, modifyAuthState } = props

  const classes = useStyles()

  if (authState.isAuthenticated) {
    return (
      <React.Fragment>
        <Grid container justify='flex-end' className={classes.headerRoot}>
          <Header modifyAuthState={modifyAuthState}/>
        </Grid>
        <Grid container spacing={2}>
          <Grid item md={4} xs={12}>
            <ProfileSearch
              authState={authState}
              modifyAuthState={modifyAuthState}
            />
          </Grid>
          <Grid item md={2} xs={12}/>
          <Grid container item md={6} xs={12}>
            <Grid item xs={12}>
              <PostMaker authState={authState} modifyAuthState={modifyAuthState}/>
            </Grid>
            <Grid item xs={12} className={classes.feedMargin}>
              <Feed authState={authState} modifyAuthState={modifyAuthState}/>
            </Grid>
          </Grid>
        </Grid>
      </React.Fragment>
    )
  } else {
    return (
      <div className={styles.authWrapper}>
        <ul className={styles.auth_ul}>
          <li className={styles.auth_li}>
            <Link to='/login'>
              <Button
                variant="contained"
                color="primary"
                startIcon={<MeetingRoomIcon />}
              >
                Login
              </Button>
            </Link>
          </li>
          <li className={styles.auth_li}>
            <Link to='/register'>
              <Button
                variant="contained"
                color="primary"
                startIcon={<PersonAddIcon />}
              >
                Register
              </Button>
            </Link>
          </li>
        </ul>
      </div>
    )
  }
}

export { App }

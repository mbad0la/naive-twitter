import React, { useState, useContext } from 'react'

import { Link } from 'react-router-dom'

import Avatar from '@material-ui/core/Avatar'
import Button from '@material-ui/core/Button'
import CircularProgress from '@material-ui/core/CircularProgress';
import Container from '@material-ui/core/Container'
import Grid from '@material-ui/core/Grid';
import MeetingRoomIcon from '@material-ui/icons/MeetingRoom';
import PersonAddIcon from '@material-ui/icons/PersonAdd';

import { makeStyles } from '@material-ui/core/styles'

import Header from './Header'
import { Profile } from './Profiles'
import { Feed, PostMaker } from './PostComponents'

import { AuthContext } from '../AuthContext'

const useStyles = makeStyles(theme => ({
  feedMargin: {
    marginTop: theme.spacing(2)
  },
  relativeWrapper: {
    position: 'relative'
  },
  guestScreenRoot: {
    position: 'absolute',
    top: 0,
    left: 0,
    height: '100%',
    width: '100%'
  },
  reAuthAvatarSize: {
    width: theme.spacing(7),
    height: theme.spacing(7)
  },
  progress: {
    position: 'absolute',
    top: -6,
    left: -6,
    zIndex: 1,
  },
  guestScreenButton: {
    margin: theme.spacing(2)
  }
}))

function App(props) {
  const [matches, setMatches] = useState([])
  const { authState, modifyAuthState } = props
  const { clientAuthFlag, serverAuthFlag, followers } = useContext(AuthContext)

  const classes = useStyles()

  if (clientAuthFlag && !serverAuthFlag) {
    return (
      <Grid container className={classes.guestScreenRoot} justify='center' alignItems='center'>
        <div className={classes.relativeWrapper}>
          <Avatar className={classes.reAuthAvatarSize}><MeetingRoomIcon /></Avatar>
          <CircularProgress size={68} className={classes.progress}/>
        </div>
      </Grid>
    )
  }

  if (clientAuthFlag) {
    return (
      <Container maxWidth={false}>
        <Header modifyAuthState={modifyAuthState} setMatches={setMatches}/>
        <Grid container spacing={2}>
          <Grid item md={4} xs={12}>
          {
            matches.map(match => (
              <Profile
                key={match.username}
                follower={followers.includes(match.username)}
                data={match}
                authState={authState}
                modifyAuthState={modifyAuthState}
              />
            ))
          } 
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
      </Container>
    )
  } else {
    return (
      <Grid container className={classes.guestScreenRoot} justify='center' alignItems='center'>
        <Link to='/login'>
          <Button
            className={classes.guestScreenButton}
            variant="contained"
            color="primary"
          >
            <MeetingRoomIcon />
          </Button>
        </Link>
        <Link to='/register'>
          <Button
            className={classes.guestScreenButton}
            variant="contained"
            color="primary"
          >
            <PersonAddIcon />
          </Button>
        </Link>
      </Grid>
    )
  }
}

export default App

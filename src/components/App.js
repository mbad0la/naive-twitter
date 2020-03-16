import React, { useState, useContext } from 'react'

import Container from '@material-ui/core/Container'
import Grid from '@material-ui/core/Grid'

import { makeStyles } from '@material-ui/core/styles'

import Header from './Header'
import { Landing } from './Landing'
import { Profile } from './Profiles'
import { Feed, PostMaker } from './PostComponents'
import { Splash } from './Splash'

import { AuthContext } from '../contexts'

const useStyles = makeStyles(theme => ({
  feedMargin: {
    marginTop: theme.spacing(2)
  }
}))

function App(props) {
  const [matches, setMatches] = useState([])
  const [feed, setFeed] = useState([])
  const { clientAuthFlag, serverAuthFlag, user, token } = useContext(AuthContext)

  const classes = useStyles()

  if (clientAuthFlag && !serverAuthFlag) {
    return <Splash />
  }

  if (clientAuthFlag) {
    return (
      <Container maxWidth={false}>
        <Header setMatches={setMatches}/>
        <Grid container spacing={2}>
          <Grid item md={4} xs={12}>
          {
            matches.map(match => (
              <Profile
                key={match.username}
                follower={user.followers.includes(match.username)}
                data={match}
                setFeed={setFeed}
              />
            ))
          } 
          </Grid>
          <Grid item md={2} xs={12}/>
          <Grid container item md={6} xs={12}>
            <Grid item xs={12}>
              <PostMaker setFeed={setFeed}/>
            </Grid>
            <Grid item xs={12} className={classes.feedMargin}>
              <Feed token={token} feed={feed} setFeed={setFeed}/>
            </Grid>
          </Grid>
        </Grid>
      </Container>
    )
  } else {
    return <Landing />
  }
}

export default App

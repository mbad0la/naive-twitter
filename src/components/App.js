import React, { useState, useContext } from 'react'

import { Route } from 'react-router-dom'

import Container from '@material-ui/core/Container'
import Grid from '@material-ui/core/Grid'

import Typography from '@material-ui/core/Typography'


import { makeStyles } from '@material-ui/core/styles'

import Header from './Header'
import { Landing } from './Landing'
import { Profile } from './Profile'
import { Feed } from './PostComponents'
import { Splash } from './Splash'

import { AuthContext, FeedContext } from '../contexts'

const useStyles = makeStyles(theme => ({
  content: {
    position: 'relative',
    top: '15vh'
  },
  feedMargin: {
    marginTop: theme.spacing(2)
  }
}))

function App(props) {
  const [pageName, setPageName] = useState('profile')
  const [feed, setFeed] = useState([])
  const [matches, setMatches] = useState([])
  const { clientAuthFlag, serverAuthFlag, user, token } = useContext(AuthContext)

  const classes = useStyles()

  if (clientAuthFlag && !serverAuthFlag) {
    return <Splash />
  }

  if (clientAuthFlag) {
    return (
      <FeedContext.Provider value={{ feed, setFeed }}>
        <Grid container justify='center'>
          <Header pageName={pageName} setPageName={setPageName}/>
          <Grid item xs={10} sm={6} md={4} className={classes.content}>
            <Content name={pageName} />
          </Grid>
        </Grid>
      </FeedContext.Provider>
    )
  } else {
    return <Landing />
  }
}

const Content = ({ name }) => {
  switch (name) {
    case 'search':
      return <Typography variant='body1' component='p'>{`Search Page`}</Typography>
    case 'home':
      return <Feed />
    case 'profile':
      return <Profile />
    default:
      return <Typography variant='body1' component='p'>{`Unknown Page`}</Typography>
  }
}

export default App

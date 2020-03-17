import React, { useState, useContext } from 'react'

import Grid from '@material-ui/core/Grid'

import { makeStyles } from '@material-ui/core/styles'

import Header from './Header'
import { Landing } from './Landing'
import { Profile } from './Profile'
import { Home } from './Home'
import { Search } from './Search'
import { Splash } from './Splash'

import { AuthContext, FeedContext } from '../contexts'

const useStyles = makeStyles(theme => ({
  content: {
    position: 'absolute',
    top: '5rem'
  },
  feedMargin: {
    marginTop: theme.spacing(2)
  }
}))

function App(props) {
  const [pageName, setPageName] = useState('home')
  const [feed, setFeed] = useState([])
  const { clientAuthFlag, serverAuthFlag } = useContext(AuthContext)

  const classes = useStyles()

  if (clientAuthFlag && !serverAuthFlag) {
    return <Splash />
  }

  if (clientAuthFlag) {
    return (
      <FeedContext.Provider value={{ feed, setFeed }}>
        <Header pageName={pageName} setPageName={setPageName}/>
        <Grid container justify='center' className={classes.content}>
            <Grid item xs={10} sm={6} md={4} >
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
      return <Search />
    case 'home':
      return <Home />
    case 'profile':
      return <Profile />
    default:
      return null
  }
}

export default App

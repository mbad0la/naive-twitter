import React, { useState, useContext, Suspense } from 'react'

import CircularProgress from '@material-ui/core/CircularProgress'
import Grid from '@material-ui/core/Grid'

import { makeStyles } from '@material-ui/core/styles'

import Header from './Header'
import { Landing } from './Landing'

const Profile = React.lazy(() => import(/* webpackChunkName: "profile" */ './Profile'))
const Home = React.lazy(() => import(/* webpackChunkName: "home" */ './Home'))
const Search = React.lazy(() => import(/* webpackChunkName: "search" */ './Search'))

import { Splash } from './Splash'

import { AuthContext, FeedContext } from '../contexts'

const useStyles = makeStyles(theme => ({
  content: {
    position: 'absolute',
    top: '5rem'
  },
  feedMargin: {
    marginTop: theme.spacing(2)
  },
  chunkLoader: {
    position: 'relative',
    left: 'calc(50% - 20px)',
    color: 'rgb(29, 161, 242)' 
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
              <Suspense fallback={<CircularProgress className={classes.chunkLoader} />}>
                <Content name={pageName} />
              </Suspense>
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

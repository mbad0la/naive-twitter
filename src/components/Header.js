import React from 'react'

import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button'

import { makeStyles } from '@material-ui/core/styles'

import {ProfileSearch} from './Profiles'

const useStyles = makeStyles(theme => ({
  headerRoot: {
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(3)
  },
  logoutRoot: {
    textAlign: 'end'
  }
}))

function logout(modifyAuthState) {
  localStorage.removeItem('postman_naive_twitter_auth')
  localStorage.removeItem('postman_naive_twitter_token')
  localStorage.removeItem('postman_naive_twitter_user')
  localStorage.removeItem('postman_naive_twitter_followers')

  modifyAuthState.setToken(null)
  modifyAuthState.setIsAuthenticated(false)
  modifyAuthState.setUser(null)
  modifyAuthState.setFollowers([])
  modifyAuthState.setFeed([])
}

function Header(props) {
  const {modifyAuthState, setMatches} = props

  const classes = useStyles()

  return (
    <Grid container className={classes.headerRoot}>
      <Grid item xs={7} md={4}>
        <ProfileSearch
          setMatches={setMatches}
        />
      </Grid>
      <Grid item xs={1} md={4}/>
      <Grid container item xs={4} md={4} justify='flex-end'>
        <Button
          size='medium'
          color='secondary'
          onClick={() => logout(modifyAuthState)}
        >
          Sign Out
        </Button>
      </Grid>
    </Grid>
  )
}

export default Header
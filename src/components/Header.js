import React, { useContext } from 'react'

import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button'

import { makeStyles } from '@material-ui/core/styles'

import { ProfileSearch } from './Profiles'

import { AuthContext } from '../contexts'

const useStyles = makeStyles(theme => ({
  headerRoot: {
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(3)
  },
  logoutRoot: {
    textAlign: 'end'
  }
}))

function logout(authContext) {
  const { setClientAuthFlag, setServerAuthFlag, setToken, setUser } = authContext

  setServerAuthFlag(false)

  localStorage.removeItem('postman_naive_twitter_auth')
  localStorage.removeItem('postman_naive_twitter_token')
  localStorage.removeItem('postman_naive_twitter_user')

  setToken(null)
  setUser(null)

  setClientAuthFlag(false)
}

function Header(props) {
  const authContext = useContext(AuthContext)
  const { setMatches } = props

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
          onClick={() => logout(authContext)}
        >
          Sign Out
        </Button>
      </Grid>
    </Grid>
  )
}

export default Header
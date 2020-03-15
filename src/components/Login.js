import React, { useContext } from 'react'

import { Redirect } from 'react-router-dom'

import Button from '@material-ui/core/Button'
import Grid from '@material-ui/core/Grid'
import TextField from '@material-ui/core/TextField'

import { makeStyles } from '@material-ui/core/styles'

import axios from 'axios'

import { AuthContext } from '../AuthContext'
import { useControlledInput } from '../hooks'

const useStyles = makeStyles(theme => ({
  root: {
    position: 'absolute',
    top: 0,
    left: 0,
    height: '100%',
    width: '100%'
  },
  marginTopOne: {
    marginTop: theme.spacing(1)
  },
  marginTopTwo: {
    marginTop: theme.spacing(2)
  }
}))


function login(payload, authContext, setFeed) {
  axios.post('/login', payload)
    .then(res => {
      const { setClientAuthFlag, setServerAuthFlag, setToken, setUser, setFollowers } = authContext
      const { token, user, followers, feed } = res.data

      setClientAuthFlag(true)

      localStorage.setItem('postman_naive_twitter_token', token)
      localStorage.setItem('postman_naive_twitter_auth', true)
      localStorage.setItem('postman_naive_twitter_user', user)
      localStorage.setItem('postman_naive_twitter_followers', followers)

      setToken(token)
      setUser(user)
      setFollowers(followers)
      setFeed(feed)
      setServerAuthFlag(true)
    })
}

function Login(props) {
  const authContext = useContext(AuthContext)
  const username = useControlledInput('')
  const password = useControlledInput('')
  const { modifyAuthState } = props

  const classes = useStyles()

  const payload = {
    username: username.value,
    password: password.value
  }

  if (authContext.clientAuthFlag) {
    return (
      <Redirect to={{
        pathname: '/',
        state: {from: '/login'}
      }}/>
    )
  }

  return (
    <Grid container className={classes.root} justify='center' alignItems='center'>
      <Grid container item xs={8} md={3} direction='column'>
        <Grid item xs={12} className={classes.marginTopOne}>
          <TextField
            label='Username'
            fullWidth={true}
            { ...username }
          />
        </Grid>
        <Grid item xs={12} className={classes.marginTopOne}>
          <TextField
            type='password'
            label='Password'
            fullWidth={true}
            { ...password }
          />
        </Grid>
        <Grid item xs={12} className={classes.marginTopTwo}>
          <Button
            variant='contained' 
            color='primary'
            fullWidth={true}
            onClick={() => login(payload, authContext, modifyAuthState.setFeed)}
          >
            Login
          </Button>
        </Grid>
      </Grid>
    </Grid>
  )
}

export default Login
export { login }
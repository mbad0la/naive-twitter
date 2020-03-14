import React from 'react'

import { Redirect } from 'react-router-dom'

import Button from '@material-ui/core/Button'
import Grid from '@material-ui/core/Grid'
import TextField from '@material-ui/core/TextField'

import { makeStyles } from '@material-ui/core/styles'

import axios from 'axios'

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


function login(payload, modifyAuthState) {
  axios.post('/login', payload)
    .then(res => {
      const { token, isAuthenticated, user, followers, feed } = res.data

      localStorage.setItem('postman_naive_twitter_token', token)
      localStorage.setItem('postman_naive_twitter_auth', isAuthenticated)
      localStorage.setItem('postman_naive_twitter_user', user)
      localStorage.setItem('postman_naive_twitter_followers', followers)

      modifyAuthState.setToken(token)
      modifyAuthState.setIsAuthenticated(isAuthenticated)
      modifyAuthState.setUser(user)
      modifyAuthState.setFollowers(followers)
      modifyAuthState.setFeed(feed)
      modifyAuthState.setServerAuthorised(true)

    })
}

function Login(props) {
  const username = useControlledInput('')
  const password = useControlledInput('')
  const { authState, modifyAuthState } = props

  const classes = useStyles()

  const payload = {
    username: username.value,
    password: password.value
  }

  if (authState.isAuthenticated) {
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
            onClick={() => login(payload, modifyAuthState)}
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
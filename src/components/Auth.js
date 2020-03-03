import React, { useState } from 'react'
import { Redirect } from 'react-router-dom'
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import axios from 'axios'

import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles(theme => ({
  root: {
    position: 'absolute',
    top: 0,
    left: 0,
    height: '100%',
    width: '100%'
  },
  marginTop: {
    marginTop: theme.spacing(2)
  }
}))


function login(payload, modifyAuthState) {
  axios.post('/login', payload)
    .then(res => {
      console.log(res.data)

      const {token, isAuthenticated, user, followers, feed} = res.data

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

function register(event, payload, modifiers) {
  event.preventDefault()

  const {
    setFirstName,
    setLastName,
    setPassword,
    setUsername,
    setErrFirstName,
    setErrLastName,
    setErrPassword,
    setErrUsername
  } = modifiers

  axios.post('/register', payload)
    .then(res => {
      if (res.data.success) {
        setFirstName('');
        setLastName('');
        setPassword('');
        setUsername('');
        setErrFirstName(false);
        setErrLastName(false);
        setErrPassword(false);
        setErrUsername(false);

        alert('Successful registration for ' + res.data.user)
      } else {
        res.data.errors.forEach(error => {
          if (error == 'firstName') {
            setErrFirstName(true);
          } else if (error == 'lastName') {
            setErrLastName(true);
          } else if (error == 'username') {
            setErrUsername(true);
          } else {
            setErrPassword(true);
          }
        })
      }
    })
}


function Login(props) {
  const [ username, setUsername ] = useState('')
  const [ password, setPassword ] = useState('')

  const { authState, modifyAuthState } = props

  const classes = useStyles()

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
        <Grid item xs={12} className={classes.marginTop}>
          <TextField
            label='Username'
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            fullWidth={true}
          />
        </Grid>
        <Grid item xs={12} className={classes.marginTop}>
          <TextField
            type='password'
            label='Password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            fullWidth={true}
          />
        </Grid>
        <Grid item xs={12} className={classes.marginTop}>
          <Button
            variant='contained' 
            color='primary'
            fullWidth={true}
            onClick={() => login({username, password}, modifyAuthState)}
          >
            Login
          </Button>
        </Grid>
      </Grid>
    </Grid>
  )
}

function Register(props) {
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [errFirstName, setErrFirstName] = useState(false)
  const [errLastName, setErrLastName] = useState(false)
  const [errUsername, setErrUsername] = useState(false)
  const [errPassword, setErrPassword] = useState(false)

  
  const {authState} = props

  const classes = useStyles()

  if (authState.isAuthenticated) {
    return (
      <Redirect to={{
        pathname: '/',
        state: { from: '/register' }
      }}/>
    )
  }

  return (
    <Grid container className={classes.root} justify='center' alignItems='center'>
      <Grid container item xs={8} md={3} direction='column'>
        <Grid item xs={12} className={classes.marginTop}>
          <TextField
            label='First Name'
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            fullWidth={true}
          />
        </Grid>
        <Grid item xs={12} className={classes.marginTop}>
          <TextField
            label='Last Name'
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            fullWidth={true}
          />         
        </Grid>
        <Grid item xs={12} className={classes.marginTop}>
          <TextField
            label='Username'
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            fullWidth={true}
          />
        </Grid>
        <Grid item xs={12} className={classes.marginTop}>
          <TextField
            type='password'
            label='Password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            fullWidth={true}
          />        
        </Grid>
        <Grid item xs={12} className={classes.marginTop}>
          <Button 
            className={classes.button}
            variant='contained' 
            color='primary'
            fullWidth={true}
            onClick={(e) => register(e, {firstName, lastName, username, password}, {setFirstName, setLastName, setUsername, setPassword, setErrFirstName, setErrLastName, setErrPassword, setErrUsername})}
          >
            Register
          </Button>
        </Grid>
      </Grid>
    </Grid>
  )
}

export { Login, Register }

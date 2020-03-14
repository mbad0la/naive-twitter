import React, { useState } from 'react'

import { Redirect } from 'react-router-dom'

import Button from '@material-ui/core/Button'
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField'

import { makeStyles } from '@material-ui/core/styles'

import axios from 'axios'

import { login } from './Login'

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

function register(event, payload, modifyAuthState) {
  axios.post('/register', payload)
    .then(res => {
      if (res.data.success) {
        modifyAuthState.setIsAuthenticated(true);
        modifyAuthState.setServerAuthorised(false);

        const loginPayload = {
          username: payload.username,
          password: payload.password
        }

        login(loginPayload, modifyAuthState)
      } else {
        // no-op
      }
    })
}

function Register(props) {
  const firstName = useControlledInput('')
  const lastName = useControlledInput('')
  const username = useControlledInput('')
  const password = useControlledInput('')
  
  const { authState, modifyAuthState } = props

  const classes = useStyles()

  const payload = {
    firstName: firstName.value,
    lastName: lastName.value,
    username: username.value,
    password: password.value
  }

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
        <Grid item xs={12} className={classes.marginTopOne}>
          <TextField
            label='First Name'
            fullWidth={true}
            { ...firstName }
          />
        </Grid>
        <Grid item xs={12} className={classes.marginTopOne}>
          <TextField
            label='Last Name'
            fullWidth={true}
            { ...lastName }
          />         
        </Grid>
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
            className={classes.button}
            variant='contained' 
            color='primary'
            fullWidth={true}
            onClick={(e) => register(e, payload, modifyAuthState)}
          >
            Register
          </Button>
        </Grid>
      </Grid>
    </Grid>
  )
}

export default Register

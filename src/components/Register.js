import React, { useContext } from 'react'

import { Redirect } from 'react-router-dom'

import Button from '@material-ui/core/Button'
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField'

import { makeStyles } from '@material-ui/core/styles'

import axios from 'axios'

import { login } from './Login'

import { AuthContext } from '../contexts';
import { useControlledInput } from '../hooks'

const useStyles = makeStyles(theme => ({
  root: {
    position: 'absolute',
    top: 0,
    left: 0,
    height: '100%',
    width: '100%',
    backgroundColor: 'rgb(218, 218, 218, 0.85)',
  },
  logo: {
    width: '100%',
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(3)
  },
  textFieldGrid: {
    marginTop: theme.spacing(1),
    '& label': {
      color: '#969696'
    },
    '& label.Mui-focused': {
      color: 'rgb(16, 31, 51)',
    },
    '& .MuiFilledInput-underline:before': {
      borderBottomColor: '#969696',
    },
    '& .MuiFilledInput-underline:after': {
      borderBottomColor: 'rgb(16, 31, 51)',
    },
    '& .MuiInputBase-root > input': {
      color: 'rgb(16, 31, 51)'
    },
    '& .MuiFilledInput-root': {
      backgroundColor: '#efefef'
    }
  },
  registerButton: {
    marginTop: theme.spacing(2),
    backgroundColor: 'rgb(16, 31, 51, 0.9)',
    textTransform: 'none',
    '&:hover': {
      backgroundColor: 'rgb(16, 31, 51)'
    }
  }
}))

function register(event, payload, authContext) {
  axios.post('/register', payload)
    .then(res => {
      if (res.data.success) {
        authContext.setClientAuthFlag(true);
        authContext.setServerAuthFlag(false);

        const loginPayload = {
          username: payload.username,
          password: payload.password
        }

        login(loginPayload, authContext)
      } else {
        // no-op
      }
    })
}

function Register(props) {
  const authContext = useContext(AuthContext)
  const firstName = useControlledInput('')
  const lastName = useControlledInput('')
  const username = useControlledInput('')
  const password = useControlledInput('')

  const classes = useStyles()

  const payload = {
    firstName: firstName.value,
    lastName: lastName.value,
    username: username.value,
    password: password.value
  }

  if (authContext.clientAuthFlag) {
    return (
      <Redirect to={{
        pathname: '/',
        state: { from: '/register' }
      }}/>
    )
  }

  return (
    <Grid container className={classes.root} justify='center' alignItems='flex-start'>
      <Grid container item xs={10} md={3} direction='column'>
        <Grid container item xs={12} justify='center'>
          <Grid item xs={3}>
            <img src='/assets/naive-twitter-logo-dark.svg' className={classes.logo}/>
          </Grid>
        </Grid>
        <Grid item xs={12} className={classes.textFieldGrid}>
          <TextField
            variant='filled'
            label='First Name'
            fullWidth={true}
            { ...firstName }
          />
        </Grid>
        <Grid item xs={12} className={classes.textFieldGrid}>
          <TextField
            variant='filled'
            label='Last Name'
            fullWidth={true}
            { ...lastName }
          />         
        </Grid>
        <Grid item xs={12} className={classes.textFieldGrid}>
          <TextField
            variant='filled'
            label='Username'
            fullWidth={true}
            { ...username }
          />
        </Grid>
        <Grid item xs={12} className={classes.textFieldGrid}>
          <TextField
            variant='filled'
            type='password'
            label='Password'
            fullWidth={true}
            { ...password }
          />        
        </Grid>
        <Grid item xs={12}>
          <Button 
            className={classes.registerButton}
            variant='contained' 
            color='primary'
            fullWidth={true}
            size='large'
            onClick={(e) => register(e, payload, authContext)}
          >
            Register
          </Button>
        </Grid>
      </Grid>
    </Grid>
  )
}

export default Register

import React, { useState, useContext } from 'react'

import { Redirect } from 'react-router-dom'

import Button from '@material-ui/core/Button'
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField'

import PersonAddIcon from '@material-ui/icons/PersonAdd';

import { makeStyles } from '@material-ui/core/styles'

import { Alert } from '@material-ui/lab'

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

function register(event, payload, authContext, setError) {
  setError(false)

  axios.post('/account/register', payload)
    .then(res => {
      if (res.data.success) {
        authContext.setClientAuthFlag(true);
        authContext.setServerAuthFlag(false);

        const loginPayload = {
          username: payload.username,
          password: payload.password
        }

        login(loginPayload, authContext, setError)
      } else {
        setError(true)
      }
    })
}

function Register(props) {
  const authContext = useContext(AuthContext)
  const name = useControlledInput('')
  const username = useControlledInput('')
  const password = useControlledInput('')

  const [error, setError] = useState(false)

  const classes = useStyles()

  const payload = {
    name: name.value,
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
      <Grid container item xs={10} sm={6} md={3} direction='column'>
        <Grid container item xs={12} justify='center'>
          <PersonAddIcon style={{ color: 'rgb(16, 31, 51)', fontSize: '3.5rem', margin: '1rem 0' }}/>
        </Grid>
        <Grid item xs={12} className={classes.textFieldGrid}>
          <TextField
            size='small'
            variant='filled'
            label='Name'
            fullWidth={true}
            { ...name }
          />
        </Grid>
        <Grid item xs={12} className={classes.textFieldGrid}>
          <TextField
            size='small'
            variant='filled'
            label='Handle'
            fullWidth={true}
            { ...username }
          />
        </Grid>
        <Grid item xs={12} className={classes.textFieldGrid}>
          <TextField
            size='small'
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
            onClick={(e) => register(e, payload, authContext, setError)}
          >
            Register
          </Button>
        </Grid>
        {
          error && <Alert style={{ marginTop: '1rem' }} severity='error'>Something is not right. Maybe try a different handle?</Alert>
        }
      </Grid>
    </Grid>
  )
}

export default Register

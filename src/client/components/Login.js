import React, { useContext } from 'react'

import { Redirect } from 'react-router-dom'

import Button from '@material-ui/core/Button'
import Grid from '@material-ui/core/Grid'
import TextField from '@material-ui/core/TextField'

import MeetingRoomIcon from '@material-ui/icons/MeetingRoom'

import { makeStyles } from '@material-ui/core/styles'

import axios from 'axios'

import { AuthContext } from '../contexts'
import { useControlledInput } from '../hooks'

const useStyles = makeStyles(theme => ({
  root: {
    position: 'absolute',
    top: 0,
    left: 0,
    height: '100%',
    width: '100%',
    backgroundColor: 'rgb(218, 218, 218, 0.85)',
    color: 'rgb(16, 31, 51)'
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
  loginButton: {
    marginTop: theme.spacing(2),
    backgroundColor: 'rgb(16, 31, 51, 0.9)',
    textTransform: 'none',
    '&:hover': {
      backgroundColor: 'rgb(16, 31, 51)'
    }
  }
}))


function login(payload, authContext) {
  axios.post('/account/login', payload)
    .then(res => {
      if (res.data.isAuthenticated) {
        const { setClientAuthFlag, setServerAuthFlag, setToken, setUser } = authContext
        const { token, user } = res.data

        setClientAuthFlag(true)

        localStorage.setItem('postman_naive_twitter_token', token)
        localStorage.setItem('postman_naive_twitter_auth', true)
        localStorage.setItem('postman_naive_twitter_user', user)

        setToken(token)
        setUser(user)
        setServerAuthFlag(true)
      }
    })
}

function Login(props) {
  const authContext = useContext(AuthContext)
  const username = useControlledInput('')
  const password = useControlledInput('')

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
    <Grid container className={classes.root} justify='center' alignItems='flex-start'>
      <Grid container item xs={10} sm={6} md={3} direction='column'>
        <Grid container item xs={12} justify='center'>
          <MeetingRoomIcon style={{ color: 'rgb(16, 31, 51)', fontSize: '3.5rem', margin: '1rem 0' }}/>
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
            variant='contained' 
            color='primary'
            fullWidth={true}
            size='large'
            className={classes.loginButton}
            onClick={() => login(payload, authContext)}
          >
            Sign In
          </Button>
        </Grid>
      </Grid>
    </Grid>
  )
}

export default Login
export { login }
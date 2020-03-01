import React, { useState } from 'react'
import { Redirect } from 'react-router-dom'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import axios from 'axios'

import styles from '../app.css'

const formStyle = {
  errorStyle: {
    color: '#ef5b25',
  },
  underlineStyle: {
    borderColor: '#ef5b25',
  },
  floatingLabelStyle: {
    color: '#ef5b25',
  },
  floatingLabelFocusStyle: {
    color: '#ef5b25',
  }
}


function login(payload, modifyAuthState) {
  axios.post('/login', payload)
    .then(res => {
      console.log(res.data)
      localStorage.setItem('postman_naive_twitter_token', res.data.token)
      localStorage.setItem('postman_naive_twitter_auth', res.data.isAuthenticated)
      localStorage.setItem('postman_naive_twitter_user', res.data.user)
      localStorage.setItem('postman_naive_twitter_followers', res.data.followers)
      modifyAuthState(res.data)
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
  const [ username, setUsername ] = useState('');
  const [ password, setPassword ] = useState('');

  const { authState, modifyAuthState } = props;

  if (authState.isAuthenticated) {
    return (
      <Redirect to={{
        pathname: '/',
        state: {from: '/login'}
      }}/>
    )
  }

  return (
    <div className={styles.form}>
      <TextField
        label='Username'
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        fullWidth={true}
      />
      <br />
      <TextField
        type='password'
        label='Password'
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        fullWidth={true}
      />
      <br />
      <Button 
        variant='contained' 
        color='primary'
        fullWidth={true}
        onClick={() => login({username, password}, modifyAuthState)}
      >
        Login
      </Button>
    </div>
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

  
  const {authState} = props;

  if (authState.isAuthenticated) {
    return (
      <Redirect to={{
        pathname: '/',
        state: { from: '/register' }
      }}/>
    )
  }

  return (
    <div className={styles.form}>
      <TextField
        label='First Name'
        value={firstName}
        onChange={(e) => setFirstName(e.target.value)}
        fullWidth={true}
      />
      <br />
      <TextField
        label='Last Name'
        value={lastName}
        onChange={(e) => setLastName(e.target.value)}
        fullWidth={true}
      />
      <br />
      <TextField
        label='Username'
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        fullWidth={true}
      />
      <br />
      <TextField
        type='password'
        label='Password'
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        fullWidth={true}
      />
      <br />
      <Button 
        variant='contained' 
        color='primary'
        fullWidth={true}
        onClick={(e) => register(e, {firstName, lastName, username, password}, {setFirstName, setLastName, setUsername, setPassword, setErrFirstName, setErrLastName, setErrPassword, setErrUsername})}
      >
        Register
      </Button>
    </div>
  )
}

export { Login, Register }

import React, { Component } from 'react'
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

class Login extends Component {

  constructor(props) {
    super(props)
    this.state = {
      username: '',
      password: ''
    }

    this.login = this.login.bind(this)
    this.handleChange = this.handleChange.bind(this)
  }

  login(event) {
    axios.post('/login', this.state)
      .then(res => {
        console.log(res.data)
        localStorage.setItem('postman_naive_twitter_token', res.data.token)
        localStorage.setItem('postman_naive_twitter_auth', res.data.isAuthenticated)
        localStorage.setItem('postman_naive_twitter_user', res.data.user)
        localStorage.setItem('postman_naive_twitter_followers', res.data.followers)
        this.props.modifyAuthState(res.data)
      })
  }

  handleChange(event) {
    this.setState({ [event.target.name]: event.target.value })
  }

  render() {
    if (this.props.authState.isAuthenticated) {
      return (
        <Redirect to={{
          pathname: '/',
          state: { from: '/login' }
        }}/>
      )
    }

    return (
      <div className={styles.form}>
        <TextField
          name='username'
          label='Username'
          value={this.state.username}
          onChange={this.handleChange}
          fullWidth={true}
        />
        {/* <TextField
          name='username'
          value={this.state.username}
          onChange={this.handleChange}
          floatingLabelText='Username'
          underlineFocusStyle={formStyle.underlineStyle}
          floatingLabelFocusStyle={formStyle.floatingLabelStyle}
        /> */}
        <br />
        <TextField
          type='password'
          name='password'
          label='Password'
          value={this.state.password}
          onChange={this.handleChange}
          fullWidth={true}
        />
        {/* <TextField
          name='password'
          value={this.state.password}
          onChange={this.handleChange}
          floatingLabelText='Password'
          type='password'
          underlineFocusStyle={formStyle.underlineStyle}
          floatingLabelFocusStyle={formStyle.floatingLabelStyle}
        /> */}
        <br />
        <Button 
          variant='contained' 
          color='primary'
          fullWidth={true}
          onClick={this.login}
        >
          Login
        </Button>
        {/* <RaisedButton
          style={{marginTop: 15}}
          backgroundColor='#ef5b25'
          label='LOGIN'
          labelColor='#ffffff'
          fullWidth={true}
          onClick={this.login}
        /> */}
      </div>
    )
  }

}

/*<input type='text' name='username' placeholder='Username' value={this.state.username} onChange={this.handleChange} />*/

class Register extends Component {

  constructor(props) {
    super(props)
    this.state = {
      firstName: '',
      lastName: '',
      username: '',
      password: '',
      errFirstName: false,
      errLastName: false,
      errUsername: false,
      errPassword: false
    }

    this.register = this.register.bind(this)
    this.handleChange = this.handleChange.bind(this)
  }

  register(event) {
    event.preventDefault()
    let { firstName, lastName, username, password } = this.state
    axios.post('/register', { firstName, lastName, username, password })
      .then(res => {
        if (res.data.success) {
          this.setState({
            firstName: '',
            lastName: '',
            username: '',
            password: '',
            errFirstName: false,
            errLastName: false,
            errUsername: false,
            errPassword: false
          })

          alert('Successful registration for ' + res.data.user)
        } else {
          let validationFails = {
            errFirstName: false,
            errLastName: false,
            errUsername: false,
            errPassword: false
          }

          res.data.errors.forEach(error => {
            if (error == 'firstName') {
              validationFails['errFirstName'] = true
            } else if (error == 'lastName') {
              validationFails['errLastName'] = true
            } else if (error == 'username') {
              validationFails['errUsername'] = true
            } else {
              validationFails['errPassword'] = true
            }
          })

          this.setState(validationFails)
        }
      })
  }

  handleChange(event) {
    this.setState({ [event.target.name]: event.target.value })
  }

  render() {
    if (this.props.authState.isAuthenticated) {
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
          name='firstName'
          label='First Name'
          value={this.state.firstName}
          onChange={this.handleChange}
          fullWidth={true}
        />
        {/* <TextField
          name='firstName'
          value={this.state.firstName}
          onChange={this.handleChange}
          floatingLabelText='First Name'
          underlineFocusStyle={formStyle.underlineStyle}
          floatingLabelFocusStyle={formStyle.floatingLabelStyle}
          errorText={this.state.errFirstName?'Required':null}
        /> */}
        <br />
        <TextField
          name='lastName'
          label='Last Name'
          value={this.state.lastName}
          onChange={this.handleChange}
          fullWidth={true}
        />
        {/* <TextField
          name='lastName'
          value={this.state.lastName}
          onChange={this.handleChange}
          floatingLabelText='Last Name'
          underlineFocusStyle={formStyle.underlineStyle}
          floatingLabelFocusStyle={formStyle.floatingLabelStyle}
          errorText={this.state.errLastName?'Required':null}
        /> */}
        <br />
        <TextField
          name='username'
          label='Username'
          value={this.state.username}
          onChange={this.handleChange}
          fullWidth={true}
        />
        {/* <TextField
          name='username'
          value={this.state.username}
          onChange={this.handleChange}
          floatingLabelText='Username'
          underlineFocusStyle={formStyle.underlineStyle}
          floatingLabelFocusStyle={formStyle.floatingLabelStyle}
          errorText={this.state.errUsername?'Required or Already taken':null}
        /> */}
        <br />
        <TextField
          type='password'
          name='password'
          label='Password'
          value={this.state.password}
          onChange={this.handleChange}
          fullWidth={true}
        />
        {/* <TextField
          name='password'
          value={this.state.password}
          onChange={this.handleChange}
          floatingLabelText='Password'
          underlineFocusStyle={formStyle.underlineStyle}
          floatingLabelFocusStyle={formStyle.floatingLabelStyle}
          type='password'
          errorText={this.state.errPassword?'Must be more than 6 characters':null}
        /> */}
        <br />
        <Button 
          variant='contained' 
          color='primary'
          fullWidth={true}
          onClick={this.register}
        >
          Register
        </Button>
        {/* <RaisedButton
          style={{marginTop: 15}}
          backgroundColor='#ef5b25'
          label='REGISTER'
          labelColor='#ffffff'
          fullWidth={true}
          onClick={this.register}
        /> */}
      </div>
    )
  }

}

export { Login, Register }

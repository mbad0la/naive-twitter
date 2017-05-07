import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter as Router, Route, Redirect, Link } from 'react-router-dom'
import axios from 'axios'

import styles from '../app.css'

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
    event.preventDefault()
    axios.post('/login', this.state)
      .then(res => {
        console.log(res.data)
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
      <form onSubmit={this.login}>
        <input type='text' name='username' placeholder='Username' value={this.state.username} onChange={this.handleChange} />
        <input type='password' name='password' placeholder='Password' value={this.state.password} onChange={this.handleChange} />
        <input type="submit" value="Submit" />
      </form>
    )
  }

}

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
      <form onSubmit={this.register}>
        <input type='text' className={this.state.errFirstName? styles.invalid : ''} name='firstName' placeholder='First Name' value={this.state.firstName} onChange={this.handleChange} />
        <input type='text' className={this.state.errLastName? styles.invalid : ''} name='lastName' placeholder='Last Name' value={this.state.lastName} onChange={this.handleChange} />
        <input type='text' className={this.state.errUsername? styles.invalid : ''} name='username' placeholder='Username' value={this.state.username} onChange={this.handleChange} />
        <input type='password' className={this.state.errPassword? styles.invalid : ''} name='password' placeholder='Password' value={this.state.password} onChange={this.handleChange} />
        <input type="submit" value="Submit" />
      </form>
    )
  }

}

export { Login, Register }

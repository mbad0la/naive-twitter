import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import axios from 'axios'

import { App } from './components/App'
import { Login, Register } from './components/Auth'

import styles from './app.css'

class View extends Component {

  constructor(props) {
    super(props)
    this.state = {
      isAuthenticated: false,
      token: undefined,
      user: undefined,
      followers: '[]',
      feed: []
    }

    this.setAuthState = this.setAuthState.bind(this)
  }

  componentWillMount() {
    let token = localStorage.getItem('postman_naive_twitter_token')
    let isAuthenticated = localStorage.getItem('postman_naive_twitter_auth') || false
    let user = localStorage.getItem('postman_naive_twitter_user')
    let followers = localStorage.getItem('postman_naive_twitter_followers') || '[]'
    if (isAuthenticated) {
      console.log('view will mount in protected mode')
      axios.get('/api/feed', {headers: {'Authorization': token}})
        .then(res => {
          if (res.data.isAuthenticated) {
            console.log('Network authorises too')
            this.setState({token, isAuthenticated, user, followers, feed: res.data.feed})
          } else {
            console.log('Network feels messy')
            this.setState(res.data)
          }
        })
    } else {
      console.log('view will mount in unprotected mode')
      this.setState({token, isAuthenticated, user, followers})
    }

  }

  setAuthState(newAuthState) {
    this.setState(newAuthState)
  }

  render() {
    return (
      <div>
        <Route exact path='/' render={() => <App modifyAuthState={this.setAuthState} authState={this.state} />} />
        <Route path='/login' render={() => <Login modifyAuthState={this.setAuthState} authState={this.state} />} />
        <Route path='/register' render={() => <Register modifyAuthState={this.setAuthState} authState={this.state} />} />
      </div>
    )
  }

}

class NoMatch extends Component {

  constructor(props) {
    super(props)
    this.state = {}
  }

  render() {
    return (
      <div className={styles.bold}>404</div>
    )
  }

}

ReactDOM.render((
  <Router>
    <View />
  </Router>
), document.getElementById('main'))

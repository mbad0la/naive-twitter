import React, { useState, useEffect } from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import axios from 'axios'

import Container from '@material-ui/core/Container'

import { App } from './components/App'
import { Login, Register } from './components/Auth'

import styles from './app.css'

function View(props) {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [token, setToken] = useState(null)
  const [user, setUser] = useState(null)
  const [followers, setFollowers] = useState([])
  const [feed, setFeed] = useState([])

  useEffect(() => {
    let token = localStorage.getItem('postman_naive_twitter_token')
    let isAuthenticated = localStorage.getItem('postman_naive_twitter_auth') || false
    let user = localStorage.getItem('postman_naive_twitter_user')
    let followers = localStorage.getItem('postman_naive_twitter_followers') || []

    if (isAuthenticated) {
      console.log('view will mount in protected mode')
      axios.get('/api/feed', {headers: {'Authorization': token}})
        .then(res => {
          if (res.data.isAuthenticated) {
            console.log('Network authorises too')
            setToken(token)
            setIsAuthenticated(isAuthenticated)
            setUser(user)
            setFollowers(followers)
            setFeed(res.data.feed)
          } else {
            console.log('Network feels messy, authentication sync failed')
            setToken(null)
            setIsAuthenticated(false)
            setUser(null)
            setFollowers([])
            setFeed([])
          }
        })
    } else {
      console.log('view will mount in unprotected mode')
      setToken(token)
      setIsAuthenticated(isAuthenticated)
      setUser(user)
      setFollowers(followers)
      setFeed([])
    }
  }, [])

  const authState = {isAuthenticated, token, user, followers, feed}
  const modifyAuthState = {setIsAuthenticated, setToken, setUser, setFollowers, setFeed}

  return (
    <Container maxWidth={false}>
      <Route exact path='/' render={() => <App modifyAuthState={modifyAuthState} authState={authState} />} />
      <Route path='/login' render={() => <Login modifyAuthState={modifyAuthState} authState={authState} />} />
      <Route path='/register' render={() => <Register modifyAuthState={modifyAuthState} authState={authState} />} />
    </Container>
  )
}

ReactDOM.render((
  <Router>
    <View />
  </Router>
), document.getElementById('main'))

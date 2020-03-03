import React, { useState, useEffect } from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import axios from 'axios'

import { App } from './components/App'
import { Login, Register } from './components/Auth'

function View(props) {
  const [serverAuthorised, setServerAuthorised] = useState(false)
  const [isAuthenticated, setIsAuthenticated] = useState(localStorage.getItem('postman_naive_twitter_auth') || false)
  const [token, setToken] = useState(localStorage.getItem('postman_naive_twitter_token'))
  const [user, setUser] = useState(localStorage.getItem('postman_naive_twitter_user'))
  const [followers, setFollowers] = useState(localStorage.getItem('postman_naive_twitter_followers') || [])
  const [feed, setFeed] = useState([])

  useEffect(() => {
    if (isAuthenticated) {
      console.log('view will mount in protected mode')
      axios.get('/api/feed', {headers: {'Authorization': token}})
        .then(res => {
          if (res.data.isAuthenticated) {
            console.log('Network authorises too')
            setTimeout(() => {
              setToken(token)
              setIsAuthenticated(true)
              setUser(user)
              setFollowers(followers)
              setFeed(res.data.feed)
              setServerAuthorised(true)
            }, 1000)
          } else {
            console.log('Network feels messy, authentication sync failed')
            setServerAuthorised(false)
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

  const authState = {isAuthenticated, serverAuthorised, token, user, followers, feed}
  const modifyAuthState = {setIsAuthenticated, setToken, setUser, setFollowers, setFeed, setServerAuthorised}

  return (
    <React.Fragment>
      <Route exact path='/' render={() => <App modifyAuthState={modifyAuthState} authState={authState} />} />
      <Route path='/login' render={() => <Login modifyAuthState={modifyAuthState} authState={authState} />} />
      <Route path='/register' render={() => <Register modifyAuthState={modifyAuthState} authState={authState} />} />
    </React.Fragment>
  )
}

ReactDOM.render((
  <Router>
    <View />
  </Router>
), document.getElementById('main'))

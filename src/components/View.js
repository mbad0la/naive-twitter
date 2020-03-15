import React, { useState, useEffect } from 'react'

import { BrowserRouter as Router, Route } from 'react-router-dom'

import axios from 'axios'

import App from './App'
import Login from './Login'
import Register from './Register'

import { AuthContext } from '../AuthContext'

function View(props) {
  const [serverAuthFlag, setServerAuthFlag] = useState(false)
  const [clientAuthFlag, setClientAuthFlag] = useState(localStorage.getItem('postman_naive_twitter_auth') || false)
  const [token, setToken] = useState(localStorage.getItem('postman_naive_twitter_token'))
  const [user, setUser] = useState(localStorage.getItem('postman_naive_twitter_user'))
  const [followers, setFollowers] = useState(localStorage.getItem('postman_naive_twitter_followers') || [])
  const [feed, setFeed] = useState([])

  useEffect(() => {
    if (clientAuthFlag) {
      console.log('view will mount in protected mode')
      axios.get('/api/feed', {headers: {'Authorization': token}})
        .then(res => {
          if (res.data.isAuthenticated) {
            console.log('Network authorises too')
            setTimeout(() => {
              setToken(token)
              setUser(user)
              setFollowers(followers)
              setFeed(res.data.feed)
              setServerAuthFlag(true)
            }, 1500)
          } else {
            console.log('Network feels messy, authentication sync failed')
            setTimeout(() => {
              setServerAuthFlag(false)
              setToken(null)
              setClientAuthFlag(false)
              setUser(null)
              setFollowers([])
              setFeed([])
            }, 1500)
          }
        })
    } else {
      console.log('view will mount in unprotected mode')
      setToken(token)
      setClientAuthFlag(clientAuthFlag)
      setUser(user)
      setFollowers(followers)
      setFeed([])
    }
  }, [])

  const authContext = {
    clientAuthFlag,
    serverAuthFlag,
    token,
    user,
    followers,
    setClientAuthFlag,
    setServerAuthFlag,
    setToken,
    setUser,
    setFollowers
  }

  const authState = { feed }
  const modifyAuthState = { setFeed }

  return (
    <AuthContext.Provider value={authContext}>
      <Route exact path='/' render={() => <App modifyAuthState={modifyAuthState} authState={authState} />} />
      <Route path='/login' render={() => <Login modifyAuthState={modifyAuthState} authState={authState} />} />
      <Route path='/register' render={() => <Register modifyAuthState={modifyAuthState} authState={authState} />} />
    </AuthContext.Provider>
  )
}

export default View
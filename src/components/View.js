import React, { useState, useEffect } from 'react'

import { BrowserRouter as Router, Route } from 'react-router-dom'

import axios from 'axios'

import App from './App'
import Login from './Login'

const Register = React.lazy(() => import('./Register'))

import { AuthContext } from '../contexts'

function View(props) {
  const [serverAuthFlag, setServerAuthFlag] = useState(false)
  const [clientAuthFlag, setClientAuthFlag] = useState(localStorage.getItem('postman_naive_twitter_auth') || false)
  const [token, setToken] = useState(localStorage.getItem('postman_naive_twitter_token'))
  const [user, setUser] = useState(localStorage.getItem('postman_naive_twitter_user'))

  useEffect(() => {
    if (clientAuthFlag) {
      console.log('view will mount in protected mode')
      axios({ method: 'post', url: '/token-check', headers: { 'Authorization': token } })
        .then(res => {
          if (res.data.isAuthenticated) {
            console.log('Network authorises too')

            setTimeout(() => {
              setToken(token)
              setUser(res.data.user)
              setServerAuthFlag(true)
            }, 1500)
          } else {
            console.log('Network feels messy, authentication sync failed')

            setServerAuthFlag(false)
            setTimeout(() => {
              setToken(null)
              setUser(null)
              setClientAuthFlag(false)
            }, 1500)
          }
        })
    } else {
      console.log('view will mount in unprotected mode')

      setToken(token)
      setClientAuthFlag(clientAuthFlag)
      setUser(user)
    }
  }, [])

  const authContext = {
    clientAuthFlag,
    serverAuthFlag,
    token,
    user,
    setClientAuthFlag,
    setServerAuthFlag,
    setToken,
    setUser
  }

  return (
    <AuthContext.Provider value={authContext}>
      <Route exact path='/' render={() => <App/>} />
      <Route exact path='/login' render={() => <Login/>} />
      <Route exact path='/register' render={() => <Register/>} />
    </AuthContext.Provider>
  )
}

export default View
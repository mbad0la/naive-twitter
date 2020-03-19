import React, { useState, useEffect, Suspense } from 'react'

import { BrowserRouter as Router, Route } from 'react-router-dom'

import axios from 'axios'

import App from './App'

const Login = React.lazy(() => import(/* webpackChunkName: "login", webpackPrefetch: true */ './Login'))
const Register = React.lazy(() => import(/* webpackChunkName: "register", webpackPrefetch: true */ './Register'))

import { AuthContext } from '../contexts'

function View(props) {
  const [serverAuthFlag, setServerAuthFlag] = useState(false)
  const [clientAuthFlag, setClientAuthFlag] = useState(localStorage.getItem('postman_naive_twitter_auth') || false)
  const [token, setToken] = useState(localStorage.getItem('postman_naive_twitter_token'))
  const [user, setUser] = useState(localStorage.getItem('postman_naive_twitter_user'))

  useEffect(() => {
    if (clientAuthFlag) {
      axios({ method: 'post', url: '/api/check', headers: { 'Authorization': token } })
        .then(res => {
          setTimeout(() => {
            setToken(token)
            setUser(res.data.user)
            setServerAuthFlag(true)
          }, 1500)
        })
        .catch(err => {
          setServerAuthFlag(false)
          setTimeout(() => {
            setToken(null)
            setUser(null)
            setClientAuthFlag(false)
          }, 1500)
        })
    } else {
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
      <Suspense fallback={null}>
        <Route exact path='/' render={() => <App/>} />
        <Route exact path='/login' render={() => <Login/>} />
        <Route exact path='/register' render={() => <Register/>} />
      </Suspense>
    </AuthContext.Provider>
  )
}

export default View
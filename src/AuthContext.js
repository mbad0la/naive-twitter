import React from 'react'

export const AuthContext = React.createContext({
  clientAuthFlag: false,
  serverAuthFlag: false,
  token: null,
  user: null,
  followers: [],
  setClientAuthFlag: () => {},
  setServerAuthFlag: () => {},
  setToken: () => {},
  setUser: () => {},
  setFollowers: () => {}
})
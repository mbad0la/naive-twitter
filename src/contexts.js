import React from 'react'

export const AuthContext = React.createContext({
  clientAuthFlag: false,
  serverAuthFlag: false,
  token: null,
  user: null,
  setClientAuthFlag: () => {},
  setServerAuthFlag: () => {},
  setToken: () => {},
  setUser: () => {}
})

export const FeedContext = React.createContext({
  feed: [],
  setFeed: () => {}
})
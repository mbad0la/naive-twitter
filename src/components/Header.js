import React, { Fragment } from 'react'

import Button from '@material-ui/core/Button'

function logout(modifyAuthState) {
  localStorage.removeItem('postman_naive_twitter_auth')
  localStorage.removeItem('postman_naive_twitter_token')
  localStorage.removeItem('postman_naive_twitter_user')
  localStorage.removeItem('postman_naive_twitter_followers')

  modifyAuthState.setToken(null)
  modifyAuthState.setIsAuthenticated(false)
  modifyAuthState.setUser(null)
  modifyAuthState.setFollowers([])
  modifyAuthState.setFeed([])
}

function Header(props) {
  const {modifyAuthState} = props

  return (
    <Fragment>
      <Button
        color='secondary'
        onClick={() => logout(modifyAuthState)}
      >
        Sign Out
      </Button>
    </Fragment>
  )
}

export default Header
import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter as Router, Route, Redirect, Link, IndexRoute } from 'react-router-dom'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import injectTapEventPlugin from 'react-tap-event-plugin'

import { App } from './components/App'
import { Login, Register } from './components/Auth'

import styles from './app.css'

injectTapEventPlugin()

class View extends Component {

  constructor(props) {
    super(props)
    this.state = {
      isAuthenticated: false,
      token: ''
    }

    this.setAuthState = this.setAuthState.bind(this)
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
    <MuiThemeProvider>
      <View />
    </MuiThemeProvider>
  </Router>
), document.getElementById('main'))

import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter as Router, Route, Redirect, Link } from 'react-router-dom'

import styles from '../app.css'

class App extends Component {

  constructor(props) {
    super(props)
    this.state = {}
  }

  render() {
    if (this.props.authState.isAuthenticated) {
      return (
        <div className={styles.bold}>App is authenticated</div>
      )
    } else {
      return (
        <div>
          <ul>
            <li><Link to='/login' className={styles.bold}>Login</Link></li>
            <li><Link to='/register' className={styles.bold}>Register</Link></li>
          </ul>
        </div>
      )
    }
  }

}

export { App }

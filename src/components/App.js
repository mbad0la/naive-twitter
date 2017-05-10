import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter as Router, Route, Redirect, Link } from 'react-router-dom'
import { Paper, FontIcon, RaisedButton } from 'material-ui'
import ProfileSearch from './Profiles'
import ViewWrapper from './View'

import styles from '../app.css'

class App extends Component {

  constructor(props) {
    super(props)
    this.state = {
      onLogin: false,
      onRegister: false
    }

    this.press = this.press.bind(this)
    this.release = this.release.bind(this)
  }

  press(event) {
    this.setState({ [event.target.attributes['for'].value]: true })
  }

  release(event) {
    this.setState({ [event.target.attributes['for'].value]: false })
  }

  render() {
    console.log(this.props.authState.isAuthenticated)
    if (this.props.authState.isAuthenticated) {
      return (
        <div className={styles.flex}>
          <ProfileSearch
            style={{width: '40%', height: '100%'}}
            authState={this.props.authState}
            modifyAuthState={this.props.modifyAuthState}
          />
          <ViewWrapper
            style={{width: '60%', height: '100%'}}
            authState={this.props.authState}
            modifyAuthState={this.props.modifyAuthState}
          />
        </div>
      )
    } else {
      return (
        <div className={styles.authWrapper}>
          <ul className={styles.auth_ul}>
            <li className={styles.auth_li}>
              <Link to='/login'>
                <RaisedButton
                  backgroundColor='#ef5b25'
                  icon={<FontIcon style={{fontSize: 22, color: '#ffffff'}} className='fa fa-sign-in'/>}>
                </RaisedButton>
              </Link>
            </li>
            <li className={styles.auth_li}>
              <Link to='/register'>
              <RaisedButton
                backgroundColor='#ef5b25'
                icon={<FontIcon style={{fontSize: 20, color: '#ffffff'}} className='fa fa-user-plus'/>}>
              </RaisedButton>
              </Link>
            </li>
          </ul>
        </div>
      )
    }
  }

}

export { App }
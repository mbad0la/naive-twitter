import React, { Component } from 'react'
import ReactDOM from 'react-dom'

import styles from './App.css'

class View extends Component {

  constructor(props) {
    super(props)
    this.state = {
      isAuthenticated: false,
      user: null
    }
  }

  render() {
    return (
      <div className={styles.bold}>First Component</div>
    )
  }

}

ReactDOM.render((
  <View />
), document.getElementById('main'))

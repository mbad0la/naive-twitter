import React from 'react'

import ReactDOM from 'react-dom'

import { BrowserRouter as Router } from 'react-router-dom'

import View from './components/View'

ReactDOM.render((
  <Router>
    <View />
  </Router>
), document.getElementById('main'))

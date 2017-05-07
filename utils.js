const fs = require('fs')

const jwt = require('jwt-simple')
const mongoose = require('mongoose')

const { User } = require('./models')

mongoose.connect('mongodb://localhost/postman')

const serverConfig = JSON.parse(fs.readFileSync('serverConfig.json').toString())

const validateToken = token => {
  return new Promise((resolve, reject) => {
    if (token) {
      try {
        let tokenArgs = token.split(' ')
        if (tokenArgs[0] == 'JWT') {
          const credentials = jwt.decode(tokenArgs[1], serverConfig.jwtSecret)
        } else {
          resolve(false)
        }
      } catch (e) {
        resolve(false)
      }

      resolve(true)
    } else {
      resolve(false)
    }
  })
}

const verifyLogin = basicAuth => {
  return new Promise((resolve, reject) => {
    if (basicAuth.username && basicAuth.password) {
      resolve({
        isAuthenticated: true,
        token: `JWT ${jwt.encode(basicAuth, serverConfig.jwtSecret)}`
      })
    } else {
      resolve({
        isAuthenticated: false
      })
    }
  })
}

const validateRegistration = userInfo => {
  let user = new User(userInfo)

  return new Promise((resolve, reject) => {
    user.save((err, user) => {
      if (err) {
        if (err.code && err.code == 11000) {
          err = ['username']
        } else {
          err = Object.keys(err.errors)
        }

        resolve({
          success: false,
          errors: err
        })
      } else {
        resolve({
          success: true,
          user: userInfo.firstName
        })
      }
    })
  })
}

module.exports = { validateToken, verifyLogin, validateRegistration }

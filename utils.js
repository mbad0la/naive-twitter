const fs = require('fs')

const jwt = require('jwt-simple')

const { User } = require('./models')

const validateToken = (token, key) => {
  return new Promise((resolve, reject) => {
    if (token) {
      try {
        let tokenArgs = token.split(' ')
        if (tokenArgs[0] == 'JWT') {
          const credentials = jwt.decode(tokenArgs[1], key)
          User.findOne({ username: credentials.username })
          .then(user => {
            if (user && user.password == credentials.password) {
              resolve({ 
                isAuthenticated: true, 
                user: {
                  firstName: user.firstName,
                  lastName: user.lastName,
                  username: user.username,
                  followers: user.followers
                }
              })
            } else {
              resolve({ isAuthenticated: false })
            }
          })
        } else {
          resolve({ isAuthenticated: false })
        }
      } catch (e) {
        resolve({ isAuthenticated: false })
      }
    } else {
      resolve({ isAuthenticated: false })
    }
  })
}

const verifyLogin = (basicAuth, key) => {
  return new Promise((resolve, reject) => {
    if (basicAuth.username && basicAuth.password) {
      User.findOne({ username: basicAuth.username })
      .then(user => {
        if (user && user.password == basicAuth.password) {
          resolve({
            isAuthenticated: true,
            token: `JWT ${jwt.encode(basicAuth, key)}`,
            user: {
              firstName: user.firstName,
              lastName: user.lastName,
              username: user.username,
              followers: user.followers
            }
          })
        } else {
          resolve({
            isAuthenticated: false
          })
        }
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
          success: true
        })
      }
    })
  })
}

module.exports = { validateToken, verifyLogin, validateRegistration }

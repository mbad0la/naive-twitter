const express = require('express')

const log = require('npmlog')

const { verifyLogin, validateRegistration } = require('../utils')


const Account = (JWT_KEY) => {
  const account = express.Router()

  account.use((req, res, next) => {
    log.info(req.path, `@${req.body.username}`)

    next()
  })

  account.post('/register', (req, res) => {
    log.info('Register', `@${req.body.username}`)

    validateRegistration(req.body)
      .then(feedback => {
        res.json(feedback)
      })
      .catch(err => {
        res.sendStatus(500)
      })
  })
    
  account.post('/login', (req, res) => {
    log.info('Login', `@${req.body.username}`)

    verifyLogin(req.body, JWT_KEY)
      .then(feedback => {
        res.json(feedback)
      })
      .catch(err => {
        res.sendStatus(500)
      })
  })

  return account
}

module.exports = Account

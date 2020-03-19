#!/usr/bin/env node

const fs = require('fs')

const mongoose = require('mongoose')
const AWS = require('aws-sdk')

const log = require('npmlog')
const express = require('express')
const bodyParser = require('body-parser')

const { verifyLogin, validateRegistration } = require('./src/server/utils')
const API = require('./src/server/api')

const serverConfig = JSON.parse(fs.readFileSync('server-config.json').toString())

const secretsClient = new AWS.SecretsManager({ region: serverConfig.awsRegion })

const app = express()

app.use(bodyParser.json())

app.use(bodyParser.urlencoded({
  extended: true
}))

app.use(express.static('dist'))

// fetch pre-route-registration configurations
secretsClient.getSecretValue({ SecretId: serverConfig.secretId }, (err, data) => {
  if (err) throw err
  else {
    const secret = JSON.parse(data.SecretString)
    const JWT_KEY = secret['jwt-token-key']

    mongoose.connect(secret['mongo-conn-string'])

    app.all('*', (req, res, next) => {
      log.http(req.method, req.url)
      next()
    })
    
    app.post('/register', (req, res) => {
      log.info('Register', `@${req.body.username}`)
    
      validateRegistration(req.body)
        .then(feedback => {
          res.json(feedback)
        })
    })
    
    app.post('/login', (req, res) => {
      log.info('Login', `@${req.body.username}`)
    
      verifyLogin(req.body, JWT_KEY)
        .then(feedback => {
          res.json(feedback)
        })
    })

    app.use('/api', API(JWT_KEY))
    
    app.get('*', (req, res) => {
      res.sendFile('./index.html', { root: __dirname })
    })
    
    app.listen(serverConfig.port, () => {
      log.info('Express', `listening on port:${serverConfig.port}`)
    })
  }
})

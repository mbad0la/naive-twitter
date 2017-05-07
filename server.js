const fs = require('fs')

const log = require('npmlog')
const express = require('express')
const bodyParser = require('body-parser')

const { validateToken, verifyLogin, validateRegistration } = require('./utils')

const app = express()
const serverConfig = JSON.parse(fs.readFileSync('serverConfig.json').toString())


app.use(bodyParser.json())

app.use(bodyParser.urlencoded({
  extended: true
}))

app.use(express.static('dist'))

app.all('*', (req, res, next) => {
  log.http(req.method, req.url)
  next()
})

app.post('/register', (req, res) => {
  log.info('Register', `@${req.body.username}`)

  validateRegistration(req.body)
    .then(feedback => {
      res.send(JSON.stringify(feedback))
    })
})

app.post('/login', (req, res) => {
  log.info('Login', `@${req.body.username}`)

  verifyLogin(req.body)
    .then(feedback => {
      res.send(JSON.stringify(feedback))
    })
})

app.post('/validate', (req, res) => {
  let token = req.get('Authorization')

  validateToken(token)
    .then(feedback => {
      res.send(JSON.stringify(feedback))
    })
})

app.get('*', (req, res) => {
  res.sendFile('./index.html', { root: __dirname })
})

app.listen(serverConfig.port, () => {
  log.info('Express', `listening on localhost:${serverConfig.port}`)
})

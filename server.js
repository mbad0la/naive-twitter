const fs = require('fs')

const log = require('npmlog')
const express = require('express')
const bodyParser = require('body-parser')

const { validateToken, verifyLogin } = require('./utils')

const app = express()
const serverConfig = JSON.parse(fs.readFileSync('serverConfig.json').toString())


app.use(bodyParser.json())

app.use(bodyParser.urlencoded({
  extended: true
}))

app.all('*', (req, res, next) => {
  log.http(req.method, req.url)
  next()
})

app.post('/login', (req, res) => {
  log.info('Login', JSON.stringify(req.body))
  res.send(JSON.stringify(verifyLogin(req.body)))
})

app.post('/validate', (req, res) => {
  let token = req.get('Authorization')

  res.send(JSON.stringify({isAuthenticated: validateToken(token)}))
})

app.get('/', (req, res) => {
  res.send('Get World')
})

app.post('/', (req, res) => {
  res.send('Post World')
})

app.listen(serverConfig.port, () => {
  log.info('Express', `listening on localhost:${serverConfig.port}`)
})

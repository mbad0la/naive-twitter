const fs = require('fs')

const log = require('npmlog')
const express = require('express')

const app = express()
const serverConfig = JSON.parse(fs.readFileSync('serverConfig.json').toString())

app.all('*', (req, res, next) => {
  log.http(req.method, req.url)
  next()
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

const fs = require('fs')

const log = require('npmlog')
const express = require('express')

const app = express()
const serverConfig = JSON.parse(fs.readFileSync('serverConfig.json').toString())

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(serverConfig.port, () => {
  log.info('Express', `listening on localhost:${serverConfig.port}`)
})

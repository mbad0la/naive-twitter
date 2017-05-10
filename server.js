const fs = require('fs')

const log = require('npmlog')
const express = require('express')
const bodyParser = require('body-parser')

const { validateToken, verifyLogin, validateRegistration } = require('./utils')
const { User, Post } = require('./models')

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
      let feed_followers = JSON.parse(feedback.followers)
      feed_followers.push(feedback.user)
      Post.find({'user.username': {$in: feed_followers}}).sort({timestamp: -1})
        .then(docs => {
          feedback.feed = docs
          res.json(feedback)
        })
      // res.send(JSON.stringify(feedback))
    })
})

app.post('/validate', (req, res) => {
  let token = req.get('Authorization')

  validateToken(token)
    .then(feedback => {
      res.send(JSON.stringify(feedback))
    })
})

app.get('/api/profiles/:query', (req, res) => {
  User.find({username: new RegExp(`^${req.params.query}`)}).limit(10).sort({username: -1}).select({firstName: 1, lastName: 1, username: 1, profileImageUrl: 1})
    .then(docs => res.json(docs))
})

app.put('/api/following/:source/:destination', (req, res) => {
  User.findOne({ username: req.params.source })
    .then(doc => {
      let newFollowing = doc.followers.addToSet([req.params.destination])
      doc.save((err, doc) => {
        let feed_followers = doc.followers
        feed_followers.push(doc.username)
        console.log(feed_followers)
        Post.find({'user.username': {$in: feed_followers}}).sort({timestamp: -1})
          .then(docs => {
            res.json({success: true, followers: JSON.stringify(doc.followers), feed: docs})
          })
      })
    })
})

app.delete('/api/following/:source/:destination', (req, res) => {
  User.findOne({ username: req.params.source })
    .then(doc => {
      doc.followers = doc.followers.filter(username => (username != req.params.destination))
      doc.save((err, doc) => {
        let feed_followers = doc.followers
        feed_followers.push(doc.username)
        Post.find({'user.username': {$in: feed_followers}}).sort({timestamp: -1})
          .then(docs => {
            res.json({success: true, followers: JSON.stringify(doc.followers), feed: docs})
          })
      })
    })
})

app.post('/api/post', (req, res) => {
  let token = req.get('Authorization')
  validateToken(token)
    .then(feedback => {
      if (feedback.isAuthenticated) {
        let post = new Post({content: req.body.content, user: feedback.user})
        post.save((err, post) => {
          if (err) {
            console.log(err)
            res.json({success: false})
          } else {
            let feed_followers = feedback.user.followers
            feed_followers.push(feedback.user.username)
            Post.find({'user.username': {$in: feed_followers}}).sort({timestamp: -1})
              .then(docs => {
                res.json({success: true, feed: docs})
              })
          }
        })
      } else {
        res.json(feedback)
      }
    })
})

app.get('/api/feed', (req, res) => {
  let token = req.get('Authorization')
  validateToken(token)
    .then(feedback => {
      if (feedback.isAuthenticated) {
        feedback.user.followers.push(feedback.user.username)
        console.log(feedback.user.followers)
        Post.find({'user.username': {$in: feedback.user.followers}}).sort({timestamp: -1})
          .then(docs => {
            res.json(docs)
          })
      } else {
        res.json(feedback)
      }
    })
    .catch(e => {
      res.json({isAuthenticated: false})
    })
})

app.get('*', (req, res) => {
  res.sendFile('./index.html', { root: __dirname })
})

app.listen(serverConfig.port, () => {
  log.info('Express', `listening on localhost:${serverConfig.port}`)
})

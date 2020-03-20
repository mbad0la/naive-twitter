const express = require('express')

const { authenticateToken } = require('./utils')
const { User, Post } = require('./models')

const updateFollowers = (req, res, pureModifier) => {
  const { username } = req.user

  User.findOne({ username })
    .then(doc => {
      doc.followers = pureModifier(doc.followers, req.params.handle)

      doc.save((err, doc) => {
        Post.find({ 'user.username': { $in: [...doc.followers, username] } }).sort({ timestamp: -1 })
          .then(docs => {
            res.json({
              user: {
                name: doc.name,
                username: doc.username,
                followers: doc.followers
              },
              feed: docs
            })
          })
      })
    })
    .catch(err => {
      console.log(err)
      res.sendStatus(500)
    })
}

const Api = (JWT_KEY) => {
  const api = express.Router()

  api.use((req, res, next) => {
    const token = req.get('Authorization')
  
    authenticateToken(token, JWT_KEY)
      .then(response => {
        if (response.isAuthenticated) {
          req.user = response.user
  
          next()
        }
        else {
          res.sendStatus(401)
        }
      })
      .catch(err => {
        res.sendStatus(401)
      })
  })

  api.post('/check', (req, res) => {
    res.json(req.user)
  })
  
  api.route('/following/:handle')
    .put((req, res) => updateFollowers(req, res, (followers, handle) => [...followers, handle])) // TODO: make this idempotent
    .delete((req, res) => updateFollowers(req, res, (followers, handle) => followers.filter(username => username != handle)))
  
  api.route('/posts')
    .get((req, res) => {
      Post.find({ 'user.username': { $in: [...req.user.followers, req.user.username] } })
        .sort({ timestamp: -1 })
        .then(docs => {
          res.json({ feed: docs })
        })
        .catch(err => {
          res.sendStatus(500)
        })
    })
    .post((req, res) => {
      const post = new Post({ content: req.body.content, user: { username: req.user.username, name: req.user.name } })
  
      post.save((err) => {
        if (err) res.sendStatus(500)
  
        Post.find({ 'user.username': { $in: [...req.user.followers, req.user.username] } })
          .sort({ timestamp: -1 })
          .then(docs => {
            res.json({ feed: docs })
          })
          .catch(ex => {
            console.log(ex)
            res.sendStatus(500)
          })
      })
    })
  
  api.get('/profiles/:query', (req, res) => {
    User.find({ username: new RegExp(`^${req.params.query}`) })
      .limit(10)
      .sort({ username: -1 })
      .select({ username: 1, name: 1 })
      .then(docs => res.json(docs))
      .catch(err => res.sendStatus(500))
  })

  return api
}

module.exports = Api
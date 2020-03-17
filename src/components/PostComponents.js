import React, { useState, useEffect, useContext } from 'react'

import Avatar from '@material-ui/core/Avatar'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import CardHeader from '@material-ui/core/CardHeader'
import Fab from '@material-ui/core/Fab'
import Grid from '@material-ui/core/Grid'
import Paper from '@material-ui/core/Paper'
import SendIcon from '@material-ui/icons/Send'
import TextField from '@material-ui/core/TextField'
import Typography from '@material-ui/core/Typography'

import { makeStyles } from '@material-ui/core/styles'

import axios from 'axios'
import moment from 'moment'

import { AuthContext, FeedContext } from '../contexts'

const useStyles = makeStyles(theme => ({
  post: {
    margin: '1vh 0'
  },
  postMakerRoot: {
    padding: theme.spacing(2)
  },
  postMakerActionGrid: {
    marginTop: theme.spacing(1)
  },
  postMakerCharacterRemaining: {
    textAlign: 'end',
    color: 'lightgrey'
  },
  postButton: {
    color: '#ffffff',
    backgroundColor: 'rgb(29, 161, 242)',
    '&:hover': {
      backgroundColor: 'rgb(29, 161, 242)'
    }
  },
  postField: {
    '& label.Mui-focused': {
      color: 'rgb(29, 161, 242)',
    },
    '& .MuiInput-underline:hover:not(.Mui-disabled):before': {
      borderBottom: '2px solid rgba(0, 0, 0, 0.42)'
    },
    '& .MuiInput-underline:after': {
      borderBottomColor: 'rgb(29, 161, 242)',
    },
    '& .MuiInputBase-root > input': {
      color: 'rgb(29, 161, 242)'
    }
  }
}))

function update(event, setContent) {
  if (event.target.value.length <= 140) {
    setContent(event.target.value)
  }
}

function createPost(payload, token, setFeed) {
  axios.post('/api/post', payload, { headers: { 'Authorization': token } })
    .then(res => {
      if (res.data.success) {
        setFeed(res.data.feed)
      }
    })
}

function PostMaker(props) {
  const { token } = useContext(AuthContext)
  const { setFeed } = useContext(FeedContext)
  const [content, setContent] = useState('')

  const classes = useStyles();
  
  return (
    <Paper elevation={3} className={classes.postMakerRoot}>
      <TextField
        className={classes.postField}
        value={content}
        fullWidth={true}
        label="Your thoughts go here ..."
        multiline
        rows={1}
        onChange={(e) => update(e, setContent)}
      />
      <Grid container className={classes.postMakerActionGrid}>
        <Grid item xs={2}>
          <Fab
            className={classes.postButton}
            size='small'
            aria-label='publish'
            onClick={() => createPost({ content }, token, setFeed)}
          >
            <SendIcon />
          </Fab>
        </Grid>
        <Grid item xs={9}/>
        <Grid item xs={1}>
          <Typography className={classes.postMakerCharacterRemaining} variant="caption" display="block">
            {140 - content.length}
          </Typography>
        </Grid>
      </Grid>
    </Paper>
  )
}

function Post(props) {
  const { data } = props;
  const { user, timestamp, content } = data;
  const { firstName, lastName, name, username } = user;

  const classes = useStyles();

  const cardTitle = name ? name : `${firstName} ${lastName}`;
    
  return (
    <Card className={classes.post}>
      <CardHeader
        title={cardTitle}
        subheader={`${username} • ${moment(timestamp).fromNow()}`}
        avatar={<Avatar>{cardTitle.substring(0, 1)}</Avatar>}
      />
      <CardContent>
        <Typography variant="body2" color="textSecondary" component="p">
          {content}
        </Typography>
      </CardContent>
    </Card>
  )
}

function Feed(props) {
  const { token } = useContext(AuthContext)
  const { feed, setFeed } = useContext(FeedContext)

  useEffect(() => {
    if (feed.length === 0) {
      axios.get('/api/feed', { headers: { 'Authorization': token } })
        .then(res => {
          setFeed(res.data.feed || [])
        })
    }
  }, [])

  return (feed.map(post => (
    <Grid key={post._id} item xs={12}>
      <Post data={post}/>
    </Grid>
  )))
}

export { PostMaker, Feed }

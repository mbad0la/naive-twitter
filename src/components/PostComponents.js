import React, { useState } from 'react'
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField'
import Paper from '@material-ui/core/Paper'
import Fab from '@material-ui/core/Fab'
import SendIcon from '@material-ui/icons/Send';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import Avatar from '@material-ui/core/Avatar';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import axios from 'axios'
import moment from 'moment'

const useStyles = makeStyles(theme => ({
  post: {
    margin: '1rem 0'
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
  }
}))

function update(event, setContent) {
  if (event.target.value.length <= 140) {
    setContent(event.target.value)
  }
}

function createPost(payload, token, modifyAuthState) {
  axios.post('/api/post', payload, {headers: {'Authorization': token}})
    .then(res => {
      if (res.data.success) {
        modifyAuthState.setFeed(res.data.feed)
      }
    })
}

function PostMaker(props) {
  const [content, setContent] = useState('');

  const {authState, modifyAuthState} = props;
  const {token} = authState;

  const classes = useStyles();
  
  return (
    <Paper elevation={3} className={classes.postMakerRoot}>
      <TextField
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
            size='small'
            color='primary'
            aria-label='publish'
            onClick={() => createPost({content}, token, modifyAuthState)}
          >
            <SendIcon />
          </Fab>
        </Grid>
        <Grid item xs={9}/>
        <Grid item xs={1}>
          <div className={classes.postMakerCharacterRemaining}>{140 - content.length}</div>
        </Grid>
      </Grid>
    </Paper>
  )
}

function Post(props) {
  const {data} = props;
  const {user, timestamp, content} = data;
  const {firstName, lastName, username} = user;

  const classes = useStyles();
    
  return (
    <Card className={classes.post}>
      <CardHeader
        title={`${firstName} ${lastName}`}
        subheader={`${username} • ${moment(timestamp).fromNow()}`}
        avatar={<Avatar>{firstName.substring(0, 1)}</Avatar>}
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
  const {authState} = props;
  const {feed} = authState;

  return (feed.map(post => (
    <Grid item xs={12}>
      <Post key={post._id} data={post}/>
    </Grid>
  )))
}

export {PostMaker, Feed}

import React, { useState } from 'react'
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import Paper from '@material-ui/core/Paper'
import Fab from '@material-ui/core/Fab'
import SendIcon from '@material-ui/icons/Send';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import Avatar from '@material-ui/core/Avatar';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import axios from 'axios'
import moment from 'moment'

const useStyles = makeStyles(theme => ({
  paperDimensions: {
    width: '70%',
    margin: '0% 15%',
    padding: '2% 3%'
  },
  cardDimensions: {
    width: '100%',
    marginTop: 10,
    marginBottom: 10
  },
  logout: {
    marginTop: '3%',
    marginRight: '3%'
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
    <Paper elevation={2} className={classes.paperDimensions}>
      <div>
        <TextField
          value={content}
          fullWidth={true}
          label="Your thoughts go here ..."
          multiline
          rows={1}
          onChange={(e) => update(e, setContent)}
        />
      </div>
      <div style={{position: 'relative'}}>
        <div style={{position: 'absolute', right: 5, color: 'lightgrey'}}>{140 - content.length}</div>
        <Fab
          color='primary'
          aria-label='publish'
          onClick={() => createPost({content}, token, modifyAuthState)}
        >
          <SendIcon />
        </Fab>
      </div>
    </Paper>
  )
}

function Post(props) {
  const {data} = props;
  const {user, timestamp, content} = data;
  const {firstName, lastName, username} = user;

  const classes = useStyles();
    
  return (
    <Card className={classes.cardDimensions}>
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
  console.log("feed", props)
  const {authState} = props;
  const {feed} = authState;

  return (
    <div style={{width: '70%', margin: '0% 15%'}}>
      {
        feed.map(post => <Post key={post._id} data={post}/>)
      }
    </div>
  )
}


function FeedWrap(props) {
  const {authState, modifyAuthState} = props;

  return (
    <div style={{padding: '5%'}}>
      <PostMaker modifyAuthState={modifyAuthState} authState={authState}/>
      <Feed modifyAuthState={modifyAuthState} authState={authState}/>
    </div>
  )
}



function logout(modifyAuthState) {
  localStorage.removeItem('postman_naive_twitter_auth')
  localStorage.removeItem('postman_naive_twitter_token')
  localStorage.removeItem('postman_naive_twitter_user')
  localStorage.removeItem('postman_naive_twitter_followers')

  modifyAuthState.setToken(null)
  modifyAuthState.setIsAuthenticated(false)
  modifyAuthState.setUser(null)
  modifyAuthState.setFollowers([])
  modifyAuthState.setFeed([])
}

function ViewWrapper(props) {
  const {style, authState, modifyAuthState} = props;

  const classes = useStyles();

  return (
    <div style={style}>
      <div style={{display: 'flex', justifyContent: 'flex-end'}}>
        <Button
          color='secondary'
          className={classes.logout}
          onClick={() => logout(modifyAuthState)}
        >
          Sign Out
        </Button>
      </div>
      <div style={{marginTop: 20}}>
        <FeedWrap modifyAuthState={modifyAuthState} authState={authState}/>
      </div>
    </div>
  )
}

export default ViewWrapper

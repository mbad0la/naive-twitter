import React, { Component } from 'react'
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import Paper from '@material-ui/core/Paper'
import Fab from '@material-ui/core/Fab'
import SendIcon from '@material-ui/icons/Send';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
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

class PostMaker extends Component {

  constructor(props) {
    super(props)
    this.state = {
      content: ''
    }

    this.update = this.update.bind(this)
    this.createPost = this.createPost.bind(this)
  }

  update(event) {
    if (event.target.value.length <= 140) {
      this.setState({content: event.target.value})
    }
  }

  createPost() {
    axios.post('/api/post', this.state, {headers: {'Authorization': this.props.authState.token}})
      .then(res => {
        if (res.data.success) {
          this.props.modifyAuthState({feed: res.data.feed})
        }
      })
  }

  render() {
    // const classes = useStyles();
  
    return (
      <Paper elevation={2}>
      {/* <Paper elevation={2} className={classes.paperDimensions}> */}
        <div>
          <TextField
            value={this.state.content}
            fullWidth={true}
            label="Your thoughts go here ..."
            multiline
            rows={1}
            onChange={this.update}
          />
        </div>
        <div style={{position: 'relative'}}>
          <div style={{position: 'absolute', right: 5, color: 'lightgrey'}}>{140 - this.state.content.length}</div>
          <Fab
            color='primary'
            aria-label='publish'
            onClick={this.createPost}
          >
            <SendIcon />
          </Fab>
        </div>
      </Paper>
    )
  }

}

class Post extends Component {

  constructor(props) {
    super(props)
    this.state = {}
  }

  render() {
    // const classes = useStyles();
  
    return (
      <Card>
      {/* <Card className={classes.cardDimensions}> */}
        <CardHeader
          title={`${this.props.data.user.firstName} ${this.props.data.user.lastName}`}
          subheader={`${this.props.data.user.username} • ${moment(this.props.data.timestamp).fromNow()}`}
          avatar={this.props.data.user.profileImageUrl}
        />
        <CardContent>
          <Typography variant="body2" color="textSecondary" component="p">
            {this.props.data.content}
          </Typography>
        </CardContent>
      </Card>
    )
  }

}

class Feed extends Component {

  constructor(props) {
    super(props)
    this.state = {}
  }

  render() {
    return (
      <div style={{width: '70%', margin: '0% 15%'}}>
        {
          this.props.authState.feed.map(post => <Post key={post._id} data={post}/>)
        }
      </div>
    )
  }

}


class FeedWrap extends Component {

  constructor(props) {
    super(props)
    this.state = {}
  }

  render() {
    return (
      <div style={{padding: '5%'}}>
        <PostMaker modifyAuthState={this.props.modifyAuthState} authState={this.props.authState}/>
        <Feed modifyAuthState={this.props.modifyAuthState} authState={this.props.authState}/>
      </div>
    )
  }

}

class ViewWrapper extends Component {

  constructor(props) {
    super(props)
    this.state = {}

    this.logout = this.logout.bind(this)
  }

  logout() {
    localStorage.removeItem('postman_naive_twitter_auth')
    localStorage.removeItem('postman_naive_twitter_token')
    localStorage.removeItem('postman_naive_twitter_user')
    localStorage.removeItem('postman_naive_twitter_followers')
    this.props.modifyAuthState({isAuthenticated: false, token: undefined, user: undefined, followers: '[]'})
  }

  render() {
    // const classes = useStyles();

    return (
      <div style={this.props.style}>
        <div style={{display: 'flex', justifyContent: 'flex-end'}}>
          <Button
            color='secondary'
            // className={classes.logout}
            onClick={this.logout}
          >
            Sign Out
          </Button>
        </div>
        <div style={{marginTop: 20}}>
          <FeedWrap modifyAuthState={this.props.modifyAuthState} authState={this.props.authState}/>
        </div>
      </div>
    )
  }

}

export default ViewWrapper

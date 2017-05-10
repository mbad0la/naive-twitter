import React, { Component } from 'react'
import { Route } from 'react-router-dom'
import { RaisedButton, TextField, Paper, FloatingActionButton } from 'material-ui'
import { Card, CardHeader, CardText } from 'material-ui/Card'
import axios from 'axios'
import moment from 'moment'

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
    return (
      <Paper style={{width: '70%', margin: '0% 15%', padding: '2% 3%'}}>
        <div>
          <TextField
            value={this.state.content}
            fullWidth={true}
            hintText="Just Post-Man!"
            multiLine={true}
            rows={1}
            onChange={this.update}
          />
        </div>
        <div style={{position: 'relative'}}>
          <div style={{position: 'absolute', right: 5, color: 'lightgrey'}}>{140 - this.state.content.length}</div>
          <FloatingActionButton
            iconClassName='fa fa-paper-plane'
            mini={true}
            onClick={this.createPost}
          />
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
    return (
      <Card style={{width: '100%', marginTop: 10, marginBottom: 10}}>
        <CardHeader
          title={`${this.props.data.user.firstName} ${this.props.data.user.lastName}`}
          subtitle={`${this.props.data.user.username} • ${moment(this.props.data.timestamp).fromNow()}`}
          avatar={this.props.data.user.profileImageUrl}
        />
        <CardText>
          {this.props.data.content}
        </CardText>
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
    return (
      <div style={this.props.style}>
        <div style={{display: 'flex', justifyContent: 'flex-end'}}>
          <RaisedButton
            style={{marginTop: '3%', marginRight: '3%'}}
            backgroundColor='#ef5b25'
            label='SIGN OUT'
            labelColor='#ffffff'
            onClick={this.logout}
          />
        </div>
        <div style={{marginTop: 20}}>
          <FeedWrap modifyAuthState={this.props.modifyAuthState} authState={this.props.authState}/>
        </div>
      </div>
    )
  }

}

export default ViewWrapper

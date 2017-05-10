import React, { Component } from 'react'
import { TextField, FlatButton } from 'material-ui'
import { Card, CardHeader, CardActions } from 'material-ui/Card'
import axios from 'axios'

const formStyle = {
  errorStyle: {
    color: '#ef5b25',
  },
  underlineStyle: {
    borderColor: '#ef5b25',
  },
  floatingLabelStyle: {
    color: '#ef5b25',
  },
  floatingLabelFocusStyle: {
    color: '#ef5b25',
  }
}

class Profile extends Component {

  constructor(props) {
    super(props)
    this.state = {}

    this.follow = this.follow.bind(this)
    this.unfollow = this.unfollow.bind(this)
  }

  follow(event) {
    axios.put(`/api/following/${this.props.data.username}`, {}, {headers: {'Authorization': this.props.authState.token}})
      .then(res => {
        if (res.data.success) {
          localStorage.setItem('postman_naive_twitter_followers', res.data.followers)
          this.props.modifyAuthState({followers: res.data.followers, feed: res.data.feed})
        } else {
          localStorage.setItem('postman_naive_twitter_auth', false)
          this.props.modifyAuthState({isAuthenticated: false})
        }
      })
  }

  unfollow(event) {
    axios.delete(`/api/following/${this.props.data.username}`, {headers: {'Authorization': this.props.authState.token}})
      .then(res => {
        if (res.data.success) {
          localStorage.setItem('postman_naive_twitter_followers', res.data.followers)
          this.props.modifyAuthState({followers: res.data.followers, feed: res.data.feed})
        } else {
          localStorage.setItem('postman_naive_twitter_auth', false)
          this.props.modifyAuthState({isAuthenticated: false})
        }
      })
  }

  render() {
    return (
      <Card style={{width: '80%', margin: '3% 10%'}}>
        <CardHeader
          title={`${this.props.data.firstName} ${this.props.data.lastName}`}
          subtitle={this.props.data.username}
          avatar={this.props.data.profileImageUrl}
        />
        {
          (this.props.authState.user != this.props.data.username)? (
            <CardActions>
              {(this.props.follower)?<FlatButton onClick={this.unfollow} secondary={true} label='Unfollow'/>:<FlatButton onClick={this.follow} primary={true} label='Follow'/>}
            </CardActions>
          ) : undefined
        }

      </Card>
    )
  }

}

class ProfileSearch extends Component {

  constructor(props) {
    super(props)
    this.state = {
      matches: []
    }

    this.searchUsers = this.searchUsers.bind(this)
  }

  searchUsers(event) {
    if (event.target.value.length%2 == 1) {
      axios.get(`/api/profiles/${event.target.value}`)
        .then(res => {
          this.setState({matches: res.data})
        })
    }
  }

  render() {
    let followers = JSON.parse(this.props.authState.followers)

    return (
      <div style={this.props.style}>
        <div>
          <TextField
            style={{width: '80%', margin: '3% 10%'}}
            hintText='Search by username'
            underlineFocusStyle={formStyle.underlineStyle}
            onChange={this.searchUsers}
          />
        </div>
        <div style={{marginTop: 20}}>
          {
            this.state.matches.map(match => (
              <Profile
                key={match.username}
                follower={followers.includes(match.username)}
                data={match}
                authState={this.props.authState}
                modifyAuthState={this.props.modifyAuthState}
              />
            ))
          }
        </div>
      </div>
    )
  }

}

export default ProfileSearch

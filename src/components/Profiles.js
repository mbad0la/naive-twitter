import React, { useState } from 'react'
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import Avatar from '@material-ui/core/Avatar';
import CardActions from '@material-ui/core/CardActions';
import axios from 'axios'

const useStyles = makeStyles(theme => ({
  cardDimensions: {
    width: '80%',
    margin: '3% 10%'
  }
}))

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

function follow(username, token, modifyAuthState) {
  axios.put(`/api/following/${username}`, {}, {headers: {'Authorization': token}})
    .then(res => {
      if (res.data.success) {
        localStorage.setItem('postman_naive_twitter_followers', res.data.followers)
        modifyAuthState.setFollowers(res.data.followers)
        modifyAuthState.setFeed(res.data.feed)
      } else {
        localStorage.setItem('postman_naive_twitter_auth', false)
        modifyAuthState.setIsAuthenticated(false)
      }
    })
}

function unfollow(username, token, modifyAuthState) {
  axios.delete(`/api/following/${username}`, {headers: {'Authorization': token}})
    .then(res => {
      if (res.data.success) {
        localStorage.setItem('postman_naive_twitter_followers', res.data.followers)
        modifyAuthState.setFollowers(res.data.followers)
        modifyAuthState.setFeed(res.data.feed)
      } else {
        localStorage.setItem('postman_naive_twitter_auth', false)
        modifyAuthState.setIsAuthenticated(false)
      }
    })
}

function searchUsers(event, setMatches) {
  if (event.target.value.length%2 == 1) {
    axios.get(`/api/profiles/${event.target.value}`)
      .then(res => {
        setMatches(res.data)
      })
  }
}

function Profile(props) {
  const {data, authState, follower, modifyAuthState} = props;
  const {firstName, lastName, username} = data;
  const {user, token} = authState;

  const classes = useStyles();
    
  return (
    <Card className={classes.cardDimensions}>
      <CardHeader
        title={`${firstName} ${lastName}`}
        subheader={username}
        avatar={<Avatar>{firstName.substring(0, 1)}</Avatar>}
      />
      {
        (user != username)? (
          <CardActions>
            {
              (follower) ?
                <Button onClick={() => unfollow(username, token, modifyAuthState)} color='secondary'>Unfollow</Button>
                : <Button onClick={() => follow(username, token, modifyAuthState)} color='primary'>Follow</Button>
            }
          </CardActions>
        ) : undefined
      }

    </Card>
  )
}

function ProfileSearch(props) {
  const [matches, setMatches] = useState([])

  const {authState, modifyAuthState, style} = props;
  const {followers} = authState;

  return (
    <div style={style}>
      <div>
        <TextField
          fullWidth={true}
          label='Search by username'
          onChange={(e) => searchUsers(e, setMatches)}
        />
      </div>
      <div style={{marginTop: 20}}>
        {
          matches.map(match => (
            <Profile
              key={match.username}
              follower={followers.includes(match.username)}
              data={match}
              authState={authState}
              modifyAuthState={modifyAuthState}
            />
          ))
        }
      </div>
    </div>
  )
}

export default ProfileSearch

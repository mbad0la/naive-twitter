import React, { useContext } from 'react'

import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button'
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardHeader from '@material-ui/core/CardHeader';
import TextField from '@material-ui/core/TextField'

import { makeStyles } from '@material-ui/core/styles';

import axios from 'axios'

import { AuthContext } from '../AuthContext'

const useStyles = makeStyles(theme => ({
  cardDimensions: {
    width: '100%',
    margin: '3% 0%'
  }
}))

function follow(username, authContext, setFeed) {
  axios.put(`/api/following/${username}`, {}, { headers: { 'Authorization': authContext.token } })
    .then(res => {
      if (res.data.success) {
        localStorage.setItem('postman_naive_twitter_followers', res.data.followers)
        authContext.setFollowers(res.data.followers)
        setFeed(res.data.feed)
      } else {
        localStorage.setItem('postman_naive_twitter_auth', false)
        authContext.setClientAuthFlag(false)
        authContext.setServerAuthFlag(false)
      }
    })
}

function unfollow(username, authContext, setFeed) {
  axios.delete(`/api/following/${username}`, { headers: { 'Authorization': authContext.token } })
    .then(res => {
      if (res.data.success) {
        localStorage.setItem('postman_naive_twitter_followers', res.data.followers)
        authContext.setFollowers(res.data.followers)
        setFeed(res.data.feed)
      } else {
        localStorage.setItem('postman_naive_twitter_auth', false)
        authContext.setClientAuthFlag(false)
        authContext.setServerAuthFlag(false)
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
  const authContext = useContext(AuthContext)
  const { data, follower, modifyAuthState} = props;
  const { firstName, lastName, username } = data;

  const classes = useStyles();
    
  return (
    <Card className={classes.cardDimensions}>
      <CardHeader
        title={`${firstName} ${lastName}`}
        subheader={username}
        avatar={<Avatar>{firstName.substring(0, 1)}</Avatar>}
      />
      {
        (authContext.user !== username) ? (
          <CardActions>
            {
              (follower) ?
                <Button onClick={() => unfollow(username, authContext, modifyAuthState.setFeed)} color='secondary'>Unfollow</Button>
                : <Button onClick={() => follow(username, authContext, modifyAuthState.setFeed)} color='primary'>Follow</Button>
            }
          </CardActions>
        ) : undefined
      }

    </Card>
  )
}

function ProfileSearch(props) {
  const {setMatches} = props;

  return (
    <TextField
      type='search'
      variant='outlined'
      fullWidth={true}
      label='Search'
      onChange={(e) => searchUsers(e, setMatches)}
    />
  )
}

export {ProfileSearch, Profile}
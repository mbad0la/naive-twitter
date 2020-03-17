import React, { useContext } from 'react'

import Avatar from '@material-ui/core/Avatar'
import Button from '@material-ui/core/Button'
import Card from '@material-ui/core/Card'
import CardActions from '@material-ui/core/CardActions'
import CardHeader from '@material-ui/core/CardHeader'
import InputAdornment from '@material-ui/core/InputAdornment'
import TextField from '@material-ui/core/TextField'

import { makeStyles } from '@material-ui/core/styles'

import SearchIcon from '@material-ui/icons/Search'

import axios from 'axios'

import { AuthContext, FeedContext } from '../contexts'

const useStyles = makeStyles(theme => ({
  cardDimensions: {
    width: '100%',
    margin: '2% 0%'
  },
  searchInput: {
    '& label.Mui-focused': {
      color: '#353535'
    },
    '& div.MuiOutlinedInput-root.Mui-focused > fieldset': {
      borderColor: '#353535'
    },
    '& .MuiInputBase-input': {
      color: '#353535'
    }
  },
  blue: {
    color: 'rgb(29, 161, 242)'
  }
}))

function follow(username, authContext, setFeed) {
  axios.put(`/api/following/${username}`, {}, { headers: { 'Authorization': authContext.token } })
    .then(res => {
      if (res.data.success) {
        localStorage.setItem('postman_naive_twitter_user', res.data.user)
        authContext.setUser(res.data.user)
        setFeed(res.data.feed)
      }
    })
}

function unfollow(username, authContext, setFeed) {
  axios.delete(`/api/following/${username}`, { headers: { 'Authorization': authContext.token } })
    .then(res => {
      if (res.data.success) {
        localStorage.setItem('postman_naive_twitter_user', res.data.user)
        authContext.setUser(res.data.user)
        setFeed(res.data.feed)
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

function ProfileCard(props) {
  const authContext = useContext(AuthContext)
  const { setFeed } = useContext(FeedContext)
  const { data } = props;
  const { firstName, lastName, name, username } = data;

  const classes = useStyles()

  const cardTitle = ( name ? name : `${firstName} ${lastName}` )
    
  return (
    <Card className={classes.cardDimensions}>
      <CardHeader
        title={cardTitle}
        subheader={username}
        avatar={<Avatar>{cardTitle.substring(0, 1)}</Avatar>}
      />
      {
        (authContext.user.username !== username) ? (
          <CardActions>
            {
              (authContext.user.followers.includes(username)) ?
                <Button onClick={() => unfollow(username, authContext, setFeed)} color='secondary'>Unfollow</Button>
                : <Button onClick={() => follow(username, authContext, setFeed)} className={classes.blue}>Follow</Button>
            }
          </CardActions>
        ) : undefined
      }

    </Card>
  )
}

function ProfileSearch(props) {
  const { setMatches } = props;

  const classes = useStyles()

  return (
    <TextField
      className={classes.searchInput}
      type='search'
      variant='outlined'
      fullWidth={true}
      // label='Username'
      onChange={(e) => searchUsers(e, setMatches)}
      InputProps={{
        startAdornment: (
          <InputAdornment position="start">
            <SearchIcon />
          </InputAdornment>
        ),
      }}
    />
  )
}

export { ProfileSearch, ProfileCard }
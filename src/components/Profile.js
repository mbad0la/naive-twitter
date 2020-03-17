import React, { useContext } from 'react'

import Button from '@material-ui/core/Button'
import Card from '@material-ui/core/Card'
import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'

import { makeStyles } from '@material-ui/core/styles'

import PeopleIcon from '@material-ui/icons/People'

import { AuthContext } from '../contexts'

function logout(authContext) {
  const { setClientAuthFlag, setServerAuthFlag, setToken, setUser } = authContext

  setServerAuthFlag(false)

  localStorage.removeItem('postman_naive_twitter_auth')
  localStorage.removeItem('postman_naive_twitter_token')
  localStorage.removeItem('postman_naive_twitter_user')

  setToken(null)
  setUser(null)

  setClientAuthFlag(false)
}

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%'
  },
  cover: {
    width: '100%',
    height: '20vh',
    padding: 0,
    backgroundImage: 'linear-gradient(141deg, #9fb8ad 0%, #1fc8db 51%, #2cb5e8 75%)'
  },
  profileStats: {
    display: 'flex',
    alignItems: 'center',
    '& svg': {
      fontSize: '2rem'
    },
    '& p': {
      marginLeft: theme.spacing(1)
    }
  }
}))

const Profile = (props) => {
  const authContext = useContext(AuthContext)
  const { user } = authContext
  const { firstName, lastName, name, followers } = user

  const classes = useStyles()

  const profileName = name ? name : `${firstName} ${lastName}`

  return (
    <Grid item xs={12}>
      <Card className={classes.root}>
        <CardContent className={classes.cover}/>
        <CardContent>
          <Typography gutterBottom variant='h5' component='h2'>
            {profileName}
          </Typography>
          <Grid container justify='flex-start' direction='column'>
            <Grid item xs={3}>
              <div className={classes.profileStats}>
                <PeopleIcon />
                <Typography variant='body2' display='inline'>
                  {followers.length}
                </Typography>
              </div>
            </Grid>
          </Grid>
        </CardContent>
        <CardActions>
          <Button 
            size='large' 
            color='secondary' 
            onClick={() => logout(authContext)}
            fullWidth
          >
            Log out
          </Button>
        </CardActions>
      </Card>
    </Grid>
  )
}

export { Profile }
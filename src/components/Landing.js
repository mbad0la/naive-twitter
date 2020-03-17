import React from 'react'

import { Link } from 'react-router-dom'

import Button from '@material-ui/core/Button'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'

import GitHubIcon from '@material-ui/icons/GitHub';

import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles(theme => ({
  white: {
    color: '#FFFFFF'
  },
  logo: {
    width: '100%',
    color: '#FFFFFF'
  },
  heroText: {
    color: '#FFFFFF',
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(8)
  },
  linkRoot: {
    textDecoration: 'none'
  },
  guestScreenRoot: {
    position: 'absolute',
    top: 0,
    left: 0,
    height: '100%',
    width: '100%',
    backgroundColor: 'rgb(16, 31, 51)'
  },
  guestScreenLogin: {
    marginTop: theme.spacing(1),
    backgroundColor: 'rgb(29, 161, 242, 0.8)',
    textTransform: 'none',
    '&:hover': {
      backgroundColor: 'rgb(29, 161, 242)'
    }
  },
  guestScreenRegister: {
    marginTop: theme.spacing(1),
    backgroundColor: 'rgb(16, 31, 51)',
    borderColor: 'rgb(29, 161, 242)',
    color: 'rgb(29, 161, 242)',
    textTransform: 'none',
    '&:hover': {
      borderColor: 'rgb(29, 161, 242)',
      backgroundColor: 'rgb(33, 46, 64, 0.5)',
    }
  },
  textAlignCenter: {
    textAlign: 'center'
  }
}))

export const Landing = (props) => {
  const classes = useStyles()

  return (
    <Grid container className={classes.guestScreenRoot} justify='center' alignItems='center'>
      <Grid container item md={3} xs={10}>
        <Grid item xs={3}>
          <img src='/assets/naive-twitter-logo.svg' className={classes.logo}/>
        </Grid>
        <Grid item xs={12} className={classes.heroText}>
          <Typography variant='h5' component='h1'>
            Follow people and share 140 character messages with your network.
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Typography variant='body1' className={classes.white}>
            What are you gonna do about it?
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Link to='/login' className={classes.linkRoot}>
            <Button
              className={classes.guestScreenLogin}
              variant="contained"
              color="primary"
              fullWidth={true}
              size='large'
            >
              Log in
            </Button>
          </Link>
        </Grid>
        <Grid item xs={12}>
          <Link to='/register' className={classes.linkRoot}>
            <Button
              className={classes.guestScreenRegister}
              variant="outlined"
              color="primary"
              fullWidth={true}
              size='large'
            >
              Sign up
            </Button>
          </Link>
        </Grid>
      </Grid>
      <Grid item xs={12} className={classes.textAlignCenter}>
          <a href='https://github.com/mbad0la/naive-twitter' target='_blank' className={classes.linkRoot}>
            <GitHubIcon className={classes.white}/>
          </a>
      </Grid>
    </Grid>
  )
}
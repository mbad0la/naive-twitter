import React from 'react'

import { Link } from 'react-router-dom'

import Button from '@material-ui/core/Button'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'

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
    borderRadius: '20px',
    backgroundColor: 'rgb(29, 161, 242, 0.8)',
    textTransform: 'none',
    '&:hover': {
      backgroundColor: 'rgb(29, 161, 242)'
    }
  },
  guestScreenRegister: {
    marginTop: theme.spacing(1),
    borderRadius: '20px',
    backgroundColor: 'rgb(16, 31, 51)',
    borderColor: 'rgb(29, 161, 242)',
    color: 'rgb(29, 161, 242)',
    textTransform: 'none',
    '&:hover': {
      borderColor: 'rgb(29, 161, 242)',
      backgroundColor: 'rgb(33, 46, 64, 0.5)',
    }
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
        <Grid item xs={12}>
          <Typography variant='h4' component='h1' className={classes.heroText}>
            Naive twitter is free, and always will be.
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Typography variant='body2' className={classes.white}>
            Check it out?
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Link to='/login' className={classes.linkRoot}>
            <Button
              className={classes.guestScreenLogin}
              variant="contained"
              color="primary"
              fullWidth={true}
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
            >
              Sign up
            </Button>
          </Link>
        </Grid>
      </Grid>
    </Grid>
  )
}
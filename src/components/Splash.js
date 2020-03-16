import React, { useState, useContext } from 'react'

import Grid from '@material-ui/core/Grid';

import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles(theme => ({
  relativeWrapper: {
    position: 'relative'
  },
  guestScreenRoot: {
    position: 'absolute',
    top: 0,
    left: 0,
    height: '100%',
    width: '100%',
    backgroundColor: 'rgb(16, 31, 51)'
  },
  planeProperties: {
    height: '10vh',
    transform: 'translatey(0px)',
    animation: `$float 1.2s ease-in-out infinite`
  },
  '@keyframes float': {
    "0%": {
      transform: 'translatey(0px)'
    },
    "50%": {
      transform: 'translatey(-20px)'
    },
    "100%": {
      transform: 'translatey(0px)'
    }
  }
}))

export const Splash = () => {
    const classes = useStyles()

    return (
      <Grid container className={classes.guestScreenRoot} justify='center' alignItems='center'>
        <div className={classes.relativeWrapper}>
          <img src='/assets/naive-twitter-logo.svg' className={classes.planeProperties}/>
        </div>
      </Grid>
    )
}
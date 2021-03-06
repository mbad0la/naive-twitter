import React from 'react'

import Grid from '@material-ui/core/Grid'

import { PostMaker, Feed } from './PostComponents'

const Home = (props) => {
  return (
    <Grid item xs={12}>
      <PostMaker />
      <Grid container style={{ marginTop: '1.5rem' }}>
        <Feed />
      </Grid>
    </Grid>
  )
}

export default Home

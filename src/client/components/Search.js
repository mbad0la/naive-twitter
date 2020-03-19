import React, { useState } from 'react'

import Grid from '@material-ui/core/Grid'

import { ProfileSearch, ProfileCard } from './Profiles'

const Search = (props) => {
  const [matches, setMatches] = useState([])

  return (
    <Grid item xs={12}>
      <ProfileSearch setMatches={setMatches} />
      <Grid container style={{ marginTop: '1.5rem' }}>
        {
          matches.map(match => {
            return (
              <Grid key={match.username} item xs={12}>
                <ProfileCard data={match}/>
              </Grid>
            )
          })
        }
      </Grid> 
    </Grid>
  )
}

export default Search
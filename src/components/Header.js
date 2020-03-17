import React from 'react'

import { Link } from 'react-router-dom'

import Grid from '@material-ui/core/Grid'
import Button from '@material-ui/core/Button'

import Tabs from '@material-ui/core/Tabs'
import Tab from '@material-ui/core/Tab'
import HomeIcon from '@material-ui/icons/Home'
import GroupAddIcon from '@material-ui/icons/GroupAdd'
import PersonPinIcon from '@material-ui/icons/PersonPin'

import { makeStyles } from '@material-ui/core/styles'

import { ProfileSearch } from './Profiles'

const useStyles = makeStyles(theme => ({
  root: {
    position: 'fixed',
    top: 0,
    width: '100%',
    height: '3rem',
    zIndex: 5,
    backgroundColor: '#ffffff',
    boxShadow: '2px 0px 4px 2px #e8e8e8',
    '& .MuiTabs-root': {
      height: '3rem'
    },
    '& .MuiTabs-flexContainer': {
      height: '3rem'
    },
    '& .Mui-selected': {
      color: 'rgb(29, 161, 242)',
      // backgroundColor: 'rgb(29, 161, 242)'
    },
    '& .MuiTabs-indicator': {
      // color: 'rgb(29, 161, 242)',
      backgroundColor: 'rgb(29, 161, 242)'
    }
  },
  navIcons: {
    fontSize: '2rem'
  }
}))

const Header = (props) => {
  const pageNames = ['search', 'home', 'profile']
  const classes = useStyles()

  const { pageName, setPageName } = props

  return (
    <header className={classes.root}>
      <Tabs
        value={pageNames.indexOf(pageName)}
        onChange={(e, v) => setPageName(pageNames[v])}
        variant="fullWidth"
        aria-label="icon label tabs example"
      >
        <Tab icon={<GroupAddIcon className={classes.navIcons} />} disableRipple/>
        <Tab icon={<HomeIcon className={classes.navIcons} />} disableRipple/>
        <Tab icon={<PersonPinIcon className={classes.navIcons} />} disableRipple/>
      </Tabs>
    </header>
  )
}

export default Header
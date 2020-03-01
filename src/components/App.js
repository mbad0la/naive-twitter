import React from 'react'
import { Link } from 'react-router-dom'
import MeetingRoomIcon from '@material-ui/icons/MeetingRoom';
import PersonAddIcon from '@material-ui/icons/PersonAdd';
import Button from '@material-ui/core/Button'
import ProfileSearch from './Profiles'
import ViewWrapper from './ViewWrapper'

import styles from '../app.css'

function App(props) {
  const { authState, modifyAuthState } = props;

  if (authState.isAuthenticated) {
    return (
      <div className={styles.flex}>
        <ProfileSearch
          style={{width: '40%', height: '100%'}}
          authState={authState}
          modifyAuthState={modifyAuthState}
        />
        <ViewWrapper
          style={{width: '60%', height: '100%'}}
          authState={authState}
          modifyAuthState={modifyAuthState}
        />
      </div>
    )
  } else {
    return (
      <div className={styles.authWrapper}>
        <ul className={styles.auth_ul}>
          <li className={styles.auth_li}>
            <Link to='/login'>
              <Button
                variant="contained"
                color="primary"
                startIcon={<MeetingRoomIcon />}
              >
                Login
              </Button>
              {/* <RaisedButton
                backgroundColor='#ef5b25'
                icon={<FontIcon style={{fontSize: 22, color: '#ffffff'}} className='fa fa-sign-in'/>}>
              </RaisedButton> */}
            </Link>
          </li>
          <li className={styles.auth_li}>
            <Link to='/register'>
              <Button
                variant="contained"
                color="primary"
                startIcon={<PersonAddIcon />}
              >
                Register
              </Button>
              {/* <RaisedButton
                backgroundColor='#ef5b25'
                icon={<FontIcon style={{fontSize: 20, color: '#ffffff'}} className='fa fa-user-plus'/>}>
              </RaisedButton> */}
            </Link>
          </li>
        </ul>
      </div>
    )
  }
}

export { App }

import React from 'react'
import AppBar from '@material-ui/core/AppBar'
import Typography from '@material-ui/core/Typography'
import {withRouter} from 'react-router';
import {userId} from '../../jwt';
import {connect} from 'react-redux';
import Button from '@material-ui/core/Button';
import AccountBox from '@material-ui/core/Icon';
import Toolbar from '@material-ui/core/Toolbar';


const TopBar = (props) => {
  const { location, history, user } = props

  return (
    <AppBar position="absolute" color='secondary' style={{zIndex:10}}>
      <Toolbar>
        <Typography variant="title" color="inherit" style={{flex: 1}}>
          Multiplayer Stratego
        </Typography>
        {
          user &&
          <Button color="inherit"><AccountBox /> { user.firstName }</Button>
        }

        {
          location.pathname.indexOf('signup') > 0 &&
          <Button color="inherit" onClick={() => history.push('/login')}>Login</Button>
        }
        {
          location.pathname.indexOf('login') > 0 &&
          <Button color="inherit" onClick={() => history.push('/signup')}>Sign up</Button>
        }
        {
          location.pathname.indexOf('games/') > 0 &&
          <Button color="inherit" onClick={() => history.push('/games')}>All Games</Button>
        }
        {
          /games$/.test(location.pathname) &&
          <Button color="inherit" onClick={() => history.push('/logout')}>Log out</Button>
        }
      </Toolbar>
    </AppBar>
  )
}

const mapStateToProps = state => ({
  user: state.currentUser && state.users &&
    state.users[userId(state.currentUser.jwt)]
})

export default withRouter(
  connect(mapStateToProps)(TopBar)
)

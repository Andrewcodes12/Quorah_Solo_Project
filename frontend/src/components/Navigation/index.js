import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector,useDispatch} from 'react-redux';
import { useState } from 'react';
import ProfileButton from './ProfileButton';
import './Navigation.css';
import * as sessionActions from '../../store/session';

function Navigation({ isLoaded }){
  const sessionUser = useSelector(state => state.session.user);
  const dispatch = useDispatch();
  const [credential, setCredential] = useState('');
  const [password, setPassword] = useState('');


  const demoLogin = async () => {
    setCredential('demo@user.io');
    setPassword('password');
    return dispatch(
      sessionActions.login({credential: 'demo@user.io', password: 'password'})
    );
  }


  let sessionLinks;
  if (sessionUser) {
    sessionLinks = (
      <ProfileButton user={sessionUser} />
    );
  } else {
    sessionLinks = (
      <>
      
      <button onClick={demoLogin}>Demo Login</button>


      </>
    );
  }

  return (
    <ul>
      <li>
        {isLoaded && sessionLinks}

      </li>
    </ul>
  );
}

export default Navigation;

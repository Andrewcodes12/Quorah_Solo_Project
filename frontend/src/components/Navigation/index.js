import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector,useDispatch} from 'react-redux';
import { useState,useEffect } from 'react';
import ProfileButton from './ProfileButton';
import './Navigation.css';
import * as sessionActions from '../../store/session';
import QuestionModal from '../Question-modal';

import SearchBar from './SearchBar/SearchBar';

function Navigation({ isLoaded }){
  const sessionUser = useSelector(state => state.session.user);
  const dispatch = useDispatch();
  const [credential, setCredential] = useState('');
  const [password, setPassword] = useState('');
  const [showForm, setShowForm] = useState(false);



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
  }

  return (
    <div className="mainNav">
      <ul className="navTwo">
        <li className="navBtns">
          <NavLink to="/feed">
            <div className="logo">
              <h2>Quorah</h2>
            </div>
          </NavLink>
        </li>
        <li className="navBtns">
          <NavLink exact to="/feed">
            <i className="fas fa-home"></i>
          </NavLink>
        </li>
        <div> <SearchBar /> </div>
        <li className="navBtns">{isLoaded && sessionLinks}</li>
        <li className="navBtns">
        <button onClick={demoLogin}>Demo Login</button>
        </li>
        <li className="navBtns">
        <QuestionModal/>
         </li>
      </ul>
    </div>
  );
}

export default Navigation;

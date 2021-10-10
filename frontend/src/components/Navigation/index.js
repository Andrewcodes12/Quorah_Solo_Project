import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector,useDispatch} from 'react-redux';
import { useState,useEffect } from 'react';
import ProfileButton from './ProfileButton';
import './Navigation.css';
import * as sessionActions from '../../store/session';

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
    <div className="navBar1">
      <ul className="navBar">
        <li className="navs">
          <NavLink to="/feed">
            <div className="logoBox">
              <h2>Quorah</h2>
            </div>
          </NavLink>
        </li>
        <li className="navs">
          <NavLink exact to="/feed">
            <i className="fas fa-home"></i>
          </NavLink>
        </li>
        <li className="navs">
          <NavLink to="/question/new">
            <i className="fas fa-edit"></i>
          </NavLink>
        </li>
        <li className="navs">{isLoaded && sessionLinks}</li>
        <li className="navs">
        <button onClick={demoLogin}>Demo Login</button>
        </li>
        <li className="navs">
          <button onClick={() => setShowForm(true)}>Add Question</button>
        </li>
      </ul>
    </div>
  );
}

export default Navigation;

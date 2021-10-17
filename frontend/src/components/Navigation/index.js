import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector,useDispatch} from 'react-redux';
import { useState } from 'react';
import ProfileButton from './ProfileButton';
import './Navigation.css';
import * as sessionActions from '../../store/session';
import QuestionModal from '../Question-modal';



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
              <button className="homeLogo" disabled={!sessionUser}> Quorah</button>
            </div>
          </NavLink>
        </li>
        <li className="navBtns">
        {!sessionUser?
        <button id="demoBtn" onClick={demoLogin}>Demo Login</button>
        : null}
        </li>
        <li className="navBtns" id="askQuestionBtn">
          {sessionUser?
        <QuestionModal/>
        :null}
         </li>
         <li className="navBtns" id="profileBtn">{isLoaded && sessionLinks}</li>
      </ul>
    </div>
  );
}

export default Navigation;

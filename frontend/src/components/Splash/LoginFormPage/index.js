import React, { useState } from 'react';
import * as sessionActions from '../../../store/session';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect} from 'react-router-dom';
import { Modal } from '../../../context/Modal';
import SignupFormModal from '../SignUpFormModal';
import '../Splash.css'


function LoginFormPage() {
  const [showModal, setShowModal] = useState(false);
  const dispatch = useDispatch();
  const sessionUser = useSelector(state => state.session.user);
  const [credential, setCredential] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState([]);


  if (sessionUser) return (
    <Redirect to="/" />
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors([]);
    return dispatch(sessionActions.login({ credential, password }))
      .catch(async (res) => {
        const data = await res.json();
        if (data && data.errors) setErrors(data.errors);
      });
  }



  return (


<>
  <div className="loginDesc">
  <div className="loginFooter">
      <a id="link" href='https://github.com/Andrewcodes12'>GitHub</a>
      <a id="link" href='https://www.linkedin.com/in/andrewfava/'>LinkedIn</a>
      </div>
    <p>A place to share whats on your mind </p>
    </div>
    <form id="loginId" onSubmit={handleSubmit}>
      <ul>
        {errors.map((error, idx) => <li key={idx}>{error}</li>)}
      </ul>
      <div className="loginInputFields">
      <div className="loginInputField">
        <input
          type="text"
          value={credential}
          placeholder="Username or Email"
          onChange={(e) => setCredential(e.target.value)}
          required
        />
        </div>
        <div className="loginInputField">
        <input
        className="password"
          type="password"
          value={password}
          placeholder="Enter your password"
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </div>
        </div>
        <div className="loginBtn">
      <button className="submitBtn"type="submit"htmlFor="loginId">Sign In</button>
    </div>
    </form>
</>


  );
}

export default LoginFormPage;

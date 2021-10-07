import React, { useState } from 'react';
import * as sessionActions from '../../store/session';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';
import './LoginForm.css';



function LoginFormPage() {
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
    <div className="login">
    <div className="loginContainer">
    <div className="loginDesc">
    <p>A place to share whats on your mind </p>
    </div>
    <form onSubmit={handleSubmit}>
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
      <button className="submitBtn"type="submit">Sign In</button>
      </div>
      <div className="loginFooter">
      <a href='https://github.com/Andrewcodes12'>GitHub</a>
      <a href='https://www.linkedin.com/in/andrewfava/'>LinkedIn</a>
      </div>
    </form>
    </div>
    </div>
  );
}

export default LoginFormPage;

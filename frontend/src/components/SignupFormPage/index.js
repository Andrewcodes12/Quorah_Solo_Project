import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import * as sessionActions from "../../store/session";
import './SignupForm.css';


function SignupFormPage() {
  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.session.user);
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState([]);

  if (sessionUser) return <Redirect to="/" />;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password === confirmPassword) {
      setErrors([]);
      return dispatch(sessionActions.signup({ email, username, password }))
        .catch(async (res) => {
          const data = await res.json();
          if (data && data.errors) setErrors(data.errors);
        });
    }
    return setErrors(['Confirm Password field must be the same as the Password field']);
  };

  return (
    <div className="signUp">
    <div className="signUpContainer">
    <div className="signUpDesc">
    <p>Create an account and begin sharing your thoughts</p>
    </div>
    <form onSubmit={handleSubmit}>
    <ul>
        {errors.map((error, idx) => <li key={idx}>{error}</li>)}
      </ul>
      <div className="signUpInputFields">
      <div className="signUpInputField">
        <input
          type="text"
          value={email}
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        </div>
        <div className="signUpInputField">
        <input
          type="text"
          value={username}
          placeholder="UserName"
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        </div>
    <div className="signUpInputField">
        <input
          type="password"
          value={password}
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        </div>
        <div className="signUpInputField">
        <input
          type="password"
          value={confirmPassword}
          placeholder="Confirm Password"
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
        />
      </div>
      </div>
      <div className="signUpBtnContainer">
      <button className="signUpBtn"type="submit">Sign Up</button>
      </div>
      <div className="signUpFooter">
      <a href='https://github.com/Andrewcodes12'>GitHub</a>
      <a href='https://www.linkedin.com/in/andrewfava/'>LinkedIn</a>
      </div>
    </form>
    </div>
    </div>
  );
}

export default SignupFormPage;

import React, { useState, useContext, useRef, useEffect } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import axios from '../../api/axios';
import UserContext from '../../context/UserContext';
import eye from '../../assets/eye.svg'
import eyeSlash from '../../assets/eye-slash.svg'
import './SignIn.scss';

const SignIn = ({ email }) => {
  const [password, setPassword] = useState('');
  const [errMsg, setErrMsg] = useState('');

  const LOGIN_URL = '/sign_in';

  const value = useContext(UserContext);
  const setAuth = value.setAuth;

  const showPasswordField = value.showPasswordField;
  const setShowPasswordField = value.setShowPasswordField;

  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  const errRef = useRef();

  useEffect(() => {
    setErrMsg('');
  }, [email, password]);

  const showPassword = (e) => {
    e.preventDefault();

    const input = document.querySelector(".input-field");
    const inputIcon = document.querySelector(".input-icon");

    inputIcon.setAttribute(
      "src",
      input.getAttribute("type") === "password" ?
        eyeSlash
        :
        eye
    );

    input.setAttribute(
      "type",
      input.getAttribute("type") === "password" ?
        "text"
        :
        "password"
    )
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(LOGIN_URL,
        JSON.stringify({ email, password }),
        {
          headers: {
            'Content-Type': 'application/json',
          },
          withCredentials: true
        }
      );
      localStorage.setItem('token', response?.data?.token);
      localStorage.setItem('firstName', response?.data?.firstName);

      console.log(localStorage);
      console.log(response?.data);
      const token = response?.data?.token;

      setAuth({ email, password, token });
      setPassword('');
      navigate(from, { replace: true });

    } catch (err) {
      console.log(err);
      if (!err?.response) {
        setErrMsg('No Server Response!');
      } else if (err.response?.status === 400) {
        setErrMsg('Invalid Email or Password!');
      } else if (err.response?.status === 401) {
        setErrMsg('Unauthorized!');
      } else {
        setErrMsg('Login Failed!');
      }
      errRef.current.focus();
    }
  }

  return (
    <div className="sign-in">
      <p ref={errRef} className={errMsg ? "errmsg" : "offscreen"} aria-live="assertive">{errMsg}</p>
      <form action="" className="form" onSubmit={handleSubmit}>
        <div className="fields">
          <div className="center">
            <h2>Welcome back!</h2>
            <p>Log into your Delic account.</p>
          </div>
          <div className="input-wrapper">
            <div className="p-field">
              <div className="edit-email">
                <p>{email}</p>
                <button
                  type="button"
                  className="edit-button"
                  onClick={() => { setShowPasswordField(!showPasswordField) }}>Edit</button>
              </div>
              <input
                id="password"
                type="password"
                name="password"
                placeholder="Your Password"
                onChange={(e) => setPassword(e.target.value)}
                value={password}
                className="input-field"
              />
              <label
                htmlFor="password"
                className="pwd-input-label"
              >
                Password
              </label>
              <img
                src={eye}
                alt="Eye Icon"
                title="Eye Icon"
                className="input-icon"
                onClick={showPassword}
              />
              <button className="form-btn" type='submit'>
                <span>LogIn</span>
              </button>

              <div className="fgt-pwd">
                <Link className="link" to="/sign-up">
                  <span>Forgot password?</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  )
}

SignIn.propTypes = {
  email: PropTypes.string.isRequired,
};

export default SignIn

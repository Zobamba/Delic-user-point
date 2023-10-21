import React, { useState, useContext, useRef, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { LoginSocialFacebook } from 'reactjs-social-login';
import { FacebookLoginButton } from 'react-social-login-buttons';
import { LoginSocialGoogle } from 'reactjs-social-login';
import { GoogleLoginButton } from 'react-social-login-buttons';
import axios from '../../api/axios';
import UserContext from '../../context/UserContext';
import Logo from '../../assets/img/delic-logo.jpg';
import SignIn from './SignIn';
import SignUp from './SignUp';
import './MatchEmail.scss';

const MatchEmail = () => {
  const [validEMail, setValidEmail] = useState(false);
  const [email, setEmail] = useState('');

  const [isUser, setIsUser] = useState(false);
  const [errMsg, setErrMsg] = useState('');

  const EMAIL_REGEX = /^[a-z0-9.]{1,64}@[a-z0-9.]{1,64}$/;
  const AUTH_LOGIN_URL = '/auth_sign_in';

  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  const value = useContext(UserContext);
  const setAuth = value.setAuth;

  const showPasswordField = value.showPasswordField;
  const setShowPasswordField = value.setShowPasswordField;

  const errRef = useRef();
  const emailRef = useRef();

  useEffect(() => {
    setValidEmail(EMAIL_REGEX.test(email));
    setErrMsg('');
    emailRef.current.focus();
  }, [email]);

  const authLogin = async (email, firstName, lastName) => {
    try {
      const response = await axios.post(AUTH_LOGIN_URL,
        JSON.stringify({ email, firstName, lastName }),
        {
          headers: {
            'Content-Type': 'application/json',
          },
          withCredentials: true
        }
      );
      console.log(localStorage);
      console.log(response?.data);
      const token = response?.data?.token;

      localStorage.setItem('token', response?.data?.token);
      localStorage.setItem('firstName', response?.data?.firstName);

      setAuth({ email, token });
      navigate(from, { replace: true });

    } catch (err) {
      console.log(err);
      if (!err?.response) {
        setErrMsg('No Server Response!');
      } else if (err.response?.status === 400) {
        setErrMsg('Bad request!');
      } else if (err.response?.status === 401) {
        setErrMsg('Unauthorized!');
      } else {
        setErrMsg('Login Failed!');
      }
      errRef.current.focus();
    }
  }

  const matchEmail = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.get(`/users/${email}/exists`);

      console.log(response.data);
      setIsUser(true);
      setShowPasswordField(true);
    } catch (err) {
      console.log(err);
      if (err.response?.status === 404) {
        setIsUser(false);
        setShowPasswordField(true);
      }
    }
  }

  return (
    <div className="sign-in">
      <p ref={errRef} className={errMsg ? "errmsg" : "offscreen"} aria-live="assertive">{errMsg}</p>
      <div className="logo">
        <img src={Logo} alt="" height={70} width={70} />
      </div>
      <div className="form">
        {!showPasswordField &&
          <div className="field">
            <div className="center">
              <h2>Welcome to Delic</h2>
              <p>Type your email to log in or create a Delic account.</p>
            </div>
            <div className="input-wrapper">
              <div className="e-field">
                <input
                  id="email"
                  type="email"
                  name="email"
                  ref={emailRef}
                  placeholder="Your Email"
                  onChange={(e) => setEmail(e.target.value)}
                  value={email}
                  pattern="/^[a-z0-9.]{1,64}@[a-z0-9.]{1,64}$/"
                  className="input-field"
                />
                <label
                  htmlFor="email"
                  className="email-input-label"
                >
                  Email
                </label>
                <button
                  className="form-btn"
                  type='button'
                  onClick={validEMail ? matchEmail : () => { setErrMsg("Invalid email") }}>
                  <span>Continue</span>
                </button>
              </div>
            </div>
            <div className="s-login">
              <LoginSocialFacebook
                className="s-lgn"
                autoLoad={true}
                fieldsProfile="name,email,picture"
                appId={process.env.REACT_APP_FACEBOOK_APP_ID}
                onResolve={(response) => {
                  authLogin(response?.data?.email, response?.data?.name.split(" ")[0], response?.data?.name.split(" ")[1]);

                  console.log(response);
                }}

                onReject={(error) => {
                  console.log(error);
                }}
              >
                <FacebookLoginButton />
              </LoginSocialFacebook>

              <LoginSocialGoogle
                className="s-lgn"
                client_id={process.env.REACT_APP_GOOGLE_CLIENT_ID}
                scope="email"
                onResolve={(response) => {
                  authLogin(response?.data?.email, response?.data?.given_name, response?.data?.family_name);
                }}

                onReject={(error) => {
                  console.log(error);
                }}
              >
                <GoogleLoginButton />
              </LoginSocialGoogle>
            </div>
          </div>}

        {showPasswordField &&
          <div className="fields">
            {isUser ?
              <SignIn email={email} /> : <SignUp email={email} setEmail={setEmail} />}
          </div>}
      </div>
    </div >
  )
}

export default MatchEmail

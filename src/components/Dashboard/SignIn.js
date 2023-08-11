import React, { useState, useContext, useRef, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from '../../api/axios';
import { LoginSocialFacebook } from 'reactjs-social-login';
import { FacebookLoginButton } from 'react-social-login-buttons';
import { LoginSocialGoogle } from 'reactjs-social-login';
import { GoogleLoginButton } from 'react-social-login-buttons';
import Logo from '../../assets/img/delic-logo.jpg';
import eye from '../../assets/eye.svg'
import eyeSlash from '../../assets/eye-slash.svg'
import CartContext from '../../context/CartContext';
import './SignIn.scss';

const SignIn = () => {
  const [showPasswordField, setShowPasswordField] = useState(false);
  const [email, setEmail] = useState('');
  const [validEMail, setValidEmail] = useState(false);
  const [password, setPassword] = useState('');
  const [errMsg, setErrMsg] = useState('');

  const EMAIL_REGEX = /^[a-z0-9.]{1,64}@[a-z0-9.]{1,64}$/;

  const value = useContext(CartContext);

  const setAuth = value.setAuth;

  const LOGIN_URL = 'users/sign_in';

  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  const errRef = useRef();

  useEffect(() => {
    setErrMsg('');
  }, [email, password]);

  useEffect(() => {
    setValidEmail(EMAIL_REGEX.test(email));
  }, [email])

  const showPassword = (e) => {
    const input = document.querySelector(".input-field");
    const inputIcon = document.querySelector(".input-icon");
    e.preventDefault();

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
      setEmail('');
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
      <div className="logo">
        <img src={Logo} alt="" height={70} width={70} />
      </div>
      <form action="" className="form" onSubmit={handleSubmit}>
        <div className="center">
          <h2>Welcome to Delic</h2>
          <p>Type your email to log in or create a Delic account.</p>
        </div>
        <div className="input-wrapper">
          {!showPasswordField &&
            <div className="e-field">
              <input
                id="email"
                type="email"
                name="email"
                placeholder="Your Email"
                onChange={(e) => setEmail(e.target.value)}
                value={email}
                title="2 to 65 characters before @. Must begin with a letter."
                pattern="/^[a-z0-9.]{1,64}@[a-z0-9.]{1,64}$/"
                className="input-field"
              />
              <label
                htmlFor="email"
                className="input-label"
              >
                Email
              </label>
              <button className="cart-btn" type='button' onClick={() => { validEMail ? setShowPasswordField(!showPasswordField) : '' }}>
                <span>Continue</span>
              </button>
            </div>}

          {showPasswordField &&
            <div className="p-field">
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
                className="input-label"
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
              <button className="cart-btn" type='submit'>
                <span>LogIn</span>
              </button>
            </div>}
        </div>
        <div className="s-login">
          <LoginSocialFacebook
            className="s-lgn"
            autoLoad={true}
            fieldsProfile="name,email,picture"
            appId={process.env.REACT_APP_FACEBOOK_APP_ID}
            onResolve={(response) => {
              console.log(response);
              history.back();
              localStorage.setItem('token', response?.data?.accessToken);
              localStorage.setItem('firstName', response?.data?.name.split(" ")[0]);
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
            onResolve={(response) => {
              console.log(response);
              history.back()
              localStorage.setItem('token', response?.data?.access_token);
              localStorage.setItem('firstName', response?.data?.name.split(" ")[1]);
            }}
            onReject={(error) => {
              console.log(error);
            }}
          >
            <GoogleLoginButton />
          </LoginSocialGoogle>
        </div>
      </form>
    </div>
  )
}

export default SignIn

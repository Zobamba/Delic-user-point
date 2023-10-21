import React, { useRef, useState, useEffect, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faKey, faPhone, faEnvelope, faUserCircle } from '@fortawesome/free-solid-svg-icons';
import { faCheck, faTimes, faInfoCircle } from '@fortawesome/free-solid-svg-icons';
import axios from '../../api/axios';
import UserContext from '../../context/UserContext';
import eye from '../../assets/eye.svg'
import eyeSlash from '../../assets/eye-slash.svg'
import './SignUp.scss';

const SignUp = ({ email, setEmail }) => {
  const USER_REGEX = /^[A-z][A-z]{2,23}$/;
  const EMAIL_REGEX = /^[a-z0-9.]{1,64}@[a-z0-9.]{1,64}$/;
  const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;
  const REGISTER_URL = '/sign_up';

  const value = useContext(UserContext);
  const setAuth = value.setAuth;

  const userRef = useRef();
  const errRef = useRef();

  const [validEMail, setValidEmail] = useState(false);
  const [emailFocus, setEmailFocus] = useState(false);

  const [firstName, setFirstName] = useState('');
  const [validFirstName, setValidFirstName] = useState(false);
  const [firstNameFocus, setFirstNameFocus] = useState(false);

  const [lastName, setLastName] = useState('');
  const [validLastName, setValidLastName] = useState(false);
  const [lastNameFocus, setLastNameFocus] = useState(false);

  const [phoneNumber, setPhoneNumber] = useState('');

  const [password, setPassword] = useState('');
  const [validPassword, setValidPassword] = useState(false);
  const [passwordFocus, setPasswordFocus] = useState(false);

  const [passwordConfirmation, setPasswordConfirmation] = useState('');
  const [validMatch, setValidMatch] = useState(false);
  const [matchFocus, setMatchFocus] = useState(false);

  const [errMsg, setErrMsg] = useState('');
  const navigate = useNavigate()


  useEffect(() => {
    userRef.current.focus();
  }, [])

  useEffect(() => {
    setValidEmail(EMAIL_REGEX.test(email));
  }, [email])

  useEffect(() => {
    setValidFirstName(USER_REGEX.test(firstName));
    setValidLastName(USER_REGEX.test(lastName));
  }, [firstName, lastName])

  useEffect(() => {
    setValidPassword(PWD_REGEX.test(password));
    setValidMatch(password === passwordConfirmation);
  }, [password, passwordConfirmation])

  useEffect(() => {
    setErrMsg('');
  }, [email, firstName, lastName, phoneNumber, password, passwordConfirmation])

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

  const showPasswordConfirmation = (e) => {
    e.preventDefault();

    const input = document.querySelector(".input-field-c-pwd");
    const inputIcon = document.querySelector(".input-icon-c-pwd");

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
    // Will effect if button validations are removed
    const v1 = EMAIL_REGEX.test(email);
    const v2 = PWD_REGEX.test(password);
    const v3 = USER_REGEX.test(firstName, lastName);
    if (!v1 || !v2 || !v3) {
      setErrMsg("Invalid Entry");
      return;
    }
    try {
      const response = await axios.post(REGISTER_URL,
        JSON.stringify({ email, firstName, lastName, phoneNumber, password, passwordConfirmation }),
        {
          headers: { 'Content-Type': 'application/json' },
          withCredentials: true
        }
      );
      localStorage.setItem('token', response?.data?.token);
      localStorage.setItem('firstName', response?.data?.firstName);

      console.log(JSON.stringify(response?.data));

      const token = response?.data?.token;
      setAuth({ email, password, token });

      //clear state and controlled inputs
      setEmail('');
      setPassword('');
      setFirstName('')
      setLastName('')
      setPhoneNumber('')
      setPasswordConfirmation('');
      navigate("/")
    } catch (err) {
      if (!err?.response) {
        setErrMsg('No Server Response!');
      } else if (err.response?.status === 409) {
        setErrMsg('Email already exist!');
      } else {
        setErrMsg('Registration Failed!')
      }
      errRef.current.focus();
    }
  }

  return (
    <main className="wrapper">
      <section className="inner">
        <p ref={errRef} className={errMsg ? "errmsg" : "offscreen"} aria-live="assertive">{errMsg}</p>
        <form className="login100-form" onSubmit={handleSubmit}>
          <div className="center">
            <h2>Create your account</h2>
            <p>Create a Delic account to get started.</p>
          </div>
          <div className="form-group">
            <div className="form-wrapper">
              <label className="label-input100" htmlFor="firstName">
                First Name:
                <FontAwesomeIcon icon={faCheck} className={validFirstName ? "valid" : "hide"} />
                <FontAwesomeIcon icon={faTimes} className={validFirstName || !firstName ? "hide" : "invalid"} />
              </label>
              <input
                className="form-control"
                type="text"
                ref={userRef}
                id="firstName"
                autoComplete="off"
                onChange={(e) => setFirstName(e.target.value)}
                value={firstName}
                required
                aria-invalid={validFirstName ? false.toString() : true.toString()}
                aria-describedby="firstName"
                onFocus={() => setFirstNameFocus(true)}
                onBlur={() => setFirstNameFocus(false)}
              />
              <p id="firstName" className={firstNameFocus && firstName && !validFirstName ? "instructions" : "offscreen"}>
                <FontAwesomeIcon icon={faInfoCircle} />
                3 to 24 characters.<br />
                Must begin with a letter.<br />
              </p>
              <span>
                <i>
                  <FontAwesomeIcon className="focus-input100 user" icon={faUserCircle} />
                </i>
              </span>
            </div>
            <div className="form-wrapper">
              <label className="label-input100" htmlFor="lastName">
                Last Name:
                <FontAwesomeIcon icon={faCheck} className={validLastName ? "valid" : "hide"} />
                <FontAwesomeIcon icon={faTimes} className={validLastName || !lastName ? "hide" : "invalid"} />
              </label>
              <input
                className="form-control"
                type="text"
                id="lastName"
                autoComplete="off"
                onChange={(e) => setLastName(e.target.value)}
                value={lastName}
                required
                aria-invalid={validLastName ? false.toString() : true.toString()}
                aria-describedby="lastName"
                onFocus={() => setLastNameFocus(true)}
                onBlur={() => setLastNameFocus(false)}
              />
              <p id="lastName" className={lastNameFocus && lastName && !validLastName ? "instructions" : "offscreen"}>
                <FontAwesomeIcon icon={faInfoCircle} />
                3 to 24 characters.<br />
                Must begin with a letter.<br />
              </p>
              <span>
                <i>
                  <FontAwesomeIcon className="focus-input100 user" icon={faUserCircle} />
                </i>
              </span>
            </div>
          </div>
          <div className="form-wrapper">
            <label className="label-input100" htmlFor="phone">
              Phone No:
            </label>
            <input
              className="form-control"
              type="tel"
              id="phone"
              autoComplete="off"
              onChange={(e) => setPhoneNumber(e.target.value)}
              value={phoneNumber}
              required
              aria-describedby="phone"
            />
            <span>
              <i>
                <FontAwesomeIcon className="focus-input100" icon={faPhone} />
              </i>
            </span>
          </div>
          <div className="form-wrapper">
            <label className="label-input100" htmlFor="email">
              Email:
              <FontAwesomeIcon icon={faCheck} className={validEMail ? "valid" : "hide"} />
              <FontAwesomeIcon icon={faTimes} className={validEMail || !email ? "hide" : "invalid"} />
            </label>
            <input
              className="form-control"
              type="email"
              id="email"
              autoComplete="off"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              required
              aria-invalid={validEMail ? false.toString() : true.toString()}
              aria-describedby="email"
              onFocus={() => setEmailFocus(true)}
              onBlur={() => setEmailFocus(false)}
            />
            <p id="eml" className={emailFocus && email && !validEMail ? "instructions" : "offscreen"}>
              <FontAwesomeIcon icon={faInfoCircle} />
              2 to 65 characters before @.<br />
              Must begin with a letter.<br />
            </p>
            <span>
              <i>
                <FontAwesomeIcon className="focus-input100" icon={faEnvelope} />
              </i>
            </span>
          </div>
          <div className="form-wrapper">
            <label className="label-input100" htmlFor="password">
              Password:
              <FontAwesomeIcon icon={faCheck} className={validPassword ? "valid" : "hide"} />
              <FontAwesomeIcon icon={faTimes} className={validPassword || !password ? "hide" : "invalid"} />
            </label>
            <input
              className="input-field"
              type="password"
              id="password"
              name="password"
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              required
              aria-invalid={validPassword ? false.toString() : true.toString()}
              aria-describedby="pwd"
              onFocus={() => setPasswordFocus(true)}
              onBlur={() => setPasswordFocus(false)}
            />
            <p id="pwd" className={passwordFocus && !validPassword ? "instructions" : "offscreen"}>
              <FontAwesomeIcon icon={faInfoCircle} />
              8 to 24 characters.<br />
              Must include uppercase and lowercase letters, a number and a special character.<br />
              Allowed special characters: <span aria-label="exclamation mark">!</span>
              <span aria-label="at symbol">@</span>
              <span aria-label="hashtag">#</span>
              <span aria-label="dollar sign">$</span>
              <span aria-label="percent">%</span>
            </p>

            <span>
              <i>
                <FontAwesomeIcon className="focus-input100" icon={faKey} />
              </i>
            </span>
            <span>
              <i>
                <img
                  src={eye}
                  alt="Eye Icon"
                  title="Eye Icon"
                  className="focus-input100 input-icon"
                  onClick={showPassword}
                />
              </i>
            </span>
          </div>
          <div className="form-wrapper">
            <label className="label-input100" htmlFor="confirm_pwd">
              Confirm Password:
              <FontAwesomeIcon icon={faCheck} className={validMatch && passwordConfirmation ? "valid" : "hide"} />
              <FontAwesomeIcon icon={faTimes} className={validMatch || !passwordConfirmation ? "hide" : "invalid"} />
            </label>
            <input
              className="input-field-c-pwd"
              type="password"
              name="confirmPwd"
              id="confirmPwd"
              onChange={(e) => setPasswordConfirmation(e.target.value)}
              value={passwordConfirmation}
              required
              aria-invalid={validPassword ? false.toString() : true.toString()}
              aria-describedby="confirmPwd"
              onFocus={() => setMatchFocus(true)}
              onBlur={() => setMatchFocus(false)}
            />
            <p id="confirmPwd" className={matchFocus && !validMatch ? "instructions" : "offscreen"}>
              <FontAwesomeIcon icon={faInfoCircle} />
              Must match the first password input field.
            </p>
            <span>
              <i>
                <FontAwesomeIcon className="focus-input100" icon={faKey} />
              </i>
            </span>
            <span>
              <i>
                <img
                  src={eye}
                  alt="Eye Icon"
                  title="Eye Icon"
                  className="focus-input100 input-icon-c-pwd"
                  onClick={showPasswordConfirmation}
                />
              </i>
            </span>
          </div>

          <div className="btn-section">
            <button disabled={!validFirstName || !validLastName || !validEMail || !validPassword || !validMatch ? true : false}>Register</button>
            <Link className="sign-in" to="/sign-in">I am already a member</Link>
          </div>
        </form>
      </section>
    </main>
  )
}

SignUp.propTypes = {
  email: PropTypes.string.isRequired,
  setEmail: PropTypes.func.isRequired,
};

export default SignUp

/* eslint-disable react/button-has-type */
import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { ReactComponent as Slider } from '../../assets/slider.svg';
import { ReactComponent as Insta } from '../../assets/insta.svg';
import { ReactComponent as Fb } from '../../assets/fb.svg';
import './Footer.scss';

const Footer = ({ footerRef }) => (
  <footer className="ftr" id="contact-us" ref={footerRef}>
    <div className="container">
      <div className="footer-content">
        <h1 className="header-txt scroll-reveal">Contact</h1>
        <div className="divider scroll-reveal">
          <Slider />
        </div>
        <div className="contact-info scroll-reveal">
          <div className="info-address">
            <h3>Delic</h3>
            <p>
              3428 Chime Avenue
              <br />
              Okpanam, DS 07840
            </p>
          </div>
          <div className="reservations">
            <h3>Reservations</h3>
            <p>
              delic@gmail.com
              <br />
              +234 81-6473-8466
            </p>
          </div>
        </div>
        <div className="contact-form scroll-reveal" data-origin="bottom" data-distance="20%">
          <h3>Contact us</h3>
          <form>
            <input type="text" name="name" placeholder="Name" />
            <input type="email" name="email" placeholder="Email" />
            <textarea placeholder="Message"></textarea>
            <button className="send-form">Send</button>
          </form>
        </div>
        <div className="social-icons scroll-reveal" data-duration="1500">
        <div className="fb-i">
            <Link to="">
              <Fb />
            </Link>
          </div>
          <div className="insta-i">
            <Link to="">
              <Insta />
            </Link>
          </div>
        </div>
      </div>
      <p className="copy-info">Copyright © 2024 Delic, Inc. All rights reserved.</p>
    </div>
  </footer>
);

Footer.propTypes = {
  footerRef: PropTypes.object.isRequired,
};

export default Footer;

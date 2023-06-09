/* eslint-disable react/button-has-type */
import React from 'react';
import PropTypes from 'prop-types';

import { ReactComponent as Slider } from '../../assets/slider.svg';
import { ReactComponent as Insta } from '../../assets/insta.svg';
import { ReactComponent as Fb } from '../../assets/fb.svg';
import './Footer.scss';

const Footer = ({ footerRef }) => (
  <footer id="contact-us" ref={footerRef}>
    <div className="container">
      <div className="footer-content">
        <h1 className="header-txt scroll-reveal">Contact</h1>
        <div className="divider scroll-reveal">
          <Slider />
        </div>
        <div className="contact-info scroll-reveal">
          <div className="info-address">
            <h3>Veggie</h3>
            <p>
              3428 Magnolia Avenue
              <br />
              Hackettstown, NJ 07840
            </p>
          </div>
          <div className="reservations">
            <h3>Reservations</h3>
            <p>
              reservations@vegggie.com
              <br />
              +48 202-555-0114
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
            <Fb />
          </div>
          <div className="insta-i">
            <Insta />
          </div>
        </div>
      </div>
      <p className="copy-info">Copyright 2017 © by Anna Dadej</p>
    </div>
  </footer>
);

Footer.propTypes = {
  footerRef: PropTypes.object.isRequired,
};

export default Footer;

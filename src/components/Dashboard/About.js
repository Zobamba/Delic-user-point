import React from 'react';
import PropTypes from 'prop-types';
import { ReactComponent as Slider } from '../../assets/slider.svg';
import './About.scss';

const About = ({ aboutRef }) => (
  <section className="about" ref={aboutRef}>
    <div className="container">
      <div className="about-content">
        <h1 className="header-txt scroll-reveal">About us</h1>
        <div className="divider scroll-reveal">
          <Slider />
        </div>
        <p className="scroll-reveal" data-origin="top" data-distance="10%">
          Delic is an online restaurant that can deliver meals directly to you at your chosen address.
          We cover different varieties of meals which are freshly prepared on a daily basis.
          We believe that life is dull without good food.
          Choose Delic today. Choose good meal.
        </p>
      </div>
    </div>
  </section>
);

About.propTypes = {
  aboutRef: PropTypes.object.isRequired,
};

export default About;

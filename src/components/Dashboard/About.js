import React from 'react';
import PropTypes from 'prop-types';
import { ReactComponent as Slider } from '../../assets/slider.svg';
import Signature from '../../assets/signature.png';
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
          Nori grape silver beet broccoli kombu beet greens
          fava bean potato quandong celery. Bunya nuts black-eyed
          pea prairie turnip leek lentil turnip greens parsnip.
        </p>
        <img className="signature scroll-reveal" data-origin="right" data-distance="20%" src={Signature} alt="Signature" />
      </div>
    </div>
  </section>
);

About.propTypes = {
  aboutRef: PropTypes.object.isRequired,
};

export default About;

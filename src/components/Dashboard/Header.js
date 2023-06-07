/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable react/jsx-boolean-value */
/* eslint-disable jsx-a11y/control-has-associated-label */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import { Carousel } from 'react-responsive-carousel';
import { ReactComponent as Slider } from '../../assets/slider.svg';
import './Header.scss';

const Header = ({
  specialsRef, aboutRef, menuCartRef, footerRef,
}) => {
  const [menuIsOpen, setMenuIsOpen] = useState(false);

  const handleScroll = (ref) => {
    window.scrollTo({
      top: ref.current.offsetTop,
      left: 0,
      behavior: 'smooth',
    });
  };

  return (
    <header className="site-header">
      <div className="container">
        <div className="header-content">
          <div className="top-menu  scroll-reveal">
            <div className="menu">
              <button onClick={() => setMenuIsOpen(!menuIsOpen)} type="button" className="title-bar">
                <div className="menu-icon dark" type="button" data-toggle="main-nav"></div>
                <div className="title-bar-title">Menu</div>
              </button>
              <nav id="main-nav" data-animate="menu-in menu-out">
                <ul className={`main-navigation ${menuIsOpen ? 'open' : ''}`}>
                  <li><a className="m-active" href="#" data-text="Home">Home</a></li>
                  <li><a className="m-anim" onClick={() => handleScroll(specialsRef)} data-text="Specials">Specials</a></li>
                  <li><a className="m-anim" onClick={() => handleScroll(aboutRef)} data-text="About">About</a></li>
                  <li><a className="m-anim" onClick={() => handleScroll(menuCartRef)} data-text="Menu Cart">Menu Cart</a></li>
                  <li><a className="m-anim" onClick={() => handleScroll(footerRef)} data-text="Contact">Contact</a></li>
                </ul>
              </nav>
            </div>
          </div>
        </div>
      </div>
      <Carousel
        infinite={true}
        infiniteLoop={true}
        autoPlay={true}
        autoplaySpeed={3500}
        transitionTime={10}
        showArrows={false}
        fade={true}
        showIndicators={false}
        stopOnHover={false}
        showStatus={false}
        cssEase="linear"
        showThumbs={false}
      >
        <div className="slider">
          <div className="a-slide slide1">
            <div className="container">
              <div className="bottom-section scroll-reveal" data-origin="right" data-distance="20%">
                <h1 className="header-txt">Veggie gram fava bean leek dandelion silver beet eggplant bush tomato</h1>
                <div className="divider">
                  <Slider />
                </div>

              </div>
            </div>
          </div>
        </div>
        <div className="slider">
          <div className="a-slide slide2">
            <div className="container">
              <div className="bottom-section">
                <h1 className="header-txt">Dandelion cucumber earthnut pea peanut soko zucchini</h1>
                <div className="divider">
                  <Slider />
                </div>
              </div>
            </div>
          </div>
        </div>
      </Carousel>
    </header>
  );
};

Header.propTypes = {
  specialsRef: PropTypes.object.isRequired,
  aboutRef: PropTypes.object.isRequired,
  menuCartRef: PropTypes.object.isRequired,
  footerRef: PropTypes.object.isRequired,
};

export default Header;

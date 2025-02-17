import React, { useContext, useState, useEffect } from "react";
import PropTypes from "prop-types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faAngleDown,
  faAngleUp,
  faCartShopping,
} from "@fortawesome/free-solid-svg-icons";
import { faUser } from "@fortawesome/free-regular-svg-icons";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import UserContext from "../../context/UserContext";
import Cart from "./Cart";
import Account from "./Account";
import { ReactComponent as Slider } from "../../assets/slider.svg";
import "./Header.scss";

const Header = ({ specialsRef, aboutRef, menuCartRef, footerRef }) => {
  const [menuIsOpen, setMenuIsOpen] = useState(false);
  const [cartIsOpen, setCartIsOpen] = useState(false);
  const [accountIsOpen, setAccountIsOpen] = useState(false);
  const [touchStartY, setTouchStartY] = useState(0);
  const [touchEndY, setTouchEndY] = useState(0);

  const handleTouchStart = (e) => {
    setTouchStartY(e.touches[0].clientY);
  };

  const handleTouchMove = (e) => {
    setTouchEndY(e.touches[0].clientY);
  };

  const handleTouchEnd = (e) => {
    const verticalSwipeDistance = Math.abs(touchEndY - touchStartY);
    if (verticalSwipeDistance > 10) {
      e.stopPropagation();
    }
  };

  const name = localStorage.getItem("firstName");

  const value = useContext(UserContext);
  const setShowPasswordField = value.setShowPasswordField;

  const cartItems = value.mealsInCart;
  const setCartItems = value.setMealsInCart;

  let quantity = 0;

  cartItems.forEach((item) => {
    quantity = item.units + quantity;
  });

  useEffect(() => {
    const itemsInCart = JSON.parse(localStorage.getItem("cartItems") || "[]");

    setCartItems(itemsInCart);
    setShowPasswordField(false);
  }, []);

  const handleScroll = (ref) => {
    window.scrollTo({
      top: ref.current.offsetTop,
      left: 0,
      behavior: "smooth",
    });
  };

  return (
    <header className="site-header">
      <div className="container">
        <div className="header-content">
          <div className="top-menu  scroll-reveal">
            <div className="menu">
              <button
                onClick={() => setMenuIsOpen(!menuIsOpen)}
                type="button"
                className="title-bar"
              >
                <div
                  className="menu-icon dark"
                  type="button"
                  data-toggle="main-nav"
                ></div>
                <div className="title-bar-title">Menu</div>
              </button>
              <nav id="main-nav" data-animate="menu-in menu-out">
                <ul className={`main-navigation ${menuIsOpen ? "open" : ""}`}>
                  <li>
                    <a
                      className={`${cartIsOpen ? "m-anim" : "m-active"}`}
                      onClick={() => {
                        setCartIsOpen(false);
                        setAccountIsOpen(false);
                      }}
                      data-text="Home"
                    >
                      Home
                    </a>
                  </li>
                  <li>
                    <a
                      className="m-anim"
                      onClick={() => handleScroll(specialsRef)}
                      data-text="Specials"
                    >
                      Specials
                    </a>
                  </li>
                  <li>
                    <a
                      className="m-anim"
                      onClick={() => handleScroll(menuCartRef)}
                      data-text="Menu Cart"
                    >
                      Menu Cart
                    </a>
                  </li>
                  <li>
                    <a
                      className="m-anim"
                      onClick={() => handleScroll(aboutRef)}
                      data-text="About"
                    >
                      About
                    </a>
                  </li>
                  <li>
                    <a
                      className="m-anim"
                      onClick={() => handleScroll(footerRef)}
                      data-text="Contact"
                    >
                      Contact
                    </a>
                  </li>
                  {!name ? (
                    <li>
                      <a
                        className={`${accountIsOpen ? "m-active" : "m-anim"}`}
                        onClick={() => {
                          setAccountIsOpen(!accountIsOpen);
                          setCartIsOpen(false);
                        }}
                        data-text="Account"
                      >
                        <FontAwesomeIcon className="icon" icon={faUser} />
                        Account{" "}
                        {!accountIsOpen ? (
                          <FontAwesomeIcon className="arw" icon={faAngleDown} />
                        ) : (
                          <FontAwesomeIcon className="arw" icon={faAngleUp} />
                        )}
                      </a>
                    </li>
                  ) : (
                    <li>
                      <a
                        className={`${accountIsOpen ? "m-active" : "m-anim"}`}
                        onClick={() => {
                          setAccountIsOpen(!accountIsOpen);
                          setCartIsOpen(false);
                        }}
                        data-text="Account"
                      >
                        <FontAwesomeIcon className="icon" icon={faUser} />
                        Hi, {name}{" "}
                        {!accountIsOpen ? (
                          <FontAwesomeIcon className="arw" icon={faAngleDown} />
                        ) : (
                          <FontAwesomeIcon className="arw" icon={faAngleUp} />
                        )}
                      </a>
                    </li>
                  )}
                  <li>
                    <a
                      className={`${cartIsOpen ? "m-active" : "m-anim"}`}
                      onClick={() => {
                        setCartIsOpen(!cartIsOpen);
                        setAccountIsOpen(false);
                      }}
                      data-text="Cart"
                    >
                      <FontAwesomeIcon className="icon" icon={faCartShopping} />
                      Cart{" "}
                      {!cartIsOpen ? (
                        <FontAwesomeIcon className="arw" icon={faAngleDown} />
                      ) : (
                        <FontAwesomeIcon className="arw" icon={faAngleUp} />
                      )}
                      {cartItems.length != 0 && (
                        <div className="badge">
                          <span className="bg">{quantity}</span>
                        </div>
                      )}
                    </a>
                  </li>
                </ul>
              </nav>
            </div>
            {cartIsOpen && <Cart menuCartRef={menuCartRef} />}
            {accountIsOpen && <Account />}
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
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        <div
          className="slider"
          onClick={() => {
            setCartIsOpen(false);
            setAccountIsOpen(false);
          }}
        >
          <div className="a-slide slide1">
            <div className="container">
              <div
                className="bottom-section scroll-reveal"
                data-origin="right"
                data-distance="20%"
              >
                <h1 className="header-txt">
                  Fastest <span>online</span> food <span>delivery</span> service
                </h1>
                <div className="divider">
                  <Slider />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div
          className="slider"
          onClick={() => {
            setCartIsOpen(false);
            setAccountIsOpen(false);
          }}
        >
          <div className="a-slide slide2">
            <div className="container">
              <div className="bottom-section">
                <h1 className="header-txt">
                  We have the <span>best</span> delicacies at Delic
                </h1>
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

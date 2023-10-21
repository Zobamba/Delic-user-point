/* eslint-disable max-len */
import React, { useRef } from 'react';
import { Routes, Route } from 'react-router-dom';
import Header from './Header';
import CategoryIcons from './CategoryIcons';
import Specials from './Specials';
import About from './About';
import MenuCart from './MenuCart';
import Footer from './Footer';
import IconTop from './IconTop';
import Checkout from './Checkout';
import MatchEmail from './MatchEmail';
import './App.scss';

const App = () => {
  const specialsRef = useRef();
  const aboutRef = useRef();
  const menuCartRef = useRef();
  const footerRef = useRef();

  return (
    <Routes>
      <Route path="/" element={<>
        <Header
          specialsRef={specialsRef} aboutRef={aboutRef}
          menuCartRef={menuCartRef} footerRef={footerRef}
        />
        <CategoryIcons />
        <Specials specialsRef={specialsRef} />
        <MenuCart menuCartRef={menuCartRef} />
        <About aboutRef={aboutRef} />
        <IconTop />
        <Footer footerRef={footerRef} />
      </>} />
      <Route path="/checkout" element={<Checkout />} />
      <Route path="/sign-in" element={<MatchEmail />} />
    </Routes>
  );
};

export default App;

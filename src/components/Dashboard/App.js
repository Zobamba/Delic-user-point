/* eslint-disable max-len */
import React, { useRef } from 'react';
import Header from './Header';
import CategoryIcons from './CategoryIcons';
import Specials from './Specials';
import About from './About';
import MenuCart from './MenuCart';
import Footer from './Footer';
import IconTop from './IconTop';
import './App.scss';

const Dashboard = () => {
  const specialsRef = useRef();
  const aboutRef = useRef();
  const menuCartRef = useRef();
  const footerRef = useRef();

  return (
    <div>
      <Header specialsRef={specialsRef} aboutRef={aboutRef} menuCartRef={menuCartRef} footerRef={footerRef} />
      <CategoryIcons />
      <Specials specialsRef={specialsRef} />
      <About aboutRef={aboutRef} />
      <MenuCart menuCartRef={menuCartRef} />
      <IconTop />
      <Footer footerRef={footerRef} />
    </div>
  );
};

export default Dashboard;

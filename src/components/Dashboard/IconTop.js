import React, { useEffect } from 'react';
import './IconTop.scss';

const CdTop = () => {
  useEffect(() => {
  }, []);
  return (
    <a
      href="#0"
      className="cd-top"
      onClick={() => {
        window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
      }}
    >
      Top
    </a>
  );
};

export default CdTop;

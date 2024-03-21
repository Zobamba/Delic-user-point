import React from 'react';
import './IconTop.scss';

const CdTop = () => {
  return (
    <a
      className="cd-top"
      onClick={() => {
        window.scrollTo({
          top: 0,
          left: 0,
          behavior: 'smooth'
        });
      }}
    >
      Top
    </a>
  );
};

export default CdTop;

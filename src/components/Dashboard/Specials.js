import React from 'react';
import PropTypes from 'prop-types';
import { ReactComponent as Slider } from '../../assets/slider.svg';
import special1 from '../../assets/img/special-1.png';
import special2 from '../../assets/img/special-2.png';
import special3 from '../../assets/img/special-3.png';
import special4 from '../../assets/img/special-4.png';
import special5 from '../../assets/img/special-5.png';
import special6 from '../../assets/img/special-6.png';
import './Specials.scss';

const Specials = ({ specialsRef }) => (
  <section className="month-specials" ref={specialsRef}>
    <div className="container">
      <h1 className="header-txt">This month specials</h1>
      <div className="divider">
        <Slider />
      </div>

      <div className="specials-content">
        <div className="special">
          <div className="special-img img-01">
            <img src={special1} alt="Greens fava" />
          </div>
          <div className="special-items spec-01">
            <h2 className="scroll-reveal" data-origin="top" data-distance="20%">Greens fava</h2>
            <span className="line scroll-reveal" data-origin="top" data-distance="20%"></span>
            <p className="scroll-reveal" data-origin="bottom" data-distance="30%">
              Nori grape silver beet broccoli kombu beet
              greens fava
            </p>
            <span className="scroll-reveal" data-origin="bottom" data-distance="60%">19$</span>
          </div>
        </div>

        <div className="special">
          <div className="special-img img-02">
            <img src={special2} alt="Celery quand" />
          </div>
          <div className="special-items spec-02">
            <h2 className="scroll-reveal" data-origin="top" data-distance="20%">Celery quand</h2>
            <span className="line scroll-reveal" data-origin="top" data-distance="20%"></span>
            <p className="scroll-reveal" data-origin="bottom" data-distance="30%">
              Celery quandong swiss chard chicory
              earthnut pea
            </p>
            <span className="scroll-reveal" data-origin="bottom" data-distance="60%">18$</span>
          </div>
        </div>

        <div className="special">
          <div className="special-img img-03">
            <img src={special3} alt="Pea horser" />
          </div>
          <div className="special-items spec-03">
            <h2 className="scroll-reveal" data-origin="top" data-distance="20%">Pea horser</h2>
            <span className="line scroll-reveal" data-origin="top" data-distance="20%"></span>
            <p className="scroll-reveal" data-origin="bottom" data-distance="30%">
              Kohlrabi radish okra azuki bean corn fava
              bean mustard
            </p>
            <span className="scroll-reveal" data-origin="bottom" data-distance="60%">7$</span>
          </div>
        </div>
        <div className="special">
          <div className="special-items spec-04">
            <h2 className="scroll-reveal" data-origin="top" data-distance="20%">Soko radicchio</h2>
            <span className="line scroll-reveal" data-origin="top" data-distance="20%"></span>
            <p className="scroll-reveal" data-origin="bottom" data-distance="30%">
              Dandelion zucchini burdock yarrow chickpea
              dandelion
            </p>
            <span className="scroll-reveal" data-origin="bottom" data-distance="60%">25$</span>
          </div>
          <div className="special-img img-04">
            <img src={special4} alt="Tigernut" />
          </div>
        </div>
        <div className="special">
          <div className="special-items spec-05">
            <h2 className="scroll-reveal" data-origin="top" data-distance="20%">Tigernut</h2>
            <span className="line scroll-reveal" data-origin="top" data-distance="20%"></span>
            <p className="scroll-reveal" data-origin="bottom" data-distance="30%">
              Grape silver beet watercress potato
              tigernut
            </p>
            <span className="scroll-reveal" data-origin="bottom" data-distance="60%">14$</span>
          </div>
          <div className="special-img img-05">
            <img src={special5} alt="arrow sweet" />
          </div>
        </div>
        <div className="special">
          <div className="special-items spec-06">
            <h2 className="scroll-reveal" data-origin="top" data-distance="20%">Yarrow sweet</h2>
            <span className="line scroll-reveal" data-origin="top" data-distance="20%"></span>
            <p className="scroll-reveal" data-origin="bottom" data-distance="30%">
              Gumbo kakadu plum komatsuna black-eyed pea
              green
            </p>
            <span className="scroll-reveal" data-origin="bottom" data-distance="60%">8$</span>
          </div>
          <div className="special-img img-06">
            <img src={special6} alt="arrow sweet" />
          </div>
        </div>
      </div>
    </div>
  </section>
);

Specials.propTypes = {
  specialsRef: PropTypes.object.isRequired,
};

export default Specials;

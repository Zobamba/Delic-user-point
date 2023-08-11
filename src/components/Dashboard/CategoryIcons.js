import React from 'react';
import vege from '../../assets/icon-vege.svg';
import coffee from '../../assets/icon-coffee.svg';
import sweet from '../../assets/icon-sweet.svg';
import './CategoryIcons.scss';

const CategoryIcons = () => (
  <section className="category-icons">
    <div className="container">
      <div className="yellow-content">
        <div className="icon">
          <img className="scroll-reveal" data-origin="top" data-distance="20%" src={vege} alt="Turnip greens" />
          <h3 className="scroll-reveal" data-origin="top" data-distance="20%">Turnip greens</h3>
          <p className="scroll-reveal" data-distance="0" data-duration="500">
            Turnip greens yarrow ricebean rutabaga endive
            cauliflower sea lettuce kohlrabi amaranth water spinach avocado daikon napa cabbage.
          </p>
        </div>
        <div className="icon">
          <img className="scroll-reveal" data-origin="top" data-distance="20%" src={coffee} alt="beetroot water" />
          <h3 className="scroll-reveal" data-origin="top" data-distance="20%">beetroot water</h3>
          <p className="scroll-reveal" data-distance="0" data-duration="700">
            Nori grape silver beet broccoli kombu beet
            greens fava bean potato quandong celery. Bunya nuts black-eyed pea prairie turnip leek.
          </p>
        </div>
        <div className="icon">
          <img className="scroll-reveal" data-origin="top" data-distance="20%" src={sweet} alt="get social" />
          <h3 className="scroll-reveal" data-origin="top" data-distance="20%">get social</h3>
          <p className="scroll-reveal" data-distance="0" data-duration="900">
            Pea horseradish azuki bean lettuce avocado
            asparagus okra. Kohlrabi radish okra azuki bean corn fava bean mustard tigernut jícama.
          </p>
        </div>
      </div>
    </div>
  </section>
);

export default CategoryIcons;

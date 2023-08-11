import React, {
  useEffect, useState, useContext
} from 'react';
import PropTypes from 'prop-types';
import axios from '../../api/axios';
import CartContext from '../../context/CartContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartPlus } from '@fortawesome/free-solid-svg-icons';
import { ReactComponent as Slider } from '../../assets/slider.svg';
import './Specials.scss';

const Specials = ({ specialsRef }) => {
  const [specials, setSpecials] = useState();

  const value = useContext(CartContext);
  const setMealIds = value.setMealIds;
  const setCartItems = value.setMealsInCart;

  const mealIds = JSON.parse(localStorage.getItem("mealIds") || '[]');

  const handleAddToCartClick = (special) => {
    var cartItems = JSON.parse(localStorage.getItem("cartItems") || '[]');
    var mealIds = JSON.parse(localStorage.getItem("mealIds") || '[]');

    const newMeal = { ...special, units: 1 };

    cartItems.push(newMeal);
    mealIds.push(special.id);

    setCartItems(cartItems);
    setMealIds(mealIds);

    localStorage.setItem('cartItems', JSON.stringify(cartItems));
    localStorage.setItem('mealIds', JSON.stringify(mealIds));
  };

  const handleRemoveClick = (id) => {
    var cartItems = JSON.parse(localStorage.getItem("cartItems") || '[]');
    var mealIds = JSON.parse(localStorage.getItem("mealIds") || '[]');

    const newCartItems = (cartItems.filter(item => item.id !== id));
    const newMealIds = (mealIds.filter(item => item !== id));

    setCartItems(newCartItems);
    setMealIds(newMealIds);

    localStorage.setItem('cartItems', JSON.stringify(newCartItems));
    localStorage.setItem('mealIds', JSON.stringify(newMealIds))
  };

  useEffect(() => {
    const getSpecials = async () => {
      try {
        const response = await axios.get('/menusMeals?category=specials');
        setSpecials(response.data.mealRecords);
      } catch (err) {
        console.error(err);
      }
    };

    getSpecials();
  }, []);

  return (
    <section className="month-specials" ref={specialsRef}>
      <div className="container">
        <h1 className="header-txt">Delic specials</h1>
        <div className="divider">
          <Slider />
        </div>

        {specials
          &&
          <div className="specials-content">
            {specials.map((special, i) => {

              return (
                <div className="special" key={i}>
                  <div className="special-img img-01">
                    <img src={special.imageUrl} alt="Greens fava" />
                  </div>
                  <div className="special-items spec-01">
                    <h2 className="scroll-reveal" data-origin="top" data-distance="20%">{special.name}</h2>
                    <p className="scroll-reveal" data-origin="bottom" data-distance="30%">{special.description}</p>
                    <span className="scroll-reveal" data-origin="bottom" data-distance="60%">
                      {(special.price).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                    </span>

                    {mealIds.includes(special.id) ?
                      <button
                        className="cart-btn"
                        onClick={(e) => { e, handleRemoveClick(special.id) }}>
                        <FontAwesomeIcon className="icon" icon={faCartPlus} />
                        <span>remove</span>
                      </button>
                      :
                      <button
                        className="cart-btn"
                        onClick={(e) => { e, handleAddToCartClick(special) }}>
                        <FontAwesomeIcon className="icon" icon={faCartPlus} />
                        <span>add to cart</span>
                      </button>
                    }
                  </div>
                </div>
              )
            })}
          </div>
        }
      </div>
    </section>
  );
};

Specials.propTypes = {
  specialsRef: PropTypes.object.isRequired,
};

export default Specials;

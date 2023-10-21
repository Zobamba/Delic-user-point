import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import UserContext from '../../context/UserContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartPlus } from '@fortawesome/free-solid-svg-icons';
import './Modal.scss';

const Modal = ({ setModalOpen, selectedMeal }) => {
  const value = useContext(UserContext);
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

  return (
    <div className="modal-container">
      <div className="modal">
        <button
          className="close-btn"
          onClick={() => { setModalOpen(); }}
          >
          <span>&times;</span>
        </button>

        <div className="modal-content">
          <div className="image">
            <img src={selectedMeal.imageUrl} alt="Meal image" />
          </div>

          <div className="info">
            <h1><span>{selectedMeal.name}</span></h1>
            <h3><span>{selectedMeal.description}</span></h3>
            <h2><span>&#8358;{selectedMeal.price}</span></h2>

            {mealIds.includes(selectedMeal.id) ?
              <button
                className="cart-btn"
                onClick={() => { handleRemoveClick(selectedMeal.id) }}>
                <FontAwesomeIcon className="icon" icon={faCartPlus} />
                <span>remove</span>
              </button>
              :
              <button
                className="cart-btn"
                onClick={() => { handleAddToCartClick(selectedMeal) }}>
                <FontAwesomeIcon className="icon" icon={faCartPlus} />
                <span>add to cart</span>
              </button>
            }
          </div>
        </div>
      </div>
    </div>
  );
}

Modal.propTypes = {
  setModalOpen: PropTypes.func.isRequired,
  selectedMeal: PropTypes.object.isRequired,
};

export default Modal;

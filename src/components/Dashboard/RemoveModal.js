import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashCan } from '@fortawesome/free-solid-svg-icons';
import UserContext from '../../context/UserContext';
import './RemoveModal.scss';

const RemoveModal = ({ setModalOpen, item }) => {
  const value = useContext(UserContext);
  const setMealIds = value.setMealIds;
  const setCartItems = value.setMealsInCart;

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
    <section className="r-mdl">
      <div className="modal">
        <button
          className="close-btn"
          onClick={() => { setModalOpen(); }}>
          <span>&times;</span>
        </button>
        <div className="modal-content">
          <h2 className="ttl">Remove from cart</h2>
          <div className="mdl">
            <p>Do you really want to remove {item.name} from cart?</p>
            <button
              className="btn"
              onClick={() => { handleRemoveClick(item.id); setModalOpen(false); }}>
              <FontAwesomeIcon className="trash" icon={faTrashCan} />
              Remove item
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}

RemoveModal.propTypes = {
  setModalOpen: PropTypes.func.isRequired,
  item: PropTypes.object.isRequired,
};

export default RemoveModal

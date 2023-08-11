import React, { useState, useContext } from 'react'
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartPlus, faMinus, faPlus, faTrashCan } from '@fortawesome/free-solid-svg-icons';
import CartContext from '../../context/CartContext';
import RemoveModal from './RemoveModal';
import './Cart.scss';

const Cart = ({ menuCartRef }) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [item, setItem] = useState();

  const value = useContext(CartContext);
  const cartItems = value.mealsInCart;
  const setCartItems = value.setMealsInCart;

  const token = localStorage.getItem('token');

  let totalPrice = 0;

  cartItems.forEach((item) => {
    totalPrice = (item.price * item.units) + totalPrice;
  });

  const increaseUnits = (e, id) => {
    e.preventDefault();

    const meals = cartItems;

    const mealIndex = meals.findIndex(item => item.id === id);

    const meal = meals[mealIndex];

    meals[mealIndex] = { ...meal, units: (meal.units) + 1 };

    setCartItems([...meals]);

    localStorage.setItem('cartItems', JSON.stringify(cartItems));
  };

  const decreaseUnits = (e, id) => {
    e.preventDefault();

    const meals = cartItems;

    const mealIndex = meals.findIndex(item => item.id === id);

    const meal = meals[mealIndex];

    meals[mealIndex] = { ...meal, units: (meal.units) - 1 };

    setCartItems([...meals]);

    localStorage.setItem('cartItems', JSON.stringify(cartItems));
  };

  const handleScroll = (ref) => {
    window.scrollTo({
      top: ref.current.offsetTop,
      left: 0,
      behavior: 'smooth',
    });
  };

  if (modalOpen) {
    document.body.classList.add('active-modal');
  } else {
    document.body.classList.remove('active-modal');
  }

  return (
    <section className="cart-s">
      {modalOpen &&
        <RemoveModal
          setModalOpen={setModalOpen}
          modalOpen={modalOpen}
          item={item}
        />}
      {cartItems.length != 0 ?
        <div className="cart">
          <div className="cart-items">
            <article className="atc">
              <header>
                <h2>Cart ({cartItems.length})</h2>
              </header>
              {cartItems.map((item, i) => {
                return (
                  <article className="content" key={i}>
                    <div className="c-tnt">
                      <div className="order-image">
                        <img src={item.imageUrl} alt="" className="img" />
                      </div>
                      <div className="order-info">
                        <h3>{item.name}</h3>
                        <p className="desc">{item.description}</p>
                        <p className="category">
                          <span className="label">Category:</span>
                          {item.category}
                        </p>
                      </div>
                      <div className="prc-d ">
                        <div className="prc">
                          &#8358;{(item.price).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                        </div>
                      </div>
                    </div>
                    <footer className="ft">
                      <button
                        className="btn"
                        onClick={() => { setModalOpen(!modalOpen); setItem(item) }}>
                        <FontAwesomeIcon className="trash" icon={faTrashCan} />
                        Remove
                      </button>
                      <form action="" className="fm">
                        <button
                          className="btn-minus"
                          type="button"
                          disabled={item.units < 2}
                          onClick={(e) => decreaseUnits(e, item.id)}>
                          <FontAwesomeIcon className="ft-s" icon={faMinus} />
                        </button>
                        <span className="units">{item.units}</span>
                        <button
                          className="btn-plus"
                          type="button"
                          onClick={(e) => increaseUnits(e, item.id)}>
                          <FontAwesomeIcon className="ft-s" icon={faPlus} />
                        </button>
                      </form>
                    </footer>
                  </article>
                )
              })}
            </article>
            <div className="checkout">
              <div className="cnt">
                <article className="card">
                  <h1>
                    CART SUMMARY
                  </h1>
                  <div className="total">
                    <p className="ttl">Subtotal</p>
                    <p className="prc">
                      &#8358;{totalPrice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                    </p>
                  </div>
                  <p className="caution">Delivery fees are not included yet.</p>
                  <div className="ckt">
                    <Link to={token ? "/checkout" : "/sign-in"} className="btn">
                      Checkout (&#8358;{totalPrice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")})
                    </Link>
                  </div>
                </article>
              </div>
            </div>
          </div>
        </div>
        :
        <div className="empty-cart">
          <div className="c-empty">
            <div className="cart-icon" onClick={() => handleScroll(menuCartRef)}>
              <FontAwesomeIcon className="c-icon" icon={faCartPlus} />
            </div>
            <button className="btn"></button>
          </div>
        </div>
      }
    </section>
  )
}

Cart.propTypes = {
  menuCartRef: PropTypes.object.isRequired,
};

export default Cart

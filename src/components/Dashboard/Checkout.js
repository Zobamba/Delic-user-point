import React, { useState } from 'react';
import { PaystackButton } from 'react-paystack';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from '../../api/axios';
import Logo from '../../assets/img/delic-logo-2.png';
import './Checkout.scss';

const Checkout = () => {
  const publicKey = process.env.REACT_APP_PAYSTACK_PUBLIC_ID
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');

  const cartItems = JSON.parse(localStorage.getItem("cartItems") || '[]');

  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  let totalPrice = 0;

  cartItems.forEach((item) => {
    totalPrice = (item.price * item.units) + totalPrice;
  });

  const customFee = totalPrice / 8;
  const deliveryFee = totalPrice / 10;

  const total = (customFee + deliveryFee + totalPrice);
  const amount = (total * 100)// Remember, set in kobo!

  const createOrder = async (paymentReference) => {
    const meals = cartItems.map(item => { return { mealId: item.id, units: parseInt(item.units) } });

    const payload = { address, paymentReference, phoneNumber, meals, status: 'pending' };
    console.log(payload);

    try {
      const response = await axios.post('/orders',
        JSON.stringify(payload), {
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + localStorage.getItem('token'),
        },
        withCredentials: true
      }
      );

      console.log(JSON.stringify(response?.data));
      navigate(from, { replace: true });

      let keysToRemove = ["cartItems", "mealIds"];

      keysToRemove.forEach((k) => {
        localStorage.removeItem(k)
      });

    } catch (error) {
      console.log(error);
    }
  }

  const componentProps = {
    email,
    amount,
    metadata: {
      address,
      phoneNumber,
    },
    publicKey,
    text: "confirm Order",
    onSuccess: (response) => {
      console.log(response)
      createOrder(response.reference);
      alert("Payment successful")
    },
    onClose: () => alert("Wait! Are you sure you don't want to continue with this payment ?"),
  }

  return (
    <div className="checkout-container">
      <div className="ins">
        <div className="logo">
          <img src={Logo} alt="" height={150} width={150} />
        </div>
        <div className="item">
          <div className="details">
            <header>
              <h2>Delivery details</h2>
            </header>
            <div className="dtl">
              <div className="scroll">
                {cartItems.map((item, i) => {
                  return (
                    <article className="order-details" key={i}>
                      <div className="c-tnt">
                        <div className="order-image">
                          <img src={item.imageUrl} alt="" className="img" />
                        </div>
                        <div className="order-info">
                          <h3>{item.name}</h3>
                          <p className="caution">QTY: {item.units}</p>
                        </div>
                      </div>
                    </article>)
                })}
              </div>
            </div>
            <div className="item-details">
              <p className="item-details__title ttl">Items total</p>
              <p className="item-details__amount">
                &#8358;{totalPrice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
              </p>
            </div>
            <div className="item-details m-top">
              <p className="item-details__title">Delivery fee</p>
              <p className="item-details__amount">
                &#8358;{deliveryFee.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
              </p>
            </div>
            <div className="item-details m-top">
              <p className="item-details__title">Custom fee</p>
              <p className="item-details__amount">
                &#8358;{customFee.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
              </p>
            </div>
            <div className="item-details m-top">
              <p className="item-details__title bold">Total</p>
              <p className="item-details__amount bold">
                &#8358;{total.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
              </p>
            </div>
          </div>
        </div>
        <div className="checkout">
          <div className="details">
            <header>
              <h2>Personal details</h2>
            </header>
            <div className="checkout-form">
              <div className="checkout-field">
                <label>Email:</label>
                <input
                  type="email"
                  id="email"
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="checkout-field">
                <label>Address:</label>
                <input
                  type="text"
                  id="address"
                  onChange={(e) => setAddress(e.target.value)}
                />
              </div>
              <div className="checkout-field">
                <label>Phone:</label>
                <input
                  type="tel"
                  id="phone"
                  onChange={(e) => setPhoneNumber(e.target.value)}
                />
              </div>
              <PaystackButton className="paystack-button" {...componentProps} />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Checkout

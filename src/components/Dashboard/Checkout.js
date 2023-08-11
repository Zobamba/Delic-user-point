import React, { useState } from 'react';
import { PaystackButton } from 'react-paystack';
import './Checkout.scss';

const Checkout = () => {
  const publicKey = "pk_test_60678931b76d646c7d43eaf49836eea900480424"
  const amount = 1000000 // Remember, set in kobo!
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");

  const componentProps = {
    email,
    amount,
    metadata: {
      name,
      phone,
    },
    publicKey,
    text: "Pay Now",
    onSuccess: () =>
      alert("Thanks for doing business with us! Come back soon!!"),
    onClose: () => alert("Wait! You need this oil, don't go!!!!"),
  }

  return (
    <div className="checkout-container">
      <div className="item">
        <div className="overlay-effect"></div>
        <img
          className="item-image"
          src="https://images.unsplash.com/photo-1526947425960-945c6e72858f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2850&q=80"
          alt="product"
        />
        <div className="item-details">
          <p className="item-details__title">Coconut Oil</p>
          <p className="item-details__amount">NGN{amount / 100}</p>
        </div>
      </div>
      <div className="checkout">
        <div className="checkout-form">
          <div className="checkout-field">
            <label>Name</label>
            <input
              type="text"
              id="name"
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="checkout-field">
            <label>Email</label>
            <input
              type="text"
              id="email"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="checkout-field">
            <label>Phone</label>
            <input
              type="text"
              id="phone"
              onChange={(e) => setPhone(e.target.value)}
            />
          </div>
          <PaystackButton className="paystack-button" {...componentProps} />
        </div>
      </div>
    </div>
  )
}

export default Checkout

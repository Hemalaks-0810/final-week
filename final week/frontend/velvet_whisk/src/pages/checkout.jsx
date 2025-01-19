// src/pages/Checkout.jsx
import React, { useState } from 'react';
import './Checkout.css'; // Import CSS for styling
import axios from 'axios';

const Checkout = () => {
  const [name, setName] = useState('');
  const [contactNumber, setContactNumber] = useState('');
  const [address, setAddress] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('');
  const [cardNumber, setCardNumber] = useState('');
  const [expirationDate, setExpirationDate] = useState('');
  const [cvv, setCvv] = useState('');
  const [upiid, setupiid] = useState('');
  const [orderSuccess, setOrderSuccess] = useState(false);

  const handleCheckout = (event) => {
    event.preventDefault();
    const orderDetails = {
      name,
      contactNumber,
      address,
      paymentMethod,
      cardNumber,
      expirationDate,
      cvv,
      upiid,
    };
    axios.post('http://localhost:5000/api/orders', orderDetails)
      .then((response) => {
        console.log(response.data);
        setOrderSuccess(true);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <div className="checkout">
      <h2>Checkout</h2>
      <form onSubmit={handleCheckout}>
        <label>
          Name:
          <input type="text" value={name} onChange={(event) => setName(event.target.value)} />
        </label>
        <label>
          Contact Number:
          <input type="text" value={contactNumber} onChange={(event) => setContactNumber(event.target.value)} />
        </label>
        <label>
          Address:
          <input type="text" value={address} onChange={(event) => setAddress(event.target.value)} />
        </label>
        <label>
          Payment Method:
          <select value={paymentMethod} onChange={(event) => setPaymentMethod(event.target.value)}>
            <option value="">Select a payment method</option>
            <option value="cash-on-delivery">Cash on Delivery</option>
            <option value="credit-card">Credit Card</option>
            <option value="debit-card">Debit Card</option>
            <option value="net-banking">Net Banking</option>
          </select>
        </label>
        {paymentMethod === 'credit-card' || paymentMethod === 'debit-card' ? (
          <div>
            <label>
              Card Number:
              <input type="text" value={cardNumber} onChange={(event) => setCardNumber(event.target.value)} />
            </label>
            <label>
              Expiration Date:
              <input type="text" value={expirationDate} onChange={(event) => setExpirationDate(event.target.value)} />
            </label>
            <label>
              CVV:
              <input type="text" value={cvv} onChange={(event) => setCvv(event.target.value)} />
            </label>
          </div>
        ) : paymentMethod === 'net-banking' ? (
          <div>
            <label>
              UPI ID:
              <input type="text" value={upiid} onChange={(event) => setupiid(event.target.value)} />
            </label>
          </div>
        ) : null}
        <button type="submit">Place Order</button>
      </form>
      {orderSuccess && (
        <p>Order placed successfully!</p>
      )}
    </div>
  );
};

export default Checkout;
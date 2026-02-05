import React, { useState } from 'react';

const Checkout = () => {
  // Form ka data store karne ke liye state
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    billingAddress: ''
  });

  // Errors store karne ke liye state
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);

  // Validation Function
  const validateForm = () => {
    let newErrors = {};

    if (!formData.fullName.trim()) newErrors.fullName = "Naam likhna zaroori hai";
    
    // Email regex check
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(formData.email)) newErrors.email = "Sahi email address dalein";

    // Card number (Sirf 16 digits)
    if (!/^\d{16}$/.test(formData.cardNumber)) newErrors.cardNumber = "Card number 16 digits ka hona chahiye";

    // Expiry date (MM/YY format)
    if (!/^(0[1-9]|1[0-2])\/\d{2}$/.test(formData.expiryDate)) newErrors.expiryDate = "Format MM/YY rakhein (e.g. 12/25)";

    // CVV (Sirf 3 digits)
    if (!/^\d{3}$/.test(formData.cvv)) newErrors.cvv = "CVV 3 digits ka hona chahiye";

    if (!formData.billingAddress.trim()) newErrors.billingAddress = "Billing address zaroori hai";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0; // Agar koi error nahi toh true
  };

  const handleInput = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      setSubmitted(true);
    }
  };

  if (submitted) {
    return (
      <div style={{ textAlign: 'center', marginTop: '100px', fontFamily: 'sans-serif' }}>
        <h1 style={{ color: '#2ecc71' }}>✅ Payment Successful!</h1>
        <p>Aapka order process ho raha hai.</p>
        <button onClick={() => setSubmitted(false)} style={{ padding: '10px 20px', cursor: 'pointer' }}>Naya Order Karein</button>
      </div>
    );
  }

  return (
    <div style={styles.container}>
      <h2 style={{ textAlign: 'center' }}>Payment Details</h2>
      <form onSubmit={handleSubmit}>
        
        <div style={styles.field}>
          <label>Full Name</label>
          <input type="text" name="fullName" onChange={handleInput} style={styles.input} />
          {errors.fullName && <span style={styles.error}>{errors.fullName}</span>}
        </div>

        <div style={styles.field}>
          <label>Email Address</label>
          <input type="email" name="email" onChange={handleInput} style={styles.input} />
          {errors.email && <span style={styles.error}>{errors.email}</span>}
        </div>

        <div style={styles.field}>
          <label>Card Number (16 Digits)</label>
          <input type="text" name="cardNumber" maxLength="16" onChange={handleInput} style={styles.input} placeholder="0000 0000 0000 0000" />
          {errors.cardNumber && <span style={styles.error}>{errors.cardNumber}</span>}
        </div>

        <div style={{ display: 'flex', gap: '15px' }}>
          <div style={{ flex: 1 }}>
            <label>Expiry (MM/YY)</label>
            <input type="text" name="expiryDate" maxLength="5" onChange={handleInput} style={styles.input} placeholder="MM/YY" />
            {errors.expiryDate && <span style={styles.error}>{errors.expiryDate}</span>}
          </div>
          <div style={{ flex: 1 }}>
            <label>CVV</label>
            <input type="password" name="cvv" maxLength="3" onChange={handleInput} style={styles.input} />
            {errors.cvv && <span style={styles.error}>{errors.cvv}</span>}
          </div>
        </div>

        <div style={styles.field}>
          <label>Billing Address</label>
          <textarea name="billingAddress" onChange={handleInput} style={{ ...styles.input, height: '60px' }} />
          {errors.billingAddress && <span style={styles.error}>{errors.billingAddress}</span>}
        </div>

        <button type="submit" style={styles.payBtn}>Pay Now</button>
      </form>
    </div>
  );
};

// Styling Object
const styles = {
  container: { maxWidth: '400px', margin: '50px auto', padding: '30px', border: '1px solid #ddd', borderRadius: '15px', backgroundColor: '#f9f9f9', fontFamily: 'Arial' },
  field: { marginBottom: '15px' },
  input: { width: '100%', padding: '10px', marginTop: '5px', borderRadius: '5px', border: '1px solid #ccc', boxSizing: 'border-box' },
  error: { color: 'red', fontSize: '12px', marginTop: '5px', display: 'block' },
  payBtn: { width: '100%', padding: '12px', backgroundColor: '#3498db', color: '#fff', border: 'none', borderRadius: '5px', fontSize: '16px', fontWeight: 'bold', cursor: 'pointer', marginTop: '10px' }
};

export default Checkout;
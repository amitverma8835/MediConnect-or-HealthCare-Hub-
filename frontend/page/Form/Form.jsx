import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Form.css';

function Form() {
  const location = useLocation();
  const navigate = useNavigate();
  const doctor = location.state?.doctor;

  const [formData, setFormData] = useState({
    patientName: '',
    contact: '',
    address: ''
  });

  const [lastActivity, setLastActivity] = useState(Date.now());
  const [currentTime, setCurrentTime] = useState(new Date().toLocaleTimeString());
  const [showPayment, setShowPayment] = useState(false);

  // Update current time every second
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date().toLocaleTimeString());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Inactivity timer
  useEffect(() => {
    const inactivityTimer = setInterval(() => {
      if (Date.now() - lastActivity > 60000) { // 1 minute inactivity
        navigate('/');
      }
    }, 1000);
    return () => clearInterval(inactivityTimer);
  }, [lastActivity, navigate]);

  const handleActivity = () => {
    setLastActivity(Date.now());
  };

  const handleChange = (e) => {
    handleActivity();
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    handleActivity();
    setShowPayment(true);
  };

  const handlePaymentComplete = async (success) => {
    if (success) {
      try {
        await axios.post('http://localhost:8000/api/book-doctor', {
          ...formData,
          doctorId: doctor?._id
        });
        alert('Appointment Booked Successfully!');
        setFormData({ patientName: '', contact: '', address: '' });
        navigate('/');
      } catch (err) {
        console.error(err);
        alert('Booking failed');
      }
    }
    setShowPayment(false);
  };

  return (
    <div className="form-page" onMouseMove={handleActivity} onClick={handleActivity}>
      <div className="form-container">
        <button className="back-btn" onClick={() => navigate(-1)}>
          &larr; Back
        </button>
        
        <div className="time-display">
          Current Time: {currentTime}
        </div>

        <h2 className="form-title">Book Appointment with</h2>
        <span className='dr-name'> {doctor?.name}</span>
        <h3 className="price-display">Consultation Fee: ₹{doctor?.charge}</h3>

        {!showPayment ? (
          <form className="glass-form" onSubmit={handleSubmit}>
            <div className="input-group">
              <input 
                type="text" 
                name="patientName" 
                value={formData.patientName} 
                onChange={handleChange} 
                placeholder="Your Full Name" 
                required 
              />
            </div>
            
            <div className="input-group">
              <input 
                type="tel" 
                name="contact" 
                value={formData.contact} 
                onChange={handleChange} 
                placeholder="Contact Number" 
                required 
              />
            </div>
            
            <div className="input-group">
              <textarea 
                name="address" 
                value={formData.address} 
                onChange={handleChange} 
                placeholder="Complete Address" 
                required 
              />
            </div>
            
            <button type="submit" className="submit-btn">
              Proceed to Payment
            </button>
          </form>
        ) : (
          <div className="payment-gateway">
            <h3>Payment Gateway</h3>
            <p>Amount to Pay: ₹{doctor?.charge}</p>
            
            <div className="payment-methods">
              <button className="payment-method" onClick={() => handlePaymentComplete(true)}>
                Credit/Debit Card
              </button>
              <button className="payment-method" onClick={() => handlePaymentComplete(true)}>
                UPI Payment
              </button>
              <button className="payment-method" onClick={() => handlePaymentComplete(true)}>
                Net Banking
              </button>
            </div>
            
            <button className="cancel-btn" onClick={() => handlePaymentComplete(false)}>
              Cancel Payment
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default Form;
import React, { useState } from 'react';
import axios from 'axios';
import './AddDoctorForm.css';

function AddDoctorForm() {
  const [formData, setFormData] = useState({
    name: '',
    passion: '',
    age: '',
    charge: '',
    desc: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      await axios.post('http://localhost:8000/api/add-doctor', {
        ...formData,
        age: Number(formData.age),
        charge: Number(formData.charge)
      });

      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 2000);
      setFormData({
        name: '',
        passion: '',
        age: '',
        charge: '',
        desc: ''
      });
    } catch (err) {
      alert('Failed to add doctor: ' + (err.response?.data?.message || err.message));
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="form-container">
      <div className="form-card">
        <h2 className="form-title">
          <span className="form-icon">+</span>
          Add New Doctor
        </h2>
        
        <form onSubmit={handleSubmit}>
          <div className="form-grid">
            <div className="form-group">
              <label>Full Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                placeholder="Dr. John Smith"
              />
            </div>

            <div className="form-group">
              <label>Specialization</label>
              <input
                type="text"
                name="passion"
                value={formData.passion}
                onChange={handleChange}
                required
                placeholder="Cardiology"
              />
            </div>

            <div className="form-group">
              <label>Age</label>
              <input
                type="number"
                name="age"
                value={formData.age}
                onChange={handleChange}
                required
                min="25"
                max="80"
                placeholder="35"
              />
            </div>

            <div className="form-group">
              <label>Consultation Fee (₹)</label>
              <input
                type="number"
                name="charge"
                value={formData.charge}
                onChange={handleChange}
                required
                min="0"
                placeholder="500"
              />
            </div>
          </div>

          <div className="form-group">
            <label>Description</label>
            <textarea
              name="desc"
              value={formData.desc}
              onChange={handleChange}
              required
              placeholder="Brief about doctor's qualifications and experience"
              rows="3"
            />
          </div>

          <button type="submit" disabled={isSubmitting} className="submit-btn">
            {isSubmitting ? (
              <span className="spinner"></span>
            ) : (
              'Add Doctor'
            )}
          </button>
        </form>

        {showSuccess && (
          <div className="success-message">
            Doctor added successfully!
          </div>
        )}
      </div>
    </div>
  );
}

export default AddDoctorForm;
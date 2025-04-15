import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Doctors.css';
import { useNavigate } from 'react-router-dom';


function Doctors() {
  const [doctors, setDoctors] = useState([]);
  const [filteredDoctors, setFilteredDoctors] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  const navigate = useNavigate();

  const handleBookNow = (doctor) => {
    navigate('/book', { state: { doctor } });
  };


  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const res = await axios.get('http://localhost:8000/api/doctors');
        setDoctors(res.data);
        setFilteredDoctors(res.data);
      } catch (err) {
        console.error('Failed to fetch doctors:', err);
      }
    };

    fetchDoctors();
  }, []);

  useEffect(() => {
    const results = doctors.filter(doctor =>
      doctor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      doctor.passion.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredDoctors(results);
  }, [searchTerm, doctors]);

  return (
    <div className="page-container">
      <header className="glass-header">
        <h1 className="hospital-title">CREST CARE HOSPITAL</h1>
        <div className="search-container">
          <input
            type="text"
            placeholder="Search doctors by name or passion..."
            className="search-bar"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <svg className="search-icon" viewBox="0 0 24 24">
            <path d="M15.5 14h-.79l-.28-.27a6.5 6.5 0 0 0 1.48-5.34c-.47-2.78-2.79-5-5.59-5.34a6.505 6.505 0 0 0-7.27 7.27c.34 2.8 2.56 5.12 5.34 5.59a6.5 6.5 0 0 0 5.34-1.48l.27.28v.79l4.25 4.25c.41.41 1.08.41 1.49 0 .41-.41.41-1.08 0-1.49L15.5 14zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"/>
          </svg>
        </div>
      </header>

      <main className="main-content">
        <h2 className="section-title">Our Specialist Doctors</h2>
        
        {filteredDoctors.length === 0 ? (
          <div className="no-results">
            <p>No doctors found matching your search.</p>
          </div>
        ) : (
          <div className="doctors-grid">
            {filteredDoctors.map((doctor, idx) => (
              <div key={idx} className="doctor-card">
                <div className="card-header">
                  <h3 className="doctor-name">{doctor.name}</h3>
                  <p className="doctor-passion">{doctor.passion}</p>
                </div>
                
                <div className="doctor-details">
                  <div className="detail-row">
                    <span className="detail-label">Age:</span>
                    <span className="detail-value">{doctor.age}</span>
                  </div>
                  
                  <div className="detail-row description">
                    <span className="detail-label">Description:</span>
                    <p className="detail-value">{doctor.desc}</p>
                  </div>
                  
                  <div className="detail-row">
                    <span className="detail-label">Charge:</span>
                    <span className="detail-value">₹{doctor.charge}</span>
                  </div>
                </div>
                
                <button className="book-btn" onClick={() => handleBookNow(doctor)}>Book now</button>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}

export default Doctors;
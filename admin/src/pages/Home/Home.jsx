import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Home.css';

function Home() {
  const navigate = useNavigate();

  return (
    <div className="hospital-dashboard">
      <header className="hospital-header">
        <h1>Crest Care Hospital</h1>
        <p>Quality Healthcare Services</p>
      </header>

      <div className="dashboard-buttons">
      <button 
          className="upload-doctor-btn"
          onClick={() => navigate('/upload-doctors')}
        >
          Upload Doctors
        </button>
        <button 
          className="update-doctor-btn"
          onClick={() => navigate('/update-doctors')}
        >
          Update Doctors
        </button>
        
        <button 
          className="delete-doctor-btn"
          onClick={() => navigate('/delete-doctor')}
        >
          Delete Doctor
        </button>
        
        <button 
          className="booked-patient-btn"
          onClick={() => navigate('/booked-patients')}
        >
          Booked Patients
        </button>
      </div>
    </div>
  );
}

export default Home;
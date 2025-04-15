import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function DeleteDoctor() {
    const [doctors, setDoctors] = useState([]);
    const [selectedDoctor, setSelectedDoctor] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(false);
    const navigate = useNavigate();

    // Fetch all doctors for dropdown
    useEffect(() => {
        const fetchDoctors = async () => {
            try {
                const response = await axios.get('http://localhost:8000/api/doctors');
                setDoctors(response.data);
                setLoading(false);
            } catch (err) {
                console.error('Error fetching doctors:', err);
                setError('Failed to load doctors');
                setLoading(false);
            }
        };
        fetchDoctors();
    }, []);

    // Handle doctor selection
    const handleDoctorSelect = (doctorId) => {
        const doctor = doctors.find(d => d._id === doctorId);
        setSelectedDoctor(doctor || null);
    };

    // Handle doctor deletion
    const handleDelete = async () => {
        if (!selectedDoctor) return;
        
        if (!window.confirm(`Are you sure you want to delete ${selectedDoctor.name}?`)) {
            return;
        }

        try {
            await axios.delete(`http://localhost:8000/api/doctors/${selectedDoctor._id}`);
            setSuccess(true);
            // Refresh doctor list after 1.5 seconds
            setTimeout(() => {
                navigate(0); // Refresh the page
            }, 1500);
        } catch (err) {
            console.error('Error deleting doctor:', err);
            setError('Failed to delete doctor');
        }
    };

    return (
        <div className="delete-doctor-container">
            <div className="header">
                <h1>Delete Doctor</h1>
                <p className="subtitle">Select a doctor to remove from the system</p>
            </div>
            
            <div className="selection-card">
                <div className="doctor-select">
                    <label className="select-label">Select Doctor</label>
                    {loading ? (
                        <div className="loading-spinner"></div>
                    ) : error ? (
                        <p className="error-message">{error}</p>
                    ) : (
                        <div className="select-wrapper">
                            <select 
                                onChange={(e) => handleDoctorSelect(e.target.value)}
                                value={selectedDoctor?._id || ''}
                                className="doctor-dropdown"
                            >
                                <option value="">-- Select a Doctor --</option>
                                {doctors.map(doctor => (
                                    <option key={doctor._id} value={doctor._id}>
                                        {doctor.name} - {doctor.passion}
                                    </option>
                                ))}
                            </select>
                            <span className="dropdown-icon">▼</span>
                        </div>
                    )}
                </div>
            </div>

            {selectedDoctor && (
                <div className="doctor-details-card">
                    {success && (
                        <div className="success-message">
                            ✓ Doctor deleted successfully! Refreshing...
                        </div>
                    )}
                    {error && (
                        <div className="error-message">
                            ⚠ {error}
                        </div>
                    )}
                    
                    <div className="details-grid">
                        <div className="detail-item">
                            <span className="detail-label">Name:</span>
                            <span className="detail-value">{selectedDoctor.name}</span>
                        </div>
                        <div className="detail-item">
                            <span className="detail-label">Specialization:</span>
                            <span className="detail-value">{selectedDoctor.passion}</span>
                        </div>
                        <div className="detail-item">
                            <span className="detail-label">Age:</span>
                            <span className="detail-value">{selectedDoctor.age}</span>
                        </div>
                        <div className="detail-item">
                            <span className="detail-label">Consultation Fee:</span>
                            <span className="detail-value">${selectedDoctor.charge}</span>
                        </div>
                        <div className="detail-item full-width">
                            <span className="detail-label">Description:</span>
                            <span className="detail-value">{selectedDoctor.desc}</span>
                        </div>
                    </div>

                    <button 
                        onClick={handleDelete}
                        className="delete-button"
                        disabled={!selectedDoctor}
                    >
                        Delete Doctor
                    </button>
                </div>
            )}

            <style jsx>{`
                .delete-doctor-container {
                    max-width: 900px;
                    margin: 2rem auto;
                    padding: 0 1rem;
                }
                
                .header {
                    text-align: center;
                    margin-bottom: 2rem;
                }
                
                .header h1 {
                    font-size: 2rem;
                    color: #e63946;
                    margin-bottom: 0.5rem;
                    font-weight: 600;
                }
                
                .subtitle {
                    color: #6c757d;
                    font-size: 1rem;
                }
                
                .selection-card, .doctor-details-card {
                    background: #ffffff;
                    border-radius: 12px;
                    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
                    padding: 1.5rem;
                    margin-bottom: 1.5rem;
                }
                
                .doctor-select {
                    margin-bottom: 1rem;
                }
                
                .select-label {
                    display: block;
                    margin-bottom: 0.5rem;
                    font-weight: 500;
                    color: #2b2d42;
                }
                
                .select-wrapper {
                    position: relative;
                }
                
                .doctor-dropdown {
                    width: 100%;
                    padding: 0.75rem 1rem;
                    border: 1px solid #e9ecef;
                    border-radius: 8px;
                    font-size: 1rem;
                    appearance: none;
                    background-color: white;
                    cursor: pointer;
                }
                
                .dropdown-icon {
                    position: absolute;
                    right: 1rem;
                    top: 50%;
                    transform: translateY(-50%);
                    pointer-events: none;
                    color: #8d99ae;
                    font-size: 0.8rem;
                }
                
                .details-grid {
                    display: grid;
                    grid-template-columns: 1fr 1fr;
                    gap: 1rem;
                    margin-bottom: 1.5rem;
                }
                
                .detail-item {
                    margin-bottom: 1rem;
                }
                
                .detail-item.full-width {
                    grid-column: span 2;
                }
                
                .detail-label {
                    font-weight: 500;
                    color: #2b2d42;
                    display: block;
                    margin-bottom: 0.25rem;
                }
                
                .detail-value {
                    color: #4a4e69;
                    background: #f8f9fa;
                    padding: 0.5rem;
                    border-radius: 4px;
                    display: inline-block;
                    width: 100%;
                }
                
                .delete-button {
                    background-color: #e63946;
                    color: white;
                    padding: 0.75rem 1.5rem;
                    border: none;
                    border-radius: 8px;
                    font-size: 1rem;
                    font-weight: 500;
                    cursor: pointer;
                    width: 100%;
                    transition: all 0.3s;
                }
                
                .delete-button:hover {
                    background-color: #d90429;
                }
                
                .delete-button:disabled {
                    background-color: #adb5bd;
                    cursor: not-allowed;
                }
                
                .loading-spinner {
                    border: 3px solid rgba(0, 0, 0, 0.1);
                    border-radius: 50%;
                    border-top: 3px solid #e63946;
                    width: 20px;
                    height: 20px;
                    animation: spin 1s linear infinite;
                    margin: 0 auto;
                }
                
                @keyframes spin {
                    0% { transform: rotate(0deg); }
                    100% { transform: rotate(360deg); }
                }
                
                .success-message {
                    background-color: rgba(40, 167, 69, 0.1);
                    color: #28a745;
                    padding: 0.75rem 1rem;
                    border-radius: 8px;
                    margin-bottom: 1.5rem;
                    display: flex;
                    align-items: center;
                    gap: 0.5rem;
                }
                
                .error-message {
                    background-color: rgba(220, 53, 69, 0.1);
                    color: #dc3545;
                    padding: 0.75rem 1rem;
                    border-radius: 8px;
                    margin-bottom: 1.5rem;
                    display: flex;
                    align-items: center;
                    gap: 0.5rem;
                }
                
                @media (max-width: 768px) {
                    .details-grid {
                        grid-template-columns: 1fr;
                    }
                    
                    .detail-item.full-width {
                        grid-column: span 1;
                    }
                    
                    .header h1 {
                        font-size: 1.5rem;
                    }
                }
            `}</style>
        </div>
    );
}

export default DeleteDoctor;
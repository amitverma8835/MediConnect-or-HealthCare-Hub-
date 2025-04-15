import React, { useState, useEffect } from 'react';
import axios from 'axios';

function UpdateDoctor() {
    const [doctors, setDoctors] = useState([]);
    const [selectedDoctor, setSelectedDoctor] = useState(null);
    const [formData, setFormData] = useState({
        name: '',
        passion: '',
        age: '',
        charge: '',
        desc: ''
    });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(false);

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

    // Fetch doctor details when selected
    const handleDoctorSelect = async (doctorId) => {
        if (!doctorId) {
            setSelectedDoctor(null);
            return;
        }
        try {
            const response = await axios.get(`http://localhost:8000/api/doctors/${doctorId}`);
            setSelectedDoctor(response.data);
            setFormData({
                name: response.data.name,
                passion: response.data.passion,
                age: response.data.age,
                charge: response.data.charge,
                desc: response.data.desc
            });
            setSuccess(false);
        } catch (err) {
            console.error('Error fetching doctor details:', err);
            setError('Failed to load doctor details');
        }
    };

    // Handle form input changes
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.put(
                `http://localhost:8000/api/update-doctor/${selectedDoctor._id}`,
                formData
            );
            setSuccess(true);
            // Refresh data after 1.5 seconds
            setTimeout(() => {
                window.location.reload();
            }, 1500);
        } catch (err) {
            console.error('Error updating doctor:', err);
            setError('Failed to update doctor');
        }
    };

    return (
        <div className="update-doctor-container">
            <div className="header">
                <h1>Update Doctor Profile</h1>
                <p className="subtitle">Select a doctor and update their information</p>
            </div>
            
            {/* Doctor Selection Dropdown */}
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
                                        {doctor.name}
                                    </option>
                                ))}
                            </select>
                            <span className="dropdown-icon">▼</span>
                        </div>
                    )}
                </div>
            </div>

            {/* Update Form (only shows when doctor is selected) */}
            {selectedDoctor && (
                <div className="form-card">
                    {success && (
                        <div className="success-message">
                            ✓ Doctor updated successfully! Refreshing...
                        </div>
                    )}
                    {error && (
                        <div className="error-message">
                            ⚠ {error}
                        </div>
                    )}
                    <form onSubmit={handleSubmit} className="doctor-form">
                        <div className="form-grid">
                            <div className="form-group">
                                <label>Full Name</label>
                                <input
                                    type="text"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleInputChange}
                                    required
                                    className="form-input"
                                />
                            </div>
                            <div className="form-group">
                                <label>Specialization</label>
                                <input
                                    type="text"
                                    name="passion"
                                    value={formData.passion}
                                    onChange={handleInputChange}
                                    required
                                    className="form-input"
                                />
                            </div>
                            <div className="form-group">
                                <label>Age</label>
                                <input
                                    type="number"
                                    name="age"
                                    value={formData.age}
                                    onChange={handleInputChange}
                                    required
                                    min="25"
                                    className="form-input"
                                />
                            </div>
                            <div className="form-group">
                                <label>Consultation Fee ($)</label>
                                <input
                                    type="number"
                                    name="charge"
                                    value={formData.charge}
                                    onChange={handleInputChange}
                                    required
                                    min="0"
                                    className="form-input"
                                />
                            </div>
                        </div>
                        <div className="form-group">
                            <label>Professional Description</label>
                            <textarea
                                name="desc"
                                value={formData.desc}
                                onChange={handleInputChange}
                                rows="4"
                                required
                                className="form-textarea"
                            />
                        </div>
                        <button type="submit" className="update-button">
                            Update Profile
                        </button>
                    </form>
                </div>
            )}

            <style jsx>{`
                :root {
                    --primary: #4361ee;
                    --primary-light: #4895ef;
                    --success: #4cc9f0;
                    --error: #f72585;
                    --text: #2b2d42;
                    --text-light: #8d99ae;
                    --background: #f8f9fa;
                    --card-bg: #ffffff;
                    --border: #e9ecef;
                }
                
                * {
                    box-sizing: border-box;
                    margin: 0;
                    padding: 0;
                }
                
                body {
                    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
                    color: var(--text);
                    background-color: var(--background);
                    line-height: 1.6;
                }
                
                .update-doctor-container {
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
                    color: var(--primary);
                    margin-bottom: 0.5rem;
                    font-weight: 600;
                }
                
                .subtitle {
                    color: var(--text-light);
                    font-size: 1rem;
                }
                
                .selection-card, .form-card {
                    background: var(--card-bg);
                    border-radius: 12px;
                    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
                    padding: 1.5rem;
                    margin-bottom: 1.5rem;
                    transition: all 0.3s ease;
                }
                
                .form-card {
                    animation: fadeIn 0.5s ease;
                }
                
                @keyframes fadeIn {
                    from { opacity: 0; transform: translateY(10px); }
                    to { opacity: 1; transform: translateY(0); }
                }
                
                .doctor-select {
                    margin-bottom: 1rem;
                }
                
                .select-label {
                    display: block;
                    margin-bottom: 0.5rem;
                    font-weight: 500;
                    color: var(--text);
                }
                
                .select-wrapper {
                    position: relative;
                }
                
                .doctor-dropdown {
                    width: 100%;
                    padding: 0.75rem 1rem;
                    border: 1px solid var(--border);
                    border-radius: 8px;
                    font-size: 1rem;
                    appearance: none;
                    background-color: white;
                    cursor: pointer;
                    transition: border-color 0.3s;
                }
                
                .doctor-dropdown:focus {
                    outline: none;
                    border-color: var(--primary);
                    box-shadow: 0 0 0 2px rgba(67, 97, 238, 0.2);
                }
                
                .dropdown-icon {
                    position: absolute;
                    right: 1rem;
                    top: 50%;
                    transform: translateY(-50%);
                    pointer-events: none;
                    color: var(--text-light);
                    font-size: 0.8rem;
                }
                
                .form-grid {
                    display: grid;
                    grid-template-columns: 1fr 1fr;
                    gap: 1.5rem;
                    margin-bottom: 1.5rem;
                }
                
                .form-group {
                    margin-bottom: 1.25rem;
                }
                
                .form-group label {
                    display: block;
                    margin-bottom: 0.5rem;
                    font-weight: 500;
                    color: var(--text);
                }
                
                .form-input, .form-textarea {
                    width: 100%;
                    padding: 0.75rem 1rem;
                    border: 1px solid var(--border);
                    border-radius: 8px;
                    font-size: 1rem;
                    transition: all 0.3s;
                }
                
                .form-input:focus, .form-textarea:focus {
                    outline: none;
                    border-color: var(--primary);
                    box-shadow: 0 0 0 2px rgba(67, 97, 238, 0.2);
                }
                
                .form-textarea {
                    min-height: 120px;
                    resize: vertical;
                }
                
                .update-button {
                    background-color: var(--primary);
                    color: white;
                    padding: 0.75rem 1.5rem;
                    border: none;
                    border-radius: 8px;
                    font-size: 1rem;
                    font-weight: 500;
                    cursor: pointer;
                    transition: all 0.3s;
                    width: 100%;
                    margin-top: 0.5rem;
                }
                
                .update-button:hover {
                    background-color: var(--primary-light);
                    transform: translateY(-1px);
                    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
                }
                
                .update-button:active {
                    transform: translateY(0);
                }
                
                .loading-spinner {
                    border: 3px solid rgba(0, 0, 0, 0.1);
                    border-radius: 50%;
                    border-top: 3px solid var(--primary);
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
                    background-color: rgba(76, 201, 240, 0.1);
                    color: var(--success);
                    padding: 0.75rem 1rem;
                    border-radius: 8px;
                    margin-bottom: 1.5rem;
                    display: flex;
                    align-items: center;
                    gap: 0.5rem;
                }
                
                .error-message {
                    background-color: rgba(247, 37, 133, 0.1);
                    color: var(--error);
                    padding: 0.75rem 1rem;
                    border-radius: 8px;
                    margin-bottom: 1.5rem;
                    display: flex;
                    align-items: center;
                    gap: 0.5rem;
                }
                
                @media (max-width: 768px) {
                    .form-grid {
                        grid-template-columns: 1fr;
                    }
                    
                    .header h1 {
                        font-size: 1.5rem;
                    }
                }
            `}</style>
        </div>
    );
}

export default UpdateDoctor;
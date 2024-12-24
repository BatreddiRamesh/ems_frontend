import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const EventRegistration = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [formData, setFormData] = useState({
    clientName: '', clientEmail: '', eventId: id
  });

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Handle form submission for Create (POST)
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:5000/api/events/register", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json', // Set content type to JSON
        },
        body: JSON.stringify(formData), // Send form data as request body
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`);
      }

      const data = await response.json();

      // Redirect to confirmation page with booking info
      navigate('/booking-confirm', {
        state: {
          clientName: formData.clientName,
          clientEmail: formData.clientEmail,
          eventId: formData.eventId,
        }
      });

      // Optionally clear the form after submission
      setFormData({
        clientName: '',
        clientEmail: '',
        eventId: id,
      });

    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit} style={formStyles}>
      <div style={inputGroupStyles}>
        <label htmlFor="clientName">Client Name</label>
        <input
          type="text"
          name="clientName"
          value={formData.clientName}
          onChange={handleChange}
          required
          style={inputStyles}
        />
      </div>
      <div style={inputGroupStyles}>
        <label htmlFor="clientEmail">Client Email</label>
        <input
          type="email"
          name="clientEmail"
          value={formData.clientEmail}
          onChange={handleChange}
          required
          style={inputStyles}
        />
      </div>

      <button type="submit" style={buttonStyles}>
         Event Register
      </button>
    </form>
  );
};

// Inline styles for the form and inputs
const formStyles = {
  maxWidth: '600px',
  margin: '0 auto',
  padding: '20px',
  borderRadius: '8px',
  boxShadow: '0 4px 15px rgba(0, 0, 0, 0.1)',
  backgroundColor: '#f7f7f7', // Light gray background
  fontFamily: "'Roboto', sans-serif",
  color: '#333',
};

const inputGroupStyles = {
  marginBottom: '15px',
};

const inputStyles = {
  width: '100%',
  padding: '12px',
  fontSize: '16px',
  borderRadius: '5px',
  border: '1px solid #ccc',
  marginTop: '5px',
  transition: 'border-color 0.3s ease',
};

const buttonStyles = {
  padding: '12px 20px',
  fontSize: '16px',
  backgroundColor: '#007bff', // Vibrant blue background
  color: '#fff',
  border: 'none',
  borderRadius: '5px',
  cursor: 'pointer',
  transition: 'background-color 0.3s ease',
};

buttonStyles[':hover'] = {
  backgroundColor: '#0056b3', // Darker blue on hover
};

export default EventRegistration;

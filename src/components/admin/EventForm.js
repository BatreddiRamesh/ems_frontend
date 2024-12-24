import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const EventForm = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const initialData = location.state?.event;
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    date: '',
    location: '',
    price: '',
    seats: '',
    category: '',
  });

  const [isEditing, setIsEditing] = useState(false);

  // Set form data if editing an event
  useEffect(() => {
    if (initialData) {
      setFormData({
        title: initialData.title,
        description: initialData.description,
        date: initialData.date,
        location: initialData.location,
        price: initialData.price,
        seats: initialData.seats,
        category: initialData.category,
      });
      setIsEditing(true); // Mark as editing
    }
  }, [initialData]);

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Handle form submission for Create (POST) and Edit (PUT) requests
  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token'); // Get the token from localStorage

    const url = isEditing
      ? `http://localhost:5000/api/events/${initialData._id}` // Use the event ID for editing
      : 'http://localhost:5000/api/events'; // For creating a new event

    const method = isEditing ? 'PUT' : 'POST'; // Use PUT for editing, POST for creating

    try {
      const response = await fetch(url, {
        method,
        headers: {
          Authorization: `${token}`, // Add Bearer token
          'Content-Type': 'application/json', // Set content type to JSON
        },
        body: JSON.stringify(formData), // Send form data as request body
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`);
      }

      const data = await response.json();
      navigate('/admin-dashboard');

      // Optionally clear the form after submission
      setFormData({
        title: '',
        description: '',
        date: '',
        location: '',
        price: '',
        seats: '',
        category: '',
      });
      setIsEditing(false); // Reset editing mode after submission
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };

  // Inline styles for the enhanced UI
  const pageStyles = {
    minHeight: '100vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    background: 'radial-gradient(circle, #84fab0, #8fd3f4)', // Blue-green gradient
    padding: '20px',
  };

  const formStyles = {
    maxWidth: '600px',
    margin: '20px auto',
    padding: '30px',
    borderRadius: '10px',
    boxShadow: '0 10px 20px rgba(0, 0, 0, 0.2)',
    background: 'linear-gradient(135deg, #f6d365, #fda085)', // Gradient background
    fontFamily: "'Roboto', sans-serif",
    color: '#fff',
  };

  const inputGroupStyles = {
    marginBottom: '20px',
  };

  const inputStyles = {
    width: '100%',
    padding: '12px',
    fontSize: '16px',
    borderRadius: '8px',
    border: '1px solid rgba(255, 255, 255, 0.6)',
    marginTop: '5px',
    background: 'rgba(255, 255, 255, 0.2)', // Translucent background
    color: '#fff',
    transition: 'border-color 0.3s ease, box-shadow 0.3s ease',
  };

  const buttonStyles = {
    padding: '12px 20px',
    fontSize: '16px',
    backgroundColor: '#ff6b6b', // Vibrant red button
    color: '#fff',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
    transition: 'background-color 0.3s ease, transform 0.2s ease',
  };

  return (
    <div style={pageStyles}>
      <form onSubmit={handleSubmit} style={formStyles}>
        <h2 style={{ textAlign: 'center', marginBottom: '20px' }}>
          {isEditing ? 'Edit Event' : 'Create Event'}
        </h2>
        <div style={inputGroupStyles}>
          <label htmlFor="title">Title</label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
            style={inputStyles}
          />
        </div>

        <div style={inputGroupStyles}>
          <label htmlFor="category">Category</label>
          <select
            name="category"
            value={formData.category}
            onChange={handleChange}
            required
            style={inputStyles}
          >
            <option value="">Select Category</option>
            <option value="conference">Conference</option>
            <option value="workshop">Workshop</option>
            <option value="webinar">Webinar</option>
            <option value="meetup">Meetup</option>
          </select>
        </div>

        <div style={inputGroupStyles}>
          <label htmlFor="description">Description</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            rows="4"
            required
            style={inputStyles}
          />
        </div>

        <div style={inputGroupStyles}>
          <label htmlFor="date">Date</label>
          <input
            type="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            required
            style={inputStyles}
          />
        </div>

        <div style={inputGroupStyles}>
          <label htmlFor="location">Location</label>
          <input
            type="text"
            name="location"
            value={formData.location}
            onChange={handleChange}
            required
            style={inputStyles}
          />
        </div>

        <div style={inputGroupStyles}>
          <label htmlFor="price">Price</label>
          <input
            type="number"
            name="price"
            value={formData.price}
            onChange={handleChange}
            required
            style={inputStyles}
          />
        </div>

        <div style={inputGroupStyles}>
          <label htmlFor="seats">Seats</label>
          <input
            type="number"
            name="seats"
            value={formData.seats}
            onChange={handleChange}
            required
            style={inputStyles}
          />
        </div>

        <button type="submit" style={buttonStyles}>
          {isEditing ? 'Update Event' : 'Create Event'}
        </button>
      </form>
    </div>
  );
};

export default EventForm;
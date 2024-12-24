import React from 'react';
import { useLocation } from 'react-router-dom';

const BookingConfirm = () => {
  const { state } = useLocation();

  // Extract the booking details from the state
  const { clientName, clientEmail, eventId } = state || {};

  return (
    <div style={confirmationStyles}>
      <h2>Booking Confirmation</h2>
      <p>Thank you for your registration!</p>
      <div style={confirmationDetailsStyles}>
        <p><strong>Client Name:</strong> {clientName}</p>
        <p><strong>Client Email:</strong> {clientEmail}</p>
        <p><strong>Event ID:</strong> {eventId}</p>
      </div>
      <button onClick={() => window.location.href = '/'} style={backButtonStyles}>
        Back to Home
      </button>
    </div>
  );
};

// Styles for the confirmation screen
const confirmationStyles = {
  padding: '20px',
  maxWidth: '600px',
  margin: '0 auto',
  backgroundColor: '#f7f7f7',
  borderRadius: '8px',
  boxShadow: '0 4px 15px rgba(0, 0, 0, 0.1)',
  textAlign: 'center',
};

const confirmationDetailsStyles = {
  marginTop: '20px',
  fontSize: '18px',
};

const backButtonStyles = {
  padding: '10px 20px',
  fontSize: '16px',
  backgroundColor: '#007bff',
  color: '#fff',
  border: 'none',
  borderRadius: '5px',
  cursor: 'pointer',
  transition: 'background-color 0.3s ease',
};

backButtonStyles[':hover'] = {
  backgroundColor: '#0056b3',
};

export default BookingConfirm;

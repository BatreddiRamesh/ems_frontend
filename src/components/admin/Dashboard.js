import React, { useEffect, useState } from 'react';
import EventTable from './EventTable';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const [events, setEvents] = useState([]);
  const navigate = useNavigate();

  // Fetch events from the API
  const fetchEvents = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch('http://localhost:5000/api/events', {
        method: 'GET',
        headers: {
          Authorization: `${token}`,  // Add Bearer token
          'Content-Type': 'application/json',
        },
      });
      if (response.ok) {
        const data = await response.json();
        setEvents(data);
      } else {
        console.error(`Error fetching events: ${response.statusText}`);
      }
    } catch (err) {
      console.error(err);
    }
  };

  // Delete event by ID with confirmation
  const handleDeleteEvent = async (eventId) => {
    const isConfirmed = window.confirm('Are you sure you want to delete this event?');
  
    if (!isConfirmed) {
      return;
    }

    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`http://localhost:5000/api/events/${eventId}`, {
        method: 'DELETE',
        headers: {
          Authorization: `${token}`,
          'Content-Type': 'application/json',
        },
      });
      if (response.ok) {
        fetchEvents();
      } else {
        console.error(`Error deleting event: ${response.statusText}`);
      }
    } catch (err) {
      console.error('Error deleting event:', err);
    }
  };

  // Logout function
  const handleLogout = () => {
    // Clear the token from localStorage
    localStorage.removeItem('token');
    // Redirect user to the login page
    navigate('/login');
  };

  // Fetch events when the component mounts
  useEffect(() => {
    fetchEvents();
  }, []);

  const styles = {
    container: {
      backgroundColor: '#f7f9fc',
      padding: '20px',
      borderRadius: '8px',
      boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
    },
    header: {
      fontSize: '28px',
      color: '#343a40',
      fontWeight: 'bold',
      marginBottom: '20px',
      textAlign: 'center',
    },
    createButton: {
      padding: '10px 20px',
      backgroundColor: '#007bff',
      color: '#fff',
      border: 'none',
      borderRadius: '4px',
      fontSize: '16px',
      cursor: 'pointer',
      display: 'block',
      margin: '20px auto',
      boxShadow: '0 4px 8px rgba(0, 123, 255, 0.2)',
    },
    logoutButton: {
      padding: '10px 20px',
      backgroundColor: '#dc3545',
      color: '#fff',
      border: 'none',
      borderRadius: '4px',
      fontSize: '16px',
      cursor: 'pointer',
      display: 'block',
      margin: '20px auto',
      boxShadow: '0 4px 8px rgba(220, 53, 69, 0.2)',
    },
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.header}>Admin Dashboard</h1>
      <button
        style={styles.createButton}
        onClick={() => navigate('/event-form')}
      >
        Create New Event
      </button>
      
      {/* Logout button */}
      <button
        style={styles.logoutButton}
        onClick={handleLogout}
      >
        Logout
      </button>

      <EventTable events={events} onDelete={handleDeleteEvent} />
    </div>
  );
};

export default Dashboard;

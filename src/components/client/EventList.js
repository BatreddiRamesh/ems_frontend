import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const styles = {
  tableContainer: {
    margin: '20px',
    borderRadius: '8px',
    overflow: 'hidden',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
    overflowX: 'auto',
  },
  table: {
    width: '100%',
    borderCollapse: 'collapse',
  },
  thead: {
    backgroundColor: '#007bff',
    color: '#fff',
  },
  th: {
    padding: '12px 15px',
    textAlign: 'left',
    fontWeight: 'bold',
    fontSize: '14px',
  },
  tbody: {
    backgroundColor: '#f8f9fa',
  },
  tr: {
    borderBottom: '1px solid #dee2e6',
  },
  td: {
    padding: '10px 15px',
    textAlign: 'left',
    fontSize: '14px',
    color: '#495057',
  },
  actionsCell: {
    display: 'flex',
    gap: '8px',
  },
  editButton: {
    backgroundColor: '#17a2b8',
    color: '#fff',
    border: 'none',
    padding: '6px 12px',
    borderRadius: '4px',
    cursor: 'pointer',
    fontWeight: 'bold',
  },
  deleteButton: {
    backgroundColor: '#dc3545',
    color: '#fff',
    border: 'none',
    padding: '6px 12px',
    borderRadius: '4px',
    cursor: 'pointer',
    fontWeight: 'bold',
  },
  loginButton: {
    backgroundColor: '#28a745',
    color: '#fff',
    border: 'none',
    padding: '10px 20px',
    borderRadius: '4px',
    cursor: 'pointer',
    fontWeight: 'bold',
    margin: '20px 0',
  },
  filterContainer: {
    display: 'flex',
    gap: '20px',
    marginBottom: '20px',
  },
  filterInput: {
    padding: '5px 10px',
    fontSize: '14px',
    borderRadius: '4px',
    border: '1px solid #ced4da',
  },
  resetButton: {
    backgroundColor: '#f8f9fa',
    color: '#007bff',
    border: '1px solid #007bff',
    padding: '6px 12px',
    borderRadius: '4px',
    cursor: 'pointer',
    fontWeight: 'bold',
  },
  selectMenu: {
    padding: '5px 10px',
    fontSize: '14px',
    borderRadius: '4px',
    border: '1px solid #ced4da',
  }
};

const EventList = () => {
  const navigate = useNavigate();
  const [events, setEvents] = useState([]);
  const [filters, setFilters] = useState({
    date: '',
    category: '',
    location: '',
  });

  const categories = [
    "conference", "workshop", "webinar", "meetup"
  ]; // Example categories for the select menu

  // Fetch events with filters applied
  const fetchEvents = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch('http://localhost:5000/api/events/public', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        let data = await response.json();

        // Apply filters on the data
        if (filters.date) {
          // Ensure the event date is in the same format as the input (YYYY-MM-DD)
          data = data.filter(event => {
            const eventDate = new Date(event.date).toLocaleDateString('en-CA'); // Format as YYYY-MM-DD
            return eventDate === filters.date;
          });
        }
        if (filters.category) {
          data = data.filter(event => event.category.toLowerCase().includes(filters.category.toLowerCase()));
        }
        if (filters.location) {
          data = data.filter(event => event.location.toLowerCase().includes(filters.location.toLowerCase()));
        }

        setEvents(data);
      } else {
        console.error(`Error fetching events: ${response.statusText}`);
      }
    } catch (err) {
      console.error(err);
    }
  };

  // Fetch events when the component mounts or filters change
  useEffect(() => {
    fetchEvents();
  }, [filters]);

  // Handle filter changes
  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prevFilters) => ({
      ...prevFilters,
      [name]: value,
    }));
  };

  // Reset filters to initial state
  const resetFilters = () => {
    setFilters({
      date: '',
      category: '',
      location: '',
    });
  };

  return (
    <div style={styles.tableContainer}>
      <button
        style={styles.loginButton}
        onClick={() => navigate('/admin-login')} // Redirect to login page
      >
        Admin Login
      </button>

      {/* Filters Section */}
      <div style={styles.filterContainer}>
        <input
          type="date"
          name="date"
          value={filters.date}
          onChange={handleFilterChange}
          style={styles.filterInput}
        />
        
        {/* Category Select Menu */}
        <select
          name="category"
          value={filters.category}
          onChange={handleFilterChange}
          style={styles.selectMenu}
        >
          <option value="">Select Category</option>
          {categories.map((category, index) => (
            <option key={index} value={category}>{category}</option>
          ))}
        </select>

        <input
          type="text"
          name="location"
          value={filters.location}
          onChange={handleFilterChange}
          placeholder="Location"
          style={styles.filterInput}
        />
        
        {/* Reset Filter Button */}
        <button
          style={styles.resetButton}
          onClick={resetFilters}
        >
          Reset Filters
        </button>
      </div>

      <table style={styles.table}>
        <thead style={styles.thead}>
          <tr>
            <th style={styles.th}>#</th>
            <th style={styles.th}>Title</th>
            <th style={styles.th}>Description</th>
            <th style={styles.th}>Date</th>
            <th style={styles.th}>Location</th>
            <th style={styles.th}>Price</th>
            <th style={styles.th}>Seats</th>
            <th style={styles.th}>Category</th>
            <th style={styles.th}>Actions</th>
          </tr>
        </thead>
        <tbody style={styles.tbody}>
          {events.map((event, index) => (
            <tr key={event._id} style={styles.tr}>
              <td style={styles.td}>{index + 1}</td>
              <td style={styles.td}>{event.title}</td>
              <td style={styles.td}>{event.description}</td>
              <td style={styles.td}>{new Date(event.date).toLocaleDateString()}</td>
              <td style={styles.td}>{event.location}</td>
              <td style={styles.td}>${event.price}</td>
              <td style={styles.td}>{event.seats}</td>
              <td style={styles.td}>{event.category}</td>
              <td style={{ ...styles.td, ...styles.actionsCell }}>
                <button
                  style={styles.editButton}
                  onClick={() => navigate(`/event-register/${event._id}`, { state: { event } })}
                >
                  Event Register
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default EventList;

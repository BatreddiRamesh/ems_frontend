import React from 'react';
import { useNavigate } from 'react-router-dom';

const styles = {
  tableContainer: {
    margin: '20px',
    borderRadius: '8px',
    overflow: 'hidden',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
    // Make the container scrollable on small screens
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
};

const EventTable = ({ events, onDelete }) => {
  const navigate = useNavigate();

  return (
    <div style={styles.tableContainer}>
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
                  onClick={() => navigate(`/event-form/${event._id}`, { state: { event } })}
                >
                  Edit
                </button>
                <button style={styles.deleteButton} onClick={() => onDelete(event._id)}>
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default EventTable;
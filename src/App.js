import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './components/admin/Login';
import ProtectedRoute from './components/ProtectedRoute';
import Dashboard from './components/admin/Dashboard';
import EventForm from './components/admin/EventForm';
import EventList from './components/client/EventList';
import EventRegistration from './components/client/EventRegistration';
import BookingConfirm from './components/client/BookingConfirm';

const App = () => {
  return (
    <Router>
      <Routes>
        {/* Public Route */}
        <Route path="/admin-login" element={<Login />} />

        {/* Protected Routes */}
        <Route
          path="/admin-dashboard"
          element={<ProtectedRoute element={<Dashboard />} />}
        />
        <Route
          path="/event-form"
          element={<ProtectedRoute element={<EventForm />} />}
        />
        <Route
          path="/event-form/:id"
          element={<ProtectedRoute element={<EventForm />} />}
        />

        {/* Default Route */}
        <Route path="/" element={<EventList />} />
        <Route path="/event-register/:id" element={<EventRegistration/>} />
        <Route path="/booking-confirm" element={<BookingConfirm />} />
        {/* Redirect if the route doesn't match */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
};

export default App;
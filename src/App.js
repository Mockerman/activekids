// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Register from './components/Auth/Register';
import Login from './components/Auth/Login';
import MainDashboard from './components/Dashboard/MainDashboard';
import ProfileDashboard from './components/Dashboard/ProfileDashboard';
import ClubDashboard from './components/Dashboard/ClubDashboard';
import ActivityPage from './components/Activity/ActivityPage';
import Carpool from './components/Activity/Carpool';



function App() {
  const token = localStorage.getItem('token');

  return (
    <Router>
      <Routes>
        <Route path="/" element={token ? <Navigate to="/dashboard" /> : <Navigate to="/login" />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={token ? <MainDashboard /> : <Navigate to="/login" />} />
        <Route path="/profile" element={token ? <ProfileDashboard /> : <Navigate to="/login" />} />
        <Route path="/club" element={token ? <ClubDashboard /> : <Navigate to="/login" />} />
        <Route path="/activity/:id" element={token ? <ActivityPage /> : <Navigate to="/login" />} />
        <Route path="/activity/:id/carpools" element={token ? <Carpool /> : <Navigate to="/login" />} />
      </Routes>
    </Router>
  );
}

export default App;

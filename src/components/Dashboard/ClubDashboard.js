// src/components/Dashboard/ClubDashboard.js
import React, { useState, useEffect } from 'react';
import API from '../../services/api';

const ClubDashboard = () => {
  const [clubs, setClubs] = useState([]);

  useEffect(() => {
    const fetchClubs = async () => {
      const res = await API.get('/club');
      setClubs(res.data);
    };

    fetchClubs();
  }, []);

  return (
    <div>
      <h2>Vereine verwalten</h2>
      <ul>
        {clubs.map((club) => (
          <li key={club._id}>{club.name}</li>
        ))}
      </ul>
      <button>Neuen Verein hinzufügen</button>
    </div>
  );
};

export default ClubDashboard;

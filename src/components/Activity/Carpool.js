// src/components/Activity/Carpool.js
import React, { useState, useEffect } from 'react';
import API from '../../services/api';

const Carpool = ({ activityId }) => {
  const [carpools, setCarpools] = useState([]);
  const [newCarpool, setNewCarpool] = useState({
    driver: '',
    seatsAvailable: 0,
  });

  useEffect(() => {
    const fetchCarpools = async () => {
      const res = await API.get(`/activity/${activityId}/carpools`);
      setCarpools(res.data);
    };

    fetchCarpools();
  }, [activityId]);

  const handleInputChange = (e) => {
    setNewCarpool({
      ...newCarpool,
      [e.target.name]: e.target.value,
    });
  };

  const handleCreateCarpool = async () => {
    try {
      const res = await API.post(`/activity/${activityId}/carpool`, newCarpool);
      setCarpools([...carpools, res.data]);
      setNewCarpool({ driver: '', seatsAvailable: 0 });
    } catch (error) {
      console.error('Error creating carpool:', error);
    }
  };

  return (
    <div>
      <h3>Fahrgemeinschaften für diese Aktivität</h3>
      <ul>
        {carpools.map((carpool) => (
          <li key={carpool._id}>
            Fahrer: {carpool.driver}, Freie Plätze: {carpool.seatsAvailable}
          </li>
        ))}
      </ul>

      <h4>Neue Fahrgemeinschaft erstellen</h4>
      <input
        type="text"
        name="driver"
        value={newCarpool.driver}
        onChange={handleInputChange}
        placeholder="Name des Fahrers"
      />
      <input
        type="number"
        name="seatsAvailable"
        value={newCarpool.seatsAvailable}
        onChange={handleInputChange}
        placeholder="Freie Plätze"
      />
      <button onClick={handleCreateCarpool}>Fahrgemeinschaft erstellen</button>
    </div>
  );
};

export default Carpool;

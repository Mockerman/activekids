// src/components/Activity/ActivityPage.js
import React, { useState, useEffect } from 'react';
import API from '../../services/api';

const ActivityPage = () => {
  const [activities, setActivities] = useState([]);
  const [newActivity, setNewActivity] = useState({
    title: '',
    date: '',
    location: '',
    description: '',
  });

  useEffect(() => {
    const fetchActivities = async () => {
      const res = await API.get('/activity');
      setActivities(res.data);
    };

    fetchActivities();
  }, []);

  const handleInputChange = (e) => {
    setNewActivity({
      ...newActivity,
      [e.target.name]: e.target.value,
    });
  };

  const handleCreateActivity = async () => {
    try {
      const res = await API.post('/activity', newActivity);
      setActivities([...activities, res.data]);
      setNewActivity({ title: '', date: '', location: '', description: '' });
    } catch (error) {
      console.error('Error creating activity:', error);
    }
  };

  return (
    <div>
      <h2>Gemeinsame Aktivitäten planen</h2>
      <ul>
        {activities.map((activity) => (
          <li key={activity._id}>
            {activity.title} - {new Date(activity.date).toLocaleDateString()}
            <br />
            Ort: {activity.location}
            <br />
            Beschreibung: {activity.description}
          </li>
        ))}
      </ul>

      <h3>Neue Aktivität erstellen</h3>
      <input
        type="text"
        name="title"
        value={newActivity.title}
        onChange={handleInputChange}
        placeholder="Aktivitätstitel"
      />
      <input
        type="date"
        name="date"
        value={newActivity.date}
        onChange={handleInputChange}
      />
      <input
        type="text"
        name="location"
        value={newActivity.location}
        onChange={handleInputChange}
        placeholder="Ort"
      />
      <textarea
        name="description"
        value={newActivity.description}
        onChange={handleInputChange}
        placeholder="Beschreibung"
      ></textarea>
      <button onClick={handleCreateActivity}>Aktivität erstellen</button>
    </div>
  );
};

export default ActivityPage;

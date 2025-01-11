import React, { useState, useEffect } from 'react';
import API from '../../services/api';
import styles from '../styles/Dashboard.module.css';
import Navbar from '../Layout/Navbar';
import Sidebar from '../Layout/Sidebar';

const MainDashboard = () => {
  const [events, setEvents] = useState([]);
  const [activities, setActivities] = useState([]);

  useEffect(() => {
    const fetchEvents = async () => {
      const res = await API.get('/event');
      setEvents(res.data);
    };

    const fetchActivities = async () => {
      const res = await API.get('/activity');
      setActivities(res.data);
    };

    fetchEvents();
    fetchActivities();
  }, []);

  return (
    <div className={styles.dashboardContainer}>
      <Navbar />
      <Sidebar />
      <div className={styles.content}>
        <h2 className={styles.title}>Dashboard</h2>

        <div className={styles.section}>
          <h3 className={styles.sectionTitle}>Aktuelle Events</h3>
          <ul className={styles.list}>
            {events.map((event) => (
              <li key={event._id} className={styles.listItem}>
              {event.name} - {new Date(event.date).toLocaleDateString()}
            </li>
            ))}
          </ul>
        </div>

        <div className={styles.section}>
          <h3 className={styles.sectionTitle}>Aktuelle Aktivitäten</h3>
          <ul className={styles.list}>
            {activities.map((activity) => (
              <li key={activity._id} className={styles.listItem}>
                {activity.name} - {new Date(activity.date).toLocaleDateString()}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default MainDashboard;
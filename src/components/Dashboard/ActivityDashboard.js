import React, { useState, useEffect } from 'react';
import API from '../../services/api'; // Deine API-Verbindung
import styles from '../styles/ActivityDashboard.module.css'; // Dein CSS-Styling
import Navbar from '../Layout/Navbar';
import Sidebar from '../Layout/Sidebar';

const ActivityDashboard = () => {
  const [activities, setActivities] = useState([]);   // Liste der Aktivitäten
  const [isEditing, setIsEditing] = useState(false);  // Bearbeitungsmodus
  const [selectedActivity, setSelectedActivity] = useState(null);  // Ausgewählte Aktivität

  // Funktion zum Abrufen aller Aktivitäten
  const fetchActivities = async () => {
    try {
      const res = await API.get('/activity');
      setActivities(res.data);
    } catch (error) {
      console.error('Error fetching activities:', error);
    }
  };

  // Daten beim Laden des Components abrufen
  useEffect(() => {
    fetchActivities();
  }, []);

  // Funktion zum Erstellen einer neuen Aktivität
  const handleNewActivity = () => {
    setSelectedActivity({
      name: '',
      description: '',
      date: '',
    });
    setIsEditing(true);
  };

  // Funktion zum Bearbeiten einer Aktivität
  const handleEditActivity = (activity) => {
    setSelectedActivity({
      ...activity,
      date: new Date(activity.date).toISOString().substring(0, 10), // Datum im richtigen Format
    });
    setIsEditing(true);
  };

  // Funktion zum Speichern der Aktivität (Erstellen oder Aktualisieren)
  const handleSaveActivity = async () => {
    try {
      if (selectedActivity._id) {
        // Update einer existierenden Aktivität
        await API.put(`/activity/${selectedActivity._id}`, selectedActivity);
      } else {
        // Neue Aktivität erstellen
        await API.post('/activity', selectedActivity);
      }

      setIsEditing(false);
      fetchActivities();  // Liste der Aktivitäten nach dem Speichern aktualisieren
    } catch (error) {
      console.error('Error saving activity:', error);
    }
  };

  // Funktion zum Löschen einer Aktivität
  const handleDeleteActivity = async (activityId) => {
    if (window.confirm('Möchtest du diese Aktivität wirklich löschen?')) {
      try {
        await API.delete(`/activity/${activityId}`);
        fetchActivities();  // Liste der Aktivitäten nach dem Löschen aktualisieren
      } catch (error) {
        console.error('Error deleting activity:', error);
      }
    }
  };

  return (
    <div className={styles.activityDashboard}>
      <Navbar />
      <Sidebar />
      <h2 className={styles.title}>Aktivitäten verwalten</h2>
      {isEditing ? (
        <div className={styles.activityEditor}>
          <input
            type="text"
            placeholder="Aktivitätsname"
            value={selectedActivity.name}
            onChange={(e) => setSelectedActivity({ ...selectedActivity, name: e.target.value })}
            className={styles.inputField}
            required
          />
          <textarea
            placeholder="Beschreibung"
            value={selectedActivity.description}
            onChange={(e) => setSelectedActivity({ ...selectedActivity, description: e.target.value })}
            className={styles.textarea}
          />
          <input
            type="date"
            placeholder="Datum"
            value={selectedActivity.date}
            onChange={(e) => setSelectedActivity({ ...selectedActivity, date: e.target.value })}
            className={styles.inputField}
            required
          />
          <div className={styles.buttonContainer}>
            <button onClick={handleSaveActivity} className={styles.saveButton}>Speichern</button>
            <button onClick={() => setIsEditing(false)} className={styles.cancelButton}>Abbrechen</button>
          </div>
        </div>
      ) : (
        <>
          <ul className={styles.activityList}>
            {activities.map((activity) => (
              <li key={activity._id} className={styles.activityItem}>
                <h3>{activity.name}</h3>
                <p>{activity.description}</p>
                <p><strong>Datum:</strong> {new Date(activity.date).toLocaleDateString()}</p>
                <div className={styles.buttonContainer}>
                  <button onClick={() => handleEditActivity(activity)} className={styles.editButton}>Bearbeiten</button>
                  <button onClick={() => handleDeleteActivity(activity._id)} className={styles.deleteButton}>Löschen</button>
                </div>
              </li>
            ))}
          </ul>
          <button onClick={handleNewActivity} className={styles.addButton}>Neue Aktivität hinzufügen</button>
        </>
      )}
    </div>
  );
};

export default ActivityDashboard;

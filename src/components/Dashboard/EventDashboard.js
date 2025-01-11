import React, { useState, useEffect } from 'react';
import API from '../../services/api'; // Deine API-Verbindung
import styles from '../styles/EventDashboard.module.css'; // Dein CSS-Styling
import Navbar from '../Layout/Navbar';
import Sidebar from '../Layout/Sidebar';

const EventDashboard = () => {
  const [Events, setEvents] = useState([]);   // Liste der Eventen
  const [isEditing, setIsEditing] = useState(false);  // Bearbeitungsmodus
  const [selectedEvent, setSelectedEvent] = useState(null);  // Ausgewählte Event

  // Funktion zum Abrufen aller Eventen
  const fetchEvents = async () => {
    try {
      const res = await API.get('/event');
      setEvents(res.data);
    } catch (error) {
      console.error('Error fetching Events:', error);
    }
  };

  // Daten beim Laden des Components abrufen
  useEffect(() => {
    fetchEvents();
  }, []);

  // Funktion zum Erstellen einer neuen Event
  const handleNewEvent = () => {
    setSelectedEvent({
      name: '',
      description: '',
      date: '',
    });
    setIsEditing(true);
  };

  // Funktion zum Bearbeiten einer Event
  const handleEditEvent = (event) => {
    setSelectedEvent({
      ...event,
      date: new Date(event.date).toISOString().substring(0, 10), // Datum im richtigen Format
    });
    setIsEditing(true);
  };

  // Funktion zum Speichern der Event (Erstellen oder Aktualisieren)
  const handleSaveEvent = async () => {
    try {
      if (selectedEvent._id) {
        // Update einer existierenden Event
        await API.put(`/event/${selectedEvent._id}`, selectedEvent);
      } else {
        // Neue Event erstellen
        await API.post('/event', selectedEvent);
      }

      setIsEditing(false);
      fetchEvents();  // Liste der Eventen nach dem Speichern aktualisieren
    } catch (error) {
      console.error('Error saving event:', error);
    }
  };

  // Funktion zum Löschen einer Event
  const handleDeleteEvent = async (eventId) => {
    if (window.confirm('Möchtest du diese Event wirklich löschen?')) {
      try {
        await API.delete(`/event/${eventId}`);
        fetchEvents();  // Liste der Eventen nach dem Löschen aktualisieren
      } catch (error) {
        console.error('Error deleting event:', error);
      }
    }
  };

  return (
    <div className={styles.eventDashboard}>
      <Navbar />
      <Sidebar />
      <h2 className={styles.title}>Event´s verwalten</h2>
      {isEditing ? (
        <div className={styles.eventEditor}>
          <input
            type="text"
            placeholder="Eventsname"
            value={selectedEvent.name}
            onChange={(e) => setSelectedEvent({ ...selectedEvent, name: e.target.value })}
            className={styles.inputField}
            required
          />
          <textarea
            placeholder="Beschreibung"
            value={selectedEvent.description}
            onChange={(e) => setSelectedEvent({ ...selectedEvent, description: e.target.value })}
            className={styles.textarea}
          />
          <input
            type="date"
            placeholder="Datum"
            value={selectedEvent.date}
            onChange={(e) => setSelectedEvent({ ...selectedEvent, date: e.target.value })}
            className={styles.inputField}
            required
          />
          <div className={styles.buttonContainer}>
            <button onClick={handleSaveEvent} className={styles.saveButton}>Speichern</button>
            <button onClick={() => setIsEditing(false)} className={styles.cancelButton}>Abbrechen</button>
          </div>
        </div>
      ) : (
        <>
          <ul className={styles.eventList}>
            {Events.map((event) => (
              <li key={event._id} className={styles.eventItem}>
                <h3>{event.name}</h3>
                <p>{event.description}</p>
                <p><strong>Datum:</strong> {new Date(event.date).toLocaleDateString()}</p>
                <div className={styles.buttonContainer}>
                  <button onClick={() => handleEditEvent(event)} className={styles.editButton}>Bearbeiten</button>
                  <button onClick={() => handleDeleteEvent(event._id)} className={styles.deleteButton}>Löschen</button>
                </div>
              </li>
            ))}
          </ul>
          <button onClick={handleNewEvent} className={styles.addButton}>Neue Event hinzufügen</button>
        </>
      )}
    </div>
  );
};

export default EventDashboard;

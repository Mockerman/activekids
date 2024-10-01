import React, { useState } from 'react';
import API from '../../services/api';
import styles from '../styles/ProfileEditor.module.css'; // Importing CSS Module
import { jwtDecode } from 'jwt-decode';

const ProfileEditor = ({ onClose, child = {}, onSave }) => {
  const [name, setName] = useState(child.name || '');
  const [birthdate, setBirthdate] = useState(child.birthdate ? new Date(child.birthdate).toISOString().substring(0, 10) : '');
  const [interests, setInterests] = useState(child.interests || '');
  const [allergies, setAllergies] = useState(Array.isArray(child.allergies) ? child.allergies : []);

  const handleSave = async () => {
    try {
      if (!name || !birthdate) {
        throw new Error('Name und Geburtsdatum sind erforderlich.');
      }
  
      const userId = getUserIdFromToken(); // Funktion zum Abrufen der User-ID aus dem Token
  
      if (child._id) {
        // Update existing profile
        await API.put(`/child/${child._id}`, { name, birthdate, interests, allergies, userId });
      } else {
        // Create new profile
        await API.post('/child', { name, birthdate, interests, allergies, userId });
      }
      if (onSave) onSave(); // Update profile list after save
      onClose(); // Close the editor
    } catch (error) {
      console.error('Error saving profile:', error.response ? error.response.data.error : error.message);
    }
  };
  
  // Funktion zum Abrufen der User-ID aus dem Token
  const getUserIdFromToken = () => {
    const token = localStorage.getItem('token');
    if (token) {
      const decoded = jwtDecode(token);
      return decoded.userId; // Benutzer-ID aus dem Token extrahieren
    }
    return null;
  };
  

  return (
    <div className={styles.editorContainer}>
      <h2 className={styles.editorTitle}>{child._id ? 'Profil bearbeiten' : 'Neues Profil erstellen'}</h2>
      <input
        type="text"
        placeholder="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        className={styles.inputField}
      />
      <input
        type="date"
        placeholder="Geburtsdatum"
        value={birthdate}
        onChange={(e) => setBirthdate(e.target.value)}
        className={styles.inputField}
      />
      <input
        type="text"
        placeholder="Interessen" 
        value={interests}
        onChange={(e) => setInterests(e.target.value)}
        className={styles.inputField}
      />
      <input
        type="text"
        placeholder="Allergien"
        value={allergies.join(', ')} // Verbinde das Array zu einem String
        onChange={(e) => setAllergies(e.target.value.split(',').map(item => item.trim()).filter(item => item !== ''))} // In ein Array umwandeln
        className={styles.inputField}
      />

      <div className={styles.buttonsContainer}>
        <button onClick={handleSave} className={styles.saveButton}>Speichern</button>
        <button onClick={onClose} className={styles.cancelButton}>Abbrechen</button>
      </div>
    </div>
  );
};

export default ProfileEditor;

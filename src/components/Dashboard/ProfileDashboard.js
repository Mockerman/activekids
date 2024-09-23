import React, { useState, useEffect } from 'react';
import API from '../../services/api';
import ProfileEditor from './ProfileEditor';
import styles from '../styles/ProfileDashboard.module.css'; // Importing CSS Module
import Navbar from '../Layout/Navbar';
import Sidebar from '../Layout/Sidebar';
import { getUserIdFromToken } from '../Auth/tokenUtils';

const ProfileDashboard = () => {
  const [children, setChildren] = useState([]);
  const [selectedChild, setSelectedChild] = useState({});
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    fetchChildren();
  }, []);

  const fetchChildren = async () => {
    try {
      const userId = getUserIdFromToken(); // Benutzer-ID abrufen
      const res = await API.get(`/child?userId=${userId}`); // Benutzer-ID als Query-Parameter übergeben
      setChildren(res.data);
    } catch (error) {
      console.error('Error fetching children:', error);
    }
  };

  const handleEdit = (child) => {
    setSelectedChild(child);
    setIsEditing(true);
  };

  const handleNew = () => {
    setSelectedChild({});
    setIsEditing(true);
  };

  const handleDelete = async (childId) => {
    if (window.confirm("Möchten Sie dieses Profil wirklich löschen?")) {
      try {
        await API.delete(`/child/${childId}`);
        fetchChildren(); // Aktualisieren der Liste nach dem Löschen
      } catch (error) {
        console.error('Error deleting child:', error);
      }
    }
  };

  const handleSave = () => {
    fetchChildren(); // Liste nach dem Speichern aktualisieren
  };

  return (
    <div className={styles.profileDashboard}>
            <Navbar />
            <Sidebar />
      <h2 className={styles.title}>Kinderprofile verwalten</h2>
      <ul className={styles.profileList}>
        {children.map((child) => (
          <li key={child._id} className={styles.profileItem}>
            {child.name} - {new Date(child.birthdate).toLocaleDateString()} - {calculateAge(child.birthdate)} Jahre alt
            <div>
              <strong>Interessen:</strong> {child.interests ? child.interests.join(', ') : 'Keine Interessen'}
            </div>
            <div>
            <strong>Allergien:</strong> {child.allergies && child.allergies.length > 0 ? child.allergies.join(', ') : 'Keine Allergien'}
            </div>
            <div className={styles.buttonsContainer}>
              <button onClick={() => handleEdit(child)} className={styles.editButton}>
                Bearbeiten
              </button>
              <button onClick={() => handleDelete(child._id)} className={styles.deleteButton}>
                Löschen
              </button>
            </div>
          </li>
        ))}
      </ul>
      <button onClick={handleNew} className={styles.addButton}>
        Neues Profil hinzufügen
      </button>

      {isEditing && (
        <ProfileEditor
          child={selectedChild}
          onClose={() => setIsEditing(false)}
          onSave={handleSave} // Liste nach dem Speichern aktualisieren
        />
      )}
    </div>
  );
};

// Berechnen des Alters
const calculateAge = (birthdate) => {
  const now = new Date();
  const birthDate = new Date(birthdate);
  let age = now.getFullYear() - birthDate.getFullYear();
  const monthDiff = now.getMonth() - birthDate.getMonth();
  if (monthDiff < 0 || (monthDiff === 0 && now.getDate() < birthDate.getDate())) {
    age--;
  }
  return age;
};

export default ProfileDashboard;

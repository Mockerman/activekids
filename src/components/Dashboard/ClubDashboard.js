// src/components/Dashboard/ClubDashboard.js
import React, { useState, useEffect } from 'react';
import API from '../../services/api';
import styles from '../styles/ClubDashboard.module.css'; // Import CSS
import Navbar from '../Layout/Navbar';
import Sidebar from '../Layout/Sidebar';


const ClubDashboard = () => {
  const [clubs, setClubs] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [selectedClub, setSelectedClub] = useState(null);

  // Fetching clubs from the server
  const fetchClubs = async () => {
    try {
      const res = await API.get('/club');
      setClubs(res.data);
    } catch (error) {
      console.error('Error fetching clubs:', error);
    }
  };

  useEffect(() => {
    fetchClubs(); // Initial fetch when component mounts
  }, []);

  const handleNewClub = () => {
    setSelectedClub({
      name: '',
      description: '',
      offers: '',
      location: '',
      socialMedia: { facebook: '', instagram: '', twitter: '' }, // Standardwerte für Social Media
      logo: ''
    });
    setIsEditing(true);
  };

  const handleEditClub = (club) => {
    setSelectedClub({
      ...club,
      socialMedia: {
        facebook: club.socialMedia?.facebook || '',
        instagram: club.socialMedia?.instagram || '',
        twitter: club.socialMedia?.twitter || ''
      } // Fallback auf leere Strings, wenn die Social Media Links fehlen
    });
    setIsEditing(true);
  };

  const handleSaveClub = async () => {
    try {
      const formData = new FormData();
  
      formData.append('name', selectedClub.name);
      formData.append('description', selectedClub.description);
      formData.append('offers', selectedClub.offers);
  
      // Sende nur die Stadt als `location`
      formData.append('location', selectedClub.location); // Nur die Stadt als String
  
      formData.append('socialMedia', JSON.stringify(selectedClub.socialMedia)); // Social Media als JSON
  
      if (selectedClub.logo) {
        formData.append('logo', selectedClub.logo);
      }
  
      if (selectedClub._id) {
        // Update existing club
        await API.put(`/club/${selectedClub._id}`, formData, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        });
      } else {
        // Create new club
        await API.post('/club', formData, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        });
      }
  
      setIsEditing(false);
      fetchClubs(); // Refresh the list of clubs after saving
    } catch (error) {
      console.error('Error saving club:', error);
    }
  };
  
  
  

  const handleDeleteClub = async (clubId) => {
    if (window.confirm('Bist du sicher, dass du diesen Verein löschen möchtest?')) {
      await API.delete(`/club/${clubId}`);
      fetchClubs(); // Refresh the list after deletion
    }
  };

  return (
    <div className={styles.clubDashboard}>
                  <Navbar />
                  <Sidebar />
      <h2 className={styles.title}>Vereine verwalten</h2>
      {isEditing ? (
        <div className={styles.clubEditor}>
          <input
            type="text"
            placeholder="Vereinsname"
            value={selectedClub.name}
            onChange={(e) => setSelectedClub({ ...selectedClub, name: e.target.value })}
            className={styles.inputField}
            required
          />
          <textarea
            placeholder="Beschreibung"
            value={selectedClub.description}
            onChange={(e) => setSelectedClub({ ...selectedClub, description: e.target.value })}
            className={styles.textarea}
            required
          />
          <textarea
            placeholder="Was bietet der Verein?"
            value={selectedClub.offers}
            onChange={(e) => setSelectedClub({ ...selectedClub, offers: e.target.value })}
            className={styles.textarea}
            required
          />
          <input
            type="text"
            placeholder="Standort"
            value={selectedClub.location}
            onChange={(e) => setSelectedClub({ ...selectedClub, location: e.target.value })}
            className={styles.inputField}
            required
          />
          <div className={styles.socialMediaInputs}>
            <input
              type="text"
              placeholder="Facebook Link"
              value={selectedClub.socialMedia.facebook}
              onChange={(e) => setSelectedClub({
                ...selectedClub,
                socialMedia: { ...selectedClub.socialMedia, facebook: e.target.value }
              })}
              className={styles.inputField}
            />
            <input
              type="text"
              placeholder="Instagram Link"
              value={selectedClub.socialMedia.instagram}
              onChange={(e) => setSelectedClub({
                ...selectedClub,
                socialMedia: { ...selectedClub.socialMedia, instagram: e.target.value }
              })}
              className={styles.inputField}
            />
            <input
              type="text"
              placeholder="Website Link"
              value={selectedClub.socialMedia.twitter}
              onChange={(e) => setSelectedClub({
                ...selectedClub,
                socialMedia: { ...selectedClub.socialMedia, twitter: e.target.value }
              })}
              className={styles.inputField}
            />
          </div>
          <input
            type="file"
            onChange={(e) => setSelectedClub({ ...selectedClub, logo: e.target.files[0] })}
            className={styles.inputField}
          />
          <div className={styles.buttonContainer}>
            <button onClick={handleSaveClub} className={styles.saveButton}>Speichern</button>
            <button onClick={() => setIsEditing(false)} className={styles.cancelButton}>Abbrechen</button>
          </div>
        </div>
      ) : (
        <>
<ul className={styles.clubList}>
  {clubs.map((club) => (
    <li key={club._id} className={styles.clubItem}>
      <img src={`${process.env.REACT_APP_BACKEND_URL}/uploads/${club.logo}`} alt={`${club.name} Logo`} className={styles.clubLogo} />
      <h3>{club.name}</h3>
      <p>{club.description}</p>
      <p><strong>Angebote:</strong> {club.offers}</p>
      <p><strong>Standort:</strong> {club.location}</p>

      <div className={styles.socialMedia}>
        {club.socialMedia?.facebook && (
          <a href={club.socialMedia.facebook} target="_blank" rel="noopener noreferrer">Facebook</a>
        )}
        {club.socialMedia?.instagram && (
          <a href={club.socialMedia.instagram} target="_blank" rel="noopener noreferrer">Instagram</a>
        )}
        {club.socialMedia?.twitter && (
          <a href={club.socialMedia.twitter} target="_blank" rel="noopener noreferrer">Website</a>
        )}
      </div>

      <div className={styles.buttonContainer}>
        <button onClick={() => handleEditClub(club)} className={styles.editButton}>Bearbeiten</button>
        <button onClick={() => handleDeleteClub(club._id)} className={styles.deleteButton}>Löschen</button>
      </div>
    </li>
  ))}
</ul>

          <button onClick={handleNewClub} className={styles.addButton}>Neuen Verein hinzufügen</button>
        </>
      )}
    </div>
  );
};

export default ClubDashboard;

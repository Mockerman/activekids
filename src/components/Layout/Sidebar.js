// src/components/Layout/Sidebar.js
import React from 'react';
import { Link } from 'react-router-dom';
import styles from '../styles/Sidebar.module.css'; // Importing CSS Module

const Sidebar = () => {
  return (
    <div className={styles.sidebar}>
      <ul className={styles.sidebarList}>
        <li>
          <Link to="/dashboard" className={styles.sidebarLink}>Dashboard</Link>
        </li>
        <li>
          <Link to="/profile" className={styles.sidebarLink}>Profil verwalten</Link>
        </li>
        <li>
          <Link to="/club" className={styles.sidebarLink}>Vereine verwalten</Link>
        </li>
        <li>
          <Link to="/activity" className={styles.sidebarLink}>Aktivitäten</Link>
        </li>
        <li>
          <Link to="/carpool" className={styles.sidebarLink}>Fahrgemeinschaften</Link>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;

import React from 'react';
import styles from '../styles/Navbar.module.css';

const Navbar = () => {
  const handleLogout = () => {
    localStorage.removeItem('token');
    window.location.href = '/login';
  };

  return (
    <nav className={styles.navbar}>
      <div className={styles.navbarBrand}>
        ActiveKids
      </div>
      <button className={styles.logoutButton} onClick={handleLogout}>
        Logout
      </button>
    </nav>
  );
};

export default Navbar;

import React, { useState } from 'react';
import { register, verifyInviteCode } from '../../services/authService';
import styles from '../styles/Register.module.css'; // Import CSS Module

const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [inviteCode, setInviteCode] = useState('');
  const [childrenCount, setChildrenCount] = useState('');
  const [address, setAddress] = useState({
    street: '',
    houseNumber: '',
    postalCode: '',
    city: ''
  });
  const [error, setError] = useState('');

  const handleAddressChange = (e) => {
    setAddress({
      ...address,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await verifyInviteCode(inviteCode);
      const response = await register({
        name,
        email,
        password,
        childrenCount: Number(childrenCount),
        address: {
          street: address.street,
          houseNumber: address.houseNumber,
          postalCode: address.postalCode,
          city: address.city
        },
        inviteCode
      });
      console.log('Registration response:', response); // Ausgabe der gesamten Antwort
      localStorage.setItem('token', response.data.token);
      window.location.href = '/dashboard';
    } catch (err) {
      setError('Registration failed. Please check your details.');
    }
  };

  return (
    <form onSubmit={handleSubmit} className={styles.formContainer}>
      <h2 className={styles.formTitle}>Register</h2>
      {error && <p className={styles.errorMessage}>{error}</p>}
      <input
        type="text"
        placeholder="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
        className={styles.inputField}
      />
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
        className={styles.inputField}
      />
      <input
        type="password"
        placeholder="Passwort"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
        className={styles.inputField}
      />
      <input
        type="text"
        placeholder="Einladungs Code"
        value={inviteCode}
        onChange={(e) => setInviteCode(e.target.value)}
        required
        className={styles.inputField}
      />
      <input
        type="number"
        placeholder="Kinder Anzahl"
        value={childrenCount}
        onChange={(e) => setChildrenCount(e.target.value)}
        required
        className={styles.inputField}
      />
      <input
        type="text"
        name="street"
        placeholder="Straße"
        value={address.street}
        onChange={handleAddressChange}
        required
        className={styles.inputField}
      />
      <input
        type="text"
        name="houseNumber"
        placeholder="Hausnummer"
        value={address.houseNumber}
        onChange={handleAddressChange}
        required
        className={styles.inputField}
      />
      <input
        type="text"
        name="postalCode"
        placeholder="Postleitzahl"
        value={address.postalCode}
        onChange={handleAddressChange}
        required
        className={styles.inputField}
      />
      <input
        type="text"
        name="city"
        placeholder="Stadt"
        value={address.city}
        onChange={handleAddressChange}
        required
        className={styles.inputField}
      />
      <button type="submit" className={styles.submitButton}>Register</button>
    </form>
  );
};

export default Register;

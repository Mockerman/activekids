import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { login } from '../../services/authService';
import styles from '../styles/Login.module.css';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await login({ email, password });
      localStorage.setItem('token', response.data.token);
      window.location.href = '/dashboard'; // Redirect to dashboard
    } catch (err) {
      setError('Login fehlgeschlagen. Bitte überprüfen Sie Ihre Anmeldedaten.');
    }
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Login</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="E-Mail"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className={styles.input}
        />
        <input
          type="password"
          placeholder="Passwort"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className={styles.input}
        />
        <button type="submit" className={styles.button}>Anmelden</button>
      </form>

      <div className={styles.registerLink}>
        <p>Noch kein Konto?</p>
        <Link to="/register">
          <button className={styles.button}>Registrieren</button>
        </Link>
      </div>
    </div>
  );
};

export default Login;

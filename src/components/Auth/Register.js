import React, { useState } from 'react';
import { register, verifyInviteCode } from '../../services/authService';

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
      localStorage.setItem('token', response.data.token);
      window.location.href = '/dashboard';
    } catch (err) {
      setError('Registration failed. Please check your details.');
    }
  };
  

  return (
    <form onSubmit={handleSubmit}>
      <h2>Register</h2>
      {error && <p>{error}</p>}
      <input
        type="text"
        placeholder="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
      />
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />
      <input
        type="text"
        placeholder="Invite Code"
        value={inviteCode}
        onChange={(e) => setInviteCode(e.target.value)}
        required
      />
      <input
        type="number"
        placeholder="Children Count"
        value={childrenCount}
        onChange={(e) => setChildrenCount(e.target.value)}
        required
      />
      <input
        type="text"
        name="street"
        placeholder="Street"
        value={address.street}
        onChange={handleAddressChange}
        required
      />
      <input
        type="text"
        name="houseNumber"
        placeholder="House Number"
        value={address.houseNumber}
        onChange={handleAddressChange}
        required
      />
      <input
        type="text"
        name="postalCode"
        placeholder="Postal Code"
        value={address.postalCode}
        onChange={handleAddressChange}
        required
      />
      <input
        type="text"
        name="city"
        placeholder="City"
        value={address.city}
        onChange={handleAddressChange}
        required
      />
      <button type="submit">Register</button>
    </form>
  );
};

export default Register;

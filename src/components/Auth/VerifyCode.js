import React, { useState } from 'react';
import { verifyInviteCode } from '../../services/authService';

const VerifyCode = () => {
  const [code, setCode] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await verifyInviteCode(code);
      alert('Code verified successfully!');
    } catch (err) {
      setError('Invalid code. Please try again.');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Verify Invite Code</h2>
      {error && <p>{error}</p>}
      <input
        type="text"
        placeholder="Invite Code"
        value={code}
        onChange={(e) => setCode(e.target.value)}
        required
      />
      <button type="submit">Verify Code</button>
    </form>
  );
};

export default VerifyCode;

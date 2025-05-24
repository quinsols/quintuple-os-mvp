// src/components/LoginSelector.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const LoginSelector = () => {
  const [role, setRole] = useState('');
  const navigate = useNavigate();

  const handleLogin = () => {
    if (role) {
      navigate('/dashboard');
    }
  };

  return (
    <div style={{ textAlign: 'center' }}>
      <h3>Select Your Role</h3>
      <select value={role} onChange={(e) => setRole(e.target.value)}>
        <option value="">-- Choose Role --</option>
        <option value="founder">Founder</option>
        <option value="cxo">CXO</option>
        <option value="intern">Intern</option>
        <option value="pod_lead">Pod Lead</option>
      </select>
      <br /><br />
      <button onClick={handleLogin}>Enter Control Room</button>
    </div>
  );
};

export default LoginSelector;

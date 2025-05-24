// src/components/Header.jsx
import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => (
  <header style={{
    backgroundColor: '#1a202c',
    color: 'white',
    padding: '16px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center'
  }}>
    <div style={{ fontWeight: 'bold', fontSize: '20px' }}>
      Quintuple OS
    </div>
    <nav>
      <Link to="/" style={{ color: '#fff', margin: '0 10px' }}>Home</Link>
      <Link to="/dashboard" style={{ color: '#fff', margin: '0 10px' }}>Dashboard</Link>
      <Link to="/synthesizer" style={{ color: '#fff', margin: '0 10px' }}>Synthesizer</Link>
      <Link to="/tasks" style={{ color: '#fff', margin: '0 10px' }}>Tasks</Link>
      <Link to="/feedback" style={{ color: '#fff', margin: '0 10px' }}>Feedback</Link>
    </nav>
  </header>
);

export default Header;

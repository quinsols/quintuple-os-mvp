// src/components/ControlRoom.jsx
import React from 'react';
import { Link } from 'react-router-dom';

const ControlRoom = () => {
  const samplePods = [
    { id: 1, name: 'Master Pod' },
    { id: 2, name: 'Legal Pod' },
    { id: 3, name: 'Finance Pod' },
    { id: 4, name: 'Digital Pod' },
  ];

  return (
    <div>
      <h3>Control Room Dashboard</h3>
      <p>Click a Pod to view details:</p>
      <ul>
        {samplePods.map((pod) => (
          <li key={pod.id}>
            <Link to={`/pod/${pod.id}`}>{pod.name}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ControlRoom;

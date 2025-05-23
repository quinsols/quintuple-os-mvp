// src/components/PodView.jsx
import React from 'react';
import { useParams, Link } from 'react-router-dom';

const PodView = () => {
  const { id } = useParams();

  const dummyAgents = [
    { id: 101, name: 'SOPForge', podId: '1' },
    { id: 102, name: 'GSTMate', podId: '2' },
    { id: 103, name: 'LexAgent', podId: '3' },
  ];

  const agentsInPod = dummyAgents.filter(agent => agent.podId === id);

  return (
    <div>
      <h3>Agents in Pod #{id}</h3>
      <ul>
        {agentsInPod.length > 0 ? (
          agentsInPod.map(agent => (
            <li key={agent.id}>
              <Link to={`/agent/${agent.id}`}>{agent.name}</Link>
            </li>
          ))
        ) : (
          <p>No agents found for this Pod.</p>
        )}
      </ul>
    </div>
  );
};

export default PodView;

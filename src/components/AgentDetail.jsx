// src/components/AgentDetail.jsx
import React from 'react';
import { useParams } from 'react-router-dom';

const AgentDetail = () => {
  const { id } = useParams();

  const dummyDetails = {
    '101': {
      name: 'SOPForge',
      role: 'SOP Generator',
      logic: 'Reads task → selects SOP template → customizes with placeholders',
      prompt: 'Generate SOP for legal onboarding'
    },
    '102': {
      name: 'GSTMate',
      role: 'GST Filing Bot',
      logic: 'Reads Excel → files GSTR → emails report',
      prompt: 'File GSTR-1 for March 2025'
    },
    '103': {
      name: 'LexAgent',
      role: 'Legal Summary & Drafting Agent',
      logic: 'Analyzes input → retrieves legal template → fills contract',
      prompt: 'Draft NDA between Quintuple & Partner'
    },
  };

  const agent = dummyDetails[id];

  return agent ? (
    <div>
      <h3>{agent.name}</h3>
      <p><strong>Role:</strong> {agent.role}</p>
      <p><strong>Execution Logic:</strong> {agent.logic}</p>
      <p><strong>Example Prompt:</strong> {agent.prompt}</p>
    </div>
  ) : (
    <p>No agent details found.</p>
  );
};

export default AgentDetail;

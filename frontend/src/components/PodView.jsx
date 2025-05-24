// src/components/PodView.jsx
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import BASE_URL from "../services/api";

const PodView = () => {
  const { id } = useParams();
  const [agents, setAgents] = useState([]);
  const [podName, setPodName] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [agentsRes, podsRes] = await Promise.all([
          fetch(`${BASE_URL}/api/agents`),
          fetch(`${BASE_URL}/api/pods`)
        ]);

        const agentData = await agentsRes.json();
        const podData = await podsRes.json();

        const filteredAgents = agentData.filter(agent => agent.pod_id === parseInt(id));
        const matchedPod = podData.find(pod => pod.id === parseInt(id));

        setAgents(filteredAgents);
        setPodName(matchedPod?.name || `Pod #${id}`);
        setLoading(false);
      } catch (err) {
        console.error('Error loading pod details:', err);
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  return (
    <div style={{ maxWidth: '1000px', margin: '60px auto', padding: '0 20px' }}>
      <h2 style={{
        textAlign: 'center',
        marginBottom: '30px',
        fontWeight: 'bold'
      }}>
        Agents in {podName}
      </h2>

      {loading ? (
        <p style={{ textAlign: 'center' }}>Loading agents...</p>
      ) : (
        <table style={{
          width: '100%',
          borderCollapse: 'collapse',
          fontSize: '16px',
          backgroundColor: '#fff',
          boxShadow: '0 2px 12px rgba(0,0,0,0.05)',
          borderRadius: '8px',
          overflow: 'hidden'
        }}>
          <thead style={{ backgroundColor: '#f7fafc' }}>
            <tr>
              <th style={th}>Agent Name</th>
              <th style={th}>Agent Type</th>
              <th style={th}>Description</th>
            </tr>
          </thead>
          <tbody>
            {agents.map(agent => (
              <tr key={agent.id}>
                <td style={td}>{agent.name}</td>
                <td style={td}>{agent.agent_type}</td>
                <td style={td}>{agent.description}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

const th = {
  padding: '14px 18px',
  borderBottom: '2px solid #edf2f7',
  textAlign: 'left',
  background: '#f0f0f0',
  fontWeight: '600'
};

const td = {
  padding: '14px 18px',
  borderBottom: '1px solid #e2e8f0',
  verticalAlign: 'top'
};

export default PodView;

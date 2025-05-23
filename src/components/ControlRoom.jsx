// src/components/ControlRoom.jsx
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

// Emoji map (feel free to customize or add more!)
const podIcons = {
  "Master Pod - Vision & Strategy Architect": "🧠",
  "Legal & Compliance Advisor Pod": "📜",
  "Finance & Audit Brain Pod": "💰",
  "External Communication & Branding Pod": "📣",
  "People Ops & Talent Assistant Pod": "👩‍💼",
  "Project Sprint Manager Pod": "📆",
  "AI & Tech Automation Strategist Pod": "🤖",
  "Customer & Partner Ops Desk Pod": "🎧",
  "Memory & Intelligence Lab Pod": "🧬",
  "Innovation Incubator Pod": "🧠", // fallback
  "The Synthesizer - AI Prompt Engineer & Goal Realization Pod": "🧪",
  "Digital Execution Architect Pod": "🧩",
  "R&D Lab Pod": "🔬",
  "Client Project Pods": "🗂️",
};

const ControlRoom = () => {
  const [pods, setPods] = useState([]);
  const [agents, setAgents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAll = async () => {
      try {
        const [podRes, agentRes] = await Promise.all([
          fetch('/api/pods'),
          fetch('/api/agents')
        ]);

        const podData = await podRes.json();
        const agentData = await agentRes.json();

        setPods(podData);
        setAgents(agentData);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching dashboard data:', err);
        setLoading(false);
      }
    };

    fetchAll();
  }, []);

  const getAgentCount = (podId) => {
    return agents.filter(agent => agent.pod_id === podId).length;
  };

  return (
    <div style={{ maxWidth: '1200px', margin: '60px auto', padding: '0 20px' }}>
      <h2 style={{
        textAlign: 'center',
        marginBottom: '40px',
        backgroundColor: '#2b6cb0',
        color: 'white',
        padding: '12px 24px',
        borderRadius: '8px',
        display: 'inline-block'
      }}>
        ⚙️ Quintuple OS – Control Room
      </h2>

      {loading ? (
        <p style={{ textAlign: 'center' }}>Loading Pods...</p>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: '20px' }}>
          {pods.map(pod => (
            <Link to={`/pod/${pod.id}`} key={pod.id} style={{ textDecoration: 'none' }}>
              <div style={{
                backgroundColor: '#f7fafc',
                border: '1px solid #e2e8f0',
                borderRadius: '10px',
                padding: '24px',
                textAlign: 'center',
                transition: '0.3s',
                boxShadow: '0 2px 8px rgba(0,0,0,0.05)'
              }}>
                <div style={{ fontSize: '40px' }}>
                  {podIcons[pod.name] || '📦'}
                </div>
                <h3 style={{ marginTop: '12px', fontSize: '18px', color: '#2b6cb0' }}>{pod.name}</h3>
                <div style={{
                  marginTop: '8px',
                  fontSize: '14px',
                  backgroundColor: '#e6fffa',
                  color: '#2c7a7b',
                  padding: '4px 12px',
                  borderRadius: '12px',
                  display: 'inline-block'
                }}>
                  {getAgentCount(pod.id)} Agent{getAgentCount(pod.id) !== 1 ? 's' : ''}
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default ControlRoom;

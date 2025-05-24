// src/components/PromptFormSimulation.jsx
import React, { useState } from 'react';
import BASE_URL from '../services/api';


const PromptFormSimulation = () => {
  const [prompt, setPrompt] = useState('');
  const [responseSteps, setResponseSteps] = useState([]);
  const [loading, setLoading] = useState(false);

  const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setResponseSteps([]);
    setLoading(true);

    const steps = [];

    steps.push('🕐 Thinking...');
    setResponseSteps([...steps]);
    await delay(2000);

    steps.push('🧠 Looking for active agents...');
    setResponseSteps([...steps]);
    await delay(2000);

    steps.push('❌ No Active Agents found. But I can help with defining your request.');
    setResponseSteps([...steps]);
    await delay(2000);

    try {
      const res = await fetch(`${BASE_URL}/api/prompt`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt }),
      });

      const data = await res.json();

      if (data.okrs && data.okrs.length > 0) {
        steps.push('\n📌 Here are some suggestions:');
        data.okrs.forEach((okr, i) => {
          steps.push(`${i + 1}. ${okr}`);
        });

        steps.push('\n💬 Would you like me to...');
        steps.push(`➡️ Step 1: ${data.okrs[0]}`);
        if (data.okrs[1]) {
          steps.push(`➡️ Step 2: ${data.okrs[1]}`);
        }
        steps.push('✅ Just respond back with step# to proceed.');
      } else {
        steps.push('\n⚠️ I couldn’t generate actionable OKRs from that. Please try again.');
      }

    } catch (err) {
      console.error('❌ Error during simulation:', err);
      steps.push('\n❌ Something went wrong. Please try again.');
    }

    setResponseSteps([...steps]);
    setLoading(false);
  };

  return (
    <div style={{ maxWidth: '700px', margin: '60px auto', padding: '30px', backgroundColor: '#fff', borderRadius: '12px', boxShadow: '0 4px 20px rgba(0,0,0,0.1)' }}>
      <h2 style={{ textAlign: 'center', fontSize: '24px', marginBottom: '20px', color: '#1a202c' }}>🧪 Vision Synthesizer </h2>

      <form onSubmit={handleSubmit}>
        <textarea
          rows="4"
          placeholder="Describe what you want to do..."
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          style={{
            width: '100%',
            padding: '14px',
            fontSize: '16px',
            borderRadius: '8px',
            border: '1px solid #ccc',
            marginBottom: '20px',
            resize: 'none'
          }}
        />

        <button type="submit" style={{
          width: '100%',
          padding: '12px',
          fontSize: '16px',
          backgroundColor: '#1a202c',
          color: '#fff',
          border: 'none',
          borderRadius: '8px',
          cursor: 'pointer'
        }}>
          {loading ? 'Simulating...' : 'Generate Response'}
        </button>
      </form>

      <pre style={{
        marginTop: '30px',
        padding: '20px',
        backgroundColor: '#f0f7f9',
        borderLeft: '5px solid #00796b',
        borderRadius: '8px',
        fontSize: '15px',
        color: '#003c3c',
        whiteSpace: 'pre-wrap'
      }}>
        {responseSteps.join('\n\n')}
      </pre>
    </div>
  );
};

export default PromptFormSimulation;

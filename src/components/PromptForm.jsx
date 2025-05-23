// src/components/PromptForm.jsx
import React, { useState } from 'react';

const PromptForm = () => {
  const [prompt, setPrompt] = useState('');
  const [response, setResponse] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setResponse('');

    try {
      const res = await fetch('/api/prompt', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt }),
      });

      const data = await res.json();
      setResponse(data.reply);
    } catch (err) {
      console.error('❌ Error calling OpenAI API:', err);
      setResponse('Something went wrong. Please try again.');
    }

    setLoading(false);
  };

  return (
    <div style={{
      maxWidth: '700px',
      margin: '60px auto',
      padding: '30px',
      backgroundColor: '#ffffff',
      borderRadius: '12px',
      boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
    }}>
      <h2 style={{
        textAlign: 'center',
        fontSize: '24px',
        marginBottom: '20px',
        color: '#1a202c'
      }}>
        🔍 AI Assistant
      </h2>

      <form onSubmit={handleSubmit}>
        <textarea
          rows="4"
          placeholder="Ask anything related to OKRs, SOPs, or tasks..."
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
          {loading ? 'Thinking...' : 'Generate Response'}
        </button>
      </form>

      {response && (
        <div style={{
          marginTop: '30px',
          padding: '20px',
          backgroundColor: '#f0f7f9',
          borderLeft: '5px solid #00796b',
          borderRadius: '8px',
          fontSize: '16px',
          color: '#003c3c'
        }}>
          <strong>Response:</strong>
          <p style={{ marginTop: '8px', whiteSpace: 'pre-line' }}>{response}</p>
        </div>
      )}
    </div>
  );
};

export default PromptForm;

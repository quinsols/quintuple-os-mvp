// src/components/PromptForm.jsx
import React, { useState } from 'react';

const PromptForm = () => {
  const [prompt, setPrompt] = useState('');
  const [response, setResponse] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    // Simulated logic — feel free to expand based on prompt content
    if (prompt.toLowerCase().includes('okr')) {
      setResponse('Simulated Agent Response: OKRs for AgriFly generated ✅');
    } else if (prompt.toLowerCase().includes('task')) {
      setResponse('Simulated Agent Response: Task assigned to Legal Pod 🧠');
    } else {
      setResponse('Simulated Agent Response: No matching SOP found. Try again.');
    }
  };

  return (
    <div style={{ maxWidth: '600px', margin: '0 auto' }}>
      <h3>Prompt Submission</h3>
      <form onSubmit={handleSubmit}>
        <textarea
          rows="4"
          placeholder="Enter your prompt here..."
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          style={{ width: '100%', padding: '10px', fontSize: '16px' }}
        />
        <br />
        <button type="submit">Submit Prompt</button>
      </form>

      {response && (
        <div style={{ marginTop: '20px', background: '#f0f0f0', padding: '10px' }}>
          <strong>Agent Response:</strong>
          <p>{response}</p>
        </div>
      )}
    </div>
  );
};

export default PromptForm;

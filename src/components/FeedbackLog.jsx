// src/components/FeedbackLog.jsx
import React from 'react';

const FeedbackLog = () => {
  const dummyFeedback = [
    { id: 1, task: 'Generate OKRs', agent: 'SOPForge', rating: 5, comments: 'Very helpful and fast!' },
    { id: 2, task: 'GSTR Filing', agent: 'GSTMate', rating: 4, comments: 'Accurate but took some time' },
    { id: 3, task: 'NDA Draft', agent: 'LexAgent', rating: 3, comments: 'Needs slight customization' },
  ];

  return (
    <div>
      <h3>Agent Feedback Log</h3>
      <table border="1" cellPadding="8">
        <thead>
          <tr>
            <th>Agent</th>
            <th>Task</th>
            <th>Rating</th>
            <th>Comments</th>
          </tr>
        </thead>
        <tbody>
          {dummyFeedback.map(entry => (
            <tr key={entry.id}>
              <td>{entry.agent}</td>
              <td>{entry.task}</td>
              <td>{entry.rating} ⭐</td>
              <td>{entry.comments}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default FeedbackLog;

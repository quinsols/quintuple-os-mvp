// src/components/TaskLog.jsx
import React from 'react';

const TaskLog = () => {
  const dummyLogs = [
    { id: 1, input: 'Generate OKRs for AgriFly', output: 'OKRs Created', agent: 'SOPForge', timestamp: '2025-05-23 10:01' },
    { id: 2, input: 'File GSTR-1', output: 'Filed Successfully', agent: 'GSTMate', timestamp: '2025-05-22 18:30' },
    { id: 3, input: 'Draft NDA for Vendor', output: 'Draft Prepared', agent: 'LexAgent', timestamp: '2025-05-21 14:45' },
  ];

  return (
    <div>
      <h3>Task Execution Log</h3>
      <table border="1" cellPadding="8">
        <thead>
          <tr>
            <th>Timestamp</th>
            <th>Agent</th>
            <th>Input</th>
            <th>Output</th>
          </tr>
        </thead>
        <tbody>
          {dummyLogs.map(log => (
            <tr key={log.id}>
              <td>{log.timestamp}</td>
              <td>{log.agent}</td>
              <td>{log.input}</td>
              <td>{log.output}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TaskLog;

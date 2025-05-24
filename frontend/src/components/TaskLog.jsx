// src/components/TaskLog.jsx
import React, { useState, useEffect } from 'react';

const getStatusStyle = (status) => {
  switch (status) {
    case 'Completed':
      return { backgroundColor: '#c6f6d5', color: '#22543d' };
    case 'In Progress':
      return { backgroundColor: '#fefcbf', color: '#744210' };
    case 'Pending':
      return { backgroundColor: '#fed7d7', color: '#742a2a' };
    default:
      return {};
  }
};

const TaskLog = () => {
  const [tasks, setTasks] = useState([]);
  const [agents, setAgents] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [taskRes, agentRes] = await Promise.all([
          fetch('/api/task-log'),
          fetch('/api/agents')
        ]);

        const taskData = await taskRes.json();
        const agentData = await agentRes.json();

        const agentMap = {};
        agentData.forEach(agent => {
          agentMap[agent.id] = agent.name;
        });

        setTasks(taskData);
        setAgents(agentMap);
        setLoading(false);
      } catch (err) {
        console.error('Fetch error:', err);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div style={{ maxWidth: '1100px', margin: '60px auto', padding: '0 20px' }}>
      <h2 style={{ textAlign: 'center', marginBottom: '30px' }}>📋 Task Execution Log</h2>

      {loading ? (
        <p style={{ textAlign: 'center' }}>Loading tasks...</p>
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
              <th style={th}>Task Name</th>
              <th style={th}>Agent</th>
              <th style={th}>Status</th>
              <th style={th}>Progress</th>
              <th style={th}>Timestamp</th>
            </tr>
          </thead>
          <tbody>
            {tasks.map(task => (
              <tr key={task.id}>
                <td style={td}>{task.input_data}</td>
                <td style={td}>{agents[task.agent_id] || 'Unknown Agent'}</td>
                <td style={{ ...td, ...getStatusStyle(task.status), fontWeight: 'bold', textAlign: 'center' }}>
                  {task.status}
                </td>
                <td style={td}>100%</td>
                <td style={td}>{new Date(task.timestamp).toLocaleString()}</td>
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
  borderBottom: '1px solid #e2e8f0'
};

export default TaskLog;

// src/components/FeedbackLog.jsx
import React, { useState, useEffect } from 'react';

const FeedbackLog = () => {
  const [feedbackData, setFeedbackData] = useState([]);
  const [agents, setAgents] = useState({});
  const [tasks, setTasks] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAll = async () => {
      try {
        const [feedbackRes, agentsRes, taskRes] = await Promise.all([
          fetch('/api/feedback-log'),
          fetch('/api/agents'),
          fetch('/api/task-log')
        ]);

        const feedback = await feedbackRes.json();
        const agentList = await agentsRes.json();
        const taskList = await taskRes.json();

        // Create lookup maps
        const agentMap = {};
        agentList.forEach(agent => agentMap[agent.id] = agent.name);

        const taskMap = {};
        taskList.forEach(task => taskMap[task.id] = task.input_data);

        setFeedbackData(feedback);
        setAgents(agentMap);
        setTasks(taskMap);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching feedback data:', err);
        setLoading(false);
      }
    };

    fetchAll();
  }, []);

  const renderStars = (count) => '★'.repeat(count) + '☆'.repeat(5 - count);

  return (
    <div style={{ maxWidth: '1100px', margin: '60px auto', padding: '0 20px' }}>
      <h2 style={{
        textAlign: 'center',
        marginBottom: '30px',
        backgroundColor: '#2b6cb0',
        color: 'white',
        display: 'inline-block',
        padding: '8px 16px',
        borderRadius: '6px'
      }}>
        🧑‍💻 Agent Feedback Log
      </h2>

      {loading ? (
        <p style={{ textAlign: 'center' }}>Loading feedback...</p>
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
              <th style={th}>Agent</th>
              <th style={th}>Task</th>
              <th style={th}>Feedback</th>
              <th style={th}>Rating</th>
              <th style={th}>Timestamp</th>
            </tr>
          </thead>
          <tbody>
            {feedbackData.map(item => (
              <tr key={item.id}>
                <td style={td}>{agents[item.agent_id] || 'Unknown Agent'}</td>
                <td style={td}>{tasks[item.task_id] || 'Unknown Task'}</td>
                <td style={td}>{item.comment}</td>
                <td style={td}>{renderStars(item.rating)}</td>
                <td style={td}>{new Date(item.created_at).toLocaleString()}</td>
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

export default FeedbackLog;

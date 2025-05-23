// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginSelector from './components/LoginSelector';
import ControlRoom from './components/ControlRoom';
import PromptForm from './components/PromptForm';
import PodView from './components/PodView';
import AgentDetail from './components/AgentDetail';
import TaskLog from './components/TaskLog';
import FeedbackLog from './components/FeedbackLog';



function App() {
  return (
    <Router>
      <div>
        <h2>Welcome to Quintuple OS</h2>
        <Routes>
          <Route path="/" element={<LoginSelector />} />
          <Route path="/dashboard" element={<ControlRoom />} />
          <Route path="/prompt" element={<PromptForm />} />
          <Route path="/pod/:id" element={<PodView />} />
          <Route path="/agent/:id" element={<AgentDetail />} />
          <Route path="/tasks" element={<TaskLog />} />
          <Route path="/feedback" element={<FeedbackLog />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;

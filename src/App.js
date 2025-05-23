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
    <Router basename="/quintuple-os-mvp">
      <Routes>
        <Route path="/" element={<LoginSelector />} />
        <Route path="/dashboard" element={<ControlRoom />} />
        <Route path="/prompt" element={<PromptForm />} />
        <Route path="/pod/:id" element={<PodView />} />
        <Route path="/agent/:id" element={<AgentDetail />} />
        <Route path="/tasks" element={<TaskLog />} />
        <Route path="/feedback" element={<FeedbackLog />} />
        <Route path="*" element={<LoginSelector />} />
      </Routes>
    </Router>
  );
}

export default App;

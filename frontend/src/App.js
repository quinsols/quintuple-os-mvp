import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginSelector from './components/LoginSelector';
import ControlRoom from './components/ControlRoom.jsx';
import PromptFormSimulation from './components/PromptFormSimulation';
import PodView from './components/PodView';
import AgentDetail from './components/AgentDetail';
import TaskLog from './components/TaskLog';
import FeedbackLog from './components/FeedbackLog';
import Header from './components/Header';
import Footer from './components/Footer';

function App() {
  return (
    <Router basename="/quintuple-os-mvp">
      <div className="app-container">
        <Header />

        <main style={{ padding: '20px' }}>
          <Routes>
            {/* Landing Page */}
            <Route
              path="/"
              element={
                <div style={{ textAlign: 'center', marginTop: '100px' }}>
                  <h1>Welcome to Quintuple OS</h1>
                  <p>Run your business with AI-powered execution</p>
                  <a href="/quintuple-os-mvp/dashboard">
                    <button style={{
                      padding: '12px 24px',
                      fontSize: '16px',
                      marginTop: '20px',
                      cursor: 'pointer'
                    }}>
                      Launch App 🚀
                    </button>
                  </a>
                </div>
              }
            />

            <Route path="/dashboard" element={<ControlRoom />} />
            <Route path="/synthesizer" element={<PromptFormSimulation />} />
            <Route path="/pod/:id" element={<PodView />} />
            <Route path="/agent/:id" element={<AgentDetail />} />
            <Route path="/tasks" element={<TaskLog />} />
            <Route path="/feedback" element={<FeedbackLog />} />
            <Route path="*" element={<LoginSelector />} />
          </Routes>
        </main>

        <Footer />
      </div>
    </Router>
  );
}

export default App;

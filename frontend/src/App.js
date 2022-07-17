import React from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import WelcomePage from './pages/WelcomePage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import FindPasswordPage from './pages/FindPasswordPage';
import HomePage from './pages/HomePage';
import SettingsPage from './pages/SettingsPage';
import DashboardPage from './pages/DashboardPage';
import SavedJobs from './pages/SavedJobs';
function App() {
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/" element={<WelcomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/find_password" element={<FindPasswordPage />} />
          <Route path="/home" element={<HomePage />} />
          <Route path="/settings" element={<SettingsPage />} />
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/saved-jobs" element={<SavedJobs />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;

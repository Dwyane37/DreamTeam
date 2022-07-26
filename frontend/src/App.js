import React from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import WelcomePage from './pages/WelcomePage';
import SignInSide from './pages/SignIn';
import SignUp from './pages/SignUpPage';
// import RegisterPage from './pages/RegisterPage';
import FindPasswordPage from './pages/FindPasswordPage';
import HomePage from './pages/HomePage';
import SettingsPage from './pages/SettingsPage';
import AddJobPage from './pages/AddJobPage';
import EditJobPage from './pages/EditJobPage';
import DashboardPage from './pages/DashboardPage';
import SavedJobs from './pages/SavedJobs';
import ResumePage from './pages/ResumePage';
import FollowPage from './pages/FollowPage';
import { io } from 'socket.io-client';

function App() {
  const [socket, setSocket] = React.useState(null);

  React.useEffect(() => {
    console.log('connect');
    setSocket(io('http://localhost:5005'));
  }, []);

  return (
    <div>
      <Router>
        <Routes>
          <Route path="/" element={<SignInSide />} />
          <Route path="/login" element={<SignInSide />} />
          <Route path="/register" element={<SignUp />} />
          <Route path="/find_password" element={<FindPasswordPage />} />
          <Route path="/home" element={<HomePage socket={socket} />} />
          <Route path="/settings" element={<SettingsPage socket={socket} />} />
          <Route path="/addjob" element={<AddJobPage />} />
          <Route path="/editjob" element={<EditJobPage />} />
          <Route path="/dashboard" element={<DashboardPage socket={socket} />} />
          <Route path="/saved-jobs" element={<SavedJobs socket={socket} />} />
          <Route path="/" element={<WelcomePage />} />
          <Route path="/profile/:userId" element={<ResumePage socket={socket} />} />
          <Route path="/follow" element={<FollowPage socket={socket} />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;

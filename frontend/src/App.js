import React from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route, useNavigate, Link } from 'react-router-dom';

import SignInSide from './pages/SignIn';
import SignUp from './pages/SignUpPage';
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
import Snackbar from '@mui/material/Snackbar';

// import Link from '@mui/material/Link';

function App() {
  // const navigate = useNavigate();
  const [socket, setSocket] = React.useState(null);
  const [state, setState] = React.useState({ open: false, msg: '', hr: '' });
  const handleClose = () => {
    setState({ open: false, msg: '', hr: '' });
  };

  React.useEffect(() => {
    console.log('connect');
    setSocket(io('http://localhost:5005'));
  }, []);
  React.useEffect(() => {
    sessionStorage.getItem('id') ? socket?.emit('newUser', sessionStorage.getItem('id')) : null;
    socket?.on('getNotification', (res) => {
      const hr = res.sender;
      setState({ open: true, msg: 'Your followed employer just posted a new job', hr: hr });
    });
  }, [socket]);

  const action = (
    <Link style={{ color: 'white' }} onClick={handleClose} to={`/profile/${state.hr}`}>
      Click to view
    </Link>
  );

  return (
    <div>
      <Router>
        <Snackbar
          anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
          open={state.open}
          onClose={handleClose}
          message={state.msg}
          action={action}
        />
        <Routes>
          <Route path="/" element={<SignInSide />} />
          <Route path="/login" element={<SignInSide />} />
          <Route path="/register" element={<SignUp />} />
          <Route path="/find_password" element={<FindPasswordPage />} />
          <Route path="/home" element={<HomePage socket={socket} />} />
          <Route path="/settings" element={<SettingsPage socket={socket} />} />
          <Route path="/addjob" element={<AddJobPage socket={socket} />} />
          <Route path="/editjob/:jobId" element={<EditJobPage />} />
          <Route path="/dashboard" element={<DashboardPage socket={socket} />} />
          <Route path="/saved-jobs" element={<SavedJobs socket={socket} />} />
          <Route path="/profile/:userId" element={<ResumePage socket={socket} />} />
          <Route path="/follow" element={<FollowPage socket={socket} />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;

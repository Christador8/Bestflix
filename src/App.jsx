import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route, useNavigate } from 'react-router-dom';
import './index.css';
import Navbar from './components/Navbar/Navbar';
import Home from './pages/Home/Home';
import Login from './pages/Login/Login';
import Player from './pages/Player/Player';
import Signup from './pages/Signup.jsx';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './firebase';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';

function AppRoutes() {
const navigate = useNavigate(); ✅
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        console.log("User is signed in:", user);
        navigate('/');
      } else {
        console.log("No user is signed in.");
        navigate('/login');
      }
    });

    return () => unsubscribe();
  }, [navigate]);

  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/player/:id" element={<Player />} />
        <Route path="*" element={<h2 style={{ color: 'white' }}>404 - Page Not Found</h2>} />
      </Routes>
      <ToastContainer />
    </>
  );
}

function App() {
  return (
    <BrowserRouter basename="/Bestflix">
      <AppRoutes />
    </BrowserRouter>
  );
}

export default App;

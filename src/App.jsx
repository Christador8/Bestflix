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

/**
 * AppRoutes is rendered *inside* BrowserRouter, so useNavigate will work properly here.
 */
function AppRoutes() {
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      // Add a short delay to ensure Router is initialized
      setTimeout(() => {
        if (user) {
          console.log("User is signed in:", user);
          navigate('/');
        } else {
          console.log("No user is signed in.");
          navigate('/login');
        }
      }, 0);
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

/**
 * GitHub Pages requires a basename if you're deploying to a subpath like /Bestflix
 */
function App() {
  return (
    <BrowserRouter basename="/Bestflix">
      <AppRoutes />
    </BrowserRouter>
  );
}

export default App;

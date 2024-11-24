import './index.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { auth } from './Firebase'; // Firebase auth import
import { onAuthStateChanged } from 'firebase/auth';

import Profile from './pages/Profile';
import Portfolio from './pages/Portfolio';
// Import pages and components
import Login from './pages/Login';
import Signup from './pages/Signup';
import Home from './pages/Home';
import ProtectedRoute from './ProtectedRoute';
import Layout from './components/Layout';
import Welcome from './pages/Welcome';

function App() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            setIsLoggedIn(!!user);
        });

        return () => unsubscribe();
    }, []);

    return (
        <Router>
            <Layout isLoggedIn={isLoggedIn}> {/* Pass isLoggedIn to Layout */}
                <Routes>
                    <Route path="/" element={<Welcome />} />
                    <Route path="InvestmentWeb/" element={<Welcome />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/signup" element={<Signup />} />

                    {/* Protected route for authenticated users */}
                    <Route element={<ProtectedRoute isLoggedIn={isLoggedIn} />}>
                        <Route path="/home" element={<Home />} />
                        <Route path="/profile" element={<Profile />} />
                        <Route path="/portfolio" element={<Portfolio />} />
                    </Route>
                </Routes>
            </Layout>
        </Router>
    );
}

export default App;

import './index.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Home from './pages/Home';
import ProtectedRoute from './ProtectedRoute';

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Login />} />
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<Signup />} />

                {/* Protected route for authenticated users */}
                <Route element={<ProtectedRoute />}>
                    <Route path="/home" element={<Home />} />
                </Route>
            </Routes>
        </Router>
    );
}

export default App;

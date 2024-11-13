// Home.jsx
import { Button, Typography, Box } from '@mui/material';
import { signOut } from 'firebase/auth';
import { auth } from '../Firebase';
import { useNavigate } from 'react-router-dom';

function Home() {
    const navigate = useNavigate();

    const handleLogout = async () => {
        await signOut(auth);
        alert('Logged out successfully!');
        navigate('/login');
    };

    return (
        <Box className="flex flex-col items-center justify-center h-screen bg-gray-100">
            <Typography variant="h3" className="mb-4">Welcome to the Investment Platform</Typography>
            <Button variant="contained" color="secondary" onClick={handleLogout}>
                Logout
            </Button>
        </Box>
    );
}

export default Home;

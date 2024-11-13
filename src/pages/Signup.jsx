import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../Firebase';
import { Visibility, VisibilityOff } from '@mui/icons-material';

function Signup() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [error, setError] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const navigate = useNavigate();

    const validatePassword = (password) => {
        const hasUpperCase = /[A-Z]/.test(password);
        const hasLowerCase = /[a-z]/.test(password);
        const hasNumber = /\d/.test(password);
        const hasSpecialChar = /[@$!%*?&]/.test(password);
        const isValidLength = password.length >= 8;

        if (!password) return ''; // Don't display error if the field is empty

        let errorMessages = [];

        if (!isValidLength) errorMessages.push('at least 8 characters');
        if (!hasUpperCase) errorMessages.push('an uppercase letter');
        if (!hasLowerCase) errorMessages.push('a lowercase letter');
        if (!hasNumber) errorMessages.push('a number');
        if (!hasSpecialChar) errorMessages.push('a special character');

        if (errorMessages.length > 0) {
            return `Password must include: ${errorMessages.join(', ')}`;
        }

        return '';
    };

    const handlePasswordChange = (e) => {
        const newPassword = e.target.value;
        setPassword(newPassword);

        const errorMessage = validatePassword(newPassword);
        setPasswordError(errorMessage);
    };

    const handleSignup = async () => {
        if (password !== confirmPassword) {
            setError('Passwords do not match.');
            return;
        }

        if (passwordError) {
            setError('Password does not meet the required criteria.');
            return;
        }

        try {
            await createUserWithEmailAndPassword(auth, email, password);
            alert('Account created successfully!');
            navigate('/login');
        } catch (err) {
            setError('Signup failed. Try again.');
            console.error('Signup error:', err);
        }
    };

    return (
        <div className="flex justify-center items-center min-h-screen bg-gradient-to-r from-blue-500 to-indigo-600">
            <div className="w-full max-w-sm p-8 bg-white rounded-lg shadow-lg">
                <h2 className="text-2xl font-semibold text-center text-gray-700 mb-6">Create an Investment Account</h2>
                {error && <p className="text-center text-red-500 mb-4">{error}</p>}
                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full p-3 mb-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <div className="relative mb-4">
                    <input
                        type={showPassword ? 'text' : 'password'}
                        placeholder="Password"
                        value={password}
                        onChange={handlePasswordChange}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <button
                        type="button"
                        className="absolute right-3 top-1/2 transform -translate-y-1/2"
                        onClick={() => setShowPassword(!showPassword)}
                    >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                    </button>
                </div>
                {passwordError && (
                    <p className="text-red-500 text-sm mt-1">{passwordError}</p> // Error message after password field
                )}
                <div className="relative mb-6">
                    <input
                        type={showConfirmPassword ? 'text' : 'password'}
                        placeholder="Confirm Password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <button
                        type="button"
                        className="absolute right-3 top-1/2 transform -translate-y-1/2"
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    >
                        {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                    </button>
                </div>
                <button
                    className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition duration-300"
                    onClick={handleSignup}
                >
                    Sign Up
                </button>
                <p className="text-center text-sm text-gray-600 mt-4">
                    Already have an account?{' '}
                    <span
                        className="text-blue-500 cursor-pointer"
                        onClick={() => navigate('/login')}
                    >
                        Log In
                    </span>
                </p>
            </div>
        </div>
    );
}

export default Signup;

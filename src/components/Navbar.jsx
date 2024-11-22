import { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { auth } from '../Firebase';
import { signOut } from 'firebase/auth';
import { Menu, X, BarChart2, User } from 'lucide-react';

// eslint-disable-next-line react/prop-types
function Navbar({ isLoggedIn }) {
    const [showMenu, setShowMenu] = useState(false);
    const [showMobileMenu, setShowMobileMenu] = useState(false);
    const profileMenuRef = useRef(null);
    const navigate = useNavigate();

    useEffect(() => {
        const handleOutsideClick = (e) => {
            if (profileMenuRef.current && !profileMenuRef.current.contains(e.target)) {
                setShowMenu(false);
            }
        };
        document.addEventListener('click', handleOutsideClick);
        return () => document.removeEventListener('click', handleOutsideClick);
    }, []);

    const handleSignOut = async () => {
        try {
            await signOut(auth);
            navigate('/login');
        } catch (err) {
            console.error('Sign out error:', err);
        }
    };

    return (
        <nav className="fixed top-0 left-0 right-0 z-50 bg-gradient-to-r from-blue-700 to-indigo-800 shadow-lg">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-16">
                    <div className="flex items-center">
                        <Link to={isLoggedIn ? '/home' : '/'} className="flex-shrink-0 flex items-center">
                            <BarChart2 className="h-8 w-8 text-white mr-2" />
                            <span className="text-white text-xl font-extrabold tracking-tight">InvestPro</span>
                        </Link>
                        <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
                            {isLoggedIn ? (
                                <>
                                    <Link
                                        to="/dashboard"
                                        className="text-white hover:bg-blue-600 hover:text-white px-3 py-2 rounded-md text-sm font-medium transition duration-150 ease-in-out"
                                    >
                                        Dashboard
                                    </Link>
                                    <Link
                                        to="/profile"
                                        className="text-white hover:bg-blue-600 hover:text-white px-3 py-2 rounded-md text-sm font-medium transition duration-150 ease-in-out"
                                    >
                                        Profile
                                    </Link>
                                </>
                            ) : (
                                <>
                                    <Link
                                        to="/"
                                        className="text-white hover:bg-blue-600 hover:text-white px-3 py-2 rounded-md text-sm font-medium transition duration-150 ease-in-out"
                                    >
                                        About
                                    </Link>
                                    <Link
                                        to="/services"
                                        className="text-white hover:bg-blue-600 hover:text-white px-3 py-2 rounded-md text-sm font-medium transition duration-150 ease-in-out"
                                    >
                                        Services
                                    </Link>
                                </>
                            )}
                        </div>
                    </div>

                    <div className="hidden sm:ml-6 sm:flex sm:items-center">
                        {isLoggedIn ? (
                            <div className="ml-3 relative" ref={profileMenuRef}>
                                <button
                                    onClick={() => setShowMenu(!showMenu)}
                                    className="flex text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-blue-800 focus:ring-white"
                                >
                                    <User className="h-8 w-8 text-white bg-blue-600 rounded-full p-1" />
                                </button>
                                {showMenu && (
                                    <div
                                        className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5"
                                    >
                                        <Link
                                            to="/profile"
                                            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition duration-150 ease-in-out"
                                        >
                                            Your Profile
                                        </Link>
                                        <Link
                                            to="/settings"
                                            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition duration-150 ease-in-out"
                                        >
                                            Settings
                                        </Link>
                                        <button
                                            onClick={handleSignOut}
                                            className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition duration-150 ease-in-out"
                                        >
                                            Sign out
                                        </button>
                                    </div>
                                )}
                            </div>
                        ) : (
                            <Link
                                to="/login"
                                className="text-blue-800 bg-white hover:bg-blue-50 px-4 py-2 rounded-md text-sm font-medium transition duration-150 ease-in-out"
                            >
                                Login
                            </Link>
                        )}
                    </div>

                    <div className="-mr-2 flex items-center sm:hidden">
                        <button
                            onClick={() => setShowMobileMenu(!showMobileMenu)}
                            className="inline-flex items-center justify-center p-2 rounded-md text-white hover:bg-blue-600 focus:outline-none transition duration-150 ease-in-out"
                        >
                            {showMobileMenu ? (
                                <X className="block h-6 w-6" />
                            ) : (
                                <Menu className="block h-6 w-6" />
                            )}
                        </button>
                    </div>
                </div>
            </div>

            {showMobileMenu && (
                <div className="sm:hidden">
                    <div className="px-2 pt-2 pb-3 space-y-1">
                        {isLoggedIn ? (
                            <>
                                <Link
                                    to="/dashboard"
                                    className="text-white hover:bg-blue-600 block px-3 py-2 rounded-md text-base font-medium transition duration-150 ease-in-out"
                                >
                                    Dashboard
                                </Link>
                                <Link
                                    to="/profile"
                                    className="text-white hover:bg-blue-600 block px-3 py-2 rounded-md text-base font-medium transition duration-150 ease-in-out"
                                >
                                    Profile
                                </Link>
                                <button
                                    onClick={handleSignOut}
                                    className="text-white hover:bg-blue-600 block w-full text-left px-3 py-2 rounded-md text-base font-medium transition duration-150 ease-in-out"
                                >
                                    Sign out
                                </button>
                            </>
                        ) : (
                            <>
                                <Link
                                    to="/"
                                    className="text-white hover:bg-blue-600 block px-3 py-2 rounded-md text-base font-medium transition duration-150 ease-in-out"
                                >
                                    About
                                </Link>
                                <Link
                                    to="/services"
                                    className="text-white hover:bg-blue-600 block px-3 py-2 rounded-md text-base font-medium transition duration-150 ease-in-out"
                                >
                                    Services
                                </Link>
                                <Link
                                    to="/login"
                                    className="text-white hover:bg-blue-600 block px-3 py-2 rounded-md text-base font-medium transition duration-150 ease-in-out"
                                >
                                    Login
                                </Link>
                            </>
                        )}
                    </div>
                </div>
            )}
        </nav>
    );
}

export default Navbar;
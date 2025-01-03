import Navbar from './Navbar';
import PropTypes from 'prop-types';

const Layout = ({ children, isLoggedIn }) => {
    return (
        <div className="flex flex-col min-h-screen">
            <Navbar isLoggedIn={isLoggedIn} /> {/* Pass isLoggedIn to Navbar */}
            <main className="flex-grow">{children}</main>
        </div>
    );
};

Layout.propTypes = {
    children: PropTypes.node.isRequired,
    isLoggedIn: PropTypes.bool.isRequired,
};

export default Layout;

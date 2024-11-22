function FloatingMenu() {
    return (
        <div className="absolute top-10 right-0 bg-white shadow-lg rounded-md w-48 p-2 z-10">
            <ul>
                <li>
                    <a href="/profile" className="block px-4 py-2 text-black">Profile</a>
                </li>
                <li>
                    <a href="/settings" className="block px-4 py-2 text-black">Settings</a>
                </li>
                <li>
                    <a href="/logout" className="block px-4 py-2 text-black">Logout</a>
                </li>
            </ul>
        </div>
    );
}

export default FloatingMenu;

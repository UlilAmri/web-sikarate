    import { useState } from "react";
import { Link } from "react-router-dom";

    const Navbar = ({ role = "user", search, setSearch }) => {
    const [showDropdown, setShowDropdown] = useState(false);

    return (
        <header className="bg-white px-6 py-4 shadow-sm flex justify-between items-center">
        <div className="flex items-center gap-4">
            <h2 className="text-xl font-bold text-gray-800 capitalize">
            SIKARATE
            </h2>
            {/* <span className="text-sm text-gray-500 bg-gray-100 px-3 py-1 rounded">
            {role === "admin" ? "Admin" : "User"}
            </span> */}
        </div>
        <div className="flex items-center gap-4">
            <input
            type="text"
            placeholder="search"
            className="border px-3 py-2 rounded w-64"
            value={search}
            onChange={e => setSearch(e.target.value)}
            />
            <div className="relative">
            <button
                onClick={() => setShowDropdown(!showDropdown)}
                className="flex items-center space-x-2 text-gray-700 font-medium hover:text-blue-600 focus:outline-none"
            >
                <span>Account ▾</span>
            </button>
            {showDropdown && (
                <div className="absolute right-0 mt-2 w-40 bg-white border rounded-md shadow-md z-10">
                <Link
                    to="/edit-profil"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                >
                    Edit Profil
                </Link>
                <Link
                    to="/login"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                >
                    Logout
                </Link>
                </div>
            )}
            </div>
        </div>
        </header>
    );
    };

    export default Navbar;
import { DocumentTextIcon, HomeIcon, UserCircleIcon } from '@heroicons/react/24/outline';
import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

    const Dashboard = () => {
    const [showDropdown, setShowDropdown] = useState(false);
    const location = useLocation(); 

    const isActive = (path) => location.pathname === path;

    return (
        <div className="flex h-screen">
        <aside className="w-64 bg-blue-500 text-white p-6 hidden md:block">
            <h1 className="text-2xl font-bold mb-8">SIKARATE</h1>
            <nav className="space-y-4">
            <Link
                to="/dashboard"
                className={`flex items-center space-x-3 p-2 rounded-md ${
                isActive('/dashboard') ? 'bg-blue-700' : 'hover:bg-blue-600'
                }`}
            >
                <HomeIcon className="h-5 w-5" />
                <span>Dashboard</span>
            </Link>
            <Link
                to="/dashboardadmin"
                className={`flex items-center space-x-3 p-2 rounded-md ${
                isActive('/laporan') ? 'bg-blue-700' : 'hover:bg-blue-600'
                }`}
            >
                <DocumentTextIcon className="h-5 w-5" />
                <span>Laporan</span>
            </Link>
            </nav>
        </aside>

        <div className="flex-1 flex flex-col bg-gray-100">
            <header className="bg-white px-6 py-4 shadow-sm flex justify-between items-center">
            <h2 className="text-xl font-bold text-gray-800 capitalize">
                {location.pathname.replace('/', '') || 'dashboard'}
            </h2>
            <div className="relative">
                <button
                onClick={() => setShowDropdown(!showDropdown)}
                className="flex items-center space-x-2 text-gray-700 font-medium hover:text-blue-600 focus:outline-none"
                >
                <UserCircleIcon className="h-6 w-6 text-gray-700" />
                    <span>My Account ▾</span>
                </button>
                {showDropdown && (
                <div className="absolute right-0 mt-2 w-40 bg-white border rounded-md shadow-md z-10">
                    <a
                    href="/edit-profil"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                    Edit Profil
                    </a>
                    <a
                    href="/login"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                    Logout
                    </a>
                </div>
                )}
            </div>
            </header>

        
            <main className="p-6 flex-1 overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
                <Link
                    to="/tambahlaporan"
                    className="bg-blue-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-blue-700"
                >
                    + Laporan
                </Link>
            </div>
            <div className="mb-4">
                <input
                type="text"
                placeholder="Search"
                className="w-full max-w-3/4 px-4 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
                />
            </div>

            <div className="bg-white shadow-sm rounded-lg overflow-hidden">
                <table className="w-full">
                <thead className="bg-gray-100">
                    <tr>
                    <th className="text-center px-6 py-3 text-sm font-medium text-gray-600">No</th>
                    <th className="text-center px-6 py-3 text-sm font-medium text-gray-600">Pelapor</th>
                    <th className="text-center px-6 py-3 text-sm font-medium text-gray-600">Waktu Kejadian</th>
                    <th className="text-center px-6 py-3 text-sm font-medium text-gray-600">Lokasi</th>
                    <th className="text-center px-6 py-3 text-sm font-medium text-gray-600">Status Penanganan</th>
                    </tr>
                </thead>
                <tbody>
                    
                </tbody>
                </table>
            </div>
            </main>
        </div>
        </div>
    );
    };

    export default Dashboard;

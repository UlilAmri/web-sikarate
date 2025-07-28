    import { Link, useLocation } from "react-router-dom";
    import {
    HomeIcon,
    ClipboardDocumentListIcon,
    NewspaperIcon,
    CheckBadgeIcon,
    UserPlusIcon,
    PencilSquareIcon,
    } from "@heroicons/react/24/outline";

    const Sidebar = ({ role = "user", sidebarOpen = true }) => {
    const location = useLocation();
    const isActive = (path) => location.pathname === path;

    return (
        <aside className="w-64 bg-blue-600 text-white min-h-screen p-6 hidden md:block">
        <h1 className="text-2xl font-bold mb-8">SIKARATE</h1>
        <nav className="space-y-4">
            <Link
            to={role === "admin" ? "/dashboardadmin" : "/dashboard"}
            className={`flex items-center gap-3 px-4 py-2 rounded-md font-medium ${
                isActive(role === "admin" ? "/dashboardadmin" : "/dashboard")
                ? "bg-blue-800"
                : "hover:bg-blue-700"
            }`}
            >
            <HomeIcon className="h-5 w-5" />
            Dashboard
            </Link>
            {role === "admin" ? (
            <>
                <Link
                to="/daftarlaporan"
                className={`flex items-center gap-3 px-4 py-2 rounded-md font-medium ${
                    isActive("/daftarlaporan") ? "bg-blue-800" : "hover:bg-blue-700"
                }`}
                >
                <ClipboardDocumentListIcon className="h-5 w-5" />
                Kelola Laporan
                </Link>
                <Link
                to="/blog"
                className={`flex items-center gap-3 px-4 py-2 rounded-md font-medium ${
                    isActive("/blog") ? "bg-blue-800" : "hover:bg-blue-700"
                }`}
                >
                <NewspaperIcon className="h-5 w-5" />
                Kelola Blog
                </Link>
                <Link
                to="/verifikasi"
                className={`flex items-center gap-3 px-4 py-2 rounded-md font-medium ${
                    isActive("/verifikasi") ? "bg-blue-800" : "hover:bg-blue-700"
                }`}
                >
                <CheckBadgeIcon className="h-5 w-5" />
                Verifikasi Laporan
                </Link>
                <Link
                to="/daftaruser"
                className={`flex items-center gap-3 px-4 py-2 rounded-md font-medium ${
                    isActive("/daftaruser") ? "bg-blue-800" : "hover:bg-blue-700"
                }`}
                >
                <UserPlusIcon className="h-5 w-5" />
                Tambah User
                </Link>
            </>
            ) : (
            <>
                <Link
                to="/riwayatlaporan"
                className={`flex items-center gap-3 px-4 py-2 rounded-md font-medium ${
                    isActive("/riwayatlaporan") ? "bg-blue-800" : "hover:bg-blue-700"
                }`}
                >
                <PencilSquareIcon className="h-5 w-5" />
                Laporan 
                </Link>
            </>
            )}
        </nav>
        </aside>
    );
    };

    export default Sidebar;
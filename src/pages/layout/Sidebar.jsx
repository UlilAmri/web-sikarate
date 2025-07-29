    import {
    CheckBadgeIcon,
    ClipboardDocumentListIcon,
    HomeIcon,
    NewspaperIcon,
    UserPlusIcon
} from "@heroicons/react/24/outline";
import { Link, useLocation } from "react-router-dom";

    const Sidebar = ({ role = "user", sidebarOpen = true }) => {
    const location = useLocation();
    const isActive = (path) => location.pathname === path;

    return (
        <aside className="min-h-screen font-sans bg-gradient-to-br from-blue-400 to-cyan-600 text-white w-64 p-6 md:block">
        <h1 className="text-2xl font-bold mb-8">SIKARATE</h1>
        <nav className="space-y-4">
            {role === "admin" ? (
            <>
                <Link
                to="/dashboardadmin"
                className={`flex items-center gap-3 px-4 py-2 rounded-md font-medium ${
                    isActive("/dashboardadmin") ? "bg-blue-800" : "hover:bg-blue-700"
                }`}
                >
                <HomeIcon className="h-5 w-5" />
                Dashboard
                </Link>
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
                to="/daftarartikel"
                className={`flex items-center gap-3 px-4 py-2 rounded-md font-medium ${
                    isActive("/daftarartikel") ? "bg-blue-800" : "hover:bg-blue-700"
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
                <ClipboardDocumentListIcon className="h-5 w-5" />
                Riwayat Laporan
                </Link>
            </>
            )}
        </nav>
        </aside>
    );
    };

    export default Sidebar;

    import { Link, useLocation } from "react-router-dom";
    import {
    HomeIcon,
    ClipboardDocumentListIcon,
    NewspaperIcon,
    CheckBadgeIcon,
    UserPlusIcon,
    PencilSquareIcon,
    ClockIcon,
    EyeIcon,
    } from "@heroicons/react/24/outline";

    const Sidebar = ({ role = "user" }) => {
    const location = useLocation();
    const isActive = (path) => location.pathname === path;

    return (
        <aside className="w-64 bg-blue-600 text-white min-h-screen p-6 hidden md:block">
        <h1 className="text-2xl font-bold mb-8">SIKARATE</h1>
        <nav className="space-y-4">
            <Link
            to="/dashboard"
            className={`flex items-center gap-3 px-4 py-2 rounded-md font-medium ${
                isActive("/dashboard") ? "bg-blue-800" : "hover:bg-blue-700"
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
                    isActive("/daftar-laporan") ? "bg-blue-800" : "hover:bg-blue-700"
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
                    isActive("/users") ? "bg-blue-800" : "hover:bg-blue-700"
                }`}
                >
                <UserPlusIcon className="h-5 w-5" />
                Tambah User
                </Link>
            </>
            ) : (
            <>
                <Link
                to="/buat-laporan"
                className={`flex items-center gap-3 px-4 py-2 rounded-md font-medium ${
                    isActive("/buat-laporan") ? "bg-blue-800" : "hover:bg-blue-700"
                }`}
                >
                <PencilSquareIcon className="h-5 w-5" />
                Buat Laporan
                </Link>
                <Link
                to="/riwayat"
                className={`flex items-center gap-3 px-4 py-2 rounded-md font-medium ${
                    isActive("/riwayat") ? "bg-blue-800" : "hover:bg-blue-700"
                }`}
                >
                <ClockIcon className="h-5 w-5" />
                Riwayat Laporan
                </Link>
                <Link
                to="/status"
                className={`flex items-center gap-3 px-4 py-2 rounded-md font-medium ${
                    isActive("/status") ? "bg-blue-800" : "hover:bg-blue-700"
                }`}
                >
                <EyeIcon className="h-5 w-5" />
                Lihat Status
                </Link>
                <Link
                to="/blog"
                className={`flex items-center gap-3 px-4 py-2 rounded-md font-medium ${
                    isActive("/blog") ? "bg-blue-800" : "hover:bg-blue-700"
                }`}
                >
                <NewspaperIcon className="h-5 w-5" />
                Blog
                </Link>
            </>
            )}
        </nav>
        </aside>
    );
    };

    export default Sidebar;
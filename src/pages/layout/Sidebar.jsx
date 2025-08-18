import {
  CheckBadgeIcon,
  ClipboardDocumentListIcon,
  HomeIcon,
  NewspaperIcon,
  UserPlusIcon,
} from "@heroicons/react/24/outline";
import { Link, useLocation } from "react-router-dom";

const Sidebar = ({ role = "user" }) => {
  const location = useLocation();
  const isActive = (path) => location.pathname === path;

  return (
    <aside
      className="min-h-screen font-sans bg-gradient-to-br from-blue-400 to-cyan-600 text-white 
                 transition-all duration-300 w-64 md:w-64 sm:w-20 p-4"
    >
            {/* Header Sidebar */}
        <div className="flex items-left justify-center mb-8">
        {/* Logo muncul hanya di mobile */}
        <img 
            src="/logo.png" 
            alt="Logo SIKARATEKA" 
            className="h-12 w-12 object-contain block md:hidden"
        />

        {/* Tulisan muncul hanya di desktop */}
        <h1 className="text-xl font-bold hidden md:block">SIKARATEKA</h1>
        </div>

      {/* Navigation */}
      <nav className="space-y-4">
        {role === "admin" ? (
          <>
            <Link
              to="/dashboard-admin"
              className={`flex items-center gap-3 px-3 py-2 rounded-md font-medium ${
                isActive("/dashboard-admin")
                  ? "bg-blue-800"
                  : "hover:bg-blue-700"
              }`}
            >
              <HomeIcon className="h-5 w-5" />
              <span className="hidden md:inline">Dashboard</span>
            </Link>
            <Link
              to="/daftar-laporan"
              className={`flex items-center gap-3 px-3 py-2 rounded-md font-medium ${
                isActive("/daftar-laporan")
                  ? "bg-blue-800"
                  : "hover:bg-blue-700"
              }`}
            >
              <ClipboardDocumentListIcon className="h-5 w-5" />
              <span className="hidden md:inline">Kelola Laporan</span>
            </Link>
            <Link
              to="/daftar-artikel"
              className={`flex items-center gap-3 px-3 py-2 rounded-md font-medium ${
                isActive("/daftar-artikel")
                  ? "bg-blue-800"
                  : "hover:bg-blue-700"
              }`}
            >
              <NewspaperIcon className="h-5 w-5" />
              <span className="hidden md:inline">Kelola Blog</span>
            </Link>
            <Link
              to="/verifikasi"
              className={`flex items-center gap-3 px-3 py-2 rounded-md font-medium ${
                isActive("/verifikasi")
                  ? "bg-blue-800"
                  : "hover:bg-blue-700"
              }`}
            >
              <CheckBadgeIcon className="h-5 w-5" />
              <span className="hidden md:inline">Verifikasi Laporan</span>
            </Link>
            <Link
              to="/daftar-user"
              className={`flex items-center gap-3 px-3 py-2 rounded-md font-medium ${
                isActive("/daftar-user")
                  ? "bg-blue-800"
                  : "hover:bg-blue-700"
              }`}
            >
              <UserPlusIcon className="h-5 w-5" />
              <span className="hidden md:inline">Tambah User</span>
            </Link>
          </>
        ) : (
          <>
            <Link
              to="/riwayat-laporan"
              className={`flex items-center gap-3 px-3 py-2 rounded-md font-medium ${
                isActive("/riwayat-laporan")
                  ? "bg-blue-800"
                  : "hover:bg-blue-700"
              }`}
            >
              <ClipboardDocumentListIcon className="h-5 w-5" />
              <span className="hidden md:inline">Riwayat Laporan</span>
            </Link>
          </>
        )}
      </nav>
    </aside>
  );
};

export default Sidebar;

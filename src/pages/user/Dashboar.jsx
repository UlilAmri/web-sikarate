    import { useState } from "react";
import Navbar from "../layout/Navbar";
import Sidebar from "../layout/Sidebar";

    const Dashboard = () => {
    const [search, setSearch] = useState("");

    return (
        <div className="flex flex min-h-screen bg-gray-100">
        <Sidebar role="user" />
        <div className="flex-1 flex flex-col bg-gray-100">
            <Navbar role="user" search={search} setSearch={setSearch} />
            <main className="p-6 flex-1 overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold">Dashboard</h2>
                <a
                href="/formlaporan"
                className="bg-blue-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-blue-700"
                >
                + Laporan
                </a>
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
                    {/* backend */}
                </tbody>
                </table>
            </div>
            </main>
        </div>
        </div>
    );
    };

    export default Dashboard;
import { useState } from "react";
import Navbar from "../layout/Navbar";
import Sidebar from "../layout/Sidebar";

    const statusColor = {
    diproses: "bg-yellow-500",
    diverifikasi: "bg-green-500",
    ditolak: "bg-red-500",
    };

    const RiwayatLaporan = () => {
    const [search, setSearch] = useState("");
    // Data laporan user, nanti diisi dari backend
    const laporan = []; // kosong, nanti diisi dari backend

    return (
        <div className="flex h-screen">
        <Sidebar role="user" />
        <div className="flex-1 flex flex-col bg-gray-100">
            <Navbar role="user" search={search} setSearch={setSearch} />
            <main className="p-6 flex-1 overflow-y-auto">
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-bold">Laporan Saya</h2>
            </div>
            <div className="flex items-center justify-end mb-4">
                <a
                href="/formlaporan"
                className="bg-blue-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-blue-700"
                >
                + Laporan
                </a>
            </div>
            <div className="bg-white rounded-lg shadow overflow-x-auto">
                <table className="min-w-full">
                <thead className="bg-gray-50">
                    <tr>
                    <th className="px-4 py-3 text-center text-xs font-medium text-gray-500">No</th>
                    <th className="px-4 py-3 text-center text-xs font-medium text-gray-500">Lokasi</th>
                    <th className="px-4 py-3 text-center text-xs font-medium text-gray-500">Waktu Kejadian</th>
                    <th className="px-4 py-3 text-center text-xs font-medium text-gray-500">Deskripsi</th>
                    <th className="px-4 py-3 text-center text-xs font-medium text-gray-500">Status Penanganan</th>
                    </tr>
                </thead>
                <tbody>
                {laporan.length === 0 ? (
                    <tr>
                    <td colSpan={6} className="text-center py-8 text-gray-400">
                        Tidak ada laporan.
                    </td>
                    </tr>
                ) : (
                    laporan.map((lap, idx) => (
                    <tr key={lap.id_laporan} className="border-b hover:bg-gray-50">
                        <td className="px-4 py-3">{idx + 1}</td>
                        <td className="px-4 py-3">{lap.lokasi}</td>
                        <td className="px-4 py-3">{lap.waktu}</td>
                        <td className="px-4 py-3">{lap.deskripsi}</td>
                        <td className="px-4 py-3">
                        <span className={`inline-flex items-center gap-2`}>
                            <span className={`w-2 h-2 rounded-full ${statusColor[lap.status_penanganan] || "bg-gray-400"}`}></span>
                            {lap.status_penanganan || "-"}
                        </span>
                        </td>
                    </tr>
                    ))
                )}
                </tbody>
                </table>
            </div>
            </main>
        </div>
        </div>
    );
    };

    export default RiwayatLaporan;
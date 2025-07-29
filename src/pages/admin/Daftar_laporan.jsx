import { ArrowTopRightOnSquareIcon, PencilIcon, TrashIcon } from "@heroicons/react/24/outline";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../layout/Navbar";
import Sidebar from "../layout/Sidebar";


    const statusColor = {
    Disetujui: "bg-green-500",
    Diproses: "bg-yellow-500",
    Ditolak: "bg-red-500",
    Menunggu: "bg-gray-400",
    };

    const DaftarLaporan = () => {
    const navigate = useNavigate();

    const handlelaporan = () => {
    navigate("/tambahlaporanadmin"); //

    }
    const [search, setSearch] = useState("");
    // Data laporan akan diisi dari backend nanti
    const laporan = []; 

    return (
        <div className="flex h-screen">
        <Sidebar role="admin" />
        <div className="flex-1 flex flex-col bg-gray-100">
            <Navbar role="admin" search={search} setSearch={setSearch} />
            <main className="p-6 flex-1 overflow-y-auto">
            <div className="flex justify-between items-center mb-4">
                <div>
                <h2 className="text-2xl font-bold">Daftar Laporan</h2>
                </div>
                <button className="bg-blue-600 text-white px-4 py-2 rounded font-semibold hover:bg-blue-700 " onClick={handlelaporan}>
                + LAPORAN BARU
                </button>
            </div>
            <div className="bg-white rounded-lg shadow overflow-x-auto">
                <table className="min-w-full">
                <thead className="bg-gray-50">
                    <tr>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500">No</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500">Nama Pelapor</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500">Status</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500">Jenis</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500">Lokasi</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500">Waktu Kejadian</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500">Aksi</th>
                    </tr>
                </thead>
                <tbody>
                    {laporan.length === 0 ? (
                    <tr>
                        <td colSpan={8} className="text-center py-8 text-gray-400">
                        Tidak ada data laporan.
                        </td>
                    </tr>
                    ) : (
                    laporan
                        .filter(lap =>
                        lap.nama.toLowerCase().includes(search.toLowerCase()) ||
                        lap.lokasi.toLowerCase().includes(search.toLowerCase())
                        )
                        .map((lap, idx) => (
                        <tr key={lap.id_laporan} className="border-b hover:bg-gray-50">
                            <td className="px-4 py-3">{idx + 1}</td>
                            <td className="px-4 py-3">{lap.nama}</td>
                            <td className="px-4 py-3">
                            <span className={`inline-flex items-center gap-2`}>
                                <span className={`w-2 h-2 rounded-full ${statusColor[lap.status] || "bg-gray-400"}`}></span>
                                {lap.status}
                            </span>
                            </td>
                            <td className="px-4 py-3">{lap.jenis}</td>
                            <td className="px-4 py-3">{lap.lokasi}</td>
                            <td className="px-4 py-3">{lap.waktu}</td>
                            <td className="px-4 py-3 flex gap-2">
                            <button className="p-1 hover:bg-gray-200 rounded" title="Detail">
                                <ArrowTopRightOnSquareIcon className="h-5 w-5 text-blue-600" />
                            </button>
                            <button className="p-1 hover:bg-gray-200 rounded" title="Edit">
                                <PencilIcon className="h-5 w-5 text-green-600" />
                            </button>
                            <button className="p-1 hover:bg-gray-200 rounded" title="Hapus">
                                <TrashIcon className="h-5 w-5 text-red-600" />
                            </button>
                            </td>
                        </tr>
                        ))
                    )}
                </tbody>
                </table>
            </div>
            {/* Pagination */}
            <div className="flex justify-between items-center mt-4">
                <div className="flex gap-2">
                <button className="px-3 py-1 rounded border bg-gray-100">1</button>
                <button className="px-3 py-1 rounded border">2</button>
                <button className="px-3 py-1 rounded border">3</button>
                </div>
                <div>
                <select className="border rounded px-2 py-1">
                    <option>10</option>
                    <option>20</option>
                    <option>50</option>
                </select>
                <span className="ml-2 text-gray-500">/Page</span>
                </div>
            </div>
            </main>
        </div>
        </div>
    );
    };

    export default DaftarLaporan;
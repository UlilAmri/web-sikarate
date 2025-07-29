    import { PencilIcon, TrashIcon } from "@heroicons/react/24/outline";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../layout/Navbar";
import Sidebar from "../layout/Sidebar";

    const DaftarBerita = () => {
    const [search, setSearch] = useState("");
    const navigate = useNavigate();

    const berita = []; // This will hold the news data

    return (
        <div className="flex h-screen">
        <Sidebar role="admin" />
        <div className="flex-1 flex flex-col bg-gray-100">
            <Navbar role="admin" search={search} setSearch={setSearch} />
            <main className="p-6 flex-1 overflow-y-auto">
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-bold">Daftar Artikel</h2>
                <button
                className="bg-blue-600 text-white px-4 py-2 rounded font-semibold hover:bg-blue-700"
                onClick={() => navigate("/tambahartikel")}
                >
                + Tambah Artikel
                </button>
            </div>
            <div className="bg-white rounded-lg shadow overflow-x-auto">
                <table className="min-w-full">
                <thead className="bg-gray-50">
                    <tr>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500">No</th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500">Judul</th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500">Aksi</th>
                    </tr>
                </thead>
                <tbody>
                    {berita.length === 0 ? (
                    <tr>
                        <td colSpan={2} className="text-center py-8 text-gray-400">
                        Tidak ada data berita.
                        </td>
                    </tr>
                    ) : (
                    berita
                        .filter((item) =>
                        item.title.toLowerCase().includes(search.toLowerCase())
                        )
                        .map((item, idx) => (
                        <tr key={item.id} className="border-b hover:bg-gray-50">
                            <td className="px-4 py-3">{item.title}</td>
                            <td className="px-4 py-3 flex gap-2">
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
            </main>
        </div>
        </div>
    );
    };

    export default DaftarBerita;

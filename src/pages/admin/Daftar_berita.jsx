    import { PencilIcon, TrashIcon } from "@heroicons/react/24/outline";
import { useState } from "react";
import Navbar from "../layout/Navbar";
import Sidebar from "../layout/Sidebar";

    const DaftarBerita = () => {
    const [search, setSearch] = useState("");
    const [modalOpen, setModalOpen] = useState(false);
    const [judul, setJudul] = useState("");
    const [isi, setIsi] = useState("");

    const berita = []; // 

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Judul:", judul);
        console.log("Isi:", isi);
        setModalOpen(false);
    };

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
                onClick={() => setModalOpen(true)}
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
                        <td colSpan={3} className="text-center py-8 text-gray-400">
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
                            <td className="px-4 py-3">{idx + 1}</td>
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

            {modalOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
                <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-xl">
                    <h3 className="text-xl font-semibold mb-4">Tambah Artikel</h3>
                    <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Judul</label>
                        <input
                        type="text"
                        value={judul}
                        onChange={(e) => setJudul(e.target.value)}
                        required
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring focus:ring-blue-200 focus:outline-none"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Isi Berita</label>
                        <textarea
                        value={isi}
                        onChange={(e) => setIsi(e.target.value)}
                        required
                        rows={6}
                        className="w-full px-4 py-2 border border-gray-300 rounded-md resize-y focus:ring focus:ring-blue-200 focus:outline-none"
                        ></textarea>
                    </div>
                    <div className="flex justify-end gap-2">
                        <button
                        type="button"
                        onClick={() => setModalOpen(false)}
                        className="px-4 py-2 border rounded-md text-gray-700 hover:bg-gray-100"
                        >
                        Batal
                        </button>
                        <button
                        type="submit"
                        className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                        >
                        Simpan
                        </button>
                    </div>
                    </form>
                </div>
                </div>
            )}
            </main>
        </div>
        </div>
    );
    };

    export default DaftarBerita;

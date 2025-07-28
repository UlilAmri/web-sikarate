    import { useState } from "react";
    import { useNavigate } from "react-router-dom";
    import Sidebar from "./layout/Sidebar";
    import Navbar from "./layout/Navbar";
    import { PencilIcon, TrashIcon } from "@heroicons/react/24/outline";

    const DaftarUser = () => {
    const [search, setSearch] = useState("");
    const navigate = useNavigate();

    // Data user akan diisi dari backend nanti
    const users = []; // kosong, nanti diisi dari backend

    return (
        <div className="flex h-screen">
        <Sidebar role="admin" />
        <div className="flex-1 flex flex-col bg-gray-100">
            <Navbar role="admin" search={search} setSearch={setSearch} />
            <main className="p-6 flex-1 overflow-y-auto">
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-bold">Daftar User</h2>
                <button
                className="bg-blue-600 text-white px-4 py-2 rounded font-semibold hover:bg-blue-700"
                onClick={() => navigate("/tambahuser")}
                >
                + Tambah User
                </button>
            </div>
            <div className="flex justify-between items-center mb-2">
                <div></div>
                <input
                type="text"
                placeholder="Cari user..."
                className="border px-3 py-2 rounded w-64"
                value={search}
                onChange={e => setSearch(e.target.value)}
                />
            </div>
            <div className="bg-white rounded-lg shadow overflow-x-auto">
                <table className="min-w-full">
                <thead className="bg-gray-50">
                    <tr>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500">No</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500">Nama</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500">Email</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500">Role</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500">Status</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500">Aksi</th>
                    </tr>
                </thead>
                <tbody>
                    {users.length === 0 ? (
                    <tr>
                        <td colSpan={6} className="text-center py-8 text-gray-400">
                        Tidak ada data user.
                        </td>
                    </tr>
                    ) : (
                    users
                        .filter(user =>
                        user.nama.toLowerCase().includes(search.toLowerCase()) ||
                        user.email.toLowerCase().includes(search.toLowerCase())
                        )
                        .map((user, idx) => (
                        <tr key={user.id_user} className="border-b hover:bg-gray-50">
                            <td className="px-4 py-3">{idx + 1}</td>
                            <td className="px-4 py-3">{user.nama}</td>
                            <td className="px-4 py-3">{user.email}</td>
                            <td className="px-4 py-3 capitalize">{user.role}</td>
                            <td className="px-4 py-3 capitalize">{user.status}</td>
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

    export default DaftarUser;

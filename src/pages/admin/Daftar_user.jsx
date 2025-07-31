import { PencilIcon, TrashIcon } from "@heroicons/react/24/outline";
import axios from "axios";
import { useEffect, useState } from "react";
import Navbar from "../layout/Navbar";
import Sidebar from "../layout/Sidebar";

    const DaftarUser = () => {
    const [search, setSearch] = useState("");
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showModal, setShowModal] = useState(false);
        const [form, setForm] = useState({
            nama: "",
            email: "",
            password: "",
            role: "",
        });
    const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

    useEffect(() => {
        const fetchUsers = async () => {
        try {
            const token = localStorage.getItem("token");
            const res = await axios.get("https://api-sikarate.mydemoapp.site/user/", {
            headers: {
                Authorization: `Bearer ${token}`,
            },
            });
            setUsers(res.data.data || []);
        } catch (error) {
            console.error("Gagal mengambil data user:", error);
            setUsers([]);
        } finally {
            setLoading(false);
        }
        };

        fetchUsers();
    }, []);

    const filteredUsers = users.filter(
        (user) =>
        user.nama.toLowerCase().includes(search.toLowerCase()) ||
        user.email.toLowerCase().includes(search.toLowerCase())
    );
    const handleSubmit = async (e) => {
        e.preventDefault();
        const token = localStorage.getItem("token");

        try {
        const response = await fetch("https://api-sikarate.mydemoapp.site/user/", {
            method: "POST",
            headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({
            email: form.email,
            password: form.password,
            nama: form.nama,
            role: form.role,
            }),
        });

        if (response.ok) {
            setForm({ nama: "", email: "", password: "", role: "" });
            alert("User berhasil ditambahkan!");
            setShowModal(false);
        } else {
            const errData = await response.json();
            alert(`Gagal menambahkan user: ${errData.message || "Terjadi kesalahan"}`);
        }
        } catch (error) {
        alert("Terjadi kesalahan jaringan. Coba lagi nanti.");
        }
    };


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
                onClick={() => setShowModal(true)}
                >
                + Tambah User
                </button>
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
                    {loading ? (
                    <tr>
                        <td colSpan={6} className="text-center py-8 text-gray-400">
                        Memuat data...
                        </td>
                    </tr>
                    ) : filteredUsers.length === 0 ? (
                    <tr>
                        <td colSpan={6} className="text-center py-8 text-gray-400">
                        Tidak ada data user.
                        </td>
                    </tr>
                    ) : (
                    filteredUsers.map((user, idx) => (
                        <tr key={user.id_user} className="border-b hover:bg-gray-50">
                        <td className="px-4 py-3">{idx + 1}</td>
                        <td className="px-4 py-3">{user.nama}</td>
                        <td className="px-4 py-3">{user.email}</td>
                        <td className="px-4 py-3 capitalize">{user.role}</td>
                        <td className="px-4 py-3 capitalize">
                            {user.status === 1 ? "Aktif" : "Nonaktif"}
                        </td>
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
              {/* Modal Tambah User */}
          {showModal && (
            <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
              <div className="bg-white p-6 rounded-lg shadow max-w-md w-full relative">
                <h3 className="text-lg font-semibold mb-4">Tambah User</h3>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Nama</label>
                    <input
                      type="text"
                      name="nama"
                      value={form.nama}
                      onChange={handleChange}
                      required
                      className="w-full border border-gray-300 rounded px-3 py-2"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Email</label>
                    <input
                      type="email"
                      name="email"
                      value={form.email}
                      onChange={handleChange}
                      required
                      className="w-full border border-gray-300 rounded px-3 py-2"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Password</label>
                    <input
                      type="password"
                      name="password"
                      value={form.password}
                      onChange={handleChange}
                      required
                      className="w-full border border-gray-300 rounded px-3 py-2"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Role</label>
                    <select
                      name="role"
                      value={form.role}
                      onChange={handleChange}
                      className="w-full border border-gray-300 rounded px-3 py-2"
                    >
                      <option value="user">User</option>
                      <option value="admin">Admin</option>
                    </select>
                  </div>
                  <div className="flex justify-end gap-2 pt-2">
                    <button
                      type="button"
                      onClick={() => setShowModal(false)}
                      className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
                    >
                      Batal
                    </button>
                    <button
                      type="submit"
                      className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
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

    export default DaftarUser;
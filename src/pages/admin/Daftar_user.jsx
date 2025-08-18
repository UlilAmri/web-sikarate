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
  const [isEditing, setIsEditing] = useState(false);
  const [editUserId, setEditUserId] = useState(null);

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

  useEffect(() => {
    fetchUsers();
  }, []);

  const filteredUsers = users.filter(
    (user) =>
      user.nama.toLowerCase().includes(search.toLowerCase()) ||
      user.email.toLowerCase().includes(search.toLowerCase())||
      user.password.toLowerCase().includes(search.toLowerCase())||
      user.role.toLowerCase().includes(search.toLowerCase())
  );
  const token = localStorage.getItem("token");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");

    const url = isEditing
      ? `https://api-sikarate.mydemoapp.site/user/${editUserId}`
      : "https://api-sikarate.mydemoapp.site/user/";
    const method = isEditing ? "PUT" : "POST";
    
    try {
      const response = await fetch(url, {
        method,
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
        setShowModal(false);
        setIsEditing(false);
        setEditUserId(null);
        alert(isEditing ? "User berhasil diubah!" : "User berhasil ditambahkan!");
        fetchUsers();
      } else {
        const errData = await response.json();
        alert(`Gagal menyimpan data: ${errData.message || "Terjadi kesalahan"}`);
      }
    } catch (error) {
      alert("Terjadi kesalahan jaringan. Coba lagi nanti.");
    }
  };

  const handleEdit = (user) => {
    setForm({
      nama: user.nama,
      email: user.email,
      password: user.password,
      role: user.role,
    });
    setEditUserId(user.id_user);
    setIsEditing(true);
    setShowModal(true);
  };

  
  const handleDelete = async (id) => {
    const konfirmasi = window.confirm("Apakah Anda yakin ingin menghapus user ini?");
    if (!konfirmasi) return;

    try {
      await axios.delete(`https://1api-sikarate.mydemoapp.site/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      alert("User berhasil dihapus!");
      fetchUsers();
    } catch (error) {
      console.error("Gagal menghapus User:", error);
      alert("Terjadi kesalahan saat menghapus User.");
    }
  };

  return (
     <div className="flex full-screen">
    {/* Sidebar selalu full height */}
    <Sidebar role="admin" />

    {/* Konten utama */}
    <div className="flex-1 flex flex-col bg-gray-100 min-h-screen">
      <Navbar role="admin" search={search} setSearch={setSearch} />

      <main className="p-6 flex-1 overflow-y-auto min-h-screen">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-bold">Daftar User</h2>
            <button
              className="bg-blue-600 text-white px-4 py-2 rounded font-semibold hover:bg-blue-700"
              onClick={() => {
                setShowModal(true);
                setIsEditing(false);
                setForm({ nama: "", email: "", password: "", role: "" });
              }}
            >
              + Tambah User
            </button>
          </div>

          <div className="bg-white rounded-lg shadow overflow-x-auto ">
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
                      <td className="px-4 py-3 capitalize">{user.role || user.Role}</td>
                      <td className="px-4 py-3 capitalize">
                        {user.status === 1 ? "Aktif" : "Nonaktif"}
                      </td>
                      <td className="px-4 py-3 flex gap-2">
                        <button
                          className="p-1 hover:bg-gray-200 rounded"
                          title="Edit"
                          onClick={() => handleEdit(user)}
                        >
                          <PencilIcon className="h-5 w-5 text-green-600" />
                        </button>
                        <button
                          className="p-1 hover:bg-gray-200 rounded"
                          title="Hapus"
                          onClick={() => handleDelete(user.id_user)}
                        >
                          <TrashIcon className="h-5 w-5 text-red-600" />
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

          {/* Modal Tambah/Edit User */}
          {showModal && (
            <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
              <div className="bg-white p-6 rounded-lg shadow max-w-md w-full relative">
                <h3 className="text-lg font-semibold mb-4">
                  {isEditing ? "Edit User" : "Tambah User"}
                </h3>
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
                      <option value="">Pilih Role</option>
                      <option value="user">User</option>
                      <option value="admin">Admin</option>
                    </select>
                  </div>
                  <div className="flex justify-end gap-2 pt-2">
                    <button
                      type="button"
                      onClick={() => {
                        setShowModal(false);
                        setIsEditing(false);
                        setEditUserId(null);
                        setForm({ nama: "", email: "", password: "", role: "" });
                      }}
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
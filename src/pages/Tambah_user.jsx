    import { useState } from "react";
    import Sidebar from "./layout/Sidebar";
    import Navbar from "./layout/Navbar";

    const TambahUser = () => {
    const [form, setForm] = useState({
        nama: "",
        email: "",
        password: "",
        status: "aktif",
        role: "user",
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm({ ...form, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Nanti kirim ke backend di sini
        alert("User berhasil ditambahkan!");
    };

    return (
        <div className="flex h-screen">
        <Sidebar role="admin" />
        <div className="flex-1 flex flex-col bg-gray-100">
            <Navbar role="admin" />
            <main className="p-6 flex-1 overflow-y-auto">
            <div className="max-w-lg mx-auto bg-white rounded-lg shadow p-8">
                <h2 className="text-2xl font-bold mb-4 text-center text-blue-700">Tambah User Baru</h2>
                <form className="space-y-5" onSubmit={handleSubmit}>
                <div>
                    <label className="block font-medium mb-1 text-gray-700">Nama</label>
                    <input
                    type="text"
                    name="nama"
                    value={form.nama}
                    onChange={handleChange}
                    className="w-full border border-gray-300 rounded px-3 py-2"
                    required
                    />
                </div>
                <div>
                    <label className="block font-medium mb-1 text-gray-700">Email</label>
                    <input
                    type="email"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    className="w-full border border-gray-300 rounded px-3 py-2"
                    required
                    />
                </div>
                <div>
                    <label className="block font-medium mb-1 text-gray-700">Password</label>
                    <input
                    type="password"
                    name="password"
                    value={form.password}
                    onChange={handleChange}
                    className="w-full border border-gray-300 rounded px-3 py-2"
                    required
                    />
                </div>
                <div>
                    <label className="block font-medium mb-1 text-gray-700">Status</label>
                    <select
                    name="status"
                    value={form.status}
                    onChange={handleChange}
                    className="w-full border border-gray-300 rounded px-3 py-2"
                    >
                    <option value="aktif">Aktif</option>
                    <option value="nonaktif">Nonaktif</option>
                    </select>
                </div>
                <div>
                    <label className="block font-medium mb-1 text-gray-700">Role</label>
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
                <div className="text-right">
                    <button
                    type="submit"
                    className="bg-blue-600 text-white px-6 py-2 rounded-lg font-semibold hover:bg-blue-700 transition"
                    >
                    Simpan User
                    </button>
                </div>
                </form>
            </div>
            </main>
        </div>
        </div>
    );
    };

    export default TambahUser;
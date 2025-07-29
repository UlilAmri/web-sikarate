    import { useState } from "react";
    import Navbar from "../layout/Navbar";
    import Sidebar from "../layout/Sidebar";

    const TambahLaporanAdmin = () => {
    const [formData, setFormData] = useState({
        nama: "",
        judul: "",
        lokasi: "",
        waktu: "",
        jenis: "",
        deskripsi: "",
        lampiran: null,
        statusPenanganan: "",
    });

    const handleChange = (e) => {
        const { name, value, files } = e.target;
        setFormData({
        ...formData,
        [name]: name === "lampiran" ? files[0] : value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        alert("Laporan berhasil ditambahkan:\n" + JSON.stringify(formData, null, 2));
        // Reset
        setFormData({
        nama: "",
        judul: "",
        lokasi: "",
        waktu: "",
        jenis: "",
        deskripsi: "",
        lampiran: null,
        statusPenanganan: "",
        });
    };

    return (
        <div className="flex h-screen w-screen bg-gray-50">
        <Sidebar role="admin" />
        <div className="flex flex-col flex-1">
            <Navbar role="admin" />
            <main className="flex-1 overflow-y-auto p-6 md:p-10">
            <h1 className="text-2xl font-bold text-gray-800 mb-6">Tambah Laporan</h1>
            <form
                onSubmit={handleSubmit}
                className="w-full bg-white p-6 md:p-8 rounded-xl shadow-lg grid grid-cols-1 md:grid-cols-2 gap-6"
            >
                {/* Nama Pelapor */}
                <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Nama Pelapor</label>
                <input
                    type="text"
                    name="nama"
                    value={formData.nama}
                    onChange={handleChange}
                    required
                    className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                </div>

                {/* Judul Laporan */}
                <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Judul Laporan</label>
                <input
                    type="text"
                    name="judul"
                    value={formData.judul}
                    onChange={handleChange}
                    required
                    className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                </div>

                {/* Lokasi */}
                <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Lokasi Kejadian</label>
                <input
                    type="text"
                    name="lokasi"
                    value={formData.lokasi}
                    onChange={handleChange}
                    required
                    className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                </div>

                {/* Waktu */}
                <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Waktu Kejadian</label>
                <input
                    type="datetime-local"
                    name="waktu"
                    value={formData.waktu}
                    onChange={handleChange}
                    required
                    className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                </div>

                {/* Jenis */}
                <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Jenis Kejadian</label>
                <select
                    name="jenis"
                    value={formData.jenis}
                    onChange={handleChange}
                    required
                    className="w-full border border-gray-300 rounded-lg px-4 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                    <option value="">Pilih jenis</option>
                    <option value="Kebakaran">Kebakaran</option>
                    <option value="Banjir">Banjir</option>
                    <option value="Kecelakaan">Kecelakaan</option>
                    <option value="Lainnya">Lainnya</option>
                </select>
                </div>

                {/* Status Penanganan */}
                <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Status Penanganan</label>
                <select
                    name="statusPenanganan"
                    value={formData.statusPenanganan}
                    onChange={handleChange}
                    required
                    className="w-full border border-gray-300 rounded-lg px-4 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                    <option value="">Pilih status</option>
                    <option value="Menunggu">Menunggu</option>
                    <option value="Diproses">Diproses</option>
                    <option value="Disetujui">Disetujui</option>
                    <option value="Ditolak">Ditolak</option>
                </select>
                </div>

                {/* Deskripsi */}
                <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">Deskripsi</label>
                <textarea
                    name="deskripsi"
                    value={formData.deskripsi}
                    onChange={handleChange}
                    rows={4}
                    className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                ></textarea>
                </div>

                {/* Lampiran */}
                <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">Lampiran</label>
                <input
                    type="file"
                    name="lampiran"
                    onChange={handleChange}
                    className="w-full"
                />
                </div>

                {/* Submit */}
                <div className="md:col-span-2 flex justify-end">
                <button
                    type="submit"
                    className="bg-blue-600 text-white px-6 py-2 rounded-lg font-semibold hover:bg-blue-700 transition"
                >
                    Tambahkan Laporan
                </button>
                </div>
            </form>
            </main>
        </div>
        </div>
    );
    };

    export default TambahLaporanAdmin;

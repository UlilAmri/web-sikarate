    import { useState } from "react";
    import Navbar from "../layout/Navbar";
    import Sidebar from "../layout/Sidebar";

    const statusColor = {
    diproses: "bg-yellow-500",
    diverifikasi: "bg-green-500",
    ditolak: "bg-red-500",
    };

    const DaftarLaporan = () => {
    const [search, setSearch] = useState("");
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [formData, setFormData] = useState({
        nama: "",
        judul: "",
        lokasi: "",
        jenis_kejadian: "",
        waktu: "",
        deskripsi: "",
        status_penanganan: "diproses",
        lampiran: null,
    });

    const laporan = [];

    const handleFormChange = (e) => {
        const { name, value, files } = e.target;
        setFormData({
        ...formData,
        [name]: files ? files[0] : value,
        });
    };

    const handleFormSubmit = (e) => {
        e.preventDefault();
        alert("Laporan berhasil ditambahkan");
        setIsModalOpen(false);
    };

    return (
        <div className="flex h-screen">
        <Sidebar role="admin" />
        <div className="flex-1 flex flex-col bg-gray-100">
            <Navbar role="admin" search={search} setSearch={setSearch} />
            <main className="p-4 sm:p-6 flex-1 overflow-y-auto">
            <div className="flex flex-col sm:flex-row justify-between items-center mb-4 gap-2">
                <h2 className="text-2xl font-bold">Daftar Laporan</h2>
                <button
                onClick={() => setIsModalOpen(true)}
                className="bg-blue-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-blue-700"
                >
                + Tambah Laporan
                </button>
            </div>

            <div className="bg-white rounded-lg shadow overflow-x-auto">
                <table className="min-w-full text-sm">
                <thead className="bg-gray-50">
                    <tr>
                    <th className="px-4 py-3 text-center font-medium text-gray-500">No</th>
                    <th className="px-4 py-3 text-center font-medium text-gray-500">Nama</th>
                    <th className="px-4 py-3 text-center font-medium text-gray-500">Jenis</th>
                    <th className="px-4 py-3 text-center font-medium text-gray-500">Lokasi</th>
                    <th className="px-4 py-3 text-center font-medium text-gray-500">Waktu</th>
                    <th className="px-4 py-3 text-center font-medium text-gray-500">Deskripsi</th>
                    <th className="px-4 py-3 text-center font-medium text-gray-500">Status</th>
                    </tr>
                </thead>
                <tbody>
                    {laporan.length === 0 ? (
                    <tr>
                        <td colSpan={7} className="text-center py-8 text-gray-400">
                        Tidak ada laporan.
                        </td>
                    </tr>
                    ) : (
                    laporan.map((lap, idx) => (
                        <tr key={lap.id_laporan} className="border-b hover:bg-gray-50">
                        <td className="px-4 py-3 text-center">{idx + 1}</td>
                        <td className="px-4 py-3">{lap.nama}</td>
                        <td className="px-4 py-3">{lap.jenis_kejadian}</td>
                        <td className="px-4 py-3">{lap.lokasi}</td>
                        <td className="px-4 py-3">{lap.waktu}</td>
                        <td className="px-4 py-3">{lap.deskripsi}</td>
                        <td className="px-4 py-3 text-center">
                            <span className={`inline-flex items-center gap-2`}>
                            <span
                                className={`w-2 h-2 rounded-full ${
                                statusColor[lap.status_penanganan] || "bg-gray-400"
                                }`}
                            ></span>
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

        {/* Modal Tambah Laporan */}
        {isModalOpen && (
            <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-xl shadow-lg w-full max-w-2xl overflow-y-auto max-h-[90vh]">
                <div className="flex justify-between items-center p-4 border-b">
                <h3 className="text-lg font-semibold">Tambah Laporan</h3>
                <button
                    onClick={() => setIsModalOpen(false)}
                    className="text-gray-400 hover:text-gray-700"
                >
                    ✕
                </button>
                </div>
                <form onSubmit={handleFormSubmit} className="p-4 space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                    <label className="block text-sm font-medium">Nama Pelapor</label>
                    <input
                        type="text"
                        name="nama"
                        value={formData.nama}
                        onChange={handleFormChange}
                        required
                        className="w-full mt-1 border border-gray-300 rounded px-3 py-2"
                    />
                    </div>
                    <div>
                    <label className="block text-sm font-medium">Judul Laporan</label>
                    <input
                        type="text"
                        name="judul"
                        value={formData.judul}
                        onChange={handleFormChange}
                        required
                        className="w-full mt-1 border border-gray-300 rounded px-3 py-2"
                    />
                    </div>
                    <div>
                    <label className="block text-sm font-medium">Lokasi Kejadian</label>
                    <input
                        type="text"
                        name="lokasi"
                        value={formData.lokasi}
                        onChange={handleFormChange}
                        required
                        className="w-full mt-1 border border-gray-300 rounded px-3 py-2"
                    />
                    </div>
                    <div>
                    <label className="block text-sm font-medium">Jenis Kejadian</label>
                    <select
                        name="jenis_kejadian"
                        value={formData.jenis_kejadian}
                        onChange={handleFormChange}
                        className="w-full mt-1 border border-gray-300 rounded px-3 py-2"
                        required
                    >
                        <option value="">-- Pilih Jenis Kejadian --</option>
                        <option value="Kebakaran">Kebakaran</option>
                        <option value="Kecelakaan">Kecelakaan</option>
                        <option value="Banjir">Banjir</option>
                        <option value="Lainnya">Lainnya</option>
                    </select>
                    </div>
                    <div>
                    <label className="block text-sm font-medium">Waktu Kejadian</label>
                    <input
                        type="datetime-local"
                        name="waktu"
                        value={formData.waktu}
                        onChange={handleFormChange}
                        required
                        className="w-full mt-1 border border-gray-300 rounded px-3 py-2"
                    />
                    </div>
                    <div>
                    <label className="block text-sm font-medium">Status Penanganan</label>
                    <select
                        name="status_penanganan"
                        value={formData.status_penanganan}
                        onChange={handleFormChange}
                        className="w-full mt-1 border border-gray-300 rounded px-3 py-2"
                    >
                        <option value="diproses">Diproses</option>
                        <option value="diverifikasi">Diverifikasi</option>
                        <option value="ditolak">Ditolak</option>
                    </select>
                    </div>
                </div>
                <div>
                    <label className="block text-sm font-medium">Deskripsi</label>
                    <textarea
                    name="deskripsi"
                    value={formData.deskripsi}
                    onChange={handleFormChange}
                    rows={3}
                    className="w-full mt-1 border border-gray-300 rounded px-3 py-2"
                    required
                    ></textarea>
                </div>
                <div>
                    <label className="block text-sm font-medium">Lampiran (opsional)</label>
                    <input
                    type="file"
                    name="lampiran"
                    onChange={handleFormChange}
                    className="mt-1"
                    />
                </div>
                <div className="flex justify-end pt-2">
                    <button
                    type="submit"
                    className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
                    >
                    Simpan
                    </button>
                </div>
                </form>
            </div>
            </div>
        )}
        </div>
    );
    };

    export default DaftarLaporan;

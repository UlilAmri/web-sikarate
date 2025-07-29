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
    const [showModal, setShowModal] = useState(false);
    const [laporan, setLaporan] = useState([]);

    const [formData, setFormData] = useState({
        nama: "",
        lokasi: "",
        waktu: "",
        jenis_kejadian: "",
        deskripsi: "",
    });

    const handleFormChange = (e) => {
        setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const newLaporan = {
        id_laporan: Date.now(),
        ...formData,
        status_penanganan: "diproses",
        };
        setLaporan((prev) => [...prev, newLaporan]);
        setFormData({
        nama: "",
        lokasi: "",
        waktu: "",
        jenis_kejadian: "",
        deskripsi: "",
        });
        setShowModal(false);
    };

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
                <button
                onClick={() => setShowModal(true)}
                className="bg-blue-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-blue-700"
                >
                + Laporan
                </button>
            </div>

            {/* Modal */}
            {showModal && (
                <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
                <div className="bg-white rounded-lg shadow-lg w-full max-w-md p-6 relative">
                    <h3 className="text-lg font-semibold mb-4">Tambah Laporan</h3>
                    <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium">Nama Pelapor</label>
                        <input
                        type="text"
                        name="nama"
                        value={formData.nama}
                        onChange={handleFormChange}
                        className="w-full mt-1 border border-gray-300 rounded px-3 py-2"
                        required
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium">Lokasi</label>
                        <input
                        type="text"
                        name="lokasi"
                        value={formData.lokasi}
                        onChange={handleFormChange}
                        className="w-full mt-1 border border-gray-300 rounded px-3 py-2"
                        required
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium">Waktu Kejadian</label>
                        <input
                        type="datetime-local"
                        name="waktu"
                        value={formData.waktu}
                        onChange={handleFormChange}
                        className="w-full mt-1 border border-gray-300 rounded px-3 py-2"
                        required
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
                        <option value="Lainnya">Penyelematan</option>
                    </select>
                    </div>
                    <div>
                        <label className="block text-sm font-medium">Deskripsi</label>
                        <textarea
                        name="deskripsi"
                        value={formData.deskripsi}
                        onChange={handleFormChange}
                        className="w-full mt-1 border border-gray-300 rounded px-3 py-2"
                        rows="3"
                        required
                        ></textarea>
                    </div>
                    <div className="flex justify-end gap-2">
                        <button
                        type="button"
                        onClick={() => setShowModal(false)}
                        className="px-4 py-2 rounded-md border text-gray-600 hover:bg-gray-100"
                        >
                        Batal
                        </button>
                        <button
                        type="submit"
                        className="px-4 py-2 rounded-md bg-blue-600 text-white hover:bg-blue-700"
                        >
                        Simpan
                        </button>
                    </div>
                    </form>
                </div>
                </div>
            )}

            {/* Tabel */}
            <div className="bg-white rounded-lg shadow overflow-x-auto">
                <table className="min-w-full">
                <thead className="bg-gray-50">
                    <tr>
                    <th className="px-4 py-3 text-center text-xs font-medium text-gray-500">No</th>
                    <th className="px-4 py-3 text-center text-xs font-medium text-gray-500">Nama</th>
                    <th className="px-4 py-3 text-center text-xs font-medium text-gray-500">Lokasi</th>
                    <th className="px-4 py-3 text-center text-xs font-medium text-gray-500">Waktu</th>
                    <th className="px-4 py-3 text-center text-xs font-medium text-gray-500">Jenis Kejadian</th>
                    <th className="px-4 py-3 text-center text-xs font-medium text-gray-500">Deskripsi</th>
                    <th className="px-4 py-3 text-center text-xs font-medium text-gray-500">Status</th>
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
                        <td className="px-4 py-3 text-center">{lap.nama}</td>
                        <td className="px-4 py-3 text-center">{lap.lokasi}</td>
                        <td className="px-4 py-3 text-center">{lap.waktu}</td>
                        <td className="px-4 py-3 text-center">{lap.jenis_kejadian}</td>
                        <td className="px-4 py-3">{lap.deskripsi}</td>
                        <td className="px-4 py-3 text-center">
                            <span className="inline-flex items-center gap-2">
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
        </div>
    );
    };

    export default RiwayatLaporan;

    // DaftarLaporan.jsx
    import { ArrowTopRightOnSquareIcon, PencilIcon, TrashIcon } from "@heroicons/react/24/outline";
    import { useState } from "react";
    import Navbar from "../layout/Navbar";
    import Sidebar from "../layout/Sidebar";

    const statusColor = {
    Disetujui: "bg-green-500",
    Diproses: "bg-yellow-500",
    Ditolak: "bg-red-500",
    Menunggu: "bg-gray-400",
    };

    const DaftarLaporan = () => {
    const [search, setSearch] = useState("");
    const [showModal, setShowModal] = useState(false);
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
    const laporan = [];

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
        setShowModal(false);
    };

    return (
        <div className="flex h-screen">
        <Sidebar role="admin" />
        <div className="flex-1 flex flex-col bg-gray-100">
            <Navbar role="admin" search={search} setSearch={setSearch} />
            <main className="p-6 flex-1 overflow-y-auto">
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-bold">Daftar Laporan</h2>
                <button
                className="bg-blue-600 text-white px-4 py-2 rounded font-semibold hover:bg-blue-700"
                onClick={() => setShowModal(true)}
                >
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
                        <td colSpan={8} className="text-center py-8 text-gray-400">Tidak ada data laporan.</td>
                    </tr>
                    ) : (
                    laporan.map((lap, idx) => (
                        <tr key={lap.id_laporan} className="border-b hover:bg-gray-50">
                        <td className="px-4 py-3">{idx + 1}</td>
                        <td className="px-4 py-3">{lap.nama}</td>
                        <td className="px-4 py-3">
                            <span className="inline-flex items-center gap-2">
                            <span className={`w-2 h-2 rounded-full ${statusColor[lap.status] || "bg-gray-400"}`} />
                            {lap.status}
                            </span>
                        </td>
                        <td className="px-4 py-3">{lap.jenis}</td>
                        <td className="px-4 py-3">{lap.lokasi}</td>
                        <td className="px-4 py-3">{lap.waktu}</td>
                        <td className="px-4 py-3 flex gap-2">
                            <ArrowTopRightOnSquareIcon className="h-5 w-5 text-blue-600 cursor-pointer" />
                            <PencilIcon className="h-5 w-5 text-green-600 cursor-pointer" />
                            <TrashIcon className="h-5 w-5 text-red-600 cursor-pointer" />
                        </td>
                        </tr>
                    ))
                    )}
                </tbody>
                </table>
            </div>

            {/* Modal Tambah Laporan */}
            {showModal && (
                <div className="fixed inset-0 bg-black bg-opacity-30 flex justify-center items-center z-50">
                <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-3xl relative overflow-y-auto max-h-[90vh]">
                    <button
                    className="absolute top-2 right-3 text-gray-500 hover:text-black text-xl"
                    onClick={() => setShowModal(false)}
                    >
                    &times;
                    </button>
                    <h2 className="text-xl font-bold mb-4">Tambah Laporan</h2>
                    <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <input name="nama" type="text" value={formData.nama} onChange={handleChange} placeholder="Nama Pelapor" className="input" required />
                    <input name="judul" type="text" value={formData.judul} onChange={handleChange} placeholder="Judul Laporan" className="input" required />
                    <input name="lokasi" type="text" value={formData.lokasi} onChange={handleChange} placeholder="Lokasi Kejadian" className="input" required />
                    <input name="waktu" type="datetime-local" value={formData.waktu} onChange={handleChange} className="input" required />
                    <select name="jenis" value={formData.jenis} onChange={handleChange} className="input" required>
                        <option value="">Pilih Jenis Kejadian</option>
                        <option value="Kebakaran">Kebakaran</option>
                        <option value="Banjir">Penyelamatan</option>
                        <option value="Banjir">Edukasi/Pelatihan</option>
                    </select>
                    <select name="statusPenanganan" value={formData.statusPenanganan} onChange={handleChange} className="input" required>
                        <option value="">Pilih Status</option>
                        <option value="Menunggu">Menunggu</option>
                        <option value="Diproses">Diproses</option>
                        <option value="Disetujui">Disetujui</option>
                        <option value="Ditolak">Ditolak</option>
                    </select>
                    <textarea name="deskripsi" value={formData.deskripsi} onChange={handleChange} placeholder="Deskripsi" className="input md:col-span-2" rows={3}></textarea>
                    <input type="file" name="lampiran" onChange={handleChange} className="input md:col-span-2" />
                    <div className="md:col-span-2 flex justify-end">
                        <button type="submit" className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700">Tambahkan</button>
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

    export default DaftarLaporan;

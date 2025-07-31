    import axios from "axios";
    import { useEffect, useState } from "react";
    import Navbar from "../layout/Navbar";
    import Sidebar from "../layout/Sidebar";

    const DaftarLaporan = () => {
    const [search, setSearch] = useState("");
    const [laporan, setLaporan] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showModal, setShowModal] = useState(false);
    const [form, setForm] = useState({
        judul: "",
        lokasi: "",
        jenis: "",
        waktu_kejadian: "",
        deskripsi: "",
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm({ ...form, [name]: value });
    };

    useEffect(() => {
        const fetchLaporan = async () => {
        try {
            const token = localStorage.getItem("token");
            const res = await axios.get("https://api-sikarate.mydemoapp.site/laporan/", {
            headers: {
                Authorization: `Bearer ${token}`,
            },
            });
            setLaporan(res.data.data || []);
        } catch (error) {
            console.error("Gagal mengambil data laporan:", error);
            setLaporan([]);
        } finally {
            setLoading(false);
        }
        };

        fetchLaporan();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const token = localStorage.getItem("token");

        try {
        await axios.post(
            "https://api-sikarate.mydemoapp.site/laporan/",
            {
            judul: form.judul,
            lokasi: form.lokasi,
            waktu_kejadian: form.waktu_kejadian,
            jenis: form.jenis,
            deskripsi: form.deskripsi,
            },
            {
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
            },
            }
        );

        setForm({
            judul: "",
            lokasi: "",
            jenis: "",
            waktu_kejadian: "",
            deskripsi: "",
        });
        alert("Laporan berhasil ditambahkan!");
        setShowModal(false);

        const res = await axios.get("https://api-sikarate.mydemoapp.site/laporan/", {
            headers: { Authorization: `Bearer ${token}` },
        });
        setLaporan(res.data.data || []);
        } catch (error) {
        console.error("Gagal menambahkan laporan:", error);
        alert("Terjadi kesalahan saat menyimpan laporan.");
        }
    };

    const filteredLaporan = laporan.filter((lap) => {
        const query = search.toLowerCase();
        return (
        lap.judul?.toLowerCase().includes(query) ||
        lap.jenis?.toLowerCase().includes(query) ||
        lap.lokasi?.toLowerCase().includes(query) ||
        lap.waktu_kejadian?.toLowerCase().includes(query) ||
        lap.deskripsi?.toLowerCase().includes(query)
        );
    });

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
                + Tambah Laporan
                </button>
            </div>

            <div className="bg-white rounded-lg shadow overflow-x-auto">
                <table className="min-w-full">
                <thead className="bg-gray-50">
                    <tr>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500">No</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500">Judul</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500">Lokasi</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500">Jenis</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500">Waktu</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500">Deskripsi</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500">Status</th>
                    </tr>
                </thead>
                <tbody>
                    {loading ? (
                    <tr>
                        <td colSpan={7} className="text-center py-8 text-gray-400">
                        Memuat data...
                        </td>
                    </tr>
                    ) : filteredLaporan.length === 0 ? (
                    <tr>
                        <td colSpan={7} className="text-center py-8 text-gray-400">
                        Tidak ada data laporan.
                        </td>
                    </tr>
                    ) : (
                    filteredLaporan.map((lap, idx) => (
                        <tr key={lap.id_laporan} className="border-b hover:bg-gray-50">
                        <td className="px-4 py-3">{idx + 1}</td>
                        <td className="px-4 py-3">{lap.judul}</td>
                        <td className="px-4 py-3">{lap.lokasi}</td>
                        <td className="px-4 py-3">{lap.jenis}</td>
                        <td className="px-4 py-3">{lap.waktu_kejadian}</td>
                        <td className="px-4 py-3">{lap.deskripsi}</td>
                        <td className="px-4 py-3">{lap.status_penanganan || "-"}</td>
                        </tr>
                    ))
                    )}
                </tbody>
                </table>
            </div>

            {/* Modal Tambah Laporan */}
            {showModal && (
                <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
                <div className="bg-white p-6 rounded-lg shadow max-w-md w-full relative">
                    <h3 className="text-lg font-semibold mb-4">Tambah Laporan</h3>
                    <form onSubmit={handleSubmit} className="space-y-4">
                    <input
                        type="text"
                        name="judul"
                        value={form.judul}
                        onChange={handleChange}
                        placeholder="Judul"
                        required
                        className="w-full border border-gray-300 rounded px-3 py-2"
                    />
                    <input
                        type="text"
                        name="lokasi"
                        value={form.lokasi}
                        onChange={handleChange}
                        placeholder="Lokasi"
                        required
                        className="w-full border border-gray-300 rounded px-3 py-2"
                    />
                    <select
                        name="jenis"
                        value={form.jenis}
                        onChange={handleChange}
                        required
                        className="w-full border border-gray-300 rounded px-3 py-2"
                    >
                        <option value="">Pilih Jenis</option>
                        <option value="kebakaran">Kebakaran</option>
                        <option value="penyelamatan">Penyelamatan</option>
                    </select>
                    <input
                        type="datetime-local"
                        name="waktu_kejadian"
                        value={form.waktu_kejadian}
                        onChange={handleChange}
                        required
                        className="w-full border border-gray-300 rounded px-3 py-2"
                    />
                    <textarea
                        name="deskripsi"
                        value={form.deskripsi}
                        onChange={handleChange}
                        placeholder="Deskripsi"
                        required
                        className="w-full border border-gray-300 rounded px-3 py-2"
                    ></textarea>
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

    export default DaftarLaporan;

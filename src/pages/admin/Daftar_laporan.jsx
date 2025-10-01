import { PencilSquareIcon, TrashIcon } from "@heroicons/react/24/solid";
import axios from "axios";
import { useEffect, useState } from "react";
import Navbar from "../layout/Navbar";
import Sidebar from "../layout/Sidebar";

const DaftarLaporan = () => {
  const [search, setSearch] = useState("");
  const [laporan, setLaporan] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [form, setForm] = useState({
    id_laporan: null,
    judul: "",
    lokasi: "",
    jenis: "",
    waktu_kejadian: "",
    deskripsi: "",
    nama: "",
  });

  const token = localStorage.getItem("token");

  const fetchLaporan = async () => {
    try {
      const res = await axios.get("https://api-sikarateka.mataramkota.go.id/laporan/", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setLaporan(res.data.data || []);
    } catch (error) {
      console.error("Gagal mengambil data laporan:", error);
      setLaporan([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLaporan();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (editMode) {
        await axios.put(
          `https://api-sikarateka.mataramkota.go.id/laporan/${form.id_laporan}`,
          {
            judul: form.judul,
            lokasi: form.lokasi,
            waktu_kejadian: form.waktu_kejadian,
            jenis: form.jenis,
            deskripsi: form.deskripsi,
            nama: form.nama,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );
        alert("Laporan berhasil diperbarui!");
      } else {
        await axios.post(
          "https://api-sikarateka.mataramkota.go.id/laporan/",
          {
            judul: form.judul,
            lokasi: form.lokasi,
            waktu_kejadian: form.waktu_kejadian,
            jenis: form.jenis,
            deskripsi: form.deskripsi,
            nama: form.nama,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );
        alert("Laporan berhasil ditambahkan!");
      }

      setForm({
        id_laporan: null,
        judul: "",
        lokasi: "",
        jenis: "",
        waktu_kejadian: "",
        deskripsi: "",
        nama: "",
      });
      setShowModal(false);
      setEditMode(false);
      fetchLaporan();
    } catch (error) {
      console.error("Gagal menyimpan laporan:", error);
      alert("Terjadi kesalahan saat menyimpan laporan.");
    }
  };

  const handleEdit = (laporan) => {
    setEditMode(true);
    setForm({ ...laporan });
    setShowModal(true);
  };

  const handleDelete = async (id) => {
    const konfirmasi = window.confirm("Apakah Anda yakin ingin menghapus laporan ini?");
    if (!konfirmasi) return;

    try {
      await axios.delete(`https://api-sikarateka.mataramkota.go.id/laporan/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      alert("Laporan berhasil dihapus!");
      fetchLaporan();
    } catch (error) {
      console.error("Gagal menghapus laporan:", error);
      alert("Terjadi kesalahan saat menghapus laporan.");
    }
  };

  const filteredLaporan = laporan.filter((lap) => {
    const query = search.toLowerCase();
    return (
      lap.judul?.toLowerCase().includes(query) ||
      lap.jenis?.toLowerCase().includes(query) ||
      lap.lokasi?.toLowerCase().includes(query) ||
      lap.waktu_kejadian?.toLowerCase().includes(query) ||
      lap.deskripsi?.toLowerCase().includes(query) ||
      lap.nama?.toLowerCase().includes(query)
    );
  });

  return (
    <div className="flex mih-h-screen">
      <Sidebar role="admin" />
      <div className="flex-1 flex flex-col bg-gray-100">
        <Navbar role="admin" search={search} setSearch={setSearch} />
        <main className="p-4 sm:p-6 flex-1 overflow-y-auto">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 gap-2">
            <h2 className="text-xl sm:text-2xl font-bold">Daftar Laporan</h2>
            <button
              className="bg-blue-600 text-white px-3 py-2 rounded font-semibold hover:bg-blue-700 text-sm sm:text-base"
              onClick={() => {
                setForm({
                  id_laporan: null,
                  judul: "",
                  lokasi: "",
                  jenis: "",
                  waktu_kejadian: "",
                  deskripsi: "",
                  nama: "",
                });
                setEditMode(false);
                setShowModal(true);
              }}
            >
              + Tambah Laporan
            </button>
          </div>

          {/* Table Responsive */}
          <div className="bg-white rounded-lg shadow overflow-x-auto">
            <table className="min-w-full text-sm">
              <thead className="bg-gray-50 text-gray-700">
                <tr>
                  <th className="px-4 py-3 text-left">No</th>
                  <th className="px-4 py-3 text-left">Judul</th>
                  <th className="px-4 py-3 text-left">Nama</th>
                  <th className="px-4 py-3 text-left">Lokasi</th>
                  <th className="px-4 py-3 text-left">Jenis</th>
                  <th className="px-4 py-3 text-left">Waktu</th>
                  <th className="px-4 py-3 text-left">Deskripsi</th>
                  <th className="px-4 py-3 text-left">Status</th>
                  <th className="px-4 py-3 text-left">Aksi</th>
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  <tr>
                    <td colSpan={9} className="text-center py-8 text-gray-400">
                      Memuat data...
                    </td>
                  </tr>
                ) : filteredLaporan.length === 0 ? (
                  <tr>
                    <td colSpan={9} className="text-center py-8 text-gray-400">
                      Tidak ada data laporan.
                    </td>
                  </tr>
                ) : (
                  filteredLaporan.map((lap, idx) => (
                    <tr key={lap.id_laporan} className="border-b hover:bg-gray-50">
                      <td className="px-4 py-3">{idx + 1}</td>
                      <td className="px-4 py-3">{lap.judul}</td>
                      <td className="px-4 py-3">{lap.nama}</td>
                      <td className="px-4 py-3">{lap.lokasi}</td>
                      <td className="px-4 py-3 capitalize">{lap.jenis}</td>
                      <td className="px-4 py-3">{lap.waktu_kejadian}</td>
                      <td className="px-4 py-3">{lap.deskripsi}</td>
                      <td className="px-4 py-3">{lap.status_penanganan || "-"}</td>
                      <td className="px-4 py-3 flex gap-2">
                        <button
                          onClick={() => handleEdit(lap)}
                          className="text-yellow-500 hover:text-yellow-600"
                          title="Edit"
                        >
                          <PencilSquareIcon className="w-5 h-5" />
                        </button>
                        <button
                          onClick={() => handleDelete(lap.id_laporan)}
                          className="text-red-500 hover:text-red-600"
                          title="Hapus"
                        >
                          <TrashIcon className="w-5 h-5" />
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

          {/* Modal */}
          {showModal && (
            <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
              <div className="bg-white p-6 rounded-lg shadow max-w-md w-full mx-2">
                <h3 className="text-lg font-semibold mb-4">
                  {editMode ? "Edit Laporan" : "Tambah Laporan"}
                </h3>
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
                    name="nama"
                    value={form.nama}
                    onChange={handleChange}
                    placeholder="Nama Pelapor"
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
                    <option value="Edukasi">Edukasi</option>
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
                      onClick={() => {
                        setShowModal(false);
                        setEditMode(false);
                      }}
                      className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
                    >
                      Batal
                    </button>
                    <button
                      type="submit"
                      className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                    >
                      {editMode ? "Perbarui" : "Simpan"}
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

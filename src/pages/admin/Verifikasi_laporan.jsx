import { CheckIcon, XMarkIcon } from "@heroicons/react/24/outline";
import axios from "axios";
import { useEffect, useState } from "react";
import Navbar from "../layout/Navbar";
import Sidebar from "../layout/Sidebar";

const statusColor = {
  Terverifikasi: "bg-green-500",
  Diproses: "bg-yellow-500",
  Ditolak: "bg-red-500",

};

const VerifikasiLaporan = () => {
  const [search, setSearch] = useState("");
  const [laporan, setLaporan] = useState([]);
  const [loading, setLoading] = useState(true);

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

  useEffect(() => {
    fetchLaporan();
  }, []);

  const updateStatus = async (id, newStatus) => {
    try {
      const token = localStorage.getItem("token");
      await axios.put(
        `https://api-sikarate.mydemoapp.site/laporan/${id}/verifikasi`,
        { status_penanganan: newStatus },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      fetchLaporan(); // refresh data
    } catch (err) {
      console.error("Gagal memperbarui status:", err);
    }
  };

  return (
    <div className="flex h-screen">
      <Sidebar role="admin" />
      <div className="flex-1 flex flex-col bg-gray-100">
        <Navbar role="admin" search={search} setSearch={setSearch} />
        <main className="p-6 flex-1 overflow-y-auto">
          <div className="mb-4">
            <h2 className="text-2xl font-bold">Verifikasi Laporan Masuk</h2>
          </div>
          <div className="bg-white rounded-lg shadow overflow-x-auto">
            <table className="min-w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500">No</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500">Judul</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500">Jenis</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500">Lokasi</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500">Waktu Kejadian</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500">Status</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500">Aksi</th>
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  <tr>
                    <td colSpan={7} className="text-center py-8 text-gray-400">
                      Memuat data laporan...
                    </td>
                  </tr>
                ) : laporan.length === 0 ? (
                  <tr>
                    <td colSpan={7} className="text-center py-8 text-gray-400">
                      Tidak ada laporan.
                    </td>
                  </tr>
                ) : (
                  laporan
                    .filter(
                      (lap) =>
                        lap.judul?.toLowerCase().includes(search.toLowerCase()) ||
                        lap.lokasi?.toLowerCase().includes(search.toLowerCase())
                    )
                    .map((lap, idx) => (
                      <tr key={lap.id_laporan} className="border-b hover:bg-gray-50">
                        <td className="px-4 py-3">{idx + 1}</td>
                        <td className="px-4 py-3">{lap.judul}</td>
                        <td className="px-4 py-3">{lap.jenis}</td>
                        <td className="px-4 py-3">{lap.lokasi}</td>
                        <td className="px-4 py-3">{lap.waktu_kejadian}</td>
                        <td className="px-4 py-3">
                          <span className="inline-flex items-center gap-2">
                            <span
                              className={`w-2 h-2 rounded-full ${
                                statusColor[lap.status_penanganan] || "bg-gray-400"
                              }`}
                            ></span>
                            {lap.status_penanganan}
                          </span>
                        </td>
                        <td className="px-4 py-3">
                          <div className="flex gap-2">
                            <button
                              onClick={() => updateStatus(lap.id_laporan, "Terverifikasi")}
                              className="p-1 hover:bg-green-100 text-green-600 rounded flex items-center gap-1"
                            >
                              <CheckIcon className="w-5 h-5" />
                              Verifikasi
                            </button>
                            <button
                              onClick={() => updateStatus(lap.id_laporan, "Ditolak")}
                              className="p-1 hover:bg-red-100 text-red-600 rounded flex items-center gap-1"
                            >
                              <XMarkIcon className="w-5 h-5" />
                              Tolak
                            </button>
                          </div>
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

export default VerifikasiLaporan;

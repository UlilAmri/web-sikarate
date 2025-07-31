import axios from "axios";
import { useEffect, useState } from "react";
import Navbar from "../layout/Navbar";
import Sidebar from "../layout/Sidebar";

const DashboardAdmin = () => {
  const [search, setSearch] = useState("");
  const [laporan, setLaporan] = useState([]);

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
      }
    };

    fetchLaporan();
  }, []);

  const totalLaporan = laporan.length;
  const laporanTerverifikasi = laporan.filter(
    (lap) => lap.status_penanganan === "Terverifikasi"
  ).length;
  const laporanDiproses = laporan.filter(
    (lap) => lap.status_penanganan === "diproses"
  ).length;

  return (
    <div className="flex h-screen">
      <Sidebar role="admin" />
      <div className="flex-1 flex flex-col bg-gray-100">
        <Navbar role="admin" search={search} setSearch={setSearch} />
        <main className="p-6 flex-1 overflow-y-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
            <div className="bg-white rounded shadow p-4 text-center">
              <div className="text-3xl font-bold text-blue-600">{totalLaporan}</div>
              <div className="text-gray-600 text-sm">Laporan Masuk</div>
            </div>
            <div className="bg-white rounded shadow p-4 text-center">
              <div className="text-3xl font-bold text-green-600">{laporanTerverifikasi}</div>
              <div className="text-gray-600 text-sm">Laporan Terverifikasi</div>
            </div>
            <div className="bg-white rounded shadow p-4 text-center">
              <div className="text-3xl font-bold text-yellow-600">{laporanDiproses}</div>
              <div className="text-gray-600 text-sm">Laporan Diproses</div>
            </div>
          </div>

          <div className="bg-white shadow-sm rounded-lg overflow-hidden">
            {/* Konten dashboard admin lainnya */}
          </div>
        </main>
      </div>
    </div>
  );
};

export default DashboardAdmin;

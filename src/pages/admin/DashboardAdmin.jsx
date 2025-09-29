import {
  AcademicCapIcon,
  CheckBadgeIcon,
  ClockIcon,
  FireIcon,
  InboxIcon,
  ShieldCheckIcon,
} from "@heroicons/react/24/solid";
import axios from "axios";
import { useEffect, useState } from "react";
import Navbar from "../layout/Navbar";
import Sidebar from "../layout/Sidebar";

import {
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis
} from "recharts";

const DashboardAdmin = () => {
  const [search, setSearch] = useState("");
  const [laporan, setLaporan] = useState([]);
  const [listTahun, setListTahun] = useState([]);
  const [tahunDipilih, setTahunDipilih] = useState(new Date().getFullYear());

  useEffect(() => {
    const fetchLaporan = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get("https://api-sikarate.mydemoapp.site/laporan/", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const data = res.data.data || [];
        setLaporan(data);

        // Ambil tahun unik dari waktu_kejadian
        const tahunUnik = [
          ...new Set(
            data
              .map((lap) => {
                const tgl = lap.waktu_kejadian;
                return tgl ? new Date(tgl).getFullYear() : null;
              })
              .filter((t) => t !== null)
          ),
        ];

        setListTahun(tahunUnik.sort((a, b) => b - a));
        if (tahunUnik.length > 0) {
          setTahunDipilih(tahunUnik[0]); // default ke tahun terbaru
        }
      } catch (error) {
        console.error("Gagal mengambil data laporan:", error);
        setLaporan([]);
      }
    };

    fetchLaporan();
  }, []);

  // Statistik status laporan
  const totalLaporan = laporan.length;
  const laporanTerverifikasi = laporan.filter(
    (lap) => lap.status_penanganan === "Terlayani"
  ).length;
  const laporanDiproses = laporan.filter(
    (lap) => lap.status_penanganan === "diproses"
  ).length;

  // Statistik jenis laporan
  const laporanKebakaran = laporan.filter(
    (lap) => lap.jenis?.toLowerCase() === "kebakaran"
  ).length;
  const laporanPenyelamatan = laporan.filter(
    (lap) => lap.jenis?.toLowerCase() === "penyelamatan"
  ).length;
  const laporanEdukasi = laporan.filter(
    (lap) => lap.jenis?.toLowerCase() === "edukasi"
  ).length;




  // Data grafik per bulan 
  const dataBulanan = Array.from({ length: 12 }, (_, i) => {
    const bulan = i; // 0=Januari
    const filtered = laporan.filter((lap) => {
      const tgl = new Date(lap.waktu_kejadian);
      return tgl.getFullYear() === parseInt(tahunDipilih) && tgl.getMonth() === bulan;
    });

    return {
      bulan: new Date(0, bulan).toLocaleString("id-ID", { month: "long" }),
      Kebakaran: filtered.filter((f) => f.jenis?.toLowerCase() === "kebakaran").length,
      Penyelamatan: filtered.filter((f) => f.jenis?.toLowerCase() === "penyelamatan").length,
      Edukasi: filtered.filter((f) => f.jenis?.toLowerCase() === "edukasi").length,
    };
  });


  const StatCard = ({ icon: Icon, title, value, color }) => (
    <div className="bg-white rounded-xl shadow-md p-6 flex items-center gap-4 hover:shadow-lg transition transform hover:scale-[1.02]">
      <div className={`p-4 rounded-full ${color} bg-opacity-20`}>
        <Icon className={`h-8 w-8 ${color.replace("bg-", "text-")}`} />
      </div>
      <div>
        <p className="text-sm text-gray-500">{title}</p>
        <h3 className="text-2xl font-bold text-gray-800">{value}</h3>
      </div>
    </div>
  );

  return (
    <div className="flex h-screen">
      <Sidebar role="admin" />
      <div className="flex-1 flex flex-col bg-gray-50">
        <Navbar role="admin" search={search} setSearch={setSearch} />
        <main className="p-6 flex-1 overflow-y-auto">
          <h2 className="text-xl font-bold mb-6 text-gray-700">Dashboard Admin</h2>

          {/* Statistik status laporan */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
            <StatCard
              icon={InboxIcon}
              title="Laporan Masuk"
              value={totalLaporan}
              color="bg-blue-500"
            />
            <StatCard
              icon={CheckBadgeIcon}
              title="Laporan Terlayani"
              value={laporanTerverifikasi}
              color="bg-green-500"
            />
            <StatCard
              icon={ClockIcon}
              title="Laporan Diproses"
              value={laporanDiproses}
              color="bg-yellow-500"
            />
          </div>

          {/* Statistik jenis laporan */}
          <h3 className="text-lg font-semibold mb-4 text-gray-700">Jenis Laporan</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
            <StatCard
              icon={FireIcon}
              title="Kebakaran"
              value={laporanKebakaran}
              color="bg-red-500"
            />
            <StatCard
              icon={ShieldCheckIcon}
              title="Penyelamatan"
              value={laporanPenyelamatan}
              color="bg-indigo-500"
            />
            <StatCard
              icon={AcademicCapIcon}
              title="Edukasi"
              value={laporanEdukasi}
              color="bg-purple-500"
            />
          </div>

          {/* Grafik */} 
          <div className="mb-10">
            <div className="mb-6 flex items-center gap-4">
              <label htmlFor="tahun" className="text-gray-600 font-medium">
                Pilih Tahun:
              </label>
              <select
                id="tahun"
                value={tahunDipilih}
                onChange={(e) => setTahunDipilih(e.target.value)}
                className="border border-gray-300 rounded px-3 py-2 bg-white shadow-sm"
              >
                {listTahun.map((th) => (
                  <option key={th} value={th}>
                    {th}
                  </option>
                ))}
              </select>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-md">
              <h4 className="font-semibold text-gray-700 mb-4">
                Grafik Kejadian Tahun {tahunDipilih}
              </h4>
              <ResponsiveContainer width="100%" height={400}>
                <LineChart data={dataBulanan}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="bulan" />
                  <YAxis allowDecimals={false} />
                  <Tooltip />
                  <Legend />
                  <Line type="monotone" dataKey="Kebakaran" stroke="#EF4444" strokeWidth={3} />
                  <Line type="monotone" dataKey="Penyelamatan" stroke="#3B82F6" strokeWidth={3} />
                  <Line type="monotone" dataKey="Edukasi" stroke="#8B5CF6" strokeWidth={3} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

        </main>
      </div>
    </div>
  );
};

export default DashboardAdmin;

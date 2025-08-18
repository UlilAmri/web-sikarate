import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import DaftarBerita from "./pages/admin/Daftar_berita";
import DaftarLaporan from "./pages/admin/Daftar_laporan";
import DaftarUser from "./pages/admin/Daftar_user";
import DashboardAdmin from "./pages/admin/DashboardAdmin";
import VerifikasiLaporan from "./pages/admin/Verifikasi_laporan";
import Home from "./pages/Home";
import Login from "./pages/Login";
import RiwayatLaporan from "./pages/user/laporan";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/riwayat-laporan" element={<RiwayatLaporan />} />
        <Route path="/dashboard-admin" element={<DashboardAdmin />} />
        <Route path="/daftar-laporan" element={<DaftarLaporan />} />
        <Route path="/daftar-user" element={<DaftarUser />} />
        <Route path="/daftar-artikel" element={<DaftarBerita/>} />
        <Route path="/verifikasi" element={<VerifikasiLaporan/>} />
      </Routes>
    </Router>
  );
}

export default App;

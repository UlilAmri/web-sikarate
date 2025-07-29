import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import DaftarBerita from "./pages/admin/Daftar_berita";
import DaftarLaporan from "./pages/admin/Daftar_laporan";
import DaftarUser from "./pages/admin/Daftar_user";
import DashboardAdmin from "./pages/admin/DashboardAdmin";
import TambahBerita from "./pages/admin/Tambah_Berita";
import TambahLaporanAdmin from "./pages/admin/Tambah_laporan";
import TambahUser from "./pages/admin/Tambah_user";
import VerifikasiLaporan from "./pages/admin/Verifikasi_laporan";
import Home from "./pages/Home";
import Login from "./pages/Login";
import { default as FormLaporan, default as TambahLaporan } from "./pages/user/Form_Laporan";
import RiwayatLaporan from "./pages/user/laporan";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/tambahLaporan" element={<TambahLaporan />} />
        <Route path="/riwayatlaporan" element={<RiwayatLaporan />} />
        <Route path="/dashboardadmin" element={<DashboardAdmin />} />
        <Route path="/daftarlaporan" element={<DaftarLaporan />} />
        <Route path="/tambahlaporanadmin" element={<TambahLaporanAdmin/>} />
        <Route path="/daftaruser" element={<DaftarUser />} />
        <Route path="/tambahuser" element={<TambahUser />} />
        <Route path="/formlaporan" element={<FormLaporan/>} />
        <Route path="/tambahartikel" element={<TambahBerita/>} />
        <Route path="/daftarartikel" element={<DaftarBerita/>} />
        <Route path="/verifikasi" element={<VerifikasiLaporan/>} />
      </Routes>
    </Router>
  );
}

export default App;

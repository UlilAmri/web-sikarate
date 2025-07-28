import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import DaftarLaporan from "./pages/admin/Daftar_laporan";
import DaftarUser from "./pages/admin/Daftar_user";
import DashboardAdmin from "./pages/admin/DashboardAdmin";
import TambahUser from "./pages/admin/Tambah_user";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Dashboard from "./pages/user/Dashboar";
import TambahLaporan from "./pages/user/Form_Laporan";
import FormLaporan from "./pages/user/Form_Laporan";
import RiwayatLaporan from "./pages/user/laporan";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/tambahLaporan" element={<TambahLaporan />} />
        <Route path="/dashboardadmin" element={<DashboardAdmin />} />
        <Route path="/daftarlaporan" element={<DaftarLaporan />} />
        <Route path="/daftaruser" element={<DaftarUser />} />
        <Route path="/tambahuser" element={<TambahUser />} />
        <Route path="/formlaporan" element={<FormLaporan/>} />
        <Route path="/riwayatlaporan" element={<RiwayatLaporan/>} />
      </Routes>
    </Router>
  );
}

export default App;

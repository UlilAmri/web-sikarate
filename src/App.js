import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import DaftarLaporan from "./pages/Daftar_laporan";
import DaftarUser from "./pages/Daftar_user";
import Dashboard from "./pages/Dashboar";
import DashboardAdmin from "./pages/DashboardAdmin";
import TambahLaporan from "./pages/Form_Laporan";
import Home from "./pages/Home";
import Login from "./pages/Login";
import TambahUser from "./pages/Tambah_user";

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
      </Routes>
    </Router>
  );
}

export default App;

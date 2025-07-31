import { useState } from "react";
import axios from "axios";
import Sidebar from "../layout/Sidebar";
import Navbar from "../layout/Navbar";

const FormLaporan = () => {
  const [formData, setFormData] = useState({
    lokasi: "",
    waktu: "",
    deskripsi: "",
  });
  const [search, setSearch] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem("token"); // jika pakai auth, jika tidak bisa hapus
      await axios.post("https://api-sikarate.mydemoapp.site/laporan/", {
        lokasi: formData.lokasi,
        waktu_kejadian: formData.waktu,
        deskripsi: formData.deskripsi,
        status_penanganan: "diproses", // status awal
      }, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      alert("Laporan berhasil dikirim!");
      setFormData({ lokasi: "", waktu: "", deskripsi: "" });
    } catch (error) {
      console.error("Gagal mengirim laporan:", error);
      alert("Gagal mengirim laporan. Coba lagi nanti.");
    }
  };

  return (
    <div className="flex h-screen">
      <Sidebar role="user" />
      <div className="flex-1 flex flex-col bg-gray-100">
        <Navbar role="user" search={search} setSearch={setSearch} />
        <main className="flex-1 flex items-center justify-center px-2 py-8">
          <div className="w-full max-w-xl bg-white rounded-lg shadow-lg p-8">
            <h2 className="text-2xl font-bold mb-2 text-center text-red-700">
              Tambah Laporan Kejadian
            </h2>
            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="block font-medium mb-1 text-gray-700">
                  Lokasi Kejadian <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="lokasi"
                  value={formData.lokasi}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded px-3 py-2"
                  placeholder="Contoh: Jl. Sudirman No. 17, Mataram"
                  required
                />
              </div>
              <div>
                <label className="block font-medium mb-1 text-gray-700">
                  Waktu Kejadian <span className="text-red-500">*</span>
                </label>
                <input
                  type="datetime-local"
                  name="waktu"
                  value={formData.waktu}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded px-3 py-2"
                  required
                />
              </div>
              <div>
                <label className="block font-medium mb-1 text-gray-700">
                  Deskripsi Kejadian <span className="text-red-500">*</span>
                </label>
                <textarea
                  name="deskripsi"
                  value={formData.deskripsi}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded px-3 py-2"
                  rows="4"
                  placeholder="Ceritakan kronologi kejadian secara singkat dan jelas"
                  required
                />
              </div>
              <div className="text-right">
                <button
                  type="submit"
                  className="bg-red-600 text-white px-6 py-2 rounded-lg font-semibold hover:bg-red-700 transition"
                >
                  Kirim Laporan
                </button>
              </div>
            </form>
          </div>
        </main>
      </div>
    </div>
  );
};

export default FormLaporan;

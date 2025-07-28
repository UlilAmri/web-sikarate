import { useState } from "react";

const TambahLaporan = () => {
  const [formData, setFormData] = useState({
    waktu: "",
    nama: "",
    lokasi: "",
    jenis: "",
    deskripsi: "",
    lampiran: null,
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData({
      ...formData,
      [name]: name === "lampiran" ? files[0] : value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Kirim data ke backend di sini
    alert("Laporan berhasil dikirim!");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-2 py-8">
      <div className="w-full max-w-xl bg-white rounded-lg shadow-lg p-8">
        <h2 className="text-2xl font-bold mb-2 text-center text-red-700">Tambah Laporan Kejadian</h2>
        <p className="text-gray-600 text-center mb-6">
          Silakan isi form berikut untuk melaporkan kejadian darurat.
        </p>
        <form onSubmit={handleSubmit} className="space-y-5" encType="multipart/form-data">
          <div>
            <label className="block font-medium mb-1 text-gray-700">
              Waktu Kejadian <span className="text-red-500">*</span>
            </label>
            <input
              type="datetime-local"
              name="waktu"
              value={formData.waktu}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red-400"
              required
            />
          </div>
          <div>
            <label className="block font-medium mb-1 text-gray-700">
              Nama Pelapor <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="nama"
              value={formData.nama}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red-400"
              placeholder="Masukkan nama Anda"
              required
            />
          </div>
          <div>
            <label className="block font-medium mb-1 text-gray-700">
              Lokasi Kejadian <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="lokasi"
              value={formData.lokasi}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red-400"
              placeholder="Contoh: Jl. Sudirman No. 17, Mataram"
              required
            />
          </div>
          <div>
            <label className="block font-medium mb-1 text-gray-700">
              Jenis Kejadian <span className="text-red-500">*</span>
            </label>
            <select
              name="jenis"
              value={formData.jenis}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red-400"
              required
            >
              <option value="">-- Pilih Jenis Kejadian --</option>
              <option value="Kebakaran">Kebakaran</option>
              <option value="Penyelamatan">Penyelamatan</option>
              <option value="Lainnya">Lainnya</option>
            </select>
          </div>
          <div>
            <label className="block font-medium mb-1 text-gray-700">
              Deskripsi Kejadian <span className="text-red-500">*</span>
            </label>
            <textarea
              name="deskripsi"
              value={formData.deskripsi}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red-400"
              rows="4"
              placeholder="Ceritakan kronologi kejadian secara singkat dan jelas"
              required
            />
          </div>
          <div>
            <label className="block font-medium mb-1 text-gray-700">
              Lampiran Foto (opsional)
            </label>
            <input
              type="file"
              name="lampiran"
              accept="image/*"
              onChange={handleChange}
              className="w-full text-gray-700"
            />
            <span className="text-xs text-gray-500">
              *JPG/PNG.
            </span>
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
    </div>
  );
};

export default TambahLaporan;
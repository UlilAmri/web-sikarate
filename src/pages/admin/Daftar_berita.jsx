import axios from "axios";
import { useEffect, useState } from "react";
import Navbar from "../layout/Navbar";
import Sidebar from "../layout/Sidebar";

const DaftarBerita = () => {
  const [search, setSearch] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [berita, setBerita] = useState([]);
  const [kategoriList, setKategoriList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState({
    id_kategori: "",
    judul: "",
    isi: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem("token");
      try {
        const [resBerita, resKategori] = await Promise.all([
          axios.get("https://api-sikarate.mydemoapp.site/blog/", {
            headers: { Authorization: `Bearer ${token}` },
          }),
          axios.get("https://api-sikarate.mydemoapp.site/kategori/", {
            headers: { Authorization: `Bearer ${token}` },
          }),
        ]);

        setBerita(resBerita.data.data || []);
        setKategoriList(resKategori.data.data || []);
      } catch (error) {
        console.error("Gagal mengambil data:", error);
        setBerita([]);
        setKategoriList([]);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");

    try {
      await axios.post(
        "https://api-sikarate.mydemoapp.site/blog/",
        {
          id_kategori: parseInt(form.id_kategori),
          judul: form.judul,
          isi: form.isi,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      setForm({ id_kategori: "", judul: "", isi: "" });
      alert("Berita berhasil ditambahkan!");
      setModalOpen(false);

      const res = await axios.get("https://api-sikarate.mydemoapp.site/blog/", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setBerita(res.data.data || []);
    } catch (error) {
      console.error("Gagal menambahkan berita:", error);
      alert("Terjadi kesalahan saat menyimpan berita.");
    }
  };

  const filteredBerita = berita.filter((item) =>
    item.judul.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="flex h-screen">
      <Sidebar role="admin" />
      <div className="flex-1 flex flex-col bg-gray-100">
        <Navbar role="admin" search={search} setSearch={setSearch} />
        <main className="p-6 flex-1 overflow-y-auto">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-bold">Daftar Artikel</h2>
            <button
              className="bg-blue-600 text-white px-4 py-2 rounded font-semibold hover:bg-blue-700"
              onClick={() => setModalOpen(true)}
            >
              + Tambah Artikel
            </button>
          </div>
          <div className="bg-white rounded-lg shadow overflow-x-auto">
            <table className="min-w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500">No</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500">Judul</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500">Kategori</th>
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  <tr>
                    <td colSpan={3} className="text-center py-8 text-gray-400">
                      Memuat data...
                    </td>
                  </tr>
                ) : filteredBerita.length === 0 ? (
                  <tr>
                    <td colSpan={3} className="text-center py-8 text-gray-400">
                      Tidak ada data berita.
                    </td>
                  </tr>
                ) : (
                  filteredBerita.map((item, idx) => (
                    <tr key={item.id} className="border-b hover:bg-gray-50">
                      <td className="px-4 py-3">{idx + 1}</td>
                      <td className="px-4 py-3">{item.judul}</td>
                      <td className="px-4 py-3">{item.kategori}</td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

          {/* Modal Tambah Artikel */}
          {modalOpen && (
            <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
              <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-xl">
                <h3 className="text-xl font-semibold mb-4">Tambah Artikel</h3>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Judul</label>
                    <input
                      type="text"
                      name="judul"
                      value={form.judul}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-2 border border-gray-300 rounded-md"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Kategori</label>
                    <select
                      name="id_kategori"
                      value={form.id_kategori}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-2 border border-gray-300 rounded-md"
                    >
                      <option value="">Pilih Kategori</option>
                      {kategoriList.map((kat) => (
                        <option key={kat.id_kategori} value={kat.id_kategori}>
                          {kat.nama}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Isi</label>
                    <textarea
                      name="isi"
                      value={form.isi}
                      onChange={handleChange}
                      required
                      rows={6}
                      className="w-full px-4 py-2 border border-gray-300 rounded-md resize-y"
                    ></textarea>
                  </div>

                  <div className="flex justify-end gap-2">
                    <button
                      type="button"
                      onClick={() => setModalOpen(false)}
                      className="px-4 py-2 border rounded-md text-gray-700 hover:bg-gray-100"
                    >
                      Batal
                    </button>
                    <button
                      type="submit"
                      className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                    >
                      Simpan
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

export default DaftarBerita;

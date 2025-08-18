import axios from "axios";
import { useEffect, useState } from "react";
import Navbar from "../layout/Navbar";
import Sidebar from "../layout/Sidebar";

const DaftarBerita = () => {
  const [search, setSearch] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [berita, setBerita] = useState([]);
  const [kategoriList, setKategoriList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState({
    id_artikel: null,
    id_kategori: "",
    judul: "",
    isi: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

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

  useEffect(() => {
    fetchData();
  }, []);

  // Saat klik Edit
const handleEdit = (item) => {
  setForm({
    id_artikel: item.id_artikel,   // ✅ simpan id_artikel, bukan id_kategori
    id_kategori: item.id_kategori,
    judul: item.judul,
    isi: item.isi,
  });
  setIsEdit(true);
  setModalOpen(true);
};

// Saat Submit
const handleSubmit = async (e) => {
  e.preventDefault();
  const token = localStorage.getItem("token");

  try {
    if (isEdit && form.id_artikel) {
      // ✅ Update artikel pakai id_artikel
      await axios.put(
        `https://api-sikarate.mydemoapp.site/blog/${form.id_artikel}`,
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
      alert("Berita berhasil diperbarui!");
    } else {
      // Tambah artikel baru
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
      alert("Berita berhasil ditambahkan!");
    }

    // Reset form & reload data
    setForm({ id_artikel: null, id_kategori: "", judul: "", isi: "" });
    setModalOpen(false);
    setIsEdit(false);
    fetchData(); // ✅ refresh daftar berita
  } catch (error) {
    console.error("Gagal menyimpan berita:", error);
    alert("Terjadi kesalahan saat menyimpan berita.");
  }
};


  const handleDelete = async (id_artikel) => {
    const token = localStorage.getItem("token");
    if (window.confirm("Apakah Anda yakin ingin menghapus berita ini?")) {
      try {
        await axios.delete(`https://api-sikarate.mydemoapp.site/blog/${id_artikel}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        alert("Berita berhasil dihapus!");
        fetchData();
      } catch (error) {
        console.error("Gagal menghapus berita:", error);
        alert("Terjadi kesalahan saat menghapus berita.");
      }
    }
  };

  const filteredBerita = berita.filter((item) =>
    item.judul.toLowerCase().includes(search.toLowerCase())
  );

  return (
   <div className="flex min-h-screen">
  {/* Sidebar */}
  <Sidebar role="admin" />

  {/* Konten */}
  <div className="flex-1 flex flex-col bg-gray-100">
    <Navbar role="admin" search={search} setSearch={setSearch} />
    <main className="p-4 md:p-6 flex-1">
      
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-4 gap-3">
        <h2 className="text-xl md:text-2xl font-bold">Daftar Artikel</h2>
        <button
          className="bg-blue-600 text-white px-4 py-2 rounded font-semibold hover:bg-blue-700 text-sm md:text-base"
          onClick={() => {
            setIsEdit(false);
            setForm({ id: null, id_kategori: "", judul: "", isi: "" });
            setModalOpen(true);
          }}
        >
          + Tambah Artikel
        </button>
      </div>

      {/* ✅ bikin table bisa scroll di mobile */}
      <div className="bg-white rounded-lg shadow overflow-x-auto">
        <table className="min-w-full text-sm md:text-base">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-3 py-2 md:px-4 md:py-3 text-left">No</th>
              <th className="px-3 py-2 md:px-4 md:py-3 text-left">Judul</th>
              <th className="px-3 py-2 md:px-4 md:py-3 text-left">Kategori</th>
              <th className="px-3 py-2 md:px-4 md:py-3 text-left">Isi</th>
              <th className="px-3 py-2 md:px-4 md:py-3 text-left">Aksi</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan={5} className="text-center py-6 text-gray-400">
                  Memuat data...
                </td>
              </tr>
            ) : filteredBerita.length === 0 ? (
              <tr>
                <td colSpan={5} className="text-center py-6 text-gray-400">
                  Tidak ada data berita.
                </td>
              </tr>
            ) : (
              filteredBerita.map((item, idx) => (
                <tr key={item.id_artikel} className="border-b hover:bg-gray-50">
                  <td className="px-3 py-2">{idx + 1}</td>
                  <td className="px-3 py-2">{item.judul}</td>
                  <td className="px-3 py-2">{item.kategori}</td>
                  <td className="px-3 py-2 max-w-xs truncate">{item.isi}</td>
                  <td className="px-3 py-2 flex flex-wrap gap-2">
                    <button
                      onClick={() => handleEdit(item)}
                      className="px-2 py-1 text-xs md:text-sm bg-yellow-500 text-white rounded hover:bg-yellow-600"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(item.id_artikel)}
                      className="px-2 py-1 text-xs md:text-sm bg-red-600 text-white rounded hover:bg-red-700"
                    >
                      Hapus
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>


          {/* Modal Tambah / Edit Artikel */}
          {modalOpen && (
            <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
              <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-xl">
                <h3 className="text-xl font-semibold mb-4">
                  {isEdit ? "Edit Artikel" : "Tambah Artikel"}
                </h3>
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
                      onClick={() => {
                        setModalOpen(false);
                        setIsEdit(false);
                      }}
                      className="px-4 py-2 border rounded-md text-gray-700 hover:bg-gray-100"
                    >
                      Batal
                    </button>
                    <button
                      type="submit"
                      className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                    >
                      {isEdit ? "Update" : "Simpan"}
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

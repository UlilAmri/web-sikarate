import axios from 'axios';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const navigate = useNavigate();
  const [berita, setBerita] = useState([]);

  const handlemasuk = () => {
    navigate("/login");
  };

  useEffect(() => {
    const fetchBerita = async () => {
      const token = localStorage.getItem("token");
      try {
        const res = await axios.get("https://api-sikarate.mydemoapp.site/blog/", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setBerita(res.data.data || []); // <- ambil dari data.data
      } catch (error) {
        console.error("Gagal memuat berita:", error);
        setBerita([]);
      }
    };

    fetchBerita();
  }, []);

  return (
    <div className="min-h-screen font-sans bg-gradient-to-br from-blue-400 to-cyan-600 text-white">
      {/* Navbar */}
      <nav className="bg-white shadow-md px-6 py-4 flex justify-between items-center">
        <div className="flex items-center space-x-4">
          <img src="/logo.png" alt="Logo SIKARATEKA" className="h-10" />
          <div>
            <h1 className="text-xl font-bold text-red-800">SIKARATEKA</h1>
            <p className="text-xs text-gray-500 -mt-1 font-bold">
              Sistem Informasi Kebakaran dan Penyelamatan Terpadu Kolaborasi Aktif
            </p>
          </div>
        </div>
        <button
          className="bg-red-700 hover:bg-red-600 text-white px-4 py-2 rounded-md text-sm font-semibold transition"
          onClick={handlemasuk}
        >
          Masuk
        </button>
      </nav>

      {/* Hero Section */}
      <section className="flex flex-col items-center justify-center text-center py-20 px-4">
        <h1 className="text-3xl md:text-4xl font-bold mb-4">Selamat Datang di SIKARATEKA</h1>
        <p className="text-lg text-white/90 max-w-2xl mb-10">
          Web pelaporan dan informasi kebakaran & penyelamatan Dinas Pemadam Kebakaran Kota Mataram
        </p>
        <div className="flex gap-10">
          <img src="/logo-kota.png" alt="Logo Mataram" className="h-36 drop-shadow-lg p-2 rounded-xl" />
          <img src="/logo.png" alt="Logo Damkar" className="h-36 drop-shadow-lg p-2 rounded-xl" />
        </div>
      </section>

      {/* Blog / Artikel Berita */}
      <section className="bg-white text-gray-800 px-8 py-12">
        <h2 className="text-2xl font-bold mb-6 text-center">Berita Terbaru</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {berita.length > 0 ? (
            berita.map((item) => (
              <div
                key={item.id}
                onClick={() => navigate(`/berita/${item.id}`)}
                className="bg-gray-100 rounded-lg shadow-md p-4 hover:shadow-lg transition duration-300"
              >
                <h3 className="font-semibold text-lg mb-2">{item.judul}</h3>
                <p className="text-sm text-gray-600 mb-2">
                  {new Date(item.created_at).toLocaleDateString("id-ID")}
                </p>
                <p className="text-sm text-gray-700 line-clamp-3">{item.isi}</p>
              </div>
            ))
          ) : (
            <p className="text-center col-span-3 text-gray-500 italic">Belum ada berita tersedia</p>
          )}
        </div>
      </section>
    </div>
  );
};

export default Home;

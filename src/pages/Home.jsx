import { PhoneIcon } from "@heroicons/react/24/solid";
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const navigate = useNavigate();
  const [berita, setBerita] = useState([]);

  const handlemasuk = () => {
    navigate("/login");
  };

  // Emergency Call handler
const handleEmergencyWa = () => {
  const nomorWA = "6281917917474"; // ganti dengan nomor WA darurat
  const waLink = `https://wa.me/${nomorWA}`;
  window.open(waLink, "_blank"); // buka WA langsung
};
const handleEmergencyCall = () => {
  const nomorTelp = "0370645872"; // ganti dengan nomor telepon darurat
  window.location.href = `tel:${nomorTelp}`; // langsung panggil nomor telepon
};
  const linkMap = {
    3: "https://youtu.be/N0aDMVGjolU?si=DyIoFmfZckgYuXfS",
    4: "https://youtu.be/mcAwxtazLcw?si=oiKf6ErgD26LVMUt",
  };

  useEffect(() => {
    const fetchBerita = async () => {
      const token = localStorage.getItem("token");
      try {
        const res = await axios.get("https://api-sikarateka.mataramkota.go.id/blog/", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setBerita(res.data.data || []);
      } catch (error) {
        console.error("Gagal memuat berita:", error);
        setBerita([]);
      }
    };

    fetchBerita();
  }, []);

  return (
    <div className="min-h-screen font-sans bg-gray-50 text-gray-900 relative pt-10">
      {/* Navbar */}
<nav className="fixed top-0 left-0 w-full bg-gray-900 px-6 py-4 flex justify-between items-center z-50 shadow-md">
  <div className="flex items-center space-x-4">
    <img
      src="/logo.png"
      alt="Logo SIKARATEKA"
      className="h-10 bg-white/40 p-1 rounded"
    />

    <div>
      <h1 className="text-xl font-bold text-red-600 flex items-center gap-1 -mt-1">
        SIKARATEKA
      </h1>
      <p className="text-xs text-gray-300 -mt-1 font-semibold">
        Sistem Informasi Kebakaran & Penyelamatan Terpadu Kolaborasi Aktif
      </p>
    </div>
  </div>
  <button
    className="bg-gray-700 hover:bg-gray-600 text-white px-4 py-2 rounded-md text-sm font-semibold transition"
    onClick={handlemasuk}
  >
    Masuk
  </button>
</nav>

      {/* Hero Section */}
      <section
        className="relative flex flex-col items-center md:items-start justify-center py-40 px-6 md:px-20 bg-cover bg-center"
        style={{ backgroundImage: "url(/ooo.jpg)" }}
      >
        <div className="absolute inset-0 bg-black/30 backdrop-blur-sm"></div>
        <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-black/10 to-transparent"></div>

        <div className="relative z-10 max-w-2xl text-center md:text-left">
          <h4 className="text-4xl md:text-5xl font-extrabold mb-6 text-white drop-shadow-lg md:ml-[-5px]">
            Selamat Datang di SIKARATEKA
          </h4>
          <p className="text-lg text-gray-200 mb-10 md:ml-[-5px]">
            Sistem Informasi Kebakaran & Penyelamatan Terpadu Kolaborasi Aktif
            <br />Dinas Pemadam Kebakaran Kota Mataram
          </p>

          {/* Emergency Call Button */}
          <button
            onClick={handleEmergencyCall}
            className="bg-red-500 hover:bg-red-600 text-white px-6 md:px-8 py-3 md:py-4 rounded-full shadow-lg flex items-center justify-center gap-2 font-bold text-base md:text-lg transition transform hover:scale-105 mx-auto md:mx-0"
          >
            {/* Phone Logo */}
            <img src="/phone-logo.png" alt="Telepon" className="h-6 w-6 mr-1" />
            Emergency Call
          </button>
          <button
            onClick={handleEmergencyWa}
            className="bg-green-500 hover:bg-green-600 text-white px-6 md:px-8 py-3 md:py-4 rounded-full shadow-lg flex items-center justify-center gap-2 font-bold text-base md:text-lg transition transform hover:scale-105 mx-auto md:mx-0 mt-3"
          >
            {/* WhatsApp Logo */}
            <img src="/whatsapp-logo.png" alt="WhatsApp" className="h-6 w-6 mr-1" />
            Emergency WhatsApp
          </button>
        </div>
      </section>
      {/* Blog / Artikel Berita */}}
      <section className="bg-gray-50 text-gray-900 px-8 py-16">
        <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">Berita Terbaru</h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {berita.length > 0 ? (
            berita.map((item) => (
              <a
                key={item.id_artikel}
                href={linkMap[item.id_artikel] || "#"}
                target="_blank"
                rel="noopener noreferrer"
                className="block bg-white rounded-lg shadow-md p-4 hover:shadow-lg hover:scale-[1.02] transition duration-300 border border-gray-200"
              >
                <div className="mt-4">
                  <h3 className="font-semibold text-lg mb-2 text-gray-800">{item.judul}</h3>
                  <p className="text-sm text-gray-500 mb-2">
                    {new Date(item.created_at).toLocaleDateString("id-ID")}
                  </p>
                  <p className="text-sm text-gray-700 line-clamp-3">{item.isi}</p>
                </div>
              </a>
            ))
          ) : (
            <p className="text-center col-span-3 text-gray-500 italic">
              Belum ada berita tersedia
            </p>
          )}
        </div>
      </section>

      {/* Floating Emergency Button */}
      <a
        href="https://wa.me/6281917917474"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 bg-green-500 hover:bg-green-600 text-white p-5 rounded-full shadow-xl flex items-center justify-center z-50 animate-bounce"
      >
        <PhoneIcon className="h-7 w-7" />
      </a>
    </div>
  );
};

export default Home;

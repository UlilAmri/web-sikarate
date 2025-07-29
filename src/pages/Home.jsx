import { useNavigate } from 'react-router-dom';
const Home = () => {
  const navigate = useNavigate();

  const handlemasuk = () => {
    navigate("/login"); // 
  }; 

  return (
    <div className="min-h-screen font-sans bg-gradient-to-br from-blue-400 to-cyan-600 text-white">
      {/* Navbar */}
      <nav className="bg-white shadow-md px-6 py-4 flex justify-between items-center">
        <div className="flex items-center space-x-4">
          <img src="/logo.png" alt="Logo SIKARATE" className="h-10" />
          <div>
            <h1 className="text-xl font-bold text-red-800">SIKARATE</h1>
            <p className="text-xs text-gray-500 -mt-1 font-bold">
              Sistem Informasi Kebakaran dan Penyelamatan Terpadu
            </p>
          </div>
        </div>
        <button className="bg-red-700 hover:bg-red-600 text-white px-4 py-2 rounded-md text-sm font-semibold transition" onClick={handlemasuk}>
          Masuk
        </button>
      </nav>

      {/* Hero Section */}
      <section className="flex flex-col items-center justify-center text-center py-20 px-4">
        <h1 className="text-3xl md:text-4xl font-bold mb-4">Selamat Datang di SIKARATE</h1>
        <p className="text-lg text-white/90 max-w-2xl mb-10">
          Web pelaporan dan informasi kebakaran & penyelamatan Terpadu Dinas Pemadam Kebakaran Kota Mataram
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
          {[...Array(6)].map((_, i) => (
            <div
              key={i}
              className="bg-gray-100 rounded-lg shadow-md h-48 flex items-center justify-center text-gray-500 text-sm italic"
            >
              [Artikel akan muncul di sini]
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Home;

    // src/pages/DetailBerita.jsx
    import axios from "axios";
    import { useEffect, useState } from "react";
    import { useParams, useNavigate } from "react-router-dom";

    const DetailBerita = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [berita, setBerita] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchDetail = async () => {
        const token = localStorage.getItem("token");
        try {
            const res = await axios.get(`https://api-sikarate.mydemoapp.site/blog/${id}`, {
            headers: { Authorization: `Bearer ${token}` },
            });
            setBerita(res.data.data); // ambil data dari API
        } catch (err) {
            console.error("Gagal memuat detail berita:", err);
        } finally {
            setLoading(false);
        }
        };

        fetchDetail();
    }, [id]);

    if (loading) {
        return (
        <div className="min-h-screen flex justify-center items-center">
            <p>Memuat berita...</p>
        </div>
        );
    }

    if (!berita) {
        return (
        <div className="min-h-screen flex flex-col justify-center items-center">
            <p className="text-gray-500">Berita tidak ditemukan</p>
            <button
            onClick={() => navigate(-1)}
            className="mt-4 px-4 py-2 bg-red-700 text-white rounded hover:bg-red-600"
            >
            Kembali
            </button>
        </div>
        );
    }

    return (
        <div className="min-h-screen bg-white text-gray-800">
        {/* Navbar sederhana */}
        <nav className="bg-red-700 text-white px-6 py-4 flex justify-between items-center">
            <h1 className="font-bold text-lg">Detail Berita</h1>
            <button
            onClick={() => navigate(-1)}
            className="bg-white text-red-700 px-4 py-1 rounded hover:bg-gray-200"
            >
            Kembali
            </button>
        </nav>

        {/* Konten berita */}
        <div className="max-w-4xl mx-auto p-6">
            <h2 className="text-2xl font-bold mb-2">{berita.judul}</h2>
            <p className="text-sm text-gray-500 mb-6">
            {new Date(berita.created_at).toLocaleDateString("id-ID")}
            </p>
            <div className="prose max-w-none" dangerouslySetInnerHTML={{ __html: berita.isi }} />
        </div>
        </div>
    );
    };

    export default DetailBerita;

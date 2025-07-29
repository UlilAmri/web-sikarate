    import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../layout/Navbar";
import Sidebar from "../layout/Sidebar";

    const TambahBerita = () => {
    const [judul, setJudul] = useState("");
    const [isi, setIsi] = useState("");
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        // Kirim data ke backend (misalnya dengan fetch atau axios)
        console.log("Judul:", judul);
        console.log("Isi:", isi);
        // Setelah berhasil simpan
        navigate("/daftarartikel"); // kembali ke halaman daftar berita (ubah sesuai routing-mu)
    };

    return (
        <div className="flex h-screen">
        <Sidebar role="admin" />
        <div className="flex-1 flex flex-col bg-gray-100">
            <Navbar role="admin" />

            <main className="p-6 flex-1 overflow-y-auto">
            <div className="max-w-3xl mx-auto bg-white shadow-md rounded-lg p-6">
                <h2 className="text-2xl font-bold mb-4">Tambah Artikel</h2>

                <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                    Judul
                    </label>
                    <input
                    type="text"
                    value={judul}
                    onChange={(e) => setJudul(e.target.value)}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring focus:ring-blue-200 focus:outline-none"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                    Isi Berita
                    </label>
                    <textarea
                    value={isi}
                    onChange={(e) => setIsi(e.target.value)}
                    required
                    rows={8}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md resize-y focus:ring focus:ring-blue-200 focus:outline-none"
                    ></textarea>
                </div>

                <div className="flex justify-end gap-3">
                    <button
                    type="button"
                    onClick={() => navigate("/berita")}
                    className="px-4 py-2 rounded-md border text-gray-700 hover:bg-gray-100"
                    >
                    Batal
                    </button>
                    <button
                    type="submit"
                    className="px-4 py-2 rounded-md bg-blue-600 text-white hover:bg-blue-700"
                    >
                    Simpan
                    </button>
                </div>
                </form>
            </div>
            </main>
        </div>
        </div>
    );
    };

    export default TambahBerita;

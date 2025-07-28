import { useState } from "react";

const posts = [
];

const Home = () => {
  const [selectedPost, setSelectedPost] = useState(null);

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center px-4">
      <div className="flex items-center justify-center gap-8 mb-6">
        <img src="/kop.png" alt="Logo Damkar" className="h-28 w-auto" />
        <img src="/logo.png" alt="Logo Mataram" className="h-28 w-auto" />
      </div>

      <h1 className="text-2xl md:text-3xl font-bold text-center text-gray-800 mb-4">
        Dinas Pemadam Kebakaran dan Penyelamatan Kota Mataram
      </h1>

      <p className="text-center text-gray-600 max-w-xl mb-6">
        Selamat datang di sistem informasi pemadam kebakaran dan penyelamatan Kota Mataram. 
        Silakan login untuk mengakses layanan pelaporan dan informasi penanganan kejadian.
      </p>

      <a
        href="/login"
        className="px-6 py-2 bg-red-600 text-white rounded-xl shadow hover:bg-red-700 transition duration-200 mb-8"
      >
        Masuk
      </a>

      {/* Blog Section */}
      <div className="w-full max-w-2xl mt-8">
        <h2 className="text-xl font-bold mb-4 text-gray-800">Artikel & Informasi</h2>
        {!selectedPost ? (
          <div className="space-y-4">
            {posts.length === 0 ? (
              <div className="text-gray-500 text-center py-10">
                Belum ada artikel blog.
              </div>
            ) : (
              posts.map((post) => (
                <div
                  key={post.id}
                  className="bg-white p-4 rounded shadow hover:bg-gray-50 cursor-pointer"
                  onClick={() => setSelectedPost(post)}
                >
                  <h3 className="text-lg font-semibold">{post.title}</h3>
                  <div className="text-xs text-gray-500 mb-1">
                    {post.author} | {post.date}
                  </div>
                  <p className="text-gray-700">{post.excerpt}</p>
                </div>
              ))
            )}
          </div>
        ) : (
          <div className="bg-white p-6 rounded shadow">
            <button
              className="mb-4 text-blue-600 hover:underline"
              onClick={() => setSelectedPost(null)}
            >
              &larr; Kembali ke daftar artikel
            </button>
            <h3 className="text-2xl font-bold mb-2">{selectedPost.title}</h3>
            <div className="text-sm text-gray-500 mb-4">
              {selectedPost.author} | {selectedPost.date}
            </div>
            <p>{selectedPost.content}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
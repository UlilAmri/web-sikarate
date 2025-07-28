    import React, { useState } from "react";

    const BlogView = () => {
    
    const posts = [];

    const [selectedPost, setSelectedPost] = useState(null);

    return (
        <div className="p-6 max-w-3xl mx-auto">
        <h2 className="text-2xl font-bold mb-6">Blog Damkar</h2>
        {!selectedPost ? (
            <div className="space-y-6">
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
                    <h3 className="text-xl font-semibold">{post.title}</h3>
                    <div className="text-sm text-gray-500 mb-2">
                    {post.author} | {post.date}
                    </div>
                    <p>{post.excerpt}</p>
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
                &larr; Kembali ke daftar blog
            </button>
            <h3 className="text-2xl font-bold mb-2">{selectedPost.title}</h3>
            <div className="text-sm text-gray-500 mb-4">
                {selectedPost.author} | {selectedPost.date}
            </div>
            <p>{selectedPost.content}</p>
            </div>
        )}
        </div>
    );
    };

    export default BlogView;
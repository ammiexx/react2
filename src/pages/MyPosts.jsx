import React, { useEffect, useState } from 'react';
import { useUser } from '@clerk/clerk-react';
import { useNavigate } from 'react-router-dom';

const MyPosts = () => {
  const { user } = useUser();
  const navigate = useNavigate();
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    if (user) {
      fetch(`https://djanagobackend-5.onrender.com/api/myproducts/?userId=${user.id}`)
        .then(res => res.json())
        .then(data => setPosts(data))
        .catch(err => console.error("Error fetching posts:", err));
    }
  }, [user]);

  const handleEdit = (postId) => {
    navigate(`/edit-post/${postId}`);
  };

  const handleDelete = async (postId) => {
    const confirm = window.confirm("Are you sure you want to delete this post?");
    if (confirm) {
      await fetch(`https://djanagobackend-5.onrender.com/api/my-products/${postId}/`, {
        method: "DELETE",
      });

      // Remove deleted post from UI
      setPosts(prev => prev.filter(p => p.id !== postId));
    }
  };

  if (!user) {
    return <p>Please log in to view your posts.</p>;
  }

  return (
    <div className="max-w-3xl mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">My Posts</h2>

      {posts.length === 0 ? (
        <p>No posts found.</p>
      ) : (
        posts.map(post => (
          <div key={post.id} className="border rounded p-4 mb-3 shadow-sm">
            <h3 className="text-xl font-semibold">{post.product_name}</h3>
            <p className="text-gray-600">{post.description}</p>
            <p className="text-sm text-gray-500 mt-2">Category: {post.category}</p>
            <div className="mt-3 flex gap-3">
              <button
                onClick={() => handleEdit(post.id)}
                className="text-blue-600 hover:underline"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(post.id)}
                className="text-red-500 hover:underline"
              >
                Delete
              </button>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default MyPosts;

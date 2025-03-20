import { useState } from "react";
import axios from "axios";

const BlogForm = ({ onBlogAdded }) => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const user = JSON.parse(localStorage.getItem("user"));
  const [author] = useState(user?.name || "");
  const BASE_URL = import.meta.env.VITE_BASE_URL || "http://localhost:5000";
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(
        `${BASE_URL}/blogs/create`,
        { title, content, author },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          withCredentials: true,
        }
      );
      setTitle("");
      setContent("");
      onBlogAdded();
    } catch (error) {
      console.error("Error creating blog:", error);
    }
  };

  return (
    <>
      {user && (
        <form
          onSubmit={handleSubmit}
          className="bg-black border border-gray-700 m-3 text-white p-6 rounded-lg shadow-lg w-full max-w-2xl mx-auto"
        >
          {/* Header */}
          <h2 className="text-2xl font-semibold mb-4 text-center">
            Create a New Blog
          </h2>

          {/* Title Input */}
          <div className="mb-4">
            <label className="block text-gray-400 mb-2">Title</label>
            <input
              type="text"
              placeholder="Enter blog title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full p-3 border border-gray-700 bg-gray-900 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Content Textarea */}
          <div className="mb-4">
            <label className="block text-gray-400 mb-2">Content</label>
            <textarea
              placeholder="Write your blog content..."
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="w-full h-40 p-3 border border-gray-700 bg-gray-900 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            ></textarea>
          </div>

          {/* Author (Read-Only) */}
          <div className="mb-4">
            <label className=" text-gray-400 mb-2 hidden">Author</label>
            <input
              type="text"
              value={author}
              readOnly
              className="w-full hidden p-3 border border-gray-900 bg-gray-800 text-gray-400 rounded-lg cursor-not-allowed"
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full hover:cursor-pointer bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg transition duration-200 shadow-md"
          >
            Publish Blog
          </button>
        </form>
      )}
    </>
  );
};

export default BlogForm;

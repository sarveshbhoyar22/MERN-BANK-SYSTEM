import axios from "axios";
import { format } from "date-fns";

const BlogCard = ({ blog, onBlogDeleted }) => {
  const user = JSON.parse(localStorage.getItem("user"));

  const handleDelete = async () => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this blog?"
    );
    if (!confirmDelete) return;

    try {
      await axios.delete(`http://localhost:5000/blogs/${blog._id}`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        withCredentials: true,
      });
      onBlogDeleted();
    } catch (error) {
      console.error("Error deleting blog:", error);
    }
  };

  return (
    <div className="bg-gray-900 text-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow duration-300 border border-gray-800">
      {/* Blog Title */}
      <h3 className="text-2xl font-semibold text-blue-400 mb-2">
        {blog.title}
      </h3>

      {/* Blog Content */}
      <p className="text-gray-300 mb-4 max-h-48 overflow-auto">{blog.content}</p>

      {/* Author & Date */}
      <div className="flex justify-between items-center text-sm text-gray-400 mb-3">
        <span>
          By <span className="font-semibold">{blog.author}</span>
        </span>
        <span>{format(new Date(blog.createdAt), "MMM dd, yyyy")}</span>
      </div>

      {/* Delete Button (Only for the Author) */}
      {user?.name === blog.author && (
        <button
          onClick={handleDelete}
          className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg font-medium transition-all duration-200 shadow-md"
        >
          Delete Blog
        </button>
      )}
    </div>
  );
};

export default BlogCard;

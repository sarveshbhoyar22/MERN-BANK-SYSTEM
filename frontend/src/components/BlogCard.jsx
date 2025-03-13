import axios from "axios";
import { useAuthContext } from "../context/AuthContext";

const BlogCard = ({ blog, onBlogDeleted }) => {

    // const {authUser:user} = useAuthContext();
    const user = JSON.parse(localStorage.getItem("user"));
    // console.log("username",user.name);
    // console.log("blog author",blog.author);
    
  const handleDelete = async () => {
    try {
        const confirmDelete = window.confirm("Are you sure you want to delete this blog?");
        if (!confirmDelete) return;
      await axios.delete(`http://localhost:5000/blogs/${blog._id}`,{
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
    <div className="border rounded-lg p-4 shadow">
      <h3 className="text-xl font-bold">{blog.title}</h3>
      <p className="text-gray-300">{blog.content}</p>
      <p className="text-sm text-gray-400">By {blog.author}</p>
      <p className="text-sm text-gray-400">{blog.createdAt.split("T")[0]}</p>
      {user?.name === blog.author && (<button
        onClick={handleDelete}
        className="mt-2 bg-red-500 text-white px-3 py-1 rounded"
      >
        Delete
      </button> )}

    </div>
  );
};

export default BlogCard;

import { useEffect, useState } from "react";
import axios from "axios";
import BlogForm from "../components/BlogForm";
import BlogList from "../components/BlogList";
import toast from "react-hot-toast";
import { useAuthContext } from "../context/AuthContext";

const BlogPage = () => {
  const [blogs, setBlogs] = useState([]);
  const [open, setOpen] = useState(false);
  const {authUser:user} = useAuthContext(); // Destructure user from useAuthContext

  const handleCreateBlog = () => {
    if(user){
        
        setOpen(!open);
    }
    else{
        toast.error("Please login to create a blog");
    }
  }

  useEffect(() => {
    fetchBlogs();
  }, []);

  const fetchBlogs = async () => {
    try {
      const response = await axios.get("http://localhost:5000/blogs",{
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        withCredentials: true,
      });
      setBlogs(response.data);
    } catch (error) {
      console.error("Error fetching blogs:", error);
    }
  };

  return (
    <div className="bg-black">
        
    <div className=" bg-black max-w-4xl mx-auto p-4">
        <div className="mt-20">

      <h1 className="text-3xl font-bold text-center mb-6">Blog Page</h1>
      <button onClick={handleCreateBlog} className={`${open ? "bg-red-500 w-1/6 "  : "bg-blue-500 w-full"}  hover:bg-blue-400 text-white px-4 py-2 rounded mb-4 cursor-pointer `}>
        {open ? "Close" : "Create Blog"}
      </button>
     {open ? <BlogForm onBlogAdded={fetchBlogs} /> : ""}
      <BlogList blogs={blogs} onBlogDeleted={fetchBlogs} />
    </div>
        </div>
    </div>
  );
};

export default BlogPage;

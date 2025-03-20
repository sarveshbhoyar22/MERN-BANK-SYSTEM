import { useEffect, useState } from "react";
import axios from "axios";
import BlogForm from "../components/BlogForm";
import BlogList from "../components/BlogList";
import toast from "react-hot-toast";
import { useAuthContext } from "../context/AuthContext";
import { Navigate } from "react-router-dom";
import { IoIosCloseCircleOutline } from "react-icons/io";
import Goback from "../components/Goback";
const BlogPage = () => {
  const [blogs, setBlogs] = useState([]);
  const [open, setOpen] = useState(false);
  const {authUser:user} = useAuthContext(); 
  const BASE_URL = import.meta.env.VITE_BASE_URL || "http://localhost:5000";
  const handleCreateBlog = () => {
    if(user !== null){
        
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
      const response = await axios.get(`${BASE_URL}/blogs`, {
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
          <h1 className="text-3xl font-bold text-center mb-6"><Goback/>Blog Page</h1>
          <button
            onClick={handleCreateBlog}
            className={`${
              open
                ? " hover:bg-red-500 rounded-full "
                : "bg-blue-500 hover:bg-blue-600 w-full"
            }   text-white px-4 py-2 rounded mb-4 cursor-pointer `}
          >
            {open ? (
              <IoIosCloseCircleOutline className="text-3xl" />
            ) : (
              "Create Blog"
            )}
          </button>
          {open ? <BlogForm onBlogAdded={fetchBlogs} /> : ""}
          <BlogList blogs={blogs} onBlogDeleted={fetchBlogs} />
        </div>
      </div>
    </div>
  );
};

export default BlogPage;

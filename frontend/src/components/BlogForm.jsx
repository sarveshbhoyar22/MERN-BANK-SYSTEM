import { useState } from "react";
import axios from "axios";
import { useAuthContext } from "../context/AuthContext";

const BlogForm = ({ onBlogAdded }) => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
//   const {authUser:user} = useAuthContext(); 
  const user = JSON.parse(localStorage.getItem("user"));
  const [author, setAuthor] = useState(`${user?.name}`);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
        // setAuthor(user?.name);
      await axios.post("http://localhost:5000/blogs/create", {
        title,
        content,
        author 
      },{

        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        withCredentials: true,
      });
      setTitle("");
      setContent("");
      setAuthor("");
      onBlogAdded();
    } catch (error) {
      console.error("Error creating blog:", error);
    }
  };

  return (
    <>
      {user && <form
        onSubmit={handleSubmit}
        className="mb-6 p-4 border rounded-lg shadow"
      >
        <h2 className="text-xl font-semibold mb-4">Create a New Blog</h2>
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full p-2 mb-2 border rounded"
        />
        <textarea
          placeholder="Content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="w-full h-64 p-2 mb-2 border rounded"
        />
        <input
          type="text"
          placeholder="Author"
          value={author}
          readOnly
          onChange={(e) => setTitle(e.target.value)}
          className="w-full p-2 mb-2  rounded text-gray-400"
        />

        <button
          type="submit"
          className="bg-blue-500 text-white p-2 rounded w-full cursor-pointer"
        >
          Submit
        </button>
      </form>}
    </>
  );
};

export default BlogForm;

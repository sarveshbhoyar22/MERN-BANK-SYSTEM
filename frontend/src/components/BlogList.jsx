import { Loader } from "lucide-react";
import BlogCard from "./BlogCard";

const BlogList = ({ blogs, onBlogDeleted }) => {
  return (
    <div className="space-y-4 flex flex-col items-center justify-center">
      {blogs.length > 0 ? (
        blogs.map((blog) => (
          <BlogCard key={blog._id} blog={blog} onBlogDeleted={onBlogDeleted} />
        ))
      ) : (
        <p className="  h-40"><Loader className="animate-spin mt-10"/></p>
      )}
    </div>
  );
};

export default BlogList;

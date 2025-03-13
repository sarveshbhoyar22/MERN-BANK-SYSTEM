import BlogCard from "./BlogCard";

const BlogList = ({ blogs, onBlogDeleted }) => {
  return (
    <div className="space-y-4">
      {blogs.length > 0 ? (
        blogs.map((blog) => (
          <BlogCard key={blog._id} blog={blog} onBlogDeleted={onBlogDeleted} />
        ))
      ) : (
        <p className="text-center text-gray-500">No blogs available</p>
      )}
    </div>
  );
};

export default BlogList;

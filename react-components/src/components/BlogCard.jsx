function BlogCard({ title, content }) {
  return (
    <div className="blog-card">
      <h3>{title}</h3>
      <p>{content}</p>
    </div>
  );
}

export default BlogCard;
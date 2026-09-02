import { useState } from "react";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Card from "./components/Card";
import Button from "./components/Button";
import ContactForm from "./components/ContactForm";
import BlogCard from "./components/BlogCard";
import posts from "./posts.json";
import "./App.css";

function App() {
  const [count, setCount] = useState(0);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");

  const filteredPosts = posts.filter((post) => {
    const matchesSearch =
      post.title.toLowerCase().includes(search.toLowerCase()) ||
      post.content.toLowerCase().includes(search.toLowerCase());

    const matchesCategory =
      category === "All" || post.category === category;

    return matchesSearch && matchesCategory;
  });

  return (
    <>
      <Header />

      <main className="container">
        {/* React Components Practice */}
        <section className="practice-section">
          <h2>My React Practice</h2>

          <p>
            This project demonstrates reusable React components, props, and
            state for the Skill Nexis Week 1 assignment.
          </p>

          <Button
            text={`Clicked ${count} times`}
            onClick={() => setCount(count + 1)}
          />
        </section>

        {/* Topics */}
        <section className="topics-section">
          <h2>Topics I Learned</h2>

          <div className="card-container">
            <Card
              title="Reusable Components"
              description="Learn how to create and reuse React components."
            />
            <Card
              title="Props"
              description="Pass different data to components using props."
            />
            <Card
              title="State"
              description="Manage dynamic data using React useState."
            />
          </div>
        </section>

        {/* React Blog */}
        <section className="blog-section">
          <h2>My React Blog</h2>

          <div className="blog-controls">
            <input
              type="text"
              placeholder="Search blog posts..."
              value={search}
              onChange={(event) => setSearch(event.target.value)}
            />

            <select
              value={category}
              onChange={(event) => setCategory(event.target.value)}
            >
              <option value="All">All Categories</option>
              <option value="React">React</option>
              <option value="JavaScript">JavaScript</option>
              <option value="Web Development">Web Development</option>
            </select>
          </div>

          <div className="blog-container">
            {filteredPosts.length > 0 ? (
              filteredPosts.map((post) => (
                <BlogCard
                  key={post.id}
                  title={post.title}
                  content={post.content}
                />
              ))
            ) : (
              <p>No blog posts found.</p>
            )}
          </div>
        </section>

        <ContactForm />
      </main>

      <Footer />
    </>
  );
}

export default App;
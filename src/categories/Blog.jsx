import React from 'react';
import './Blog.css';

const blogPosts = [
  {
    id: 1,
    title: "How to Choose the Right Electronics for You",
    summary: "Learn the key features to look for when buying new electronics to make a smart purchase.",
    date: "July 25, 2025",
  },
  {
    id: 2,
    title: "Top 10 Cars of 2025",
    summary: "Explore the latest models that combine performance, safety, and style in 2025.",
    date: "July 15, 2025",
  },
  {
    id: 3,
    title: "Home Decor Trends You Can’t Miss",
    summary: "Discover modern design trends to refresh your living space and make it cozy.",
    date: "June 30, 2025",
  },
];

const Blog = () => {
  return (
    <div className="blog-container">
      <h2>Our Blog</h2>
      <p className="blog-intro">Stay updated with the latest tips, news, and trends from our experts.</p>

      <div className="blog-list">
        {blogPosts.map(({ id, title, summary, date }) => (
          <article key={id} className="blog-post">
            <h3 className="post-title">{title}</h3>
            <p className="post-date">{date}</p>
            <p className="post-summary">{summary}</p>
            <button className="read-more-btn" onClick={() => alert('Read more functionality coming soon!')}>
              Read More
            </button>
          </article>
        ))}
      </div>
    </div>
  );
};

export default Blog;

// src/pages/BlogPage.jsx
import './EventsPage.css'; // Reuse the EventsPage styling

function BlogPage() {
  return (
    <div className="homepage-layout">
      <div className="homepage-main-content" style={{ width: '100%' }}>
        <h1>Blog</h1>
        <p>Stay updated with the latest news and stories from the alternative running community.</p>
        
        {/* Placeholder content for the blog */}
        <div className="blog-content">
          <p>Our blog is coming soon! Check back later for articles, stories, and tips about alternative running events.</p>
        </div>
      </div>
    </div>
  );
}

export default BlogPage;

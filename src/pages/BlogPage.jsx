// src/pages/BlogPage.jsx
import { useEffect } from 'react';
import SEO from '../components/SEO'; // Import SEO component
import './EventsPage.css'; // Reuse the EventsPage styling
import './BlogPage.css'; // Add this import for custom styling

function BlogPage() {
  // Set background image for the blog page
  useEffect(() => {
    const pageBackground = document.querySelector('.page-background');
    if (pageBackground) {
      pageBackground.style.backgroundImage = 'url(/images/runblog.jpg)';
      console.log('BlogPage: Set background to runblog.jpg');
    }
  }, []);

  // Define SEO data for the blog page
  const seoData = {
    title: "Running Adventures & Tips | Alt.Run Blog",
    description: "Stay updated with the latest news, tips, and stories from the alternative running community. Discover fun running adventures and expert advice on Alt.Run.",
    canonicalUrl: "/blog",
    ogType: "blog",
    keywords: [
      "running blog", "alternative running", "fun running tips", "themed run advice",
      "obstacle course race tips", "beginner running advice", "running adventures",
      "social running", "charity run stories"
    ],
    schema: {
      "@context": "https://schema.org",
      "@type": "Blog",
      "@id": "https://alt.run/blog#webpage",
      "url": "https://alt.run/blog",
      "name": "Running Adventures & Tips | Alt.Run Blog",
      "description": "Stay updated with the latest news, tips, and stories from the alternative running community.",
      "isPartOf": { "@id": "https://alt.run/#website" }
    },
    breadcrumbs: [
      { name: "Home", path: "/" },
      { name: "Blog", path: "/blog" }
    ]
  };

  return (
    <div className="homepage-layout blog-page">
      {/* SEO Component */}
      <SEO {...seoData} />

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


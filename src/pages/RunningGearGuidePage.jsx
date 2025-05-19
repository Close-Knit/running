// src/pages/RunningGearGuidePage.jsx
import React, { useEffect, useRef } from 'react';
import GuideHeader from '../components/GuideHeader';
import TableOfContents from '../components/TableOfContents';
import GuideSection from '../components/GuideSection';
import FAQItem from '../components/FAQItem';
import SEO from '../components/SEO';
import './RunningGearGuidePage.css';

export default function RunningGearGuidePage() {
  const guideContentRef = useRef();

  // Set background image for the guide page
  useEffect(() => {
    const pageBackground = document.querySelector('.page-background');
    if (pageBackground) {
      pageBackground.style.backgroundImage = 'url(/images/running-gear-guide.jpg)';

      // Optimize background position for mobile
      const optimizeForMobile = () => {
        if (window.innerWidth <= 768) {
          pageBackground.style.backgroundPosition = 'center center';
        } else {
          pageBackground.style.backgroundPosition = 'center';
        }
      };

      // Run optimization immediately and on resize
      optimizeForMobile();
      window.addEventListener('resize', optimizeForMobile);

      // Clean up event listener on component unmount
      return () => {
        window.removeEventListener('resize', optimizeForMobile);
      };
    }
  }, []);

  // Define section titles for TableOfContents
  const sections = [
    { id: "key-findings", title: "Key Findings: What Runners Actually Need" },
    { id: "beginner-gear", title: "Essential Beginner Running Gear" },
    { id: "intermediate-gear", title: "Intermediate Runner's Gear Upgrades" },
    { id: "advanced-gear", title: "Advanced Runner's Arsenal" },
    { id: "safety-gear", title: "Must-Have Safety Gear (All Levels)" },
    { id: "unnecessary-gear", title: "What You DON'T Need (Community Consensus)" },
    { id: "environment-gear", title: "Shopping By Running Environment" },
    { id: "conclusion", title: "Conclusion: The Runner's Approach to Gear" }
  ];

  // Define SEO data for the guide page
  const seoData = {
    title: "The Ultimate Runner's Guide to Running Gear | Alt.Run",
    description: "Discover the essential running gear for every level from beginner to advanced. Expert recommendations on shoes, apparel, tech, and more to enhance your running experience.",
    canonicalUrl: "/running-gear-guide",
    ogType: "article",
    keywords: [
      "running gear guide", "best running shoes", "running equipment",
      "beginner running gear", "advanced running gear", "running accessories",
      "running watch", "running apparel", "trail running gear", "running safety gear"
    ],
    schema: {
      "@context": "https://schema.org",
      "@type": "Article",
      "@id": "https://alt.run/running-gear-guide#article",
      "url": "https://alt.run/running-gear-guide",
      "name": "The Ultimate Runner's Guide to Running Gear",
      "headline": "The Ultimate Runner's Guide to Running Gear: From Beginner to Advanced",
      "description": "Discover the essential running gear for every level from beginner to advanced.",
      "isPartOf": { "@id": "https://alt.run/#website" },
      "mainEntityOfPage": { "@id": "https://alt.run/running-gear-guide#webpage" },
      "image": {
        "@type": "ImageObject",
        "url": "https://alt.run/images/running-gear-guide.jpg",
        "width": 1200,
        "height": 630
      },
      "publisher": { "@id": "https://alt.run/#organization" }
    },
    breadcrumbs: [
      { name: "Home", path: "/" },
      { name: "Running Gear Guide", path: "/running-gear-guide" }
    ]
  };

  return (
    <div className="guide-container" ref={guideContentRef}>
      {/* SEO Component */}
      <SEO {...seoData} />

      <GuideHeader
        title="The Ultimate Runner's Guide to Running Gear"
        subtitle="Essential Equipment for Every Stage of Your Running Journey"
        intro="Whether you're just starting out or looking to optimize your gear as an experienced runner, this comprehensive guide will help you make informed decisions about running equipment. Based on insights from the running community, we'll explore what gear is truly essential, what can wait, and how your needs evolve as you progress from beginner to advanced."
      />

      <TableOfContents sections={sections} />

      <div className="guide-main-content">
        {/* User Instruction Note */}
        <div className="user-instructions">
          <h3>How to Use This Guide:</h3>
          <ul>
            <li>Navigate through the sections using the Table of Contents above.</li>
            <li>Focus on the gear recommendations that match your current running level.</li>
            <li>Remember that quality running shoes are the foundation - invest wisely there first.</li>
            <li>Add additional gear gradually as your needs and distances increase.</li>
          </ul>
        </div>

        {/* Disclaimer */}
        <div className="disclaimer-box">
          <h3>Important Disclaimer:</h3>
          <p>The information in this guide is intended for educational purposes only. Product mentions are based on runner feedback and are not sponsored. Individual needs vary based on body type, running style, and environment. Always test gear gradually and consult with specialists at running stores for personalized recommendations, especially for running shoes.</p>
        </div>

        {/* --- Section 1 --- */}
        <GuideSection id="key-findings" title="Key Findings: What Runners Actually Need">
          <p>Runners overwhelmingly agree on one thing: you don't need much to start running. The consensus from runners across experience levels is that proper running shoes are the non-negotiable foundation, while other gear can be gradually added as your commitment and distance increase. As one runner succinctly put it:</p>

          <blockquote>"only shoes shorts and a shirt, proly socks and underwear too if you want to get technical"</blockquote>
        </GuideSection>

        {/* --- Section 2 --- */}
        <GuideSection id="beginner-gear" title="Essential Beginner Running Gear">
          <p>For those just starting their running journey, veteran runners recommend keeping it minimal:</p>

          <h3>1. Running Shoes</h3>
          <p>The single most important investment for any runner. Finding the right running shoes is crucial for injury prevention and comfort. Experienced runners recommend:</p>

          <ul>
            <li>Getting fitted at a specialty running store rather than buying online initially.</li>
            <li>Focusing on comfort over brand or style.</li>
            <li>Starting with neutral cushioned shoes unless you have specific gait issues.</li>
            <li>Expecting to spend $100-130 for quality entry-level shoes.</li>
          </ul>

          <p>Popular beginner-friendly options frequently mentioned include <strong>Brooks Ghost</strong>, <strong>Hoka Clifton</strong>, and <strong>Asics Gel models</strong>.</p>

          <h3>2. Basic Running Apparel</h3>
          <p>The general consensus suggests beginners can use workout clothes they already own before investing in running-specific gear:</p>

          <ul>
            <li>Non-cotton shirts and shorts (moisture-wicking materials prevent chafing).</li>
            <li>Any comfortable athletic shorts or leggings.</li>
            <li>Basic moisture-wicking socks (cotton can cause blisters).</li>
          </ul>

          <h3>3. Essential Accessories</h3>
          <ul>
            <li>Water bottle (for runs over 30 minutes).</li>
            <li>Smartphone (with a free running app if tracking metrics is desired).</li>
            <li>Weather-appropriate hat or sunglasses.</li>
          </ul>

          <p>As one experienced runner noted:</p>
          <blockquote>"When I started out, I used my phone to track time/distance, wore a pair of New Balance sneakers from TJ Maxx and wore whatever shorts/shirts I had in the bureau"</blockquote>
        </GuideSection>

        {/* --- Section 3 --- */}
        <GuideSection id="intermediate-gear" title="Intermediate Runner's Gear Upgrades">
          <p>As your mileage increases and running becomes more regular, runners typically add:</p>

          <h3>1. Performance Tracking</h3>
          <ul>
            <li>A <strong>GPS running watch</strong> (brands like Garmin are consistently recommended across running communities).</li>
            <li>Heart rate monitoring capabilities (either watch or chest strap).</li>
            <li>More advanced running apps.</li>
          </ul>

          <p>One advanced runner stated:</p>
          <blockquote>"Garmin watch. Being able to easily track time, pace, splits and have automatically generated records of my runs is essential"</blockquote>

          <h3>2. Technical Running Apparel</h3>
          <ul>
            <li>Purpose-built running shorts with built-in liners.</li>
            <li>Technical running shirts designed for temperature regulation.</li>
            <li>Running socks (specialized brands often receive praise).</li>
            <li>Body glide or similar anti-chafing products for longer runs.</li>
          </ul>

          <h3>3. Enhanced Hydration and Nutrition</h3>
          <ul>
            <li>Hydration vest or belt for runs over 60-90 minutes.</li>
            <li>Energy gels or portable nutrition.</li>
            <li>Specialized water bottles designed for running.</li>
          </ul>

          <h3>4. Weather-Specific Gear</h3>
          <ul>
            <li>Running jacket for rain protection.</li>
            <li>Lightweight layers for temperature changes.</li>
            <li>Running headbands or ear covers for cold weather.</li>
          </ul>
        </GuideSection>

        {/* --- Section 4 --- */}
        <GuideSection id="advanced-gear" title="Advanced Runner's Arsenal">
          <p>For seasoned runners putting in significant mileage, discussions reveal investments in:</p>

          <h3>1. Specialized Footwear Collection</h3>
          <p>Many advanced runners maintain multiple pairs of shoes for different purposes:</p>
          <ul>
            <li>Daily trainers for regular mileage.</li>
            <li>Lightweight shoes for speed work.</li>
            <li>Trail running shoes for off-road adventures.</li>
            <li>Carbon-plated racing shoes for competitions.</li>
          </ul>

          <p>As one runner mentioned:</p>
          <blockquote>"Alphaflys (basic to say, but they could charge $500 and I'd still buy em)"</blockquote>

          <h3>2. Premium Performance Gear</h3>
          <ul>
            <li>High-end hydration vests with multiple storage options.</li>
            <li>Technical running apparel from premium brands.</li>
            <li>Winter-specific running tights and insulated layers.</li>
          </ul>

          <h3>3. Recovery Tools</h3>
          <p>Though not worn while running, recovery gear appears frequently in advanced discussions:</p>
          <ul>
            <li>Foam rollers.</li>
            <li>Massage guns.</li>
            <li>Compression gear.</li>
            <li>Ice/heat therapy tools.</li>
          </ul>

          <h3>4. Advanced Electronics</h3>
          <ul>
            <li>Premium running headphones (bone conduction styles are frequently recommended).</li>
            <li>Advanced GPS watches with detailed metrics and route planning.</li>
            <li>Heart rate monitors (chest straps preferred for accuracy).</li>
          </ul>

          <p>One runner shared:</p>
          <blockquote>"My Shokz open-ear headphones. It's nice to hear cars before they sneak up on you"</blockquote>
        </GuideSection>

        {/* --- Section 5 --- */}
        <GuideSection id="safety-gear" title="Must-Have Safety Gear (All Levels)">
          <p>Safety items consistently recommended across experience levels:</p>
          <ul>
            <li>Reflective gear or lights for low-visibility conditions.</li>
            <li>ID or Road ID for emergency information.</li>
            <li>Weather-appropriate sun protection.</li>
            <li>Running headlamp for early morning or evening runs.</li>
          </ul>
        </GuideSection>

        {/* --- Section 6 --- */}
        <GuideSection id="unnecessary-gear" title="What You DON'T Need (Community Consensus)">
          <p>Running communities consistently warn against overspending on:</p>
          <ul>
            <li>Expensive GPS watches when starting out.</li>
            <li>Compression gear without specific need.</li>
            <li>Gadgets with unproven benefits.</li>
            <li>Brand-name apparel when budget options perform similarly.</li>
          </ul>
        </GuideSection>

        {/* --- Section 7 --- */}
        <GuideSection id="environment-gear" title="Shopping By Running Environment">
          <h3>Road Running Gear</h3>
          <ul>
            <li>Cushioned road-specific running shoes.</li>
            <li>Lightweight, breathable clothing.</li>
            <li>Visibility accessories for traffic safety.</li>
          </ul>

          <h3>Trail Running Gear</h3>
          <ul>
            <li>Trail-specific shoes with appropriate tread.</li>
            <li>Hydration solutions for remote areas.</li>
            <li>Weather protection layers.</li>
            <li>Navigation tools.</li>
          </ul>

          <h3>Race Day Gear</h3>
          <ul>
            <li>Lightweight racing flats or carbon-plated shoes.</li>
            <li>Minimal, tested clothing (nothing new on race day!).</li>
            <li>Nutrition plan and carrying solution.</li>
          </ul>
        </GuideSection>

        {/* --- Section 8 --- */}
        <GuideSection id="conclusion" title="Conclusion: The Runner's Approach to Gear">
          <p>The collective wisdom from running communities suggests a pragmatic approach: start with quality running shoes, add gear incrementally as needs arise, and focus on comfort and function over brand names or trends. As one seasoned runner summarized:</p>

          <blockquote>"It's all about how much you want to spend. Good fitting running shoes are essential. Everything else is optional, but will make your runs more comfortable"</blockquote>

          <p>By following this community-tested progression from essential to advanced gear, you can avoid unnecessary purchases while ensuring you have what you need to run comfortably, safely, and effectively at every stage of your running journey.</p>
        </GuideSection>

        {/* Guide Footer with Logo */}
        <div className="guide-footer">
          <img src="/logo-glow.webp" alt="Alt.Run Logo" className="guide-logo" style={{ height: '60px' }} />
        </div>
      </div>
    </div>
  );
}

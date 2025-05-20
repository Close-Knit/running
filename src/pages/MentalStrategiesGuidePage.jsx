// src/pages/MentalStrategiesGuidePage.jsx
import React, { useEffect, useRef } from 'react';
import GuideHeader from '../components/GuideHeader';
import TableOfContents from '../components/TableOfContents';
import GuideSection from '../components/GuideSection';
import FAQItem from '../components/FAQItem';
import SEO from '../components/SEO';
import YouTubeEmbed from '../components/YouTubeEmbed';
import './MentalStrategiesGuidePage.css';

export default function MentalStrategiesGuidePage() {
  const guideContentRef = useRef();

  // Set background image for the guide page
  useEffect(() => {
    const pageBackground = document.querySelector('.page-background');
    if (pageBackground) {
      pageBackground.style.backgroundImage = 'url(/images/mental-strategies.jpg)';

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
    { id: "part1", title: "Part 1: Developing Mental Strategies for Routine Runs: Finding Joy and Building Consistency" },
    { id: "part2", title: "Part 2: Developing Mental Strategies for Big Events: From Start Line to Finish Strong" },
    { id: "part3", title: "Part 3: The All-Purpose Mental Toolkit: Strategies for Any Runner, Any Run" },
    { id: "conclusion", title: "Conclusion: Your Journey to Mental Mastery" }
  ];

  // Define SEO data for the guide page
  const seoData = {
    title: "Developing Mental Strategies Guide | Alt.Run",
    description: "Develop powerful mental strategies for both daily runs and race days. Learn techniques to build consistency, overcome challenges, and achieve your running goals.",
    canonicalUrl: "/mental-strategies-guide",
    ogType: "article",
    keywords: [
      "running mental strategies", "runner's mental game", "mental toughness running",
      "running motivation", "race day mental preparation", "running mindset",
      "mental strategies for runners", "running psychology", "mental training for runners",
      "running mental strength", "mind over miles"
    ],
    schema: {
      "@context": "https://schema.org",
      "@type": "Article",
      "@id": "https://alt.run/mental-strategies-guide#article",
      "url": "https://alt.run/mental-strategies-guide",
      "name": "Developing Mental Strategies: A Runner's Guide to Mind Over Miles",
      "headline": "Developing Mental Strategies: A Runner's Guide to Mind Over Miles",
      "description": "Develop powerful mental strategies for both daily runs and race days.",
      "isPartOf": { "@id": "https://alt.run/#website" },
      "mainEntityOfPage": { "@id": "https://alt.run/mental-strategies-guide#webpage" },
      "image": {
        "@type": "ImageObject",
        "url": "https://alt.run/images/mental-strategies-guide.jpg",
        "width": 1200,
        "height": 630
      },
      "publisher": { "@id": "https://alt.run/#organization" }
    },
    breadcrumbs: [
      { name: "Home", path: "/" },
      { name: "Developing Mental Strategies Guide", path: "/mental-strategies-guide" }
    ]
  };

  return (
    <div className="guide-container" ref={guideContentRef}>
      {/* SEO Component */}
      <SEO {...seoData} />

      <GuideHeader
        title="Developing Mental Strategies Guide"
        subtitle="Mind Over Miles: Mastering the Mental Game"
        intro="Whether you're a beginner lacing up for the first time, an intermediate runner chasing a new personal best, or an advanced athlete pushing your limits, your mental game is as crucial as your physical training. This guide is designed to help all runners develop robust mental strategies, transforming your mindset into your most powerful running asset for both enjoyable daily miles and triumphant race days."
      />

      <TableOfContents sections={sections} />

      <div className="guide-main-content">
        {/* Disclaimer */}
        <div className="disclaimer-box">
          <h3>Important Disclaimer:</h3>
          <p>The information in this guide is intended for educational purposes only and should not replace professional medical or psychological advice. While mental strategies can significantly enhance your running experience, they are not substitutes for proper training, recovery, or treatment of clinical conditions. Always consult with healthcare professionals if you're experiencing persistent mental health challenges related to your running or overall wellbeing.</p>
        </div>

        {/* --- Section 1 --- */}
        <GuideSection id="part1" title="Part 1: Developing Mental Strategies for Routine Runs: Finding Joy and Building Consistency">
          <h3>Why Bother with Routine Runs? (The "Why" for Every Runner)</h3>
          <p>Before diving into how to mentally approach routine runs, let's solidify why they're essential for every runner.</p>

          <h4>Beginner:</h4>
          <p>This is where you build foundational fitness and, more importantly, the <strong>habit of running</strong>. Your "why" might be as simple as "to feel healthier" or "to prove I can do this."</p>

          <h4>Intermediate:</h4>
          <p>Routine runs are crucial for increasing mileage safely, improving endurance, and providing active recovery. Your "why" could be "to support my race goals" or "to maintain my fitness."</p>

          <h4>Advanced:</h4>
          <p>For you, these runs are about maintaining a high aerobic base, recovering from hard workouts, and fine-tuning your running economy. Your "why" might be "to optimize my performance" or "for the pure love of the movement."</p>

          <p>Understanding your personal "why" transforms a routine run from an obligation into a purposeful step towards your goals.</p>

          <h3>Mental Jedi Tricks for Daily Motivation (Tailored for All Levels)</h3>
          <p>Your brain, that magnificent and occasionally lazy organ, needs some convincing. Here's how to develop strategies to outsmart its desire for comfort:</p>

          <h4>Conquer the Couch Monster: Start Small, Win Big (Especially for Beginners)</h4>
          <p>If the thought of your planned run feels overwhelming, just commit to the first 10 minutes. More often than not, once you're moving, you'll find your rhythm. This strategy builds confidence and breaks the inertia.</p>
          <p><strong>Intermediate/Advanced Tip:</strong> On low-motivation days, remind yourself that even a shorter, easier run contributes to your overall training load and recovery.</p>

          <h4>The "I Swear I'll Feel Better After This" Guarantee (Universal Truth)</h4>
          <p>The pre-run mental battle is real. Your brain might scream "I'm too tired!" or "This is going to suck!". Develop the strategy of recalling the post-run feeling. That sense of accomplishment and the endorphin boost are powerful motivators.</p>

          <h4>Brain Candy: Strategic Distractions (Use Wisely)</h4>
          <p>Sometimes, your mind needs a helpful focal point.</p>
          <p><strong>Tune In:</strong> Music or podcasts can make runs more enjoyable.</p>
          <h4>Beginner:</h4>
          <p>Focus on uplifting beats that make you want to move.</p>
          <h4>Intermediate/Advanced:</h4>
          <p>Use music strategically – perhaps calming tunes for easy runs and more energizing tracks for tempo efforts. Or, use podcasts for longer, slower runs.</p>

          <h4>New Sights, New Delights: Explore Your World</h4>
          <h4>All Levels:</h4>
          <p>Running the same route daily can lead to mental fatigue. Varying your scenery by exploring new paths, trails, or even running a familiar route in reverse can keep things fresh and engaging. This also helps you adapt to different underfoot conditions.</p>

          <h3>Fueling Your Everyday Engine (Smart Fueling for All)</h3>
          <p>No matter your level, proper fueling and hydration support both physical and mental energy for routine runs.</p>

          <h4>Quick Bites for Steady Energy:</h4>
          <p>A small, easily digestible carbohydrate snack 30-60 minutes before a run can prevent that "running on empty" feeling. This isn't about complex fueling strategies, just ensuring your brain and body have accessible energy.</p>

          <h4>H2-Oh Yeah!: Consistent Hydration</h4>
          <p>Sip water throughout the day. For most routine runs under an hour, water is sufficient. Dehydration can significantly impact mood and perceived effort.</p>

          <h3>Your Motivation Tribe and Toolkit (Strategies for Sustained Effort)</h3>
          <p>Develop strategies that leverage external support and internal reward systems.</p>

          <h4>Motivation Loves Company: The Power of Accountability</h4>
          <h4>Beginner:</h4>
          <p>Joining a group or finding a running buddy can provide crucial support and make runs less daunting.</p>
          <h4>Intermediate/Advanced:</h4>
          <p>Even if you often train solo, connecting with a running community (online or in-person) for occasional runs or check-ins can maintain motivation and provide a sense of shared purpose.</p>

          <h4>Level Up Your Run: Gamification and Mini-Challenges</h4>
          <h4>All Levels:</h4>
          <p>Using fitness trackers with badges, setting small weekly goals (e.g., "run one new route this week"), or incorporating "sprints" to landmarks can add an element of play and accomplishment to routine runs.</p>

          {/* Video Placeholder 1 */}
          <YouTubeEmbed
            videoId=""
            title="Developing Motivation for Consistent Running"
          />
          <p className="video-note">Video Suggestion: Content focused on building and maintaining running motivation across different experience levels, or creative ways to make routine running a sustainable habit.</p>
        </GuideSection>

        {/* --- Section 2 --- */}
        <GuideSection id="part2" title="Part 2: Developing Mental Strategies for Big Events: From Start Line to Finish Strong">
          <h3>Why Put Yourself Through This? (The Big "Why" for Every Competitor)</h3>
          <p>The "why" behind tackling a big event is a powerful psychological anchor.</p>

          <h4>Beginner:</h4>
          <p>Your "why" might be about achieving a significant milestone, experiencing a race atmosphere, or proving personal capability.</p>

          <h4>Intermediate:</h4>
          <p>This could be about setting a new <strong>personal record (PR)</strong>, challenging yourself with a longer distance, or testing your training.</p>

          <h4>Advanced:</h4>
          <p>Your "why" often involves competing at a high level, mastering race strategy, or pushing the boundaries of your known limits.</p>

          <p>Clarifying this "why" will fuel your mental resilience when challenges arise.</p>

          <h3>Pre-Race Brain Bootcamp: Developing Your Mental Race Plan</h3>
          <p>The mental preparation in the weeks and days leading up to a race is as important as your physical tapering.</p>

          <h4>Dress Rehearsal in Your Head: The Power of Visualization</h4>
          <h4>All Levels:</h4>
          <p>Regularly visualize yourself executing your race plan successfully. Imagine feeling strong, navigating the course, handling discomfort, and crossing the finish line feeling accomplished. This builds familiarity and confidence.</p>
          <p><strong>Advanced Tip:</strong> Visualize specific race segments, tactical decisions, and your responses to potential challenges (e.g., a sudden surge from a competitor).</p>

          <h4>Taming the Tummy Butterflies: Strategies for Nerve Control</h4>
          <p>Pre-race nerves are a sign you're invested. Develop strategies to channel this energy positively.</p>

          <h4>Flip the Script: Reframe Anxiety as Excitement</h4>
          <p>Recognize that the physiological symptoms of anxiety and excitement are similar. Tell yourself, "I'm not nervous, I'm ready and excited!" This cognitive reframing can shift your entire pre-race experience.</p>

          <h4>Warm-Up Wisely: Signal Readiness to Your Brain</h4>
          <p>A proper physical warm-up also warms up your mind, signaling that it's time to perform, not panic.</p>

          <h4>Expect the Grind: Brace Yourself for Effort</h4>
          <p>Races are meant to be challenging. Mentally prepare for discomfort. If you expect it, you're better equipped to manage it when it arrives.</p>

          <h4>The "Nothing to Lose" Liberation (Especially for Beginners/Intermediates)</h4>
          <p>While goals are important, try to release excessive pressure. Focus on executing your plan and giving your best effort on the day. This can free you up to perform surprisingly well.</p>

          <h4>Don't Cook Your Brain Too Early: Manage Pre-Race Mental Energy</h4>
          <p>Obsessing over the race for days can lead to mental fatigue. Develop strategies to distract yourself and conserve mental energy for race day.</p>

          {/* Video Placeholder 2 */}
          <YouTubeEmbed
            videoId=""
            title="Mental Strategies for Pre-Race Preparation"
          />
          <p className="video-note">Video Suggestion: Yowana's "How to Mentally Prepare for a Big Race" or a video detailing pre-race visualization and nerve management techniques applicable to various runner levels.</p>

          <h3>Your Inner Coach: Mastering Positive Self-Talk</h3>
          <p>Your internal dialogue significantly impacts performance.</p>

          <h4>All Levels:</h4>
          <p>Develop and practice positive self-talk statements. Instead of "This is too hard," try "I am strong, I am prepared". Research shows women may naturally use self-talk more, but it's a vital skill for everyone.</p>

          <h4>Intermediate/Advanced:</h4>
          <p>Refine your self-talk to be instructional and motivational during specific race scenarios, e.g., "Relax your shoulders, quicken your cadence" or "You've trained for this pace, trust it."</p>

          <h3>Fueling the Fire: Mindful Eating and Drinking for Peak Performance</h3>
          <p>Nutrition for big events is a well-rehearsed strategy, not a last-minute hope.</p>

          <h4>The Great Carb Adventure (Especially for Intermediate/Advanced Long-Distance Runners):</h4>
          <p>Proper carb-loading in the days before a long race maximizes glycogen stores. This isn't just physical; knowing you're optimally fueled boosts mental confidence.</p>

          <h4>Race Morning Munchies: The Golden Rule – Nothing New!</h4>
          <p>Stick to familiar, practiced pre-race meals. This eliminates a significant source of potential race-day stress and physical discomfort.</p>

          <h3>Mid-Race Mind Over Matter: Developing In-Race Mental Toughness</h3>
          <p>When the race gets tough, your mental strategies become paramount.</p>

          <h4>Bite-Sized Chunks: Segmenting the Challenge</h4>
          <h4>All Levels:</h4>
          <p>Break the race into smaller, manageable parts (e.g., next mile, next aid station). This makes the total distance feel less daunting and provides frequent small victories.</p>

          <h4>Crowd Surfing (Figuratively!): Harnessing External Energy</h4>
          <h4>All Levels:</h4>
          <p>Engage positively with spectators. A smile or a wave can provide a surprising mental lift.</p>

          <h4>Your Pocket Pep Talks: The Power of Mantras</h4>
          <h4>All Levels:</h4>
          <p>Develop a few short, powerful mantras. These are your go-to phrases when discomfort sets in or focus wavers. "Strong and steady," "Relentless forward progress," or even humorous ones can work wonders. Experiment during training to find what resonates.</p>

          {/* Video Placeholder 3 */}
          <YouTubeEmbed
            videoId=""
            title="Developing In-Race Mental Toughness"
          />
          <p className="video-note">Video Suggestion: Content focusing on psychological tactics for use during a race, such as managing discomfort, staying focused, and using mantras effectively across different race distances and runner abilities.</p>
        </GuideSection>

        {/* --- Section 3 --- */}
        <GuideSection id="part3" title="Part 3: The All-Purpose Mental Toolkit: Strategies for Any Runner, Any Run">
          <h3>Finding Your Goldilocks Zone: Developing Optimal Arousal Awareness</h3>
          <p>Learn to recognize your ideal mental state for different types of runs. Some runs benefit from a calm, meditative state, while others require higher energy and focus. Develop pre-run routines (music, dynamic stretches, quiet reflection) that help you achieve this optimal zone.</p>

          <h3>The Post-Run Glow-Up: Strategies for Positive Reinforcement</h3>
          <p>Consciously acknowledge your effort and achievements after every run, no matter how small. This could be noting one thing you did well, enjoying a favorite healthy snack, or simply taking a moment of gratitude. This reinforces the positive aspects of running, strengthening your mental association and motivation for future runs.</p>

          {/* Video Placeholder 4 */}
          <YouTubeEmbed
            videoId=""
            title="Cultivating Positive Self-Talk and General Mental Resilience"
          />
          <p className="video-note">Video Suggestion: Content that provides actionable advice on developing positive self-talk, building overall mental resilience for runners, or perhaps a motivational piece that speaks to the psychological benefits of running for all levels.</p>
        </GuideSection>

        {/* --- Conclusion --- */}
        <GuideSection id="conclusion" title="Conclusion: Your Journey to Mental Mastery">
          <p>Developing mental strategies is an ongoing process, much like physical training. For beginners, it's about building confidence and enjoyment. For intermediate runners, it's about pushing boundaries and managing increased demands. For advanced runners, it's about fine-tuning every mental edge for peak performance. By consistently practicing these techniques, you'll not only enhance your running but also discover a deeper level of mental strength that extends far beyond the finish line.</p>
        </GuideSection>
      </div>
    </div>
  );
}


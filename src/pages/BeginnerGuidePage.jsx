// src/pages/BeginnerGuidePage.jsx
import React, { useEffect, useRef } from 'react';
import GuideHeader from '../components/GuideHeader';
import TableOfContents from '../components/TableOfContents';
import GuideSection from '../components/GuideSection';
import TrainingPlanDisplay from '../components/TrainingPlanDisplay';
import PlanExplanation from '../components/PlanExplanation';
import FAQItem from '../components/FAQItem';
// No need for DownloadPdfLink component anymore
import SEO from '../components/SEO';
import './BeginnerGuidePage.css';

// Training plan data
const beginnerPlanJson = {
  weeks: [
    {
      week: 1,
      workout: "5-minute warm-up walk, then alternate 60 seconds of running with 90 seconds of walking. Repeat 8 times. Finish with a 5-minute cool-down walk.",
      totalTime: "30 minutes"
    },
    {
      week: 2,
      workout: "5-minute warm-up walk, then alternate 90 seconds of running with 2 minutes of walking. Repeat 6 times. Finish with a 5-minute cool-down walk.",
      totalTime: "30 minutes"
    },
    {
      week: 3,
      workout: "5-minute warm-up walk, then do 2 repetitions of: (Run 90 seconds, Walk 90 seconds, Run 3 minutes, Walk 3 minutes). Finish with a 5-minute cool-down walk.",
      totalTime: "28 minutes"
    },
    {
      week: 4,
      workout: "5-minute warm-up walk, then do: (Run 3 minutes, Walk 90 seconds, Run 5 minutes, Walk 2.5 minutes, Run 3 minutes, Walk 90 seconds, Run 5 minutes). Finish with a 5-minute cool-down walk.",
      totalTime: "31 minutes"
    },
    {
      week: 5,
      workout: "5-minute warm-up walk, then do: (Run 5 minutes, Walk 3 minutes, Run 5 minutes, Walk 3 minutes, Run 5 minutes). Finish with a 5-minute cool-down walk.",
      totalTime: "31 minutes",
      note: "This week is a turning point! You're building real endurance now."
    },
    {
      week: 6,
      workout: "5-minute warm-up walk, then do: (Run 8 minutes, Walk 5 minutes, Run 8 minutes). Finish with a 5-minute cool-down walk.",
      totalTime: "31 minutes"
    },
    {
      week: 7,
      workout: "5-minute warm-up walk, then run 20 minutes with no walking breaks. Finish with a 5-minute cool-down walk.",
      totalTime: "30 minutes",
      note: "If you need to take 1-2 short walking breaks, that's perfectly fine! Just keep them brief."
    },
    {
      week: 8,
      workout: "5-minute warm-up walk, then run 25-30 minutes with no walking breaks. Finish with a 5-minute cool-down walk.",
      totalTime: "35-40 minutes",
      note: "Congratulations! You've built up to running continuously for nearly 30 minutes!"
    }
  ]
};

export default function BeginnerGuidePage() {
  const guideContentRef = useRef();

  // Set background image for the guide page
  useEffect(() => {
    const pageBackground = document.querySelector('.page-background');
    if (pageBackground) {
      pageBackground.style.backgroundImage = 'url(/images/running-start.jpg)';

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
    { id: "why-start", title: "Why Start Running? The Amazing First Steps." },
    { id: "gear-prep", title: "Your First Steps: Gear & Preparation" },
    { id: "running-form", title: "The Absolute Basics of Running Form" },
    { id: "running-plan", title: "Your First Running Plan (Couch to 5K Inspired)" },
    { id: "safety-health", title: "Staying Safe & Healthy" },
    { id: "rest-recovery", title: "Listen To Your Body: Rest & Recovery" },
    { id: "faq", title: "Common Beginner Questions (FAQ)" },
    { id: "motivation", title: "Keeping the Flame Alive: Staying Motivated" }
  ];

  // Define SEO data for the guide page
  const seoData = {
    title: "Start Running: The Ultimate Beginner's Guide | Alt.Run",
    description: "Everything you need to know to start running safely and enjoyably. From gear to form, training plans to recovery - your complete beginner's guide to running.",
    canonicalUrl: "/start-running-guide",
    ogType: "article",
    keywords: [
      "beginner running guide", "how to start running", "couch to 5k",
      "running for beginners", "beginner running plan", "learn to run",
      "running form basics", "running gear for beginners", "running safety tips"
    ],
    schema: {
      "@context": "https://schema.org",
      "@type": "Article",
      "@id": "https://alt.run/start-running-guide#article",
      "url": "https://alt.run/start-running-guide",
      "name": "Start Running: The Ultimate Beginner's Guide",
      "headline": "Start Running: The Ultimate Beginner's Guide",
      "description": "Everything you need to know to start running safely and enjoyably.",
      "isPartOf": { "@id": "https://alt.run/#website" },
      "mainEntityOfPage": { "@id": "https://alt.run/start-running-guide#webpage" },
      "image": {
        "@type": "ImageObject",
        "url": "https://alt.run/images/running-start.jpg",
        "width": 1200,
        "height": 630
      },
      "publisher": { "@id": "https://alt.run/#organization" }
    },
    breadcrumbs: [
      { name: "Home", path: "/" },
      { name: "Start Running: Beginner Guide", path: "/start-running-guide" }
    ]
  };

  return (
    <div className="guide-container" ref={guideContentRef}>
      {/* SEO Component */}
      <SEO {...seoData} />

      <GuideHeader
        title="The Ultimate Beginner's Guide to Running"
        subtitle="Your Journey Starts Here!"
        intro="Welcome to Alt.Run! If you're new to running or looking to get started, you're in the right place. This guide is designed to take you from your first steps to comfortably running, with easy-to-follow advice, a simple training plan, and answers to your most common questions."
      />

      <TableOfContents sections={sections} />

      <div className="guide-main-content">
        {/* User Instruction Note */}
        <div className="user-instructions">
          <h3>How to Use This Guide:</h3>
          <ul>
            <li>Navigate through the sections using the Table of Contents above.</li>
            <li>Read through each section at your own pace.</li>
            <li>Pay special attention to the <strong>'Your First Running Plan'</strong> – this is your roadmap!</li>
            <li>Don't forget to check out the FAQ for quick answers.</li>
          </ul>
        </div>

        {/* --- Section 1 --- */}
        <GuideSection id="why-start" title="Why Start Running? The Amazing First Steps.">
          <p>Running is one of the most natural forms of exercise for humans. Our bodies are literally designed for it! Here's why starting a running journey can be one of the best decisions you'll make:</p>

          <h3>The Benefits Go Far Beyond Fitness</h3>
          <ul>
            <li><strong>Physical Health:</strong> Strengthens your heart, builds lung capacity, helps maintain healthy weight, and improves overall fitness.</li>
            <li><strong>Mental Clarity:</strong> Running produces endorphins that reduce stress and anxiety while improving mood and sleep quality.</li>
            <li><strong>Accessibility:</strong> Unlike many sports, running requires minimal equipment and can be done almost anywhere.</li>
            <li><strong>Community:</strong> The running community is incredibly supportive and welcoming to beginners.</li>
            <li><strong>Achievement:</strong> Few things match the sense of accomplishment from completing your first mile, 5K, or whatever goal you set.</li>
          </ul>

          <h3>Starting Is the Hardest Part</h3>
          <p>Many people worry they're "not runners" or "too out of shape" to start. The truth? If you can walk, you can begin a running program. The key is starting gradually and being consistent.</p>

          <p>Remember: Every runner you see out there had a first day. Many started exactly where you are now. The difference between a runner and a non-runner is simple – runners run, even if it's just a little bit, even if it's slow.</p>
        </GuideSection>

        {/* --- Section 2 --- */}
        <GuideSection id="gear-prep" title="Your First Steps: Gear & Preparation">
          <h3>The Only Essential: Good Running Shoes</h3>
          <p>While you don't need much to start running, proper shoes are crucial for comfort and injury prevention. You don't need to spend a fortune, but consider these points:</p>

          <ul>
            <li><strong>Fit is everything:</strong> Visit a running specialty store if possible. Staff can analyze your gait and recommend appropriate shoes.</li>
            <li><strong>Replace old shoes:</strong> Don't use worn-out everyday sneakers for running.</li>
            <li><strong>Comfort test:</strong> Shoes should feel comfortable immediately – there's no "breaking in" period for running shoes.</li>
          </ul>

          <h3>Other Helpful (But Optional) Gear</h3>
          <ul>
            <li><strong>Moisture-wicking clothes:</strong> Cotton holds sweat and can cause chafing. Synthetic fabrics designed for exercise are better.</li>
            <li><strong>Sports watch/app:</strong> A simple way to track your progress. Many free apps like Strava, Nike Run Club, or Couch to 5K can guide your training.</li>
            <li><strong>Water bottle:</strong> Staying hydrated is important, especially for runs over 30 minutes.</li>
            <li><strong>Reflective gear:</strong> If running in low light conditions, make yourself visible to traffic.</li>
          </ul>

          <h3>Before You Head Out</h3>
          <ul>
            <li><strong>Plan your route:</strong> Start with a flat, measured course in a safe area.</li>
            <li><strong>Check the weather:</strong> Dress appropriately – usually for temperatures 10-15°F warmer than the actual temperature (you'll warm up!).</li>
            <li><strong>Hydrate:</strong> Drink water throughout the day, not just right before running.</li>
            <li><strong>Timing:</strong> Find what works for you. Some people love morning runs, others prefer evenings.</li>
          </ul>
        </GuideSection>

        {/* --- Section 3 --- */}
        <GuideSection id="running-form" title="The Absolute Basics of Running Form (Keep it Simple!)">
          <p>Good form helps prevent injuries and makes running more efficient. Don't overthink it at first – many aspects of form naturally improve as you run more. Focus on these basics:</p>

          <h3>The Fundamentals</h3>
          <ul>
            <li><strong>Posture:</strong> Stand tall with a slight forward lean from the ankles (not the waist). Imagine a string pulling you up from the top of your head.</li>
            <li><strong>Relaxation:</strong> Keep shoulders relaxed and down, away from your ears. Tension wastes energy.</li>
            <li><strong>Arms:</strong> Bend elbows at roughly 90 degrees, swing arms forward and back (not across your body). Hands should be relaxed, not clenched.</li>
            <li><strong>Footstrike:</strong> Don't worry too much about whether you land on heel or forefoot. Focus instead on not overstriding – your foot should land under your body, not far in front.</li>
            <li><strong>Cadence:</strong> Aim for shorter, quicker steps rather than long strides. This reduces impact and improves efficiency.</li>
          </ul>

          <h3>Common Beginner Mistakes</h3>
          <ul>
            <li><strong>Looking down:</strong> Keep your gaze forward, about 10-20 feet ahead.</li>
            <li><strong>Bouncing too much:</strong> Excessive up-and-down movement wastes energy.</li>
            <li><strong>Overstriding:</strong> Taking steps that are too long increases injury risk.</li>
            <li><strong>Holding tension:</strong> Periodically check for tension in your face, shoulders, and hands – then release it.</li>
          </ul>

          <p>Remember: Your form will naturally evolve as you gain experience. Don't stress about perfection – just keep these basics in mind and focus on enjoying your runs!</p>
        </GuideSection>

        {/* --- Section 4 --- */}
        <GuideSection id="running-plan" title="Your First Running Plan (Couch to 5K Inspired)">
          <PlanExplanation
            textBefore={
              <>
                <p>The Power of Run/Walk: This method is fantastic for building endurance safely and preventing injury. It allows your body to adapt gradually.</p>
                <p>Introducing Your <strong>8-Week "First Finish Line" Plan</strong>:</p>
              </>
            }
          />
          <TrainingPlanDisplay planData={beginnerPlanJson} />
          <PlanExplanation
            textAfter={
              <>
                <h4>How to use this plan:</h4>
                <ul>
                  <li>Each week, aim to complete the listed workout 3 times, with rest days in between.</li>
                  <li><strong>Listen to your body ALWAYS.</strong> If a week feels too tough, it's okay to repeat it. Don't push through sharp pain.</li>
                  <li>Consistency is more important than speed, especially now.</li>
                  <li>'Run' means a gentle jog where you could speak in short sentences. 'Walk' means brisk walking.</li>
                  <li>Always perform a 5-minute warm-up walk before each session and a 5-minute cool-down walk followed by gentle stretches afterwards.</li>
                  <li><strong>Rest Days are Crucial:</strong> Take at least one full rest day between run days. This is when your body adapts and gets stronger!</li>
                </ul>
              </>
            }
          />
        </GuideSection>

        {/* --- Section 5 --- */}
        <GuideSection id="safety-health" title="Staying Safe & Healthy">
          <h3>Safety First</h3>
          <ul>
            <li><strong>Be visible:</strong> Wear bright colors during the day and reflective gear at night.</li>
            <li><strong>Run against traffic:</strong> If running on roads without sidewalks, run facing oncoming traffic.</li>
            <li><strong>Carry ID:</strong> A running ID bracelet or card is recommended.</li>
            <li><strong>Be aware:</strong> Keep music volume low enough to hear your surroundings, or leave one earbud out.</li>
            <li><strong>Tell someone:</strong> Let a friend or family member know your route and expected return time.</li>
            <li><strong>Carry a phone:</strong> For emergencies and in case you need navigation help.</li>
          </ul>

          <h3>Health Considerations</h3>
          <ul>
            <li><strong>Consult a doctor:</strong> If you have any health concerns or have been inactive for a long time, check with your doctor before starting.</li>
            <li><strong>Hydration:</strong> Drink water before and after runs. For runs over 45 minutes, consider bringing water with you.</li>
            <li><strong>Nutrition:</strong> You don't need special diets to start running, but avoid running immediately after heavy meals.</li>
            <li><strong>Sun protection:</strong> Use sunscreen, wear a hat, and consider sunglasses for daytime running.</li>
            <li><strong>Weather awareness:</strong> Be extra cautious in extreme heat, cold, or stormy conditions.</li>
          </ul>
        </GuideSection>

        {/* --- Section 6 --- */}
        <GuideSection id="rest-recovery" title="Listen To Your Body: Rest & Recovery are Key!">
          <p>Rest isn't just the absence of training – it's an essential part of becoming a stronger runner. Here's why recovery matters and how to do it right:</p>

          <h3>Why Recovery Matters</h3>
          <ul>
            <li><strong>Adaptation happens during rest:</strong> Your body gets stronger between workouts, not during them.</li>
            <li><strong>Injury prevention:</strong> Most running injuries come from doing too much, too soon, without adequate recovery.</li>
            <li><strong>Mental freshness:</strong> Recovery prevents burnout and keeps running enjoyable.</li>
          </ul>

          <h3>Types of Recovery</h3>
          <ul>
            <li><strong>Rest days:</strong> Complete rest or very light activity like walking or gentle stretching.</li>
            <li><strong>Sleep:</strong> Aim for 7-9 quality hours – this is when your body repairs itself.</li>
            <li><strong>Active recovery:</strong> Light activities like walking, swimming, or yoga that promote blood flow without stress.</li>
            <li><strong>Nutrition:</strong> Refuel with a mix of protein and carbohydrates within 30-60 minutes after running.</li>
            <li><strong>Hydration:</strong> Replace fluids lost during exercise.</li>
          </ul>

          <h3>Recognizing When You Need More Rest</h3>
          <p>Pay attention to these warning signs that you might need extra recovery:</p>
          <ul>
            <li>Persistent fatigue that doesn't improve with a night's sleep</li>
            <li>Elevated resting heart rate</li>
            <li>Irritability or decreased motivation</li>
            <li>Nagging aches that don't resolve with a day of rest</li>
            <li>Getting sick more frequently</li>
          </ul>

          <p>Remember: Taking an extra rest day when needed is always smarter than pushing through and risking injury. Your body is giving you valuable feedback – learn to listen to it!</p>
        </GuideSection>

        {/* --- Section 7 --- */}
        <GuideSection id="faq" title="Common Beginner Questions (FAQ)">
          <FAQItem question="I get out of breath quickly. Am I doing something wrong?">
            <p>Not at all! Getting out of breath is normal when you start running. This is why we use the run/walk method. If you're too winded to speak in short sentences, slow down or extend your walking intervals. Your cardiovascular system will adapt surprisingly quickly if you're consistent.</p>
          </FAQItem>

          <FAQItem question="How do I prevent side stitches?">
            <p>Those painful side cramps are common for beginners. Try these strategies:</p>
            <ul>
              <li>Warm up properly with 5 minutes of brisk walking</li>
              <li>Avoid eating large meals 1-2 hours before running</li>
              <li>Focus on deep belly breathing rather than shallow chest breathing</li>
              <li>If a stitch occurs, slow down and press your hand into the affected area while breathing deeply</li>
            </ul>
          </FAQItem>

          <FAQItem question="I'm very slow. Should I be concerned?">
            <p>Absolutely not! Speed is irrelevant when you're starting out. Focus on consistency and gradually building endurance. Many lifelong runners started very slowly. Remember: you're lapping everyone on the couch, regardless of your pace.</p>
          </FAQItem>

          <FAQItem question="My legs hurt after running. Is this normal?">
            <p>Some muscle soreness is normal, especially 24-48 hours after running (called Delayed Onset Muscle Soreness or DOMS). This should feel like a dull ache that improves with movement, not sharp pain. If you experience sharp pain during or after running, especially if it's focused on a specific spot, take extra rest days and consider consulting a healthcare provider if it persists.</p>
          </FAQItem>

          <FAQItem question="Should I run every day?">
            <p>No! Rest days are essential, especially for beginners. Three running days per week with rest days in between is ideal for starting out. Your body needs time to adapt and recover between sessions.</p>
          </FAQItem>

          <FAQItem question="What should I eat before and after running?">
            <p>For runs under 45 minutes, you don't need special fueling. If you run in the morning, a small carbohydrate snack like a banana or toast can help. After running, aim to eat a small meal with both protein and carbs within an hour. Most importantly, stay hydrated throughout the day.</p>
          </FAQItem>

          <FAQItem question="How do I stay motivated when it gets tough?">
            <p>Everyone has motivation dips! Try these strategies:</p>
            <ul>
              <li>Set a specific goal like completing a 5K event</li>
              <li>Find a running buddy or join a beginner-friendly running group</li>
              <li>Track your progress to see how far you've come</li>
              <li>Mix up your routes to keep things interesting</li>
              <li>Remember why you started and how good you feel after completing a run</li>
            </ul>
          </FAQItem>
        </GuideSection>

        {/* --- Section 8 --- */}
        <GuideSection id="motivation" title="Keeping the Flame Alive: Staying Motivated">
          <p>Starting to run is one thing – continuing is another! Here are proven strategies to keep your motivation strong:</p>

          <h3>Set Meaningful Goals</h3>
          <ul>
            <li><strong>Event-based goals:</strong> Sign up for a beginner-friendly 5K event. Having a date on the calendar is powerfully motivating!</li>
            <li><strong>Process goals:</strong> Focus on consistency (e.g., "I'll run three times this week") rather than just performance.</li>
            <li><strong>Milestone goals:</strong> Celebrate achievements like your first non-stop mile or completing each week of the training plan.</li>
          </ul>

          <h3>Find Your Community</h3>
          <ul>
            <li><strong>Running buddies:</strong> Having someone expecting you makes it harder to skip a run.</li>
            <li><strong>Running groups:</strong> Many running stores and community centers have beginner-friendly groups.</li>
            <li><strong>Online communities:</strong> Apps like Strava or forums like Reddit's r/running provide support and accountability.</li>
            <li><strong>Share your journey:</strong> Telling friends and family about your running goals creates positive accountability.</li>
          </ul>

          <h3>Make It Enjoyable</h3>
          <ul>
            <li><strong>Scenic routes:</strong> Find beautiful paths that make running a pleasure.</li>
            <li><strong>Entertainment:</strong> Create energizing playlists, listen to podcasts or audiobooks.</li>
            <li><strong>Reward system:</strong> Set up small rewards for hitting your running goals.</li>
            <li><strong>Mix it up:</strong> Try different routes, times of day, or types of runs to prevent boredom.</li>
          </ul>

          <h3>Track Your Progress</h3>
          <ul>
            <li><strong>Running journal:</strong> Note how you felt, what you observed, or what you thought about during your run.</li>
            <li><strong>Apps:</strong> Seeing your improvement over time is incredibly motivating.</li>
            <li><strong>Take photos:</strong> Document your running journey visually.</li>
          </ul>

          <h3>Remember Your 'Why'</h3>
          <p>On tough days, reconnect with your reasons for starting. Whether it's health, mental wellbeing, personal challenge, or something else – keep that purpose front and center.</p>

          <p>Above all, be patient and kind to yourself. There will be setbacks and difficult days – they're part of every runner's journey. What matters is consistency over time, not perfection.</p>
        </GuideSection>
      </div>

      <div className="guide-footer">
        <img src="/logo-glow.webp" alt="Alt.Run Logo" className="guide-footer-logo" />
      </div>
    </div>
  );
}

// src/pages/CouchTo5KGuidePage.jsx
import React, { useEffect, useRef } from 'react';
import GuideHeader from '../components/GuideHeader';
import TableOfContents from '../components/TableOfContents';
import GuideSection from '../components/GuideSection';
import TrainingPlanDisplay from '../components/TrainingPlanDisplay';
import PlanExplanation from '../components/PlanExplanation';
import FAQItem from '../components/FAQItem';
import SEO from '../components/SEO';
import './CouchTo5KGuidePage.css';

export default function CouchTo5KGuidePage() {
  const guideContentRef = useRef();

  useEffect(() => {
    // Scroll to top when component mounts
    window.scrollTo(0, 0);
    
    // Set background image via JavaScript for better performance
    if (guideContentRef.current) {
      document.body.style.backgroundImage = "url('/images/c25k-guide.jpg')";
      document.body.style.backgroundSize = "cover";
      document.body.style.backgroundPosition = "center";
      document.body.style.backgroundRepeat = "no-repeat";
      document.body.style.backgroundAttachment = "fixed";
      document.body.style.backgroundBlendMode = "overlay";
      document.body.style.backgroundColor = "rgba(255, 255, 255, 0.85)";
    }

    // Cleanup function to reset background when component unmounts
    return () => {
      document.body.style.backgroundImage = "";
      document.body.style.backgroundSize = "";
      document.body.style.backgroundPosition = "";
      document.body.style.backgroundRepeat = "";
      document.body.style.backgroundAttachment = "";
      document.body.style.backgroundBlendMode = "";
      document.body.style.backgroundColor = "";
    };
  }, []);

  // Define section titles for TableOfContents
  const sections = [
    { id: "why-approach", title: "Why This Approach Works" },
    { id: "training-plan", title: "Your 8-Week Training Plan" },
    { id: "getting-started", title: "Getting Started: Essential Gear" },
    { id: "warm-up", title: "The All-Important Warm-Up" },
    { id: "run-walk-method", title: "Understanding the Run/Walk Method & Pacing" },
    { id: "cool-down", title: "Cooling Down After Every Run" },
    { id: "strength-training", title: "Strength Training for New Runners" },
    { id: "nutrition", title: "Nutrition Basics for Your Running Journey" },
    { id: "listen-body", title: "Listen to Your Body: Avoiding Common Pitfalls" },
    { id: "staying-motivated", title: "Staying Motivated: Tips to Keep You Going" },
    { id: "adapting-plan", title: "Adapting the Plan to You" },
    { id: "race-day", title: "Your First 5K Race Day: Simple Tips for Success" },
    { id: "you-got-this", title: "You've Got This!" }
  ];

  // Training plan data
  const c25kPlanJson = {
    weeks: [
      {
        week: 1,
        workout: "Alternate 60 seconds of running with 90 seconds of walking. Repeat 8 times.",
        totalTime: "30 minutes",
        note: "Focus on building a consistent routine"
      },
      {
        week: 2,
        workout: "Alternate 90 seconds of running with 2 minutes of walking. Repeat 6 times.",
        totalTime: "30 minutes",
        note: "Gradually increasing run time"
      },
      {
        week: 3,
        workout: "Two repetitions of: (Run 90 seconds, Walk 90 seconds, Run 3 minutes, Walk 3 minutes).",
        totalTime: "28 minutes",
        note: "Building endurance"
      },
      {
        week: 4,
        workout: "Run 3 mins, Walk 90 secs, Run 5 mins, Walk 2.5 mins, Run 3 mins, Walk 90 secs, Run 5 mins.",
        totalTime: "31 minutes",
        note: "Increasing running segments"
      },
      {
        week: 5,
        workout: "Run 5 mins, Walk 3 mins. Repeat 3 times.",
        totalTime: "31 minutes",
        note: "Longer continuous running"
      },
      {
        week: 6,
        workout: "Run 8 mins, Walk 5 mins, Run 8 mins.",
        totalTime: "31 minutes",
        note: "Developing pacing"
      },
      {
        week: 7,
        workout: "Run 20-25 minutes continuously.",
        totalTime: "30-35 minutes",
        note: "Sustained running effort"
      },
      {
        week: 8,
        workout: "Run 25-30 minutes continuously.",
        totalTime: "35-40 minutes",
        note: "Race day preparation!"
      }
    ]
  };

  // Define SEO data for the guide page
  const seoData = {
    title: "Couch to 5K: Your Complete Beginner's Guide to Running Success | Alt.Run",
    description: "Transform from a non-runner to a 5K finisher in just 8 weeks with our proven Couch to 5K training plan. Includes detailed workouts, tips, and guidance for beginners.",
    canonicalUrl: "/couch-to-5k-guide",
    ogType: "article",
    keywords: [
      "couch to 5k", "c25k", "beginner running guide", "5k training plan",
      "learn to run", "beginner runner", "run walk method", "first 5k",
      "running for beginners", "start running", "5k for beginners"
    ],
    breadcrumbs: [
      { name: "Home", path: "/" },
      { name: "Couch to 5K Guide", path: "/couch-to-5k-guide" }
    ]
  };

  return (
    <div className="guide-container" ref={guideContentRef}>
      {/* SEO Component */}
      <SEO {...seoData} />

      <GuideHeader
        title="Couch to 5K: Your Complete Beginner's Guide to Running Success"
        subtitle="From the Comfort of Your Couch to Your First 5K Finish Line in 8 Weeks"
        intro="Welcome to the start of an exciting journey! The Couch to 5K (C25K) program is a renowned and effective way for absolute beginners to gradually build up their running ability. This guide uses a proven approach, blending walking and running intervals to help you safely increase your endurance, prevent injuries, and enjoy the process of becoming a runner. We'll cover everything from your first steps to crossing that 5K finish line."
      />

      <TableOfContents sections={sections} />

      <div className="guide-main-content">
        {/* Disclaimer */}
        <div className="disclaimer-box">
          <h3>Important Disclaimer:</h3>
          <p>The information in this guide is intended for educational purposes only and should not replace professional medical advice. Always consult with a healthcare professional before starting any new exercise program, especially if you have any underlying health conditions or concerns. Listen to your body and progress at your own pace.</p>
        </div>

        {/* --- Section 1 --- */}
        <GuideSection id="why-approach" title="Why This Approach Works">
          <p>This program is designed for success. It starts slowly, allowing your body to adapt to the new demands of running. By incorporating walk breaks, you can cover more distance and recover more quickly than if you tried to run continuously from day one. This method builds both physical stamina and mental confidence, setting you up for a sustainable running habit.</p>
        </GuideSection>

        {/* --- Section 2 --- */}
        <GuideSection id="training-plan" title="Your 8-Week Training Plan">
          <p>This flexible plan is designed for completing 3 to 4 running workouts per week. It's crucial to include rest days between your runs to allow your body to recover and adapt. Listen to your body and adjust the schedule to fit your life – consistency is more important than rigidly sticking to specific days.</p>
          
          <TrainingPlanDisplay planData={c25kPlanJson} />
          
          <PlanExplanation
            textAfter={
              <>
                <p className="pro-tip"><strong>Pro Tip:</strong> To help organize your training and track your progress, consider using the <a href="/running-planner">alt.run free running planner</a>.</p>
              </>
            }
          />
        </GuideSection>

        {/* --- Section 3 --- */}
        <GuideSection id="getting-started" title="Getting Started: Essential Gear">
          <p>While you don't need a lot of fancy equipment, investing in a good pair of running shoes is highly recommended. Visit a specialist running store where staff can analyze your gait (how your foot lands) and help you find shoes that offer the right support and cushioning for your feet. Comfortable, moisture-wicking clothing will also enhance your running experience.</p>
        </GuideSection>

        {/* --- Section 4 --- */}
        <GuideSection id="warm-up" title="The All-Important Warm-Up (5 Minutes Before Each Run)">
          <p>Warming up properly prepares your muscles for exercise, increases blood flow, and can help reduce the risk of injury. Don't skip this!</p>
          
          <ul>
            <li><strong>Brisk Walking (2 minutes):</strong> Start by walking at a pace that elevates your heart rate slightly.</li>
            <li><strong>Leg Swings (30 seconds per leg, each direction):</strong> Gently swing one leg forward and backward, then side to side. Hold onto a wall for balance if needed.</li>
            <li><strong>Arm Circles (30 seconds each direction):</strong> Make big circles with your arms to warm up your shoulders.</li>
            <li><strong>Dynamic Stretches (1 minute total):</strong> Include movements like high knees, butt kicks, or torso twists.</li>
          </ul>
        </GuideSection>

        {/* --- Section 5 --- */}
        <GuideSection id="run-walk-method" title="Understanding the Run/Walk Method & Pacing">
          <h3>Running Pace</h3>
          <p>During your "run" intervals, aim for a comfortable, conversational pace. This means you should be able to speak in short sentences without gasping for air. If you can't, you're going too fast. It's okay if your "run" is a slow jog – the goal is to build endurance, not speed.</p>
          
          <h3>Walking Pace</h3>
          <p>Your "walk" intervals are for active recovery. Walk briskly enough to keep your heart rate up but allow yourself to catch your breath.</p>
        </GuideSection>

        {/* --- Section 6 --- */}
        <GuideSection id="cool-down" title="Cooling Down After Every Run (5-10 Minutes)">
          <p>A cool-down helps your heart rate return to normal gradually and can aid in muscle recovery.</p>
          
          <ul>
            <li><strong>Walking (5 minutes):</strong> Gradually slow your pace to a gentle walk.</li>
            <li><strong>Static Stretches (Hold each for 30 seconds):</strong> Once your heart rate has lowered, perform gentle stretches for your major running muscles.</li>
            <ul>
              <li><strong>Quadriceps Stretch:</strong> Stand on one leg, pull your other heel towards your glutes.</li>
              <li><strong>Hamstring Stretch:</strong> Sit with one leg extended, the other bent. Gently lean forward towards your extended foot.</li>
              <li><strong>Calf Stretch:</strong> Stand facing a wall, place one foot back, keeping the heel down, and lean into the wall.</li>
            </ul>
          </ul>
        </GuideSection>

        {/* --- Section 7 --- */}
        <GuideSection id="strength-training" title="Strength Training for New Runners (Aim for 2 Times Per Week)">
          <p>Incorporating strength training helps build the muscles needed for running, improves durability, and can prevent injuries. Focus on simple bodyweight exercises on your non-running days:</p>
          
          <ul>
            <li><strong>Squats (3 sets of 10-12 reps):</strong> Great for quads, glutes, and hamstrings.</li>
            <li><strong>Lunges (3 sets of 8-10 reps per leg):</strong> Works your leg muscles and improves balance.</li>
            <li><strong>Plank (3 sets, hold for 20-30 seconds):</strong> Builds core strength, essential for good running form.</li>
            <li><strong>Glute Bridges (3 sets of 12-15 reps):</strong> Strengthens your glutes and hamstrings.</li>
          </ul>
        </GuideSection>

        {/* --- Section 8 --- */}
        <GuideSection id="nutrition" title="Nutrition Basics for Your Running Journey">
          <p>You don't need a special diet, but smart food choices can support your training.</p>
          
          <ul>
            <li><strong>Pre-Run (30-60 minutes before):</strong> Have a small, easily digestible carbohydrate-rich snack if you're feeling hungry. A banana, a piece of toast, or a few crackers are good options.</li>
            <li><strong>Post-Run (within 30-60 minutes after):</strong> Aim for a snack or meal containing both carbohydrates (to replenish energy) and protein (to help muscle repair). Examples include Greek yogurt with fruit, a smoothie, or chocolate milk.</li>
            <li><strong>Hydration:</strong> Drink plenty of water throughout the day, every day. For runs under an hour, water is usually sufficient.</li>
          </ul>
        </GuideSection>

        {/* --- Section 9 --- */}
        <GuideSection id="listen-body" title="Listen to Your Body: Avoiding Common Pitfalls">
          <ul>
            <li><strong>Going Too Fast, Too Soon:</strong> This is the most common mistake. Remember the conversational pace rule.</li>
            <li><strong>Skipping Rest Days:</strong> Rest is when your body adapts and gets stronger. Don't underestimate its importance.</li>
            <li><strong>Ignoring Pain:</strong> It's normal to feel some muscle soreness, but sharp, persistent, or worsening pain is not normal. If something hurts, rest it. If it doesn't improve, see a healthcare professional.</li>
            <li><strong>Comparing Yourself to Others:</strong> This is your journey. Focus on your own progress and celebrate your achievements.</li>
          </ul>
        </GuideSection>

        {/* --- Section 10 --- */}
        <GuideSection id="staying-motivated" title="Staying Motivated: Tips to Keep You Going">
          <ul>
            <li><strong>Set a Goal:</strong> Having your first 5K race on the calendar can be a great motivator.</li>
            <li><strong>Track Your Progress:</strong> Keep a simple log of your runs. Seeing how far you've come is incredibly rewarding.</li>
            <li><strong>Find a Buddy:</strong> Running with a friend can make the time fly and provide accountability.</li>
            <li><strong>Mix Up Your Routes:</strong> Explore different paths to keep things interesting.</li>
            <li><strong>Reward Yourself:</strong> Celebrate milestones along the way (e.g., completing Week 4, running your first continuous 20 minutes).</li>
          </ul>
        </GuideSection>

        {/* --- Section 11 --- */}
        <GuideSection id="adapting-plan" title="Adapting the Plan to You">
          <p>This plan is a guide, not a rigid set of rules.</p>
          
          <ul>
            <li><strong>Repeat Weeks:</strong> If a particular week feels too challenging, don't hesitate to repeat it. It's better to build a solid foundation.</li>
            <li><strong>Cross-Training:</strong> On your non-running days, consider low-impact activities like swimming, cycling, or strength training. This can help build overall fitness while giving your running muscles a break.</li>
            <li><strong>Focus on Time, Not Distance (Initially):</strong> Especially in the early weeks, the goal is to complete the prescribed time for running and walking, not to cover a certain distance.</li>
          </ul>
        </GuideSection>

        {/* --- Section 12 --- */}
        <GuideSection id="race-day" title="Your First 5K Race Day: Simple Tips for Success">
          <p>When the big day arrives:</p>
          
          <ul>
            <li><strong>Rest Up:</strong> Aim for good sleep the night before.</li>
            <li><strong>Fuel Smart:</strong> Have your usual pre-run breakfast 1-2 hours before the start. Nothing new on race day!</li>
            <li><strong>Hydrate:</strong> Sip water in the morning, but don't overdo it right before the run.</li>
            <li><strong>Warm-Up:</strong> Do your usual 5-minute warm-up before the race starts.</li>
            <li><strong>Run Your Own Race:</strong> Don't get caught up in the excitement and start too fast. Stick to your comfortable pace.</li>
            <li><strong>Enjoy the Experience:</strong> Soak in the atmosphere, be proud of your accomplishment, and have fun!</li>
          </ul>
        </GuideSection>

        {/* --- Section 13 --- */}
        <GuideSection id="you-got-this" title="You've Got This!">
          <p>Embarking on a Couch to 5K journey is a fantastic achievement. Trust the process, be patient with yourself, and celebrate every step forward. For more detailed information on running form, injury prevention, and other helpful topics, explore the <a href="/running-guides">alt.run running guides</a>.</p>
          
          <p className="final-encouragement">Lace up those shoes – your first 5K is waiting!</p>
        </GuideSection>
      </div>
    </div>
  );
}

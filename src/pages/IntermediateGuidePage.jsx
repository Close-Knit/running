// src/pages/IntermediateGuidePage.jsx
import React, { useEffect, useRef } from 'react';
import GuideHeader from '../components/GuideHeader';
import TableOfContents from '../components/TableOfContents';
import GuideSection from '../components/GuideSection';
import FAQItem from '../components/FAQItem';
import SEO from '../components/SEO';
import './IntermediateGuidePage.css';

export default function IntermediateGuidePage() {
  const guideContentRef = useRef();

  // Set background image for the guide page
  useEffect(() => {
    const pageBackground = document.querySelector('.page-background');
    if (pageBackground) {
      pageBackground.style.backgroundImage = 'url(/images/intermediate-runner.jpg)';

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
    { id: "stepping-up", title: "Stepping Up: Beyond Consistent Mileage" },
    { id: "training-principles", title: "Building Your Engine: Intermediate Training Principles" },
    { id: "training-frameworks", title: "Intermediate Training Frameworks & Example Plans" },
    { id: "unlocking-speed", title: "Unlocking Speed: Pacing, Workouts & Techniques" },
    { id: "extending-reach", title: "Extending Your Reach: Mastering Longer Distances" },
    { id: "fueling-performance", title: "Fueling Performance: Advanced Nutrition & Hydration" },
    { id: "gear-upgrades", title: "Gear That Grows With You: Upgrades & Considerations" },
    { id: "injury-prevention", title: "Staying Strong & Injury-Free: Proactive Strategies" },
    { id: "mental-edge", title: "The Mental Edge: Motivation, Goals & Race Smarts" },
    { id: "faq", title: "Intermediate Runner FAQ" },
    { id: "whats-next", title: "What's Next? Exploring Advanced Horizons" }
  ];

  // Define SEO data for the guide page
  const seoData = {
    title: "The Ultimate Intermediate Runner's Guide | Alt.Run",
    description: "Take your running to the next level with our comprehensive intermediate runner's guide. Learn advanced training techniques, nutrition strategies, and more.",
    canonicalUrl: "/intermediate-running-guide",
    ogType: "article",
    keywords: [
      "intermediate running guide", "advanced running tips", "running training plans",
      "intermediate runner nutrition", "running speed workouts", "half marathon training",
      "running form improvement", "injury prevention for runners", "running gear guide"
    ],
    schema: {
      "@context": "https://schema.org",
      "@type": "Article",
      "@id": "https://alt.run/intermediate-running-guide#article",
      "url": "https://alt.run/intermediate-running-guide",
      "name": "The Alt.Run Ultimate Intermediate Runner's Guide",
      "headline": "The Alt.Run Ultimate Intermediate Runner's Guide",
      "description": "Take your running to the next level with our comprehensive intermediate runner's guide.",
      "isPartOf": { "@id": "https://alt.run/#website" },
      "mainEntityOfPage": { "@id": "https://alt.run/intermediate-running-guide#webpage" },
      "image": {
        "@type": "ImageObject",
        "url": "https://alt.run/images/intermediate-runner.jpg",
        "width": 1200,
        "height": 630
      },
      "publisher": { "@id": "https://alt.run/#organization" }
    },
    breadcrumbs: [
      { name: "Home", path: "/" },
      { name: "Intermediate Running Guide", path: "/intermediate-running-guide" }
    ]
  };

  return (
    <div className="guide-container" ref={guideContentRef}>
      {/* SEO Component */}
      <SEO {...seoData} />

      <GuideHeader
        title="The Alt.Run Ultimate Intermediate Runner's Guide"
        subtitle="Unlock Your Potential: Run Faster, Further, Smarter"
        intro="You've built a solid running base – congratulations! This guide is for runners like you who are ready to take their performance, understanding, and enjoyment of running to the next level. We'll explore structured training, key physiological adaptations, effective workout types, fueling strategies, injury prevention, and the mental game to help you achieve your new running goals."
      />

      <TableOfContents sections={sections} />

      <div className="guide-main-content">
        {/* User Instruction Note */}
        <div className="user-instructions">
          <h3>How to Use This Guide:</h3>
          <ul>
            <li>Navigate through the sections using the Table of Contents above.</li>
            <li>Each section builds on fundamental running knowledge to help you progress.</li>
            <li>Pay special attention to the <strong>'Training Frameworks & Example Plans'</strong> section for structured guidance.</li>
            <li>Implement changes gradually – not all at once – to avoid injury and burnout.</li>
          </ul>
        </div>

        {/* --- Section 1 --- */}
        <GuideSection id="stepping-up" title="Stepping Up: Beyond Consistent Mileage">
          <p>Congratulations on reaching the intermediate level of your running journey! At this stage, you've built a solid foundation of consistent running and perhaps completed a 5K or regularly run 15-25 miles per week. Now it's time to take your running to the next level.</p>

          <h3>Moving Beyond "Just Running More"</h3>
          <p>As a beginner, simply running consistently produces significant improvements. But as an intermediate runner, you'll need more structured and varied training to continue progressing. Simply adding more miles can lead to plateaus or even injuries. Instead, you'll need to train smarter by incorporating different types of workouts that target specific physiological systems.</p>

          <h3>What Makes an "Intermediate Runner"?</h3>
          <ul>
            <li><strong>Experience:</strong> Typically 6+ months of consistent running</li>
            <li><strong>Weekly volume:</strong> Comfortable with 15-25 miles per week</li>
            <li><strong>Race experience:</strong> Completed at least one organized race (often a 5K)</li>
            <li><strong>Goals:</strong> Looking to improve performance, increase distance, or train for longer races</li>
          </ul>

          <h3>Setting New, Specific Goals</h3>
          <p>As an intermediate runner, your goals should become more specific than "run more" or "get faster." Consider targets like:</p>
          <ul>
            <li>Improving your 5K time by a specific amount</li>
            <li>Completing a 10K or half marathon</li>
            <li>Running a certain number of days per week consistently</li>
            <li>Incorporating specific workout types (tempo runs, intervals, etc.) regularly</li>
          </ul>

          <h3>Understanding Physiological Adaptations</h3>
          <p>To train effectively, it helps to understand the physiological changes your body undergoes with different types of training. Here are key adaptations that intermediate runners should focus on:</p>

          <table className="physio-table">
            <thead>
              <tr>
                <th>Adaptation</th>
                <th>What It Means</th>
                <th>How to Improve It</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><strong>Aerobic Capacity</strong></td>
                <td>Your body's ability to use oxygen during exercise. Improved by increasing capillary density, mitochondria, and red blood cells.</td>
                <td>Consistent easy running, gradually increasing weekly mileage (20-40+ miles)</td>
              </tr>
              <tr>
                <td><strong>Lactate Threshold</strong></td>
                <td>The intensity at which lactate begins to accumulate in the bloodstream faster than it can be cleared. Higher threshold = faster sustainable pace.</td>
                <td>Tempo runs, cruise intervals at approximately 80-90% of max heart rate</td>
              </tr>
              <tr>
                <td><strong>VO2 Max</strong></td>
                <td>The maximum amount of oxygen your body can utilize during intense exercise. Higher VO2 max = greater potential for performance.</td>
                <td>Interval training at 90-100% effort (e.g., 400m-1200m repeats)</td>
              </tr>
              <tr>
                <td><strong>Running Economy</strong></td>
                <td>How efficiently you use oxygen at a given pace. Better economy = less energy used at the same speed.</td>
                <td>Strides, hill sprints, form drills, strength training</td>
              </tr>
              <tr>
                <td><strong>Muscular Endurance</strong></td>
                <td>Your muscles' ability to perform repeatedly without fatigue.</td>
                <td>Long runs (90+ minutes), hill workouts, strength training</td>
              </tr>
            </tbody>
          </table>

          <p>Understanding these adaptations helps you see why a varied training approach is necessary. Each workout type in your training plan serves a specific purpose in developing these systems.</p>
        </GuideSection>

        {/* --- Section 2 --- */}
        <GuideSection id="training-principles" title="Building Your Engine: Intermediate Training Principles">
          <h3>Core Types of Runs: The "Ingredients" of Your Training</h3>
          <p>A well-rounded training plan for intermediate runners includes several types of workouts, each serving a specific purpose. Think of these as the ingredients in your training recipe:</p>

          <h4>Easy Runs</h4>
          <p><strong>Purpose:</strong> Build aerobic capacity, promote recovery, increase capillary density, improve fat metabolism, and allow for higher overall training volume with lower injury risk.</p>
          <p><strong>How it feels:</strong> Conversational pace – you should be able to speak in complete sentences. Heart rate typically around 65-75% of maximum.</p>
          <p><strong>Key points:</strong> These should make up the majority (about 80%) of your weekly mileage. Many runners do these too fast, which compromises recovery and limits the benefits.</p>

          <h4>Long Runs</h4>
          <p><strong>Purpose:</strong> Develop endurance, improve glycogen storage, build mental toughness, increase mitochondrial density, and prepare the body for race distances.</p>
          <p><strong>How it feels:</strong> Similar to easy runs but extended in duration. Typically 20-30% of weekly mileage in a single run.</p>
          <p><strong>Key points:</strong> Increase gradually (no more than 1-2 miles per week) with occasional "step-back" weeks. For intermediate runners, long runs typically range from 8-15 miles depending on goals.</p>

          <h4>Tempo Runs (Lactate Threshold Runs)</h4>
          <p><strong>Purpose:</strong> Improve lactate threshold, which allows you to sustain faster paces for longer periods. These runs teach your body to clear lactate more efficiently.</p>
          <p><strong>How it feels:</strong> "Comfortably hard" – you could speak in short phrases but not carry on a conversation. Typically around 80-90% of maximum heart rate or about 25-30 seconds per mile slower than 5K race pace.</p>
          <p><strong>Common structures:</strong></p>
          <ul>
            <li>Steady tempo: 20-40 minutes at threshold pace</li>
            <li>Cruise intervals: 3-4 × 8-10 minutes at threshold pace with 1-2 minutes recovery</li>
          </ul>

          <h4>Interval Training (VO2 Max/Speed Work)</h4>
          <p><strong>Purpose:</strong> Improve VO2 max, running economy, neuromuscular coordination, and top-end speed.</p>
          <p><strong>How it feels:</strong> Hard effort – breathing is labored, and you can only speak a few words at a time. Typically 90-100% of maximum heart rate or around 5K race pace to mile race pace.</p>
          <p><strong>Common structures:</strong></p>
          <ul>
            <li>Classic intervals: 6-8 × 800m at 5K pace with equal recovery jog</li>
            <li>Shorter intervals: 10-12 × 400m at mile pace with 200m recovery jog</li>
            <li>Longer intervals: 4-5 × 1000m at 5K pace with 400m recovery jog</li>
          </ul>
          <p><strong>Key points:</strong> Always include thorough warm-up and cool-down (10-15 minutes each). Limit these sessions to once per week for most intermediate runners.</p>

          <h4>Fartlek Runs</h4>
          <p><strong>Purpose:</strong> Develop multiple energy systems in a less structured format. Great for mental breaks from rigid training and learning to vary pace based on feel.</p>
          <p><strong>How it feels:</strong> Alternating between comfortable and challenging efforts throughout the run.</p>
          <p><strong>Example:</strong> After a warm-up, alternate 3 minutes hard, 2 minutes easy for 30 minutes, then cool down.</p>

          <h3>Periodization: The Blueprint for Progress</h3>
          <p>Periodization is the practice of structuring training in cycles with different focuses to achieve peak performance at target times while reducing injury risk. For intermediate runners, a simple periodization approach might include:</p>

          <ul>
            <li><strong>Base Phase (4-8 weeks):</strong> Focus on building aerobic capacity with mostly easy runs and gradually increasing mileage. Include strides and hill sprints for neuromuscular development.</li>
            <li><strong>Strength Phase (4-6 weeks):</strong> Introduce more structured workouts like tempo runs and longer intervals while maintaining aerobic development.</li>
            <li><strong>Specific Phase (4-6 weeks):</strong> Focus on race-specific training with workouts that mimic race demands.</li>
            <li><strong>Taper (1-2 weeks):</strong> Reduce volume while maintaining some intensity to arrive at the race fresh but not flat.</li>
          </ul>

          <h3>The 80/20 Rule (Polarized Training)</h3>
          <p>Research consistently shows that successful endurance athletes do about 80% of their training at low intensity (easy, conversational pace) and only 20% at moderate to high intensity (tempo, interval, race pace). Many intermediate runners make the mistake of doing too many runs in the "moderate" zone – too fast for optimal aerobic development but too slow for high-intensity benefits.</p>

          <h3>The Typical Training Week</h3>
          <p>Here's a sample structure for an intermediate runner doing 4-5 runs per week:</p>

          <ul>
            <li><strong>Monday:</strong> Rest or Cross-Train (strength training recommended)</li>
            <li><strong>Tuesday:</strong> Easy Run with Strides (30-45 minutes + 6-8 × 20-second strides)</li>
            <li><strong>Wednesday:</strong> Workout (alternating between tempo and interval sessions)</li>
            <li><strong>Thursday:</strong> Easy Run or Cross-Train (30-45 minutes)</li>
            <li><strong>Friday:</strong> Rest or Easy Run (30 minutes)</li>
            <li><strong>Saturday:</strong> Long Run (60-120 minutes)</li>
            <li><strong>Sunday:</strong> Easy Recovery Run (30-40 minutes) or Rest</li>
          </ul>

          <h3>Progressive Overload & Adaptation</h3>
          <p>Improvement comes from gradually increasing training stress followed by adequate recovery. The classic guideline is the 10% rule – don't increase weekly mileage by more than 10% from one week to the next. However, this is just a guideline; listen to your body and be willing to adjust.</p>

          <p>Incorporate "step-back" weeks every 3-4 weeks, where you reduce mileage by 20-30% to allow for recovery and adaptation. This prevents overtraining and reduces injury risk.</p>

          <h3>Rest & Recovery: The Secret Ingredient</h3>
          <p>As training intensity increases, recovery becomes even more important. Quality sleep, proper nutrition, and stress management all play crucial roles in your body's ability to adapt to training. Remember that improvement happens during recovery, not during the workouts themselves.</p>

          <p>Active recovery (light cross-training, walking, yoga) can promote blood flow and speed recovery without adding training stress.</p>
        </GuideSection>

        {/* --- Section 3 --- */}
        <GuideSection id="training-frameworks" title="Intermediate Training Frameworks & Example Plans">
          <div className="disclaimer-box">
            <p><strong>Disclaimer:</strong> These frameworks and plans are templates. Adjust based on your experience, goals, and how your body responds. Always prioritize health and listen to your body. Consider consulting a coach for personalized plans.</p>
          </div>

          <h3>Detailed Periodization Framework</h3>
          <p>Here's a more detailed look at how to structure your training in phases to build toward a goal race:</p>

          <div className="training-phase">
            <h4>Phase 1: Base Development (4-6 weeks)</h4>
            <div className="training-phase-description">
              <p><strong>Focus:</strong> Building aerobic capacity, running economy, and musculoskeletal strength. This phase emphasizes volume over intensity, with a high percentage of easy running.</p>
              <p><strong>Key Components:</strong></p>
              <ul>
                <li>Gradually increasing weekly mileage</li>
                <li>Mostly easy runs (70-80% of max heart rate)</li>
                <li>Introduction of strides and hill sprints for neuromuscular development</li>
                <li>One moderate long run per week, gradually increasing in duration</li>
                <li>Consistent strength training (2-3 sessions per week)</li>
              </ul>
            </div>
            <div className="workout-examples">
              <h5>Example Weekly Structure:</h5>
              <ul>
                <li><strong>Monday:</strong> Active recovery/Cross-train</li>
                <li><strong>Tuesday:</strong> Aerobic run (60 min @ 70% HRmax) + 6-8 × 20-second strides</li>
                <li><strong>Wednesday:</strong> Hill repeats (8 × 45-second @ 5K effort) or Fartlek</li>
                <li><strong>Thursday:</strong> Recovery Run (40 min) + Strength Training</li>
                <li><strong>Friday:</strong> Cross-train or Rest</li>
                <li><strong>Saturday:</strong> Long Run (90-120 min @ 65-75% HRmax, gradually increasing)</li>
                <li><strong>Sunday:</strong> Easy Run (45 min) or Rest</li>
              </ul>
            </div>
          </div>

          <div className="training-phase">
            <h4>Phase 2: Intensity Accumulation (4-6 weeks)</h4>
            <div className="training-phase-description">
              <p><strong>Focus:</strong> Improving lactate threshold and VO2 max while maintaining aerobic development. This phase introduces more structured workouts while keeping the 80/20 principle intact.</p>
              <p><strong>Key Components:</strong></p>
              <ul>
                <li>Weekly mileage stabilizes (minimal increases)</li>
                <li>Introduction of regular tempo/threshold workouts</li>
                <li>Addition of VO2 max interval sessions</li>
                <li>Long runs may include segments at marathon or half-marathon pace</li>
                <li>Continued strength training (1-2 sessions per week)</li>
              </ul>
            </div>
            <div className="workout-examples">
              <h5>Key Workout Types:</h5>
              <ul>
                <li><strong>Threshold Tempo:</strong> 3 × 10 min @ half-marathon pace (82-88% HRmax) with 2-3 min jog recovery</li>
                <li><strong>VO2 Max Intervals:</strong> 5-6 × 800m @ 3K-5K pace (90-95% HRmax) with equal jog recovery</li>
                <li><strong>Progressive Long Run:</strong> 120 min with final 30 min @ marathon pace or slightly faster</li>
              </ul>
            </div>
          </div>

          <div className="training-phase">
            <h4>Phase 3: Race Specificity & Taper (2-4 weeks)</h4>
            <div className="training-phase-description">
              <p><strong>Focus:</strong> Fine-tuning for your goal race with race-specific workouts and adequate recovery. Volume decreases while some intensity is maintained.</p>
              <p><strong>Key Components:</strong></p>
              <ul>
                <li>Weekly mileage decreases progressively (by 30-50% in final week)</li>
                <li>Race pace simulation workouts</li>
                <li>Shorter, higher-quality sessions</li>
                <li>Increased focus on recovery and rest</li>
                <li>Maintenance strength training only (1 session per week)</li>
              </ul>
            </div>
            <div className="workout-examples">
              <h5>Key Workouts:</h5>
              <ul>
                <li><strong>Race Pace Simulation:</strong> 2-3 × 1 mile @ goal race pace with 3-4 min recovery</li>
                <li><strong>Descending Ladder:</strong> 1600m-1200m-800m-400m at progressively faster paces with equal recovery</li>
                <li><strong>Final Long Run:</strong> 60-90 min easy (1-2 weeks before race)</li>
              </ul>
            </div>
          </div>

          <h3>Simplified Example Plans</h3>
          <p>Here are two condensed training plans for common intermediate goals:</p>

          <h4>10-Week Faster 5K/10K Plan</h4>
          <p>This plan focuses on improving your speed and endurance for shorter race distances:</p>
          <ul>
            <li><strong>Weeks 1-4 (Base):</strong> 4-5 runs per week, building to 20-30 miles total. One long run (6-8 miles), one workout with strides or hill repeats, rest easy running.</li>
            <li><strong>Weeks 5-8 (Intensity):</strong> Maintain 4-5 runs per week. One tempo workout (e.g., 4 × 5 min @ threshold), one interval session (e.g., 6 × 400m @ 5K pace), one long run (7-9 miles).</li>
            <li><strong>Weeks 9-10 (Taper):</strong> Reduce volume by 30-40%. Include 1-2 race-specific workouts (e.g., 3 × 1 mile @ goal pace). Rest 2-3 days before race.</li>
          </ul>

          <h4>12-Week First Half Marathon Plan</h4>
          <p>This plan focuses on building endurance for your first half marathon:</p>
          <ul>
            <li><strong>Weeks 1-5 (Base):</strong> 4 runs per week, building to 20-25 miles total. Long run progresses from 6 to 9 miles. One run with strides, rest easy running.</li>
            <li><strong>Weeks 6-10 (Endurance):</strong> 4-5 runs per week, building to 25-30 miles. Long run progresses from 10 to 12 miles. One tempo run (e.g., 2 × 15 min @ half marathon pace).</li>
            <li><strong>Weeks 11-12 (Taper):</strong> Reduce volume by 30-40%. Final long run of 8-10 miles two weeks before race. Include one run with 2-3 miles at goal race pace.</li>
          </ul>

          <p>Remember that these plans are starting points. The key to successful training is consistency and adaptation based on how your body responds. Don't hesitate to repeat weeks, add extra recovery days, or adjust workouts as needed.</p>
        </GuideSection>

        {/* --- Section 4 --- */}
        <GuideSection id="unlocking-speed" title="Unlocking Speed: Pacing, Workouts & Techniques">
          <h3>Understanding Your Training Paces</h3>
          <p>Training at the right intensities is crucial for improvement. Here are methods to determine your appropriate training paces:</p>

          <h4>Methods to Determine Your Paces</h4>
          <ul>
            <li><strong>Recent Race Times:</strong> The most accurate method. Use a race equivalency calculator to estimate paces for different distances.</li>
            <li><strong>Time Trials:</strong> If you don't have recent race results, conduct a time trial (e.g., 1 mile or 5K) at maximum effort.</li>
            <li><strong>Heart Rate Zones:</strong> Can be useful if you have an accurate maximum heart rate (best determined through a lab test or field test).</li>
            <li><strong>Perceived Effort:</strong> While subjective, learning to gauge effort by feel is a valuable skill for all runners.</li>
          </ul>

          <h4>Common Training Pace Zones</h4>
          <table className="physio-table">
            <thead>
              <tr>
                <th>Pace Zone</th>
                <th>Description</th>
                <th>Perceived Effort</th>
                <th>% of Max HR</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><strong>Recovery</strong></td>
                <td>1-2 min/mile slower than marathon pace</td>
                <td>Very easy, could talk comfortably</td>
                <td>60-70%</td>
              </tr>
              <tr>
                <td><strong>Easy</strong></td>
                <td>30-90 sec/mile slower than marathon pace</td>
                <td>Comfortable, conversational</td>
                <td>70-75%</td>
              </tr>
              <tr>
                <td><strong>Marathon</strong></td>
                <td>Your sustainable marathon race pace</td>
                <td>Moderately challenging but sustainable</td>
                <td>75-80%</td>
              </tr>
              <tr>
                <td><strong>Threshold</strong></td>
                <td>15-30 sec/mile slower than 10K pace</td>
                <td>"Comfortably hard," limited talking</td>
                <td>80-90%</td>
              </tr>
              <tr>
                <td><strong>Interval (VO2 Max)</strong></td>
                <td>5K to 3K race pace</td>
                <td>Hard, labored breathing</td>
                <td>90-95%</td>
              </tr>
              <tr>
                <td><strong>Repetition</strong></td>
                <td>Mile race pace or faster</td>
                <td>Very hard, short sustainable bursts</td>
                <td>95-100%</td>
              </tr>
            </tbody>
          </table>

          <p>Online resources like Jack Daniels' VDOT calculator or the McMillan Running Calculator can help determine your specific training paces based on a recent race performance.</p>

          <h3>In-Depth Speed Workouts</h3>
          <p>Beyond the basic workout types covered earlier, here are specific speed-focused sessions that can help intermediate runners improve performance:</p>

          <h4>Strides</h4>
          <p><strong>What they are:</strong> Short accelerations of 15-30 seconds, building to about 85-90% of your maximum speed, focusing on good form and relaxation.</p>
          <p><strong>How to perform:</strong> After an easy run, find a flat, smooth surface. Accelerate gradually over 5 seconds to about 85-90% of your maximum speed, hold for 10-15 seconds, then gradually decelerate. Walk or jog easily for 60-90 seconds between each stride.</p>
          <p><strong>Benefits:</strong> Improves neuromuscular coordination, running economy, and form without significant fatigue.</p>
          <p><strong>Frequency:</strong> 4-8 strides, 1-3 times per week, typically after easy runs or as part of a warm-up before quality sessions.</p>

          <h4>Hill Repeats</h4>
          <p><strong>What they are:</strong> Short, intense efforts running up a moderate hill, focusing on power and form.</p>
          <p><strong>How to perform:</strong> Find a hill with a 4-8% grade. After a thorough warm-up, run hard uphill for 30-90 seconds (depending on your experience level), focusing on powerful arm drive and good knee lift. Jog or walk back down for recovery. Start with 4-6 repeats and build to 8-10 over time.</p>
          <p><strong>Benefits:</strong> Builds strength, power, and running economy. Hill work is also "speed work in disguise" but with lower injury risk than flat sprinting.</p>
          <p><strong>Frequency:</strong> Once per week during base and early strength phases.</p>

          <h4>Neuromuscular Activation Drills</h4>
          <p>These specialized drills help improve running economy and power:</p>

          <ul>
            <li><strong>Hill Bounding:</strong> On a moderate hill, perform exaggerated bounding steps, focusing on maximum air time and powerful push-off. Do 8-10 repetitions of 10-15 seconds each with full recovery.</li>
            <li><strong>Cadence Drills:</strong> During an easy run, include 30-second segments where you increase your cadence by 5-10 steps per minute above your natural rhythm, then return to normal. Repeat 8-10 times throughout the run.</li>
            <li><strong>Running Form Drills:</strong> Include classic drills like high knees, butt kicks, skipping, and carioca in your warm-up routine to reinforce proper movement patterns.</li>
          </ul>

          <h3>Running Form for Efficiency</h3>
          <p>As an intermediate runner, subtle refinements to your form can yield significant improvements in efficiency and speed:</p>

          <h4>Key Form Elements to Focus On</h4>
          <ul>
            <li><strong>Posture:</strong> Run tall with a slight forward lean from the ankles (not the waist). Imagine a string pulling you up from the top of your head.</li>
            <li><strong>Arm Action:</strong> Keep elbows bent at approximately 90 degrees, with arms swinging forward and back (not across your body). Hands should remain relaxed, not clenched.</li>
            <li><strong>Foot Strike:</strong> Aim to land with your foot under your center of mass, not far out in front (overstriding). The exact part of the foot that lands first (heel, midfoot, forefoot) is less important than avoiding overstriding.</li>
            <li><strong>Cadence:</strong> Most efficient runners maintain a relatively high cadence of 170-180+ steps per minute. If your cadence is significantly lower, gradually work on increasing it through cadence drills.</li>
          </ul>

          <h4>Checking Your Cadence</h4>
          <p>To check your cadence, count your steps on one foot for 30 seconds during a run at your normal pace, then multiply by 4 to get steps per minute. If your cadence is below 160, consider gradually working to increase it through the following methods:</p>
          <ul>
            <li>Use a metronome app set to your target cadence during portions of your easy runs</li>
            <li>Focus on taking quicker, lighter steps rather than longer strides</li>
            <li>Include the cadence drills mentioned above in your regular training</li>
          </ul>

          <p>Remember that form changes should be implemented gradually. Focus on one element at a time, and make small adjustments rather than trying to completely overhaul your running form all at once.</p>
        </GuideSection>

        {/* --- Section 5 --- */}
        <GuideSection id="extending-reach" title="Extending Your Reach: Mastering Longer Distances">
          <h3>The Unique Demands of Longer Runs</h3>
          <p>As you progress to runs beyond 90 minutes, your body faces new physiological challenges:</p>

          <ul>
            <li><strong>Glycogen Depletion:</strong> Your body's stored carbohydrates (glycogen) begin to deplete significantly after 75-90 minutes of continuous running, requiring nutritional strategies to maintain energy.</li>
            <li><strong>Muscular Fatigue:</strong> Extended time on your feet leads to cumulative muscular fatigue, testing your endurance and form maintenance.</li>
            <li><strong>Hydration Challenges:</strong> Longer duration means more significant fluid and electrolyte losses that need to be replaced.</li>
            <li><strong>Mental Stamina:</strong> The psychological aspect becomes increasingly important as physical fatigue sets in.</li>
          </ul>

          <h3>Breaking Mental Barriers</h3>
          <p>The mental component of long-distance running is often as challenging as the physical aspect. Here are strategies to build mental toughness:</p>

          <ul>
            <li><strong>Segmenting:</strong> Break the run into smaller, manageable chunks rather than focusing on the total distance. For example, think of a 15-mile run as three 5-mile segments.</li>
            <li><strong>Mantras:</strong> Develop personal mantras or power phrases to repeat when things get tough. These should be short, positive, and meaningful to you.</li>
            <li><strong>Mindfulness:</strong> Practice staying in the present moment rather than dwelling on how much distance remains. Focus on your breathing, form, or surroundings.</li>
            <li><strong>Visualization:</strong> Before your run, visualize yourself successfully completing the distance, including how you'll handle challenging sections.</li>
            <li><strong>Purpose:</strong> Connect with your deeper reasons for running these distances. Having a strong "why" helps push through difficult moments.</li>
          </ul>

          <h3>Pacing Strategies for Successful Long Runs</h3>
          <p>Proper pacing is crucial for long-distance success. Consider these approaches:</p>

          <ul>
            <li><strong>Start Slow:</strong> Begin at least 30-60 seconds per mile slower than your goal pace. This conserves glycogen and reduces early fatigue.</li>
            <li><strong>Negative Splits:</strong> Aim to run the second half slightly faster than the first half. This approach is both physiologically and psychologically beneficial.</li>
            <li><strong>Progressive Pace:</strong> Gradually increase your pace throughout the run, finishing at or near your goal race pace for the final few miles.</li>
            <li><strong>Heart Rate Management:</strong> For training runs, keep your heart rate in the aerobic zone (typically 65-75% of maximum) for most of the distance.</li>
          </ul>

          <h3>Fueling for the Long Haul</h3>
          <p>Nutrition becomes increasingly important as run duration increases:</p>

          <ul>
            <li><strong>Pre-Run:</strong> Consume 200-300 calories of easily digestible carbohydrates 1-2 hours before your long run.</li>
            <li><strong>During the Run:</strong> For runs over 75-90 minutes, aim to consume 30-60g of carbohydrates per hour (more details in the next section).</li>
            <li><strong>Hydration:</strong> Drink to thirst, typically 16-24 oz (500-700ml) of fluid per hour, depending on conditions and sweat rate.</li>
            <li><strong>Practice:</strong> Use your long training runs to experiment with different fueling strategies to find what works for you.</li>
          </ul>

          <h3>Recovery After Very Long Runs</h3>
          <p>Proper recovery becomes even more critical after runs exceeding 90 minutes:</p>

          <ul>
            <li><strong>Immediate Refueling:</strong> Consume a 3:1 or 4:1 ratio of carbohydrates to protein within 30-60 minutes after finishing.</li>
            <li><strong>Hydration:</strong> Replace 150% of estimated fluid losses over the next several hours (weigh yourself before and after if possible).</li>
            <li><strong>Active Recovery:</strong> Light walking later in the day or the following day promotes blood flow and speeds recovery.</li>
            <li><strong>Sleep:</strong> Prioritize getting 8-9 hours of quality sleep the night after a very long run.</li>
            <li><strong>Easy Days:</strong> Follow long runs with 1-2 very easy days or rest days to allow for proper recovery.</li>
          </ul>

          <h3>Building Up Safely</h3>
          <p>Increase your long run distance gradually to reduce injury risk:</p>

          <ul>
            <li>Increase by no more than 1-2 miles per week for your long run</li>
            <li>Include a "step-back" week every 3-4 weeks where you reduce the long run distance by 30-40%</li>
            <li>Ensure your long run doesn't exceed about 30% of your weekly mileage</li>
            <li>Consider using a run/walk strategy for your first attempts at significantly longer distances</li>
          </ul>

          <p>Remember that mastering longer distances is a gradual process that requires patience. Each successful long run builds both physical endurance and mental confidence for the next challenge.</p>
        </GuideSection>

        {/* --- Section 6 --- */}
        <GuideSection id="fueling-performance" title="Fueling Performance: Advanced Nutrition & Hydration">
          <h3>Daily Nutrition for Optimal Performance & Recovery</h3>
          <p>As an intermediate runner with increased training demands, your daily nutrition becomes increasingly important for performance, recovery, and injury prevention.</p>

          <h4>Caloric Needs</h4>
          <p>Many intermediate runners underestimate their caloric needs, which can impair performance and recovery. As a general guideline:</p>
          <ul>
            <li>Running burns approximately 100 calories per mile (varies by weight and efficiency)</li>
            <li>Your total daily caloric needs include your basal metabolic rate plus activity expenditure</li>
            <li>Signs of underfueling include persistent fatigue, poor recovery, frequent injuries, and stalled progress</li>
          </ul>

          <h4>Macronutrient Balance</h4>
          <p>A balanced approach to macronutrients supports both performance and health:</p>
          <ul>
            <li><strong>Carbohydrates:</strong> The primary fuel for running. Aim for 5-7g per kg of body weight daily for moderate training (7-10g/kg for high-volume training).</li>
            <li><strong>Protein:</strong> Essential for muscle repair and recovery. Target 1.2-1.6g per kg of body weight daily, spread throughout the day.</li>
            <li><strong>Fats:</strong> Important for hormone production and overall health. Include healthy sources like avocados, nuts, olive oil, and fatty fish to comprise 20-30% of your diet.</li>
          </ul>

          <h4>Micronutrients for Runners</h4>
          <p>Several vitamins and minerals are particularly important for runners:</p>
          <ul>
            <li><strong>Iron:</strong> Critical for oxygen transport. Female runners are especially prone to deficiency.</li>
            <li><strong>Calcium:</strong> Essential for bone health and muscle function.</li>
            <li><strong>Vitamin D:</strong> Works with calcium for bone health and may improve muscle function.</li>
            <li><strong>B Vitamins:</strong> Important for energy metabolism and red blood cell production.</li>
          </ul>
          <p>While a balanced diet should provide most nutrients, consider having bloodwork done if you suspect deficiencies, especially for iron and vitamin D.</p>

          <h3>Pre-Run Fueling</h3>
          <p>What and when you eat before running significantly impacts your performance:</p>

          <h4>Early Morning Runs</h4>
          <ul>
            <li><strong>Short runs (under 60 minutes):</strong> A small carbohydrate snack (banana, toast with honey) is optional but beneficial.</li>
            <li><strong>Longer or higher intensity runs:</strong> Try to eat 200-300 calories of easily digestible carbs 30-60 minutes before starting.</li>
            <li><strong>Hydration:</strong> Drink 8-16oz of water upon waking, regardless of run length.</li>
          </ul>

          <h4>Later Day Runs</h4>
          <ul>
            <li><strong>2-3 hours before:</strong> A balanced meal with carbs, moderate protein, and low fat (e.g., sandwich with lean protein, pasta with light sauce).</li>
            <li><strong>60 minutes before:</strong> Small carbohydrate snack if needed (e.g., banana, energy bar, or sports drink).</li>
            <li><strong>Hydration:</strong> Drink 16-20oz of water in the 2 hours leading up to your run.</li>
          </ul>

          <h3>During-Run Fueling</h3>
          <p>For runs lasting longer than 75-90 minutes, fueling during the activity becomes important:</p>

          <h4>Carbohydrate Guidelines</h4>
          <ul>
            <li><strong>Runs 75-90 minutes:</strong> 30-45g carbohydrates per hour</li>
            <li><strong>Runs 90+ minutes:</strong> 45-60g carbohydrates per hour</li>
            <li><strong>Very long runs (2.5+ hours):</strong> Up to 90g per hour for highly trained athletes using mixed carbohydrate sources</li>
          </ul>

          <h4>Fueling Options</h4>
          <table className="physio-table">
            <thead>
              <tr>
                <th>Fuel Type</th>
                <th>Examples</th>
                <th>Pros</th>
                <th>Cons</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><strong>Energy Gels</strong></td>
                <td>GU, Maurten, Science in Sport</td>
                <td>Convenient, precise carb amount, easy to carry</td>
                <td>Can cause GI issues, need water with most brands</td>
              </tr>
              <tr>
                <td><strong>Chews/Blocks</strong></td>
                <td>Clif Bloks, Honey Stinger Chews</td>
                <td>Less messy than gels, can portion control</td>
                <td>Harder to chew while running, need water</td>
              </tr>
              <tr>
                <td><strong>Sports Drinks</strong></td>
                <td>Gatorade, Tailwind, Skratch</td>
                <td>Provides hydration and electrolytes with carbs</td>
                <td>Heavier to carry, less carb-dense</td>
              </tr>
              <tr>
                <td><strong>Real Food</strong></td>
                <td>Dates, bananas, energy bars</td>
                <td>Natural, often gentler on stomach</td>
                <td>Bulkier to carry, harder to eat while running</td>
              </tr>
            </tbody>
          </table>

          <h4>Fueling Strategy Tips</h4>
          <ul>
            <li>Start fueling early (30-45 minutes into your run) rather than waiting until you feel depleted</li>
            <li>Take smaller amounts more frequently rather than large amounts infrequently</li>
            <li>Practice your fueling strategy during training runs before using it in races</li>
            <li>Consider using a mix of fast-acting and slower-release carbohydrates for longer efforts</li>
          </ul>

          <h3>Post-Run Recovery Nutrition</h3>
          <p>What you eat after running significantly impacts your recovery and adaptation:</p>

          <h4>The Recovery Window</h4>
          <p>While the traditional advice focuses on the 30-60 minute "anabolic window" after exercise, research shows benefits from post-workout nutrition can extend up to 2 hours. However, earlier is generally better, especially after intense or long workouts.</p>

          <h4>Recovery Nutrition Guidelines</h4>
          <ul>
            <li><strong>Carbohydrates:</strong> 0.5-0.7g per kg of body weight (to replenish glycogen)</li>
            <li><strong>Protein:</strong> 0.2-0.3g per kg of body weight (for muscle repair)</li>
            <li><strong>Fluid:</strong> 16-24oz for every pound lost during exercise</li>
          </ul>

          <h4>Recovery Meal/Snack Examples</h4>
          <ul>
            <li>Chocolate milk (natural 3:1 carb to protein ratio)</li>
            <li>Greek yogurt with fruit and granola</li>
            <li>Smoothie with protein powder, banana, and berries</li>
            <li>Turkey sandwich with fruit</li>
            <li>Oatmeal with protein powder and fruit</li>
          </ul>

          <h3>Hydration Strategies</h3>
          <p>Proper hydration is crucial for performance and safety:</p>

          <h4>Daily Hydration</h4>
          <p>Stay well-hydrated throughout the day. While individual needs vary, aim for urine that is pale yellow in color. A general guideline is to drink half your body weight (in pounds) in ounces of water daily, plus additional fluid to replace exercise losses.</p>

          <h4>Pre-Run Hydration</h4>
          <ul>
            <li>Drink 16-20oz of fluid 2-3 hours before running</li>
            <li>Drink an additional 8-10oz 15-30 minutes before starting</li>
            <li>For early morning runs, drink at least 8oz upon waking</li>
          </ul>

          <h4>During-Run Hydration</h4>
          <ul>
            <li><strong>Runs under 60 minutes:</strong> Water is typically sufficient unless in extreme heat</li>
            <li><strong>Runs 60+ minutes:</strong> Consider electrolyte-containing sports drinks, especially in hot weather</li>
            <li><strong>Drinking to thirst</strong> is generally effective, but aim for approximately 16-24oz per hour as a guideline</li>
            <li>Practice drinking while running at your goal race pace</li>
          </ul>

          <h4>Post-Run Rehydration</h4>
          <ul>
            <li>Aim to replace 150% of fluid lost (to account for continued sweating and urination)</li>
            <li>Include sodium in your post-run fluids or food to help retain the fluid</li>
            <li>Weigh yourself before and after long runs to gauge fluid loss (1 pound = 16oz of fluid)</li>
          </ul>

          <p>Remember that nutrition and hydration are highly individual. Use these guidelines as a starting point, but pay attention to how your body responds and adjust accordingly. What works for one runner may not work for another, especially regarding during-run fueling and hydration.</p>
        </GuideSection>

        {/* --- Section 7 --- */}
        <GuideSection id="gear-upgrades" title="Gear That Grows With You: Upgrades & Considerations">
          <h3>Shoe Rotation: Beyond Your Single Pair</h3>
          <p>As an intermediate runner, using different shoes for different types of runs can provide several benefits:</p>

          <h4>Benefits of a Shoe Rotation</h4>
          <ul>
            <li><strong>Reduced Injury Risk:</strong> Different shoes stress your feet and legs in slightly different ways, preventing overuse of specific muscles and tissues.</li>
            <li><strong>Extended Shoe Life:</strong> Foam midsoles recover better when given time between runs, potentially extending the lifespan of each pair.</li>
            <li><strong>Workout Specificity:</strong> Different shoes can enhance different types of runs (e.g., lighter shoes for speedwork, more cushioned shoes for recovery runs).</li>
          </ul>

          <h4>Basic Shoe Rotation for Intermediate Runners</h4>
          <table className="physio-table">
            <thead>
              <tr>
                <th>Shoe Type</th>
                <th>Characteristics</th>
                <th>Best For</th>
                <th>Examples</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><strong>Daily Trainer</strong></td>
                <td>Balanced cushioning and durability</td>
                <td>Easy runs, long runs, most training</td>
                <td>Brooks Ghost, Nike Pegasus, Saucony Ride</td>
              </tr>
              <tr>
                <td><strong>Lightweight Trainer</strong></td>
                <td>Lighter, more responsive, less cushioning</td>
                <td>Tempo runs, threshold workouts, shorter races</td>
                <td>Saucony Kinvara, Nike Tempo, Brooks Hyperion Tempo</td>
              </tr>
              <tr>
                <td><strong>Recovery Shoe</strong></td>
                <td>Maximum cushioning, often heavier</td>
                <td>Recovery days, easy runs after hard workouts</td>
                <td>Hoka Bondi, New Balance More, Brooks Glycerin</td>
              </tr>
              <tr>
                <td><strong>Trail Shoe</strong> (if applicable)</td>
                <td>Aggressive outsole tread, protective features</td>
                <td>Off-road running, technical terrain</td>
                <td>Salomon Speedcross, Brooks Cascadia, Hoka Speedgoat</td>
              </tr>
            </tbody>
          </table>

          <p>Start with two complementary pairs if budget is a concern. For example, a daily trainer plus either a lightweight trainer for workouts or a recovery shoe, depending on your training focus.</p>

          <h3>Technical Apparel for All Conditions</h3>
          <p>As you run more consistently throughout the year, appropriate clothing for various weather conditions becomes important:</p>

          <h4>Layering for Cold Weather</h4>
          <ul>
            <li><strong>Base Layer:</strong> Moisture-wicking, close-fitting synthetic or wool blend to move sweat away from skin. Avoid cotton.</li>
            <li><strong>Mid Layer:</strong> Insulating layer that traps warmth. Lightweight fleece or thermal materials work well.</li>
            <li><strong>Outer Layer:</strong> Wind and/or waterproof shell that's breathable to allow moisture escape.</li>
            <li><strong>Accessories:</strong> Gloves/mittens, headband/hat, neck gaiter for extreme cold.</li>
          </ul>
          <p><strong>Tip:</strong> Dress as if it's 10-15°F warmer than the actual temperature, as your body will warm up quickly once running.</p>

          <h4>Rain Gear Considerations</h4>
          <ul>
            <li><strong>Waterproof vs. Water-Resistant:</strong> Waterproof gear keeps rain out but can trap sweat. Water-resistant gear breathes better but won't keep you dry in heavy rain.</li>
            <li><strong>Breathability:</strong> Look for jackets with vents or highly breathable materials to prevent overheating.</li>
            <li><strong>Visibility:</strong> Choose bright colors or reflective details for safety in rainy conditions.</li>
            <li><strong>Hat with Brim:</strong> Keeps rain off your face and improves visibility.</li>
          </ul>

          <h4>Sun Protection</h4>
          <ul>
            <li><strong>UPF-Rated Clothing:</strong> Provides better sun protection than regular fabrics.</li>
            <li><strong>Running Hats:</strong> Lightweight, breathable hats with brims protect your face and help regulate temperature.</li>
            <li><strong>Sunglasses:</strong> Look for lightweight, non-slip frames with UV protection.</li>
            <li><strong>Sunscreen:</strong> Apply water/sweat-resistant sunscreen to exposed skin, even on cloudy days.</li>
          </ul>

          <h4>Technical Socks</h4>
          <p>Don't underestimate the importance of good running socks. Features to look for:</p>
          <ul>
            <li>Moisture-wicking materials (synthetic blends or wool)</li>
            <li>Seamless toe construction to prevent blisters</li>
            <li>Anatomical fit (left/right specific)</li>
            <li>Targeted cushioning in high-impact areas</li>
            <li>Compression in the arch for support</li>
          </ul>
          <p>Consider having different sock weights for different seasons (thinner for summer, thicker for winter).</p>

          <h3>Running Watches & GPS Data</h3>
          <p>As an intermediate runner, more detailed data can help you track progress and optimize training:</p>

          <h4>Useful Metrics Beyond Basics</h4>
          <ul>
            <li><strong>Heart Rate:</strong> Helps ensure you're training in the right zones for different workouts.</li>
            <li><strong>Cadence:</strong> Steps per minute – useful for working on running efficiency.</li>
            <li><strong>Elevation Gain:</strong> Important for understanding the true difficulty of hilly routes.</li>
            <li><strong>Lap Splits:</strong> Allows detailed analysis of pacing during intervals or races.</li>
            <li><strong>Training Load/Recovery Metrics:</strong> Some watches estimate recovery needs based on workout intensity.</li>
          </ul>

          <h4>Using Data Effectively</h4>
          <p>More data is only valuable if you use it constructively:</p>
          <ul>
            <li>Use heart rate to ensure easy runs are truly easy (common mistake: running too hard on recovery days)</li>
            <li>Track cadence to work gradually toward the 170-180 steps per minute range for improved efficiency</li>
            <li>Analyze splits from workouts to identify pacing issues (e.g., starting too fast)</li>
            <li>Look for trends rather than obsessing over daily fluctuations</li>
          </ul>
          <p>Remember that data should support your training, not dictate it. Listen to your body first, then use data as a secondary input.</p>

          <h3>Other Useful Accessories</h3>
          <ul>
            <li><strong>Hydration Solutions:</strong> Handheld bottles, waist belts, or vests for carrying fluids on longer runs.</li>
            <li><strong>Anti-Chafing Products:</strong> Body Glide, Squirrel's Nut Butter, or similar products to prevent skin irritation on longer runs.</li>
            <li><strong>Foam Roller/Massage Tools:</strong> For self-myofascial release to aid recovery.</li>
            <li><strong>Headlamp/Reflective Gear:</strong> For safety during early morning or evening runs.</li>
            <li><strong>Running Belt/Pouch:</strong> For carrying essentials like phone, keys, and nutrition.</li>
          </ul>

          <p>Invest gradually in gear upgrades as your needs evolve. Quality technical gear can enhance your running experience, but remember that the most important equipment is still your body and mind – no gear can replace consistent training and recovery.</p>
        </GuideSection>

        {/* --- Section 8 --- */}
        <GuideSection id="injury-prevention" title="Staying Strong & Injury-Free: Proactive Strategies">
          <div className="disclaimer-box">
            <p><strong>Medical Disclaimer:</strong> The information in this section is for educational purposes only and is not intended as medical advice. Always consult a healthcare professional for diagnosis and treatment of injuries or persistent pain.</p>
          </div>

          <h3>Common Intermediate Runner Injuries</h3>
          <p>As training volume and intensity increase, so does injury risk. Understanding common injuries can help you prevent them:</p>

          <h4>IT Band Syndrome</h4>
          <p><strong>What it is:</strong> Pain on the outside of the knee caused by inflammation of the iliotibial band, a thick band of tissue that runs from the hip to the knee.</p>
          <p><strong>Common causes:</strong> Weak hip muscles, running on cambered roads, overtraining, improper footwear.</p>
          <p><strong>Prevention strategies:</strong> Strengthen hip abductors (side-lying leg raises, clamshells), avoid excessive downhill running, ensure proper shoe fit.</p>

          <h4>Runner's Knee (Patellofemoral Pain Syndrome)</h4>
          <p><strong>What it is:</strong> Pain around or behind the kneecap, often worse when running downhill or using stairs.</p>
          <p><strong>Common causes:</strong> Muscle imbalances, overtraining, biomechanical issues, weak quadriceps or glutes.</p>
          <p><strong>Prevention strategies:</strong> Strengthen quadriceps and glutes, ensure proper running form, gradually increase training load.</p>

          <h4>Plantar Fasciitis</h4>
          <p><strong>What it is:</strong> Inflammation of the plantar fascia, causing heel pain typically worst in the morning or after periods of rest.</p>
          <p><strong>Common causes:</strong> Tight calf muscles, high arches, improper footwear, sudden increase in training.</p>
          <p><strong>Prevention strategies:</strong> Regular calf stretching and foot strengthening, supportive footwear, gradual training progression.</p>

          <h4>Achilles Tendinopathy</h4>
          <p><strong>What it is:</strong> Degeneration or inflammation of the Achilles tendon, causing pain and stiffness at the back of the ankle.</p>
          <p><strong>Common causes:</strong> Sudden increase in hill work or speedwork, tight calf muscles, improper footwear.</p>
          <p><strong>Prevention strategies:</strong> Eccentric calf strengthening, proper warm-up, avoiding sudden increases in training intensity.</p>

          <h4>Shin Splints (Medial Tibial Stress Syndrome)</h4>
          <p><strong>What it is:</strong> Pain along the inner edge of the shinbone (tibia), often during and after running.</p>
          <p><strong>Common causes:</strong> Overtraining, running on hard surfaces, improper footwear, biomechanical issues.</p>
          <p><strong>Prevention strategies:</strong> Gradual training progression, appropriate footwear, lower leg strengthening, softer running surfaces when possible.</p>

          <h3>The Critical Role of Strength Training</h3>
          <p>Strength training is no longer optional for intermediate runners. It provides numerous benefits:</p>
          <ul>
            <li>Reduces injury risk by addressing muscle imbalances</li>
            <li>Improves running economy and power</li>
            <li>Enhances late-race endurance when form typically deteriorates</li>
            <li>Maintains muscle mass that might otherwise be lost through high-volume endurance training</li>
          </ul>

          <h4>Strength Training Protocol</h4>
          <p><strong>Frequency:</strong> 2-3 sessions per week, ideally on easy running days or immediately after easy runs.</p>
          <p><strong>Duration:</strong> 30-45 minutes per session is sufficient.</p>
          <p><strong>Focus:</strong> Emphasize running-specific movements that target the posterior chain (hamstrings, glutes, lower back) and core.</p>

          <h4>Weekly Focus Example</h4>
          <ul>
            <li><strong>Day 1 (Lower Body Focus):</strong>
              <ul>
                <li>Squats: 3 sets of 8-12 reps</li>
                <li>Lunges: 3 sets of 10-12 reps per leg</li>
                <li>Romanian Deadlifts: 3 sets of 8-10 reps</li>
                <li>Calf Raises: 3 sets of 15-20 reps</li>
              </ul>
            </li>
            <li><strong>Day 2 (Core & Upper Body/Plyometrics):</strong>
              <ul>
                <li>Planks: 3 sets of 30-60 seconds</li>
                <li>Side Planks: 3 sets of 30 seconds per side</li>
                <li>Push-ups: 3 sets of 10-15 reps</li>
                <li>Rows: 3 sets of 10-12 reps</li>
                <li>Box Jumps or Depth Jumps: 3 sets of 5-8 reps (for more advanced runners)</li>
              </ul>
            </li>
          </ul>

          <h4>Exercise Progression</h4>
          <p>Your strength training should evolve alongside your running:</p>
          <ul>
            <li><strong>Foundation Phase (4-6 weeks):</strong> Focus on learning proper form with bodyweight or light weights and higher reps (12-15). Corresponds to base building in running.</li>
            <li><strong>Strength Building Phase (4-6 weeks):</strong> Gradually increase weight while decreasing reps (6-12). Corresponds to the intensity phase in running.</li>
            <li><strong>Power/Maintenance Phase:</strong> Incorporate more explosive movements or maintain strength with fewer sessions during race-specific training.</li>
          </ul>

          <h3>Effective Warm-ups & Cool-downs</h3>
          <p>As training intensity increases, proper warm-up and cool-down become increasingly important:</p>

          <h4>Dynamic Warm-up (5-10 minutes before every run)</h4>
          <ul>
            <li>Leg swings (forward/backward and side-to-side)</li>
            <li>Walking lunges with torso rotation</li>
            <li>Arm circles and shoulder rotations</li>
            <li>Butt kicks and high knees</li>
            <li>Gentle skipping</li>
            <li>5 minutes of very easy jogging</li>
          </ul>

          <h4>Cool-down & Static Stretching (5-10 minutes after running)</h4>
          <ul>
            <li>5 minutes of very easy jogging or walking</li>
            <li>Static stretching (hold each stretch for 20-30 seconds):</li>
            <li>Hamstrings, quadriceps, calves, hip flexors, glutes, lower back</li>
          </ul>

          <h4>Foam Rolling/Myofascial Release</h4>
          <p>Regular foam rolling can help reduce muscle soreness and improve flexibility:</p>
          <ul>
            <li>Spend 1-2 minutes on each major muscle group</li>
            <li>Focus on areas that feel particularly tight</li>
            <li>Roll slowly rather than quickly</li>
            <li>Key areas: quadriceps, hamstrings, calves, IT band, glutes, upper back</li>
          </ul>

          <h3>Recognizing & Managing Overtraining</h3>
          <p>Intermediate runners often push the boundaries of their training, which can lead to overtraining. Watch for these warning signs:</p>

          <h4>Signs of Overtraining</h4>
          <ul>
            <li>Persistent fatigue that doesn't improve with rest</li>
            <li>Declining performance despite increased effort</li>
            <li>Elevated resting heart rate (monitor first thing in the morning)</li>
            <li>Trouble sleeping despite feeling tired</li>
            <li>Irritability or decreased motivation</li>
            <li>Frequent illness or infections</li>
            <li>Nagging injuries or persistent muscle soreness</li>
          </ul>

          <h4>If You Suspect Overtraining</h4>
          <ul>
            <li>Take 1-2 complete rest days immediately</li>
            <li>Reduce training volume by 30-50% for at least a week</li>
            <li>Focus on sleep, nutrition, and hydration</li>
            <li>Consider cross-training instead of running for several days</li>
            <li>If symptoms persist for more than two weeks, consult a healthcare provider</li>
          </ul>

          <h3>Listen to Your Body: The Cardinal Rule</h3>
          <p>The most important injury prevention strategy is learning to listen to your body's signals:</p>
          <ul>
            <li>Distinguish between normal training discomfort and potential injury pain</li>
            <li>Don't ignore persistent pain that lasts more than a few days</li>
            <li>Be willing to adjust your training plan based on how you feel</li>
            <li>Remember that taking an extra rest day when needed is always smarter than pushing through and risking weeks of recovery from injury</li>
          </ul>

          <p>Consistency over time is the key to improvement in running. Staying healthy allows you to maintain that consistency, making injury prevention one of the most important aspects of training for intermediate runners.</p>
        </GuideSection>

        {/* --- Section 9 --- */}
        <GuideSection id="mental-edge" title="The Mental Edge: Motivation, Goals & Race Smarts">
          <h3>Setting Effective Running Goals</h3>
          <p>As an intermediate runner, your goals should become more specific and structured. The SMART framework provides an excellent approach:</p>

          <ul>
            <li><strong>Specific:</strong> Define exactly what you want to achieve (e.g., "run a sub-50 minute 10K" rather than "get faster").</li>
            <li><strong>Measurable:</strong> Include concrete metrics to track progress (time, distance, frequency).</li>
            <li><strong>Achievable:</strong> Challenge yourself, but be realistic based on your current fitness and available training time.</li>
            <li><strong>Relevant:</strong> Ensure goals align with your broader running aspirations and lifestyle.</li>
            <li><strong>Time-bound:</strong> Set a specific timeframe for achievement to create urgency and focus.</li>
          </ul>

          <h4>Process vs. Outcome Goals</h4>
          <p>Effective goal-setting includes both types:</p>
          <ul>
            <li><strong>Outcome goals</strong> focus on results (e.g., "finish a half marathon in under 2 hours"). These provide direction but are sometimes affected by factors outside your control.</li>
            <li><strong>Process goals</strong> focus on actions within your control (e.g., "complete all scheduled workouts for 8 weeks" or "perform strength training twice weekly"). These build the foundation for achieving outcome goals.</li>
          </ul>
          <p>Emphasize process goals in your daily training while keeping outcome goals as longer-term targets.</p>

          <h3>Maintaining Motivation & Overcoming Plateaus</h3>
          <p>Even dedicated runners experience motivation dips and performance plateaus. Here are strategies to overcome these challenges:</p>

          <h4>Variety is Key</h4>
          <ul>
            <li>Explore new routes and terrain</li>
            <li>Rotate between different workout types</li>
            <li>Try trail running if you normally run on roads (or vice versa)</li>
            <li>Incorporate occasional "adventure runs" to explore new areas</li>
          </ul>

          <h4>Social Connection</h4>
          <ul>
            <li>Join a local running group or club</li>
            <li>Find a training partner with similar goals</li>
            <li>Participate in online running communities</li>
            <li>Share your journey on social media or with friends</li>
          </ul>

          <h4>Breaking Through Plateaus</h4>
          <ul>
            <li><strong>Analyze your training:</strong> Look for patterns or areas that might need adjustment.</li>
            <li><strong>Change the stimulus:</strong> If you've been doing the same workouts for months, try new training approaches.</li>
            <li><strong>Consider a coach:</strong> Even temporary guidance from a professional can provide new perspectives.</li>
            <li><strong>Take a strategic break:</strong> Sometimes a planned 1-2 week reduction in training volume allows for physical and mental refreshment.</li>
            <li><strong>Focus on a different goal:</strong> If you've been chasing speed, try a distance goal, or vice versa.</li>
          </ul>

          <h4>Reconnect with Your "Why"</h4>
          <p>Periodically revisit your deeper reasons for running. Whether it's health, mental wellbeing, personal challenge, or community, reconnecting with these core motivations can reignite your passion during difficult periods.</p>

          <h3>Race Day Strategies</h3>
          <p>As an intermediate runner, strategic racing becomes increasingly important for achieving your potential.</p>

          <h4>Pre-Race Preparation</h4>
          <ul>
            <li><strong>Tapering:</strong> Reduce training volume by 30-50% in the 1-2 weeks before your race while maintaining some intensity. This allows your body to fully recover while staying sharp.</li>
            <li><strong>Race Week Nutrition:</strong> Focus on adequate carbohydrates, especially in the 2-3 days before the race. Stay well-hydrated but don't overdo it.</li>
            <li><strong>Logistics Planning:</strong> Familiarize yourself with the race course, parking, packet pickup, and start time. Prepare all gear the night before.</li>
            <li><strong>Mental Rehearsal:</strong> Visualize yourself successfully executing your race plan, including how you'll handle challenging sections.</li>
          </ul>

          <h4>Race Morning</h4>
          <ul>
            <li><strong>Breakfast:</strong> Eat a familiar, easily digestible meal 2-3 hours before the start. Avoid new foods on race day.</li>
            <li><strong>Timing:</strong> Arrive early enough to use restrooms, warm up properly, and get to the start line without rushing.</li>
            <li><strong>Warm-up:</strong> For races 10K or shorter, include 10-15 minutes of easy jogging plus dynamic stretches and a few short accelerations. For longer races, a shorter warm-up is sufficient.</li>
          </ul>

          <h4>Pacing Strategies</h4>
          <ul>
            <li><strong>Even Pacing:</strong> For most distances, maintaining consistent effort throughout the race is physiologically optimal. Resist the urge to start too fast due to adrenaline and crowd energy.</li>
            <li><strong>Negative Splits:</strong> Running the second half slightly faster than the first often leads to the best performance and most enjoyable experience.</li>
            <li><strong>Course-Specific Adjustments:</strong> Adjust effort (not necessarily pace) on hills – slightly harder uphill, slightly easier downhill – while maintaining consistent overall effort.</li>
          </ul>

          <h4>Mental Techniques for Tough Spots</h4>
          <p>Every race has challenging moments. Prepare these mental strategies in advance:</p>
          <ul>
            <li><strong>Segmenting:</strong> Break the race into smaller, manageable chunks rather than focusing on the total distance.</li>
            <li><strong>Mantras:</strong> Develop short, powerful phrases to repeat when things get tough ("Strong and smooth" or "I can do hard things").</li>
            <li><strong>Focus Shifting:</strong> When discomfort increases, shift attention to form, breathing, or even counting steps.</li>
            <li><strong>Embracing Discomfort:</strong> Acknowledge that discomfort is part of racing and doesn't mean something is wrong. Accept it as temporary and part of the challenge.</li>
          </ul>

          <h4>Aid Station Strategy</h4>
          <ul>
            <li>Plan in advance which aid stations you'll use</li>
            <li>For shorter races (5K/10K), you may not need aid stations at all</li>
            <li>For longer races, practice taking fluids while maintaining pace</li>
            <li>Consider carrying your own nutrition if the race-provided options don't work for you</li>
          </ul>

          <h4>Post-Race</h4>
          <ul>
            <li><strong>Cool-down:</strong> 5-10 minutes of very easy jogging or walking helps start the recovery process.</li>
            <li><strong>Refueling:</strong> Consume carbohydrates and protein within 30-60 minutes after finishing.</li>
            <li><strong>Celebration:</strong> Acknowledge your achievement regardless of the outcome!</li>
            <li><strong>Reflection:</strong> Within a few days, reflect on what went well and what you might adjust for future races.</li>
          </ul>

          <p>Remember that racing is a skill that improves with practice. Each race provides valuable experience that will help you refine your approach for future events.</p>
        </GuideSection>

        {/* --- Section 10 --- */}
        <GuideSection id="faq" title="Intermediate Runner FAQ">
          <FAQItem question="How do I find my actual Heart Rate Max (HRmax)?">
            <p>Age-based formulas (like 220 minus your age) are just rough estimates and can be off by 10-20 beats per minute. More accurate methods include:</p>
            <ul>
              <li><strong>Field Test:</strong> After a thorough warm-up, run uphill as hard as possible for 2-3 minutes, then immediately sprint for 30 seconds. The highest heart rate you see is likely close to your max.</li>
              <li><strong>Lab Test:</strong> The most accurate method is a VO2 max test with ECG monitoring in a sports performance lab.</li>
              <li><strong>Race Effort:</strong> Your heart rate at the end of an all-out 5K race is typically within a few beats of your maximum.</li>
            </ul>
            <p>Whichever method you use, it's best to perform it when you're well-rested and in good health.</p>
          </FAQItem>

          <FAQItem question="Should I train with heart rate zones or pace zones?">
            <p>Both methods have advantages:</p>
            <ul>
              <li><strong>Heart Rate Zones:</strong> Account for environmental factors (heat, humidity, altitude) and your current fatigue level. More accurate for ensuring easy runs are truly easy. Drawbacks include device lag and potential inaccuracy of wrist-based monitors.</li>
              <li><strong>Pace Zones:</strong> More precise for specific workouts and race preparation. Easier to execute without technology. Drawbacks include not accounting for hills, weather conditions, or fatigue.</li>
            </ul>
            <p>Many experienced runners use a hybrid approach: heart rate for easy/recovery runs to ensure proper intensity, and pace for specific workouts and race-pace training.</p>
          </FAQItem>

          <FAQItem question="What's the best way to incorporate cross-training, and what types are good for runners?">
            <p>Cross-training can enhance recovery, build complementary fitness, and reduce injury risk. The best types for runners include:</p>
            <ul>
              <li><strong>Cycling:</strong> Great for aerobic development with minimal impact. Strengthens quadriceps which can help balance running's hamstring emphasis.</li>
              <li><strong>Swimming:</strong> Zero-impact full-body workout that's excellent for active recovery.</li>
              <li><strong>Elliptical:</strong> Mimics running motion without impact, making it ideal when managing minor injuries.</li>
              <li><strong>Strength Training:</strong> Not traditional "cardio" cross-training, but essential for injury prevention and performance.</li>
              <li><strong>Yoga:</strong> Improves flexibility, core strength, and body awareness.</li>
            </ul>
            <p>For incorporation: Use cross-training for active recovery between hard running days, as a supplement to running when building volume, or as a replacement when managing minor injuries.</p>
          </FAQItem>

          <FAQItem question="How many rest days do I really need per week?">
            <p>This varies by individual, but most intermediate runners benefit from 1-2 rest or active recovery days per week. Factors affecting your optimal rest frequency include:</p>
            <ul>
              <li>Age (older runners typically benefit from more recovery)</li>
              <li>Training history and current fitness level</li>
              <li>Overall stress levels and sleep quality</li>
              <li>Training intensity (higher intensity requires more recovery)</li>
            </ul>
            <p>Signs you might need more rest include persistent fatigue, declining performance, elevated resting heart rate, or nagging aches and pains. Remember that taking appropriate rest is what allows your body to adapt and get stronger from training.</p>
          </FAQItem>

          <FAQItem question="I have a nagging pain, when should I see a doctor/physio vs. just resting it?">
            <p>While minor discomfort is common in training, certain signs indicate you should seek professional help:</p>
            <ul>
              <li>Pain that persists for more than 7-10 days despite rest</li>
              <li>Pain that gets worse during a run or causes you to alter your running form</li>
              <li>Sharp, acute pain (rather than a dull ache)</li>
              <li>Pain accompanied by swelling, redness, or warmth</li>
              <li>Pain that affects your daily activities, not just running</li>
              <li>Any significant loss of range of motion or strength</li>
            </ul>
            <p>For minor discomforts, try 2-3 days of reduced volume or rest, ice, and gentle mobility work. If it improves, gradually return to training. If not, or if any of the above signs are present, consult a sports medicine doctor or physical therapist.</p>
          </FAQItem>

          <FAQItem question="Is it bad to run on consecutive days?">
            <p>For most intermediate runners, running on consecutive days is perfectly fine and often beneficial. However, consider these guidelines:</p>
            <ul>
              <li>Hard workout days should typically be followed by easy days or rest</li>
              <li>Pay attention to how your body responds – some runners recover quickly, others need more time</li>
              <li>If you're prone to injuries, consider alternating running days with cross-training</li>
              <li>As weekly mileage increases, running consecutive days becomes necessary for most training plans</li>
            </ul>
            <p>The key is ensuring that your overall training stress is appropriate for your fitness level and that you're allowing adequate recovery between hard efforts.</p>
          </FAQItem>

          <FAQItem question="How do I balance speed work and long runs if I have limited training days?">
            <p>With limited training days, prioritize quality and strategic scheduling:</p>
            <ul>
              <li><strong>Prioritize based on goals:</strong> Training for a marathon? Long runs take precedence. Focusing on 5K/10K? Speed work might be more important.</li>
              <li><strong>Combine elements:</strong> Consider "combo" workouts like a moderate-length run with tempo segments or a progression long run that finishes at threshold pace.</li>
              <li><strong>Alternate weeks:</strong> Focus on speed one week, endurance the next.</li>
              <li><strong>Strategic spacing:</strong> If running 3 days/week, try: Tuesday (speed), Thursday (easy), Saturday (long run).</li>
              <li><strong>Use cross-training:</strong> Supplement limited running days with cross-training to maintain overall fitness.</li>
            </ul>
            <p>Remember that consistency over time matters more than fitting every workout type into every week.</p>
          </FAQItem>

          <FAQItem question="Are carbon-plated shoes worth it for intermediate runners?">
            <p>Carbon-plated "super shoes" offer performance benefits but come with considerations:</p>
            <ul>
              <li><strong>Benefits:</strong> Research shows 3-5% improvement in running economy, which can translate to significant time improvements in races.</li>
              <li><strong>Cost consideration:</strong> At $180-250+ per pair with shorter lifespans than traditional shoes, they represent a significant investment.</li>
              <li><strong>Best uses:</strong> Most beneficial for races and specific workouts rather than daily training.</li>
              <li><strong>Potential drawbacks:</strong> May place different stresses on muscles and tendons, potentially increasing injury risk if used too frequently before adaptation.</li>
            </ul>
            <p>For intermediate runners, carbon-plated shoes can be worth it for goal races and occasional workouts, but aren't necessary for training success. If budget allows, consider them as a specialized tool in your overall shoe rotation rather than an everyday trainer.</p>
          </FAQItem>

          <FAQItem question="Do I need advanced tech like WHOOP/Stryd/Oura?">
            <p>Advanced training technology can provide valuable insights but isn't essential:</p>
            <ul>
              <li><strong>Recovery trackers</strong> (WHOOP, Oura): Provide data on sleep quality, recovery status, and strain. Useful if you struggle with balancing training and recovery or tend to overtrain.</li>
              <li><strong>Running power meters</strong> (Stryd, Garmin Running Power): Offer consistent intensity metrics regardless of terrain or conditions. Beneficial for runners who train on varied terrain or in changing weather conditions.</li>
              <li><strong>Advanced running watches:</strong> Features like running dynamics (vertical oscillation, ground contact time) can help identify form inefficiencies.</li>
            </ul>
            <p>These tools are most valuable if you enjoy data analysis and will actually use the information to adjust your training. Many elite runners succeeded for decades without this technology. Focus first on consistency, proper training structure, and recovery – then consider if advanced tech would address specific needs in your training.</p>
          </FAQItem>

          <FAQItem question="What if I don't have access to a gym for strength training?">
            <p>No gym? No problem! Effective strength training for runners can be done at home with minimal equipment:</p>
            <ul>
              <li><strong>Bodyweight exercises:</strong> Squats, lunges, step-ups, push-ups, planks, and glute bridges provide excellent strength benefits.</li>
              <li><strong>Resistance bands:</strong> Inexpensive and versatile for targeting running-specific muscles, especially hip stabilizers.</li>
              <li><strong>Household items:</strong> Filled water bottles or backpacks can add resistance to basic movements.</li>
              <li><strong>Single-leg focus:</strong> Single-leg squats, lunges, and deadlifts are particularly valuable for runners and require no equipment.</li>
            </ul>
            <p>A simple home routine of 6-8 exercises focusing on legs, core, and basic upper body movements, performed 2-3 times weekly, provides most of the strength benefits runners need. Consistency matters more than fancy equipment.</p>
          </FAQItem>
        </GuideSection>

        {/* --- Section 11 --- */}
        <GuideSection id="whats-next" title="What's Next? Exploring Advanced Horizons">
          <p>As you continue to develop as a runner, numerous paths for further growth and exploration await. Here are some directions to consider as you progress beyond the intermediate level:</p>

          <h3>Continuous Learning</h3>
          <p>Deepen your understanding of training principles and running science:</p>
          <ul>
            <li><strong>Books:</strong> Classic texts like "Daniels' Running Formula" by Jack Daniels, "Advanced Marathoning" by Pete Pfitzinger, or "Faster Road Racing" by Pete Pfitzinger and Philip Latter offer detailed training approaches.</li>
            <li><strong>Podcasts:</strong> Shows like "The Strength Running Podcast," "The Science of Sport," or "Running Explained" provide ongoing education from experts.</li>
            <li><strong>Online Resources:</strong> Websites like Runners World, iRunFar, and Strength Running offer in-depth articles on advanced topics.</li>
          </ul>

          <h3>Advanced Training Approaches</h3>
          <p>As you progress, you might explore more sophisticated training methodologies:</p>
          <ul>
            <li><strong>Block Periodization:</strong> Concentrating specific training stimuli into focused blocks rather than trying to develop multiple fitness components simultaneously.</li>
            <li><strong>Altitude Training:</strong> Either through visits to higher elevations or simulated altitude training.</li>
            <li><strong>Training by Feel:</strong> Developing the ability to gauge effort precisely without relying on watches or heart rate monitors.</li>
            <li><strong>Advanced Recovery Techniques:</strong> Exploring methods like contrast therapy, compression, or targeted mobility work.</li>
          </ul>

          <h3>Specialized Coaching</h3>
          <p>Working with a knowledgeable coach can accelerate your development:</p>
          <ul>
            <li>Personalized training plans tailored to your specific strengths, weaknesses, and goals</li>
            <li>Objective feedback on training and racing</li>
            <li>Accountability and motivation</li>
            <li>Access to advanced training concepts and techniques</li>
          </ul>
          <p>Options range from in-person coaching to online coaching services with various levels of interaction and customization.</p>

          <h3>Exploring Different Types of Running</h3>
          <p>Broadening your running horizons can bring new challenges and enjoyment:</p>
          <ul>
            <li><strong>Trail Running:</strong> Offers varied terrain, beautiful scenery, and different physical demands than road running.</li>
            <li><strong>Ultra Running:</strong> Races beyond the marathon distance (50K, 50 miles, 100K, 100 miles) present unique physical and mental challenges.</li>
            <li><strong>Track Racing:</strong> Returning to the track for shorter, faster events can improve speed and form.</li>
            <li><strong>Destination Races:</strong> Combining travel with running by participating in events in different locations.</li>
          </ul>

          <h3>Community Involvement</h3>
          <p>Deepening your connection to the running community:</p>
          <ul>
            <li>Mentoring newer runners</li>
            <li>Volunteering at races</li>
            <li>Joining or starting a running club</li>
            <li>Participating in community running events</li>
          </ul>

          <h3>Final Thoughts</h3>
          <p>Remember that running is a lifelong journey with no fixed destination. The intermediate stage is often where many runners find their stride and develop a sustainable, enjoyable relationship with the sport that can last decades.</p>

          <p>As you continue to progress, maintain the balance between structured training and the simple joy of running. Set challenging goals, but never lose sight of why you started running in the first place.</p>

          <p>Wherever your running journey takes you next, we at Alt.Run wish you strong legs, healthy lungs, and the continued discovery of what you're capable of achieving. Happy running!</p>
        </GuideSection>
      </div>

      <div className="guide-footer">
        <img src="/logo-glow.webp" alt="Alt.Run Logo" className="guide-footer-logo" />
      </div>
    </div>
  );
}

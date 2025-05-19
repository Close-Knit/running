// src/pages/RunningInjuriesGuidePage.jsx
import React, { useEffect, useRef } from 'react';
import GuideHeader from '../components/GuideHeader';
import TableOfContents from '../components/TableOfContents';
import GuideSection from '../components/GuideSection';
import FAQItem from '../components/FAQItem';
import SEO from '../components/SEO';
import './RunningInjuriesGuidePage.css';

export default function RunningInjuriesGuidePage() {
  const guideContentRef = useRef();

  // Set background image for the guide page
  useEffect(() => {
    const pageBackground = document.querySelector('.page-background');
    if (pageBackground) {
      pageBackground.style.backgroundImage = 'url(/images/injury.jpg)';

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
    { id: "shin-splints", title: "Shin Splints: The Beginner's Nemesis" },
    { id: "runners-knee", title: "Runner's Knee: The Persistent Troublemaker" },
    { id: "it-band-syndrome", title: "IT Band Syndrome: The Side Knee Pain" },
    { id: "plantar-fasciitis", title: "Plantar Fasciitis: The Morning Heel Pain" },
    { id: "achilles-tendinitis", title: "Achilles Tendinitis: The Vulnerable Heel Cord" },
    { id: "blisters", title: "Blisters: The Painful Friction Points" },
    { id: "side-stitches", title: "Side Stitches: The Breath-Stealing Cramp" },
    { id: "athletes-foot", title: "Athlete's Foot: The Fungal Nuisance" },
    { id: "stress-fractures", title: "Stress Fractures: The Invisible Danger" },
    { id: "muscle-imbalances", title: "Muscle Imbalances and Weaknesses: The Hidden Culprits" },
    { id: "conclusion", title: "Conclusion: Listening to Your Body and Building Resilience" }
  ];

  // Define SEO data for the guide page
  const seoData = {
    title: "The Beginner's Guide to Common Running Injuries | Alt.Run",
    description: "Learn how to prevent and treat common running injuries with our comprehensive guide. From shin splints to IT band syndrome, we cover everything beginners need to know.",
    canonicalUrl: "/common-running-injuries-guide",
    ogType: "article",
    keywords: [
      "running injuries guide", "common running injuries", "shin splints",
      "runner's knee", "IT band syndrome", "plantar fasciitis",
      "running injury prevention", "running injury treatment", "beginner runner injuries",
      "stress fractures in runners", "running pain prevention"
    ],
    breadcrumbs: [
      { name: "Home", path: "/" },
      { name: "Common Running Injuries Guide", path: "/common-running-injuries-guide" }
    ]
  };

  return (
    <div className="guide-container" ref={guideContentRef}>
      {/* SEO Component */}
      <SEO {...seoData} />

      <GuideHeader
        title="The Beginner's Guide to Common Running Injuries"
        subtitle="Prevention and Treatment"
        intro="Running is an exhilarating exercise that offers numerous health benefits, but it also comes with potential physical challenges that can hinder your progress. Many novice runners encounter similar physical obstacles during their training journeys. Understanding these common running injuries and physical discomforts is crucial for maintaining consistent training and achieving your running goals. This comprehensive guide examines the most prevalent issues reported by runners, along with prevention strategies and treatment options to keep you on track."
      />

      <TableOfContents sections={sections} />

      <div className="guide-main-content">
        {/* Disclaimer */}
        <div className="disclaimer-box">
          <h3>Important Disclaimer:</h3>
          <p>The information in this guide is intended for educational purposes only and should not replace professional medical advice. Always consult with a healthcare professional before diagnosing or treating any injury, especially if you experience severe or persistent pain. This guide offers general information about common running injuries, but individual cases may vary and require personalized medical attention.</p>
        </div>

        {/* --- Section 1 --- */}
        <GuideSection id="shin-splints" title="Shin Splints: The Beginner's Nemesis">
          <p>Shin splints, medically known as medial tibial stress syndrome (MTSS), represent one of the most common complaints among new runners. This condition manifests as pain along the inner edge of the shinbone (tibia) and can significantly impair training progress.</p>

          <h3>What Causes Shin Splints</h3>
          <p>Shin splints typically develop when excessive stress is placed on the shinbone and the connective tissues that attach muscles to the bone. Common factors contributing to shin splints include ramping up training distance "too much, too soon" and using a running form that involves heel striking. When runners extend their legs too far forward during their stride, it creates a stiff landing that results in accumulated shock, eventually leading to shin pain. Many beginners make the mistake of increasing their mileage before their bodies have properly adapted to the impact of running.</p>

          <h3>Prevention and Treatment</h3>
          <p>Preventing shin splints involves several key strategies that experienced runners consistently recommend. First, increase your weekly mileage gradually, following the 10% rule which suggests not increasing your distance by more than 10% each week. Second, focus on your running form-try to land with your foot directly beneath your body rather than reaching forward with your heel. Strengthening exercises for the lower leg muscles can also build resilience against shin splints. Specific dynamic stretches often mentioned include duck walking on heels with toes in the air and walking on tiptoes before a run. When shin pain occurs, immediate treatment should include rest, ice, compression, and elevation (RICE), along with temporarily reducing training volume until symptoms subside.</p>

          <p>Many runners emphasize that consistent adherence to a proper training plan is key to avoiding the dreaded "shin splints." They often share that if their "shins ever hurt during a run," they immediately reassess their training volume and ensure they aren't overstriding. Some also find relief and aid recovery by wearing compression socks after running, not during, though this is seen as supplementary to core prevention strategies like strengthening and proper form.</p>
        </GuideSection>

        {/* --- Section 2 --- */}
        <GuideSection id="runners-knee" title="Runner's Knee: The Persistent Troublemaker">
          <p>Runner's knee, or patellofemoral pain syndrome, refers to pain around and under the kneecap. It's particularly prevalent among marathon training programs and represents one of the most frequently cited issues.</p>

          <h3>Understanding Runner's Knee Symptoms</h3>
          <p>The primary symptom of runner's knee is a dull, aching pain underneath the kneecap, which typically worsens when walking up or down stairs, squatting, kneeling, or sitting with bent knees for extended periods. Many runners report feeling a grinding or clicking sensation in the knee during movement. The pain often begins as a mild discomfort that gradually intensifies if training continues without addressing the underlying issues. The knee represents the most common injury site among runners.</p>

          <h3>Addressing the Problem</h3>
          <p>Runner's knee often results from poor alignment of the kneecap, overuse, weak thigh muscles, or flat feet. Strengthening the quadriceps, hip abductors, and core muscles is frequently suggested to improve patellar tracking. Many successful recovery stories mention the importance of proper footwear, with some runners finding relief after being professionally fitted for running shoes. Cross-training activities like swimming or cycling can maintain cardiovascular fitness while reducing stress on the knees. Physical therapy interventions that focus on correcting biomechanical issues are often cited as the most effective treatment approach for persistent cases.</p>

          <blockquote>"Isn't going to go away with shoe changes or stopping running or stretching" alone; instead, "you need to see a physical therapist and start strength training."</blockquote>

          <p>Many report that their "knee pain usually means that your hips are too weak" and that strengthening exercises like "clamshells," "bridges," and "crab walks" with a resistance band have been crucial for their recovery. Ignoring this advice and continuing to run through the pain can lead to more prolonged issues.</p>
        </GuideSection>

        {/* --- Section 3 --- */}
        <GuideSection id="it-band-syndrome" title="IT Band Syndrome: The Side Knee Pain">
          <p>IT band syndrome affects many runners, causing sharp pain on the outside of the knee that can halt training progress and make even walking uncomfortable.</p>

          <h3>The Mechanism Behind ITBS</h3>
          <p>The iliotibial band (IT band) is a long, fibrous band of tissue that extends from the outside of the hip to the outside of the knee. IT band syndrome occurs when this band becomes irritated from rubbing against either the hip or knee bones during repetitive movements like running. The condition is particularly common in runners who suddenly increase their training distance or who run frequently on banked surfaces like the sloped shoulders of roads. The primary symptom is pain on the outside of the knee that typically begins after a specific distance and may eventually force runners to stop their workout entirely.</p>

          <h3>Effective Management Strategies</h3>
          <p>Numerous management strategies for IT band syndrome are shared among runners. Foam rolling is frequently mentioned as a temporary relief method, though many physical therapists caution against excessive rolling directly on the irritated IT band itself. Instead, they recommend focusing on strengthening the hip abductors, particularly the gluteus medius muscle, which helps stabilize the pelvis during running. Adjusting running routes to avoid constantly running on the same side of a banked road and ensuring proper shoe wear are also common recommendations. Some runners report success with physical therapy, specifically with exercises designed to improve hip stability and running mechanics.</p>

          <p>Running resources often highlight that the "best treatment for IT band syndrome is to rest," which might mean "fewer miles or no running at all for at least a couple of days." While rest provides initial relief, long-term prevention hinges on addressing the root cause, often "weak hips" or poor biomechanics. Many share their experiences with "ITBS" and the effectiveness of "running specific strengthening" routines provided by physical therapists, emphasizing exercises that target glute and hip strength.</p>
        </GuideSection>

        {/* --- Section 4 --- */}
        <GuideSection id="plantar-fasciitis" title="Plantar Fasciitis: The Morning Heel Pain">
          <p>Plantar fasciitis represents one of the most frustrating conditions for runners, characterized by stabbing pain in the heel, particularly with the first steps in the morning.</p>

          <h3>Why Runners Develop Plantar Fasciitis</h3>
          <p>The plantar fascia is a thick band of tissue that runs across the bottom of the foot, connecting the heel bone to the toes. When this tissue becomes inflamed or develops small tears, plantar fasciitis occurs. Several risk factors include tight calf muscles, high arches or flat feet, sudden increases in training intensity, and running in shoes with inadequate support. Many runners report that the condition develops gradually, starting with mild discomfort that eventually progresses to debilitating pain if not properly addressed.</p>

          <h3>Relief and Recovery Approaches</h3>
          <p>Runners who have successfully overcome plantar fasciitis emphasize the importance of consistent stretching, particularly of the calf muscles and the plantar fascia itself. Rolling the foot over a frozen water bottle or golf ball is a commonly shared technique for relieving acute pain. Night splints, which keep the foot dorsiflexed during sleep to maintain a gentle stretch of the plantar fascia, receive mixed reviews but have helped many runners. Proper footwear with adequate arch support is consistently mentioned as essential for both prevention and recovery. For persistent cases, many report success with professional treatments like custom orthotics, physical therapy, or in some cases, extracorporeal shockwave therapy.</p>

          <p>Runners often describe developing "arch pain that becomes so painful as the day goes on," a classic sign of plantar fasciitis, especially when facing an "upcoming marathon." Common advice includes not just stretching but also being mindful of footwear choices, even when not running. Some find that "supportive shoes" throughout the day, not just for runs, are critical. The frustration is palpable when runners describe being in "really great shape" only to be sidelined by this persistent heel pain.</p>
        </GuideSection>

        {/* --- Section 5 --- */}
        <GuideSection id="achilles-tendinitis" title="Achilles Tendinitis: The Vulnerable Heel Cord">
          <p>Achilles tendinitis involves pain and inflammation in the tendon connecting the calf muscles to the heel bone, affecting many runners of all experience levels.</p>

          <h3>Risk Factors and Development</h3>
          <p>Achilles tendinitis commonly develops through a combination of overuse and insufficient recovery. The condition may begin as a mild discomfort at the back of the heel that gradually worsens, particularly when running uphill or performing speed workouts. Tight calf muscles, sudden increases in training volume or intensity, and poor footwear choices are frequently cited as contributing factors. The condition appears particularly common among marathon runners.</p>

          <h3>Healing the Achilles</h3>
          <p>Recovery from Achilles tendinitis requires patience and consistent attention to rehabilitation. Runners who have successfully overcome this injury emphasize the importance of eccentric calf exercises, which involve slowly lowering the heel below the level of a step after rising onto the toes. While complete rest was once the standard recommendation, many runners now report better success with active recovery approaches that maintain fitness while allowing the tendon to heal. Modified training that avoids hill running and high-intensity workouts, combined with proper stretching, gradually progressive strengthening exercises, and appropriate footwear, forms the foundation of most successful recovery strategies.</p>

          <p>Experts and experienced runners point out that Achilles tendinitis is a "common overuse injury seen in runners who increase their volume or load too quickly." The pain can present "near the heel or more mid tendon," and often the "soleus is a key player" in this injury, as it's crucial for the push-off phase in running. A frequent observation is that many runners "neglect strengthening the calf complex and loading their achilles tendon," making them more susceptible. Therefore, incorporating targeted calf raises and heel drops is a widely shared tip for both prevention and rehabilitation.</p>
        </GuideSection>

        {/* --- Section 6 --- */}
        <GuideSection id="blisters" title="Blisters: The Painful Friction Points">
          <p>Blisters represent one of the most common and immediate challenges for runners, particularly those increasing distance or participating in marathons.</p>

          <h3>How Blisters Form</h3>
          <p>Running blisters develop from the combination of heat, moisture, and friction between the skin and either socks or shoes. These painful, fluid-filled bubbles can significantly impact training and race performance. Blisters commonly develop between toes, on the back of the heel, under the ball of the foot, and on the sides of the feet. Factors that increase blister risk include ill-fitting shoes that are either too tight or too loose, excessive foot moisture from sweat or external conditions, and inadequate sock materials that retain moisture against the skin.</p>

          <h3>Prevention Methods for Blister-Free Running</h3>
          <p>Experienced runners recommend several effective prevention strategies. Proper shoe fitting is paramount, with the ideal shoe having approximately half an inch of space between the longest toe and the end of the shoe to accommodate foot swelling during long runs. Moisture-wicking socks made specifically for running receive strong endorsements, with many seasoned marathoners suggesting synthetic materials over cotton. Body glide, petroleum jelly, or specific anti-chafing products applied to blister-prone areas before runs can significantly reduce friction. For those already dealing with blisters, many runners recommend specialized blister bandages that protect the area while allowing continued training, though some cases may require brief rest periods to prevent infection, which could lead to more serious complications like cellulitis.</p>

          <p>Runners often seek tips on "how to prevent blisters on long runs." Many swear by specific brands of "moisture-wicking socks" or "double-layer socks" to minimize friction. Another common search is for the "best anti-chafing for feet," with products like Body Glide or even simple Vaseline being popular choices. Runners often share their personal "blister kits" for race day, including items like medical tape, antiseptic wipes, and specialized blister plasters, underscoring how common and disruptive this seemingly minor issue can be.</p>
        </GuideSection>

        {/* --- Section 7 --- */}
        <GuideSection id="side-stitches" title="Side Stitches: The Breath-Stealing Cramp">
          <p>Side stitches, or exercise-related transient abdominal pain, affect runners of all levels and can transform an enjoyable run into an uncomfortable struggle.</p>

          <h3>Understanding the Side Stitch While Running</h3>
          <p>The most widely accepted explanation for side stitches is diaphragm spasms that occur during running. The diaphragm, a sheet of muscle extending across the bottom of the rib cage, plays a crucial role in breathing and can fatigue or cramp during exertion, similar to other muscles. Side stitches tend to affect beginner runners more frequently, as well as those increasing pace or distance beyond their current fitness level. Poor core strength is another commonly cited factor, as weak core muscles may fail to adequately stabilize the body during running, placing additional stress on the diaphragm.</p>

          <h3>Quick Relief and Long-Term Prevention</h3>
          <p>For immediate relief of a side stitch during a run, popular wisdom suggests slowing the pace, taking deep breaths, and pressing gently on the affected area while exhaling slowly. Some runners find that altering their breathing pattern to exhale when the foot opposite the stitch hits the ground helps alleviate the pain. For long-term prevention, core-strengthening exercises performed just 10 minutes, three times weekly, can significantly reduce occurrence. Proper pre-run nutrition also plays a vital role, with many experienced runners cautioning against consuming high-fiber or high-fat foods within 1-2 hours before running. Gradual warm-ups that allow the body to adapt to increased respiratory demands appear to be particularly effective in preventing side stitches in novice runners.</p>

          <blockquote>When runners look for "how to stop side stitches while running," they often find advice related to "breathing techniques for runners." Pursed-lip breathing or focusing on deep, diaphragmatic breaths are common recommendations.</blockquote>

          <p>Additionally, discussions frequently touch upon "pre-run meals to avoid stitches," with many advising against large meals or specific types of food too close to a run. Strengthening the "core muscles for running" is also a recurring theme, as a stronger core can help reduce the torsional forces on the torso that might contribute to this painful condition.</p>
        </GuideSection>

        {/* --- Section 8 --- */}
        <GuideSection id="athletes-foot" title="Athlete's Foot: The Fungal Nuisance">
          <p>Athlete's foot (tinea pedis) affects many runners, creating itching, burning discomfort that can impact training consistency and enjoyment.</p>

          <h3>How Runners Contract Athlete's Foot</h3>
          <p>This fungal infection thrives in the warm, moist environment created inside running shoes and primarily affects the skin between toes and on the soles of feet. Common transmission sources include gym floors, pool decks, and communal showers, where the fungus spreads through direct contact or walking barefoot on contaminated surfaces. The risk increases for marathon runners and those logging high weekly mileage due to extended periods in sweaty footwear. Symptoms typically include itching (often most intense after removing shoes), redness, peeling skin, and sometimes painful cracks between toes.</p>

          <h3>Treatment and Prevention Strategies</h3>
          <p>Effective treatment approaches include over-the-counter antifungal creams, sprays, and powders as the first line of defense. For prevention, thorough foot drying after showering or swimming, with special attention to the spaces between toes, is emphasized. Rotating between multiple pairs of running shoes to allow complete drying between uses is another frequently mentioned strategy. Moisture-wicking socks are strongly endorsed, with many runners preferring synthetic materials that draw sweat away from the skin. For those using public facilities, wearing flip-flops or shower shoes in locker rooms and pool areas is considered essential prevention. Some runners even suggest preventative application of antifungal powder before long runs or races to reduce infection risk from athlete's foot.</p>

          <p>Runners frequently ask for the "best treatment for athlete's foot" or "how to prevent athlete's foot when running." Key advice often revolves around "keeping feet dry" and ensuring shoes have adequate time to air out between runs. The use of "antifungal powders in running shoes" is a common preventative tip. Many also stress the importance of not ignoring the initial "itchy feet after running," as early intervention can prevent the infection from worsening or spreading.</p>
        </GuideSection>

        {/* --- Section 9 --- */}
        <GuideSection id="stress-fractures" title="Stress Fractures: The Invisible Danger">
          <p>Stress fractures represent one of the most serious running injuries and are frequently discussed as a cautionary tale about overtraining.</p>

          <h3>Recognizing the Warning Signs</h3>
          <p>Stress fractures are small cracks in bones caused by repetitive force or impact, commonly occurring when leg muscles become too fatigued to absorb shock properly. The most common locations for runners include the tibia (shin), metatarsals (foot), and less commonly, the femur or pelvis. The hallmark symptom is localized pain that worsens during activity and improves with rest. Many runners report that the pain begins as a mild discomfort but progressively intensifies if training continues. A particularly concerning indicator is pain that occurs during normal walking or while at rest, which often signifies a more serious stress fracture requiring immediate medical attention.</p>

          <h3>Recovery and Prevention Protocol</h3>
          <p>Recovery from stress fractures typically requires 6-8 weeks of modified activity or complete rest from running, depending on the location and severity. It is consistently emphasized that attempting to push through this injury invariably leads to worse outcomes and longer recovery periods. For prevention, experienced runners recommend gradual training progression, proper footwear replacement every 300-500 miles, attention to running surfaces (softer surfaces create less impact), and adequate calcium and vitamin D intake for bone health. Strength training receives particular emphasis, with many runners crediting regular resistance exercises as crucial for building bone density and developing muscles that can better absorb impact forces.</p>

          <p>A common query leading to discussions about this injury is "pain in shin that hurts to touch" or "foot pain only when running." Runners often share their experiences of trying to "run through the pain" of a suspected stress fracture, almost always with negative consequences. Advice strongly steers individuals towards seeking medical diagnosis, often involving an "MRI for stress fracture," as X-rays may not always detect them early. The importance of "listening to your body" is a constant refrain in these discussions.</p>
        </GuideSection>

        {/* --- Section 10 --- */}
        <GuideSection id="muscle-imbalances" title="Muscle Imbalances and Weaknesses: The Hidden Culprits">
          <p>While not an injury itself, muscle imbalances and weaknesses are frequently cited as underlying causes of many running injuries.</p>

          <h3>How Imbalances Affect Runners</h3>
          <p>Many experienced runners explain that modern sedentary lifestyles create muscle patterns that aren't conducive to efficient, injury-free running. Weak hip abductors and external rotators (particularly the gluteus medius) fail to properly stabilize the pelvis during the single-leg stance phase of running, creating a chain reaction of compensations throughout the kinetic chain. Tight hip flexors from excessive sitting can limit hip extension during push-off, placing additional stress on the lower back and hamstrings. Core weakness often leads to excessive movement in the lumbar spine during running, potentially contributing to back pain and inefficient energy transfer. These are all forms of muscle imbalances.</p>

          <h3>Building Running-Specific Strength</h3>
          <p>The consensus among experienced runners is that targeted strength training represents one of the most effective injury prevention strategies. Many who previously struggled with recurring injuries report significant improvements after implementing consistent strength routines. Hip strengthening exercises-particularly single-leg variations that mimic the demands of running-receive strong endorsements. Exercises frequently mentioned include single-leg deadlifts, side-lying leg raises, clamshells, and glute bridges. Core stability work focusing on maintaining proper position during movement rather than just performing crunches is also emphasized. For runners new to strength training, many recommend starting with bodyweight exercises 2-3 times weekly, gradually adding resistance as strength improves to address muscle imbalances.</p>

          <p>Runners often search for "exercises to fix muscle imbalances for running" or "how to strengthen weak glutes for runners." Recommendations often include routines or specific exercises targeting "hip dip running" (referring to pelvic drop). The understanding is growing that simply running more isn't enough; "prehab exercises for runners" are essential to counteract the effects of "sitting all day" and to build a resilient running body.</p>
        </GuideSection>

        {/* --- Section 11 --- */}
        <GuideSection id="conclusion" title="Conclusion: Listening to Your Body and Building Resilience">
          <p>Navigating the common physical challenges of running requires both knowledge and attentiveness to your body's signals. It is consistently emphasized that most running injuries stem from doing "too much, too soon," with too little recovery. Developing body awareness to distinguish between normal training discomfort and actual injury warning signs represents a crucial skill for running longevity. Incorporating proper warm-ups, cool-downs, strength training, and gradual progression into your routine can significantly reduce injury risk.</p>

          <p>For those currently dealing with running injuries, remember that patience during recovery often leads to stronger performances later. Many experienced marathoners share stories of how injury setbacks ultimately made them more resilient, thoughtful runners. By addressing both the immediate symptoms and underlying causes of common running ailments, you can build a sustainable running practice that brings joy and health benefits for years to come. The journey to becoming an injury-resistant runner isn't about avoiding all discomfort but rather about building a body capable of handling the specific demands of your running goals.</p>
        </GuideSection>

        {/* Guide Footer with Logo */}
        <div className="guide-footer">
          <img src="/logo-glow.webp" alt="Alt.Run Logo" className="guide-logo" style={{ height: '60px' }} />
        </div>
      </div>
    </div>
  );
}

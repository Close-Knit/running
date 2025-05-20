// src/pages/OptimalFormGuidePage.jsx
import React, { useEffect, useRef } from 'react';
import GuideHeader from '../components/GuideHeader';
import TableOfContents from '../components/TableOfContents';
import GuideSection from '../components/GuideSection';
import FAQItem from '../components/FAQItem';
import SEO from '../components/SEO';
import YouTubeEmbed from '../components/YouTubeEmbed';
import './OptimalFormGuidePage.css';

export default function OptimalFormGuidePage() {
  const guideContentRef = useRef();

  // Set background image for the guide page
  useEffect(() => {
    const pageBackground = document.querySelector('.page-background');
    if (pageBackground) {
      pageBackground.style.backgroundImage = 'url(/images/running-form.jpg)';

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
    { id: "unlocking-your-best-run", title: "Unlocking Your Best Run: A Guide to Optimal Running Form" },
    { id: "optimal-running-form-women", title: "Optimal Running Form for Women" },
    { id: "optimal-running-form-men", title: "Optimal Running Form for Men" },
    { id: "general-tips", title: "General Tips for Improving Running Form (For Everyone)" },
    { id: "conclusion", title: "Conclusion" }
  ];

  // Define SEO data for the guide page
  const seoData = {
    title: "Optimal Form Guide: Running Technique for Women & Men | Alt.Run",
    description: "Master proper running form with our comprehensive guide for both women and men. Learn posture, foot strike, cadence, arm swing, and core engagement techniques for efficient, injury-free running.",
    canonicalUrl: "/optimal-running-form-guide",
    ogType: "article",
    keywords: [
      "running form guide", "proper running technique", "running form for women", 
      "running form for men", "running posture", "foot strike running", 
      "running cadence", "arm swing running", "core engagement running", 
      "running efficiency", "injury prevention running"
    ],
    schema: {
      "@context": "https://schema.org",
      "@type": "Article",
      "@id": "https://alt.run/optimal-running-form-guide#article",
      "url": "https://alt.run/optimal-running-form-guide",
      "name": "Optimal Form Guide: Running Technique for Women & Men",
      "headline": "Optimal Form Guide: Running Technique for Women & Men",
      "description": "Master proper running form with our comprehensive guide for both women and men. Learn posture, foot strike, cadence, arm swing, and core engagement techniques for efficient, injury-free running.",
      "isPartOf": { "@id": "https://alt.run/#website" },
      "mainEntityOfPage": { "@id": "https://alt.run/optimal-running-form-guide#webpage" },
      "image": {
        "@type": "ImageObject",
        "url": "https://alt.run/images/optimal-form-guide.jpg",
        "width": 1200,
        "height": 630
      },
      "author": {
        "@type": "Organization",
        "name": "Alt.Run",
        "url": "https://alt.run"
      },
      "publisher": {
        "@type": "Organization",
        "name": "Alt.Run",
        "logo": {
          "@type": "ImageObject",
          "url": "https://alt.run/logo-glow.webp",
          "width": 600,
          "height": 60
        }
      },
      "datePublished": new Date().toISOString(),
      "dateModified": new Date().toISOString()
    },
    breadcrumbs: [
      { name: "Home", path: "/" },
      { name: "Optimal Form Guide", path: "/optimal-running-form-guide" }
    ]
  };

  return (
    <div className="guide-container" ref={guideContentRef}>
      {/* SEO Component */}
      <SEO {...seoData} />

      <GuideHeader
        title="Optimal Running Form Guide"
        subtitle="Unlocking Your Best Run: A Guide to Optimal Running Form for Women and Men"
        intro="Good running form is more than just looking like a pro; it's about running efficiently, reducing your risk of injury, and ultimately, enjoying your runs more. While the fundamental principles of good form are universal, subtle biomechanical differences between men and women mean that some tailored advice can be beneficial. This guide will break down the key elements of good running form, first for women and then for men, making it accessible even if you're just starting your running journey. Remember, improving your form is a gradual process, so be patient with yourself and focus on one or two changes at a time."
      />

      <TableOfContents sections={sections} />

      <div className="guide-main-content">
        <GuideSection id="optimal-running-form-women" title="Optimal Running Form for Women">
          <p>Women's bodies have unique biomechanical characteristics, such as a generally wider pelvis, which can affect running mechanics, particularly at the hips and knees. Understanding these aspects can help you focus on form cues that provide stability and efficiency.</p>

          <h3>1. Posture and Lean: Run Tall and Proud</h3>
          <p>Imagine a string pulling you up from the crown of your head. Your torso should be upright and your spine in a natural, neutral position – not arched or slumped. When you lean, it should be a slight forward lean originating from your ankles, not by bending at your waist. This helps engage gravity to gently pull you forward, making your stride more efficient.</p>
          
          <h4>Why it matters for women:</h4>
          <ul>
            <li>Maintaining a tall posture with a stable core helps counteract the tendency for the hip to drop on one side (a common issue related to wider hips), promoting better alignment from your hips through your knees to your ankles.</li>
          </ul>
          
          <h4>Beginner Tip:</h4>
          <ul>
            <li>Think "run tall" or "head pulled to the sky". Try not to look down at your feet too much; keep your gaze ahead.</li>
          </ul>

          <YouTubeEmbed 
            videoId="brFHyOtTwH4" 
            title="The PERFECT Running Form (Your Head To Toe Checklist)" 
          />

          <h3>2. Foot Strike: Landing Lightly</h3>
          <p>Foot strike refers to how your foot makes contact with the ground. While there's debate, many experts suggest aiming for a midfoot strike, where the middle part of your foot lands first, or at least landing with your foot more underneath your body rather than far out in front (overstriding). Overstriding, especially with a heavy heel strike, can act like a brake and send more impact forces up your leg.</p>
          
          <h4>Why it matters for women:</h4>
          <ul>
            <li>A midfoot strike close to your body's center of gravity can help reduce impact forces, which is beneficial given that women can sometimes experience higher forces through their joints. It also promotes a quicker turnover of your feet.</li>
          </ul>
          
          <h4>Beginner Tip:</h4>
          <ul>
            <li>Focus on landing "lightly" or "quietly". Imagine the ground is like hot lava, and you want to pick your feet up quickly.</li>
          </ul>

          <YouTubeEmbed 
            videoId="v1Bj-0QYnIg" 
            title="Proper Running Form | Cadence, Foot Strike & Posture" 
          />

          <h3>3. Cadence (Step Rate): Quicker, Lighter Steps</h3>
          <p>Cadence is simply the number of steps you take per minute (SPM). Many experienced runners have a cadence around 170-190 SPM. A higher cadence often means shorter, quicker steps, which can reduce the impact on your body with each stride and help prevent overstriding.</p>
          
          <h4>Why it matters for women:</h4>
          <ul>
            <li>A slightly quicker cadence can help reduce ground contact time and impact forces, which can be particularly helpful for managing joint stress.</li>
          </ul>
          
          <h4>Beginner Tip:</h4>
          <ul>
            <li>Don't obsess over hitting an exact number, but if you feel like you're taking long, heavy strides, try focusing on taking shorter, faster steps. You can use a running watch with a cadence feature or even run to a metronome app occasionally.</li>
          </ul>

          <YouTubeEmbed 
            videoId="LnNse_AwPyE" 
            title="Proper Running Form | Cadence, Foot Strike & Posture" 
          />

          <h3>4. Arm Swing: Balanced and Purposeful</h3>
          <p>Your arms play a crucial role in balance and forward momentum. Aim for about a 90-degree bend at your elbows. Your arms should swing mostly forward and back from your shoulders, not across your body. Keep your hands relaxed – imagine you're gently holding a potato chip you don't want to break. Shoulders should also be relaxed, not hunched up by your ears.</p>
          
          <h4>Why it matters for women:</h4>
          <ul>
            <li>An efficient arm swing that doesn't cross the midline of your body too much helps to counterbalance the rotation of your lower body and can prevent wasted energy. It also helps maintain upper body stability.</li>
          </ul>
          
          <h4>Beginner Tip:</h4>
          <ul>
            <li>Think "chin to hip" with your hand movement. Make sure your shoulders are down and back.</li>
          </ul>

          <YouTubeEmbed 
            videoId="jYO5_HkrQS8" 
            title="Beginner Runner Tips for Women | HOW TO RUN" 
          />

          <h3>5. Hip and Core Engagement: Your Powerhouse</h3>
          <p>A stable core and level hips are vital for efficient and injury-free running. For women, focusing on glute strength (especially the gluteus medius, a muscle on the side of your hip) is important to prevent your hips from dropping excessively from side to side or your knees caving inward when you land.</p>
          
          <h4>Why it matters for women:</h4>
          <ul>
            <li>Due to the typically wider female pelvis (often referred to as Q-angle), there can be a greater tendency for the knee to move inward if hip and core stability is lacking. Strengthening these areas helps maintain proper leg alignment.</li>
          </ul>
          
          <h4>Beginner Tip:</h4>
          <ul>
            <li>Engage your core as if you're about to be lightly poked in the stomach. Think "level pelvis" or "balanced hips".</li>
          </ul>

          <YouTubeEmbed 
            videoId="-vjtFaxnLFg" 
            title="How To Run Properly | Running Technique Explained" 
          />

          <h3>Simple Form Cues for Women:</h3>
          <ul>
            <li>"Run tall" or "head pulled to the sky".</li>
            <li>"Light, quick feet".</li>
            <li>"Hips level" or "balanced hips".</li>
            <li>"Arms forward and back, not across".</li>
            <li>"Relaxed hands, protect the butterfly".</li>
          </ul>
        </GuideSection>

        <GuideSection id="optimal-running-form-men" title="Optimal Running Form for Men">
          <p>While many core principles of good running form are shared, men also have distinct biomechanical tendencies, such as generally longer stride lengths at similar speeds and potentially higher vertical oscillation (up-and-down movement). Focusing on form can help harness power efficiently and reduce unnecessary impact.</p>

          <h3>1. Posture and Lean: Upright and Efficient</h3>
          <p>Just like for women, maintaining a tall, upright posture with a neutral spine is key. The slight forward lean should come from your ankles, not your waist. This engages gravity to assist your forward motion, reducing the effort your muscles need to exert to propel you.</p>
          
          <h4>Why it matters for men:</h4>
          <ul>
            <li>Good posture allows for optimal lung capacity and efficient transfer of power from your core and hips through your legs. Leaning from the ankles helps prevent overstriding and the braking forces that come with it.</li>
          </ul>
          
          <h4>Beginner Tip:</h4>
          <ul>
            <li>Imagine you're trying to gently press your chest forward while keeping your spine long. Avoid looking directly down; keep your gaze focused about 10-20 feet ahead.</li>
          </ul>

          <YouTubeEmbed 
            videoId="NhXSuyklE48" 
            title="What Is Perfect Running Form? | Run Technique Tips For All Runners" 
          />

          <h3>2. Foot Strike: Landing Under Your Hips</h3>
          <p>The goal is to have your foot land close to, or directly underneath, your body's center of gravity (your hips). Many runners find a midfoot strike or a gentle forefoot-to-midfoot transition works well for this, as opposed to reaching out and landing heavily on the heel far in front of the body. This helps to minimize braking forces and reduce stress on your joints.</p>
          
          <h4>Why it matters for men:</h4>
          <ul>
            <li>Men may sometimes exhibit greater braking forces with a pronounced heel strike. Focusing on landing more underneath the hips can improve running economy and reduce impact.</li>
          </ul>
          
          <h4>Beginner Tip:</h4>
          <ul>
            <li>Think about your feet landing softly beneath you, rather than reaching out in front. Try to make your footfalls quiet.</li>
          </ul>

          <YouTubeEmbed 
            videoId="_kGESn8ArrU" 
            title="How To Run Properly | Running Technique Explained" 
          />

          <h3>3. Cadence (Step Rate): Finding a Rhythmic Turnover</h3>
          <p>Cadence, or steps per minute, is an important factor for efficiency. Aiming for a cadence in the range of 170-190 SPM is a common target for many runners. A quicker cadence naturally encourages shorter strides, which helps your foot land closer to your center of gravity and can reduce impact forces.</p>
          
          <h4>Why it matters for men:</h4>
          <ul>
            <li>While men might naturally have a longer stride, focusing on a slightly quicker cadence can prevent overstriding, improve efficiency, and potentially lessen the vertical oscillation (bouncing) that can waste energy.</li>
          </ul>
          
          <h4>Beginner Tip:</h4>
          <ul>
            <li>If your cadence feels slow and your strides long, try shortening your steps slightly and increasing their frequency. You don't need to sprint, just aim for a quicker, lighter turnover.</li>
          </ul>

          <YouTubeEmbed 
            videoId="v1Bj-0QYnIg" 
            title="Proper Running Form | Cadence, Foot Strike & Posture" 
          />

          <h3>4. Arm Swing: Driving Forward</h3>
          <p>A controlled arm swing contributes significantly to balance and forward propulsion. Keep your elbows bent at roughly a 90-degree angle. The swing should primarily be forward and backward, originating from your shoulders, with your hands moving roughly from your chin down to your hip level. Avoid letting your arms swing excessively across your body or tensing your shoulders and hands.</p>
          
          <h4>Why it matters for men:</h4>
          <ul>
            <li>An efficient arm swing helps to counterbalance the legs and can add to forward momentum. Keeping the swing controlled prevents wasted energy from excessive upper body rotation or tension.</li>
          </ul>
          
          <h4>Beginner Tip:</h4>
          <ul>
            <li>Keep your shoulders relaxed and down. Imagine your arms are like pendulums, swinging smoothly from your shoulders.</li>
          </ul>

          <YouTubeEmbed 
            videoId="_kGESn8ArrU" 
            title="How To Run Properly | Running Technique Explained" 
          />

          <h3>5. Hip and Core Engagement: Stability and Power</h3>
          <p>A strong, stable core and engaged hips are the foundation of powerful and efficient running. Your core muscles help to stabilize your torso, preventing excessive twisting, while your hips (particularly your glutes) are major power generators for pushing off the ground.</p>
          
          <h4>Why it matters for men:</h4>
          <ul>
            <li>Engaging the core and hips ensures that power is transferred effectively through the body, leading to a more powerful stride and reducing strain on other areas like the lower back.</li>
          </ul>
          
          <h4>Beginner Tip:</h4>
          <ul>
            <li>Gently brace your core, as if preparing for a light nudge. Think about pushing off the ground using your glute muscles.</li>
          </ul>

          <YouTubeEmbed 
            videoId="_kGESn8ArrU" 
            title="How To Run Properly | Running Technique Explained" 
          />

          <h3>Simple Form Cues for Men:</h3>
          <ul>
            <li>"Run tall, chest open."</li>
            <li>"Land softly under your hips."</li>
            <li>"Quick, light steps."</li>
            <li>"Relaxed shoulders, rhythmic arm swing."</li>
            <li>"Drive from the hips."</li>
          </ul>
        </GuideSection>

        <GuideSection id="general-tips" title="General Tips for Improving Running Form (For Everyone)">
          <ul>
            <li><strong>Change Gradually:</strong> Don't try to overhaul everything at once. Focus on one or two aspects of your form per week or two.</li>
            <li><strong>Listen to Your Body:</strong> Good form should feel more comfortable and efficient, not awkward or strained. If something causes pain, ease off.</li>
            <li><strong>Watch Yourself Run:</strong> If possible, have someone film you running or run on a treadmill in front of a mirror. This can be incredibly insightful.</li>
            <li><strong>Try Running Drills:</strong> Specific drills can help reinforce good movement patterns. Many videos demonstrate these.</li>
          </ul>

          <YouTubeEmbed 
            videoId="sScNDZu2MWk" 
            title="10 Minutes to Fix Your Running Form" 
          />

          <ul>
            <li><strong>Strength Train:</strong> A strong core, hips, and legs are essential for maintaining good form, especially when you get tired.</li>
            <li><strong>Be Patient:</strong> Improving running form takes time and consistent effort.</li>
          </ul>
        </GuideSection>

        <GuideSection id="conclusion" title="Conclusion">
          <p>Striving for better running form is a journey, not a destination. By understanding these key principles and making small, consistent adjustments, both women and men can run more efficiently, reduce the likelihood of injuries, and find greater enjoyment in every stride. Happy running!</p>
        </GuideSection>

        <div className="disclaimer-box">
          <h3>Important Disclaimer</h3>
          <p>The information provided in this guide is for educational purposes only and is not intended as medical advice. Always consult with a healthcare professional before starting any new exercise program, especially if you have pre-existing health conditions or injuries. Individual biomechanics vary, and what works for one runner may not be optimal for another. Listen to your body and make adjustments as needed.</p>
        </div>
      </div>
    </div>
  );
}



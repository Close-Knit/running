// src/pages/EliudKipchogePage.jsx
import React, { useEffect, useRef } from 'react';
import GuideHeader from '../components/GuideHeader';
import TableOfContents from '../components/TableOfContents';
import GuideSection from '../components/GuideSection';
import SEO from '../components/SEO';
import YouTubeEmbed from '../components/YouTubeEmbed';
import './ProfessionalRunnerPage.css';

export default function EliudKipchogePage() {
  const guideContentRef = useRef();

  useEffect(() => {
    // Set background image for the guide page
    const pageBackground = document.querySelector('.page-background');
    if (pageBackground) {
      pageBackground.style.backgroundImage = 'url(/images/eliud-kipchoge.jpg)';

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

      // Scroll to top on component mount
      window.scrollTo(0, 0);

      // Clean up event listener on component unmount
      return () => {
        window.removeEventListener('resize', optimizeForMobile);
      };
    }
  }, []);

  // Define section titles for TableOfContents
  const sections = [
    { id: "early-life", title: "Early Life and Humble Beginnings" },
    { id: "rise-to-prominence", title: "Rise to Prominence on the Track" },
    { id: "marathon-transition", title: "Transition to Marathon Dominance" },
    { id: "record-breaking", title: "Record-Breaking Achievements" },
    { id: "olympic-glory", title: "Olympic Glory" },
    { id: "two-hour-barrier", title: "Breaking the Two-Hour Barrier" },
    { id: "training-philosophy", title: "Training Philosophy and Methods" },
    { id: "personal-philosophy", title: "Personal Philosophy and Character" },
    { id: "humanitarian-work", title: "Humanitarian Work and Legacy" },
    { id: "personal-life", title: "Personal Life and Challenges" },
    { id: "recognition", title: "Recognition and Honors" },
    { id: "conclusion", title: "Conclusion" }
  ];

  // Define SEO data for the page
  const seoData = {
    title: "Eliud Kipchoge: The Greatest Marathoner in History | Alt.Run",
    description: "Explore the extraordinary career of Eliud Kipchoge, widely considered the greatest marathoner of all time, from his humble beginnings to breaking the two-hour marathon barrier.",
    canonicalUrl: "/professional-runners/eliud-kipchoge",
    ogType: "article",
    keywords: [
      "Eliud Kipchoge", "marathon runner", "Olympic gold medalist",
      "sub-two-hour marathon", "Ineos 1:59 Challenge", "Kenyan runner",
      "marathon world record", "professional runner profile", "elite athlete"
    ],
    breadcrumbs: [
      { name: "Home", path: "/" },
      { name: "Professional Runners", path: "/professional-runners" },
      { name: "Eliud Kipchoge", path: "/professional-runners/eliud-kipchoge" }
    ]
  };

  return (
    <div className="guide-container" ref={guideContentRef}>
      {/* SEO Component */}
      <SEO {...seoData} />

      <GuideHeader
        title="Eliud Kipchoge: The Greatest Marathoner in History"
        subtitle="Redefining Human Potential in Long-Distance Running"
        intro="Eliud Kipchoge stands as a towering figure in the world of long-distance running, widely considered the greatest marathoner of all time. With an unparalleled combination of physical talent, mental fortitude, and philosophical wisdom, the Kenyan runner has redefined what humans can achieve in the marathon. His groundbreaking sub-two-hour marathon performance and dominance across the world's most prestigious races have cemented his legacy as one of athletics' most extraordinary champions."
      />

      <TableOfContents sections={sections} />

      <div className="guide-main-content">
        {/* --- Section 1 --- */}
        <GuideSection id="early-life" title="Early Life and Humble Beginnings">
          <p>Born on November 5, 1984, in Kapsisiywa, Nandi County, Kenya, Eliud Kipchoge grew up in modest circumstances that would shape his future success. The youngest of four siblings, Kipchoge was raised by a single mother who worked as a teacher, having lost his father during his childhood. His early connection to running was purely practical – he ran three kilometers to and from school each day, unknowingly laying the foundation for his future athletic career.</p>

          <p>Kipchoge graduated from Kaptel Secondary School in Nandi County in 1999, but notably did not run seriously or professionally during these formative years. The pivotal moment in his running journey came in 2001, at age 16, when he met Patrick Sang, a former Olympic steeplechase medalist who would become his long-term coach, mentor, and friend. This relationship would prove instrumental in developing the disciplined approach that defines Kipchoge's career.</p>
        </GuideSection>

        {/* --- Section 2 --- */}
        <GuideSection id="rise-to-prominence" title="Rise to Prominence on the Track">
          <p>Before becoming a marathon legend, Kipchoge established himself as an elite track athlete. His breakout moment arrived in 2003 when, as a teenager, he shocked the athletics world by defeating track icons Hicham El Guerrouj and Kenenisa Bekele to win the 5000m gold at the World Championships. This victory announced Kipchoge as a special talent, claiming his first senior world title with a championship record.</p>

          <p>His track career continued to flourish with Olympic bronze in the 5000m at Athens 2004 and silver at Beijing 2008. Additionally, he captured bronze at the 2006 World Indoor Championships and silver at the 2007 World Championships. Throughout this period, Kipchoge's 5000m personal best of 12:46.53 ranked him among the fastest in history, sitting at number six on the all-time list.</p>
        </GuideSection>

        {/* --- Section 3 --- */}
        <GuideSection id="marathon-transition" title="Transition to Marathon Dominance">
          <p>After missing qualification for the 2012 London Olympics on the track, Kipchoge and coach Patrick Sang made the pivotal decision to transition to the marathon. This shift would prove transformative for both Kipchoge and the marathon world. He made an immediate impact in road racing, recording the second-fastest half-marathon debut ever with 59:25.</p>

          <p>Kipchoge's marathon debut came at Hamburg in April 2013, where he claimed victory with a course record of 2:05:30, the sixth-fastest marathon debut in history at that time. This would mark the beginning of an extraordinary period of dominance. From 2013 to 2023, Kipchoge won 15 of his first 18 marathons, with his only losses being a second-place finish at the 2013 Berlin Marathon (behind Wilson Kipsang), an eighth-place finish at the 2020 London Marathon, and a sixth-place showing at the 2023 Boston Marathon.</p>
        </GuideSection>

        {/* --- Section 4 --- */}
        <GuideSection id="record-breaking" title="Record-Breaking Achievements">
          <p>Kipchoge's achievements in the marathon are unprecedented. He has captured victory at the world's most prestigious races, including a record four London Marathon wins (2015, 2016, 2018, 2019) and five Berlin Marathon triumphs, making him the all-time record holder for that course. His first World Marathon Major victory came at Chicago in 2014, and he has gone on to become a five-time series champion – for 2016, 2017, 2018, 2019, and 2022.</p>

          <p>Perhaps most impressively, Kipchoge has repeatedly pushed the boundaries of human performance in the marathon distance. In 2018, he shattered the world record at the Berlin Marathon with a time of 2:01:39, improving the previous mark by an astonishing 78 seconds – the largest improvement in a marathon world record since 1967. He then broke his own record at the 2022 Berlin Marathon, lowering the time to 2:01:09. This record stood until late 2023, when Kelvin Kiptum set a new mark at the Chicago Marathon.</p>
        </GuideSection>

        {/* --- Section 5 --- */}
        <GuideSection id="olympic-glory" title="Olympic Glory">
          <p>Kipchoge's greatness extends to the Olympic stage, where he has cemented his legacy as one of the Games' greatest champions. After track success with 5000m bronze in 2004 and silver in 2008, he achieved his crowning Olympic achievements in the marathon.</p>

          <p>At the 2016 Rio Olympics, Kipchoge claimed his first Olympic marathon gold with a dominant performance. Five years later, at the COVID-delayed Tokyo Olympics in 2021, he successfully defended his title, becoming only the third person in Olympic history to win consecutive marathon gold medals. His ability to perform at the highest level in championship races, without pacemakers and often in challenging conditions, further validates his status as the greatest marathoner of all time.</p>

          <YouTubeEmbed
            videoId="DXTSMF568zs"
            title="Kenya's Eliud Kipchoge wins back-to-back marathons at Tokyo 2020"
          />
        </GuideSection>

        {/* --- Section 6 --- */}
        <GuideSection id="two-hour-barrier" title="Breaking the Two-Hour Barrier">
          <p>Kipchoge's most historic achievement came on October 12, 2019, in Vienna, Austria, during the Ineos 1:59 Challenge. In this specially organized event, he became the first person in recorded history to run the marathon distance (42.195 km) in under two hours, crossing the finish line in an astounding 1:59:40.2.</p>

          <p>While not recognized as an official world record due to the controlled conditions – including rotating pacemakers, laser pace guides, and a flat, optimized course – the achievement captured global attention and expanded perceptions of human potential. Throughout the attempt, Kipchoge maintained a remarkably consistent pace of 2:50 minutes per kilometer, executing the perfect race strategy.</p>

          <YouTubeEmbed
            videoId="MZfxDWNCf_c"
            title="Eliud Kipchoge: My Sub 2 Hour Marathon (Documentary)"
          />

          <p>The performance drew comparisons to other breakthrough sporting moments like Roger Bannister's first sub-four-minute mile in 1954. After completing this historic feat, Kipchoge famously declared, <blockquote>"I have tried, I am the first man to run under two hours to inspire many people, to tell people no human is limited"</blockquote></p>
        </GuideSection>

        {/* --- Section 7 --- */}
        <GuideSection id="training-philosophy" title="Training Philosophy and Methods">
          <p>Kipchoge's extraordinary achievements are built upon a training approach that balances intensity with recovery. He follows a hard-easy method, running at approximately 80% capacity on Tuesdays, Thursdays, and Saturdays, while maintaining around 50% effort on other days. His weekly training volume typically ranges between 124-136 miles (200-220 kilometers).</p>

          <p>His standard training week includes track workouts, fartlek sessions, and long runs up to 25 miles, all carefully structured to build endurance and speed while preventing injury. Notably, Kipchoge's recovery runs begin at a very conservative pace (8:30-8:45 minutes per mile) and gradually build to 6:30-7 minutes per mile – still significantly slower than his marathon race pace.</p>

          <p>Twice weekly, Kipchoge performs 60-minute strength and mobility sessions focused on the posterior chain, particularly the glutes, hamstrings, and core muscles. These exercises use primarily resistance bands and body weight rather than heavy weights, with the primary goal being injury prevention rather than strength building.</p>

          <p>Kipchoge lives and trains in Kaptagat, Kenya, approximately 30 kilometers from Eldoret, where he resides with around 30 other runners in a spartan training camp environment that eliminates distractions and fosters focus.</p>

          <YouTubeEmbed
            videoId="tG_y5jbXZp8"
            title="Eliud Kipchoge Drops Wisdom In Rare Podcast Appearance"
          />
        </GuideSection>

        {/* --- Section 8 --- */}
        <GuideSection id="personal-philosophy" title="Personal Philosophy and Character">
          <p>Beyond his physical abilities, Kipchoge is renowned for his philosophical wisdom and mental strength. His most famous mantra, "No human is limited," encapsulates his belief in the boundless potential within each person. This philosophy extends to his approach to life and training, where he emphasizes discipline as the foundation of success.</p>

          <p>One of his most quoted statements reflects this mindset: <blockquote>"Only the disciplined ones are free in life. If you are undisciplined you are a slave to your moods, you are a slave to your passions"</blockquote> His teammates and observers describe him as a "true believer" – a warrior always ready to push his limits while maintaining remarkable humility.</p>

          <p>Perhaps most distinctively, Kipchoge is known for his trademark grin during the final stages of races, a sign of both his joy in running and his control even during moments of extreme physical exertion.</p>
        </GuideSection>

        {/* --- Section 9 --- */}
        <GuideSection id="humanitarian-work" title="Humanitarian Work and Legacy">
          <p>In recent years, Kipchoge has expanded his influence beyond the racecourse through the establishment of the Eliud Kipchoge Foundation, which focuses on two key pillars: education and environment. His mission reflects his personal values: <blockquote>"To give all children in the world access to knowledge and education. I want those children to grow up into healthy adults in a green and breathing world where forests keep our people safe"</blockquote></p>

          <p>The foundation aims to raise awareness and funding to build libraries, schools, and forests, applying the same determination to social causes that Kipchoge brings to his athletic endeavors. His belief that "education and a healthy environment are key factors for development" guides these humanitarian efforts.</p>
        </GuideSection>

        {/* --- Section 10 --- */}
        <GuideSection id="personal-life" title="Personal Life and Challenges">
          <p>Despite his global fame, Kipchoge maintains a remarkably grounded personal life. His wife and three children live in Eldoret, Kenya, while he spends much of his time training in nearby Kaptagat. He is described as a devout Catholic and is known for his humility despite his extraordinary achievements.</p>

          <p>Kipchoge's life has not been without challenges. Following the tragic death of fellow Kenyan marathon star Kelvin Kiptum in early 2024, Kipchoge and his family faced disturbing online threats falsely accusing him of involvement in Kiptum's death. These unfounded allegations reportedly impacted his training and well-being during a difficult period.</p>
        </GuideSection>

        {/* --- Section 11 --- */}
        <GuideSection id="recognition" title="Recognition and Honors">
          <p>Kipchoge's contributions to sport have been recognized with numerous accolades. In 2019, following his sub-two-hour marathon, he was appointed Elder of the Order of the Golden Heart by Kenyan President Uhuru Kenyatta. That same year, he was named the BBC World Sport Star of the Year. In 2023, he received the prestigious Princess of Asturias Award in the Sports category.</p>
        </GuideSection>

        {/* --- Section 12 --- */}
        <GuideSection id="conclusion" title="Conclusion">
          <p>Eliud Kipchoge's journey from a rural Kenyan village to becoming the greatest marathoner in history exemplifies the power of human potential when combined with unwavering discipline and clear purpose. His athletic achievements – from multiple Olympic gold medals to world records and the historic sub-two-hour marathon – have redefined what's possible in long-distance running.</p>

          <p>Yet perhaps Kipchoge's most significant contribution extends beyond his race results. Through his philosophical approach to running and life, captured in his famous mantra "No human is limited," he has inspired millions worldwide to push beyond perceived boundaries in pursuit of their own excellence. As both an athletic icon and humanitarian, Eliud Kipchoge has earned his place among the greatest runners – and sportspeople – of all time.</p>
        </GuideSection>

        {/* Disclaimer */}
        <div className="disclaimer-box">
          <h3>Important Disclaimer</h3>
          <p>The information provided in this article is for educational and informational purposes only. While we strive for accuracy, we make no representations or warranties of any kind, express or implied, about the completeness, accuracy, reliability, suitability, or availability of the information contained herein. Any reliance you place on such information is strictly at your own risk.</p>
        </div>
      </div>
    </div>
  );
}

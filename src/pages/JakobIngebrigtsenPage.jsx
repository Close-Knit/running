// src/pages/JakobIngebrigtsenPage.jsx
import React, { useEffect, useRef } from 'react';
import GuideHeader from '../components/GuideHeader';
import TableOfContents from '../components/TableOfContents';
import GuideSection from '../components/GuideSection';
import SEO from '../components/SEO';
import YouTubeEmbed from '../components/YouTubeEmbed';
import './ProfessionalRunnerPage.css';

export default function JakobIngebrigtsenPage() {
  const guideContentRef = useRef();

  // Set background image for the page
  useEffect(() => {
    const pageBackground = document.querySelector('.page-background');
    if (pageBackground) {
      pageBackground.style.backgroundImage = 'url(/images/Jakob-Ingebrigtsen.jpg)';

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
    { id: "early-life", title: "Early Life and Family Background" },
    { id: "junior-career", title: "Junior Career Highlights" },
    { id: "rise-to-prominence", title: "Rise to Global Prominence" },
    { id: "championship-success", title: "Championship Success and World Records" },
    { id: "training-approach", title: "Training Approach and Running Style" },
    { id: "personal-life", title: "Personal Life and Public Persona" },
    { id: "current-season", title: "Current Season and Future Prospects" },
    { id: "legacy", title: "Legacy and Historical Context" },
    { id: "search-analytics", title: "Search Analytics and Media Profile" },
    { id: "conclusion", title: "Conclusion: The Ongoing Ingebrigtsen Era" }
  ];

  // Define SEO data for the page
  const seoData = {
    title: "Jakob Ingebrigtsen: The Norwegian Running Phenomenon | Alt.Run",
    description: "Explore the extraordinary career of Jakob Ingebrigtsen, the Norwegian middle and long-distance running phenomenon who has shattered world records and claimed Olympic gold medals.",
    canonicalUrl: "/professional-runners/jakob-ingebrigtsen",
    ogType: "article",
    keywords: [
      "Jakob Ingebrigtsen", "Norwegian runner", "Olympic gold medalist",
      "middle-distance runner", "world record holder", "1500m", "3000m", "5000m",
      "track and field", "professional runner profile", "elite athlete"
    ],
    breadcrumbs: [
      { name: "Home", path: "/" },
      { name: "Professional Runners", path: "/professional-runners" },
      { name: "Jakob Ingebrigtsen", path: "/professional-runners/jakob-ingebrigtsen" }
    ]
  };

  return (
    <div className="guide-container" ref={guideContentRef}>
      {/* SEO Component */}
      <SEO {...seoData} />

      <GuideHeader
        title="Jakob Ingebrigtsen: The Norwegian Running Phenomenon"
        subtitle="Setting World Records in 2025"
        intro="Jakob Ingebrigtsen continues to dominate middle and long-distance running in 2025, cementing his legacy as one of the sport's most exceptional talents. The Norwegian phenom has shattered multiple world records, claimed Olympic gold medals, and established himself as the premier distance runner of his generation. With his remarkable range across distances from 1500m to 5000m, meticulous training approach, and tactical brilliance, Ingebrigtsen has captivated the running world and amassed a global following of fans eager to witness his historic achievements."
      />

      <TableOfContents sections={sections} />

      <div className="guide-main-content">
        {/* Disclaimer */}
        <div className="disclaimer-box">
          <h3>Important Disclaimer:</h3>
          <p>The information in this profile is intended for educational purposes only. While we strive for accuracy, details about training methods should not be taken as professional advice. Always consult with qualified coaches before attempting to replicate elite training programs.</p>
        </div>



        {/* --- Section 1 --- */}
        <GuideSection id="early-life" title="Early Life and Family Background">
          <p>Born on September 19, 2000, in Sandnes, Norway, Jakob Asserson Ingebrigtsen emerged from a family deeply rooted in running excellence. As the youngest of three brothers who all compete internationally in middle-distance events, Jakob grew up in an environment where athletic excellence was the expectation. His older siblings Henrik and Filip Ingebrigtsen had already established themselves as elite runners, creating a competitive household that would shape Jakob's development.</p>

          <YouTubeEmbed
            videoId="F9JJCxZz0tc"
            title="Jakob Ingebrigtsen CRUSHES 12x400m, 10x200m At Altitude - Training Insights"
          />

          <p>Until 2022, all three brothers were trained by their father, Gjert Ingebrigtsen, whose demanding coaching methods helped transform his sons into world-class athletes. This family-centered approach to training created a unique dynamic that allowed Jakob to benefit from both paternal guidance and sibling rivalry. The desire to surpass his older brothers' achievements has been a powerful motivating force throughout his career.</p>

          <p>Jakob's natural talent became evident at a young age. By 16, he had already made history as the youngest athlete ever to run a sub-four-minute mile at the time, signaling his extraordinary potential. This precocious achievement would prove to be just the beginning of a career defined by breaking barriers and redefining what's possible in middle and long-distance running.</p>
        </GuideSection>

        {/* --- Section 2 --- */}
        <GuideSection id="junior-career" title="Junior Career Highlights">
          <p>Even before reaching adulthood, Ingebrigtsen's accomplishments were remarkable:</p>

          <ul className="achievement-list">
            <li>At 16, became the youngest runner to break the 4-minute mile barrier at the time</li>
            <li>Won four consecutive European Cross Country Championships as a junior</li>
            <li>Secured gold in the 5000m at the 2017 European Under-20 Championships</li>
            <li>Set a European Under-20 record in the 3000m steeplechase</li>
            <li>Ran a 3:52.28 mile at age 17, the fastest ever for that age group at the time</li>
          </ul>

          <p>These early achievements highlighted not only his exceptional physical gifts but also his competitive maturity and tactical awareness beyond his years.</p>
        </GuideSection>

        {/* --- Section 3 --- */}
        <GuideSection id="rise-to-prominence" title="Rise to Global Prominence">
          <h3>2018-2019: European Dominance</h3>
          <p>Jakob's international breakthrough came at the 2018 European Championships in Berlin, where at just 17 years old, he claimed gold medals in both the 1500m and 5000m events. This historic double established him as a generational talent with remarkable versatility.</p>

          <YouTubeEmbed
            videoId="6yyp2fwc6BE"
            title="Men's 3000m Final | Glasgow 2019 - European Athletics Indoor Championships"
          />

          <p>The following year, he continued to improve his personal bests across multiple distances. In July 2019, he ran 3:30.16 in the 1500m at the Lausanne Diamond League. Later that month at the London Diamond League, he set a new Norwegian record and European U20 record in the 5000m with a time of 13:02.03. By the end of 2019, he had also broken the Norwegian 10km road record with a time of 27:54.</p>

          <h3>2020-2021: Olympic Glory in Tokyo</h3>
          <p>The postponed 2020 Tokyo Olympics became Ingebrigtsen's defining moment on the global stage. On August 7, 2021, the Norwegian captured his first Olympic gold medal in spectacular fashion, winning the 1500m final in an Olympic and European record time of 3:28.32. This victory was particularly significant as he finally overcame his Kenyan rival Timothy Cheruiyot, who had dominated their previous matchups.</p>

          <YouTubeEmbed
            videoId="us9bM_WGYlY"
            title="Ingebrigtsen breaks OLYMPIC RECORD! | Men's 1500m final at Tokyo 2020"
          />

          <p>During this period, Ingebrigtsen also broke the 3:30 barrier in the 1500m for the first time, running 3:28.68 at the Herculis meeting in Monaco and breaking Mo Farah's European record. His European indoor records in both the 1500m and 3000m further demonstrated his versatility and dominance across a wide range of distances.</p>
        </GuideSection>
        {/* --- Section 4 --- */}
        <GuideSection id="championship-success" title="Championship Success and World Records">
          <h3>2022-2023: World Champion and Record Breaker</h3>
          <p>The years 2022 and 2023 saw Ingebrigtsen ascend to world champion status and begin his assault on global records:</p>

          <ul className="achievement-list">
            <li>February 2022: Set his first senior world record in the indoor 1500m with a time of 3:30.60</li>
            <li>August 2022: Won gold in the 5000m at the World Championships in Eugene, becoming the first non-African-born runner to win Olympic or World Championship gold in this event in 30 years</li>
            <li>June 2023: Broke the two-mile world best with a time of 7:54.10, improving Daniel Komen's 26-year-old mark by over 4 seconds</li>
            <li>July 2023: Improved his European record in the 1500m to 3:27.14</li>
            <li>September 2023: Set a new world record in the 2000m with a time of 4:43.13, breaking Hicham El Guerrouj's previous mark</li>
          </ul>

          <p>These achievements solidified his status as one of the sport's most versatile and dominant competitors, capable of setting records and winning championships across multiple distances.</p>

          <h3>2024: Paris Olympic Gold and Historic 3000m World Record</h3>
          <p>Ingebrigtsen's 2024 season reached its pinnacle with his second Olympic gold medal, this time in the 5000m at the Paris Games. His victory, achieved with a powerful finishing kick and a final lap of 53.2 seconds, made him only the third man in history (after Hicham El Guerrouj and Paavo Nurmi) to win Olympic gold medals in both the 1500m and 5000m events.</p>

          <YouTubeEmbed
            videoId="I-qBfW7HhjM"
            title="Jakob Ingebrigtsen SETS TRACK ON FIRE With Crazy Close In 5000 Meters || 2024 Paris Olympics"
          />

          <p>Just weeks after his Olympic triumph, on August 25, 2024, Ingebrigtsen achieved perhaps his most impressive feat to date. At the Diamond League meeting in Silesia, Poland, he shattered Daniel Komen's 28-year-old 3000m world record, running an astonishing 7:17.55. This performance was particularly remarkable because:</p>

          <ul className="achievement-list">
            <li>It broke the longest-standing men's individual track world record in athletics</li>
            <li>No other athlete had previously come within two seconds of Komen's mark</li>
            <li>Ingebrigtsen became the first man ever to break the 7:20 barrier for 3000m</li>
            <li>His average pace was an incredible 58.34 seconds per 400m, with a blistering 55.45-second final lap</li>
          </ul>

          <p>According to World Athletics scoring, this 3000m performance ranks as the second-highest men's distance world record in athletics history, only behind Kelvin Kiptum's marathon record.</p>

          <h3>2025: Indoor World Champion and Double World Record</h3>
          <p>Ingebrigtsen's momentum has continued into 2025 with more record-breaking performances:</p>

          <ul className="achievement-list">
            <li>February 2025: Set two world records in one race in Liévin, France – a new indoor mile world record of 3:45.14 and becoming the first athlete to break 3:30 for the indoor 1500m with a time of 3:29.63</li>
            <li>March 2025: Won his third consecutive European Indoor Championship in the 1500m</li>
            <li>March 2025: Claimed a historic double at the World Indoor Championships in Nanjing, winning both the 3000m and 1500m – a feat last accomplished by Haile Gebrselassie in 1999</li>
          </ul>

          <YouTubeEmbed
            videoId="6c2ha3rNZ_A"
            title="Jakob Ingebrigtsen SMASHES indoor mile world record in Liévin"
          />

          <p>These achievements have further cemented his status as the world's premier middle-distance runner, with an unprecedented collection of titles and records at such a young age.</p>
        </GuideSection>

        {/* --- Section 5 --- */}
        <GuideSection id="training-approach" title="Training Approach and Running Style">
          <h3>Technical Analysis of Running Form</h3>
          <p>Ingebrigtsen's running mechanics contribute significantly to his success. Analysis of his form reveals:</p>

          <ul className="achievement-list">
            <li>A high cadence of approximately 202 steps per minute during faster efforts, compared to around 180 steps per minute during slower training runs</li>
            <li>Near-perfect mid-foot strike that optimizes load distribution and minimizes ground contact time</li>
            <li>Excellent symmetry in his ground contact time (approximately 0.16 seconds for each foot)</li>
            <li>Optimal leg extension (forward to over 20 degrees) and ground contact (at 6-7 degrees), creating an efficient 15-degree sweep</li>
            <li>Textbook posture with hips, thorax, and head in one straight line, and a 5-degree forward lean at mid-stance</li>
          </ul>

          <p>These biomechanical advantages allow him to maintain efficiency across different distances and paces, contributing to his extraordinary versatility.</p>

          <h3>Training Philosophy and Technology</h3>
          <p>Ingebrigtsen's training regimen combines traditional high-volume work with modern technology and data analysis. In 2024, his preparation for the Paris Olympics followed a methodical plan:</p>

          <ul className="achievement-list">
            <li>Eight weeks of high-volume training with a conservative approach to intensity</li>
            <li>A light taper before key competitions, balanced to maintain aerobic base</li>
            <li>Pushing training to the edge of sustainable volume and intensity</li>
            <li>Using COROS technology (including the PACE 3 watch and Heart Rate Monitor) to track and analyze performance metrics</li>
            <li>Leveraging data analytics through the COROS Training Hub to identify trends and optimize workload</li>
          </ul>

          <p>After a winter injury in early 2024, Ingebrigtsen didn't resume consistent training until mid-February but still managed to achieve peak form for the summer season. His approach emphasizes quality over quantity, with meticulous attention to recovery and adaptation.</p>

          <p>In 2025, Ingebrigtsen has focused on altitude training to further enhance his physiological capabilities. Recent social media posts show him training with Norwegian teammate Magnus Tuv Myhre and his brother Henrik Ingebrigtsen, preparing for the upcoming World Championships.</p>
        </GuideSection>

        {/* --- Section 6 --- */}
        <GuideSection id="personal-life" title="Personal Life and Public Persona">
          <p>Beyond his athletic achievements, Jakob Ingebrigtsen has developed a significant public profile. He married Elisabeth Asserson (now Elisabeth Ingebrigtsen), maintaining a relatively private personal life despite his growing fame. His Instagram account has amassed over half a million followers, where he occasionally shares glimpses of his training and personal life.</p>

          <p>The Ingebrigtsen family dynamic shifted in 2022 when Jakob and his brothers stopped training under their father Gjert. While the specific reasons have not been extensively publicized, this professional separation marked a new chapter in Jakob's career as he took greater personal ownership of his training and development.</p>

          <p>Despite his intense competitive nature, Ingebrigtsen occasionally reveals a more lighthearted side. In 2024, he participated in a "beer mile" during his bachelor party, running a respectable 5:22 – demonstrating that even elite athletes can balance serious training with occasional fun.</p>
        </GuideSection>

        {/* --- Section 7 --- */}
        <GuideSection id="current-season" title="Current Season and Future Prospects">
          <h3>2025 Season Goals</h3>
          <p>As the 2025 season progresses, Ingebrigtsen has already achieved significant milestones with his World Indoor Championship double in March. His focus now shifts to:</p>

          <ul className="achievement-list">
            <li>The outdoor track season and potential defense of his European titles</li>
            <li>The World Athletics Championships in September, where he aims to defend his 5000m title</li>
            <li>Continued pursuit of world records across multiple distances</li>
          </ul>

          <p>As he stated after breaking the 3000m world record in 2024: "I want to challenge world records at all distances". This ambition suggests fans can expect more record attempts in various events throughout 2025 and beyond.</p>

          <h3>Potential Records Within Reach</h3>
          <p>Given his versatility and current trajectory, several major records appear within Ingebrigtsen's capabilities:</p>

          <ul className="achievement-list">
            <li>The outdoor 1500m world record of 3:26.00 (Hicham El Guerrouj, 1998)</li>
            <li>The outdoor mile world record of 3:43.13 (Hicham El Guerrouj, 1999)</li>
            <li>The outdoor 5000m world record of 12:35.36 (Joshua Cheptegei, 2020)</li>
          </ul>

          <p>With his current personal bests (3:26.73 in the 1500m, 3:43.73 in the mile, and 12:48.45 in the 5000m), these records represent challenging but achievable targets for the Norwegian star.</p>
        </GuideSection>

        {/* --- Section 8 --- */}
        <GuideSection id="legacy" title="Legacy and Historical Context">
          <h3>Comparisons to All-Time Greats</h3>
          <p>At just 24 years old, Ingebrigtsen has already established himself among the all-time greats in middle-distance running. His achievements invite comparisons to legendary figures like:</p>

          <ul className="achievement-list">
            <li>Hicham El Guerrouj: The Moroccan great also won Olympic gold in both 1500m and 5000m (though in the same Games in 2004, while Ingebrigtsen's came in different Olympics)</li>
            <li>Paavo Nurmi: The Finnish "Flying Finn" who also won both 1500m and 5000m Olympic gold (in Paris 1924, exactly 100 years before Ingebrigtsen's 5000m victory in the same city)</li>
            <li>Daniel Komen: The Kenyan whose 3000m world record stood for nearly 28 years until Ingebrigtsen broke it</li>
          </ul>

          <YouTubeEmbed
            videoId="6Wll85o5tEs"
            title="Cole Hocker V. Josh Kerr & Jakob Ingebrigtsen - Men's 1500 Meter Finals Paris Olympics"
          />

          <p>What distinguishes Ingebrigtsen is his unprecedented versatility across distances and surfaces (track, indoor, cross country) combined with his youth. At 24, he has already accumulated a medal collection and record portfolio that most athletes would consider a complete career.</p>

          <h3>Impact on Norwegian and European Athletics</h3>
          <p>Ingebrigtsen's success has revitalized middle-distance running in Norway and across Europe. As the first non-African born runner to win Olympic or World Championship gold in the 5000m in three decades, he has broken psychological barriers for European distance runners. His European records across multiple distances have reset standards for what athletes from the continent can achieve.</p>

          <p>The "Ingebrigtsen effect" has inspired a new generation of Norwegian runners, with emerging talents like Magnus Tuv Myhre now training alongside him. This growing Norwegian presence in events historically dominated by East African nations represents a significant shift in the global distance running landscape.</p>
        </GuideSection>

        {/* --- Section 9 --- */}
        <GuideSection id="search-analytics" title="Search Analytics and Media Profile">
          <h3>Understanding the Ingebrigtsen Search Phenomenon</h3>
          <p>With a search volume of 166,990, "Jakob Ingebrigtsen" represents one of the most-searched athlete names in track and field. This substantial search interest can be attributed to several factors:</p>

          <ul className="achievement-list">
            <li>His record-breaking performances generate immediate global attention</li>
            <li>His youth and ongoing potential for further improvement maintains curiosity</li>
            <li>His versatility across distances appeals to fans of various running events</li>
            <li>His distinctive family story adds human interest beyond pure athletic achievement</li>
            <li>His European/Norwegian background breaks the typical East African dominance narrative in distance running</li>
          </ul>

          <p>Search volume typically spikes dramatically around major championships (Olympics, World Championships) and record-breaking performances. The August 2024 3000m world record likely generated one of the highest search peaks of his career to date.</p>

          <h3>Media Presence and Public Image</h3>
          <p>Ingebrigtsen's media presence continues to grow alongside his achievements. His social media following has expanded significantly in recent years, and he has established partnerships with brands like COROS Wearables to optimize his training with cutting-edge GPS technology.</p>

          <p>As of 2025, Ingebrigtsen ranks as the 2,461st most popular athlete according to Wikipedia page views (up from 2,606th in 2019), the 585th most popular biography from Norway, and the 59th most popular Norwegian athlete. These rankings are likely to improve further with each major achievement.</p>
        </GuideSection>

        {/* --- Section 10 --- */}
        <GuideSection id="conclusion" title="Conclusion: The Ongoing Ingebrigtsen Era">
          <p>Jakob Ingebrigtsen stands at the forefront of a new era in middle and long-distance running. At just 24 years old, he has already accomplished what most athletes can only dream of: multiple Olympic golds, World Championship titles, European records, and world records across various distances. His combination of tactical brilliance, physiological gifts, and meticulous approach to training has created a nearly unbeatable package.</p>

          <p>What makes Ingebrigtsen's story particularly compelling is that it appears to be just beginning. With potentially another decade or more at the elite level, the Norwegian star has time to establish himself as perhaps the greatest middle-distance runner in history. As he continues to chase records and championships in 2025 and beyond, the running world watches in anticipation of what heights he might reach next.</p>

          <p>For fans, analysts, and competitors alike, one thing seems certain: the Jakob Ingebrigtsen phenomenon is redefining what's possible in distance running, one record-breaking performance at a time.</p>
        </GuideSection>
      </div>
    </div>
  );
}

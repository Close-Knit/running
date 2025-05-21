// src/pages/KelvinKiptumPage.jsx
import React, { useEffect, useRef } from 'react';
import GuideHeader from '../components/GuideHeader';
import TableOfContents from '../components/TableOfContents';
import GuideSection from '../components/GuideSection';
import YouTubeEmbed from '../components/YouTubeEmbed';
import SEO from '../components/SEO';
import './ProfessionalRunnerPage.css';

export default function KelvinKiptumPage() {
  const guideContentRef = useRef();

  // Set background image for the page
  useEffect(() => {
    const pageBackground = document.querySelector('.page-background');
    if (pageBackground) {
      pageBackground.style.backgroundImage = 'url(/images/kelvin-kiptum.jpg)';

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
    { id: "global-dominance", title: "From Obscurity to Global Dominance" },
    { id: "chicago-marathon", title: "The Chicago Marathon: Redefining Human Limits" },
    { id: "training-regimen", title: "The Grueling Training Regimen" },
    { id: "tragic-death", title: "Tragic Death and Global Mourning" },
    { id: "conclusion", title: "Conclusion: A Legacy Unfinished" }
  ];

  // Define SEO data for the page
  const seoData = {
    title: "Kelvin Kiptum: The Meteoric Rise and Tragic Fall of Marathon's Brightest Star | Alt.Run",
    description: "Explore the extraordinary career of Kelvin Kiptum, the Kenyan marathon world record holder who redefined human endurance before his tragic death at age 24.",
    canonicalUrl: "/professional-runners/kelvin-kiptum",
    ogType: "article",
    keywords: [
      "Kelvin Kiptum", "marathon world record", "Chicago Marathon",
      "Kenyan runner", "2:00:35 marathon", "marathon training",
      "Eliud Kipchoge", "professional runner profile", "elite athlete"
    ],
  };

  return (
    <div className="guide-container" ref={guideContentRef}>
      {/* SEO Component */}
      <SEO {...seoData} />

      <GuideHeader
        title="Kelvin Kiptum: The Meteoric Rise and Tragic Fall of Marathon's Brightest Star"
        subtitle="From Herding Cattle to Breaking the Marathon World Record"
        intro="Kelvin Kiptum's brief yet extraordinary career redefined the limits of human endurance in marathon running. Before his untimely death at 24 in February 2024, the Kenyan athlete had already cemented his legacy as the fastest marathoner in history, breaking Eliud Kipchoge's world record with a staggering 2:00:35 at the 2023 Chicago Marathon. His journey from herding cattle in rural Kenya to global athletic stardom—marked by unprecedented discipline, raw talent, and a tragically unfulfilled potential—stands as a testament to both the heights of human achievement and the fragility of life."
      />

      <TableOfContents sections={sections} />

      <div className="guide-main-content">
        {/* --- Section 1 --- */}
        <GuideSection id="early-life" title="Early Life and Humble Beginnings">
          <p>Born on December 2, 1999, in Chepsamo village, Elgeyo-Marakwet County, Kenya, Kelvin Kiptum grew up in the heart of the Rift Valley, a region renowned for producing world-class distance runners. As the only child of Samson Cheruiyot, a farmer, Kiptum spent his early years tending to the family's livestock, often running barefoot through the forest trails near his home. These formative experiences, though far from formal training, unknowingly laid the groundwork for his future career. By age 13, he began participating in local races, finishing 10th in his first half marathon in Eldoret in 2013.</p>

          <p>Kiptum's early racing years were marked by self-reliance. Without access to elite coaching or equipment, he honed his craft through sheer determination, often training alone on the rugged terrain of Chepkorio. His breakthrough came in 2018 when he won the Family Bank Eldoret Half Marathon, a victory that signaled his potential to compete at higher levels. Despite financial constraints—he could not afford proper running shoes for his early races—Kiptum's natural aptitude for pacing and endurance began attracting attention.</p>
        </GuideSection>

        {/* --- Section 2 --- */}
        <GuideSection id="global-dominance" title="From Obscurity to Global Dominance">
          <h3>The Half-Marathon Foundation</h3>
          <p>Kiptum's transition to international competition began in 2019 with a fifth-place finish at the Lisbon Half Marathon (59:54), his first race outside Kenya. Over the next two years, he competed across Europe, steadily improving his times. A pivotal moment came in December 2020 at the Valencia Half Marathon, where he clocked 58:42, then a personal best. By 2021, under the guidance of Rwandan coach Gervais Hakizimana—a former steeplechaser who had noticed Kiptum's potential during training sessions in Chepkorio—the young runner began focusing on the marathon.</p>

          <h3>Marathon Debut: Valencia 2022</h3>
          <p>In December 2022, Kiptum stunned the athletics world at the Valencia Marathon. Running his first official marathon, he finished in 2:01:53, the fastest debut in history and the fourth-fastest time ever recorded. His strategy of negative splits—running the second half faster than the first—became a hallmark of his racing style.</p>

          <blockquote>
            "I knew I had the strength to push harder in the later stages."
          </blockquote>

          <h3>London 2023: Edging Closer to History</h3>
          <p>Four months later, Kiptum shattered expectations again at the 2023 London Marathon. Despite rainy conditions, he clocked 2:01:25, missing Kipchoge's world record by just 16 seconds but solidifying his status as the sport's rising star. The race revealed his mental fortitude; as Hakizimana noted:</p>

          <blockquote>
            "He never doubted his ability to compete with the best."
          </blockquote>
        </GuideSection>

        {/* --- Section 3 --- */}
        <GuideSection id="chicago-marathon" title="The Chicago Marathon: Redefining Human Limits">
          <h3>A Record-Breaking Performance</h3>
          <p>On October 8, 2023, Kiptum achieved the unthinkable at the Chicago Marathon. Surging ahead of the pack by the 10k mark, he maintained a blistering pace of 2:51 per kilometer, crossing the finish line in 2:00:35—a 34-second improvement over Kipchoge's previous record. His second-half split of 59:47, faster than most elite half-marathon times, left analysts in awe.</p>

          <blockquote>
            "When I crossed the line, I knew I'd made history."
          </blockquote>

          <p>Kiptum admitted the sub-two-hour marathon—a goal he aimed to tackle in Rotterdam—remained elusive.</p>

          <YouTubeEmbed
            videoId="oC3_2RTzb0Q"
            title="WORLD RECORD! 23 year old phenom Kelvin Kiptum makes history at Chicago Marathon"
          />

          <h3>Controversy and Precision</h3>
          <p>The race was not without controversy. Discrepancies in mile markers, particularly a disputed 4:18 split for mile 22, prompted scrutiny. Organizers later acknowledged errors in manual timing but affirmed the overall validity of Kiptum's record. Despite these challenges, his achievement was ratified by World Athletics in February 2024, just days before his death.</p>
        </GuideSection>

        {/* --- Section 4 --- */}
        <GuideSection id="training-regimen" title="The Grueling Training Regimen">
          <p>Kiptum's success was rooted in an almost superhuman training routine. Logging 250–300 kilometers weekly—nearly double the volume of most elite marathoners—he adhered to a punishing schedule:</p>

          <ul className="achievement-list">
            <li>Morning runs: 25–28 km daily, often at altitude in Chepkorio (~2,600 m) or the Kerio Valley (~800 m).</li>
            <li>Track sessions: Fartlek workouts on Tuesdays, focusing on variable pace intervals.</li>
            <li>Long runs: 30–40 km at marathon pace every Thursday and Sunday, simulating race conditions.</li>
          </ul>

          <p>Coach Hakizimana expressed concerns about sustainability:</p>

          <blockquote>
            "The workload was immense, but Kelvin insisted on pushing further."
          </blockquote>

          <p>Yet Kiptum thrived, attributing his success to relentless discipline:</p>

          <blockquote>
            "My secret is training. Not any other thing."
          </blockquote>
        </GuideSection>

        {/* --- Section 5 --- */}
        <GuideSection id="tragic-death" title="Tragic Death and Global Mourning">
          <p>On February 11, 2024, Kiptum and Hakizimana died in a car crash near Kaptagat, Kenya. Driving a Toyota Premio, Kiptum lost control on a dirt road, veering into a ditch and striking a tree. A third passenger, marathoner Milcah Chemos, survived with injuries. The accident occurred just five days after World Athletics ratified his Chicago record, compounding the tragedy.</p>

          <h3>Tributes and Legacy</h3>
          <p>The running community mourned universally. World Athletics President Sebastian Coe called Kiptum <strong>"an incredible athlete leaving an incredible legacy"</strong>. Kenyan President William Ruto hailed him as <strong>"one of the world's finest sportsmen"</strong>. Fellow runners, including Mo Farah, lamented the loss of a generational talent: <strong>"He truly had a special talent"</strong>.</p>

          <YouTubeEmbed
            videoId="dXSDRLnnCi8"
            title="RIP Kelvin Kiptum - You will be missed - Tribute"
          />

          <p>Kiptum's death left unanswered questions about his potential. Poised to attempt a sub-two-hour marathon in Rotterdam and compete against Kipchoge at the Paris Olympics, he symbolized the future of the sport. His three marathon victories—Valencia, London, Chicago—all rank among the seven fastest in history, a feat unmatched in such a short span.</p>
        </GuideSection>

        {/* --- Section 6 --- */}
        <GuideSection id="conclusion" title="Conclusion: A Legacy Unfinished">
          <p>Kelvin Kiptum's story transcends athletics. From herding cattle in the Rift Valley to rewriting record books, he embodied the transformative power of perseverance. His training philosophy—<strong>"No human is limited"</strong>—echoed Kipchoge's mantra but carried a unique urgency, reflecting his rapid ascent.</p>

          <p>Yet his career, cut brutally short, serves as a poignant reminder of mortality's indiscriminate reach. As the marathon world grapples with his absence, Kiptum's achievements endure: a 2:00:35 record, a blueprint for audacious training, and an indelible mark on the sport's history. In the words of his coach:</p>

          <blockquote>
            "He ran like a machine, but his heart was wholly human."
          </blockquote>

          <p>The track may have lost its brightest star, but its horizon remains illuminated by the light he cast.</p>
        </GuideSection>

        {/* Disclaimer Section */}
        <div className="disclaimer-box">
          <h3>Important Disclaimer</h3>
          <p>The information provided in this article about Kelvin Kiptum is for educational and informational purposes only. While we strive for accuracy, we cannot guarantee that all information is complete or current. The training methods described were specific to an elite professional athlete with years of progressive training and should not be attempted without proper coaching and medical supervision.</p>
          <p>Always consult with healthcare professionals before beginning any new exercise program, especially one involving high training volumes or intensities. Alt.Run is not responsible for any injuries or health issues that may result from attempting to replicate the training methods described.</p>
        </div>
      </div>
    </div>
  );
}

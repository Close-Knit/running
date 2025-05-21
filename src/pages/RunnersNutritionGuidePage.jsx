// src/pages/RunnersNutritionGuidePage.jsx
import React, { useEffect, useRef } from 'react';
import GuideHeader from '../components/GuideHeader';
import TableOfContents from '../components/TableOfContents';
import GuideSection from '../components/GuideSection';
import FAQItem from '../components/FAQItem';
import SEO from '../components/SEO';
import './RunnersNutritionGuidePage.css';

export default function RunnersNutritionGuidePage() {
  const guideContentRef = useRef();

  // Set background image for the guide page
  useEffect(() => {
    const pageBackground = document.querySelector('.page-background');
    if (pageBackground) {
      pageBackground.style.backgroundImage = 'url(/images/running-nutrition.jpg)';

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
    { id: "core-principles", title: "I. Core Nutritional Principles for All Runners: The Building Blocks of Performance" },
    { id: "vegan-plant-based", title: "II. Vegan & Plant-Based Runners: Thriving on Plants" },
    { id: "food-sensitivities", title: "III. Managing Food Sensitivities & Digestive Issues: Running Comfortably" },
    { id: "meal-timing", title: "IV. Meal Timing for Performance: The Nutrient Timing Window" },
    { id: "troubleshooting", title: "V. Troubleshooting Common Nutritional Issues for Runners: Listening to Your Body" },
    { id: "meal-plans", title: "VI. Sample Meal Plan Snippets: Putting It All Together" },
    { id: "supplements", title: "VII. Key Supplements for Runners: Filling the Gaps" },
    { id: "conclusion", title: "Conclusion" }
  ];

  // Define SEO data for the guide page
  const seoData = {
    title: "The Runner's Nutrition Guide | Alt.Run",
    description: "Comprehensive nutrition guide for runners of all levels. Learn how to fuel your runs, optimize recovery, and adapt nutrition for different dietary needs and preferences.",
    canonicalUrl: "/runners-nutrition-guide",
    ogType: "article",
    keywords: [
      "runner's nutrition guide", "running nutrition", "runner's diet",
      "fueling for runners", "vegan runner nutrition", "gluten-free running",
      "pre-run meals", "post-run recovery", "runner's supplements",
      "nutrition for marathons", "hydration for runners"
    ],
    ogImage: "/images/running-nutrition.jpg",
    breadcrumbs: [
      { name: "Home", path: "/" },
      { name: "The Runner's Nutrition Guide", path: "/runners-nutrition-guide" }
    ]
  };

  return (
    <div className="guide-container nutrition-guide-container" ref={guideContentRef}>
      {/* SEO Component */}
      <SEO {...seoData} />

      <GuideHeader
        title="The Runner's Nutrition Guide"
        subtitle="The Comprehensive Runner's Nutrition Guide: Fueling Your Run, Your Way"
        intro="Nutrition is the unsung hero of every runner's journey. What you eat profoundly impacts your energy levels, how well you recover, your risk of injury, and ultimately, your enjoyment of the sport. Whether you're a seasoned marathoner or just starting out, a vegan powerhouse, navigating food sensitivities, or enjoying a standard balanced diet, understanding how to fuel your body optimally is a game-changer. This guide delves into the science and practicalities of running nutrition, offering comprehensive advice tailored to diverse needs, helping you run stronger, longer, and healthier."
      />

      <TableOfContents sections={sections} />

      <div className="guide-main-content">
        {/* Disclaimer */}
        <div className="disclaimer-box">
          <h3>Important Disclaimer:</h3>
          <p>The information in this guide is intended for educational purposes only and should not replace professional medical or nutritional advice. Always consult with healthcare professionals before making significant changes to your diet, especially if you have underlying health conditions or specific nutritional needs. Individual requirements vary based on factors including age, weight, training intensity, and health status.</p>
        </div>

        {/* --- Section 1 --- */}
        <GuideSection id="core-principles" title="I. Core Nutritional Principles for All Runners: The Building Blocks of Performance">
          <p>Regardless of your specific dietary preferences, certain nutritional fundamentals apply to all runners. Think of these as the non-negotiable pillars supporting your training.</p>

          <h3>Macronutrient Mastery: Carbs, Protein, and Fats Explained</h3>
          <p>Macronutrients are the nutrients your body needs in larger amounts, providing the energy and building blocks for everything you do, especially running.</p>

          <h4>Carbohydrates: Your Premium Fuel Source</h4>
          <p>Carbohydrates are the undisputed king of running fuel. Your body breaks them down into glucose, which is either used immediately for energy or stored as glycogen in your muscles and liver. These glycogen stores are your primary energy reserve during runs. Aim for 2.7–4.5 grams of carbohydrates per pound of body weight per day (e.g., 405-675g for a 150lb runner). The exact amount depends on your training intensity and duration.</p>

          <h4>Types of Carbs:</h4>
          <ul>
            <li><strong>Complex Carbohydrates:</strong> Found in whole grains (oats, brown rice, quinoa, whole wheat bread/pasta), starchy vegetables (sweet potatoes, potatoes, corn, peas), and legumes. These digest slowly, providing sustained energy and are packed with fiber and micronutrients. They should form the bulk of your carb intake.</li>
            <li><strong>Simple Carbohydrates:</strong> Found in fruits, honey, maple syrup, and more processed options like sports drinks and candy. These digest quickly, providing a rapid energy boost. They are useful for fueling right before or during runs, but should be consumed more sparingly otherwise.</li>
          </ul>
          <p>Timing is Key: Focus on complex carbs in your main meals and simple carbs closer to or during your runs.</p>

          <h4>Protein: The Repair and Rebuild Crew</h4>
          <p>Protein is essential for repairing muscle tissue damaged during exercise and building new muscle. While not a primary fuel source during runs, adequate protein intake is crucial for recovery and adaptation. Aim for 1.2–1.7 grams of protein per kilogram of body weight per day (e.g., 82-116g for a 68kg/150lb runner).</p>

          <h4>Quality Sources:</h4>
          <p>Include lean meats (chicken, turkey, fish), eggs, dairy products (milk, yogurt, cheese), legumes (beans, lentils, chickpeas), soy products (tofu, tempeh, edamame), nuts, and seeds.</p>

          <h4>Protein Pacing:</h4>
          <p>Spread your protein intake throughout the day, aiming for 20-40 grams per meal/snack, as your body can only absorb a certain amount at one time (around 20-25g effectively in one sitting for muscle synthesis). Consuming protein, particularly within 30-60 minutes post-run, helps kick-start the recovery process.</p>

          <h4>Fats: The Endurance Enhancer and Health Protector</h4>
          <p>Fats play a vital role in energy production (especially for longer, lower-intensity runs), hormone regulation, and the absorption of fat-soluble vitamins (A, D, E, K). Aim for 20–35% of your daily calories from healthy fats.</p>

          <h4>Healthy Choices:</h4>
          <p>Prioritize unsaturated fats found in avocados, nuts (almonds, walnuts), seeds (chia, flax, pumpkin), olive oil, and fatty fish (salmon, mackerel).</p>

          <h4>Limit These:</h4>
          <p>Reduce intake of saturated fats (found in red meat, full-fat dairy, fried foods) and try to eliminate trans fats (often in processed baked goods and margarines).</p>

          <h3>Hydration Strategy: More Than Just Quenching Thirst</h3>
          <p>Proper hydration is critical for performance, thermoregulation (keeping your body cool), preventing muscle cramps, and overall health. Dehydration can lead to fatigue, headaches, reduced blood flow to muscles, and an increased perception of effort.</p>

          <h4>Daily Hydration:</h4>
          <p>Sip water consistently throughout the day. Don't wait until you're thirsty, as that's often a late sign of dehydration.</p>

          <h4>Pre-Run Hydration:</h4>
          <p>Drink about 17–20 ounces (500-600ml) of water 2–3 hours before your run. You can have another 5-8 ounces (150-240ml) shortly before you head out.</p>

          <h4>Hydration During Runs:</h4>
          <ul>
            <li>Runs &lt; 60 minutes: Water is usually sufficient.</li>
            <li>Runs &gt; 60 minutes (or in hot/humid conditions): Drink 4–8 ounces (120-240ml) every 15–20 minutes. For these longer efforts, or if you're a heavy sweater, you'll also need to replace electrolytes.</li>
          </ul>

          <h4>Electrolytes: The Spark Plugs:</h4>
          <p>Electrolytes like sodium, potassium, magnesium, and calcium are lost through sweat and are vital for muscle function and fluid balance. Sports drinks or electrolyte tablets can help replenish these. Sodium is particularly important, with needs varying but potentially requiring 700mg or more per liter of fluid for heavy sweaters.</p>

          <h4>Post-Run Rehydration:</h4>
          <p>Aim to replace 150% of the fluid weight lost during your run. Weigh yourself before and after a run (without drinking during) to get an idea of your sweat rate. For every pound (or ~0.5kg) lost, drink about 16-24 ounces (480-720ml) of fluid.</p>
        </GuideSection>

        {/* --- Section 2 --- */}
        <GuideSection id="vegan-plant-based" title="II. Vegan & Plant-Based Runners: Thriving on Plants">
          <p>A well-planned vegan diet can absolutely support, and even enhance, athletic performance by being naturally high in carbohydrates, vitamins, minerals, and antioxidants, while typically lower in saturated fat. However, vegan runners need to be mindful of a few key nutrients.</p>

          <h3>Key Nutrients & Strategic Solutions for Vegan Runners</h3>

          <h4>Protein: Plant Powerhouses</h4>
          <p><strong>Why it's a focus:</strong> Ensuring complete protein intake (all essential amino acids) and sufficient quantity.</p>
          <p><strong>Top Sources:</strong> Tofu, tempeh, edamame (soybeans are a complete protein), lentils, chickpeas, black beans, quinoa (complete protein), seitan, spirulina, hemp seeds, pumpkin seeds, nuts, and nut butters. Combining different plant proteins throughout the day (e.g., rice and beans) helps ensure you get all essential amino acids.</p>
          <p><strong>Daily Target:</strong> 1.2-1.7 g/kg body weight, aiming for 20-40g per meal.</p>
          <p><strong>BCAAs (Branched-Chain Amino Acids):</strong> Important for muscle recovery. Good vegan sources include soy products, lentils, and oats.</p>

          <h4>Iron: Oxygen Carrier Extraordinaire</h4>
          <p><strong>Why it's a focus:</strong> Plant-based iron (non-heme) is less readily absorbed than animal-based iron (heme). Female runners are at higher risk due to menstruation. Iron is crucial for carrying oxygen to your muscles.</p>
          <p><strong>Top Sources:</strong> Lentils, chickpeas, beans, tofu, tempeh, spinach (cooked for better absorption), Swiss chard, fortified cereals, pumpkin seeds, blackstrap molasses.</p>
          <p><strong>Daily Target:</strong> 18 mg for women (pre-menopause), 8 mg for men. Vegan athletes may need slightly more due to lower absorption.</p>
          <p><strong>Absorption Tip:</strong> Consume iron-rich foods with a source of Vitamin C (e.g., bell peppers, citrus fruits, broccoli, tomatoes) to significantly enhance non-heme iron absorption. Avoid drinking tea or coffee with iron-rich meals as tannins can inhibit absorption.</p>

          <h4>Vitamin B12: Nerve and Blood Cell Health</h4>
          <p><strong>Why it's a focus:</strong> B12 is almost exclusively found in animal products. Deficiency can lead to fatigue, weakness, and nerve issues.</p>
          <p><strong>Top Sources:</strong> Fortified foods are essential for vegans. Look for fortified nutritional yeast, plant milks (soy, almond, oat), breakfast cereals, and some meat substitutes.</p>
          <p><strong>Daily Target:</strong> 2.4 mcg.</p>
          <p><strong>Supplementation:</strong> Most vegan runners will need to supplement with B12 or consistently consume fortified foods to meet their needs.</p>

          <h4>Calcium: Bone Strength and Muscle Function</h4>
          <p><strong>Why it's a focus:</strong> Essential for bone health (crucial for impact sports like running) and muscle contraction.</p>
          <p><strong>Top Sources:</strong> Fortified plant milks and yogurts, calcium-set tofu, leafy greens (kale, collard greens, bok choy - note spinach is high in oxalates which can reduce calcium absorption), broccoli, almonds, tahini, dried figs.</p>
          <p><strong>Daily Target:</strong> 1,000–1,300 mg.</p>

          <h4>Vitamin D: The Sunshine Vitamin for Bone and Muscle</h4>
          <p><strong>Why it's a focus:</strong> Important for calcium absorption, bone health, immune function, and muscle strength. Many people (vegan or not) are deficient.</p>
          <p><strong>Top Sources:</strong> Sunlight is the primary source. Food sources are limited but include fortified plant milks, fortified orange juice, and UV-exposed mushrooms.</p>
          <p><strong>Supplementation:</strong> Often recommended, especially during winter months or for those with limited sun exposure.</p>

          <h4>Omega-3 Fatty Acids: Anti-Inflammatory Allies</h4>
          <p><strong>Why it's a focus:</strong> Important for reducing inflammation, supporting heart health, and efficient oxygen use by muscles. The active forms (EPA/DHA) are mainly in fatty fish.</p>
          <p><strong>Top Sources:</strong> ALA (alpha-linolenic acid) is found in flaxseeds (ground), chia seeds, hemp seeds, and walnuts. The body can convert ALA to EPA/DHA, but the conversion rate can be low.</p>
          <p><strong>Supplementation:</strong> Algae-based EPA/DHA supplements are a direct source for vegans and are often recommended. Aim for around 250mg combined EPA/DHA daily.</p>

          <h4>Zinc: Immune Function and Metabolism</h4>
          <p><strong>Why it's a focus:</strong> Plays a role in immune function and processing macronutrients. Phytates in plant foods can reduce zinc absorption.</p>
          <p><strong>Top Sources:</strong> Legumes, tofu, tempeh, nuts, seeds (especially pumpkin and hemp), whole grains, fortified cereals.</p>
          <p><strong>Absorption Tip:</strong> Soaking, sprouting, or fermenting legumes and grains can improve zinc absorption.</p>

          <h3>Sample Vegan Runner's Day:</h3>
          <div className="meal-plan">
            <ul>
              <li><strong>Breakfast:</strong> Oatmeal cooked with fortified soy milk, topped with berries, chia seeds, walnuts, and a sprinkle of nutritional yeast.</li>
              <li><strong>Mid-Morning Snack:</strong> Apple slices with almond butter.</li>
              <li><strong>Lunch:</strong> Large salad with mixed greens, chickpeas, quinoa, bell peppers (for Vitamin C), avocado, and a tahini-lemon dressing.</li>
              <li><strong>Pre-Run Snack (if needed):</strong> A banana or a few dates.</li>
              <li><strong>Dinner:</strong> Lentil shepherd's pie with a sweet potato topping, served with steamed broccoli and kale.</li>
              <li><strong>Evening Snack:</strong> Fortified plant-based yogurt with hemp seeds.</li>
            </ul>
          </div>

          <h3>Tips for Thriving as a Vegan Runner:</h3>
          <ul>
            <li><strong>Eat a Variety:</strong> Consume a wide range of plant foods to ensure you're getting a broad spectrum of nutrients.</li>
            <li><strong>Focus on Whole Foods:</strong> Prioritize unprocessed or minimally processed foods.</li>
            <li><strong>Plan Ahead:</strong> Meal planning can be especially helpful to ensure all nutritional bases are covered.</li>
            <li><strong>Listen to Your Body:</strong> Pay attention to energy levels, recovery, and any signs of deficiency.</li>
          </ul>
        </GuideSection>

        {/* --- Section 3 --- */}
        <GuideSection id="food-sensitivities" title="III. Managing Food Sensitivities & Digestive Issues: Running Comfortably">
          <p>Digestive discomfort can turn any run into a miserable experience. For runners with food sensitivities like gluten intolerance or conditions like Irritable Bowel Syndrome (IBS), careful nutritional planning is paramount.</p>

          <h3>General Advice for Sensitive Stomachs:</h3>
          <ul>
            <li><strong>Keep a Food & Symptom Diary:</strong> Track what you eat, when you run, and any symptoms you experience. This can help identify trigger foods or patterns.</li>
            <li><strong>Timing is Everything:</strong> Avoid eating large meals or high-fiber, high-fat, or very spicy foods too close to your run (generally within 2-3 hours).</li>
            <li><strong>Hydrate Well:</strong> Dehydration can worsen digestive issues.</li>
            <li><strong>Train Your Gut:</strong> Gradually introduce small amounts of fuel and fluids during training runs to help your digestive system adapt.</li>
            <li><strong>Consult Professionals:</strong> If you suspect a food sensitivity or have persistent digestive issues, work with a doctor or registered dietitian specializing in sports nutrition or gastroenterology.</li>
          </ul>

          <h3>Gluten-Free Running: Navigating Wheat and Related Grains</h3>
          <p>For runners with celiac disease or non-celiac gluten sensitivity (NCGS), avoiding gluten (a protein found in wheat, barley, rye, and triticale) is essential.</p>

          <h4>Safe Carbohydrate Sources:</h4>
          <p>Rice (white, brown, wild), quinoa, buckwheat, corn, potatoes, sweet potatoes, certified gluten-free oats, gluten-free breads/pastas/cereals, fruits, and vegetables.</p>

          <h4>Hidden Gluten & Cross-Contamination:</h4>
          <p>Be vigilant about reading labels. Gluten can be found in unexpected places like sauces, dressings, processed meats, and even some supplements. Cross-contamination can also be an issue in kitchens or manufacturing facilities.</p>

          <h4>Race Fueling (Gluten-Free):</h4>
          <ul>
            <li>Many energy gels and chews are gluten-free (e.g., Honey Stinger, some GU flavors – always check labels).</li>
            <li>Natural options: Mashed sweet potatoes or bananas in a reusable pouch, rice cakes with honey, dried fruit (apricots, dates).</li>
          </ul>

          <h4>Nutrient Considerations:</h4>
          <p>Some gluten-free products can be lower in B vitamins and fiber. Focus on naturally gluten-free whole foods to ensure adequate nutrient intake.</p>

          <h4>Sample Gluten-Free Pre-Long Run Meal:</h4>
          <ul>
            <li>Grilled chicken breast or fish, a baked sweet potato, and a side of steamed green beans.</li>
            <li>For vegans: Large portion of quinoa with roasted vegetables and chickpeas.</li>
          </ul>

          <h3>Low-FODMAP Diet for Runners with IBS & Sensitive Stomachs</h3>
          <p>FODMAPs (Fermentable Oligosaccharides, Disaccharides, Monosaccharides, And Polyols) are short-chain carbohydrates that can be poorly absorbed in the small intestine, leading to gas, bloating, pain, and diarrhea in individuals with IBS. A low-FODMAP diet is a diagnostic tool and management strategy, best undertaken with professional guidance.</p>

          <h4>Understanding the Phases:</h4>
          <ul>
            <li><strong>Elimination Phase (2-6 weeks):</strong> Strict removal of high-FODMAP foods.</li>
            <li><strong>Reintroduction Phase:</strong> Systematically reintroduce FODMAP subgroups one by one to identify personal triggers and tolerance levels.</li>
            <li><strong>Personalization Phase:</strong> Create a modified long-term diet that limits only your specific trigger FODMAPs.</li>
          </ul>

          <h4>High-FODMAP Foods to Limit/Avoid (Examples relevant to runners):</h4>
          <ul>
            <li><strong>Oligosaccharides (Fructans & GOS):</strong> Wheat, rye, barley, onions, garlic, leeks, artichokes, asparagus, beans, lentils, chickpeas (in larger quantities).</li>
            <li><strong>Disaccharides (Lactose):</strong> Milk, yogurt, soft cheeses (unless lactose-free).</li>
            <li><strong>Monosaccharides (Fructose in excess of glucose):</strong> Honey, agave nectar, apples, pears, mangoes, watermelon, high-fructose corn syrup.</li>
            <li><strong>Polyols (Sorbitol & Mannitol):</strong> Apples, pears, stone fruits (apricots, peaches, plums), mushrooms, cauliflower, sugar-free sweeteners ending in "-ol" (sorbitol, mannitol, xylitol).</li>
          </ul>

          <h4>Low-FODMAP Alternatives for Runners:</h4>
          <ul>
            <li><strong>Carbohydrates:</strong> White rice, rice noodles, quinoa, potatoes, gluten-free oats (ensure no added chicory root), firm bananas, oranges, grapes, blueberries, strawberries.</li>
            <li><strong>Protein:</strong> Plain cooked meats/fish/poultry, eggs, firm tofu, tempeh (small servings), lactose-free dairy.</li>
            <li><strong>Fats:</strong> Olive oil, peanut butter (check for added HFCS), nuts (macadamias, pecans in small amounts).</li>
          </ul>

          <h4>Race Fueling (Low-FODMAP):</h4>
          <ul>
            <li>Some specialized low-FODMAP sports nutrition products are emerging.</li>
            <li>Homemade options: Rice cakes with maple syrup, boiled potatoes with salt, pureed carrots or sweet potatoes (small amounts).</li>
            <li>Small amounts of glucose-based gels or chews might be tolerated by some, but test carefully.</li>
          </ul>

          <h4>Hydration & Gut Health:</h4>
          <ul>
            <li>Plain water is best.</li>
            <li>An oral rehydration solution made with water, a pinch of salt, and a small amount of glucose (e.g., from maple syrup or sugar, avoiding honey/agave) can be helpful for electrolyte replacement.</li>
          </ul>

          <p><strong>Important Note:</strong> A strict low-FODMAP diet is not intended for long-term use for everyone. The goal is to identify individual triggers and expand the diet as much as possible.</p>

          <h3>Managing General Digestive Upset (Runner's Trots, Nausea)</h3>
          <ul>
            <li><strong>Fiber Timing:</strong> Avoid high-fiber meals 3-4 hours before a run. While fiber is generally healthy, too much too close to running can cause issues.</li>
            <li><strong>Fat & Protein Moderation Pre-Run:</strong> These slow digestion. Keep pre-run meals lower in fat and protein.</li>
            <li><strong>Caffeine Caution:</strong> Caffeine can be a performance enhancer but also a gut irritant for some. Test your tolerance.</li>
            <li><strong>Artificial Sweeteners:</strong> Some, especially sugar alcohols, can cause digestive distress.</li>
            <li><strong>Pre-Race Meal Consistency:</strong> Don't try anything new on race day or the day before a very important run. Stick to tried-and-true meals and snacks.</li>
            <li><strong>Reduce Exercise Intensity:</strong> If nausea occurs during a run, slowing down may help.</li>
          </ul>
        </GuideSection>

        {/* --- Section 4 --- */}
        <GuideSection id="meal-timing" title="IV. Meal Timing for Performance: The Nutrient Timing Window">
          <p>When you eat can be almost as important as what you eat, especially concerning fueling workouts and optimizing recovery.</p>

          <h3>Pre-Run Fueling: Setting Yourself Up for Success</h3>
          <p>The goal of pre-run nutrition is to top off glycogen stores, provide readily available energy, and prevent hunger without causing digestive upset.</p>

          <h4>3–4 Hours Before a Long Run or Race:</h4>
          <p><strong>Focus:</strong> A balanced meal rich in carbohydrates, moderate in protein, and relatively low in fat and fiber. This allows ample time for digestion.</p>

          <h4>Standard Diet Examples:</h4>
          <ul>
            <li>Turkey or chicken sandwich on whole wheat bread with a side of fruit.</li>
            <li>Pasta with a light tomato-based sauce and a small portion of lean protein.</li>
            <li>Oatmeal with fruit and a sprinkle of nuts.</li>
          </ul>

          <h4>Vegan Examples:</h4>
          <ul>
            <li>Large bowl of oatmeal with soy milk, banana, berries, and a tablespoon of maple syrup.</li>
            <li>Toast with avocado and a side of fruit salad.</li>
            <li>Quinoa bowl with roasted sweet potatoes, black beans (if tolerated), and a light dressing.</li>
          </ul>

          <h4>Low-FODMAP Examples:</h4>
          <ul>
            <li>Rice cakes with peanut butter and a firm banana.</li>
            <li>Scrambled eggs with gluten-free toast and a side of cantaloupe.</li>
            <li>Lactose-free yogurt with blueberries and a sprinkle of rice puffs.</li>
          </ul>

          <h4>1–2 Hours Before Any Run:</h4>
          <p><strong>Focus:</strong> A smaller, easily digestible carbohydrate-rich snack.</p>
          <p><strong>Examples:</strong> Banana, a small energy bar (check ingredients for sensitivities), a few rice cakes, a small bowl of low-fiber cereal with plant milk, a sports drink.</p>

          <h4>30–60 Minutes Before (Optional Top-Off):</h4>
          <p><strong>Focus:</strong> Very small, quick-digesting carbohydrate source if needed, especially for morning runners or high-intensity sessions.</p>
          <p><strong>Examples:</strong> A few dates, a small handful of pretzels, a sports gel or a few chews, a small glass of fruit juice diluted with water.</p>

          <h3>Fueling During Runs: Sustaining Energy on the Go (Primarily for runs &gt; 60-90 minutes)</h3>
          <p>For runs lasting longer than about 60-90 minutes, your body&apos;s glycogen stores will start to deplete. Taking in carbohydrates during the run helps maintain blood glucose levels, spares muscle glycogen, and delays fatigue.</p>

          <h4>The Guideline:</h4>
          <p>Aim for 30–60 grams of carbohydrates per hour of running after the first hour. Some highly trained endurance athletes may aim for up to 90g/hour, but this requires significant gut training.</p>

          <h4>Fueling Options (Test during training!):</h4>
          <ul>
            <li><strong>Sports Gels:</strong> Convenient, concentrated carbs (e.g., GU Energy, SiS Beta Fuel, Huma). Come in various flavors and consistencies. Some contain electrolytes and caffeine.</li>
            <li><strong>Energy Chews/Blocks:</strong> Gummy-like, provide carbs in chewable form.</li>
            <li><strong>Sports Drinks:</strong> Provide carbohydrates and electrolytes simultaneously.</li>
            <li><strong>Real Food</strong> (often preferred for ultra-distances or sensitive stomachs):
              <ul>
                <li><strong>Vegan-Friendly:</strong> Medjool dates, dried figs or apricots, bananas (can be tricky to carry), applesauce pouches (unsweetened), maple syrup in a small flask.</li>
                <li><strong>Gluten-Free:</strong> Rice balls, boiled and salted new potatoes, gluten-free pretzels.</li>
                <li><strong>Low-FODMAP</strong> (careful selection needed): Small amounts of firm banana, rice cakes, boiled potatoes, some glucose-based sports products (avoiding high fructose/polyols).</li>
              </ul>
            </li>
          </ul>

          <h4>Training Your Gut:</h4>
          <p>Just like your legs, your stomach needs training to handle fuel during exercise. Start with small amounts of carbs during longer training runs and gradually increase to find what works for you. Practice your race day fueling strategy multiple times.</p>

          <h3>Post-Run Recovery: Replenish, Repair, Rehydrate (The Critical Window)</h3>
          <p>What you consume after a run, especially a hard or long one, significantly impacts your recovery. The 30-60 minutes post-exercise is often called the "critical window" for nutrient absorption.</p>

          <h4>The 3 R's of Recovery:</h4>
          <ul>
            <li><strong>Replenish Glycogen:</strong> Consume carbohydrates to restock depleted muscle glycogen stores.</li>
            <li><strong>Repair Muscle:</strong> Include protein to help repair muscle damage and promote growth. A common recommendation is a carb-to-protein ratio of 3:1 or 4:1.</li>
            <li><strong>Rehydrate:</strong> Drink fluids and electrolytes to replace what was lost through sweat.</li>
          </ul>

          <h4>Recovery Snack/Meal Examples (within 30-60 minutes):</h4>

          <h4>Standard Diet:</h4>
          <ul>
            <li>Chocolate milk (offers a good carb/protein ratio).</li>
            <li>Greek yogurt with fruit and a sprinkle of granola.</li>
            <li>Turkey and cheese sandwich on whole wheat bread.</li>
            <li>Smoothie with fruit, yogurt/milk, and protein powder.</li>
          </ul>

          <h4>Vegan Diet:</h4>
          <ul>
            <li>Pea protein shake made with fortified plant milk and a banana.</li>
            <li>Toast with almond butter and sliced apple.</li>
            <li>Lentil soup with a piece of whole-grain bread.</li>
            <li>Soy chocolate milk.</li>
          </ul>

          <h4>Gluten-Free Diet:</h4>
          <ul>
            <li>Greek yogurt with berries and certified gluten-free granola.</li>
            <li>Rice cakes with peanut butter and a banana.</li>
            <li>Smoothie with fruit, spinach, protein powder, and almond milk.</li>
          </ul>

          <h4>Low-FODMAP Diet:</h4>
          <ul>
            <li>Lactose-free yogurt with blueberries and rice puffs.</li>
            <li>Firm banana with a handful of macadamia nuts.</li>
            <li>Scrambled eggs with a side of white rice.</li>
          </ul>
        </GuideSection>

        {/* --- Section 5 --- */}
        <GuideSection id="troubleshooting" title="V. Troubleshooting Common Nutritional Issues for Runners: Listening to Your Body">
          <p>Even with careful planning, runners can encounter nutrition-related challenges. Here's how to address some common culprits:</p>

          <table className="nutrition-table">
            <thead>
              <tr>
                <th>Symptom</th>
                <th>Potential Causes</th>
                <th>Solutions & Strategies</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><strong>Mid-Run Nausea / GI Distress</strong> (Bloating, Cramps, Diarrhea)</td>
                <td>Eating too close to run; too much fiber, fat, or protein pre-run; dehydration; high-intensity exercise diverting blood from gut; specific food intolerances (e.g., lactose, gluten, FODMAPs); swallowing air; some sports nutrition products.</td>
                <td>Experiment with pre-run meal timing and composition (lower fiber/fat). Ensure adequate hydration. "Train your gut" with small amounts of fuel during runs. Avoid new foods before important runs. Consider low-FODMAP if IBS is suspected. Slow pace if nausea hits.</td>
              </tr>
              <tr>
                <td><strong>"Hitting the Wall" / Bonking / Extreme Fatigue</strong></td>
                <td>Depleted glycogen stores (ran out of fuel); inadequate carbohydrate intake before or during long runs; starting too fast; dehydration.</td>
                <td>Ensure adequate carbohydrate loading before long races. Consume 30-60g carbs per hour during runs &gt;90 mins. Practice fueling strategy. Start at a conservative pace. Stay hydrated. Increase daily carb intake to 2.7-4.5g/lb.</td>
              </tr>
              <tr>
                <td><strong>Muscle Cramps</strong></td>
                <td>Dehydration; electrolyte imbalance (low sodium, potassium, magnesium); muscle fatigue; overexertion; poor conditioning; sometimes nutrient deficiencies (calcium, magnesium).</td>
                <td>Ensure proper hydration with electrolytes, especially sodium. Consume foods rich in potassium (bananas, sweet potatoes, spinach) and magnesium (nuts, seeds, leafy greens). Stretch regularly. Don't increase mileage/intensity too quickly. Some find pickle juice helps acutely.</td>
              </tr>
              <tr>
                <td><strong>Heavy Legs / Muscle Fatigue</strong></td>
                <td>Overtraining/lack of recovery; dehydration; electrolyte imbalance; insufficient carbohydrate intake (low glycogen); dietary deficiencies (e.g., iron, Vitamin D, B-vitamins, magnesium); poor circulation; poor running form.</td>
                <td>Ensure adequate rest and recovery. Optimize hydration and electrolyte intake. Ensure sufficient daily carbohydrate intake. Consider testing for nutrient deficiencies (iron, Vit D). Incorporate dynamic warm-ups and cool-downs. Improve running form.</td>
              </tr>
            </tbody>
          </table>
        </GuideSection>

        {/* --- Section 6 --- */}
        <GuideSection id="meal-plans" title="VI. Sample Meal Plan Snippets: Putting It All Together">
          <p>These are illustrative examples. Individual calorie and macronutrient needs will vary.</p>

          <h3>Example Day for a Runner on a Standard Diet (Training Moderately):</h3>
          <div className="meal-plan">
            <ul>
              <li><strong>Breakfast:</strong> Oatmeal with berries, walnuts, and a dollop of Greek yogurt.</li>
              <li><strong>Mid-Morning Snack:</strong> Apple with peanut butter.</li>
              <li><strong>Lunch:</strong> Large salad with mixed greens, grilled chicken, quinoa, assorted vegetables, and an olive oil-based dressing.</li>
              <li><strong>Pre-Run Snack</strong> (if afternoon run): Banana or a small energy bar.</li>
              <li><strong>Dinner:</strong> Baked salmon, roasted sweet potatoes, and steamed broccoli.</li>
              <li><strong>Evening Snack:</strong> Cottage cheese with sliced peaches.</li>
            </ul>
          </div>

          <h3>Example Day for a Vegan Runner (Training Moderately):</h3>
          <div className="meal-plan">
            <ul>
              <li><strong>Breakfast:</strong> Tofu scramble with spinach and nutritional yeast, served with a slice of whole-grain toast and avocado.</li>
              <li><strong>Mid-Morning Snack:</strong> Soy yogurt with chia seeds and berries.</li>
              <li><strong>Lunch:</strong> Lentil and vegetable soup with a side of whole-grain crackers and hummus.</li>
              <li><strong>Pre-Run Snack</strong> (if afternoon run): A couple of Medjool dates.</li>
              <li><strong>Dinner:</strong> Chickpea curry with brown rice and a side of steamed kale.</li>
              <li><strong>Evening Snack:</strong> Apple slices with sunflower seed butter.</li>
            </ul>
          </div>

          <h3>Example Day for a Gluten-Free Runner (Training Moderately):</h3>
          <div className="meal-plan">
            <ul>
              <li><strong>Breakfast:</strong> Smoothie made with Greek yogurt (or GF plant-based yogurt), spinach, banana, GF protein powder, and almond milk.</li>
              <li><strong>Mid-Morning Snack:</strong> Rice cakes with almond butter.</li>
              <li><strong>Lunch:</strong> Large salad with mixed greens, grilled fish or tofu, quinoa, cucumber, tomatoes, and a lemon-tahini dressing.</li>
              <li><strong>Pre-Run Snack</strong> (if afternoon run): A small bowl of berries.</li>
              <li><strong>Dinner:</strong> Chicken breast stir-fried with broccoli, carrots, and snap peas (using tamari instead of soy sauce), served with rice noodles.</li>
              <li><strong>Evening Snack:</strong> Hard-boiled eggs.</li>
            </ul>
          </div>

          <h3>Example Day for a Runner on a Low-FODMAP Diet (Elimination/Careful Reintroduction Phase):</h3>
          <div className="meal-plan">
            <ul>
              <li><strong>Breakfast:</strong> Scrambled eggs with spinach (cooked), served with a side of white rice and a few strawberries.</li>
              <li><strong>Mid-Morning Snack:</strong> A firm banana or a handful of macadamia nuts.</li>
              <li><strong>Lunch:</strong> Plain grilled chicken breast with baked potato (no skin if sensitive) and steamed carrots.</li>
              <li><strong>Pre-Run Snack</strong> (if afternoon run): A rice cake with a thin layer of peanut butter.</li>
              <li><strong>Dinner:</strong> Baked cod with roasted zucchini and bell peppers (small serving, if tolerated), served with quinoa.</li>
              <li><strong>Evening Snack:</strong> Lactose-free yogurt with blueberries.</li>
            </ul>
          </div>
        </GuideSection>

        {/* --- Section 7 --- */}
        <GuideSection id="supplements" title="VII. Key Supplements for Runners: Filling the Gaps">
          <p>While a food-first approach is always best, some supplements can be beneficial for runners, especially those with dietary restrictions or increased needs. Always consult with a healthcare professional or registered dietitian before starting any new supplement.</p>

          <h3>Vitamin D:</h3>
          <ul>
            <li><strong>Why:</strong> Crucial for bone health (calcium absorption), muscle function, immune support, and recovery. Deficiency is common.</li>
            <li><strong>Who might benefit:</strong> Most runners, especially those in northern latitudes, with limited sun exposure, or darker skin.</li>
            <li><strong>Sources:</strong> Sunlight, oily fish, egg yolks, fortified foods (milk, plant milks, cereals).</li>
            <li><strong>Supplementation:</strong> Often 1,000–2,000 IU/day, but dosage should be based on blood levels.</li>
          </ul>

          <h3>Iron:</h3>
          <ul>
            <li><strong>Why:</strong> Essential for oxygen transport in red blood cells and energy production. Deficiency leads to fatigue and impaired performance.</li>
            <li><strong>Who might benefit:</strong> Female runners (due to menstruation), vegan/vegetarian runners, runners with heavy sweat losses, or those diagnosed with iron-deficiency anemia.</li>
            <li><strong>Sources:</strong> Red meat, liver, poultry, fish, lentils, beans, spinach, fortified cereals.</li>
            <li><strong>Supplementation:</strong> Only if diagnosed with a deficiency via blood test and under medical guidance, as excess iron can be harmful.</li>
          </ul>

          <h3>Vitamin B12:</h3>
          <ul>
            <li><strong>Why:</strong> Vital for nerve function, red blood cell formation, and DNA synthesis.</li>
            <li><strong>Who might benefit:</strong> Primarily vegan runners, as B12 is almost exclusively in animal products. Some older adults may also have absorption issues.</li>
            <li><strong>Sources:</strong> Meat, fish, dairy, eggs. For vegans: fortified nutritional yeast, plant milks, cereals.</li>
            <li><strong>Supplementation:</strong> Usually necessary for vegans (typically 25-100 mcg daily or 1000-2000 mcg 1-2 times per week).</li>
          </ul>

          <h3>Omega-3 Fatty Acids (EPA & DHA):</h3>
          <ul>
            <li><strong>Why:</strong> Anti-inflammatory properties, may aid recovery, support cardiovascular health, and improve oxygen utilization.</li>
            <li><strong>Who might benefit:</strong> All runners, especially those who don't regularly consume oily fish. Vegans need a plant-based source.</li>
            <li><strong>Sources:</strong> Oily fish (salmon, mackerel, sardines). Plant sources of ALA (flax, chia, walnuts) which converts inefficiently to EPA/DHA.</li>
            <li><strong>Supplementation:</strong> Fish oil supplements. For vegans, algae-based EPA/DHA supplements (e.g., 250-500mg combined EPA/DHA daily).</li>
          </ul>

          <h3>Magnesium:</h3>
          <ul>
            <li><strong>Why:</strong> Involved in energy production, muscle contraction, nerve function, and bone health. May play a role in preventing muscle cramps, though evidence for supplementation is mixed.</li>
            <li><strong>Who might benefit:</strong> Athletes may have higher needs due to sweat losses. Those with diets low in magnesium-rich foods.</li>
            <li><strong>Sources:</strong> Green leafy vegetables, nuts (almonds, cashews), seeds (pumpkin, chia), whole grains, beans, dark chocolate.</li>
            <li><strong>Supplementation:</strong> If dietary intake is low or deficiency is suspected, a moderate supplement (200-400mg) might be considered.</li>
          </ul>

          <h3>Probiotics:</h3>
          <ul>
            <li><strong>Why:</strong> May support gut health, which can be challenged by endurance training. Some strains might reduce GI distress or support immune function.</li>
            <li><strong>Who might benefit:</strong> Runners experiencing frequent digestive issues or looking to support gut immunity.</li>
            <li><strong>Sources:</strong> Fermented foods (yogurt with live cultures, kefir, sauerkraut, kimchi, tempeh, miso).</li>
            <li><strong>Supplementation:</strong> Highly strain-specific; research is ongoing. Consult a professional.</li>
          </ul>

          <h3>Creatine Monohydrate (Less common for endurance, but some benefits):</h3>
          <ul>
            <li><strong>Why:</strong> Primarily known for strength/power, but some research suggests it may aid in recovery, glycogen loading, and reducing muscle damage in endurance athletes.</li>
            <li><strong>Who might benefit:</strong> Runners incorporating significant strength training or looking for marginal gains in recovery and high-intensity burst capacity.</li>
            <li><strong>Supplementation:</strong> Typically 3-5g daily. Requires adequate hydration.</li>
          </ul>
        </GuideSection>

        {/* --- Conclusion --- */}
        <GuideSection id="conclusion" title="Conclusion">
          <p>Nutrition for runners is a dynamic and personal field. What works brilliantly for one person might not suit another. The key is to build a solid foundation based on whole foods, experiment carefully with timing and specific food choices during training (never on race day!), and listen intently to your body's signals. By fueling intelligently and thoughtfully, you'll not only enhance your performance but also foster a healthier, more resilient, and more enjoyable running life.</p>

          <p>For help planning your runs and tracking your nutritional journey alongside your training, check out tools like alt.run's training planner.</p>

          <p>Run strong, eat smart, and embrace the journey!</p>

          <div className="disclaimer-box">
            <h3>Important Disclaimer:</h3>
            <p>The information in this guide is intended for educational purposes only and should not replace professional medical or nutritional advice. Always consult with healthcare professionals before making significant changes to your diet, especially if you have underlying health conditions or specific nutritional needs. Individual requirements vary based on factors including age, weight, training intensity, and health status.</p>
          </div>

          <div className="guide-footer">
            <img src="/logo-glow.webp" alt="Alt.Run Logo" className="guide-logo" />
          </div>
        </GuideSection>
      </div>
    </div>
  );
}

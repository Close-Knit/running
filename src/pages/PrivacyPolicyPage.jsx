// src/pages/PrivacyPolicyPage.jsx
import { useEffect } from 'react';
import SEO from '../components/SEO';
import './LegalPages.css';

function PrivacyPolicyPage() {
  // Set the background image for the privacy policy page
  useEffect(() => {
    const pageBackground = document.querySelector('.page-background');
    if (pageBackground) {
      pageBackground.style.backgroundImage = 'url(/images/running-plan.jpg)';
    }

    // Scroll to top when page loads
    window.scrollTo(0, 0);
  }, []);

  // SEO data
  const seoData = {
    title: "Privacy Policy | Alt.Run",
    description: "Privacy policy for Alt.Run website and running plan generator service.",
    canonicalUrl: "/privacy-policy", // Fixed to use canonicalUrl instead of canonical
    ogType: "website",
    keywords: [
      "privacy policy", "alt.run privacy", "running website privacy",
      "data protection", "user privacy"
    ]
  };

  return (
    <div className="privacy-policy-page">
      {/* Use the SEO component instead of direct Helmet usage */}
      <SEO {...seoData} />

      <div className="privacy-container">
        <h1>Privacy Policy for Alt.Run</h1>
        <p>Last Updated: {new Date().toLocaleDateString()}</p>

        <p>Alt.Run ("us", "we", or "our") operates the https://alt.run website and the Alt.Run Running Plan Generator (hereinafter referred to as the "Service").</p>
        <p>This page informs you of our policies regarding the collection, use, and disclosure of personal data when you use our Service and the choices you have associated with that data.</p>
        <p>We use your data to provide and improve the Service. By using the Service, you agree to the collection and use of information in accordance with this policy.</p>

        <h2>1. Information Collection and Use</h2>
        <p>We collect several different types of information for various purposes to provide and improve our Service to you.</p>
        <h3>Types of Data Collected</h3>
        <h4>a. Personal Data for Plan Generation</h4>
        <p>While using our Running Plan Generator, we ask you to provide us with certain personally identifiable information that is used to create your personalized running plan. This information includes:</p>
        <ul>
          <li>Demographics (Biological sex, Age, Weight, Height)</li>
          <li>Training History (Current weekly mileage, Recent race times, Injury history)</li>
          <li>Goal Configuration (Race type/distance, Target date, Optimization focus)</li>
          <li>Lifestyle Factors (Available days/week, Preferred workout types, Equipment access)</li>
        </ul>
        <p>This data is used solely for the purpose of generating your running plan. The generated plan data, including these inputs, is stored in our database linked to a unique plan ID.</p>

        <h4>b. Email Address (Optional)</h4>
        <p>If you choose to save your plan or receive it via email, we will collect your email address. This email address is used to:</p>
        <ul>
          <li>Send you a magic link to access your saved plan.</li>
          <li>Associate your generated plan(s) with your email for future access.</li>
          <li>(If you opt-in separately in the future) Send you updates or information related to Alt.Run. We will not send marketing emails without your explicit consent.</li>
        </ul>
        <p>Our authentication services, including magic links, are provided by Supabase. Their privacy policy may also apply.</p>

        <h4>c. Usage Data (Future Consideration)</h4>
        <p>We may in the future collect information on how the Service is accessed and used ("Usage Data"). This Usage Data may include information such as your computer's Internet Protocol address (e.g. IP address), browser type, browser version, the pages of our Service that you visit, the time and date of your visit, the time spent on those pages, unique device identifiers and other diagnostic data. This will be used to improve the service.</p>

        <h4>d. Cookies Data (Future Consideration)</h4>
        <p>We may in the future use cookies and similar tracking technologies to track the activity on our Service and we hold certain information. If we implement this, we will update this policy and provide cookie consent mechanisms as required by law.</p>

        <h2>2. Use of Data</h2>
        <p>Alt.Run uses the collected data for various purposes:</p>
        <ul>
          <li>To provide and maintain our Service (generate and display your running plan).</li>
          <li>To allow you to save and access your plan via email (if you provide your email).</li>
          <li>To allow you to utilize features such as PDF download and ICS calendar export.</li>
          <li>To gather analysis or valuable information so that we can improve our Service (primarily from anonymized or aggregated data in the future).</li>
          <li>To monitor the usage of our Service (in the future).</li>
          <li>To detect, prevent and address technical issues.</li>
        </ul>

        <h2>3. Data Storage and Security</h2>
        <p>Your plan data (including the inputs you provided and the generated schedule) is stored in our database hosted by Supabase. If you provide an email address, it is stored in connection with your plan(s) and in Supabase's authentication system.</p>
        <p>The security of your data is important to us but remember that no method of transmission over the Internet or method of electronic storage is 100% secure. While we strive to use commercially acceptable means to protect your Personal Data, we cannot guarantee its absolute security.</p>

        <h2>4. Data Retention</h2>
        <p>We will retain your plan data as long as it is necessary for the purposes set out in this Privacy Policy or until you request its deletion (see "Your Data Protection Rights").</p>

        <h2>5. Disclosure Of Data</h2>
        <p>We will not sell, rent, or share your Personal Data with third parties for their marketing purposes without your explicit consent.</p>
        <p>We may disclose your Personal Data in the good faith belief that such action is necessary to:</p>
        <ul>
          <li>To comply with a legal obligation.</li>
          <li>To protect and defend the rights or property of Alt.Run.</li>
          <li>To prevent or investigate possible wrongdoing in connection with the Service.</li>
          <li>To protect the personal safety of users of the Service or the public.</li>
          <li>To protect against legal liability.</li>
        </ul>

        <h2>6. Your Data Protection Rights</h2>
        <p>Depending on your location, you may have certain data protection rights. Alt.Run aims to take reasonable steps to allow you to correct, amend, delete, or limit the use of your Personal Data.</p>
        <p>If you wish to be informed what Personal Data we hold about you and if you want it to be removed from our systems, please contact us at info@alt.run. We may ask you to verify your identity before responding to such requests.</p>
        <p>For plans saved with an email address, you are identified by that email. For anonymously generated plans not saved with an email, it may be difficult to identify specific data as yours without the unique plan ID.</p>

        <h2>7. Service Providers</h2>
        <p>We use Supabase for backend services including database hosting and authentication. Supabase has its own privacy policy regarding the data they process on our behalf.</p>

        <h2>8. Links to Other Sites</h2>
        <p>Our Service may contain links to other sites that are not operated by us (e.g., social media share links). If you click a third party link, you will be directed to that third party's site. We strongly advise you to review the Privacy Policy of every site you visit. We have no control over and assume no responsibility for the content, privacy policies or practices of any third party sites or services.</p>

        <h2>9. Children's Privacy</h2>
        <p>Our Service does not address anyone under the age of 13 ("Children"). We do not knowingly collect personally identifiable information from anyone under the age of 13. If you are a parent or guardian and you are aware that your Child has provided us with Personal Data, please contact us. If we become aware that we have collected Personal Data from children without verification of parental consent, we take steps to remove that information from our servers.</p>

        <h2>10. Changes to This Privacy Policy</h2>
        <p>We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the "Last Updated" date at the top of this Privacy Policy.</p>
        <p>You are advised to review this Privacy Policy periodically for any changes. Changes to this Privacy Policy are effective when they are posted on this page.</p>

        <h2>11. Contact Us</h2>
        <p>If you have any questions about this Privacy Policy, please contact us:</p>
        <p>By email: alt.run.official@proton.me</p>
      </div>
    </div>
  );
}

export default PrivacyPolicyPage;


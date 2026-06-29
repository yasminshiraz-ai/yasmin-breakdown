import styles from './page.module.css'

export const metadata = {
  title: 'Privacy Policy — The Yasmin Breakdown',
  description: 'Privacy policy for The Yasmin Breakdown, operated by Still Eye Rise Media, LLC.',
}

export default function PrivacyPolicyPage() {
  return (
    <div className={styles.page}>
      <div className={styles.container}>

        <h1 className={styles.heading}>Privacy Policy</h1>
        <p className={styles.effective}>Effective Date: June 29, 2026</p>

        <p className={styles.intro}>
          This Privacy Policy describes how <strong>The Yasmin Breakdown</strong>, operated by
          Still Eye Rise Media, LLC (&ldquo;we,&rdquo; &ldquo;us,&rdquo; or &ldquo;our&rdquo;),
          collects, uses, and shares information when you visit our website at
          yasminbreakdown.com (&ldquo;the Site&rdquo;). By using the Site, you agree to the
          terms of this Privacy Policy.
        </p>

        <section className={styles.section}>
          <h2 className={styles.sectionHeading}>1. Information We Collect</h2>
          <p>We may collect the following types of information:</p>
          <ul className={styles.list}>
            <li>
              <strong>Information you provide directly:</strong> When you fill out our contact
              form or sign up for our newsletter, we collect your name, email address, and
              any message content you submit.
            </li>
            <li>
              <strong>Automatically collected information:</strong> When you visit the Site,
              we automatically collect certain information about your device, including your
              IP address, browser type, operating system, referring URLs, pages visited, and
              the date and time of your visit.
            </li>
            <li>
              <strong>Cookies and tracking data:</strong> We use cookies and similar tracking
              technologies to enhance your experience on the Site. See our Cookies section
              below for more detail.
            </li>
          </ul>
        </section>

        <section className={styles.section}>
          <h2 className={styles.sectionHeading}>2. How We Use Your Information</h2>
          <p>We use the information we collect to:</p>
          <ul className={styles.list}>
            <li>Operate, maintain, and improve the Site</li>
            <li>Respond to your contact form inquiries and messages</li>
            <li>Send you our newsletter and editorial updates (with your consent)</li>
            <li>Analyze how visitors use the Site to improve content and user experience</li>
            <li>Serve relevant advertising through third-party ad networks</li>
            <li>Comply with applicable legal obligations</li>
          </ul>
        </section>

        <section className={styles.section}>
          <h2 className={styles.sectionHeading}>3. Google AdSense and Third-Party Advertising</h2>
          <p>
            We use Google AdSense to display advertisements on the Site. Google and its
            partners may use cookies and web beacons to serve ads based on your prior visits
            to this website and other websites on the internet.
          </p>
          <p>
            Google&rsquo;s use of advertising cookies enables it and its partners to serve ads
            based on your visit to this site and/or other sites on the internet. You may opt
            out of personalized advertising by visiting{' '}
            <a href="https://www.google.com/settings/ads" target="_blank" rel="noopener noreferrer" className={styles.link}>
              Google Ads Settings
            </a>
            {' '}or by visiting{' '}
            <a href="https://www.aboutads.info" target="_blank" rel="noopener noreferrer" className={styles.link}>
              www.aboutads.info
            </a>.
          </p>
          <p>
            Third-party vendors, including Google, use cookies to serve ads based on a
            user&rsquo;s prior visits to our website. For more information about how Google
            uses data collected through advertising, please visit{' '}
            <a href="https://policies.google.com/technologies/partner-sites" target="_blank" rel="noopener noreferrer" className={styles.link}>
              Google&rsquo;s Privacy &amp; Terms
            </a>.
          </p>
        </section>

        <section className={styles.section}>
          <h2 className={styles.sectionHeading}>4. Cookies and Tracking Technologies</h2>
          <p>
            We use cookies — small text files stored on your device — to help us understand
            how you use our Site and to deliver a better experience. Cookies we use include:
          </p>
          <ul className={styles.list}>
            <li>
              <strong>Essential cookies:</strong> Necessary for the Site to function correctly.
            </li>
            <li>
              <strong>Analytics cookies:</strong> Used by Google Analytics to collect
              anonymous usage data such as pages visited and time spent on the Site.
            </li>
            <li>
              <strong>Advertising cookies:</strong> Placed by Google AdSense and other
              advertising partners to serve relevant ads.
            </li>
          </ul>
          <p>
            You can control or disable cookies through your browser settings. Please note
            that disabling cookies may affect the functionality of certain parts of the Site.
          </p>
        </section>

        <section className={styles.section}>
          <h2 className={styles.sectionHeading}>5. Google Analytics</h2>
          <p>
            We use Google Analytics to understand how visitors interact with the Site.
            Google Analytics collects information such as how often users visit the Site,
            what pages they visit, and what other sites they used prior to coming to the Site.
            We use this information only to improve the Site.
          </p>
          <p>
            Google Analytics collects only the IP address assigned to you on the date you
            visit the Site, rather than your name or other identifying information. We do not
            combine the information collected through Google Analytics with personally
            identifiable information. You may opt out of Google Analytics by installing the{' '}
            <a href="https://tools.google.com/dlpage/gaoptout" target="_blank" rel="noopener noreferrer" className={styles.link}>
              Google Analytics Opt-out Browser Add-on
            </a>.
          </p>
        </section>

        <section className={styles.section}>
          <h2 className={styles.sectionHeading}>6. MailerLite — Email Newsletter</h2>
          <p>
            We use MailerLite to manage our email newsletter. When you sign up for our
            newsletter, your name and email address are transmitted to and stored by
            MailerLite on servers located in the European Union and/or the United States.
          </p>
          <p>
            MailerLite may use this information to send you our newsletter and to track
            email engagement metrics such as open rates and click rates. You can unsubscribe
            from our newsletter at any time by clicking the &ldquo;unsubscribe&rdquo; link
            at the bottom of any email we send, or by emailing us at{' '}
            <a href="mailto:team@yasminbreakdown.com" className={styles.link}>
              team@yasminbreakdown.com
            </a>.
          </p>
          <p>
            MailerLite&rsquo;s privacy policy is available at{' '}
            <a href="https://www.mailerlite.com/legal/privacy-policy" target="_blank" rel="noopener noreferrer" className={styles.link}>
              mailerlite.com/legal/privacy-policy
            </a>.
          </p>
        </section>

        <section className={styles.section}>
          <h2 className={styles.sectionHeading}>7. Contact Form Data</h2>
          <p>
            When you submit our contact form, we collect your name, email address, and
            message content. This information is used solely to respond to your inquiry.
            Contact form submissions are processed through Netlify Forms and are stored
            securely. We do not sell or share your contact form data with third parties.
          </p>
        </section>

        <section className={styles.section}>
          <h2 className={styles.sectionHeading}>8. Third-Party Links</h2>
          <p>
            The Site may contain links to third-party websites, including social media
            platforms, YouTube, Patreon, and Apple Podcasts. These third-party sites have
            their own privacy policies, and we do not accept any responsibility or liability
            for their policies or practices. We encourage you to review the privacy policy
            of any third-party site you visit.
          </p>
        </section>

        <section className={styles.section}>
          <h2 className={styles.sectionHeading}>9. Children&rsquo;s Privacy (COPPA)</h2>
          <p>
            The Site is not directed at children under the age of 13, and we do not
            knowingly collect personal information from children under 13. If we become
            aware that we have collected personal information from a child under 13 without
            parental consent, we will take steps to delete that information promptly.
          </p>
          <p>
            If you believe we may have collected information from or about a child under 13,
            please contact us at{' '}
            <a href="mailto:team@yasminbreakdown.com" className={styles.link}>
              team@yasminbreakdown.com
            </a>.
          </p>
        </section>

        <section className={styles.section}>
          <h2 className={styles.sectionHeading}>10. Data Retention</h2>
          <p>
            We retain personal information only for as long as necessary to fulfill the
            purposes for which it was collected, or as required by law. Newsletter
            subscribers&rsquo; data is retained until you unsubscribe. Contact form
            submissions are retained for a reasonable period to allow us to respond to
            your inquiry.
          </p>
        </section>

        <section className={styles.section}>
          <h2 className={styles.sectionHeading}>11. Your Rights</h2>
          <p>
            Depending on your location, you may have certain rights regarding your personal
            information, including the right to access, correct, or delete information we
            hold about you. To exercise any of these rights, please contact us at{' '}
            <a href="mailto:team@yasminbreakdown.com" className={styles.link}>
              team@yasminbreakdown.com
            </a>.
          </p>
        </section>

        <section className={styles.section}>
          <h2 className={styles.sectionHeading}>12. Changes to This Privacy Policy</h2>
          <p>
            We may update this Privacy Policy from time to time to reflect changes in our
            practices or for legal, operational, or regulatory reasons. When we make
            changes, we will update the &ldquo;Effective Date&rdquo; at the top of this
            page. We encourage you to review this Privacy Policy periodically to stay
            informed about how we protect your information.
          </p>
        </section>

        <section className={styles.section}>
          <h2 className={styles.sectionHeading}>13. Contact Us</h2>
          <p>
            If you have any questions, concerns, or requests regarding this Privacy Policy
            or our data practices, please contact us:
          </p>
          <div className={styles.contactBlock}>
            <p><strong>Still Eye Rise Media, LLC</strong></p>
            <p>Operating: The Yasmin Breakdown</p>
            <p>
              Email:{' '}
              <a href="mailto:team@yasminbreakdown.com" className={styles.link}>
                team@yasminbreakdown.com
              </a>
            </p>
            <p>Website: yasminbreakdown.com</p>
          </div>
        </section>

      </div>
    </div>
  )
}

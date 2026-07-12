import styles from '../privacy-policy/page.module.css'

export const metadata = {
  title: 'Terms of Service — Yasmin Breakdown',
  description: 'Terms of Service for Yasmin Breakdown, operated by Still Eye Rise Media, LLC.',
}

export default function TermsPage() {
  return (
    <div className={styles.page}>
      <div className={styles.container}>

        <h1 className={styles.heading}>Terms of Service</h1>
        <p className={styles.effective}>Last updated: June 30, 2026</p>

        <section className={styles.section}>
          <h2 className={styles.sectionHeading}>1. Acceptance of Terms</h2>
          <p>
            By accessing or using yasminbreakdown.com (&ldquo;the Site&rdquo;), operated by
            Still Eye Rise Media, LLC, you agree to these Terms of Service. If you do not
            agree, please do not use the Site.
          </p>
        </section>

        <section className={styles.section}>
          <h2 className={styles.sectionHeading}>2. Content Ownership</h2>
          <p>
            All articles, videos, graphics, logos, and original content on this Site are the
            property of Still Eye Rise Media, LLC unless otherwise credited. You may share
            links to our content but may not republish, reproduce, or distribute our articles
            or videos in full without written permission.
          </p>
        </section>

        <section className={styles.section}>
          <h2 className={styles.sectionHeading}>3. User Conduct</h2>
          <p>
            If the Site allows comments or user submissions, you agree not to post content
            that is unlawful, harassing, defamatory, or infringes on the rights of others.
            We reserve the right to remove content and restrict access at our discretion.
          </p>
        </section>

        <section className={styles.section}>
          <h2 className={styles.sectionHeading}>4. Affiliate Links &amp; Sponsored Content</h2>
          <p>
            This Site may contain affiliate links, meaning we may earn a commission if you
            make a purchase through them, at no additional cost to you. Sponsored content,
            when present, will be clearly disclosed as such.
          </p>
        </section>

        <section className={styles.section}>
          <h2 className={styles.sectionHeading}>5. Membership &amp; Patreon</h2>
          <p>
            Access to certain content or perks through Patreon or similar membership
            platforms is subject to the terms of that platform in addition to these Terms.
            Membership tiers, pricing, and perks are subject to change with reasonable notice.
          </p>
        </section>

        <section className={styles.section}>
          <h2 className={styles.sectionHeading}>6. Purchases</h2>
          <p>
            Any digital products, books, or merchandise sold through this Site or linked
            third-party stores (including Etsy) are subject to the refund and delivery
            policies stated at the point of sale.
          </p>
        </section>

        <section className={styles.section}>
          <h2 className={styles.sectionHeading}>7. No Professional Advice</h2>
          <p>
            Content on this Site is for informational and entertainment purposes only.
            Nothing on this Site constitutes legal, financial, medical, or professional advice.
          </p>
        </section>

        <section className={styles.section}>
          <h2 className={styles.sectionHeading}>8. Disclaimer of Warranties</h2>
          <p>
            The Site is provided &ldquo;as is&rdquo; without warranties of any kind, express
            or implied. We do not guarantee the accuracy, completeness, or timeliness of content.
          </p>
        </section>

        <section className={styles.section}>
          <h2 className={styles.sectionHeading}>9. Limitation of Liability</h2>
          <p>
            Still Eye Rise Media, LLC shall not be liable for any indirect, incidental, or
            consequential damages arising from your use of the Site.
          </p>
        </section>

        <section className={styles.section}>
          <h2 className={styles.sectionHeading}>10. Changes to These Terms</h2>
          <p>
            We may update these Terms from time to time. Continued use of the Site after
            changes constitutes acceptance of the updated Terms.
          </p>
        </section>

        <section className={styles.section}>
          <h2 className={styles.sectionHeading}>11. Contact</h2>
          <p>Questions about these Terms can be sent to:</p>
          <div className={styles.contactBlock}>
            <p><strong>Still Eye Rise Media, LLC</strong></p>
            <p>Operating: Yasmin Breakdown</p>
            <p>
              Email:{' '}
              <a href="mailto:team@yasminbreakdown.com" className={styles.link}>
                team@yasminbreakdown.com
              </a>
            </p>
          </div>
        </section>

      </div>
    </div>
  )
}

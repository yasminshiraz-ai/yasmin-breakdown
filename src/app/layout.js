import { Montserrat, Inter } from 'next/font/google'
import Script from 'next/script'
import './globals.css'
import BreakingNewsTicker from '@/components/BreakingNewsTicker/BreakingNewsTicker'
import Header from '@/components/Header/Header'
import SecondaryNav from '@/components/SecondaryNav/SecondaryNav'
import PatreonBanner from '@/components/PatreonBanner/PatreonBanner'
import Footer from '@/components/Footer/Footer'
import { getAllArticles } from '@/lib/articles'

const inter = Inter({
  subsets: ['latin'],
  weight: ['400', '600'],
  variable: '--font-inter',
  display: 'swap',
})

const montserrat = Montserrat({
  subsets: ['latin'],
  weight: ['700', '800'],
  variable: '--font-montserrat',
  display: 'swap',
})

export async function generateMetadata() {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://yasminbreakdown.com'
  const articles = getAllArticles()
  const ogImage = '/images/logo-og.png'

  return {
    metadataBase: new URL(siteUrl),
    title: {
      default: 'Sports News | Entertainment News | Culture Commentary | YasminBreakdown.com',
      template: '%s | Yasmin Breakdown',
    },
    description: 'Sociological analysis of sports, music, TV & film, love, and history by Yasmin Shiraz.',
    openGraph: {
      siteName: 'Yasmin Breakdown',
      type: 'website',
      images: [{ url: ogImage }],
    },
    twitter: {
      card: 'summary_large_image',
      images: [ogImage],
    },
  }
}

export default async function RootLayout({ children }) {
  const articles = getAllArticles()
  const tickerHeadlines = articles.slice(0, 8).map(a => a.title)
  const patreonUrl = process.env.PATREON_URL || 'https://patreon.com/c/yasminshiraz'

  return (
    <html lang="en" className={`${inter.variable} ${montserrat.variable}`}>
      <body>
        <Script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-7535265627912146"
          crossOrigin="anonymous"
          strategy="afterInteractive"
        />

        {/* Netlify Identity redirect — required for Decap CMS /admin login */}
        <Script
          src="https://identity.netlify.com/v1/netlify-identity-widget.js"
          strategy="afterInteractive"
        />
        <Script id="netlify-identity-redirect" strategy="afterInteractive">{`
          if (window.netlifyIdentity) {
            window.netlifyIdentity.on("init", user => {
              if (!user) {
                window.netlifyIdentity.on("login", () => {
                  document.location.href = "/admin/";
                });
              }
            });
          }
        `}</Script>
        <BreakingNewsTicker headlines={tickerHeadlines} />
        <Header patreonUrl={patreonUrl} />
        <SecondaryNav />
        <main>{children}</main>
        <PatreonBanner patreonUrl={patreonUrl} />
        <Footer />
      </body>
    </html>
  )
}

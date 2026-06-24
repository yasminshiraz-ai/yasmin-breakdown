import { Barlow, Barlow_Condensed } from 'next/font/google'
import Script from 'next/script'
import './globals.css'
import BreakingNewsTicker from '@/components/BreakingNewsTicker/BreakingNewsTicker'
import Header from '@/components/Header/Header'
import PatreonBanner from '@/components/PatreonBanner/PatreonBanner'
import Footer from '@/components/Footer/Footer'
import { getAllArticles } from '@/lib/articles'

const barlow = Barlow({
  subsets: ['latin'],
  weight: ['400', '600', '700'],
  variable: '--font-barlow',
  display: 'swap',
})

const barlowCondensed = Barlow_Condensed({
  subsets: ['latin'],
  weight: ['900'],
  variable: '--font-barlow-condensed',
  display: 'swap',
})

export const metadata = {
  title: {
    default: 'The Yasmin Breakdown — With Sociological Analysis',
    template: '%s | The Yasmin Breakdown',
  },
  description: 'Sociological analysis of sports, music, TV & film, love, and history by Yasmin Shiraz.',
  openGraph: {
    siteName: 'The Yasmin Breakdown',
    type: 'website',
  },
}

export default async function RootLayout({ children }) {
  const articles = getAllArticles()
  const tickerHeadlines = articles.slice(0, 8).map(a => a.title)
  const patreonUrl = process.env.PATREON_URL || '#'

  return (
    <html lang="en" className={`${barlow.variable} ${barlowCondensed.variable}`}>
      <body>
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
        <main>{children}</main>
        <PatreonBanner patreonUrl={patreonUrl} />
        <Footer />
      </body>
    </html>
  )
}

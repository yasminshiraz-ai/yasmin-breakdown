'use client'

export default function TrackedLink({ href, eventLabel, children, ...props }) {
  function handleClick() {
    if (typeof window !== 'undefined' && typeof window.gtag === 'function') {
      window.gtag('event', 'amazon_click', {
        event_category: 'outbound_link',
        event_label: eventLabel,
        link_url: href,
      })
    }
  }

  return (
    <a href={href} onClick={handleClick} {...props}>
      {children}
    </a>
  )
}

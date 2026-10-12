/**
 * The questions and answers a page shows, once more as data a search engine can read (schema.org
 * FAQPage). It takes the same list the page renders, so it can never say more than the page does.
 */
export function FaqJsonLd({ items }: { items: readonly { q: string; a: string }[] }) {
  const data = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map(({ q, a }) => ({ "@type": "Question", name: q, acceptedAnswer: { "@type": "Answer", text: a } })),
  };
  // "<" is escaped so no answer can close the script element.
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\\u003c") }} />;
}

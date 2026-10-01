import { Link } from 'react-router-dom';
import { ArrowRight, ChevronDown } from 'lucide-react';

const questions = [
  { q: 'How do I find the right gear for my sport?', a: 'Browse the product collection and review each item’s description and available details. If you are unsure about a specific item, send us a message through the Contact page before ordering.' },
  { q: 'Can I change or cancel an order?', a: 'Orders are submitted for processing after checkout. Contact our team as soon as possible with your order information; changes depend on the order’s processing status.' },
  { q: 'Where can I find delivery details?', a: 'Available shipping methods, costs, and delivery estimates are shown during checkout when provided for your order.' },
  { q: 'What if an item does not work out?', a: 'Return and exchange eligibility can depend on the product and its condition. Please review the Returns page and contact us before sending anything back.' },
  { q: 'How do I check an order I have already placed?', a: 'Sign in and open your Dashboard to view the order history available for your account.' },
  { q: 'Do I need an account to shop?', a: 'You can browse the store without signing in. Creating an account lets you access the order history associated with your login.' },
];

const FAQ = () => (
  <main className="min-h-[65vh]">
    <section className="border-b border-border/60 bg-muted/30">
      <div className="container mx-auto px-4 py-16 md:py-20">
        <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-primary">A little help</p>
        <h1 className="text-4xl font-display font-bold md:text-5xl">Frequently asked questions</h1>
        <p className="mt-4 max-w-2xl text-muted-foreground">Quick answers to common questions about shopping, orders, delivery, and returns.</p>
      </div>
    </section>
    <section className="container mx-auto max-w-4xl px-4 py-12 md:py-16">
      <div className="divide-y divide-border border-y border-border">
        {questions.map(({ q, a }) => (
          <details key={q} className="group py-5">
            <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-left font-semibold [&::-webkit-details-marker]:hidden">
              {q}<ChevronDown className="h-5 w-5 shrink-0 text-muted-foreground transition-transform group-open:rotate-180" />
            </summary>
            <p className="max-w-3xl pt-4 leading-relaxed text-muted-foreground">{a}</p>
          </details>
        ))}
      </div>
      <div className="mt-10 flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
        <p className="text-muted-foreground">Still need a hand?</p>
        <Link to="/contact" className="inline-flex items-center gap-2 font-semibold text-primary hover:underline">Contact our team <ArrowRight className="h-4 w-4" /></Link>
      </div>
    </section>
  </main>
);

export default FAQ;
import { Link } from 'react-router-dom';
import { ArrowRight, ChevronDown, HelpCircle, MessageSquare } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ThreeDTilt } from '@/components/ThreeDTilt';

const questions = [
  { q: 'How do I choose the correct gear or size for my sport?', a: 'Every product page features detailed specifications, sizing guidance, and technical notes. If you are debating between two shoe or apparel sizes, our support team can advise based on standard athletic fits.' },
  { q: 'Are all products 100% genuine original brands?', a: 'Yes. SportZone only partners directly with authorized manufacturers (Nike, Wilson, Garmin, Under Armour, Babolat, etc.). Every item ships with genuine brand packaging and manufacturer warranties.' },
  { q: 'What payment methods do you support?', a: 'We offer Cash on Delivery (COD) as our primary zero-risk payment method, letting you inspect the parcel before paying. Sandbox and card integration options can also be enabled via merchant credentials.' },
  { q: 'How does free shipping work?', a: 'Orders of $50 or more qualify automatically for free standard ground shipping. For orders under $50, a flat nominal delivery fee of $4.99 is applied at checkout.' },
  { q: 'How can I track my active order?', a: 'Once you place an order, you can sign in to your SportZone Dashboard to view real-time tracking statuses: pending, processing, shipped, or delivered.' },
  { q: 'What is your return and exchange policy?', a: 'We provide a 30-day return and exchange trial for items in unworn, original condition with tags attached. Size exchanges are processed swiftly without repeat shipping fees.' },
];

const FAQ = () => (
  <main className="min-h-screen py-8">
    <section className="border-b border-border/60 bg-muted/20">
      <div className="container mx-auto px-4 py-14">
        <p className="mb-2 text-xs font-semibold uppercase tracking-widest text-primary">
          Athlete Knowledge Base
        </p>
        <h1 className="text-4xl font-display font-bold md:text-5xl">Frequently Asked Questions</h1>
        <p className="mt-3 max-w-2xl text-muted-foreground text-base">
          Got questions about our athletic collections, shipping timelines, or sizing? Find instant answers below.
        </p>
      </div>
    </section>

    <section className="container mx-auto max-w-4xl px-4 py-12 md:py-16">
      <ThreeDTilt depth="subtle">
        <div className="glass rounded-3xl p-6 md:p-8 border border-border/50 shadow-xl space-y-4">
          <div className="flex items-center gap-2 text-primary font-semibold text-sm mb-4">
            <HelpCircle className="w-5 h-5" /> General Store Guidance
          </div>
          <div className="divide-y divide-border/60">
            {questions.map(({ q, a }) => (
              <details key={q} className="group py-5">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-left font-semibold text-foreground hover:text-primary transition-colors [&::-webkit-details-marker]:hidden">
                  {q}
                  <ChevronDown className="h-5 w-5 shrink-0 text-muted-foreground transition-transform group-open:rotate-180" />
                </summary>
                <p className="max-w-3xl pt-3 text-sm leading-relaxed text-muted-foreground">{a}</p>
              </details>
            ))}
          </div>
        </div>
      </ThreeDTilt>

      <div className="mt-12 p-6 glass rounded-2xl border border-border/50 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <MessageSquare className="w-6 h-6 text-primary" />
          <div>
            <h4 className="font-semibold text-foreground text-sm">Still have questions?</h4>
            <p className="text-xs text-muted-foreground">Our team of athlete consultants is ready to help.</p>
          </div>
        </div>
        <Link to="/contact">
          <Button variant="outline" size="sm" className="gap-2">
            Contact Support <ArrowRight className="h-4 w-4" />
          </Button>
        </Link>
      </div>
    </section>
  </main>
);

export default FAQ;
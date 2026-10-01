import { Link, useLocation } from 'react-router-dom';
import { ArrowRight, PackageCheck, RefreshCcw, ShieldCheck, Truck, RotateCcw } from 'lucide-react';
import { ThreeDTilt } from '@/components/ThreeDTilt';

const Shipping = () => {
  const isReturns = useLocation().pathname === '/returns';
  const title = isReturns ? 'Returns & Exchanges Policy' : 'Athletic Shipping & Delivery';
  const intro = isReturns
    ? 'Need to return or exchange sports gear? Review our 30-day athlete trial conditions and return instructions.'
    : 'We deliver tournament and pro-grade sports merchandise nationwide with tracked courier options.';

  return (
    <main className="min-h-screen py-8">
      <section className="border-b border-border/60 bg-muted/20">
        <div className="container mx-auto px-4 py-14">
          <p className="mb-2 text-xs font-semibold uppercase tracking-widest text-primary">
            Store Policies & Support
          </p>
          <h1 className="text-4xl font-display font-bold md:text-5xl">{title}</h1>
          <p className="mt-3 max-w-2xl text-muted-foreground text-base">{intro}</p>
        </div>
      </section>

      <section className="container mx-auto max-w-5xl px-4 py-12 md:py-16">
        <div className="grid gap-10 md:grid-cols-[1fr_0.75fr] items-start">
          <div className="space-y-6">
            {isReturns ? (
              <>
                <ThreeDTilt depth="subtle">
                  <article className="glass p-6 rounded-2xl border border-border/50 space-y-3">
                    <RefreshCcw className="h-6 w-6 text-primary" />
                    <h2 className="text-xl font-bold text-foreground">30-Day Athlete Guarantee</h2>
                    <p className="leading-relaxed text-sm text-muted-foreground">
                      If your footwear, apparel, or equipment doesn't fit right or match expectations, initiate a return within 30 days of arrival in unworn condition with original tags.
                    </p>
                  </article>
                </ThreeDTilt>

                <ThreeDTilt depth="subtle">
                  <article className="glass p-6 rounded-2xl border border-border/50 space-y-3">
                    <RotateCcw className="h-6 w-6 text-primary" />
                    <h2 className="text-xl font-bold text-foreground">Fast Size Exchanges</h2>
                    <p className="leading-relaxed text-sm text-muted-foreground">
                      Need a half-size up or different colorway? Contact our team with your Order ID, and we'll arrange an exchange without repeat shipping fees.
                    </p>
                  </article>
                </ThreeDTilt>
              </>
            ) : (
              <>
                <ThreeDTilt depth="subtle">
                  <article className="glass p-6 rounded-2xl border border-border/50 space-y-3">
                    <Truck className="h-6 w-6 text-primary" />
                    <h2 className="text-xl font-bold text-foreground">Free Delivery Over $50</h2>
                    <p className="leading-relaxed text-sm text-muted-foreground">
                      Orders of $50 or more automatically qualify for 100% Free Standard Ground Delivery. Orders under $50 are delivered for a flat fee of $4.99.
                    </p>
                  </article>
                </ThreeDTilt>

                <ThreeDTilt depth="subtle">
                  <article className="glass p-6 rounded-2xl border border-border/50 space-y-3">
                    <PackageCheck className="h-6 w-6 text-primary" />
                    <h2 className="text-xl font-bold text-foreground">Tracked Doorstep Courier</h2>
                    <p className="leading-relaxed text-sm text-muted-foreground">
                      Every shipment includes end-to-end tracking accessible via your dashboard. Typical transit time is 2 to 4 business days.
                    </p>
                  </article>
                </ThreeDTilt>
              </>
            )}
          </div>

          <ThreeDTilt depth="medium">
            <aside className="glass p-6 rounded-3xl border border-border/60 shadow-lg space-y-4">
              <ShieldCheck className="h-8 w-8 text-primary" />
              <h2 className="text-xl font-bold text-foreground">Athlete Support Guarantee</h2>
              <p className="text-sm leading-relaxed text-muted-foreground">
                All equipment is checked for tournament specifications and authentic manufacturer serials before leaving our fulfillment hub.
              </p>
              <div className="flex flex-col gap-3 pt-3 border-t border-border/40">
                <Link to="/contact" className="inline-flex items-center gap-2 text-sm font-semibold text-primary hover:underline">
                  Contact Support <ArrowRight className="h-4 w-4" />
                </Link>
                <Link to="/faq" className="inline-flex items-center gap-2 text-sm font-semibold text-primary hover:underline">
                  Read FAQs <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </aside>
          </ThreeDTilt>
        </div>
      </section>
    </main>
  );
};

export default Shipping;
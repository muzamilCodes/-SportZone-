import { Link, useLocation } from 'react-router-dom';
import { ArrowRight, PackageCheck, RefreshCcw, ShieldCheck } from 'lucide-react';

const Shipping = () => {
  const isReturns = useLocation().pathname === '/returns';
  const title = isReturns ? 'Returns & exchanges' : 'Shipping information';
  const intro = isReturns
    ? 'Need to return or exchange something? Check the details for your order before sending an item back.'
    : 'Delivery options and timing can vary by item and destination. Check the available details at checkout.';

  return (
    <main className="min-h-[65vh]">
      <section className="border-b border-border/60 bg-muted/30">
        <div className="container mx-auto px-4 py-16 md:py-20">
          <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-primary">The details</p>
          <h1 className="text-4xl font-display font-bold md:text-5xl">{title}</h1>
          <p className="mt-4 max-w-2xl text-muted-foreground">{intro}</p>
        </div>
      </section>
      <section className="container mx-auto max-w-5xl px-4 py-12 md:py-16">
        <div className="grid gap-10 md:grid-cols-[1fr_0.72fr]">
          <div className="space-y-9">
            {isReturns ? <>
              <article className="border-t-2 border-primary/40 pt-5"><RefreshCcw className="mb-4 h-6 w-6 text-primary" /><h2 className="mb-2 text-xl font-semibold">Before you return an item</h2><p className="leading-relaxed text-muted-foreground">Return eligibility, time limits, and item condition requirements depend on the product and order. Please contact the shop before shipping a return so you can confirm the correct next steps.</p></article>
              <article className="border-t border-border pt-5"><h2 className="mb-2 text-xl font-semibold">Exchanges</h2><p className="leading-relaxed text-muted-foreground">If you need a different size or item, contact us with your order details. We’ll confirm what options are available for your purchase.</p></article>
              <article className="border-t border-border pt-5"><h2 className="mb-2 text-xl font-semibold">Refund timing</h2><p className="leading-relaxed text-muted-foreground">Any refund timing and method will be confirmed once the return has been reviewed and approved.</p></article>
            </> : <>
              <article className="border-t-2 border-primary/40 pt-5"><PackageCheck className="mb-4 h-6 w-6 text-primary" /><h2 className="mb-2 text-xl font-semibold">Delivery options</h2><p className="leading-relaxed text-muted-foreground">Available delivery methods, charges, and estimated arrival dates are presented during checkout when they are available for your order.</p></article>
              <article className="border-t border-border pt-5"><h2 className="mb-2 text-xl font-semibold">Order progress</h2><p className="leading-relaxed text-muted-foreground">Sign in and visit your Dashboard to check the order information currently available for your account.</p></article>
              <article className="border-t border-border pt-5"><h2 className="mb-2 text-xl font-semibold">Need a hand?</h2><p className="leading-relaxed text-muted-foreground">If your order is delayed or your delivery details need attention, contact us and include your order number.</p></article>
            </>}
          </div>
          <aside className="h-fit border-l-2 border-primary/30 pl-6 md:pl-8">
            <ShieldCheck className="mb-5 h-7 w-7 text-primary" />
            <h2 className="mb-3 text-xl font-semibold">Not sure what applies?</h2>
            <p className="mb-6 text-sm leading-relaxed text-muted-foreground">Your order confirmation and the product details are the best place to start. Our FAQs may also help.</p>
            <div className="flex flex-col items-start gap-4">
              <Link to="/contact" className="inline-flex items-center gap-2 text-sm font-semibold text-primary hover:underline">Contact the team <ArrowRight className="h-4 w-4" /></Link>
              <Link to="/faq" className="inline-flex items-center gap-2 text-sm font-semibold text-primary hover:underline">Read FAQs <ArrowRight className="h-4 w-4" /></Link>
            </div>
          </aside>
        </div>
      </section>
    </main>
  );
};

export default Shipping;
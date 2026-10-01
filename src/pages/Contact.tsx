import { useState } from 'react';
import { CheckCircle2, Mail, MessageCircle, Send } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Contact = () => {
  const [ready, setReady] = useState(false);

  return (
    <main className="min-h-[65vh]">
      <section className="border-b border-border/60 bg-muted/30">
        <div className="container mx-auto px-4 py-16 md:py-20">
          <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-primary">We’re here to help</p>
          <h1 className="text-4xl font-display font-bold md:text-5xl">Let’s talk sport.</h1>
          <p className="mt-4 max-w-2xl text-muted-foreground">Questions about a product or an order? Leave a note and our team can follow up once contact messaging is connected.</p>
        </div>
      </section>
      <section className="container mx-auto grid max-w-6xl gap-12 px-4 py-12 md:grid-cols-[0.8fr_1.2fr] md:py-16">
        <div className="space-y-8">
          <div>
            <h2 className="mb-2 text-xl font-semibold">A real person, not a playbook.</h2>
            <p className="text-sm leading-relaxed text-muted-foreground">Tell us what you need help with. Include your order number if your question is about a purchase.</p>
          </div>
          <div className="flex items-start gap-4 border-t border-border pt-5">
            <MessageCircle className="mt-1 h-5 w-5 text-primary" />
            <div><h3 className="font-semibold">Product & order questions</h3><p className="mt-1 text-sm text-muted-foreground">Share a few details so we can point you in the right direction.</p></div>
          </div>
          <div className="flex items-start gap-4 border-t border-border pt-5">
            <Mail className="mt-1 h-5 w-5 text-primary" />
            <div><h3 className="font-semibold">No email address listed</h3><p className="mt-1 text-sm text-muted-foreground">We haven’t received a support email address for this shop yet.</p></div>
          </div>
        </div>
        <form className="space-y-5" onSubmit={(event) => { event.preventDefault(); setReady(true); }}>
          <div className="grid gap-5 sm:grid-cols-2">
            <label className="space-y-2 text-sm font-medium">Your name<input required name="name" autoComplete="name" className="h-12 w-full rounded-md border border-input bg-background px-4 text-foreground outline-none transition focus:ring-2 focus:ring-ring" placeholder="Name" /></label>
            <label className="space-y-2 text-sm font-medium">Email address<input required type="email" name="email" autoComplete="email" className="h-12 w-full rounded-md border border-input bg-background px-4 text-foreground outline-none transition focus:ring-2 focus:ring-ring" placeholder="you@example.com" /></label>
          </div>
          <label className="block space-y-2 text-sm font-medium">What can we help with?<select name="topic" className="h-12 w-full rounded-md border border-input bg-background px-4 text-foreground outline-none transition focus:ring-2 focus:ring-ring"><option>Product question</option><option>Order support</option><option>Shipping or returns</option><option>Something else</option></select></label>
          <label className="block space-y-2 text-sm font-medium">Your message<textarea required name="message" rows={5} className="w-full resize-y rounded-md border border-input bg-background p-4 text-foreground outline-none transition focus:ring-2 focus:ring-ring" placeholder="Tell us a little more…" /></label>
          <Button type="submit" className="gap-2"><Send className="h-4 w-4" /> Prepare message</Button>
          {ready && <p role="status" className="flex items-start gap-2 text-sm text-muted-foreground"><CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-primary" />Your message is ready, but direct message delivery has not been connected yet. Please use the shop’s published contact details when available.</p>}
        </form>
      </section>
    </main>
  );
};

export default Contact;
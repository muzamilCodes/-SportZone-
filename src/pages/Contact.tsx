import { useState } from 'react';
import { CheckCircle2, Mail, MessageCircle, Send, Phone, MapPin } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ThreeDTilt } from '@/components/ThreeDTilt';

const Contact = () => {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <main className="min-h-screen py-10">
      <section className="border-b border-border/60 bg-muted/20">
        <div className="container mx-auto px-4 py-14">
          <p className="mb-2 text-xs font-semibold uppercase tracking-widest text-primary">
            Athlete Support Team
          </p>
          <h1 className="text-4xl font-display font-bold md:text-5xl">
            Let’s Talk Sport.
          </h1>
          <p className="mt-3 max-w-2xl text-muted-foreground text-base">
            Have questions regarding gear sizing, stock availability, or an active order? Reach out to our athlete support specialists.
          </p>
        </div>
      </section>

      <section className="container mx-auto grid max-w-6xl gap-12 px-4 py-12 md:grid-cols-[0.9fr_1.1fr] md:py-16 items-start">
        {/* Contact Info */}
        <div className="space-y-6">
          <ThreeDTilt depth="subtle">
            <div className="glass p-6 rounded-2xl border border-border/50 space-y-6">
              <h2 className="text-xl font-bold text-foreground">Dedicated Athlete Support</h2>
              <p className="text-sm text-muted-foreground leading-relaxed">
                We're committed to helping you choose the right gear for your sport, fit, and training goals.
              </p>

              <div className="space-y-4 pt-2 border-t border-border/40">
                <div className="flex items-start gap-3">
                  <Mail className="w-5 h-5 text-primary mt-0.5" />
                  <div>
                    <h3 className="font-semibold text-sm">Email Inquiries</h3>
                    <p className="text-xs text-muted-foreground">support@sportzone.store</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Phone className="w-5 h-5 text-primary mt-0.5" />
                  <div>
                    <h3 className="font-semibold text-sm">Customer Helpline</h3>
                    <p className="text-xs text-muted-foreground">+1 (800) 555-SPORT (Mon–Fri, 9am–7pm)</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-primary mt-0.5" />
                  <div>
                    <h3 className="font-semibold text-sm">Headquarters</h3>
                    <p className="text-xs text-muted-foreground">SportZone Athletic Center, 500 Championship Way</p>
                  </div>
                </div>
              </div>
            </div>
          </ThreeDTilt>
        </div>

        {/* Message Form */}
        <ThreeDTilt depth="subtle">
          <form
            onSubmit={handleSubmit}
            className="glass rounded-3xl p-6 md:p-8 space-y-5 border border-border/50 shadow-xl"
          >
            <h2 className="text-xl font-bold text-foreground mb-4">Send a Message</h2>

            <div className="grid gap-4 sm:grid-cols-2">
              <label className="space-y-1.5 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                Your Name *
                <input
                  required
                  name="name"
                  className="h-11 w-full rounded-xl border border-input bg-background px-4 text-foreground outline-none text-sm transition focus:ring-2 focus:ring-primary/20"
                  placeholder="Alex Morgan"
                />
              </label>

              <label className="space-y-1.5 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                Email Address *
                <input
                  required
                  type="email"
                  name="email"
                  className="h-11 w-full rounded-xl border border-input bg-background px-4 text-foreground outline-none text-sm transition focus:ring-2 focus:ring-primary/20"
                  placeholder="alex@example.com"
                />
              </label>
            </div>

            <label className="block space-y-1.5 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              Inquiry Topic
              <select
                name="topic"
                className="h-11 w-full rounded-xl border border-input bg-background px-4 text-foreground outline-none text-sm transition focus:ring-2 focus:ring-primary/20"
              >
                <option>Gear & Sizing Questions</option>
                <option>Order Status & Tracking</option>
                <option>Shipping & Returns</option>
                <option>Wholesale & Bulk Teams</option>
              </select>
            </label>

            <label className="block space-y-1.5 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              Your Message *
              <textarea
                required
                name="message"
                rows={4}
                className="w-full resize-y rounded-xl border border-input bg-background p-4 text-foreground outline-none text-sm transition focus:ring-2 focus:ring-primary/20"
                placeholder="Let us know how we can assist your athletic training..."
              />
            </label>

            <Button type="submit" variant="gradient" size="lg" className="gap-2 shadow-md">
              <Send className="h-4 w-4" /> Send Message
            </Button>

            {submitted && (
              <div role="status" className="p-3.5 rounded-xl bg-primary/10 border border-primary/20 flex items-start gap-2.5 text-xs text-foreground">
                <CheckCircle2 className="h-4 w-4 shrink-0 text-primary mt-0.5" />
                <span>Thank you! Your message has been received. Our athlete support team will get back to you within 24 hours.</span>
              </div>
            )}
          </form>
        </ThreeDTilt>
      </section>
    </main>
  );
};

export default Contact;
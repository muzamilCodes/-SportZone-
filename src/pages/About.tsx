import { Link } from 'react-router-dom';
import { ArrowRight, Dumbbell, Heart, MoveUpRight, Trophy, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ThreeDTilt } from '@/components/ThreeDTilt';

const values = [
  { icon: Heart, title: 'Made for the Love of Sport', text: 'The best gear is the gear that gets you out the door, into the arena, and back to doing what you love.' },
  { icon: Trophy, title: 'Every Athlete Belongs', text: 'From rookie starters to veteran marathoners chasing personal bests, find essentials crafted for your pace.' },
  { icon: MoveUpRight, title: 'Engineered for Performance', text: 'Tournament-ready fabrics and equipment designed to help you train hard, recover fast, and excel tomorrow.' },
];

const About = () => (
  <div className="min-h-screen">
    {/* Hero Banner */}
    <section className="relative min-h-[460px] flex items-end overflow-hidden bg-foreground text-background">
      <img
        src="https://images.unsplash.com/photo-1517649763962-0c623266ddc0?w=1800&h=1000&fit=crop"
        alt="Athletes training at sunset"
        className="absolute inset-0 h-full w-full object-cover opacity-60"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-foreground/95 via-foreground/40 to-transparent" />
      <div className="relative container mx-auto px-4 pb-16 pt-32">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary/20 backdrop-blur-md text-primary text-xs font-semibold mb-3 border border-primary/30">
          <Sparkles className="w-3.5 h-3.5" /> The SportZone Legacy
        </div>
        <h1 className="max-w-3xl text-5xl font-display font-extrabold leading-tight md:text-6xl text-white">
          Built For The Passion of The Game.
        </h1>
        <p className="mt-4 max-w-xl text-lg text-white/80">
          Sport is more than a trophy. It’s early morning drills, team camaraderie, and the daily drive to outdo your previous best.
        </p>
      </div>
    </section>

    {/* Mission Grid */}
    <section className="container mx-auto grid gap-12 px-4 py-16 md:grid-cols-[1fr_1.1fr] md:items-center md:py-24">
      <div>
        <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10 text-primary border border-primary/20">
          <Dumbbell className="h-7 w-7" />
        </div>
        <p className="mb-2 text-xs font-semibold uppercase tracking-widest text-primary">
          Our Purpose
        </p>
        <h2 className="text-3xl font-display font-bold md:text-4xl">
          Elite Gear. Authentic Passion.
        </h2>
      </div>
      <div className="space-y-4 text-muted-foreground leading-relaxed text-base">
        <p>
          SportZone is built by athletes for athletes. We curate professional sports equipment, performance textiles, and smart fitness instruments so athletes can focus purely on their sport without second-guessing their gear.
        </p>
        <p>
          We believe high performance begins with reliable, verified equipment. Whether training for your first half-marathon or playing recreational basketball on weekends, SportZone equips you with the best.
        </p>
        <Link to="/products" className="inline-flex items-center gap-2 pt-2 font-semibold text-primary hover:underline">
          Browse Pro Gear <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
    </section>

    {/* 3D Value Cards */}
    <section className="border-y border-border/60 bg-muted/20 py-16 md:py-24">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-xl mx-auto mb-12">
          <h2 className="text-3xl font-display font-bold mb-3">Our Core Principles</h2>
          <p className="text-muted-foreground text-sm">What drives the SportZone standard across every product</p>
        </div>
        <div className="grid gap-6 md:grid-cols-3">
          {values.map(({ icon: Icon, title, text }) => (
            <ThreeDTilt key={title} depth="subtle">
              <article className="glass p-8 rounded-3xl border border-border/50 h-full flex flex-col justify-between shadow-sm">
                <div>
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary mb-6 border border-primary/20">
                    <Icon className="h-6 w-6" />
                  </div>
                  <h3 className="mb-3 text-xl font-bold text-foreground">{title}</h3>
                  <p className="text-sm leading-relaxed text-muted-foreground">{text}</p>
                </div>
              </article>
            </ThreeDTilt>
          ))}
        </div>
      </div>
    </section>

    {/* Bottom CTA */}
    <div className="container mx-auto flex flex-col items-start justify-between gap-6 px-4 py-16 sm:flex-row sm:items-center">
      <div>
        <h3 className="text-2xl font-display font-bold">Ready to elevate your training?</h3>
        <p className="text-sm text-muted-foreground mt-1">Explore our full line of tournament footwear, apparel, and hardware.</p>
      </div>
      <Link to="/products">
        <Button variant="gradient" size="xl" className="gap-2 shadow-lg">
          Explore SportZone Gear <ArrowRight className="h-4 w-4" />
        </Button>
      </Link>
    </div>
  </div>
);

export default About;
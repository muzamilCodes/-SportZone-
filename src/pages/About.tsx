import { Link } from 'react-router-dom';
import { ArrowRight, Dumbbell, Heart, MoveUpRight, Trophy } from 'lucide-react';
import { Button } from '@/components/ui/button';

const values = [
  { icon: Heart, title: 'Made for the love of sport', text: 'The best gear is the gear that gets you out the door and back to doing what you love.' },
  { icon: Trophy, title: 'Every level belongs', text: 'New to the game or chasing a personal best, find essentials for your own pace.' },
  { icon: MoveUpRight, title: 'Keep moving forward', text: 'Practical picks to help you train, play, recover, and show up again tomorrow.' },
];

const About = () => (
  <div className="min-h-screen">
    <section className="relative min-h-[420px] flex items-end overflow-hidden bg-foreground text-background">
      <img src="https://images.unsplash.com/photo-1530549387789-4c1017266635?w=1800&h=1000&fit=crop" alt="Athlete swimming through clear water" className="absolute inset-0 h-full w-full object-cover opacity-65" />
      <div className="absolute inset-0 bg-gradient-to-t from-foreground/90 via-foreground/30 to-transparent" />
      <div className="relative container mx-auto px-4 pb-14 pt-32">
        <p className="mb-4 text-sm font-semibold uppercase tracking-widest text-background/75">The SportZone story</p>
        <h1 className="max-w-3xl text-5xl font-display font-bold leading-tight md:text-6xl">For the joy of the game.</h1>
        <p className="mt-5 max-w-xl text-lg text-background/80">Sport is more than a finish line. It’s the first practice, the weekend match, and every small win in between.</p>
      </div>
    </section>

    <section className="container mx-auto grid gap-12 px-4 py-16 md:grid-cols-[1fr_1.1fr] md:items-center md:py-24">
      <div>
        <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary"><Dumbbell className="h-6 w-6" /></div>
        <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-primary">Why we’re here</p>
        <h2 className="text-3xl font-display font-bold md:text-4xl">Good gear. More game.</h2>
      </div>
      <div className="space-y-4 text-muted-foreground leading-relaxed">
        <p>SportZone is a sports shop for people who want to move more, play harder, and enjoy the journey. We bring sports essentials together in one place so it’s easier to find what fits your sport and your routine.</p>
        <p>We believe getting started matters as much as getting faster. Every athlete has a different reason to play—and every one of them deserves to feel at home here.</p>
        <Link to="/products" className="inline-flex items-center gap-2 pt-2 font-semibold text-primary hover:underline">Find your gear <ArrowRight className="h-4 w-4" /></Link>
      </div>
    </section>

    <section className="border-y border-border/60 bg-muted/30">
      <div className="container mx-auto grid gap-8 px-4 py-14 md:grid-cols-3 md:py-20">
        {values.map(({ icon: Icon, title, text }) => (
          <article key={title} className="border-t-2 border-primary/40 pt-5">
            <Icon className="mb-5 h-6 w-6 text-primary" />
            <h3 className="mb-2 text-xl font-semibold">{title}</h3>
            <p className="text-sm leading-relaxed text-muted-foreground">{text}</p>
          </article>
        ))}
      </div>
    </section>
    <div className="container mx-auto flex flex-col items-start justify-between gap-4 px-4 py-12 sm:flex-row sm:items-center">
      <p className="text-2xl font-display font-bold">Your next session starts here.</p>
      <Link to="/products"><Button className="gap-2">Explore sports gear <ArrowRight className="h-4 w-4" /></Button></Link>
    </div>
  </div>
);

export default About;
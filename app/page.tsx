
import React, { useMemo, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  Mic,
  FileAudio,
  Sparkles,
  Wand2,
  BookOpen,
  ShieldCheck,
  Download,
  CheckCircle2,
  ArrowRight,
  Quote,
  PlayCircle,
  Mail,
  Phone,
  MapPin,
  Menu,
  X,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

/**
 * ReadyWrite — single-file landing page
 * - Tailwind styling
 * - Shadcn UI components
 * - Framer Motion animations
 *
 * How to customize quickly:
 * - Search for BRAND and update name/colors/copy
 * - Update PRICING tiers
 * - Replace placeholder demo/video and testimonials
 * - Wire up CTA buttons + form submission
 */

const BRAND = {
  name: "ReadyWrite",
  tagline: "Turn your voice into a book—without losing your voice.",
  subtag:
    "Record. Transcribe. Auto-structure chapters. Edit with AI that keeps your tone and message.",
  ctaPrimary: "Start Free",
  ctaSecondary: "Watch Demo",
};

const NAV = [
  { label: "How it works", href: "#how" },
  { label: "Features", href: "#features" },
  { label: "Pricing", href: "#pricing" },
  { label: "Examples", href: "#examples" },
  { label: "FAQ", href: "#faq" },
];

const FEATURES = [
  {
    icon: Mic,
    title: "Voice-first writing",
    desc: "Capture ideas fast by speaking naturally—no blank page intimidation.",
  },
  {
    icon: Sparkles,
    title: "Voice-preserving edits",
    desc: "Clean grammar and flow while keeping your tone, rhythm, and meaning.",
  },
  {
    icon: BookOpen,
    title: "Auto chapters & structure",
    desc: "Organizes long recordings into headings, sections, and chapters automatically.",
  },
  {
    icon: Download,
    title: "Export anywhere",
    desc: "Export to Word/Google Docs/PDF-ready format so you can publish faster.",
  },
  {
    icon: ShieldCheck,
    title: "Private by design",
    desc: "Your drafts are yours—built with privacy, security, and control in mind.",
  },
  {
    icon: Wand2,
    title: "Smart rewriting options",
    desc: "Choose: light polish, bestseller-style formatting, or academic-level clarity.",
  },
];

const STEPS = [
  {
    step: "01",
    title: "Record or upload",
    desc: "Use your phone, laptop mic, or upload audio/video files.",
    icon: FileAudio,
  },
  {
    step: "02",
    title: "Transcribe + organize",
    desc: "ReadyWrite converts speech to text and structures it into readable sections.",
    icon: Sparkles,
  },
  {
    step: "03",
    title: "Refine + export",
    desc: "Polish your draft, add scripture/quotes/notes, then export and publish.",
    icon: Download,
  },
];

const PRICING = [
  {
    name: "Starter",
    price: "$0",
    period: "",
    desc: "Perfect to test the workflow.",
    highlight: false,
    items: [
      "Limited monthly minutes",
      "Basic transcription",
      "Simple formatting",
      "Export: DOCX",
    ],
    cta: "Start Free",
  },
  {
    name: "Pro",
    price: "$19",
    period: "/mo",
    desc: "For creators building consistently.",
    highlight: true,
    items: [
      "More minutes + faster processing",
      "Voice-preserving edit modes",
      "Auto chapters + TOC",
      "Exports: DOCX + Google Docs",
      "Priority support",
    ],
    cta: "Go Pro",
  },
  {
    name: "Team",
    price: "$49",
    period: "/mo",
    desc: "For ministries, teams, and agencies.",
    highlight: false,
    items: [
      "Multiple seats",
      "Shared projects",
      "Version history",
      "Exports: DOCX + PDF",
      "Team support",
    ],
    cta: "Contact Sales",
  },
];

const TESTIMONIALS = [
  {
    quote:
      "I spoke my thoughts in one night and woke up to a structured draft with chapters. That’s wild.",
    name: "Creator / Author",
  },
  {
    quote:
      "The edits kept my voice. It didn’t feel like AI wrote it—felt like me on my best day.",
    name: "Speaker",
  },
  {
    quote:
      "We turned sermons into book-ready text without losing the message. The time saved is real.",
    name: "Ministry Team",
  },
];

const FAQ = [
  {
    q: "Does ReadyWrite change my voice or message?",
    a: "No—by default it preserves your tone. You choose how strong the edits are: light polish, clear rewrite, or advanced formatting.",
  },
  {
    q: "Can I use it for sermons and teaching?",
    a: "Yes. It’s built for long-form speech like sermons, lectures, podcasts, and coaching sessions.",
  },
  {
    q: "What can I export to?",
    a: "Common exports include DOCX and Google Docs. You can also format for PDF-ready publishing depending on your plan.",
  },
  {
    q: "Do I need special equipment?",
    a: "No. Phone recordings work. Better audio improves accuracy, but the workflow is designed to be simple.",
  },
];

function cn(...classes) {
  return classes.filter(Boolean).join(" ");
}

function SectionTitle({ eyebrow, title, desc }) {
  return (
    <div className="mx-auto max-w-2xl text-center">
      {eyebrow ? (
        <div className="mb-3 flex items-center justify-center gap-2">
          <Badge variant="secondary" className="rounded-full px-3 py-1">
            {eyebrow}
          </Badge>
        </div>
      ) : null}
      <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">{title}</h2>
      {desc ? (
        <p className="mt-3 text-sm leading-6 text-muted-foreground sm:text-base">{desc}</p>
      ) : null}
    </div>
  );
}

function Pill({ children }) {
  return (
    <span className="inline-flex items-center rounded-full border bg-background px-3 py-1 text-xs text-muted-foreground shadow-sm">
      {children}
    </span>
  );
}

function LogoMark() {
  return (
    <div className="flex items-center gap-2">
      <div className="grid h-9 w-9 place-items-center rounded-2xl border bg-background shadow-sm">
        <Sparkles className="h-5 w-5" />
      </div>
      <div className="leading-tight">
        <div className="text-sm font-semibold">{BRAND.name}</div>
        <div className="text-[11px] text-muted-foreground">Write by voice</div>
      </div>
    </div>
  );
}

export default function ReadyWriteLanding() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [email, setEmail] = useState("");

  const year = useMemo(() => new Date().getFullYear(), []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/30 text-foreground">
      {/* Top glow */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-64 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.55),transparent_60%)] dark:bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.08),transparent_60%)]" />

      {/* Header */}
      <header className="sticky top-0 z-50 border-b bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3 sm:px-6">
          <a href="#top" className="flex items-center gap-2">
            <LogoMark />
          </a>

          <nav className="hidden items-center gap-6 md:flex">
            {NAV.map((n) => (
              <a
                key={n.href}
                href={n.href}
                className="text-sm text-muted-foreground hover:text-foreground"
              >
                {n.label}
              </a>
            ))}
          </nav>

          <div className="hidden items-center gap-2 md:flex">
            <Button variant="ghost" className="rounded-2xl">
              Login
            </Button>
            <Button className="rounded-2xl">
              {BRAND.ctaPrimary} <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>

          <Button
            variant="ghost"
            className="rounded-2xl md:hidden"
            onClick={() => setMenuOpen((v) => !v)}
            aria-label="Toggle menu"
          >
            {menuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>

        <AnimatePresence>
          {menuOpen ? (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="md:hidden"
            >
              <div className="mx-auto max-w-6xl px-4 pb-4 sm:px-6">
                <div className="flex flex-col gap-3 rounded-2xl border bg-background p-4">
                  {NAV.map((n) => (
                    <a
                      key={n.href}
                      href={n.href}
                      onClick={() => setMenuOpen(false)}
                      className="text-sm text-muted-foreground hover:text-foreground"
                    >
                      {n.label}
                    </a>
                  ))}
                  <Separator />
                  <Button variant="ghost" className="justify-start rounded-2xl">
                    Login
                  </Button>
                  <Button className="justify-start rounded-2xl">
                    {BRAND.ctaPrimary} <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </div>
              </div>
            </motion.div>
          ) : null}
        </AnimatePresence>
      </header>

      {/* Hero */}
      <main id="top" className="relative">
        <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 sm:py-16">
          <div className="grid gap-10 lg:grid-cols-2 lg:items-center">
            <div>
              <div className="mb-5 flex flex-wrap gap-2">
                <Pill>Built for authors</Pill>
                <Pill>Perfect for sermons & teaching</Pill>
                <Pill>Export to DOCX</Pill>
              </div>

              <motion.h1
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="text-4xl font-semibold tracking-tight sm:text-5xl"
              >
                {BRAND.tagline}
              </motion.h1>
              <p className="mt-4 text-base leading-7 text-muted-foreground sm:text-lg">
                {BRAND.subtag}
              </p>

              <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center">
                <Button className="h-11 rounded-2xl text-base">
                  {BRAND.ctaPrimary} <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
                <Button variant="outline" className="h-11 rounded-2xl text-base">
                  <PlayCircle className="mr-2 h-5 w-5" />
                  {BRAND.ctaSecondary}
                </Button>
              </div>

              <div className="mt-6 grid grid-cols-3 gap-3">
                <Card className="rounded-2xl">
                  <CardContent className="p-4">
                    <div className="text-2xl font-semibold">3×</div>
                    <div className="text-xs text-muted-foreground">Faster drafting</div>
                  </CardContent>
                </Card>
                <Card className="rounded-2xl">
                  <CardContent className="p-4">
                    <div className="text-2xl font-semibold">1-click</div>
                    <div className="text-xs text-muted-foreground">Chapter structure</div>
                  </CardContent>
                </Card>
                <Card className="rounded-2xl">
                  <CardContent className="p-4">
                    <div className="text-2xl font-semibold">Your</div>
                    <div className="text-xs text-muted-foreground">Voice stays yours</div>
                  </CardContent>
                </Card>
              </div>

              <div className="mt-6 flex items-center gap-2 text-sm text-muted-foreground">
                <CheckCircle2 className="h-4 w-4" />
                <span>No credit card required to start.</span>
              </div>
            </div>

            {/* Hero visual */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="relative"
            >
              <div className="absolute -inset-6 rounded-[2rem] bg-gradient-to-tr from-muted/40 to-transparent blur-2xl" />
              <Card className="relative rounded-[2rem] border bg-background/70 shadow-sm backdrop-blur">
                <CardContent className="p-6 sm:p-8">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="grid h-11 w-11 place-items-center rounded-2xl border bg-background shadow-sm">
                        <Mic className="h-5 w-5" />
                      </div>
                      <div>
                        <div className="text-sm font-semibold">Live draft</div>
                        <div className="text-xs text-muted-foreground">Auto-structured chapters</div>
                      </div>
                    </div>
                    <Badge className="rounded-full">Demo</Badge>
                  </div>

                  <div className="mt-6 space-y-3">
                    <div className="rounded-2xl border bg-muted/30 p-4">
                      <div className="text-xs text-muted-foreground">Chapter 1</div>
                      <div className="mt-1 text-sm font-medium">The Moment the Idea Hit Me</div>
                      <div className="mt-2 space-y-2">
                        <div className="h-2 w-[92%] rounded-full bg-muted" />
                        <div className="h-2 w-[84%] rounded-full bg-muted" />
                        <div className="h-2 w-[70%] rounded-full bg-muted" />
                      </div>
                    </div>
                    <div className="rounded-2xl border bg-muted/30 p-4">
                      <div className="text-xs text-muted-foreground">Chapter 2</div>
                      <div className="mt-1 text-sm font-medium">Principles That Make It Work</div>
                      <div className="mt-2 space-y-2">
                        <div className="h-2 w-[88%] rounded-full bg-muted" />
                        <div className="h-2 w-[76%] rounded-full bg-muted" />
                        <div className="h-2 w-[64%] rounded-full bg-muted" />
                      </div>
                    </div>
                    <div className="rounded-2xl border bg-muted/30 p-4">
                      <div className="text-xs text-muted-foreground">Edit Mode</div>
                      <div className="mt-1 flex flex-wrap gap-2">
                        <Badge variant="secondary" className="rounded-full">
                          Light polish
                        </Badge>
                        <Badge variant="secondary" className="rounded-full">
                          Bestseller format
                        </Badge>
                        <Badge variant="secondary" className="rounded-full">
                          Academic clarity
                        </Badge>
                      </div>
                    </div>
                  </div>

                  <div className="mt-6 flex flex-col gap-2 sm:flex-row">
                    <Button className="rounded-2xl">
                      Generate draft <Sparkles className="ml-2 h-4 w-4" />
                    </Button>
                    <Button variant="outline" className="rounded-2xl">
                      Export <Download className="ml-2 h-4 w-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>

        {/* How it works */}
        <section id="how" className="mx-auto max-w-6xl px-4 py-12 sm:px-6 sm:py-16">
          <SectionTitle
            eyebrow="How it works"
            title="Speak it once. Build it into a book."
            desc="A simple workflow designed for real life: quick capture, clean structure, easy export."
          />

          <div className="mt-10 grid gap-4 md:grid-cols-3">
            {STEPS.map((s) => (
              <Card key={s.step} className="rounded-2xl">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between">
                    <div>
                      <div className="text-xs text-muted-foreground">{s.step}</div>
                      <div className="mt-1 text-lg font-semibold">{s.title}</div>
                    </div>
                    <div className="grid h-10 w-10 place-items-center rounded-2xl border bg-background shadow-sm">
                      <s.icon className="h-5 w-5" />
                    </div>
                  </div>
                  <p className="mt-3 text-sm leading-6 text-muted-foreground">{s.desc}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Features */}
        <section id="features" className="mx-auto max-w-6xl px-4 py-12 sm:px-6 sm:py-16">
          <SectionTitle
            eyebrow="Features"
            title="Everything you need to go from audio to manuscript"
            desc="Built to preserve your voice while making your writing clean, structured, and ready to publish."
          />

          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {FEATURES.map((f) => (
              <Card key={f.title} className="rounded-2xl">
                <CardContent className="p-6">
                  <div className="flex items-center gap-3">
                    <div className="grid h-10 w-10 place-items-center rounded-2xl border bg-background shadow-sm">
                      <f.icon className="h-5 w-5" />
                    </div>
                    <div className="text-base font-semibold">{f.title}</div>
                  </div>
                  <p className="mt-3 text-sm leading-6 text-muted-foreground">{f.desc}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="mt-10 rounded-[2rem] border bg-background p-6 sm:p-8">
            <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
              <div>
                <div className="text-lg font-semibold">Use cases</div>
                <p className="mt-1 text-sm text-muted-foreground">
                  Authors • Preachers • Coaches • Teachers • Creators
                </p>
              </div>
              <div className="flex flex-wrap gap-2">
                <Badge variant="secondary" className="rounded-full">
                  Sermon → Book
                </Badge>
                <Badge variant="secondary" className="rounded-full">
                  Podcast → Chapters
                </Badge>
                <Badge variant="secondary" className="rounded-full">
                  Notes → Manuscript
                </Badge>
                <Badge variant="secondary" className="rounded-full">
                  Course → Workbook
                </Badge>
              </div>
            </div>
          </div>
        </section>

        {/* Testimonials */}
        <section className="mx-auto max-w-6xl px-4 py-12 sm:px-6 sm:py-16">
          <SectionTitle
            eyebrow="Results"
            title="People write faster when the friction disappears"
            desc="Replace the placeholders below with real quotes once you have early users."
          />

          <div className="mt-10 grid gap-4 md:grid-cols-3">
            {TESTIMONIALS.map((t, idx) => (
              <Card key={idx} className="rounded-2xl">
                <CardContent className="p-6">
                  <Quote className="h-5 w-5 text-muted-foreground" />
                  <p className="mt-3 text-sm leading-6">“{t.quote}”</p>
                  <div className="mt-4 text-xs text-muted-foreground">— {t.name}</div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Pricing */}
        <section id="pricing" className="mx-auto max-w-6xl px-4 py-12 sm:px-6 sm:py-16">
          <SectionTitle
            eyebrow="Pricing"
            title="Pick a plan that matches your writing pace"
            desc="Start free. Upgrade when you’re ready to scale minutes, features, or collaboration."
          />

          <div className="mt-10 grid gap-4 lg:grid-cols-3">
            {PRICING.map((p) => (
              <Card
                key={p.name}
                className={cn(
                  "rounded-[2rem]",
                  p.highlight
                    ? "border-foreground/20 bg-background shadow-sm"
                    : "bg-background"
                )}
              >
                <CardContent className="p-6 sm:p-8">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <div className="text-lg font-semibold">{p.name}</div>
                      <div className="mt-1 text-sm text-muted-foreground">{p.desc}</div>
                    </div>
                    {p.highlight ? (
                      <Badge className="rounded-full">Most popular</Badge>
                    ) : null}
                  </div>

                  <div className="mt-6 flex items-end gap-2">
                    <div className="text-4xl font-semibold tracking-tight">{p.price}</div>
                    <div className="pb-1 text-sm text-muted-foreground">{p.period}</div>
                  </div>

                  <Button
                    className={cn("mt-6 w-full rounded-2xl", p.highlight ? "" : "")}
                    variant={p.highlight ? "default" : "outline"}
                  >
                    {p.cta}
                  </Button>

                  <Separator className="my-6" />

                  <ul className="space-y-3 text-sm">
                    {p.items.map((it) => (
                      <li key={it} className="flex items-start gap-2">
                        <CheckCircle2 className="mt-0.5 h-4 w-4" />
                        <span className="text-muted-foreground">{it}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Examples */}
        <section id="examples" className="mx-auto max-w-6xl px-4 py-12 sm:px-6 sm:py-16">
          <SectionTitle
            eyebrow="Examples"
            title="From raw audio to clean pages"
            desc="Drop in screenshots later. For now, this section shows how your marketing can frame outcomes."
          />

          <div className="mt-10 grid gap-4 lg:grid-cols-2">
            <Card className="rounded-[2rem]">
              <CardContent className="p-6 sm:p-8">
                <div className="flex items-center justify-between">
                  <div className="text-lg font-semibold">Sermon → Book draft</div>
                  <Badge variant="secondary" className="rounded-full">
                    Ministry
                  </Badge>
                </div>
                <p className="mt-2 text-sm text-muted-foreground">
                  Upload a sermon, auto-extract themes, then generate chapters with a table of contents.
                </p>
                <div className="mt-6 space-y-3 rounded-2xl border bg-muted/20 p-4">
                  <div className="text-xs text-muted-foreground">Output preview</div>
                  <div className="grid gap-2">
                    <div className="h-2 w-[90%] rounded-full bg-muted" />
                    <div className="h-2 w-[86%] rounded-full bg-muted" />
                    <div className="h-2 w-[78%] rounded-full bg-muted" />
                    <div className="h-2 w-[68%] rounded-full bg-muted" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="rounded-[2rem]">
              <CardContent className="p-6 sm:p-8">
                <div className="flex items-center justify-between">
                  <div className="text-lg font-semibold">Notes → Manuscript</div>
                  <Badge variant="secondary" className="rounded-full">
                    Author
                  </Badge>
                </div>
                <p className="mt-2 text-sm text-muted-foreground">
                  Speak your outline, then let ReadyWrite create readable sections and transitions.
                </p>
                <div className="mt-6 space-y-3 rounded-2xl border bg-muted/20 p-4">
                  <div className="text-xs text-muted-foreground">Output preview</div>
                  <div className="grid gap-2">
                    <div className="h-2 w-[88%] rounded-full bg-muted" />
                    <div className="h-2 w-[82%] rounded-full bg-muted" />
                    <div className="h-2 w-[74%] rounded-full bg-muted" />
                    <div className="h-2 w-[60%] rounded-full bg-muted" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Email capture */}
        <section className="mx-auto max-w-6xl px-4 pb-12 sm:px-6 sm:pb-16">
          <Card className="rounded-[2rem]">
            <CardContent className="p-6 sm:p-10">
              <div className="grid gap-8 lg:grid-cols-2 lg:items-center">
                <div>
                  <div className="text-2xl font-semibold">Get launch updates</div>
                  <p className="mt-2 text-sm text-muted-foreground">
                    Want early access or a demo walkthrough? Drop your email and we’ll send the next steps.
                  </p>
                  <div className="mt-4 flex flex-wrap gap-2">
                    <Badge variant="secondary" className="rounded-full">
                      Early access
                    </Badge>
                    <Badge variant="secondary" className="rounded-full">
                      Demo invite
                    </Badge>
                    <Badge variant="secondary" className="rounded-full">
                      Pricing updates
                    </Badge>
                  </div>
                </div>

                <div className="rounded-[1.5rem] border bg-muted/20 p-4 sm:p-6">
                  <div className="flex flex-col gap-3 sm:flex-row">
                    <Input
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="you@example.com"
                      className="h-11 rounded-2xl"
                    />
                    <Button
                      className="h-11 rounded-2xl"
                      onClick={() => {
                        // Replace with real submission
                        alert(
                          email
                            ? `Thanks! We'll reach out to: ${email}`
                            : "Add your email first."
                        );
                      }}
                    >
                      Notify me <Mail className="ml-2 h-4 w-4" />
                    </Button>
                  </div>
                  <div className="mt-3 text-xs text-muted-foreground">
                    No spam. Unsubscribe anytime.
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* FAQ */}
        <section id="faq" className="mx-auto max-w-6xl px-4 py-12 sm:px-6 sm:py-16">
          <SectionTitle
            eyebrow="FAQ"
            title="Questions you might have"
            desc="If you want, I can tailor this FAQ to your exact workflow and audience."
          />

          <div className="mt-10 grid gap-4 lg:grid-cols-2">
            {FAQ.map((f) => (
              <Card key={f.q} className="rounded-2xl">
                <CardContent className="p-6">
                  <div className="text-base font-semibold">{f.q}</div>
                  <p className="mt-2 text-sm leading-6 text-muted-foreground">{f.a}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Footer */}
        <footer className="border-t bg-background/60">
          <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
            <div className="grid gap-8 md:grid-cols-3">
              <div>
                <LogoMark />
                <p className="mt-3 text-sm text-muted-foreground">
                  {BRAND.name} helps you go from voice to manuscript—fast.
                </p>
              </div>

              <div className="grid grid-cols-2 gap-6 md:col-span-2 md:grid-cols-3">
                <div className="space-y-2">
                  <div className="text-sm font-semibold">Product</div>
                  <div className="space-y-1 text-sm text-muted-foreground">
                    {NAV.map((n) => (
                      <a key={n.href} href={n.href} className="block hover:text-foreground">
                        {n.label}
                      </a>
                    ))}
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="text-sm font-semibold">Company</div>
                  <div className="space-y-1 text-sm text-muted-foreground">
                    <a className="block hover:text-foreground" href="#">
                      About
                    </a>
                    <a className="block hover:text-foreground" href="#">
                      Privacy
                    </a>
                    <a className="block hover:text-foreground" href="#">
                      Terms
                    </a>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="text-sm font-semibold">Contact</div>
                  <div className="space-y-2 text-sm text-muted-foreground">
                    <div className="flex items-center gap-2">
                      <Mail className="h-4 w-4" /> <span>support@readywrite.app</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Phone className="h-4 w-4" /> <span>(000) 000-0000</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin className="h-4 w-4" /> <span>Battle Creek, MI</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <Separator className="my-8" />

            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <div className="text-xs text-muted-foreground">© {year} {BRAND.name}. All rights reserved.</div>
              <div className="flex flex-wrap gap-2">
                <Button className="rounded-2xl" size="sm">
                  {BRAND.ctaPrimary} <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
                <Button variant="outline" className="rounded-2xl" size="sm">
                  Watch demo <PlayCircle className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </footer>
      </main>
    </div>
  );
}

"use client";

import React, { useMemo, useState, type ReactNode, type ElementType } from "react";
import { motion } from "framer-motion";
import {
  ArrowRight,
  Briefcase,
  Code2,
  Download,
  ExternalLink,
  Github,
  Linkedin,
  Mail,
  MapPin,
  Sparkles,
  Star,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

/**
 * ✅ Single-file Portfolio Website (React + Tailwind + shadcn/ui)
 * - Replace the DATA object with your real info
 * - Works great for Vercel/Netlify, or any React app
 */

const DATA = {
  name: "Jess Nguyen",
  role: "Annotation Specialist • Data Analytics",
  tagline:
    "I build high-quality datasets, improve labeling workflows, and translate messy text into clean, usable signals.",
  location: "Seattle, WA",
  email: "jessnguyen.work@gmail.com",
  links: {
    linkedin: "https://www.linkedin.com/in/jess-788b16176",
    github: "https://github.com/jessnguyen9",
    resume: "/resume.pdf"
  },
  about: [
    "I’m a data annotation specialist focused on NLP/LLM training data quality—taxonomy alignment, edge-case handling, and QA calibration.",
    "I love turning ambiguous customer language into structured labels, and improving processes so teams can scale without sacrificing accuracy.",
  ],
  highlights: [
    "20,000+ annotations delivered with >97% accuracy",
    "Disagreement rate kept under 5% across 800+ items",
    "Improved SOP clarity via reviews + corrections with SME",
  ],
  skills: [
    {
      group: "AI / NLP",
      items: [
        "Data annotation",
        "LLM response evaluation",
        "Taxonomy & label design",
        "QA calibration",
      ],
    },
    {
      group: "Data / Analytics",
      items: [
        "SQL",
        "Python",
        "Data cleaning",
        "Data visualization",
        "Metrics tracking",
        "Dashboard Development",
        "EDA",
        "A/B Testing (basic)",
      ],
    },
    {
      group: "Tools",
      items: [
        "Advanced Excel",
        "Google Sheets",
        "Tableau / Power BI",
        "Git / GitHub",
      ]
    }
  ],
  experience: [
    {
      company: "Amazon",
      title: "Science Annotation Specialist",
      dates: "2025 – Present",
      bullets: [
        "Delivered high-volume, high-accuracy annotations for NLP model training (classification, NER, intent).",
        "Identified ambiguous edge cases and improved guideline clarity to reduce labeling inconsistency.",
        "Partnered with SMEs to calibrate QA, keep disagreement low, and maintain policy alignment.",
      ],
      tags: ["NLP", "Annotation", "QA", "LLM"],
    },
    {
      company: "YYY Catering",
      title: "Business Operations Analyst",
      dates: "2021 – 2025",
      bullets: [
        "Built forecasting dashboards to improve ordering accuracy and reduce waste.",
        "Created operational workflows across hiring, inventory, and reporting.",
      ],
      tags: ["Ops", "Dashboards", "Excel"],
    },
  ],
  projects: [
    {
      name: "Return Reason Taxonomy QA",
      description:
        "Reviewed structured summaries vs. customer inputs to catch assumption errors and improve label reliability.",
      impact: "Reduced false positives by tightening edge-case handling.",
      stack: ["NLP", "Policy", "QA"],
      link: "#",
    },
    {
      name: "Monthly Team Magazine",
      description:
        "POC for monthly internal magazine—gathered updates, designed content structure, and ensured on-time release.",
      impact: "Improved visibility of team wins and events.",
      stack: ["Content", "Coordination"],
      link: "#",
    },
    {
      name: "Personal Finance Tracker",
      description:
        "Built automated monthly contribution trackers with dynamic sheet references and conditional formatting.",
      impact: "Made savings goals easier to manage and track.",
      stack: ["Sheets", "Formulas"],
      link: "#",
    },
  ],
  education: [
    {
      school: "Georgia Tech (planned)",
      program: "M.S. Analytics (OMS Analytics)",
      dates: "2026 –",
      notes: "Course planning and prep in progress.",
    },
  ],
};

const fadeUp = {
  hidden: { opacity: 0, y: 14 },
  show: { opacity: 1, y: 0 },
};

function cn(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}

type SectionProps = {
  id: string;
  title: string;
  icon?: ElementType;
  children: ReactNode;
  right?: ReactNode;
};

function Section({ id, title, icon: Icon, children, right }: SectionProps) {
  return (
    <section id={id} className="scroll-mt-24">
      <div className="flex items-end justify-between gap-4">
        <div className="flex items-center gap-2">
          {Icon ? (
            <div className="rounded-2xl border bg-background p-2 shadow-sm">
              <Icon className="h-5 w-5" />
            </div>
          ) : null}
          <h2 className="text-xl font-semibold tracking-tight sm:text-2xl">{title}</h2>
        </div>
        {right}
      </div>
      <div className="mt-4">{children}</div>
    </section>
  );
}

type PillProps = { children: ReactNode };

function Pill({ children }: PillProps) {
  return (
    <span className="inline-flex items-center rounded-full border bg-background px-3 py-1 text-sm shadow-sm">
      {children}
    </span>
  );
}

type NavLinkProps = { href: string; children: ReactNode };

function NavLink({ href, children }: NavLinkProps) {
  return (
    <a
      href={href}
      className="text-sm text-muted-foreground hover:text-foreground transition-colors"
    >
      {children}
    </a>
  );
}

type SocialButtonProps = {
  href: string;
  icon: ElementType;
  label: string;
};

function SocialButton({ href, icon: Icon, label }: SocialButtonProps) {
  return (
    <Button asChild variant="outline" className="rounded-2xl">
      <a href={href} target="_blank" rel="noreferrer">
        <Icon className="mr-2 h-4 w-4" />
        {label}
        <ExternalLink className="ml-2 h-4 w-4 opacity-70" />
      </a>
    </Button>
  );
}

function downloadText(filename: string, content: string) {
  const blob = new Blob([content], { type: "text/plain;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  a.remove();
  URL.revokeObjectURL(url);
}

type ResumeData = {
  name: string;
  role: string;
  location: string;
  email: string;
  tagline: string;
  highlights: string[];
  skills: { group: string; items: string[] }[];
  experience: { company: string; title: string; dates: string; bullets: string[] }[];
  projects: { name: string; description: string; impact: string }[];
  education: { school: string; program: string; dates: string; notes?: string }[];
};

function buildResumeMarkdown(data: ResumeData) {
  const lines: string[] = [];
  lines.push(`# ${data.name}`);
  lines.push(`${data.role} • ${data.location}`);
  lines.push(`Email: ${data.email}`);
  lines.push("");
  lines.push(`## Summary`);
  lines.push(data.tagline);
  lines.push("");
  lines.push(`## Highlights`);
  data.highlights.forEach((h) => lines.push(`- ${h}`));
  lines.push("");
  lines.push(`## Skills`);
  data.skills.forEach((g) => {
    lines.push(`- ${g.group}: ${g.items.join(" • ")}`);
  });
  lines.push("");
  lines.push(`## Experience`);
  data.experience.forEach((e) => {
    lines.push(`### ${e.title} — ${e.company} (${e.dates})`);
    e.bullets.forEach((b) => lines.push(`- ${b}`));
    lines.push("");
  });
  lines.push(`## Projects`);
  data.projects.forEach((p) => {
    lines.push(`- **${p.name}**: ${p.description} _(${p.impact})_`);
  });
  lines.push("");
  lines.push(`## Education`);
  data.education.forEach((ed) => {
    lines.push(`- ${ed.school} — ${ed.program} (${ed.dates})${ed.notes ? `: ${ed.notes}` : ""}`);
  });
  return lines.join("\n");
}

function ContactCard() {
  const [name, setName] = useState("");
  const [from, setFrom] = useState("");
  const [message, setMessage] = useState("");

  const mailto = useMemo(() => {
    const subject = encodeURIComponent(`Portfolio inquiry from ${name || "(your name)"}`);
    const body = encodeURIComponent(
      `Name: ${name}\nEmail: ${from}\n\n${message || "Hi! I’d love to connect."}`
    );
    return `mailto:${DATA.email}?subject=${subject}&body=${body}`;
  }, [name, from, message]);

  return (
    <Card className="rounded-3xl shadow-sm">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Mail className="h-5 w-5" /> Contact
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        <div className="grid gap-3 sm:grid-cols-2">
          <div>
            <div className="mb-1 text-sm text-muted-foreground">Your name</div>
            <Input value={name} onChange={(e) => setName(e.target.value)}  />
          </div>
          <div>
            <div className="mb-1 text-sm text-muted-foreground">Your email</div>
            <Input value={from} onChange={(e) => setFrom(e.target.value)}  />
          </div>
        </div>
        <div>
          <div className="mb-1 text-sm text-muted-foreground">Message</div>
          <Textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Interested in data annotaiton, NLP evaluation, or analytics work?
            I'd love to connect."
            className="min-h-[120px]"
          />
        </div>
        <div className="flex flex-wrap gap-2">
          <Button asChild className="rounded-2xl">
            <a href={mailto}>
              Send email <ArrowRight className="ml-2 h-4 w-4" />
            </a>
          </Button>
          <Button
            variant="outline"
            className="rounded-2xl"
            onClick={() => {
              setName("");
              setFrom("");
              setMessage("");
            }}
          >
            Clear
          </Button>
        </div>
        <div className="text-xs text-muted-foreground">
          This form opens your email app (no backend needed).
        </div>
      </CardContent>
    </Card>
  );
}

export default function PortfolioWebsite() {
  const [search, setSearch] = useState("");

  const filteredProjects = useMemo(() => {
    const q = search.trim().toLowerCase();
    if (!q) return DATA.projects;
    return DATA.projects.filter((p) => {
      const hay = [p.name, p.description, p.impact, ...(p.stack || [])].join(" ").toLowerCase();
      return hay.includes(q);
    });
  }, [search]);

  const resumeMd = useMemo(() => buildResumeMarkdown(DATA), []);

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Top gradient */}
      <div className="pointer-events-none fixed inset-x-0 top-0 h-56 bg-gradient-to-b from-foreground/5 to-transparent" />

      {/* Header */}
      <header className="sticky top-0 z-40 border-b bg-background/80 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
          <a href="#top" className="flex items-center gap-2">
            <div className="grid h-10 w-10 place-items-center rounded-2xl border bg-background shadow-sm">
              <Sparkles className="h-5 w-5" />
            </div>
            <div className="leading-tight">
              <div className="text-sm font-semibold">{DATA.name}</div>
              <div className="text-xs text-muted-foreground">{DATA.role}</div>
            </div>
          </a>

          <nav className="hidden items-center gap-5 sm:flex">
            <NavLink href="#about">About</NavLink>
            <NavLink href="#experience">Experience</NavLink>
            <NavLink href="#projects">Projects</NavLink>
            <NavLink href="#skills">Skills</NavLink>
            <NavLink href="#contact">Contact</NavLink>
          </nav>

          <div className="flex items-center gap-2">
            <Button asChild variant="outline" className="rounded-2xl">
              <a href={DATA.links.resume} target="_blank">
                <Download className="mr-2 h-4 w-4" /> Resume
              </a>
            </Button>
          </div>
        </div>
      </header>

      {/* Main */}
      <main id="top" className="mx-auto max-w-6xl px-4 py-10 sm:py-14">
        {/* Hero */}
        <div className="grid gap-6 lg:grid-cols-2 lg:gap-10">
          <motion.div initial="hidden" animate="show" variants={fadeUp}>
            <div className="inline-flex items-center gap-2 rounded-full border bg-background px-3 py-1 text-sm shadow-sm">
              <MapPin className="h-4 w-4" /> {DATA.location}
            </div>

            <h1 className="mt-4 text-3xl font-semibold tracking-tight sm:text-5xl">
              {DATA.role}
            </h1>
            <p className="mt-3 text-base text-muted-foreground sm:text-lg">{DATA.tagline}</p>

            <div className="mt-6 flex flex-wrap gap-2">
              <Button asChild className="rounded-2xl">
                <a href="#projects">
                  View projects <ArrowRight className="ml-2 h-4 w-4" />
                </a>
              </Button>
              <SocialButton href={DATA.links.linkedin} icon={Linkedin} label="LinkedIn" />
              <SocialButton href={DATA.links.github} icon={Github} label="GitHub" />
              <Button asChild variant="outline" className="rounded-2xl">
                <a href={`mailto:${DATA.email}`}>
                  <Mail className="mr-2 h-4 w-4" /> Email
                </a>
              </Button>
            </div>

            <div className="mt-6 flex flex-wrap gap-2">
              {DATA.highlights.map((h) => (
                <Pill key={h}>
                  <Star className="mr-2 h-4 w-4" /> {h}
                </Pill>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="grid gap-3"
          >
            <Card className="rounded-3xl shadow-sm">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Sparkles className="h-5 w-5" /> Quick summary
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {DATA.about.map((p, idx) => (
                  <p key={idx} className="text-sm text-muted-foreground">
                    {p}
                  </p>
                ))}
                <div className="flex flex-wrap gap-2 pt-1">
                  {DATA.skills
                    .flatMap((g) => g.items)
                    .slice(0, 8)
                    .map((s) => (
                      <Badge key={s} variant="secondary" className="rounded-full">
                        {s}
                      </Badge>
                    ))}
                </div>
              </CardContent>
            </Card>

            <Card className="rounded-3xl shadow-sm">
              <CardContent className="p-5">
                <div className="flex items-center justify-between gap-3">
                  <div>
                    <div className="text-sm text-muted-foreground">Currently open to</div>
                    <div className="text-base font-medium">Data / Analytics roles • Remote / Contract / Full-time</div>
                  </div>
                  <Button asChild className="rounded-2xl">
                    <a href="#contact">
                      Let’s talk <ArrowRight className="ml-2 h-4 w-4" />
                    </a>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Sections */}
        <div className="mt-10 space-y-12 sm:mt-14">
          <Section id="about" title="About" icon={Sparkles}>
            <Card className="rounded-3xl shadow-sm">
              <CardContent className="p-6 sm:p-8">
                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <div className="text-sm font-medium">Who I am</div>
                    <p className="mt-2 text-sm text-muted-foreground">{DATA.about[0]}</p>
                  </div>
                  <div>
                    <div className="text-sm font-medium">What I care about</div>
                    <p className="mt-2 text-sm text-muted-foreground">{DATA.about[1]}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </Section>

          <Section id="experience" title="Experience" icon={Briefcase}>
            <div className="grid gap-4">
              {DATA.experience.map((e) => (
                <Card key={`${e.company}-${e.title}`} className="rounded-3xl shadow-sm">
                  <CardHeader className="pb-2">
                    <div className="flex flex-wrap items-start justify-between gap-2">
                      <div>
                        <CardTitle className="text-base sm:text-lg">{e.title}</CardTitle>
                        <div className="text-sm text-muted-foreground">
                          {e.company} • {e.dates}
                        </div>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {(e.tags || []).map((t) => (
                          <Badge key={t} variant="secondary" className="rounded-full">
                            {t}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <ul className="ml-5 list-disc space-y-2 text-sm text-muted-foreground">
                      {e.bullets.map((b) => (
                        <li key={b}>{b}</li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              ))}
            </div>
          </Section>

          <Section
            id="projects"
            title="Projects"
            icon={Code2}
            right={
              <div className="w-full sm:w-[320px]">
                <Input
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search projects..."
                  className="rounded-2xl"
                />
              </div>
            }
          >
            <div className="grid gap-4 sm:grid-cols-2">
              {filteredProjects.map((p) => (
                <Card key={p.name} className="rounded-3xl shadow-sm">
                  <CardHeader>
                    <CardTitle className="text-base sm:text-lg">{p.name}</CardTitle>
                    <div className="text-sm text-muted-foreground">{p.description}</div>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="rounded-2xl border bg-background p-3 text-sm">
                      <div className="text-xs text-muted-foreground">Impact</div>
                      <div className="mt-1 font-medium">{p.impact}</div>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {(p.stack || []).map((s) => (
                        <Badge key={s} variant="secondary" className="rounded-full">
                          {s}
                        </Badge>
                      ))}
                    </div>
                    <div className="flex flex-wrap gap-2">
                      <Button asChild variant="outline" className="rounded-2xl">
                        <a href={p.link} target="_blank" rel="noreferrer">
                          View <ExternalLink className="ml-2 h-4 w-4" />
                        </a>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
              {filteredProjects.length === 0 ? (
                <div className="col-span-full rounded-3xl border bg-background p-8 text-center text-sm text-muted-foreground">
                  No projects match your search.
                </div>
              ) : null}
            </div>
          </Section>

          <Section id="skills" title="Skills" icon={Sparkles}>
            <Card className="rounded-3xl shadow-sm">
              <CardContent className="p-6 sm:p-8">
                <div className="grid gap-4 sm:grid-cols-2">
                  {DATA.skills.map((g) => (
                    <div key={g.group} className="rounded-2xl border bg-background p-4">
                      <div className="text-sm font-medium">{g.group}</div>
                      <div className="mt-2 flex flex-wrap gap-2">
                        {g.items.map((s) => (
                          <Badge key={s} variant="secondary" className="rounded-full">
                            {s}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </Section>

          <Section id="contact" title="Contact" icon={Mail}>
            <div className="grid gap-4 lg:grid-cols-3">
              <div className="lg:col-span-2">
                <ContactCard />
              </div>
              <Card className="rounded-3xl shadow-sm">
                <CardHeader>
                  <CardTitle>Links</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  <Button asChild variant="outline" className="w-full justify-start rounded-2xl">
                    <a href={DATA.links.linkedin} target="_blank" rel="noreferrer">
                      <Linkedin className="mr-2 h-4 w-4" /> LinkedIn
                      <ExternalLink className="ml-auto h-4 w-4 opacity-70" />
                    </a>
                  </Button>
                  <Button asChild variant="outline" className="w-full justify-start rounded-2xl">
                    <a href={DATA.links.github} target="_blank" rel="noreferrer">
                      <Github className="mr-2 h-4 w-4" /> GitHub
                      <ExternalLink className="ml-auto h-4 w-4 opacity-70" />
                    </a>
                  </Button>
                  <Button asChild className="w-full justify-start rounded-2xl">
                    <a href={`mailto:${DATA.email}`}>
                      <Mail className="mr-2 h-4 w-4" /> Email me
                      <ArrowRight className="ml-auto h-4 w-4" />
                    </a>
                  </Button>
                </CardContent>
              </Card>
            </div>
          </Section>
        </div>

        {/* Footer */}
        <footer className="mt-14 border-t pt-6 text-sm text-muted-foreground">
          <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
            <div>© {new Date().getFullYear()} {DATA.name}. Built with React.</div>
            <div className="flex flex-wrap items-center gap-4">
              <a className="hover:text-foreground" href="#top">
                Back to top
              </a>
              <a className="hover:text-foreground" href={DATA.links.resume}>
                Resume
              </a>
            </div>
          </div>
        </footer>
      </main>
    </div>
  );
}


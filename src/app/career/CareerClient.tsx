"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ArrowRight, CheckCircle2, Menu, X } from "lucide-react";

const CULTURE_PILLARS = [
  {
    code: "01",
    title: "Freedom to Work",
    description:
      "We give you real autonomy and trust to do your best work without micromanagement or rigid bureaucracy.",
  },
  {
    code: "02",
    title: "No Layoffs, People First",
    description:
      "We build for the long term and stand by our team — we do not lay people off when things get tough.",
  },
  {
    code: "03",
    title: "We Train When Needed",
    description:
      "You do not need to know everything on day one. When new tools or skills are needed, we train and mentor you directly.",
  },
];

const ROLE_OPTIONS = [
  "Software Engineering (Web & Full-Stack)",
  "Mobile Application Development",
  "Applied AI & Automation",
  "UI/UX Product Design",
  "General Application",
];

export default function CareerClient() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [selectedRole, setSelectedRole] = useState<string>(ROLE_OPTIONS[0]);
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [portfolioUrl, setPortfolioUrl] = useState("");
  const [experience, setExperience] = useState("");
  const [message, setMessage] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName.trim() || !email.trim() || !selectedRole || !message.trim()) return;
    setSubmitted(true);
  };

  return (
    <div
      className="min-h-screen w-full"
      style={{
        backgroundColor: "#f8ebcb",
        color: "#d20600",
        fontFamily: '"Geist Mono", ui-monospace, SFMono-Regular, Menlo, monospace',
      }}
    >
      {/* Navigation Header matching PromptVistaML site */}
      <header
        className="sticky top-0 z-50 w-full border-b"
        style={{
          backgroundColor: "rgba(248, 235, 203, 0.92)",
          backdropFilter: "blur(10px)",
          borderColor: "rgba(210, 6, 0, 0.16)",
        }}
      >
        <div className="mx-auto flex max-w-[1440px] items-center justify-between px-5 py-4 md:px-10">
          <Link href="/" className="flex items-center gap-3 no-underline" aria-label="Prompt VistaML — home">
            <img
              src="/assets/images/logo.avif"
              alt="Prompt VistaML logo"
              className="h-8 w-8 object-contain"
            />
            <span
              className="hidden text-[13px] font-medium tracking-[-0.02em] sm:inline-block"
              style={{ color: "#d20600" }}
            >
              // Creative Digital Agency
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden items-center gap-7 md:flex" aria-label="Primary Navigation">
            <Link
              href="/"
              className="text-[14px] font-medium uppercase tracking-[-0.02em] transition-opacity hover:opacity-70"
              style={{ color: "#d20600" }}
            >
              HOME
            </Link>
            <Link
              href="/#work"
              className="text-[14px] font-medium uppercase tracking-[-0.02em] transition-opacity hover:opacity-70"
              style={{ color: "#d20600" }}
            >
              WORK
            </Link>
            <Link
              href="/#about"
              className="text-[14px] font-medium uppercase tracking-[-0.02em] transition-opacity hover:opacity-70"
              style={{ color: "#d20600" }}
            >
              ABOUT
            </Link>
            <Link
              href="/#service"
              className="text-[14px] font-medium uppercase tracking-[-0.02em] transition-opacity hover:opacity-70"
              style={{ color: "#d20600" }}
            >
              SERVICE
            </Link>
            <Link
              href="/career"
              className="border-b border-[#d20600] pb-0.5 text-[14px] font-medium uppercase tracking-[-0.02em]"
              style={{ color: "#d20600" }}
            >
              CAREER
            </Link>
            <Link
              href="/contact"
              className="rounded-[4px] border border-[#d20600] px-4 py-1.5 text-[14px] font-medium uppercase tracking-[-0.02em] transition-colors hover:bg-[#d20600] hover:text-[#f8ebcb]"
              style={{ color: "#d20600" }}
            >
              CONTACT
            </Link>
          </nav>

          {/* Mobile Menu Toggle */}
          <button
            type="button"
            className="flex items-center justify-center rounded-[4px] border border-[#d20600] p-2 md:hidden"
            onClick={() => setMobileMenuOpen((v) => !v)}
            aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
          >
            {mobileMenuOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          </button>
        </div>

        {/* Mobile Nav Drawer */}
        {mobileMenuOpen && (
          <div
            className="border-t px-5 py-5 md:hidden"
            style={{ borderColor: "rgba(210, 6, 0, 0.16)", backgroundColor: "#f8ebcb" }}
          >
            <div className="flex flex-col gap-4">
              <Link href="/" onClick={() => setMobileMenuOpen(false)} className="text-[14px] font-medium uppercase">
                HOME
              </Link>
              <Link href="/#work" onClick={() => setMobileMenuOpen(false)} className="text-[14px] font-medium uppercase">
                WORK
              </Link>
              <Link href="/#about" onClick={() => setMobileMenuOpen(false)} className="text-[14px] font-medium uppercase">
                ABOUT
              </Link>
              <Link href="/#service" onClick={() => setMobileMenuOpen(false)} className="text-[14px] font-medium uppercase">
                SERVICE
              </Link>
              <Link
                href="/career"
                onClick={() => setMobileMenuOpen(false)}
                className="text-[14px] font-medium uppercase underline"
              >
                CAREER
              </Link>
              <Link
                href="/contact"
                onClick={() => setMobileMenuOpen(false)}
                className="mt-1 inline-block w-fit rounded-[4px] border border-[#d20600] px-4 py-2 text-[14px] font-medium uppercase"
              >
                CONTACT
              </Link>
            </div>
          </div>
        )}
      </header>

      <main className="mx-auto max-w-[1440px] px-5 md:px-10">
        {/* Hero Section */}
        <section className="pt-12 pb-12 md:pt-16 md:pb-16">
          <div className="mb-4 flex items-center justify-between text-[13px] font-medium uppercase tracking-[-0.02em]">
            <span>[Careers]</span>
            <span>// Build With PromptVistaML</span>
          </div>

          <h1
            className="uppercase leading-[0.88] tracking-[-0.03em]"
            style={{
              fontFamily: '"Jaro", sans-serif',
              fontSize: "clamp(64px, 12vw, 168px)",
              color: "#d20600",
            }}
          >
            careers
          </h1>

          <div className="mt-8 grid gap-8 border-t pt-8 md:grid-cols-12" style={{ borderColor: "rgba(210, 6, 0, 0.2)" }}>
            <div className="md:col-span-7">
              <p className="text-[20px] leading-[1.4] tracking-[-0.02em] md:text-[26px]">
                We are a team of engineers, designers, and problem-solvers building practical apps, websites, and AI
                systems for ambitious businesses.
              </p>
            </div>
            <div className="flex flex-col justify-between gap-4 md:col-span-5">
              <p className="text-[14px] leading-[1.6] opacity-85">
                At PromptVistaML, you work directly on real client platforms, internal products, and high-impact
                digital solutions — with zero unnecessary bureaucracy and a culture rooted in craftsmanship.
              </p>
              <div className="flex flex-wrap gap-3">
                <a
                  href="#apply"
                  className="inline-flex items-center gap-2 rounded-[4px] bg-[#d20600] px-5 py-2.5 text-[13px] font-medium uppercase tracking-[-0.02em] text-[#f8ebcb] transition-opacity hover:opacity-90"
                >
                  Apply Directly <ArrowRight className="h-4 w-4" />
                </a>
              </div>
            </div>
          </div>

          {/* Company Building Showcase (balanced widescreen frame) */}
          <div className="relative mt-8 overflow-hidden rounded-[8px] border" style={{ borderColor: "rgba(210, 6, 0, 0.16)" }}>
            <div className="relative aspect-[16/9] w-full overflow-hidden md:aspect-[21/9] md:max-h-[460px]">
              <img
                src="/assets/images/career/career-building.webp"
                alt="PromptVistaML corporate headquarters building"
                className="h-full w-full object-cover"
              />
              <div
                aria-hidden="true"
                className="pointer-events-none absolute top-0 right-0 h-10 w-10"
                style={{ background: "#f8ebcb", clipPath: "polygon(0 0, 100% 0, 100% 100%)" }}
              />
            </div>
            <div
              className="flex flex-wrap items-center justify-between gap-2 px-5 py-3 text-[12px] uppercase tracking-[-0.02em]"
              style={{ borderTop: "1px solid rgba(210, 6, 0, 0.16)" }}
            >
              <span>[01] PromptVistaML Headquarters</span>
              <span className="opacity-75">Engineering, Design &amp; Business Consulting Studio</span>
            </div>
          </div>
        </section>

        {/* Culture & Why Join Us */}
        <section className="border-t py-14 md:py-20" style={{ borderColor: "rgba(210, 6, 0, 0.2)" }}>
          <div className="mb-10 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="mb-2 text-[13px] uppercase tracking-[-0.02em]">[Culture &amp; Environment]</p>
              <h2
                className="uppercase leading-[0.95] tracking-[-0.02em]"
                style={{ fontFamily: '"Jaro", sans-serif', fontSize: "clamp(40px, 6vw, 76px)" }}
              >
                Why PromptVistaML
              </h2>
            </div>
            <p className="max-w-md text-[14px] leading-[1.6] opacity-85">
              A collaborative workspace designed for deep focus, open technical dialogue, and shipping work you are
              proud to put your name on.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-12">
            <div className="relative overflow-hidden rounded-[8px] border md:col-span-7" style={{ borderColor: "rgba(210, 6, 0, 0.16)" }}>
              <div className="relative aspect-[16/9] w-full overflow-hidden">
                <img
                  src="/assets/images/career/career-workspace.webp"
                  alt="PromptVistaML team collaborating in the studio workspace"
                  loading="lazy"
                  className="h-full w-full object-cover"
                />
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute top-0 right-0 h-10 w-10"
                  style={{ background: "#f8ebcb", clipPath: "polygon(0 0, 100% 0, 100% 100%)" }}
                />
              </div>
              <div
                className="flex items-center justify-between px-5 py-3 text-[12px] uppercase"
                style={{ borderTop: "1px solid rgba(210, 6, 0, 0.16)" }}
              >
                <span>[02] Collaborative Work Environment</span>
                <span className="opacity-75">Cross-functional product pods</span>
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-2 md:col-span-5 md:grid-cols-1">
              {CULTURE_PILLARS.map((pillar) => (
                <div
                  key={pillar.code}
                  className="rounded-[8px] border p-5 transition-colors hover:bg-white/40"
                  style={{ borderColor: "rgba(210, 6, 0, 0.2)", backgroundColor: "rgba(255, 255, 255, 0.28)" }}
                >
                  <div className="mb-2 flex items-center justify-between text-[12px] uppercase opacity-75">
                    <span>// {pillar.code}</span>
                  </div>
                  <h3 className="mb-1.5 text-[16px] font-medium uppercase tracking-[-0.02em]">{pillar.title}</h3>
                  <p className="text-[13px] leading-[1.55] opacity-85">{pillar.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Workshops & Learning */}
        <section className="border-t py-14 md:py-20" style={{ borderColor: "rgba(210, 6, 0, 0.2)" }}>
          <div className="grid items-center gap-8 md:grid-cols-12">
            <div className="md:col-span-5">
              <p className="mb-2 text-[13px] uppercase tracking-[-0.02em]">[Workshops &amp; Growth]</p>
              <h2
                className="mb-5 uppercase leading-[0.95] tracking-[-0.02em]"
                style={{ fontFamily: '"Jaro", sans-serif', fontSize: "clamp(38px, 5vw, 68px)" }}
              >
                Learn &amp; Ship Together
              </h2>
              <p className="mb-5 text-[14px] leading-[1.65] opacity-85">
                Every week, our engineering, AI, and design teams host hands-on workshops, architecture whiteboarding
                sessions, and product retrospectives. Whether you are refining a system design or exploring new AI
                workflows, learning is built into your workweek.
              </p>
              <ul className="space-y-2.5 text-[13px]">
                <li className="flex items-start gap-2.5">
                  <span className="mt-0.5 font-bold">→</span>
                  <span>Bi-weekly technical architecture &amp; AI systems workshops</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="mt-0.5 font-bold">→</span>
                  <span>Design critiques and product strategy brainstorming</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="mt-0.5 font-bold">→</span>
                  <span>Annual learning budget for courses, books, and conferences</span>
                </li>
              </ul>
            </div>

            <div className="relative overflow-hidden rounded-[8px] border md:col-span-7" style={{ borderColor: "rgba(210, 6, 0, 0.16)" }}>
              <div className="relative aspect-[16/9] w-full overflow-hidden">
                <img
                  src="/assets/images/career/career-workshops.webp"
                  alt="PromptVistaML internal engineering workshop and architecture brainstorming session"
                  loading="lazy"
                  className="h-full w-full object-cover"
                />
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute top-0 right-0 h-10 w-10"
                  style={{ background: "#f8ebcb", clipPath: "polygon(0 0, 100% 0, 100% 100%)" }}
                />
              </div>
              <div
                className="flex items-center justify-between px-5 py-3 text-[12px] uppercase"
                style={{ borderTop: "1px solid rgba(210, 6, 0, 0.16)" }}
              >
                <span>[03] Team Workshops &amp; Brainstorming</span>
                <span className="opacity-75">Continuous skill development</span>
              </div>
            </div>
          </div>
        </section>

        {/* Application Section */}
        <section id="apply" className="border-t py-14 md:py-20" style={{ borderColor: "rgba(210, 6, 0, 0.2)" }}>
          <div className="grid gap-10 md:grid-cols-12">
            <div className="md:col-span-5">
              <p className="mb-2 text-[13px] uppercase tracking-[-0.02em]">[Application]</p>
              <h2
                className="mb-5 uppercase leading-[0.95] tracking-[-0.02em]"
                style={{ fontFamily: '"Jaro", sans-serif', fontSize: "clamp(40px, 5.5vw, 72px)" }}
              >
                Join Our Team
              </h2>
              <p className="mb-6 text-[14px] leading-[1.65] opacity-85">
                Tell us about what you have built, the problems you enjoy solving, and which role excites you most.
                Our team reviews every application personally.
              </p>
              <div className="rounded-[8px] border p-5 text-[13px]" style={{ borderColor: "rgba(210, 6, 0, 0.2)" }}>
                <p className="mb-1 uppercase opacity-70">[Direct Hiring Desk]</p>
                <a href="mailto:promptvistaml@gmail.com" className="text-[16px] font-medium underline">
                  promptvistaml@gmail.com
                </a>
              </div>
            </div>

            <div className="md:col-span-7">
              {submitted ? (
                <div
                  className="rounded-[8px] border p-8"
                  style={{ borderColor: "#d20600", backgroundColor: "rgba(255, 255, 255, 0.4)" }}
                >
                  <div className="mb-3 flex items-center gap-3">
                    <CheckCircle2 className="h-6 w-6 text-[#d20600]" />
                    <h3 className="text-[20px] font-medium uppercase">Application Received</h3>
                  </div>
                  <p className="mb-5 text-[14px] leading-[1.6] opacity-90">
                    Thank you, <strong>{fullName}</strong>. Your application for{" "}
                    <strong>{selectedRole}</strong> has been recorded. Our hiring team will reach out to{" "}
                    <strong>{email}</strong> shortly.
                  </p>
                  <button
                    type="button"
                    onClick={() => {
                      setSubmitted(false);
                      setFullName("");
                      setEmail("");
                      setPortfolioUrl("");
                      setExperience("");
                      setMessage("");
                    }}
                    className="rounded-[4px] border border-[#d20600] px-4 py-2 text-[13px] uppercase hover:bg-[#d20600] hover:text-[#f8ebcb]"
                  >
                    Submit Another Application
                  </button>
                </div>
              ) : (
                <form
                  onSubmit={handleSubmit}
                  className="space-y-5 rounded-[8px] border p-6 md:p-8"
                  style={{ borderColor: "rgba(210, 6, 0, 0.2)", backgroundColor: "rgba(255, 255, 255, 0.28)" }}
                >
                  <div className="grid gap-5 sm:grid-cols-2">
                    <label className="block">
                      <span className="mb-1.5 block text-[12px] font-medium uppercase">Full Name *</span>
                      <input
                        type="text"
                        required
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        placeholder="Aarav Sharma"
                        className="w-full rounded-[4px] border border-[#d20600]/35 bg-[#f8ebcb]/60 px-3.5 py-2.5 text-[14px] text-[#d20600] placeholder:text-[#d20600]/45 focus:border-[#d20600] focus:outline-none"
                      />
                    </label>
                    <label className="block">
                      <span className="mb-1.5 block text-[12px] font-medium uppercase">Email Address *</span>
                      <input
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="aarav@example.com"
                        className="w-full rounded-[4px] border border-[#d20600]/35 bg-[#f8ebcb]/60 px-3.5 py-2.5 text-[14px] text-[#d20600] placeholder:text-[#d20600]/45 focus:border-[#d20600] focus:outline-none"
                      />
                    </label>
                  </div>

                  <div className="grid gap-5 sm:grid-cols-2">
                    <label className="block">
                      <span className="mb-1.5 block text-[12px] font-medium uppercase">Position *</span>
                      <select
                        required
                        value={selectedRole}
                        onChange={(e) => setSelectedRole(e.target.value)}
                        className="w-full rounded-[4px] border border-[#d20600]/35 bg-[#f8ebcb]/60 px-3.5 py-2.5 text-[14px] text-[#d20600] focus:border-[#d20600] focus:outline-none"
                      >
                        {ROLE_OPTIONS.map((role) => (
                          <option key={role} value={role}>
                            {role}
                          </option>
                        ))}
                      </select>
                    </label>
                    <label className="block">
                      <span className="mb-1.5 block text-[12px] font-medium uppercase">Years of Experience</span>
                      <input
                        type="text"
                        value={experience}
                        onChange={(e) => setExperience(e.target.value)}
                        placeholder="e.g. 2+ years"
                        className="w-full rounded-[4px] border border-[#d20600]/35 bg-[#f8ebcb]/60 px-3.5 py-2.5 text-[14px] text-[#d20600] placeholder:text-[#d20600]/45 focus:border-[#d20600] focus:outline-none"
                      />
                    </label>
                  </div>

                  <label className="block">
                    <span className="mb-1.5 block text-[12px] font-medium uppercase">
                      Portfolio / GitHub / LinkedIn / Resume Link
                    </span>
                    <input
                      type="url"
                      value={portfolioUrl}
                      onChange={(e) => setPortfolioUrl(e.target.value)}
                      placeholder="https://github.com/username"
                      className="w-full rounded-[4px] border border-[#d20600]/35 bg-[#f8ebcb]/60 px-3.5 py-2.5 text-[14px] text-[#d20600] placeholder:text-[#d20600]/45 focus:border-[#d20600] focus:outline-none"
                    />
                  </label>

                  <label className="block">
                    <span className="mb-1.5 block text-[12px] font-medium uppercase">
                      Why PromptVistaML &amp; Relevant Work *
                    </span>
                    <textarea
                      required
                      rows={4}
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder="Share a brief note on your background, key projects, and what excites you about joining PromptVistaML..."
                      className="w-full rounded-[4px] border border-[#d20600]/35 bg-[#f8ebcb]/60 px-3.5 py-2.5 text-[14px] text-[#d20600] placeholder:text-[#d20600]/45 focus:border-[#d20600] focus:outline-none"
                    />
                  </label>

                  <button
                    type="submit"
                    className="inline-flex w-full items-center justify-center gap-2 rounded-[4px] bg-[#d20600] px-6 py-3.5 text-[14px] font-medium uppercase tracking-[-0.02em] text-[#f8ebcb] transition-opacity hover:opacity-90 sm:w-auto"
                  >
                    Submit Application <ArrowRight className="h-4 w-4" />
                  </button>
                </form>
              )}
            </div>
          </div>
        </section>
      </main>

      {/* Footer matching PromptVistaML site (hidden link on footer logo -> /invoice) */}
      <footer className="mt-8 border-t" style={{ borderColor: "rgba(210, 6, 0, 0.2)" }}>
        <div className="mx-auto max-w-[1440px] px-5 py-12 md:px-10">
          <div className="flex flex-col justify-between gap-8 md:flex-row md:items-start">
            <div>
              <p className="mb-2 text-[12px] uppercase opacity-75">[Email]</p>
              <a href="mailto:promptvistaml@gmail.com" className="text-[20px] font-medium underline md:text-[26px]">
                promptvistaml@gmail.com
              </a>
            </div>

            <div className="flex flex-wrap gap-10 text-[13px] uppercase">
              <div className="flex flex-col gap-2">
                <Link href="/" className="hover:opacity-70">HOME</Link>
                <Link href="/#about" className="hover:opacity-70">ABOUT</Link>
                <Link href="/#work" className="hover:opacity-70">WORKS</Link>
                <Link href="/career" className="underline">CAREER</Link>
                <Link href="/contact" className="hover:opacity-70">CONTACT</Link>
              </div>
              <div className="flex flex-col gap-2">
                <a href="https://www.instagram.com/" target="_blank" rel="noreferrer" className="hover:opacity-70">
                  INSTAGRAM
                </a>
                <a href="https://x.com/" target="_blank" rel="noreferrer" className="hover:opacity-70">
                  TWITTER
                </a>
                <a
                  href="https://www.linkedin.com/company/promptvistaml/"
                  target="_blank"
                  rel="noreferrer"
                  className="hover:opacity-70"
                >
                  LINKEDIN
                </a>
              </div>
            </div>
          </div>

          <div
            className="mt-12 flex flex-col justify-between gap-6 border-t pt-8 md:flex-row md:items-end"
            style={{ borderColor: "rgba(210, 6, 0, 0.16)" }}
          >
            <Link href="/invoice" aria-label="Prompt VistaML Invoice Generator" className="inline-block w-fit">
              <img
                src="/assets/images/complete_logo.avif"
                alt="Prompt VistaML logo and name"
                className="h-12 w-auto object-contain"
              />
            </Link>
            <div className="text-[13px] md:text-right">
              <p>© Prompt VistaML 2026</p>
              <p className="opacity-75">All rights reserved</p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

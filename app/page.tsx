"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import Link from "next/link";
import { useRef } from "react";

const FadeIn = ({ children, delay = 0, className = "" }: { children: React.ReactNode; delay?: number; className?: string }) => (
  <motion.div
    className={className}
    initial={{ opacity: 0, y: 28 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-80px" }}
    transition={{ duration: 0.9, delay, ease: [0.16, 1, 0.3, 1] }}
  >
    {children}
  </motion.div>
);

export default function Home() {
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const heroY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  return (
    <div className="w-full overflow-x-hidden">

      {/* ═══════════════════════════════════════════════ 
          1. HERO  ·  bg: NAVY (dark)
      ═══════════════════════════════════════════════ */}
      <section ref={heroRef} className="relative w-full h-screen min-h-[700px] overflow-hidden bg-[#0B1437]">
        <motion.div
          className="absolute inset-0 bg-[url('/images/bible2.jpg')] bg-cover bg-position-[center_40%]"
          style={{ y: heroY }}
        />
        <div className="absolute inset-0 bg-linear-to-t from-[#0B1437] via-[#0B1437]/50 to-[#0B1437]/10" />
        <div className="absolute inset-0 bg-linear-to-r from-[#0B1437]/70 via-transparent to-transparent" />

        <motion.div
          className="absolute inset-0 flex flex-col justify-end px-8 md:px-16 lg:px-24 pb-24"
          style={{ opacity: heroOpacity }}
        >
          <motion.span
            className="font-sans text-[11px] uppercase tracking-[0.4em] text-[#C9A84C] mb-6 block"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, delay: 0.3 }}
          >
            A Digitally Curated Sanctuary
          </motion.span>
          <motion.h1
            className="font-serif text-[clamp(4rem,11vw,10rem)] leading-[0.88] text-white font-medium mb-8 max-w-2xl"
            initial={{ opacity: 0, y: 60 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.3, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          >
            Bread<br />of Life
          </motion.h1>
          <motion.p
            className="font-sans text-base text-white/60 max-w-xs leading-relaxed mb-10"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.6 }}
          >
            Explore the sacred story, discover living scripture, and find community in real grace.
          </motion.p>
          <motion.div
            className="flex flex-wrap gap-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.9 }}
          >
            <Link href="/story" className="inline-flex items-center gap-3 px-8 py-4 bg-[#C9A84C] text-[#0B1437] font-sans font-bold text-xs uppercase tracking-widest hover:bg-white transition-all duration-300">
              Read the Story
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
            </Link>
            <Link href="/who-is-jesus" className="inline-flex items-center px-8 py-4 border border-white/30 text-white font-sans text-xs uppercase tracking-widest hover:border-white/80 transition-all duration-300">
              Who is Jesus?
            </Link>
          </motion.div>
        </motion.div>

        <motion.div
          className="absolute bottom-10 right-10 flex flex-col items-center gap-2 text-white/30"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2 }}
        >
          <motion.div
            className="w-px h-16 bg-linear-to-b from-white/40 to-transparent"
            animate={{ scaleY: [1, 0.4, 1], opacity: [0.4, 1, 0.4] }}
            transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
          />
        </motion.div>
      </section>

      {/* ═══════════════════════════════════════════════ 
          2. STATEMENT  ·  bg: CREAM (light)
      ═══════════════════════════════════════════════ */}
      <section className="bg-[#FAF7F0] py-36 md:py-52 px-8 md:px-16">
        <div className="max-w-6xl mx-auto grid md:grid-cols-[180px_1fr] gap-12 items-start">
          <FadeIn>
            <div className="pt-3">
              <div className="w-px h-16 bg-[#C9A84C] mb-5" />
              <span className="font-sans text-[10px] uppercase tracking-[0.35em] text-[#C9A84C]">The Foundation</span>
            </div>
          </FadeIn>
          <FadeIn delay={0.15}>
            <p className="font-serif text-[clamp(1.9rem,3.8vw,3.4rem)] leading-[1.2] text-[#0B1437]">
              "There is a place of profound rest, of unrelenting love, and of ancient, unshakeable truth — designed for every restless human soul."
            </p>
          </FadeIn>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════ 
          3. EDITORIAL STRIPS  ·  alternating cream / navy
      ═══════════════════════════════════════════════ */}
      <section>

        {/* Index label */}
        <div className="bg-[#FAF7F0] px-8 md:px-16 pt-24 pb-10">
          <FadeIn className="max-w-7xl mx-auto flex items-end justify-between border-b border-[#0B1437]/10 pb-6">
            <h2 className="font-sans text-[10px] uppercase tracking-[0.5em] text-[#0B1437]/30">What's Inside</h2>
            <span className="font-sans text-[10px] text-[#0B1437]/20 uppercase tracking-widest hidden md:block">Bread of Life</span>
          </FadeIn>
        </div>

        {/* I — The Gospel Story | CREAM, image right */}
        <Link href="/story" className="group block">
          <div className="bg-[#FAF7F0] grid grid-cols-1 md:grid-cols-2 border-t border-[#0B1437]/10 group-hover:border-[#C9A84C]/50 transition-colors duration-500 min-h-[460px]">
            <FadeIn className="flex flex-col justify-center px-8 md:px-16 lg:px-24 py-20 order-2 md:order-1">
              <span className="font-sans text-[10px] uppercase tracking-[0.5em] text-[#C9A84C] mb-8 block">I</span>
              <h3 className="font-serif text-[clamp(2.8rem,4.5vw,5rem)] text-[#0B1437] leading-[0.92] mb-8 group-hover:text-[#6B2737] transition-colors duration-300">
                The<br/>Gospel Story
              </h3>
              <p className="font-sans text-base text-[#0B1437]/55 leading-relaxed mb-10 max-w-sm">
                Six chapters. Creation, the Fall, Brokenness, the Cross, Resurrection, and an open invitation.
              </p>
              <span className="inline-flex items-center gap-3 font-sans text-xs uppercase tracking-widest text-[#0B1437]/60 font-bold group-hover:text-[#C9A84C] group-hover:gap-7 transition-all duration-300">
                Begin Reading
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
              </span>
            </FadeIn>
            <div className="relative h-[320px] md:h-auto order-1 md:order-2 overflow-hidden">
              <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1519681393784-d120267933ba?q=80&w=2070&auto=format&fit=crop')] bg-cover bg-center group-hover:scale-105 transition-transform duration-1000 ease-out" />
            </div>
          </div>
        </Link>

        {/* II — Verse Discovery | NAVY, image left */}
        <Link href="/verses" className="group block">
          <div className="bg-[#0B1437] grid grid-cols-1 md:grid-cols-2 border-t border-white/[0.06] group-hover:border-[#C9A84C]/30 transition-colors duration-500 min-h-[460px]">
            <div className="relative h-[320px] md:h-auto overflow-hidden order-1">
              <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1481627834876-b7833e8f5570?q=80&w=1528&auto=format&fit=crop')] bg-cover bg-center group-hover:scale-105 transition-transform duration-1000 ease-out" />
              <div className="absolute inset-0 bg-linear-to-r from-transparent to-[#0B1437]/20" />
            </div>
            <FadeIn className="flex flex-col justify-center px-8 md:px-16 lg:px-24 py-20 order-2">
              <span className="font-sans text-[10px] uppercase tracking-[0.5em] text-[#C9A84C] mb-8 block">II</span>
              <h3 className="font-serif text-[clamp(2.8rem,4.5vw,5rem)] text-white leading-[0.92] mb-8">
                Verse<br/>Discovery
              </h3>
              <p className="font-sans text-base text-white/45 leading-relaxed mb-10 max-w-sm">
                Choose your emotional state and be instantly met with living scripture that speaks precisely to where you are.
              </p>
              <span className="inline-flex items-center gap-3 font-sans text-xs uppercase tracking-widest text-white/40 font-bold group-hover:text-[#C9A84C] group-hover:gap-7 transition-all duration-300">
                Find a Verse
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
              </span>
            </FadeIn>
          </div>
        </Link>

        {/* III — Faith Journal | CREAM, image right */}
        <Link href="/journal" className="group block">
          <div className="bg-[#FAF7F0] grid grid-cols-1 md:grid-cols-2 border-t border-[#0B1437]/10 group-hover:border-[#C9A84C]/50 transition-colors duration-500 min-h-[460px]">
            <FadeIn className="flex flex-col justify-center px-8 md:px-16 lg:px-24 py-20 order-2 md:order-1">
              <span className="font-sans text-[10px] uppercase tracking-[0.5em] text-[#C9A84C] mb-8 block">III</span>
              <h3 className="font-serif text-[clamp(2.8rem,4.5vw,5rem)] text-[#0B1437] leading-[0.92] mb-8 group-hover:text-[#6B2737] transition-colors duration-300">
                Faith<br/>Journal
              </h3>
              <p className="font-sans text-base text-[#0B1437]/55 leading-relaxed mb-10 max-w-sm">
                Editorial reflections on theology, grace, and what it means to live a life of faith in the modern world. Quiet. Thoughtful. Well-crafted.
              </p>
              <span className="inline-flex items-center gap-3 font-sans text-xs uppercase tracking-widest text-[#0B1437]/60 font-bold group-hover:text-[#C9A84C] group-hover:gap-7 transition-all duration-300">
                Enter the Library
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
              </span>
            </FadeIn>
            <div className="relative h-[320px] md:h-auto order-1 md:order-2 overflow-hidden">
              <div className="absolute inset-0 bg-[url('images/journal2.jpg')] bg-cover bg-center group-hover:scale-105 transition-transform duration-1000 ease-out" />
            </div>
          </div>
        </Link>

        {/* IV — Who is Jesus | NAVY, image left */}
        <Link href="/who-is-jesus" className="group block">
          <div className="bg-[#0B1437] grid grid-cols-1 md:grid-cols-2 border-t border-white/[0.06] group-hover:border-[#C9A84C]/30 transition-colors duration-500 min-h-[460px]">
            <div className="relative h-[320px] md:h-auto overflow-hidden order-1">
              <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1516912481808-3406841bd33c?q=80&w=1544&auto=format&fit=crop')] bg-cover bg-[center_20%] group-hover:scale-105 transition-transform duration-1000 ease-out" />
              <div className="absolute inset-0 bg-linear-to-r from-transparent to-[#0B1437]/20" />
            </div>
            <FadeIn className="flex flex-col justify-center px-8 md:px-16 lg:px-24 py-20 order-2">
              <span className="font-sans text-[10px] uppercase tracking-[0.5em] text-[#C9A84C] mb-8 block">IV</span>
              <h3 className="font-serif text-[clamp(2.8rem,4.5vw,5rem)] text-white leading-[0.92] mb-8">
                Who is<br/>Jesus?
              </h3>
              <p className="font-sans text-base text-white/45 leading-relaxed mb-10 max-w-sm">
                A gentle, honest, and scripturally-grounded answer to the most important question ever asked of humanity.
              </p>
              <span className="inline-flex items-center gap-3 font-sans text-xs uppercase tracking-widest text-white/40 font-bold group-hover:text-[#C9A84C] group-hover:gap-7 transition-all duration-300">
                Discover Him
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
              </span>
            </FadeIn>
          </div>
        </Link>

        {/* V + VI — Daily & Prayer side-by-side | CREAM, no images */}
        <div className="bg-[#FAF7F0] border-t border-[#0B1437]/10 grid grid-cols-1 md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-[#0B1437]/10">
          <Link href="/daily" className="group block">
            <div className="px-8 md:px-16 lg:px-20 py-16 min-h-[280px] flex flex-col justify-center">
              <FadeIn>
                <span className="font-sans text-[10px] uppercase tracking-[0.5em] text-[#C9A84C] mb-6 block">V · Daily</span>
                <h3 className="font-serif text-[clamp(2rem,3vw,3rem)] text-[#0B1437] leading-tight mb-5 group-hover:text-[#6B2737] transition-colors duration-300">60 Seconds With Jesus</h3>
                <p className="font-sans text-sm text-[#0B1437]/50 mb-6 max-w-xs leading-relaxed">A verse, a reflection, a prayer. Under a minute, every morning.</p>
                <span className="font-sans text-xs uppercase tracking-widest text-[#C9A84C]">Today's Word →</span>
              </FadeIn>
            </div>
          </Link>
          <Link href="/prayer" className="group block">
            <div className="px-8 md:px-16 lg:px-20 py-16 min-h-[280px] flex flex-col justify-center">
              <FadeIn delay={0.1}>
                <span className="font-sans text-[10px] uppercase tracking-[0.5em] text-[#C9A84C] mb-6 block">VI · Prayer</span>
                <h3 className="font-serif text-[clamp(2rem,3vw,3rem)] text-[#0B1437] leading-tight mb-5 group-hover:text-[#6B2737] transition-colors duration-300">Prayer Corner</h3>
                <p className="font-sans text-sm text-[#0B1437]/50 mb-6 max-w-xs leading-relaxed">Leave your burdens here. You do not have to carry them alone.</p>
                <span className="font-sans text-xs uppercase tracking-widest text-[#C9A84C]">Leave a Request →</span>
              </FadeIn>
            </div>
          </Link>
        </div>

      </section>


      {/* ═══════════════════════════════════════════════ 
          4. VERSE SPOTLIGHT  ·  bg: CREAM (light)
      ═══════════════════════════════════════════════ */}
      <section className="bg-[#FAF7F0] py-40 px-8 md:px-16">
        <div className="max-w-4xl mx-auto text-center">
          <FadeIn>
            <div className="w-px h-16 bg-[#C9A84C] mx-auto mb-10" />
            <blockquote className="font-serif text-[clamp(2rem,4.5vw,3.8rem)] text-[#0B1437] leading-tight mb-8">
              "Come to me, all you who are weary and burdened, and I will give you rest."
            </blockquote>
            <p className="font-sans text-sm uppercase tracking-widest text-[#0B1437]/40 mb-14">— Matthew 11:28</p>
            <Link
              href="/verses"
              className="inline-flex items-center gap-3 px-10 py-5 border-2 border-[#0B1437] text-[#0B1437] font-sans font-bold text-xs uppercase tracking-widest hover:bg-[#0B1437] hover:text-white transition-all duration-300"
            >
              Find a Verse for Your Season
            </Link>
          </FadeIn>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════ 
          5. TESTIMONIES  ·  bg: NAVY (dark)
      ═══════════════════════════════════════════════ */}
      <section className="bg-[#0B1437] grid grid-cols-1 lg:grid-cols-2 min-h-[620px]">
        {/* Right copy — navy bg */}
        <div className="flex items-center px-10 md:px-16 lg:px-20 py-24 order-2 lg:order-1">
          <FadeIn className="max-w-lg">
            <div className="w-px h-12 bg-[#C9A84C] mb-8" />
            <span className="font-sans text-[10px] uppercase tracking-[0.4em] text-[#C9A84C] mb-6 block">Community</span>
            <h2 className="font-serif text-[clamp(2.2rem,3.8vw,3.5rem)] text-white mb-6 leading-tight">
              Real stories of real encounter with God.
            </h2>
            <p className="font-sans text-base text-white/50 leading-relaxed mb-10">
              Ordinary people, extraordinary grace. Read what God has done in real lives — and share what He has done in yours.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link href="/testimonies" className="inline-flex items-center gap-3 px-8 py-4 bg-[#C9A84C] text-[#0B1437] font-sans font-bold text-xs uppercase tracking-widest hover:bg-white transition-all">
                Read Testimonies
              </Link>
              <Link href="/testimonies" className="inline-flex items-center px-8 py-4 border border-white/20 text-white font-sans text-xs uppercase tracking-widest hover:border-[#C9A84C] hover:text-[#C9A84C] transition-all">
                Share Yours →
              </Link>
            </div>
          </FadeIn>
        </div>

        {/* Left photo */}
        <div
          className="relative h-[400px] lg:h-auto order-1 lg:order-2 bg-[url('https://images.unsplash.com/photo-1544027993-37dbfe43562a?q=80&w=1470&auto=format&fit=crop')] bg-cover bg-center"
        >
          <div className="absolute inset-0 bg-[#0B1437]/20" />
        </div>
      </section>

      {/* ═══════════════════════════════════════════════ 
          6. DAILY CTA  ·  bg: CREAM (light)
      ═══════════════════════════════════════════════ */}
      <section className="bg-[#FAF7F0] py-40 px-8 md:px-16">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-20 items-end">
            <FadeIn>
              <span className="font-sans text-[10px] uppercase tracking-[0.4em] text-[#C9A84C] mb-6 block">Daily</span>
              <h2 className="font-serif text-[clamp(2.5rem,5vw,5rem)] text-[#0B1437] leading-[0.9]">
                60 Seconds<br/>With Jesus.<br/>Every morning.
              </h2>
            </FadeIn>
            <FadeIn delay={0.15} className="flex flex-col gap-6">
              <p className="font-sans text-lg text-[#0B1437]/60 leading-relaxed">
                A single verse. A short reflection. A written prayer. Under a minute — but it can reorder your entire day.
              </p>
              <Link
                href="/daily"
                className="self-start inline-flex items-center gap-3 px-8 py-4 bg-[#0B1437] text-white font-sans font-bold text-xs uppercase tracking-widest hover:bg-[#C9A84C] hover:text-[#0B1437] transition-all duration-300"
              >
                Read Today's Devotional
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
              </Link>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════ 
          7. PRAYER CAPSTONE  ·  bg: NAVY (dark)
      ═══════════════════════════════════════════════ */}
      <section className="bg-[#0B1437] py-40 px-8 md:px-16 text-center relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('/images/community2.jpg')] bg-cover bg-top opacity-10" />
        <div className="relative z-10 max-w-2xl mx-auto">
          <FadeIn>
            <span className="font-sans text-[10px] uppercase tracking-[0.4em] text-[#C9A84C] mb-8 block">Not Alone</span>
            <h2 className="font-serif text-[clamp(2.2rem,5vw,4.2rem)] text-white mb-6 leading-tight">
              You don't have to<br/>carry it alone.
            </h2>
            <p className="font-sans text-base text-white/50 leading-relaxed mb-14 max-w-lg mx-auto">
              Leave your burdens on the prayer wall. Let this community stand with you in faith.
            </p>
            <Link
              href="/prayer"
              className="inline-flex items-center gap-3 font-sans text-sm uppercase tracking-widest text-[#C9A84C] pb-1 border-b border-[#C9A84C]/40 hover:border-[#C9A84C] hover:gap-6 transition-all duration-300"
            >
              Enter the Prayer Space
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
            </Link>
          </FadeIn>
        </div>
      </section>

    </div>
  );
}

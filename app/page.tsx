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
          3. CARD GRID  ·  bg: NAVY (dark)
      ═══════════════════════════════════════════════ */}
      <section className="bg-[#0B1437] py-20 px-8 md:px-16">
        <FadeIn className="max-w-[1500px] mx-auto mb-12 flex items-center gap-6">
          <span className="font-sans text-[10px] uppercase tracking-[0.4em] text-white/30">Explore</span>
          <div className="flex-1 h-px bg-white/10" />
        </FadeIn>

        <div className="max-w-[1500px] mx-auto flex flex-col gap-4">

          {/* Row 1: Story (dominant) + Daily + Prayer */}
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-4">

            {/* STORY — big card with compelling cross/light image */}
            <FadeIn className="lg:col-span-3">
              <Link href="/story" className="group block">
                <div className="relative h-[540px] lg:h-[660px] overflow-hidden">
                  {/* Dramatic light-ray cross image */}
                  <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1519681393784-d120267933ba?q=80&w=2070&auto=format&fit=crop')] bg-cover bg-center group-hover:scale-105 transition-transform duration-1000" />
                  <div className="absolute inset-0 bg-linear-to-t from-black/90 via-black/30 to-transparent" />
                  <div className="absolute inset-0 bg-linear-to-r from-black/40 to-transparent" />
                  <div className="absolute inset-0 p-10 flex flex-col justify-between">
                    <span className="font-sans text-[10px] uppercase tracking-widest text-[#C9A84C]">The Narrative</span>
                    <div>
                      <h3 className="font-serif text-5xl md:text-6xl text-white mb-4 leading-[0.95]">The<br/>Gospel Story</h3>
                      <p className="font-sans text-sm text-white/50 mb-6 max-w-xs leading-relaxed">Six chapters. Creation, the Fall, Brokenness, the Cross, Resurrection, and Salvation.</p>
                      <span className="inline-flex items-center gap-2 text-xs font-sans uppercase tracking-widest text-[#C9A84C] group-hover:gap-5 transition-all duration-300">
                        Begin the Journey
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
            </FadeIn>

            {/* Right column stack */}
            <div className="lg:col-span-2 grid grid-rows-2 gap-4">
              {/* DAILY — gold */}
              <FadeIn delay={0.1}>
                <Link href="/daily" className="group block h-full">
                  <div className="relative h-full min-h-[250px] overflow-hidden bg-[#C9A84C]">
                    <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1506905925346-21bda4d32df4?q=80&w=2070&auto=format&fit=crop')] bg-cover bg-center opacity-15 group-hover:opacity-25 group-hover:scale-105 transition-all duration-700" />
                    <div className="absolute inset-0 p-8 flex flex-col justify-between">
                      <span className="font-sans text-[10px] uppercase tracking-widest text-[#0B1437]/50">Daily</span>
                      <div>
                        <h3 className="font-serif text-4xl text-[#0B1437] mb-2 leading-tight">60 Seconds<br/>With Jesus</h3>
                        <span className="font-sans text-xs text-[#0B1437]/60 uppercase tracking-widest">Today's Reflection →</span>
                      </div>
                    </div>
                  </div>
                </Link>
              </FadeIn>

              {/* PRAYER — cream on navy */}
              <FadeIn delay={0.2}>
                <Link href="/prayer" className="group block h-full">
                  <div className="relative h-full min-h-[250px] overflow-hidden bg-[#FAF7F0]">
                    <div className="absolute inset-0 p-8 flex flex-col justify-between">
                      <span className="font-sans text-[10px] uppercase tracking-widest text-[#0B1437]/30">A Safe Space</span>
                      <div>
                        <h3 className="font-serif text-4xl text-[#0B1437] mb-3 leading-tight">Prayer<br/>Corner</h3>
                        <p className="font-sans text-sm text-[#0B1437]/50 mb-4 leading-relaxed max-w-xs">Leave your burdens here. You do not have to carry them alone.</p>
                        <span className="font-sans text-xs uppercase tracking-widest text-[#C9A84C]">Leave a Request →</span>
                      </div>
                    </div>
                  </div>
                </Link>
              </FadeIn>
            </div>
          </div>

          {/* Row 2: Verses + Journal + Who Is Jesus */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">

            {/* VERSES */}
            <FadeIn>
              <Link href="/verses" className="group block">
                <div className="relative h-[380px] overflow-hidden">
                  <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1481627834876-b7833e8f5570?q=80&w=1528&auto=format&fit=crop')] bg-cover bg-center group-hover:scale-105 transition-transform duration-700" />
                  <div className="absolute inset-0 bg-linear-to-t from-[#0B1437] via-[#0B1437]/20 to-transparent" />
                  <div className="absolute inset-0 p-8 flex flex-col justify-between">
                    <span className="font-sans text-[10px] uppercase tracking-widest text-[#C9A84C]">Living Word</span>
                    <div>
                      <h3 className="font-serif text-4xl text-white mb-3 leading-tight">Verse Discovery</h3>
                      <p className="font-sans text-xs text-white/50 leading-relaxed">Find scripture for exactly where you are.</p>
                    </div>
                  </div>
                </div>
              </Link>
            </FadeIn>

            {/* JOURNAL */}
            <FadeIn delay={0.1}>
              <Link href="/journal" className="group block">
                <div className="relative h-[380px] overflow-hidden bg-[#FAF7F0]">
                  <div className="absolute top-0 left-0 right-0 h-[55%] bg-[url('https://images.unsplash.com/photo-1455390582262-044cdead2708?q=80&w=1000&auto=format&fit=crop')] bg-cover bg-center group-hover:scale-105 transition-transform duration-700" />
                  <div className="absolute inset-0 bg-linear-to-t from-[#FAF7F0] via-[#FAF7F0]/50 to-transparent" />
                  <div className="absolute inset-0 p-8 flex flex-col justify-between">
                    <span className="font-sans text-[10px] uppercase tracking-widest text-[#C9A84C]">Editorial</span>
                    <div>
                      <h3 className="font-serif text-4xl text-[#0B1437] mb-3 leading-tight">Faith Journal</h3>
                      <span className="font-sans text-xs uppercase tracking-widest text-[#C9A84C] group-hover:gap-3 transition-all">Enter Library →</span>
                    </div>
                  </div>
                </div>
              </Link>
            </FadeIn>

            {/* WHO IS JESUS */}
            <FadeIn delay={0.2}>
              <Link href="/who-is-jesus" className="group block">
                <div className="relative h-[380px] overflow-hidden bg-[#6B2737]">
                  <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1505855265981-d52719d1f64e?q=80&w=1459&auto=format&fit=crop')] bg-cover bg-center opacity-25 group-hover:opacity-40 group-hover:scale-105 transition-all duration-700" />
                  <div className="absolute inset-0 bg-linear-to-t from-black/60 to-transparent" />
                  <div className="absolute inset-0 p-8 flex flex-col justify-between">
                    <span className="font-sans text-[10px] uppercase tracking-widest text-[#C9A84C]">The Person</span>
                    <div>
                      <h3 className="font-serif text-4xl text-white mb-3 leading-tight">Who is Jesus?</h3>
                      <p className="font-sans text-xs text-white/50 leading-relaxed">An honest answer to the most important question ever asked.</p>
                    </div>
                  </div>
                </div>
              </Link>
            </FadeIn>
          </div>
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

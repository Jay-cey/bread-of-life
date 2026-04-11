"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ScriptureBlock from "@/components/ScriptureBlock";

export default function WhoIsJesusPage() {
  const [hasPrayed, setHasPrayed] = useState(false);

  return (
    <div className="bg-background min-h-screen pt-45 md:pt-40 pb-0 overflow-hidden">
      <div className="max-w-6xl mx-auto px-6 mb-32">

        {/* Header */}
        <motion.div
          className="text-center mb-32"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <span className="font-sans text-sm tracking-widest uppercase text-accent font-bold mb-6 block">
            The Core Message
          </span>
          <h1 className="font-serif text-5xl md:text-7xl text-primary mb-8 leading-[1.1]">
            Who is Jesus?
          </h1>
          <p className="font-sans text-lg md:text-xl text-foreground opacity-80 leading-relaxed max-w-2xl mx-auto">
            He is the most significant figure in human history, not merely because of His teachings, but because of what He accomplished for us to restore our broken relationship with the Creator.
          </p>
        </motion.div>

        {/* Editorial Sections (Zig Zag) */}
        
        {/* Section 1: The Problem */}
        <div className="grid md:grid-cols-2 gap-16 md:gap-24 items-center mb-32 relative">
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            className="relative z-10"
          >
            <div className="absolute -top-16 -left-8 text-9xl font-serif font-black text-secondary opacity-30 select-none -z-10">01</div>
            <h2 className="font-serif text-4xl text-primary mb-6">The Problem</h2>
            <div className="font-sans text-lg text-foreground opacity-80 leading-relaxed space-y-6 mb-8">
              <p>
                We were created for relationship with God, but humanity chose its own way. This rebellion—what the Bible calls sin—fractured our connection with Him. Because God is perfectly just and holy, He cannot simply ignore sin.
              </p>
              <p>
                Our brokenness left us unable to fix the rift on our own. No amount of human effort or moral living could bridge the gap.
              </p>
            </div>
            <ScriptureBlock
              verse="But your iniquities have separated you from your God; your sins have hidden his face from you, so that he will not hear."
              reference="Isaiah 59:2"
            />
          </motion.div>
          <motion.div 
            initial={{ opacity: 0, x: 50, scale: 0.95 }}
            whileInView={{ opacity: 1, x: 0, scale: 1 }}
            viewport={{ once: true, amount: 0.3 }}
            className="h-[400px] md:h-[600px] w-full rounded-2xl overflow-hidden shadow-2xl"
          >
            <div className="w-full h-full bg-cover bg-center" style={{ backgroundImage: `url('/images/sin.jpg')`}} />
          </motion.div>
        </div>

        {/* Section 2: God's Love */}
        <div className="grid md:grid-cols-2 gap-16 md:gap-24 items-center mb-32 relative">
          <motion.div 
            initial={{ opacity: 0, x: -50, scale: 0.95 }}
            whileInView={{ opacity: 1, x: 0, scale: 1 }}
            viewport={{ once: true, amount: 0.3 }}
            className="h-[400px] md:h-[600px] w-full rounded-2xl overflow-hidden shadow-2xl order-2 md:order-1"
          >
            <div className="w-full h-full bg-cover bg-center" style={{ backgroundImage: `url('/images/love.jpg')`}} />
          </motion.div>
          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            className="relative z-10 order-1 md:order-2"
          >
            <div className="absolute -top-16 -left-8 text-9xl font-serif font-black text-secondary opacity-30 select-none -z-10">02</div>
            <h2 className="font-serif text-4xl text-primary mb-6">God's Love</h2>
            <div className="font-sans text-lg text-foreground opacity-80 leading-relaxed space-y-6 mb-8">
              <p>
                Yet, God did not leave us to our fate. His love for us is reckless, profound, and pursuing. He devised a rescue plan that would satisfy His perfect justice while demonstrating His infinite mercy.
              </p>
            </div>
            <ScriptureBlock
              verse="For God so loved the world that he gave his one and only Son, that whoever believes in him shall not perish but have eternal life."
              reference="John 3:16"
            />
          </motion.div>
        </div>

        {/* Section 3: Christ's Sacrifice */}
        <div className="grid md:grid-cols-2 gap-16 md:gap-24 items-center mb-32 relative">
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            className="relative z-10"
          >
            <div className="absolute -top-16 -left-8 text-9xl font-serif font-black text-secondary opacity-30 select-none -z-10">03</div>
            <h2 className="font-serif text-4xl text-primary mb-6">Christ's Sacrifice</h2>
            <div className="font-sans text-lg text-foreground opacity-80 leading-relaxed space-y-6 mb-8">
              <p>
                Jesus Christ, who is God in the flesh, stepped into our reality. He lived the perfect, sinless life we failed to live, and willingly went to the cross. There, He endured the punishment for our rebellion. He paid our debt in full.
              </p>
              <p>
                Three days later, He rose from the dead, proving His power over sin and death, and opening the door to eternal life for all who would trust Him.
              </p>
            </div>
            <ScriptureBlock
              verse="“He himself bore our sins” in his body on the cross, so that we might die to sins and live for righteousness; “by his wounds you have been healed.”"
              reference="1 Peter 2:24"
            />
          </motion.div>
          <motion.div 
            initial={{ opacity: 0, x: 50, scale: 0.95 }}
            whileInView={{ opacity: 1, x: 0, scale: 1 }}
            viewport={{ once: true, amount: 0.3 }}
            className="h-[400px] md:h-[600px] w-full rounded-2xl overflow-hidden shadow-2xl"
          >
            <div className="w-full h-full bg-cover bg-center" style={{ backgroundImage: `url('/images/sacrifice.jpg')`}} />
          </motion.div>
        </div>

        {/* Section 4: The Invitation */}
        <div className="grid md:grid-cols-2 gap-16 md:gap-24 items-center mb-32 relative">
          <motion.div 
            initial={{ opacity: 0, x: -50, scale: 0.95 }}
            whileInView={{ opacity: 1, x: 0, scale: 1 }}
            viewport={{ once: true, amount: 0.3 }}
            className="h-[400px] md:h-[600px] w-full rounded-2xl overflow-hidden shadow-2xl order-2 md:order-1"
          >
            <div className="w-full h-full bg-cover bg-center" style={{ backgroundImage: `url('/images/invite.jpg')`}} />
          </motion.div>
          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            className="relative z-10 order-1 md:order-2"
          >
            <div className="absolute -top-16 -left-8 text-9xl font-serif font-black text-secondary opacity-30 select-none -z-10">04</div>
            <h2 className="font-serif text-4xl text-primary mb-6">The Invitation</h2>
            <div className="font-sans text-lg text-foreground opacity-80 leading-relaxed space-y-6 mb-8">
              <p>
                Knowing about Jesus isn't enough. He invites you to respond. This requires repentance—turning away from leading your own life—and placing your complete trust and faith in Him as your Savior and Lord.
              </p>
            </div>
            <ScriptureBlock
              verse="Here I am! I stand at the door and knock. If anyone hears my voice and opens the door, I will come in and eat with that person, and they with me."
              reference="Revelation 3:20"
            />
          </motion.div>
        </div>

      </div>

      {/* Section 5: A Prayer (Full Bleed Footer Banner) */}
      <motion.section
        className="w-full bg-primary text-background py-32 relative"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
      >
        <div className="max-w-4xl mx-auto px-6 relative z-10">
          <h2 className="font-serif text-5xl md:text-6xl text-background mb-8 text-center leading-tight">
            A Prayer of Surrender
          </h2>
          <p className="font-sans text-lg text-secondary opacity-80 text-center mb-12 max-w-2xl mx-auto">
            If you are ready to accept this invitation, you can pray these words to God right now. The exact words matter less than the posture of your heart.
          </p>

          <blockquote className="font-serif text-2xl md:text-3xl italic text-background leading-relaxed text-center mb-16 mx-auto px-8 py-8 border-y border-secondary border-opacity-20">
            "Lord Jesus, I admit that I am a sinner and have lived life my own way. Thank you for loving me enough to die on the cross for my sins, and for rising from the dead. I turn from my old life and ask You to forgive me. I surrender my life to You today. Please come into my heart and be my Lord and Savior. Amen."
          </blockquote>

          <div className="flex justify-center">
            <AnimatePresence mode="wait">
              {!hasPrayed ? (
                <motion.button
                  key="pray-btn"
                  onClick={() => setHasPrayed(true)}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  className="px-12 py-5 bg-accent text-white font-serif text-xl tracking-widest uppercase rounded hover:bg-accent-secondary hover:shadow-[0_0_40px_rgba(var(--accent-rgb),0.5)] transition-all duration-500 transform hover:-translate-y-1"
                >
                  I prayed this today
                </motion.button>
              ) : (
                <motion.div
                  key="success-msg"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center bg-background/5 backdrop-blur-md p-10 rounded-2xl border border-secondary border-opacity-20"
                >
                  <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-accent text-white mb-6 mx-auto shadow-2xl">
                    <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <h3 className="font-serif text-3xl text-background mb-4">Welcome to the family.</h3>
                  <p className="font-sans text-secondary opacity-90 text-lg leading-relaxed max-w-lg mx-auto">
                    Heaven is rejoicing. Your new journey with Christ has just begun.
                    Reach out to a local church to begin walking out your faith.
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </motion.section>

    </div>
  );
}

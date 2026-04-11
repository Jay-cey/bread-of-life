"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ScriptureBlock from "@/components/ScriptureBlock";

export default function WhoIsJesusPage() {
  const [hasPrayed, setHasPrayed] = useState(false);

  return (
    <div className="bg-[var(--background)] min-h-screen pt-20 pb-32">
      <div className="max-w-3xl mx-auto px-6">
        
        {/* Header */}
        <motion.div 
          className="text-center mb-20"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <span className="font-sans text-sm tracking-widest uppercase text-[var(--accent)] font-bold mb-4 block">
            The core message
          </span>
          <h1 className="font-serif text-5xl md:text-6xl text-[var(--primary)] mb-6">
            Who is Jesus?
          </h1>
          <p className="font-sans text-lg text-[var(--foreground)] opacity-80 leading-relaxed max-w-2xl mx-auto">
            He is the most significant figure in human history, not merely because of His teachings, but because of what He accomplished for us to restore our broken relationship with the Creator.
          </p>
        </motion.div>

        {/* Section 1: The Problem */}
        <motion.section 
          className="mb-20"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
        >
          <h2 className="font-serif text-3xl text-[var(--primary)] mb-6 flex items-center gap-4">
            <span className="text-[var(--accent)]">01.</span> The Problem
          </h2>
          <div className="font-sans text-lg text-[var(--foreground)] opacity-80 leading-relaxed space-y-4">
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
        </motion.section>

        {/* Section 2: God's Love */}
        <motion.section 
          className="mb-20"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
        >
          <h2 className="font-serif text-3xl text-[var(--primary)] mb-6 flex items-center gap-4">
            <span className="text-[var(--accent)]">02.</span> God's Love
          </h2>
          <div className="font-sans text-lg text-[var(--foreground)] opacity-80 leading-relaxed space-y-4">
            <p>
              Yet, God did not leave us to our fate. His love for us is reckless, profound, and pursuing. He devised a rescue plan that would satisfy His perfect justice while demonstrating His infinite mercy.
            </p>
          </div>
          <ScriptureBlock 
            verse="For God so loved the world that he gave his one and only Son, that whoever believes in him shall not perish but have eternal life."
            reference="John 3:16" 
          />
        </motion.section>

        {/* Section 3: Christ's Sacrifice */}
        <motion.section 
          className="mb-20"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
        >
          <h2 className="font-serif text-3xl text-[var(--primary)] mb-6 flex items-center gap-4">
            <span className="text-[var(--accent)]">03.</span> Christ's Sacrifice
          </h2>
          <div className="font-sans text-lg text-[var(--foreground)] opacity-80 leading-relaxed space-y-4">
            <p>
              Jesus Christ, who is God in the flesh, stepped into our reality. He lived the perfect, sinless life we failed to live, and willingly went to the cross. There, He endured the punishment for our rebellion. He paid our debt in full.
            </p>
            <p>
              Three days later, He rose from the dead, proving His power over sin and death, and opening the door to eternal life for all who would trust Him.
            </p>
          </div>
          <ScriptureBlock 
            verse="He himself bore our sins in his body on the cross, so that we might die to sins and live for righteousness; by his wounds you have been healed."
            reference="1 Peter 2:24" 
          />
        </motion.section>

        {/* Section 4: The Invitation */}
        <motion.section 
          className="mb-20"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
        >
          <h2 className="font-serif text-3xl text-[var(--primary)] mb-6 flex items-center gap-4">
            <span className="text-[var(--accent)]">04.</span> The Invitation
          </h2>
          <div className="font-sans text-lg text-[var(--foreground)] opacity-80 leading-relaxed space-y-4">
            <p>
              Knowing about Jesus isn't enough. He invites you to respond. This requires repentance—turning away from leading your own life—and placing your complete trust and faith in Him as your Savior and Lord.
            </p>
          </div>
          <ScriptureBlock 
            verse="Here I am! I stand at the door and knock. If anyone hears my voice and opens the door, I will come in and eat with that person, and they with me."
            reference="Revelation 3:20" 
          />
        </motion.section>

        {/* Section 5: A Prayer */}
        <motion.section 
          className="bg-[var(--secondary)] p-8 md:p-12 rounded border border-[var(--accent)] border-opacity-30 relative overflow-hidden"
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
        >
          <div className="relative z-10">
            <h2 className="font-serif text-4xl text-[var(--primary)] mb-6 text-center">
              A Prayer of Surrender
            </h2>
            <p className="font-sans text-[var(--foreground)] opacity-80 text-center mb-8 max-w-lg mx-auto">
              If you are ready to accept this invitation, you can pray these words to God right now. The exact words matter less than the posture of your heart.
            </p>

            <blockquote className="font-serif text-xl md:text-2xl italic text-[var(--primary)] leading-loose text-center mb-10 max-w-xl mx-auto px-4 border-l-2 border-r-2 border-[var(--accent)]">
              "Lord Jesus, I admit that I am a sinner and have lived life my own way. Thank you for loving me enough to die on the cross for my sins, and for rising from the dead. I turn from my old life and ask You to forgive me. I surrender my life to You today. Please come into my heart and be my Lord and Savior. Amen."
            </blockquote>

            <div className="flex justify-center">
              <AnimatePresence mode="wait">
                {!hasPrayed ? (
                  <motion.button
                    key="pray-btn"
                    onClick={() => setHasPrayed(true)}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    className="px-10 py-4 bg-[var(--accent)] text-[var(--foreground)] font-serif text-xl tracking-wider uppercase rounded hover:bg-[var(--accent-secondary)] hover:text-white transition-all duration-300 shadow-xl"
                  >
                    I prayed this today
                  </motion.button>
                ) : (
                  <motion.div
                    key="success-msg"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="text-center"
                  >
                    <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-100 text-green-600 mb-4 mx-auto dark:bg-green-900 dark:text-green-300">
                      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <h3 className="font-serif text-2xl text-[var(--primary)] mb-2">Welcome to the family.</h3>
                    <p className="font-sans text-[var(--foreground)] opacity-80">
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
    </div>
  );
}

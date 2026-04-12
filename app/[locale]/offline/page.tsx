export default function OfflinePage() {
  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center p-6 text-center">
      <div className="w-16 h-16 rounded-full border border-primary border-opacity-20 flex items-center justify-center mb-8">
        <svg className="w-8 h-8 text-primary opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 18l-3-3m0 0l-3 3m3-3v6" />
        </svg>
      </div>
      <h1 className="font-serif text-4xl md:text-5xl text-primary mb-6">
        You are offline.
      </h1>
      <p className="font-sans text-lg text-foreground opacity-70 mb-12 max-w-md mx-auto">
        While the network is disconnected, here is a verse to hold onto:
      </p>
      
      <div className="bg-secondary p-8 md:p-12 rounded-xl border border-primary border-opacity-10 max-w-2xl relative">
        <blockquote className="font-serif text-2xl md:text-3xl text-primary italic leading-relaxed mb-8">
          "The Lord is near to all who call on him, to all who call on him in truth."
        </blockquote>
        <span className="block font-sans text-xs uppercase tracking-widest text-accent font-bold">
          Psalm 145:18
        </span>
      </div>
    </div>
  );
}

export default function Loading() {
  return (
    <div className="min-h-screen bg-background pt-40 px-6 max-w-7xl mx-auto w-full animate-pulse flex flex-col gap-12">
      {/* Header Skeleton */}
      <div className="flex flex-col gap-6 max-w-2xl">
        <div className="w-16 h-1 bg-primary/20 rounded"></div>
        <div className="w-3/4 h-16 bg-primary/10 rounded-md"></div>
        <div className="w-1/2 h-6 bg-primary/5 rounded"></div>
      </div>

      {/* Grid Skeleton */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12 w-full">
        {[...Array(6)].map((_, i) => (
          <div key={i} className="w-full h-80 bg-secondary rounded-xl border border-primary/5 flex flex-col p-8 justify-end gap-4">
            <div className="w-full h-4 bg-primary/5 rounded"></div>
            <div className="w-2/3 h-4 bg-primary/10 rounded"></div>
          </div>
        ))}
      </div>
    </div>
  );
}

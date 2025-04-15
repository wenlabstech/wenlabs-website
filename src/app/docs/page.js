"use client";

export default function DocsPage() {
  return (
    <div className="relative min-h-screen bg-background text-foreground px-4">
      {/* Background Video */}
      <video
        className="absolute top-0 left-0 w-full h-full object-cover opacity-5 z-0" // Reduced opacity for less visibility
        autoPlay
        loop
        muted
      >
        <source src="/docs-video.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      {/* Content */}
      <div className="absolute left-1/2 transform -translate-x-1/2 top-[37%] text-center z-10">
        <h1 className="text-4xl md:text-5xl font-bold text-primary mb-4">
          📚 Docs Coming Soon
        </h1>
        <p className="text-muted text-lg max-w-xl mx-auto">
          Our documentation isn’t live just yet — it’ll launch alongside <span className="text-accent font-semibold">Wen AI</span>. Stay tuned!
        </p>
      </div>
    </div>
  );
}

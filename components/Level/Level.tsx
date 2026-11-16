
export default function Level() {
  return (
    <main className="ed-container flex min-h-screen max-w-5xl items-center justify-center py-10">
      <div className="w-full overflow-hidden rounded-3xl border-4 border-grape-200 bg-black shadow-xl">
        <video
          className="aspect-video w-full"
          controls
          playsInline
          preload="metadata"
        >
          <source src="/story/story1.mp4" type="video/mp4" />
          Your browser does not support video playback.
        </video>
      </div>
    </main>
  );
}

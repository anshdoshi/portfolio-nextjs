// components/BackgroundVideo.tsx
export default function BackgroundVideo() {
  return (
    <video
      autoPlay
      muted
      loop
      playsInline
      className="rotate-180 absolute top-[-340px] h-full w-full left-0 z-[1] object-cover"
      preload="auto"
      poster="/fallback-image.jpg"
    >
      <source src="/blackhole.webm" type="video/webm" />
    </video>
  );
}

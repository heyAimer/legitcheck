// src/components/sections/WatchDemoSection.jsx
"use client";

import { useRef, useState, useEffect } from "react";
import { Play, Pause, Volume2, VolumeX } from "lucide-react";

export default function WatchDemoSection() {
  const videoRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(true);
  const [autoplayFailed, setAutoplayFailed] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const playPromise = video.play();
    if (playPromise !== undefined) {
      playPromise
        .then(() => setIsPlaying(true))
        .catch(() => {
          setIsPlaying(false);
          setAutoplayFailed(true);
        });
    }
  }, []);

  const togglePlay = () => {
    const video = videoRef.current;
    if (!video) return;
    if (video.paused) {
      video.play();
      setIsPlaying(true);
    } else {
      video.pause();
      setIsPlaying(false);
    }
  };

  return (
    <section className="relative py-20 px-4" id="demo">
      <div className="mx-auto max-w-4xl text-center space-y-4 mb-10">
        <span className="text-xs font-semibold tracking-[0.2em] text-blue-700 uppercase">
          See it in action
        </span>
        <h2 className="text-3xl md:text-4xl font-semibold tracking-tight text-neutral-900">
          Watch how LegitCheck reviews a contract
        </h2>
        <p className="text-neutral-600 text-sm md:text-base leading-relaxed">
          A 60-second walkthrough of uploading a contract and getting a full risk report back.
        </p>
      </div>

      <div className="mx-auto max-w-4xl">
        <div className="group relative rounded-2xl overflow-hidden shadow-xl border-2 border-neutral-100 ">
          <video
            ref={videoRef}
            className="w-full aspect-video object-cover"
            src="/demo.mp4"
            poster="/og-image.png"
            muted
            loop
            playsInline
            autoPlay
            onPlay={() => setIsPlaying(true)}
            onPause={() => setIsPlaying(false)}
          >
            <track kind="captions" />
          </video>

          {/* Center play/pause overlay — visible on hover, or always if autoplay failed */}
          <button
            onClick={togglePlay}
            aria-label={isPlaying ? "Pause demo video" : "Play demo video"}
            className={`absolute inset-0 flex items-center justify-center transition-opacity ${
              isPlaying && !autoplayFailed
                ? "opacity-0 group-hover:opacity-100"
                : "opacity-100"
            }`}
          >
            <span className="h-16 w-16 rounded-full bg-white/90 flex items-center justify-center shadow-lg">
              {isPlaying ? (
                <Pause className="h-6 w-6 text-neutral-900" />
              ) : (
                <Play className="h-6 w-6 text-neutral-900 ml-0.5" />
              )}
            </span>
          </button>
        </div>
      </div>
    </section>
  );
}
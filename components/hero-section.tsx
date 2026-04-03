"use client";

import Image from "next/image";
import { YouTubeLivePlayerSimple } from "./youtube-live-player-simple";
import { YOUTUBE_CONFIG } from "../lib/youtube-config";

interface HeroSectionProps {
  totalListeners: number;
  totalStations: number;
}

export function HeroSection({
  totalListeners,
  totalStations,
}: HeroSectionProps) {
  return (
    <section className="py-2">
      <div className="container mx-auto px-4 text-center">
        <div className="mb-6">
          <Image
            src="/img/suzukysatlogo.png"
            alt="Suzukysat Logo"
            width={250}
            height={60}
            className="mx-auto"
          />
        </div>

        {/* YouTube Live Player */}
        <YouTubeLivePlayerSimple channelId={YOUTUBE_CONFIG.CHANNEL_ID} />

        <p className="text-lg md:text-xl text-muted-foreground mb-0 max-w-3xl mx-auto">
          Ouça suas RÁDIOS favoritas com qualidade digital e sem interrupções.
        </p>
      </div>
    </section>
  );
}

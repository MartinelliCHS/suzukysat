"use client";

import Image from "next/image";

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
            width={600}
            height={200}
            className="mx-auto"
          />
        </div>
        <p className="text-xl md:text-2xl text-muted-foreground mb-0 max-w-3xl mx-auto">
          Conectando corações através da música brasileira. Ouça suas rádios
          favoritas com qualidade digital e sem interrupções.
        </p>
      </div>
    </section>
  );
}

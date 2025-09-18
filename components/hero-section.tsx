"use client";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Play, Radio, Music, Volume2 } from "lucide-react";

interface HeroSectionProps {
  totalListeners: number;
}

export function HeroSection({ totalListeners }: HeroSectionProps) {
  const scrollToRadios = () => {
    document.getElementById('radios')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative bg-gradient-to-br from-primary/10 via-background to-secondary/10 py-20 overflow-hidden">
      {/* Elementos decorativos de fundo */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-20 left-10 animate-wave">
          <Music size={60} />
        </div>
        <div
          className="absolute top-40 right-20 animate-wave"
          style={{ animationDelay: "1s" }}
        >
          <Radio size={80} />
        </div>
        <div
          className="absolute bottom-20 left-1/4 animate-wave"
          style={{ animationDelay: "2s" }}
        >
          <Volume2 size={50} />
        </div>
      </div>

      <div className="container mx-auto px-4 text-center relative z-10">

        <h1 className="text-4xl md:text-6xl font-bold text-balance mb-6 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
          Rede Suzuky SAT
        </h1>

        <p className="text-xl md:text-2xl text-muted-foreground text-pretty mb-8 max-w-3xl mx-auto">
          Conectando corações através da música brasileira. Ouça suas rádios
          favoritas com qualidade digital e sem interrupções.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
          <Button size="lg" className="text-lg px-8 py-6 animate-pulse-music" onClick={scrollToRadios}>
            <Play className="mr-2 h-5 w-5" />
            Começar a Ouvir
          </Button>
        </div>

        <div className="flex flex-wrap justify-center gap-6 text-sm text-muted-foreground">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
            <span>{totalListeners.toLocaleString()} ouvintes online</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-primary rounded-full"></div>
            <span>12 rádios ativas</span>
          </div>
        </div>
      </div>
    </section>
  );
}

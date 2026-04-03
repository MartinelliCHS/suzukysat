"use client";

import { useState, useEffect } from "react";

interface YouTubeLivePlayerReliableProps {
  channelId: string;
}

export function YouTubeLivePlayerReliable({ channelId }: YouTubeLivePlayerReliableProps) {
  const [embedMethod, setEmbedMethod] = useState(0);
  
  // Diferentes métodos de embed
  const embedMethods = [
    {
      name: "Live Stream Direct",
      url: `https://www.youtube.com/embed/live_stream?channel=${channelId}&autoplay=0&mute=0&controls=1&rel=0&modestbranding=1`,
      description: "Método direto de live stream"
    },
    {
      name: "Channel Embed",
      url: `https://www.youtube.com/embed?listType=user_uploads&list=${channelId.replace('UC', 'UU')}&index=1&autoplay=0&controls=1&rel=0`,
      description: "Último vídeo do canal (inclui lives)"
    },
    {
      name: "Channel Live Page",
      url: `https://www.youtube.com/embed/live_stream?channel=${channelId}&controls=1&rel=0&showinfo=0&iv_load_policy=3`,
      description: "Página de live do canal"
    }
  ];

  const currentMethod = embedMethods[embedMethod];

  const switchMethod = () => {
    setEmbedMethod((prev) => (prev + 1) % embedMethods.length);
  };

  return (
    <div className="w-full max-w-4xl mx-auto mb-8">
      {/* Player */}
      <div className="aspect-video rounded-lg overflow-hidden shadow-lg relative bg-gray-900 mb-4">
        <iframe
          key={embedMethod} // Force re-render when method changes
          src={currentMethod.url}
          title="TV Suzukysat - Transmissão"
          className="w-full h-full"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
        />
        
        {/* Status indicator */}
        <div className="absolute top-4 left-4 bg-black/70 text-white px-3 py-2 rounded-lg text-sm">
          <div className="flex items-center">
            <div className="w-2 h-2 bg-red-500 rounded-full mr-2 animate-pulse"></div>
            <span>{currentMethod.name}</span>
          </div>
        </div>
      </div>
      
      {/* Controls */}
      <div className="flex flex-col sm:flex-row gap-3 justify-center items-center">
        <button
          onClick={switchMethod}
          className="px-4 py-2 bg-gray-600 hover:bg-gray-700 text-white rounded-lg transition-colors text-sm"
        >
          🔄 Trocar Método ({embedMethod + 1}/{embedMethods.length})
        </button>
        
        <a 
          href="https://www.youtube.com/@tvsuzukysat/live" 
          target="_blank" 
          rel="noopener noreferrer"
          className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors text-sm"
        >
          🔴 Abrir no YouTube
        </a>
      </div>
      
      {/* Info */}
      <div className="text-center mt-4">
        <p className="text-sm text-muted-foreground mb-2">
          <strong>Método atual:</strong> {currentMethod.description}
        </p>
        <p className="text-xs text-muted-foreground">
          Se não aparecer a live, clique em "🔄 Trocar Método" ou "🔴 Abrir no YouTube"
        </p>
      </div>
    </div>
  );
}
"use client";

import { useState } from "react";

interface YouTubeLivePlayerTestProps {
  channelId: string;
}

export function YouTubeLivePlayerTest({ channelId }: YouTubeLivePlayerTestProps) {
  const [currentTest, setCurrentTest] = useState(0);
  
  // URLs para testar (uma por vez)
  const testUrls = [
    {
      name: "Método 1: live_stream",
      url: `https://www.youtube.com/embed/live_stream?channel=${channelId}`,
      description: "URL padrão de live stream"
    },
    {
      name: "Método 2: live_stream com parâmetros",
      url: `https://www.youtube.com/embed/live_stream?channel=${channelId}&autoplay=0&controls=1&rel=0`,
      description: "Com controles básicos"
    },
    {
      name: "Método 3: Playlist do canal",
      url: `https://www.youtube.com/embed/videoseries?list=UU${channelId.substring(2)}`,
      description: "Últimos vídeos (inclui lives)"
    },
    {
      name: "Método 4: Embed simples",
      url: `https://www.youtube.com/embed?channel=${channelId}`,
      description: "Embed básico do canal"
    }
  ];

  const currentUrl = testUrls[currentTest];

  const nextTest = () => {
    setCurrentTest((prev) => (prev + 1) % testUrls.length);
  };

  return (
    <div className="w-full max-w-4xl mx-auto mb-8">
      {/* Informações do teste atual */}
      <div className="bg-gray-100 dark:bg-gray-800 rounded-lg p-4 mb-4">
        <div className="flex justify-between items-center">
          <div>
            <h3 className="font-semibold text-sm">{currentUrl.name}</h3>
            <p className="text-xs text-muted-foreground">{currentUrl.description}</p>
          </div>
          <button
            onClick={nextTest}
            className="px-3 py-1 bg-blue-600 hover:bg-blue-700 text-white text-xs rounded transition-colors"
          >
            Próximo ({currentTest + 1}/{testUrls.length})
          </button>
        </div>
      </div>

      {/* Player */}
      <div className="aspect-video rounded-lg overflow-hidden shadow-lg relative bg-gray-900 mb-4">
        <iframe
          key={currentTest}
          src={currentUrl.url}
          title={`TV Suzukysat - ${currentUrl.name}`}
          className="w-full h-full"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
        />
        
        {/* Overlay com info */}
        <div className="absolute bottom-4 left-4 bg-black/70 text-white px-3 py-2 rounded text-sm">
          Teste {currentTest + 1}/4
        </div>
      </div>
      
      {/* Controles */}
      <div className="flex flex-col sm:flex-row gap-3 justify-center items-center">
        <button
          onClick={nextTest}
          className="px-4 py-2 bg-gray-600 hover:bg-gray-700 text-white rounded-lg transition-colors text-sm"
        >
          🔄 Testar Próximo Método
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
      
      {/* Instruções */}
      <div className="text-center mt-4">
        <p className="text-sm text-muted-foreground mb-2">
          <strong>Como testar:</strong>
        </p>
        <ol className="text-xs text-muted-foreground space-y-1">
          <li>1. Inicie uma live no seu canal do YouTube</li>
          <li>2. Clique em "🔄 Testar Próximo Método" para testar cada URL</li>
          <li>3. Veja qual método mostra sua live corretamente</li>
          <li>4. Use o método que funcionar na versão final</li>
        </ol>
      </div>
    </div>
  );
}
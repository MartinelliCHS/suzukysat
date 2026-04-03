"use client";

import { useState, useEffect } from "react";

interface YouTubeLivePlayerProps {
  channelId: string;
}

export function YouTubeLivePlayer({ channelId }: YouTubeLivePlayerProps) {
  const [currentEmbedIndex, setCurrentEmbedIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  // Diferentes URLs de embed para tentar
  const embedUrls = [
    // Método 1: live_stream com channel
    `https://www.youtube.com/embed/live_stream?channel=${channelId}&autoplay=1&mute=1&controls=1&rel=0&modestbranding=1`,
    
    // Método 2: live_stream sem autoplay (mais compatível)
    `https://www.youtube.com/embed/live_stream?channel=${channelId}&autoplay=0&mute=0&controls=1&rel=0&modestbranding=1`,
    
    // Método 3: URL alternativa
    `https://www.youtube.com/embed/live_stream?channel=${channelId}&controls=1&rel=0`,
    
    // Método 4: Embed do canal (mostra último vídeo/live)
    `https://www.youtube.com/embed?listType=user_uploads&list=${channelId.replace('UC', 'UU')}&autoplay=0&controls=1&rel=0`
  ];

  const handleIframeLoad = () => {
    setIsLoading(false);
    setHasError(false);
  };

  const handleIframeError = () => {
    console.log(`Erro no embed ${currentEmbedIndex + 1}, tentando próximo...`);
    
    if (currentEmbedIndex < embedUrls.length - 1) {
      // Tenta próximo embed após 2 segundos
      setTimeout(() => {
        setCurrentEmbedIndex(currentEmbedIndex + 1);
        setIsLoading(true);
        setHasError(false);
      }, 2000);
    } else {
      // Todos os embeds falharam
      setIsLoading(false);
      setHasError(true);
    }
  };

  // Reset para tentar novamente a cada 5 minutos
  useEffect(() => {
    const interval = setInterval(() => {
      if (hasError) {
        setCurrentEmbedIndex(0);
        setIsLoading(true);
        setHasError(false);
      }
    }, 300000); // 5 minutos

    return () => clearInterval(interval);
  }, [hasError]);

  return (
    <div className="w-full max-w-4xl mx-auto mb-8">
      <div className="aspect-video rounded-lg overflow-hidden shadow-lg relative bg-gray-900">
        {isLoading && (
          <div className="absolute inset-0 flex items-center justify-center bg-gray-900 z-10">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-600 mx-auto mb-4"></div>
              <p className="text-white text-sm">
                Carregando live... (Tentativa {currentEmbedIndex + 1}/{embedUrls.length})
              </p>
            </div>
          </div>
        )}
        
        {!hasError ? (
          <iframe
            key={currentEmbedIndex} // Force re-render when URL changes
            src={embedUrls[currentEmbedIndex]}
            title="TV Suzukysat - Live Stream"
            className="w-full h-full"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
            onLoad={handleIframeLoad}
            onError={handleIframeError}
          />
        ) : (
          // Fallback: Embed direto do canal (sempre funciona)
          <div className="w-full h-full">
            <iframe
              src={`https://www.youtube.com/embed?listType=user_uploads&list=${channelId.replace('UC', 'UU')}&autoplay=0&controls=1&rel=0&modestbranding=1`}
              title="TV Suzukysat - Canal"
              className="w-full h-full"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
            />
            
            {/* Overlay com informação */}
            <div className="absolute top-4 left-4 bg-black/70 text-white px-3 py-2 rounded-lg text-sm">
              <div className="flex items-center">
                <div className="w-2 h-2 bg-red-500 rounded-full mr-2 animate-pulse"></div>
                <span>Se estivermos ao vivo, a live aparecerá aqui</span>
              </div>
            </div>
          </div>
        )}
      </div>
      
      {/* Botão de backup sempre visível */}
      <div className="text-center mt-4">
        <a 
          href="https://www.youtube.com/@tvsuzukysat/live" 
          target="_blank" 
          rel="noopener noreferrer"
          className="inline-flex items-center px-4 py-2 text-sm text-red-600 hover:text-red-700 font-medium transition-colors"
        >
          <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 24 24">
            <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
          </svg>
          Abrir no YouTube (se houver problemas)
        </a>
      </div>
    </div>
  );
}
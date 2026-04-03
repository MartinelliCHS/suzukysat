"use client";

import { useState } from "react";
import Image from "next/image";

interface YouTubeLivePlayerFinalProps {
  channelId: string;
}

export function YouTubeLivePlayerFinal({ channelId }: YouTubeLivePlayerFinalProps) {
  const [showOfflineImage, setShowOfflineImage] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Método 3 que funciona: Playlist do canal (inclui lives ativas)
  const embedUrl = `https://www.youtube.com/embed/videoseries?list=UU${channelId.substring(2)}`;

  const handleIframeLoad = () => {
    setIsLoading(false);
    // Verifica se há conteúdo após 3 segundos
    setTimeout(() => {
      // Se não conseguir detectar live, pode mostrar imagem offline
      // Por enquanto, mantém o player sempre visível
    }, 3000);
  };

  const handleIframeError = () => {
    setIsLoading(false);
    setShowOfflineImage(true);
  };

  const toggleView = () => {
    setShowOfflineImage(!showOfflineImage);
  };

  return (
    <div className="w-full max-w-4xl mx-auto mb-8">
      {/* Player ou Imagem Offline */}
      <div className="aspect-video rounded-lg overflow-hidden shadow-lg relative bg-gray-900 mb-4">
        {showOfflineImage ? (
          // Imagem offline
          <div className="w-full h-full relative">
            <Image
              src="/img/liveoffline.jpeg"
              alt="TV Suzukysat - Offline"
              fill
              className="object-cover"
              priority
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 1024px"
            />
            
            {/* Overlay com informações */}
            <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
              <div className="text-center text-white">
                <div className="mb-4">
                  <div className="w-4 h-4 bg-gray-400 rounded-full mx-auto mb-2"></div>
                  <span className="text-lg font-semibold">OFFLINE</span>
                </div>
                <p className="text-sm opacity-90">
                  Não estamos transmitindo no momento
                </p>
              </div>
            </div>
          </div>
        ) : (
          // Player do YouTube
          <>
            {isLoading && (
              <div className="absolute inset-0 flex items-center justify-center bg-gray-900 z-10">
                <div className="text-center">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-600 mx-auto mb-4"></div>
                  <p className="text-white text-sm">Carregando...</p>
                </div>
              </div>
            )}
            
            <iframe
              src={embedUrl}
              title="TV Suzukysat - Transmissão ao Vivo"
              className="w-full h-full"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
              onLoad={handleIframeLoad}
              onError={handleIframeError}
            />
            
            {/* Indicador de live */}
            <div className="absolute top-4 right-4 bg-red-600 text-white px-3 py-1 rounded-full text-sm font-semibold flex items-center">
              <div className="w-2 h-2 bg-white rounded-full mr-2 animate-pulse"></div>
              AO VIVO
            </div>
          </>
        )}
      </div>
      
      {/* Controles */}
      <div className="flex flex-col sm:flex-row gap-3 justify-center items-center">
        <button
          onClick={toggleView}
          className="px-4 py-2 bg-gray-600 hover:bg-gray-700 text-white rounded-lg transition-colors text-sm"
        >
          {showOfflineImage ? "📺 Ver Player" : "🖼️ Ver Offline"}
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
      
      {/* Informações */}
      <div className="text-center mt-4">
        <p className="text-sm text-muted-foreground mb-2">
          📺 <strong>TV Suzukysat</strong> - {showOfflineImage ? "Offline" : "Transmissão ao vivo"}
        </p>
        <p className="text-xs text-muted-foreground">
          {showOfflineImage 
            ? "Clique em 'Ver Player' para verificar se há transmissão ativa"
            : "Quando estivermos ao vivo, a transmissão aparecerá automaticamente"
          }
        </p>
      </div>
    </div>
  );
}
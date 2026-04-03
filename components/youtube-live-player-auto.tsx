"use client";

import { useState, useEffect } from "react";
import Image from "next/image";

interface YouTubeLivePlayerAutoProps {
  channelId: string;
}

export function YouTubeLivePlayerAuto({ channelId }: YouTubeLivePlayerAutoProps) {
  const [showOfflineImage, setShowOfflineImage] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Método 3 que funciona: Playlist do canal (inclui lives ativas)
  const embedUrl = `https://www.youtube.com/embed/videoseries?list=UU${channelId.substring(2)}&autoplay=0&controls=1&rel=0`;

  // Simula detecção de live (você pode implementar lógica mais sofisticada)
  useEffect(() => {
    const checkLiveStatus = () => {
      // Por padrão, mostra o player
      // Se quiser forçar offline para teste, descomente a linha abaixo:
      // setShowOfflineImage(true);
      setIsLoading(false);
    };

    // Verifica status após 2 segundos
    const timer = setTimeout(checkLiveStatus, 2000);
    return () => clearTimeout(timer);
  }, []);

  const toggleView = () => {
    setShowOfflineImage(!showOfflineImage);
  };

  if (isLoading) {
    return (
      <div className="w-full max-w-4xl mx-auto mb-8">
        <div className="aspect-video rounded-lg overflow-hidden shadow-lg relative bg-gray-900 mb-4">
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-600 mx-auto mb-4"></div>
              <p className="text-white text-sm">Verificando transmissão...</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-4xl mx-auto mb-8">
      {/* Player ou Imagem Offline */}
      <div className="aspect-video rounded-lg overflow-hidden shadow-lg relative bg-gray-900 mb-4">
        {showOfflineImage ? (
          // Imagem offline otimizada
          <div className="w-full h-full relative">
            <Image
              src="/img/liveoffline.jpeg"
              alt="TV Suzukysat - Estamos Offline"
              fill
              className="object-cover"
              priority
              quality={85}
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 80vw, 1024px"
              placeholder="blur"
              blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//2Q=="
            />
            
            {/* Overlay elegante */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/30 flex items-center justify-center">
              <div className="text-center text-white">
                <div className="mb-4">
                  <div className="w-4 h-4 bg-gray-400 rounded-full mx-auto mb-3 opacity-80"></div>
                  <h3 className="text-xl font-bold mb-2">OFFLINE</h3>
                  <p className="text-sm opacity-90 max-w-xs mx-auto">
                    Não estamos transmitindo no momento. Volte em breve!
                  </p>
                </div>
              </div>
            </div>
          </div>
        ) : (
          // Player do YouTube
          <>
            <iframe
              src={embedUrl}
              title="TV Suzukysat - Transmissão ao Vivo"
              className="w-full h-full"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
              loading="lazy"
            />
            
            {/* Indicador de live */}
            <div className="absolute top-4 right-4 bg-red-600 text-white px-3 py-1 rounded-full text-sm font-semibold flex items-center shadow-lg">
              <div className="w-2 h-2 bg-white rounded-full mr-2 animate-pulse"></div>
              LIVE
            </div>
          </>
        )}
      </div>
      
      {/* Controles */}
      <div className="flex flex-col sm:flex-row gap-3 justify-center items-center">
        <button
          onClick={toggleView}
          className="px-4 py-2 bg-gray-600 hover:bg-gray-700 text-white rounded-lg transition-colors text-sm font-medium"
        >
          {showOfflineImage ? "📺 Ver Player" : "🖼️ Ver Offline"}
        </button>
        
        <a 
          href="https://www.youtube.com/@tvsuzukysat/live" 
          target="_blank" 
          rel="noopener noreferrer"
          className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors text-sm font-medium"
        >
          🔴 Abrir no YouTube
        </a>
      </div>
      
      {/* Informações */}
      <div className="text-center mt-4">
        <p className="text-sm text-muted-foreground mb-1">
          📺 <strong>TV Suzukysat</strong>
        </p>
        <p className="text-xs text-muted-foreground">
          {showOfflineImage 
            ? "Clique em 'Ver Player' para verificar transmissões ativas"
            : "Quando ao vivo, a transmissão aparece automaticamente"
          }
        </p>
      </div>
    </div>
  );
}
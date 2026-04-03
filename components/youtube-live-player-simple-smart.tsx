"use client";

import { useState, useEffect } from "react";
import Image from "next/image";

interface YouTubeLivePlayerSimpleSmartProps {
  channelId: string;
}

export function YouTubeLivePlayerSimpleSmart({ channelId }: YouTubeLivePlayerSimpleSmartProps) {
  const [showOfflineImage, setShowOfflineImage] = useState(true); // Começa com imagem offline
  const [lastCheck, setLastCheck] = useState<Date>(new Date());

  // Por padrão, mostra a imagem offline
  // O usuário pode clicar para verificar se há live
  const checkForLive = () => {
    setShowOfflineImage(false);
    setLastCheck(new Date());
  };

  const showOffline = () => {
    setShowOfflineImage(true);
    setLastCheck(new Date());
  };

  // Verifica automaticamente a cada 5 minutos se deve mostrar offline
  useEffect(() => {
    const interval = setInterval(() => {
      // Se estiver mostrando o player há mais de 10 minutos, volta para offline
      // (assumindo que lives longas são raras)
      if (!showOfflineImage) {
        const now = new Date();
        const timeDiff = now.getTime() - lastCheck.getTime();
        const minutesDiff = timeDiff / (1000 * 60);
        
        // Após 15 minutos mostrando player, volta para offline automaticamente
        if (minutesDiff > 15) {
          setShowOfflineImage(true);
        }
      }
    }, 300000); // 5 minutos
    
    return () => clearInterval(interval);
  }, [showOfflineImage, lastCheck]);

  return (
    <div className="w-full max-w-4xl mx-auto mb-8">
      {/* Player ou Imagem */}
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
              quality={85}
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 80vw, 1024px"
              placeholder="blur"
              blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//2Q=="
            />
            
            {/* Overlay com status offline */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/30 flex items-center justify-center">
              <div className="text-center text-white">
                <div className="mb-6">
                  <div className="w-4 h-4 bg-gray-400 rounded-full mx-auto mb-3"></div>
                  <h3 className="text-xl font-bold mb-2">OFFLINE</h3>
                  <p className="text-sm opacity-90 max-w-xs mx-auto mb-4">
                    Não estamos transmitindo no momento
                  </p>
                  
                  {/* Botão para verificar live */}
                  <button
                    onClick={checkForLive}
                    className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors text-sm font-medium"
                  >
                    🔴 Verificar se há Live
                  </button>
                </div>
              </div>
            </div>
          </div>
        ) : (
          // Player quando verificando live
          <>
            <iframe
              src={`https://www.youtube.com/embed/live_stream?channel=${channelId}&autoplay=0&controls=1&rel=0`}
              title="TV Suzukysat - Verificando Live"
              className="w-full h-full"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
            />
            
            {/* Indicador de verificação */}
            <div className="absolute top-4 right-4 bg-blue-600 text-white px-3 py-1 rounded-full text-sm font-semibold flex items-center shadow-lg">
              <div className="w-2 h-2 bg-white rounded-full mr-2 animate-pulse"></div>
              VERIFICANDO
            </div>
            
            {/* Botão para voltar ao offline */}
            <div className="absolute bottom-4 right-4">
              <button
                onClick={showOffline}
                className="px-3 py-1 bg-gray-800/80 hover:bg-gray-700/80 text-white rounded text-xs transition-colors"
              >
                ← Voltar Offline
              </button>
            </div>
          </>
        )}
      </div>
      
      {/* Controles e informações */}
      <div className="text-center">
        <div className="flex flex-col sm:flex-row gap-3 justify-center items-center mb-4">
          {showOfflineImage ? (
            <button
              onClick={checkForLive}
              className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors text-sm font-medium"
            >
              🔴 Verificar Live
            </button>
          ) : (
            <button
              onClick={showOffline}
              className="px-4 py-2 bg-gray-600 hover:bg-gray-700 text-white rounded-lg transition-colors text-sm font-medium"
            >
              🖼️ Mostrar Offline
            </button>
          )}
          
          <a 
            href="https://www.youtube.com/@tvsuzukysat/live" 
            target="_blank" 
            rel="noopener noreferrer"
            className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors text-sm font-medium"
          >
            📺 Abrir no YouTube
          </a>
        </div>
        
        {/* Status */}
        <div className="text-center">
          <p className="text-sm text-muted-foreground mb-1">
            📺 <strong>TV Suzukysat</strong> - {showOfflineImage ? "⚫ OFFLINE" : "🔍 VERIFICANDO"}
          </p>
          <p className="text-xs text-muted-foreground">
            {showOfflineImage 
              ? "Clique em 'Verificar Live' para ver se estamos transmitindo"
              : "Se não houver live ativa, o player mostrará vídeos antigos. Clique em 'Mostrar Offline' para voltar."
            }
          </p>
        </div>
      </div>
    </div>
  );
}
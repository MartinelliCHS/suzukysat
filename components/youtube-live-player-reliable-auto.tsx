"use client";

import { useState, useEffect } from "react";
import Image from "next/image";

interface YouTubeLivePlayerReliableAutoProps {
  channelId: string;
}

export function YouTubeLivePlayerReliableAuto({ channelId }: YouTubeLivePlayerReliableAutoProps) {
  const [showPlayer, setShowPlayer] = useState(true); // Começa tentando mostrar o player
  const [playerLoaded, setPlayerLoaded] = useState(false);
  const [lastCheck, setLastCheck] = useState<Date>(new Date());

  // Função que verifica se o player carregou conteúdo válido
  const handlePlayerLoad = () => {
    setPlayerLoaded(true);
    setLastCheck(new Date());
  };

  const handlePlayerError = () => {
    setShowPlayer(false);
    setPlayerLoaded(false);
    setLastCheck(new Date());
  };

  // Verifica periodicamente se deve tentar mostrar o player novamente
  useEffect(() => {
    const interval = setInterval(() => {
      if (!showPlayer) {
        // Se estiver mostrando offline, tenta o player novamente
        setShowPlayer(true);
        setPlayerLoaded(false);
      }
    }, 120000); // Tenta novamente a cada 2 minutos
    
    return () => clearInterval(interval);
  }, [showPlayer]);

  // Se não conseguiu carregar o player após 10 segundos, mostra offline
  useEffect(() => {
    if (showPlayer && !playerLoaded) {
      const timeout = setTimeout(() => {
        if (!playerLoaded) {
          setShowPlayer(false);
        }
      }, 10000); // 10 segundos para carregar
      
      return () => clearTimeout(timeout);
    }
  }, [showPlayer, playerLoaded]);

  return (
    <div className="w-full max-w-4xl mx-auto mb-8">
      {/* Player ou Imagem */}
      <div className="aspect-video rounded-lg overflow-hidden shadow-lg relative bg-gray-900 mb-4">
        {showPlayer ? (
          // Tenta mostrar o player
          <>
            <iframe
              src={`https://www.youtube.com/embed/live_stream?channel=${channelId}&autoplay=0&controls=1&rel=0&modestbranding=1`}
              title="TV Suzukysat - Transmissão"
              className="w-full h-full"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
              onLoad={handlePlayerLoad}
              onError={handlePlayerError}
            />
            
            {!playerLoaded && (
              // Loading enquanto tenta carregar
              <div className="absolute inset-0 flex items-center justify-center bg-gray-900 z-10">
                <div className="text-center">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-600 mx-auto mb-4"></div>
                  <p className="text-white text-sm">Verificando transmissão...</p>
                </div>
              </div>
            )}
            
            {playerLoaded && (
              // Indicador de live quando carregou
              <div className="absolute top-4 right-4 bg-red-600 text-white px-3 py-1 rounded-full text-sm font-semibold flex items-center shadow-lg">
                <div className="w-2 h-2 bg-white rounded-full mr-2 animate-pulse"></div>
                AO VIVO
              </div>
            )}
          </>
        ) : (
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
            
            {/* Overlay offline */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/30 flex items-center justify-center">
              <div className="text-center text-white">
                <div className="mb-4">
                  <div className="w-4 h-4 bg-gray-400 rounded-full mx-auto mb-3"></div>
                  <h3 className="text-xl font-bold mb-2">OFFLINE</h3>
                  <p className="text-sm opacity-90 max-w-xs mx-auto">
                    Não estamos transmitindo no momento
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
      
      {/* Informações */}
      <div className="text-center">
        <div className="mb-4">
          <a 
            href="https://www.youtube.com/@tvsuzukysat/live" 
            target="_blank" 
            rel="noopener noreferrer"
            className="inline-flex items-center px-4 py-2 text-sm text-red-600 hover:text-red-700 font-medium transition-colors border border-red-600 hover:border-red-700 rounded-lg"
          >
            <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 24 24">
              <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
            </svg>
            Ver no YouTube
          </a>
        </div>
        
        <div className="text-center">
          <p className="text-sm text-muted-foreground mb-1">
            📺 <strong>TV Suzukysat</strong> - {showPlayer && playerLoaded ? "🔴 AO VIVO" : "⚫ OFFLINE"}
          </p>
          <p className="text-xs text-muted-foreground">
            {showPlayer && !playerLoaded 
              ? "Verificando transmissão..."
              : showPlayer && playerLoaded
              ? "Transmissão ativa detectada"
              : `Offline • Próxima verificação: ${new Date(lastCheck.getTime() + 120000).toLocaleTimeString('pt-BR')}`
            }
          </p>
        </div>
      </div>
    </div>
  );
}
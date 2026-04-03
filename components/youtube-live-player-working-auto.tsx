"use client";

import { useState, useEffect } from "react";
import Image from "next/image";

interface YouTubeLivePlayerWorkingAutoProps {
  channelId: string;
}

export function YouTubeLivePlayerWorkingAuto({ channelId }: YouTubeLivePlayerWorkingAutoProps) {
  const [showOfflineImage, setShowOfflineImage] = useState(true); // Começa com offline
  const [lastCheck, setLastCheck] = useState<Date>(new Date());

  // URL que sabemos que funciona (Método 3)
  const workingEmbedUrl = `https://www.youtube.com/embed/videoseries?list=UU${channelId.substring(2)}&autoplay=0&controls=1&rel=0`;

  // Função para verificar se deve mostrar player ou imagem
  const checkLiveStatus = () => {
    // Por enquanto, vamos assumir uma lógica simples:
    // Durante horários comerciais (8h às 22h), maior chance de estar ao vivo
    const now = new Date();
    const hour = now.getHours();
    const isBusinessHours = hour >= 8 && hour <= 22;
    
    // Se estiver em horário comercial, tenta mostrar o player
    // Caso contrário, mostra offline
    if (isBusinessHours) {
      setShowOfflineImage(false);
    } else {
      setShowOfflineImage(true);
    }
    
    setLastCheck(new Date());
  };

  // Verifica status ao carregar e a cada 5 minutos
  useEffect(() => {
    checkLiveStatus();
    
    const interval = setInterval(() => {
      checkLiveStatus();
    }, 300000); // 5 minutos
    
    return () => clearInterval(interval);
  }, []);

  // Função para alternar manualmente (temporária para teste)
  const toggleView = () => {
    setShowOfflineImage(!showOfflineImage);
    setLastCheck(new Date());
  };

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
        ) : (
          // Player que funciona (Método 3)
          <>
            <iframe
              src={workingEmbedUrl}
              title="TV Suzukysat - Transmissão"
              className="w-full h-full"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
            />
            
            {/* Indicador */}
            <div className="absolute top-4 right-4 bg-green-600 text-white px-3 py-1 rounded-full text-sm font-semibold flex items-center shadow-lg">
              <div className="w-2 h-2 bg-white rounded-full mr-2 animate-pulse"></div>
              CANAL
            </div>
          </>
        )}
      </div>
      
      {/* Controles temporários para teste */}
      <div className="text-center mb-4">
        <button
          onClick={toggleView}
          className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors text-sm font-medium mr-4"
        >
          {showOfflineImage ? "📺 Mostrar Canal" : "🖼️ Mostrar Offline"}
        </button>
        
        <a 
          href="https://www.youtube.com/@tvsuzukysat/live" 
          target="_blank" 
          rel="noopener noreferrer"
          className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors text-sm font-medium"
        >
          🔴 Ver no YouTube
        </a>
      </div>
      
      {/* Status */}
      <div className="text-center">
        <p className="text-sm text-muted-foreground mb-1">
          📺 <strong>TV Suzukysat</strong> - {showOfflineImage ? "⚫ OFFLINE" : "📺 CANAL ATIVO"}
        </p>
        <p className="text-xs text-muted-foreground">
          {showOfflineImage 
            ? "Imagem offline sendo exibida"
            : "Mostrando últimos vídeos do canal (se houver live ativa, aparecerá primeiro)"
          }
        </p>
        <p className="text-xs text-muted-foreground mt-1">
          Última verificação: {lastCheck.toLocaleTimeString('pt-BR')}
        </p>
      </div>
    </div>
  );
}
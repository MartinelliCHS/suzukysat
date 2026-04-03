"use client";

import { useState, useEffect } from "react";
import Image from "next/image";

interface YouTubeLivePlayerFinalAutoProps {
  channelId: string;
}

export function YouTubeLivePlayerFinalAuto({ channelId }: YouTubeLivePlayerFinalAutoProps) {
  const [isLiveTime, setIsLiveTime] = useState(false);
  const [lastCheck, setLastCheck] = useState<Date>(new Date());

  // URL que funciona (Método 3)
  const workingEmbedUrl = `https://www.youtube.com/embed/videoseries?list=UU${channelId.substring(2)}&autoplay=0&controls=1&rel=0`;

  // Função para detectar se é provável que haja live
  const checkIfLiveTime = () => {
    const now = new Date();
    const hour = now.getHours();
    const day = now.getDay(); // 0 = domingo, 1 = segunda, etc.
    
    // Lógica: assume que lives acontecem principalmente:
    // - Segunda a sexta: 9h às 18h
    // - Sábado: 10h às 16h  
    // - Domingo: 14h às 20h
    
    let shouldShowPlayer = false;
    
    if (day >= 1 && day <= 5) { // Segunda a sexta
      shouldShowPlayer = hour >= 9 && hour <= 18;
    } else if (day === 6) { // Sábado
      shouldShowPlayer = hour >= 10 && hour <= 16;
    } else if (day === 0) { // Domingo
      shouldShowPlayer = hour >= 14 && hour <= 20;
    }
    
    setIsLiveTime(shouldShowPlayer);
    setLastCheck(new Date());
  };

  // Verifica ao carregar e a cada 10 minutos
  useEffect(() => {
    checkIfLiveTime();
    
    const interval = setInterval(() => {
      checkIfLiveTime();
    }, 600000); // 10 minutos
    
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full max-w-4xl mx-auto mb-8">
      {/* Player ou Imagem baseado na detecção automática */}
      <div className="aspect-video rounded-lg overflow-hidden shadow-lg relative bg-gray-900 mb-4">
        {isLiveTime ? (
          // Player quando é provável que haja live
          <>
            <iframe
              src={workingEmbedUrl}
              title="TV Suzukysat - Transmissão"
              className="w-full h-full"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
            />
            
            {/* Indicador de canal ativo */}
            <div className="absolute top-4 right-4 bg-red-600 text-white px-3 py-1 rounded-full text-sm font-semibold flex items-center shadow-lg">
              <div className="w-2 h-2 bg-white rounded-full mr-2 animate-pulse"></div>
              AO VIVO
            </div>
          </>
        ) : (
          // Imagem offline fora do horário de transmissão
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
      
      {/* Apenas link para YouTube */}
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
        
        {/* Status automático */}
        <div className="text-center">
          <p className="text-sm text-muted-foreground mb-1">
            📺 <strong>TV Suzukysat</strong> - {isLiveTime ? "🔴 HORÁRIO DE TRANSMISSÃO" : "⚫ OFFLINE"}
          </p>
          <p className="text-xs text-muted-foreground">
            {isLiveTime 
              ? "Se estivermos ao vivo, a transmissão aparecerá automaticamente"
              : "Fora do horário de transmissão"
            }
          </p>
          <p className="text-xs text-muted-foreground mt-1">
            Última verificação: {lastCheck.toLocaleTimeString('pt-BR')} • 
            Próxima em 10 minutos
          </p>
        </div>
      </div>
    </div>
  );
}
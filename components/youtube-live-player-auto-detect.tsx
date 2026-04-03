"use client";

import { useState, useEffect } from "react";
import Image from "next/image";

interface YouTubeLivePlayerAutoDetectProps {
  channelId: string;
}

export function YouTubeLivePlayerAutoDetect({ channelId }: YouTubeLivePlayerAutoDetectProps) {
  const [isLive, setIsLive] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [lastCheck, setLastCheck] = useState<Date>(new Date());

  // Função para detectar se há live ativa
  const detectLiveStatus = async () => {
    try {
      // Cria um iframe invisível para testar se há live
      const testFrame = document.createElement('iframe');
      testFrame.style.position = 'absolute';
      testFrame.style.left = '-9999px';
      testFrame.style.width = '1px';
      testFrame.style.height = '1px';
      testFrame.style.opacity = '0';
      testFrame.src = `https://www.youtube.com/embed/live_stream?channel=${channelId}`;
      
      document.body.appendChild(testFrame);
      
      // Aguarda o iframe carregar
      await new Promise((resolve) => {
        testFrame.onload = resolve;
        testFrame.onerror = resolve;
        // Timeout de 5 segundos
        setTimeout(resolve, 5000);
      });
      
      // Verifica se o iframe tem conteúdo válido
      // Se conseguir acessar e não houver erro, provavelmente há live
      let hasLive = false;
      
      try {
        // Tenta acessar o contentWindow - se der erro de CORS, há conteúdo
        const contentWindow = testFrame.contentWindow;
        if (contentWindow === null) {
          hasLive = true; // CORS error indica conteúdo ativo
        }
      } catch (error) {
        hasLive = true; // CORS error indica conteúdo ativo
      }
      
      // Remove o iframe de teste
      document.body.removeChild(testFrame);
      
      setIsLive(hasLive);
      setIsLoading(false);
      setLastCheck(new Date());
      
    } catch (error) {
      console.log('Erro na detecção, assumindo offline');
      setIsLive(false);
      setIsLoading(false);
      setLastCheck(new Date());
    }
  };

  // Verifica status ao carregar e a cada 1 minuto
  useEffect(() => {
    detectLiveStatus();
    
    const interval = setInterval(() => {
      detectLiveStatus();
    }, 60000); // 1 minuto
    
    return () => clearInterval(interval);
  }, [channelId]);

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
      {/* Player ou Imagem baseado na detecção automática */}
      <div className="aspect-video rounded-lg overflow-hidden shadow-lg relative bg-gray-900 mb-4">
        {isLive ? (
          // Player quando há live ativa
          <>
            <iframe
              src={`https://www.youtube.com/embed/live_stream?channel=${channelId}&autoplay=0&controls=1&rel=0`}
              title="TV Suzukysat - Ao Vivo"
              className="w-full h-full"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
            />
            
            {/* Indicador de live ativa */}
            <div className="absolute top-4 right-4 bg-red-600 text-white px-3 py-1 rounded-full text-sm font-semibold flex items-center shadow-lg">
              <div className="w-2 h-2 bg-white rounded-full mr-2 animate-pulse"></div>
              AO VIVO
            </div>
          </>
        ) : (
          // Imagem quando offline
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
      
      {/* Informações e link para YouTube */}
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
            📺 <strong>TV Suzukysat</strong> - {isLive ? "🔴 AO VIVO" : "⚫ OFFLINE"}
          </p>
          <p className="text-xs text-muted-foreground">
            Última verificação: {lastCheck.toLocaleTimeString('pt-BR')} • 
            Próxima verificação em 1 minuto
          </p>
        </div>
      </div>
    </div>
  );
}
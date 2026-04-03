"use client";

import { useState, useEffect } from "react";
import Image from "next/image";

interface YouTubeLivePlayerSmartProps {
  channelId: string;
}

export function YouTubeLivePlayerSmart({ channelId }: YouTubeLivePlayerSmartProps) {
  const [isLive, setIsLive] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [lastCheck, setLastCheck] = useState<Date>(new Date());

  // Função para verificar se há live ativa
  const checkLiveStatus = async () => {
    try {
      // Método 1: Tentar carregar a página de live do canal
      const response = await fetch(`https://www.youtube.com/@tvsuzukysat/live`, {
        method: 'HEAD',
        mode: 'no-cors'
      });
      
      // Como não podemos ler a resposta devido ao CORS, vamos usar uma abordagem diferente
      // Vamos verificar se o iframe do live_stream carrega conteúdo
      const testFrame = document.createElement('iframe');
      testFrame.style.display = 'none';
      testFrame.src = `https://www.youtube.com/embed/live_stream?channel=${channelId}`;
      
      document.body.appendChild(testFrame);
      
      // Aguarda um tempo para o iframe carregar
      setTimeout(() => {
        try {
          // Se conseguir acessar o contentDocument, provavelmente não há live
          // Se der erro de CORS, provavelmente há conteúdo (live ativa)
          const hasContent = testFrame.contentDocument === null;
          setIsLive(hasContent);
          document.body.removeChild(testFrame);
        } catch (error) {
          // Erro de CORS geralmente indica que há conteúdo
          setIsLive(true);
          document.body.removeChild(testFrame);
        }
        setIsLoading(false);
        setLastCheck(new Date());
      }, 3000);
      
    } catch (error) {
      console.log('Erro ao verificar live, assumindo offline');
      setIsLive(false);
      setIsLoading(false);
      setLastCheck(new Date());
    }
  };

  // Verifica status ao carregar e a cada 2 minutos
  useEffect(() => {
    checkLiveStatus();
    
    const interval = setInterval(() => {
      checkLiveStatus();
    }, 120000); // 2 minutos
    
    return () => clearInterval(interval);
  }, [channelId]);

  // Função manual para forçar verificação
  const forceCheck = () => {
    setIsLoading(true);
    checkLiveStatus();
  };

  if (isLoading) {
    return (
      <div className="w-full max-w-4xl mx-auto mb-8">
        <div className="aspect-video rounded-lg overflow-hidden shadow-lg relative bg-gray-900 mb-4">
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-600 mx-auto mb-4"></div>
              <p className="text-white text-sm">Verificando se estamos ao vivo...</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-4xl mx-auto mb-8">
      {/* Player ou Imagem baseado no status da live */}
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
            <div className="absolute top-4 right-4 bg-red-600 text-white px-3 py-1 rounded-full text-sm font-semibold flex items-center shadow-lg animate-pulse">
              <div className="w-2 h-2 bg-white rounded-full mr-2"></div>
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
      
      {/* Controles e informações */}
      <div className="text-center">
        <div className="flex flex-col sm:flex-row gap-3 justify-center items-center mb-4">
          <button
            onClick={forceCheck}
            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors text-sm font-medium"
            disabled={isLoading}
          >
            🔄 Verificar Agora
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
        
        {/* Status e última verificação */}
        <div className="text-center">
          <p className="text-sm text-muted-foreground mb-1">
            📺 <strong>TV Suzukysat</strong> - {isLive ? "🔴 AO VIVO" : "⚫ OFFLINE"}
          </p>
          <p className="text-xs text-muted-foreground">
            Última verificação: {lastCheck.toLocaleTimeString('pt-BR')} • 
            Próxima verificação automática em 2 minutos
          </p>
        </div>
      </div>
    </div>
  );
}
"use client";

interface YouTubeLivePlayerDirectProps {
  channelId: string;
}

export function YouTubeLivePlayerDirect({ channelId }: YouTubeLivePlayerDirectProps) {
  return (
    <div className="w-full max-w-4xl mx-auto mb-8">
      <div className="aspect-video rounded-lg overflow-hidden shadow-lg relative bg-gray-900">
        {/* Player principal - sempre mostra o canal */}
        <iframe
          src={`https://www.youtube.com/embed/live_stream?channel=${channelId}`}
          title="TV Suzukysat - Transmissão ao Vivo"
          className="w-full h-full"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
        />
        
        {/* Indicador de status */}
        <div className="absolute top-4 right-4 bg-red-600 text-white px-3 py-1 rounded-full text-sm font-semibold flex items-center">
          <div className="w-2 h-2 bg-white rounded-full mr-2 animate-pulse"></div>
          AO VIVO
        </div>
      </div>
      
      {/* Informações */}
      <div className="text-center mt-4 space-y-2">
        <p className="text-sm text-muted-foreground">
          📺 <strong>TV Suzukysat</strong> - Transmissão ao vivo
        </p>
        <p className="text-xs text-muted-foreground">
          Se não aparecer a live, é porque não estamos transmitindo no momento
        </p>
      </div>
    </div>
  );
}
"use client";

interface YouTubeLivePlayerFinalProps {
  channelId: string;
}

export function YouTubeLivePlayerFinal({ channelId }: YouTubeLivePlayerFinalProps) {
  // Método 3 que funciona: Playlist do canal (inclui lives ativas)
  const embedUrl = `https://www.youtube.com/embed/videoseries?list=UU${channelId.substring(2)}`;

  return (
    <div className="w-full max-w-4xl mx-auto mb-8">
      {/* Player que FUNCIONA */}
      <div className="aspect-video rounded-lg overflow-hidden shadow-lg relative bg-gray-900 mb-4">
        <iframe
          src={embedUrl}
          title="TV Suzukysat - Transmissão ao Vivo"
          className="w-full h-full"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
        />
        
        {/* Indicador de live */}
        <div className="absolute top-4 right-4 bg-red-600 text-white px-3 py-1 rounded-full text-sm font-semibold flex items-center">
          <div className="w-2 h-2 bg-white rounded-full mr-2 animate-pulse"></div>
          AO VIVO
        </div>
      </div>
      
      {/* Informações */}
      <div className="text-center">
        <p className="text-sm text-muted-foreground mb-2">
          📺 <strong>TV Suzukysat</strong> - Últimos vídeos e transmissões ao vivo
        </p>
        <p className="text-xs text-muted-foreground mb-4">
          Quando estivermos ao vivo, a transmissão aparecerá automaticamente como primeiro vídeo
        </p>
        
        {/* Botão direto para YouTube */}
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
    </div>
  );
}
"use client";

interface YouTubeLivePlayerSimpleProps {
  channelId: string;
}

export function YouTubeLivePlayerSimple({ channelId }: YouTubeLivePlayerSimpleProps) {
  return (
    <div className="w-full max-w-4xl mx-auto mb-8">
      {/* Player principal */}
      <div className="aspect-video rounded-lg overflow-hidden shadow-lg relative bg-gray-900 mb-4">
        <iframe
          src={`https://www.youtube.com/embed/live_stream?channel=${channelId}&autoplay=0&mute=0&controls=1&rel=0&modestbranding=1`}
          title="TV Suzukysat - Live Stream"
          className="w-full h-full"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
        />
      </div>
      
      {/* Botões de acesso direto */}
      <div className="flex flex-col sm:flex-row gap-3 justify-center items-center">
        <a 
          href="https://www.youtube.com/@tvsuzukysat/live" 
          target="_blank" 
          rel="noopener noreferrer"
          className="inline-flex items-center px-6 py-3 bg-red-600 hover:bg-red-700 text-white font-semibold rounded-lg transition-colors shadow-lg"
        >
          <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
            <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
          </svg>
          🔴 Assistir Live
        </a>
        
        <a 
          href="https://www.youtube.com/@tvsuzukysat" 
          target="_blank" 
          rel="noopener noreferrer"
          className="inline-flex items-center px-4 py-2 text-red-600 hover:text-red-700 font-medium transition-colors border border-red-600 hover:border-red-700 rounded-lg"
        >
          <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 24 24">
            <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
          </svg>
          Ver Canal
        </a>
      </div>
      
      {/* Informação adicional */}
      <div className="text-center mt-4">
        <p className="text-sm text-muted-foreground">
          Se o player não carregar, clique em "🔴 Assistir Live" para abrir diretamente no YouTube
        </p>
      </div>
    </div>
  );
}
"use client";

import { RadioStationCard } from "@/components/radio-station-card";
import { HeroSection } from "@/components/hero-section";
import { useRadioPlayer } from "@/hooks/use-radio-player";

const radioStations = [
  {
    id: 1,
    name: "Rádio Brega Show",
    genre: "Brega",
    description: "O melhor do brega nacional 24 horas",
    image: "/brega-show.jpg",
    listeners: 1250,
    isLive: true,
    streamUrl: "https://stm1.voxpainel.com.br:9000/stream", // ALTERE AQUI: Coloque a URL real da rádio
  },
  {
    id: 2,
    name: "Rádio Serrana AM 590",
    genre: "Diversos",
    description: "A rádio que fala bem de você!",
    image: "/radio-serrana-am.png",
    listeners: 2100,
    isLive: true,
    streamUrl: "https://stm1.voxpainel.com.br:8716/stream", // ALTERE AQUI: Coloque a URL real da rádio
  },
  {
    id: 3,
    name: "Rádio Suzuky SAT",
    genre: "Diversos",
    description: "A rádio principal da rede de players web",
    image: "/suzuky-sat.jpg",
    listeners: 3500,
    isLive: true,
    streamUrl: "https://server09.srvsh.com.br:7328/stream", // ALTERE AQUI: Coloque a URL real da rádio
  },
  {
    id: 4,
    name: "Rádio Poesia Verso e Viola",
    genre: "MPB",
    description: "Música popular brasileira e poesia",
    image: "/poesia-verso-viola.png",
    listeners: 890,
    isLive: true,
    streamUrl: "https://server22.srvsh.com.br:8502/stream", // ALTERE AQUI: Coloque a URL real da rádio
  },
  {
    id: 5,
    name: "Rádio Comunitária Pedra da Boca",
    genre: "Comunitária",
    description: "A voz da comunidade",
    image: "/pedra-da-boca.png",
    listeners: 650,
    isLive: true,
    streamUrl: "https://server20.srvsh.com.br:8454/stream", // ALTERE AQUI: Coloque a URL real da rádio
  },
  {
    id: 6,
    name: "Rádio Exclusivo Sertanejo",
    genre: "Sertanejo",
    description: "Só os maiores sucessos sertanejos",
    image: "/exclusivo-sertanejo.png",
    listeners: 1800,
    isLive: true,
    streamUrl: "https://stm1.voxpainel.com.br:8408/stream", // ALTERE AQUI: Coloque a URL real da rádio
  },
  {
    id: 7,
    name: "Rádio Forroriando",
    genre: "Forró",
    description: "Forró pé de serra, para você!",
    image: "/forroriando.png",
    listeners: 1400,
    isLive: true,
    streamUrl: "https://stm1.voxpainel.com.br:8014/stream", // ALTERE AQUI: Coloque a URL real da rádio
  },
  {
    id: 8,
    name: "Rádio Delícia FM",
    genre: "Romântica",
    description: "As mais belas canções românticas",
    image: "/delicia-fm.png",
    listeners: 1100,
    isLive: true,
    streamUrl: "https://stm1.voxpainel.com.br:8586/stream", // ALTERE AQUI: Coloque a URL real da rádio
  },
  {
    id: 9,
    name: "Rádio Santuário de Fátima",
    genre: "Religiosa",
    description: "Música católica e reflexões",
    image: "/santuario.png",
    listeners: 750,
    isLive: true,
    streamUrl: "https://stm1.voxpainel.com.br:8086/stream", // ALTERE AQUI: Coloque a URL real da rádio
  },
  {
    id: 10,
    name: "Rádio Breganejo",
    genre: "Brega",
    description: "O melhor do brega e sertanejo",
    image: "/breganejo.jpeg",
    listeners: 980,
    isLive: true,
    streamUrl: "https://stm1.voxpainel.com.br:7518/stream", // ALTERE AQUI: Coloque a URL real da rádio
  },
  {
    id: 11,
    name: "Rádio Balacobaco",
    genre: "Eclética",
    description: "Música de todos os estilos",
    image: "/balacobaco.jpeg",
    listeners: 720,
    isLive: true,
    streamUrl: "https://stm1.voxpainel.com.br:8024/stream", // ALTERE AQUI: Coloque a URL real da rádio
  },
];

export default function HomePage() {
  const radioPlayer = useRadioPlayer();
  const totalListeners = radioStations.reduce(
    (sum, station) => sum + station.listeners,
    0
  );

  return (
    <div className="min-h-screen bg-background">
      <HeroSection totalListeners={totalListeners} />

      {/* Seção de Estatísticas */}
      <section className="py-12 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center justify-items-center">
            <div className="space-y-2">
              <div className="text-3xl font-bold text-primary">
                {radioStations.length}
              </div>
              <div className="text-muted-foreground">Rádios Ativas</div>
            </div>
            <div className="space-y-2">
              <div className="text-3xl font-bold text-primary">
                {totalListeners.toLocaleString()}
              </div>
              <div className="text-muted-foreground">Ouvintes Online</div>
            </div>
            <div className="space-y-2">
              <div className="text-3xl font-bold text-primary">100%</div>
              <div className="text-muted-foreground">Gratuito</div>
            </div>
          </div>
        </div>
      </section>

      {/* Seção Principal das Rádios */}
      <section id="radios" className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-balance mb-4">
              Nossas Estações de Rádio
            </h2>
            <p className="text-lg text-muted-foreground text-pretty max-w-2xl mx-auto">
              Descubra a diversidade musical brasileira com nossas rádios
              especializadas. Do sertanejo ao brega, do forró à MPB, temos o som
              perfeito para você.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {radioStations.map((station) => (
              <RadioStationCard
                key={station.id}
                station={station}
                radioPlayer={radioPlayer}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-primary text-primary-foreground py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-xl font-bold mb-4">Rede Suzuky SAT</h3>
              <p className="text-primary-foreground/80">
                A melhor rede de rádios web do Brasil, levando música de
                qualidade para todos os cantos do país.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Gêneros Musicais</h4>
              <ul className="space-y-2 text-primary-foreground/80">
                <li>Sertanejo</li>
                <li>Brega</li>
                <li>Forró</li>
                <li>MPB</li>
                <li>Romântica</li>
                <li>Religiosa</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Contato</h4>
              <div className="space-y-2 text-primary-foreground/80">
                <p>📧 suzukysat@gmail.com</p>
                <p>📱 WhatsApp: (83) 9 9802-3138</p>
              </div>
            </div>
          </div>
          <div className="border-t border-primary-foreground/20 mt-8 pt-8 text-center text-primary-foreground/60">
            <p>&copy; 2024 Rede Suzuky SAT. Todos os direitos reservados.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

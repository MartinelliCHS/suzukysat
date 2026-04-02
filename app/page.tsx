"use client";

import { RadioStationCard } from "@/components/radio-station-card";
import { HeroSection } from "@/components/hero-section";
import { useRadioPlayer } from "@/hooks/use-radio-player";
import Image from "next/image";

const radioStations = [
  {
    id: 1,
    name: "Rádio Brega Show",
    genre: "Brega",
    description: "O melhor do brega nacional 24 horas",
    image: "/img/bregashow.jpeg",
    listeners: 20257,
    isLive: true,
    streamUrl: "https://stm1.voxpainel.com.br:9000/stream",
  },
  {
    id: 2,
    name: "Rádio Serrana FM",
    genre: "Diversos",
    description: "A rádio que fala bem de você!",
    image: "/img/serrana.jpeg",
    listeners: 33042,
    isLive: true,
    streamUrl: "https://stm1.voxpainel.com.br:8716/stream",
  },
  {
    id: 3,
    name: "Rádio Suzukysat",
    genre: "Diversos",
    description: "A rádio principal da rede de players web",
    image: "/img/suzukysat.jpeg",
    listeners: 10394,
    isLive: true,
    streamUrl: "https://server09.srvsh.com.br:7328/stream",
  },
  {
    id: 4,
    name: "Rádio Poesia Verso e Viola",
    genre: "MPB",
    description: "Música popular brasileira e poesia",
    image: "/img/poesiaversoeviola.jpeg",
    listeners: 19673,
    isLive: true,
    streamUrl: "https://server22.srvsh.com.br:8502/stream",
  },
  {
    id: 5,
    name: "Rádio Comunitária Pedra da Boca",
    genre: "Comunitária",
    description: "A voz da comunidade",
    image: "/img/pedradaboca.jpeg",
    listeners: 17326,
    isLive: true,
    streamUrl: "https://server20.srvsh.com.br:8454/stream",
  },
  {
    id: 6,
    name: "Rádio Exclusivo Sertanejo",
    genre: "Sertanejo",
    description: "Só os maiores sucessos sertanejos",
    image: "/img/exclusivosertanejo.jpeg",
    listeners: 14654,
    isLive: true,
    streamUrl: "https://stm1.voxpainel.com.br:8408/stream",
  },
  {
    id: 7,
    name: "Rádio Forroriando",
    genre: "Forró",
    description: "Forró pé de serra, para você!",
    image: "/img/forroriando.jpeg",
    listeners: 13321,
    isLive: true,
    streamUrl: "https://stm1.voxpainel.com.br:8014/stream",
  },
  {
    id: 8,
    name: "Rádio Delícia FM",
    genre: "Romântica",
    description: "As mais belas canções românticas",
    image: "/img/deliciafm.jpeg",
    listeners: 12324,
    isLive: true,
    streamUrl: "https://stm1.voxpainel.com.br:8586/stream",
  },
  {
    id: 9,
    name: "Rádio Santuário de Fátima",
    genre: "Religiosa",
    description: "Música católica e reflexões",
    image: "/img/santuario.jpeg",
    listeners: 15836,
    isLive: true,
    streamUrl: "https://stm1.voxpainel.com.br:8086/stream",
  },
  {
    id: 10,
    name: "Rádio Breganejo",
    genre: "Brega",
    description: "O melhor do brega e sertanejo",
    image: "/img/breganejo.jpeg",
    listeners: 10349,
    isLive: true,
    streamUrl: "https://stm1.voxpainel.com.br:7518/stream",
  },
  {
    id: 11,
    name: "Araruna FM",
    genre: "Diversos",
    description: "Todos os ritmos em uma só rádio",
    image: "/img/ararunafm.jpeg",
    listeners: 18334,
    isLive: true,
    streamUrl: "https://server07.srvsh.com.br:8062/stream",
  },
  {
    id: 12,
    name: "FM Brega Show Manaus",
    genre: "Brega",
    description: "Aqui só toca bregão",
    image: "/img/bregashowmanaus.jpeg",
    listeners: 18334,
    isLive: true,
    streamUrl: "https://stm1.voxpainel.com.br:8456/stream",
  },
];

export default function HomePage() {
  const radioPlayer = useRadioPlayer();
  const totalListeners = radioStations.reduce(
    (sum, station) => sum + station.listeners,
    0,
  );

  return (
    <div className="min-h-screen bg-background">
      <HeroSection
        totalListeners={totalListeners}
        totalStations={radioStations.length}
      />

      {/* Seção Principal das Rádios */}
      <section id="radios" className="py-16">
        <div className="container mx-auto px-4">
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
                <div className="flex items-center gap-2">
                  <a
                    href="mailto:suzukysat@gmail.com?subject=Vim%20pelo%20site%20Rede%20Suzukysat"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 hover:opacity-80 transition-opacity"
                  >
                    <Image
                      src="/img/e-mail.png"
                      alt="Email"
                      width={20}
                      height={20}
                    />
                    Email
                  </a>
                </div>
                <div className="flex items-center gap-2">
                  <a
                    href="https://wa.me/5583998023138?text=Ol%C3%A1!%20vim%20pelo%20site%2C%20gostaria%20de%20saber%20mais%20sobre%20a%20rede%20de%20r%C3%A1dios..."
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 hover:opacity-80 transition-opacity"
                  >
                    <Image
                      src="/img/whatsapplogo.png"
                      alt="WhatsApp"
                      width={20}
                      height={20}
                    />
                    WhatsApp
                  </a>
                </div>

                <div className="flex items-center gap-2">
                  <a
                    href="https://www.facebook.com/carlos.suzuky"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 hover:opacity-80 transition-opacity"
                  >
                    <Image
                      src="/img/facebook.png"
                      alt="Facebook"
                      width={20}
                      height={20}
                    />
                    Facebook
                  </a>
                </div>

                <div className="flex items-center gap-2">
                  <a
                    href="https://www.instagram.com/carlossuzuky?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw=="
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 hover:opacity-80 transition-opacity"
                  >
                    <Image
                      src="/img/instagram.png"
                      alt="Instagram"
                      width={20}
                      height={20}
                    />
                    Instagram
                  </a>
                </div>
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

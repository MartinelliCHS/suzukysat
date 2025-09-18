import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Play, Pause, Users, Heart, Share2, Volume2, Loader2 } from "lucide-react"
import Image from "next/image"

interface RadioStation {
  id: number
  name: string
  genre: string
  description: string
  image: string
  listeners: number
  isLive: boolean
  currentSong: string
  streamUrl: string
}

interface RadioStationCardProps {
  station: RadioStation
  radioPlayer: {
    isPlaying: boolean
    currentStation: RadioStation | null
    isLoading: boolean
    playStation: (station: RadioStation) => void
    stopPlayback: () => void
  }
}

export function RadioStationCard({ station, radioPlayer }: RadioStationCardProps) {
  const genreColors = {
    Brega: "bg-pink-100 text-pink-800 border-pink-200",
    Sertanejo: "bg-amber-100 text-amber-800 border-amber-200",
    Variados: "bg-blue-100 text-blue-800 border-blue-200",
    MPB: "bg-purple-100 text-purple-800 border-purple-200",
    Comunitária: "bg-green-100 text-green-800 border-green-200",
    Forró: "bg-orange-100 text-orange-800 border-orange-200",
    Romântica: "bg-rose-100 text-rose-800 border-rose-200",
    Religiosa: "bg-indigo-100 text-indigo-800 border-indigo-200",
    Eclética: "bg-teal-100 text-teal-800 border-teal-200",
  }

  const isCurrentStation = radioPlayer.currentStation?.id === station.id
  const isStationPlaying = isCurrentStation && radioPlayer.isPlaying
  const isStationLoading = isCurrentStation && radioPlayer.isLoading

  const handlePlayClick = () => {
    radioPlayer.playStation(station)
  }

  return (
    <Card className="group hover:shadow-lg transition-all duration-300 hover:-translate-y-1 border-2 hover:border-primary/20">
      <CardContent className="p-0">
        {/* Imagem da Rádio */}
        <div className="relative overflow-hidden rounded-t-lg">
          <Image
            src={station.image || "/placeholder.svg"}
            alt={station.name}
            width={300}
            height={200}
            className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
          />
          {station.isLive && (
            <Badge className="absolute top-3 left-3 bg-red-500 text-white border-0 animate-pulse">
              <div className="w-2 h-2 bg-white rounded-full mr-1"></div>
              AO VIVO
            </Badge>
          )}
          <div className="absolute top-3 right-3">
            <Badge
              variant="secondary"
              className={genreColors[station.genre as keyof typeof genreColors] || "bg-gray-100 text-gray-800"}
            >
              {station.genre}
            </Badge>
          </div>
          {isStationPlaying && (
            <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
              <div className="bg-white/90 rounded-full p-2">
                <Volume2 className="h-6 w-6 text-primary animate-pulse" />
              </div>
            </div>
          )}
        </div>

        <div className="p-6">
          {/* Nome e Descrição */}
          <h3 className="font-bold text-lg mb-2 text-balance group-hover:text-primary transition-colors">
            {station.name}
          </h3>
          <p className="text-muted-foreground text-sm mb-4 text-pretty">{station.description}</p>

          {/* Música Atual */}
          <div className="mb-4 p-3 bg-muted/50 rounded-lg">
            <div className="flex items-center gap-2 mb-1">
              <Volume2 size={14} className="text-primary" />
              <span className="text-xs font-medium text-muted-foreground">TOCANDO AGORA</span>
            </div>
            <p className="text-sm font-medium text-pretty">{station.currentSong}</p>
          </div>

          {/* Estatísticas */}
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-1 text-muted-foreground">
              <Users size={16} />
              <span className="text-sm">{station.listeners.toLocaleString()}</span>
            </div>
            <div className="flex gap-2">
              <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                <Heart size={16} />
              </Button>
              <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                <Share2 size={16} />
              </Button>
            </div>
          </div>

          {/* Botão de Play */}
          <Button 
            onClick={handlePlayClick}
            disabled={isStationLoading}
            className="w-full group-hover:bg-primary group-hover:text-primary-foreground transition-colors"
          >
            {isStationLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Carregando...
              </>
            ) : isStationPlaying ? (
              <>
                <Pause className="mr-2 h-4 w-4" />
                Pausar
              </>
            ) : (
              <>
                <Play className="mr-2 h-4 w-4" />
                Ouvir Agora
              </>
            )}
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}

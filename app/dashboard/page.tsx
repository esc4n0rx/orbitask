"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Plus, Rocket, Users, Calendar, Target, TrendingUp } from "lucide-react"
import { useRouter } from "next/navigation"

interface Station {
  id: string
  name: string
  description: string
  color: string
  boards: number
  tasks: number
  members: number
}

export default function DashboardPage() {
  const router = useRouter()
  const [stations, setStations] = useState<Station[]>([
    {
      id: "1",
      name: "Marketing Station",
      description: "Campanhas e estratégias de marketing",
      color: "from-purple-600 to-pink-600",
      boards: 3,
      tasks: 12,
      members: 4,
    },
    {
      id: "2",
      name: "Development Station",
      description: "Projetos de desenvolvimento",
      color: "from-cyan-600 to-blue-600",
      boards: 2,
      tasks: 8,
      members: 3,
    },
  ])

  const [user, setUser] = useState(null)
  const [isNewStationModalOpen, setIsNewStationModalOpen] = useState(false)
  const [isSpaceTraveling, setIsSpaceTraveling] = useState(false)
  const [newStation, setNewStation] = useState({
    name: "",
    description: "",
    color: "from-purple-600 to-pink-600",
  })

  const colorOptions = [
    {
      value: "from-purple-600 to-pink-600",
      label: "Roxo para Rosa",
      preview: "bg-gradient-to-r from-purple-600 to-pink-600",
    },
    {
      value: "from-cyan-600 to-blue-600",
      label: "Ciano para Azul",
      preview: "bg-gradient-to-r from-cyan-600 to-blue-600",
    },
    {
      value: "from-green-600 to-emerald-600",
      label: "Verde para Esmeralda",
      preview: "bg-gradient-to-r from-green-600 to-emerald-600",
    },
    {
      value: "from-orange-600 to-red-600",
      label: "Laranja para Vermelho",
      preview: "bg-gradient-to-r from-orange-600 to-red-600",
    },
    {
      value: "from-indigo-600 to-purple-600",
      label: "Índigo para Roxo",
      preview: "bg-gradient-to-r from-indigo-600 to-purple-600",
    },
    {
      value: "from-pink-600 to-rose-600",
      label: "Rosa para Rose",
      preview: "bg-gradient-to-r from-pink-600 to-rose-600",
    },
  ]

  useEffect(() => {
    const userData = localStorage.getItem("orbitask_user")
    if (userData) {
      setUser(JSON.parse(userData))
    }
  }, [])

  const handleCreateStation = () => {
    if (!newStation.name.trim()) return

    const station: Station = {
      id: Date.now().toString(),
      name: newStation.name,
      description: newStation.description,
      color: newStation.color,
      boards: 0,
      tasks: 0,
      members: 1,
    }

    setStations((prev) => [...prev, station])
    setIsNewStationModalOpen(false)

    // Animação de viagem espacial
    setIsSpaceTraveling(true)

    setTimeout(() => {
      router.push(`/dashboard/station/${station.id}`)
    }, 2000)

    setNewStation({
      name: "",
      description: "",
      color: "from-purple-600 to-pink-600",
    })
  }

  const handleStationClick = (stationId: string) => {
    setIsSpaceTraveling(true)
    setTimeout(() => {
      router.push(`/dashboard/station/${stationId}`)
    }, 1500)
  }

  return (
    <>
      {/* Space Travel Animation */}
      <AnimatePresence>
        {isSpaceTraveling && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-slate-900 flex items-center justify-center"
          >
            <div className="relative">
              {/* Stars during travel */}
              <div className="absolute inset-0 w-screen h-screen overflow-hidden">
                {[...Array(50)].map((_, i) => (
                  <motion.div
                    key={i}
                    className="absolute w-1 h-1 bg-white rounded-full"
                    style={{
                      left: `${Math.random() * 100}%`,
                      top: `${Math.random() * 100}%`,
                    }}
                    animate={{
                      x: [0, -2000],
                      opacity: [0, 1, 0],
                    }}
                    transition={{
                      duration: 2,
                      delay: Math.random() * 0.5,
                      ease: "easeOut",
                    }}
                  />
                ))}
              </div>

              {/* Rocket */}
              <motion.div
                initial={{ scale: 0.5, rotate: 0 }}
                animate={{
                  scale: [0.5, 1.2, 0.8],
                  rotate: [0, 360, 720],
                  x: [0, 100, -100, 0],
                  y: [0, -50, 50, 0],
                }}
                transition={{ duration: 2, ease: "easeInOut" }}
                className="text-6xl"
              >
                🚀
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="text-center mt-8"
              >
                <h2 className="text-2xl font-bold text-white mb-2">Viajando para a Station...</h2>
                <p className="text-gray-400">Preparando sistemas de navegação</p>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="space-y-8 relative z-10">
        {/* Welcome Section */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-white mb-2">
                Bem-vindo de volta, {user?.name || "Astronauta"}! 🚀
              </h1>
              <p className="text-gray-400">Pronto para continuar sua missão de produtividade?</p>
            </div>
            <Button
              className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 card-glow"
              onClick={() => setIsNewStationModalOpen(true)}
            >
              <Plus className="w-4 h-4 mr-2" />
              Nova Station
            </Button>
          </div>
        </motion.div>

        {/* Stats Cards */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="grid grid-cols-1 md:grid-cols-4 gap-6"
        >
          <Card className="bg-slate-800/50 border-purple-500/30 card-glow backdrop-blur-sm">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-400 text-sm">Total Stations</p>
                  <p className="text-2xl font-bold text-white">{stations.length}</p>
                </div>
                <div className="w-12 h-12 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full flex items-center justify-center">
                  <Target className="w-6 h-6 text-white" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-slate-800/50 border-cyan-500/30 card-glow backdrop-blur-sm">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-400 text-sm">Boards Ativos</p>
                  <p className="text-2xl font-bold text-white">
                    {stations.reduce((acc, station) => acc + station.boards, 0)}
                  </p>
                </div>
                <div className="w-12 h-12 bg-gradient-to-r from-cyan-600 to-blue-600 rounded-full flex items-center justify-center">
                  <Calendar className="w-6 h-6 text-white" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-slate-800/50 border-green-500/30 card-glow backdrop-blur-sm">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-400 text-sm">Tarefas Totais</p>
                  <p className="text-2xl font-bold text-white">
                    {stations.reduce((acc, station) => acc + station.tasks, 0)}
                  </p>
                </div>
                <div className="w-12 h-12 bg-gradient-to-r from-green-600 to-emerald-600 rounded-full flex items-center justify-center">
                  <TrendingUp className="w-6 h-6 text-white" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-slate-800/50 border-orange-500/30 card-glow backdrop-blur-sm">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-400 text-sm">Membros</p>
                  <p className="text-2xl font-bold text-white">
                    {stations.reduce((acc, station) => acc + station.members, 0)}
                  </p>
                </div>
                <div className="w-12 h-12 bg-gradient-to-r from-orange-600 to-red-600 rounded-full flex items-center justify-center">
                  <Users className="w-6 h-6 text-white" />
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Stations Grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-white">Suas Stations</h2>
            <Button variant="outline" className="border-purple-500/30 text-purple-300 hover:bg-purple-500/10">
              Ver Todas
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {stations.map((station, index) => (
              <motion.div
                key={station.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 * index }}
                className="bounce-in"
              >
                <Card
                  className="bg-slate-800/50 border-slate-700/50 hover:border-purple-500/50 card-glow cursor-pointer backdrop-blur-sm"
                  onClick={() => handleStationClick(station.id)}
                >
                  <CardHeader>
                    <div
                      className={`w-12 h-12 bg-gradient-to-r ${station.color} rounded-full flex items-center justify-center mb-4`}
                    >
                      <Rocket className="w-6 h-6 text-white" />
                    </div>
                    <CardTitle className="text-white">{station.name}</CardTitle>
                    <CardDescription className="text-gray-400">{station.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center justify-between text-sm">
                      <div className="flex items-center space-x-4">
                        <Badge variant="secondary" className="bg-slate-700/50 text-gray-300">
                          {station.boards} boards
                        </Badge>
                        <Badge variant="secondary" className="bg-slate-700/50 text-gray-300">
                          {station.tasks} tarefas
                        </Badge>
                      </div>
                      <div className="flex items-center text-gray-400">
                        <Users className="w-4 h-4 mr-1" />
                        {station.members}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}

            {/* Add New Station Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 * stations.length }}
              className="bounce-in"
            >
              <Card
                className="bg-slate-800/30 border-dashed border-2 border-slate-600 hover:border-purple-500/50 card-glow cursor-pointer backdrop-blur-sm"
                onClick={() => setIsNewStationModalOpen(true)}
              >
                <CardContent className="flex flex-col items-center justify-center h-48 text-center">
                  <div className="w-12 h-12 bg-slate-700/50 rounded-full flex items-center justify-center mb-4">
                    <Plus className="w-6 h-6 text-gray-400" />
                  </div>
                  <h3 className="text-white font-semibold mb-2">Nova Station</h3>
                  <p className="text-gray-400 text-sm">Crie uma nova estação para organizar seus projetos</p>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </motion.div>

        {/* Recent Activity */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <Card className="bg-slate-800/50 border-slate-700/50 card-glow backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-white">Atividade Recente</CardTitle>
              <CardDescription className="text-gray-400">Últimas atualizações em suas stations</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center space-x-4">
                  <div className="w-2 h-2 bg-green-500 rounded-full priority-pulse"></div>
                  <div className="flex-1">
                    <p className="text-white text-sm">
                      Tarefa "Design do logo" foi concluída em{" "}
                      <span className="text-purple-400">Marketing Station</span>
                    </p>
                    <p className="text-gray-400 text-xs">2 horas atrás</p>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="w-2 h-2 bg-blue-500 rounded-full priority-pulse"></div>
                  <div className="flex-1">
                    <p className="text-white text-sm">
                      Nova tarefa criada em <span className="text-cyan-400">Development Station</span>
                    </p>
                    <p className="text-gray-400 text-xs">4 horas atrás</p>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="w-2 h-2 bg-purple-500 rounded-full priority-pulse"></div>
                  <div className="flex-1">
                    <p className="text-white text-sm">
                      Membro adicionado à <span className="text-purple-400">Marketing Station</span>
                    </p>
                    <p className="text-gray-400 text-xs">1 dia atrás</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* New Station Modal */}
      <Dialog open={isNewStationModalOpen} onOpenChange={setIsNewStationModalOpen}>
        <DialogContent className="bg-slate-800 border-slate-700 text-white max-w-2xl">
          <DialogHeader>
            <DialogTitle className="text-xl font-bold">🚀 Nova Station</DialogTitle>
            <DialogDescription className="text-gray-400">
              Crie uma nova estação para organizar seus projetos
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-6">
            <div>
              <Label htmlFor="stationName" className="text-sm font-medium text-gray-300">
                Nome da Station *
              </Label>
              <Input
                id="stationName"
                value={newStation.name}
                onChange={(e) => setNewStation((prev) => ({ ...prev, name: e.target.value }))}
                className="bg-slate-700/50 border-slate-600 text-white"
                placeholder="Ex: Marketing Station, Development Hub..."
              />
            </div>

            <div>
              <Label htmlFor="stationDescription" className="text-sm font-medium text-gray-300">
                Descrição
              </Label>
              <Textarea
                id="stationDescription"
                value={newStation.description}
                onChange={(e) => setNewStation((prev) => ({ ...prev, description: e.target.value }))}
                className="bg-slate-700/50 border-slate-600 text-white"
                placeholder="Descreva o propósito desta station..."
                rows={3}
              />
            </div>

            <div>
              <Label className="text-sm font-medium text-gray-300 mb-3 block">Escolha uma cor</Label>
              <div className="grid grid-cols-3 gap-3">
                {colorOptions.map((color) => (
                  <div
                    key={color.value}
                    className={`p-3 rounded-lg border-2 cursor-pointer transition-all ${
                      newStation.color === color.value
                        ? "border-purple-500 bg-slate-700/50"
                        : "border-slate-600 hover:border-slate-500"
                    }`}
                    onClick={() => setNewStation((prev) => ({ ...prev, color: color.value }))}
                  >
                    <div className={`w-full h-8 rounded ${color.preview} mb-2`}></div>
                    <p className="text-xs text-gray-300 text-center">{color.label}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex justify-end space-x-3 pt-4">
              <Button
                variant="outline"
                onClick={() => setIsNewStationModalOpen(false)}
                className="border-slate-600 text-gray-300"
              >
                Cancelar
              </Button>
              <Button
                onClick={handleCreateStation}
                className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
                disabled={!newStation.name.trim()}
              >
                <Rocket className="w-4 h-4 mr-2" />
                Criar Station
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  )
}

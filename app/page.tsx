"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { 
  ArrowRight, 
  Rocket, 
  Users, 
  Zap, 
  Target, 
  Star, 
  Globe,
  Sparkles,
  Orbit,
  Satellite,
  Atom,
  Telescope,
  MousePointer
} from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { ThemeToggle } from "@/components/theme-toggle"

// Componente de partículas cósmicas
const CosmicParticles = () => {
  const [particles, setParticles] = useState<Array<{id: number, x: number, y: number, size: number, type: string}>>([])

  useEffect(() => {
    const newParticles = Array.from({ length: 50 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 4 + 1,
      type: ['purple', 'pink', 'blue'][Math.floor(Math.random() * 3)]
    }))
    setParticles(newParticles)
  }, [])

  return (
    <div className="cosmic-particles">
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          className={`particle particle-${particle.type}`}
          style={{
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            width: `${particle.size}px`,
            height: `${particle.size}px`,
          }}
          animate={{
            y: [-100, window.innerHeight + 100],
            rotate: [0, 360],
            scale: [0, 1, 0],
          }}
          transition={{
            duration: Math.random() * 20 + 10,
            repeat: Infinity,
            delay: Math.random() * 5,
            ease: "linear"
          }}
        />
      ))}
    </div>
  )
}

// Componente de ícones flutuantes
const FloatingIcons = () => {
  const icons = [
    { Icon: Satellite, delay: 0, duration: 8 },
    { Icon: Atom, delay: 1, duration: 10 },
    { Icon: Telescope, delay: 3, duration: 9 },
    { Icon: Orbit, delay: 4, duration: 11 },
  ]

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {icons.map(({ Icon, delay, duration }, index) => (
        <motion.div
          key={index}
          className="absolute text-purple-400/20"
          style={{
            left: `${10 + index * 20}%`,
            top: `${20 + (index % 2) * 30}%`,
          }}
          animate={{
            y: [-20, 20, -20],
            rotate: [0, 180, 360],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration,
            delay,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        >
          <Icon size={40} />
        </motion.div>
      ))}
    </div>
  )
}

// Componente de cursor personalizado
const CustomCursor = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [isHovering, setIsHovering] = useState(false)

  useEffect(() => {
    const updateMousePosition = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
    }

    const handleMouseEnter = () => setIsHovering(true)
    const handleMouseLeave = () => setIsHovering(false)

    window.addEventListener('mousemove', updateMousePosition)
    
    const interactiveElements = document.querySelectorAll('button, a, .cosmic-hover')
    interactiveElements.forEach(el => {
      el.addEventListener('mouseenter', handleMouseEnter)
      el.addEventListener('mouseleave', handleMouseLeave)
    })

    return () => {
      window.removeEventListener('mousemove', updateMousePosition)
      interactiveElements.forEach(el => {
        el.removeEventListener('mouseenter', handleMouseEnter)
        el.removeEventListener('mouseleave', handleMouseLeave)
      })
    }
  }, [])

  return (
    <motion.div
      className="fixed top-0 left-0 pointer-events-none z-50 mix-blend-screen"
      animate={{
        x: mousePosition.x - 20,
        y: mousePosition.y - 20,
        scale: isHovering ? 1.5 : 1,
      }}
      transition={{
        type: "spring",
        stiffness: 500,
        damping: 28,
      }}
    >
      <div className="w-10 h-10 rounded-full bg-gradient-to-r from-purple-400 to-pink-400 opacity-30 blur-sm" />
    </motion.div>
  )
}

export default function LandingPage() {
  const [currentSection, setCurrentSection] = useState(0)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth) * 2 - 1,
        y: (e.clientY / window.innerHeight) * 2 - 1,
      })
    }
    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  return (
    <div className="min-h-screen space-background relative overflow-hidden">
      {/* Custom Cursor */}
      <CustomCursor />

      {/* Cosmic Particles */}
      <CosmicParticles />
      
      {/* Aurora Background */}
      <div className="aurora-bg" />
      
      {/* Floating Icons */}
      <FloatingIcons />

      {/* Parallax Background Elements */}
      <motion.div
        className="absolute inset-0 opacity-30"
        style={{
          transform: `translate(${mousePosition.x * 20}px, ${mousePosition.y * 20}px)`,
        }}
      >
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl" />
        <div className="absolute top-3/4 right-1/4 w-96 h-96 bg-pink-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 left-1/2 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl" />
      </motion.div>

      {/* Header */}
      <motion.header 
        className="relative z-20 container mx-auto px-4 py-6"
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.2 }}
      >
        <div className="glass-morphism rounded-2xl px-6 py-4 flex justify-between items-center">
          <motion.div 
            className="flex items-center space-x-3"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            >
              <Image src="/logo.png" alt="Orbitask" width={40} height={40} />
            </motion.div>
            <span className="text-2xl font-bold text-white tracking-wider">
              Orbit<span className="text-purple-400">ask</span>
            </span>
          </motion.div>
          
          <div className="flex items-center space-x-4">
            <ThemeToggle />
            <Link href="/login">
              <Button 
                variant="ghost" 
                className="text-white/80 hover:text-white hover:bg-white/10 backdrop-blur-sm border border-white/10 rounded-xl"
              >
                <MousePointer className="w-4 h-4 mr-2" />
                Entrar
              </Button>
            </Link>
            <Link href="/register">
              <Button className="btn-cosmic rounded-xl px-6 py-2 font-semibold">
                <Sparkles className="w-4 h-4 mr-2" />
                Começar Jornada
              </Button>
            </Link>
          </div>
        </div>
      </motion.header>

      {/* Hero Section */}
      <section className="relative z-10 container mx-auto px-4 py-20 text-center">
        <motion.div
          initial={{ opacity: 0, y: 100 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.4 }}
        >
          {/* Badge with animation */}
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.6, delay: 0.8, type: "spring" }}
            className="mb-8"
          >
            <Badge className="glass-morphism px-6 py-2 text-purple-300 border-purple-500/30 rounded-full">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                className="mr-2"
              >
                <Star className="w-4 h-4" />
              </motion.div>
              Sistema de Produtividade
              </Badge>
          </motion.div>

          {/* Main Title with Animated Text */}
          <motion.h1 
            className="text-6xl md:text-8xl font-bold text-white mb-8 leading-tight"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 1 }}
          >
            Organize seus projetos
            <br />
            <motion.span 
              className="bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent"
              animate={{ 
                backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
              }}
              transition={{ 
                duration: 5, 
                repeat: Infinity, 
                ease: "linear" 
              }}
              style={{ backgroundSize: "200% 200%" }}
            >
              como constelações
            </motion.span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p 
            className="text-xl md:text-2xl text-gray-300 mb-12 max-w-4xl mx-auto leading-relaxed"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.2 }}
          >
            Orbitask é a plataforma de gerenciamento que{" "}
            <span className="text-purple-400 font-semibold">revoluciona</span> a forma como você 
            organiza tarefas, com interface espacial e{" "}
            <span className="text-pink-400 font-semibold">inteligência</span> que adapta ao seu fluxo.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div 
            className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-20"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.4 }}
          >
            <Link href="/register">
              <motion.div
                whileHover={{ scale: 1.05, y: -5 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button
                  size="lg"
                  className="btn-cosmic text-lg px-8 py-4 rounded-2xl font-semibold group relative overflow-hidden"
                >
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600"
                    animate={{
                      x: ["-100%", "100%"],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: "linear",
                    }}
                  />
                  <span className="relative z-10 flex items-center">
                    <Rocket className="w-5 h-5 mr-3 group-hover:animate-pulse" />
                    Iniciar Missão
                    <ArrowRight className="w-5 h-5 ml-3 group-hover:translate-x-1 transition-transform" />
                  </span>
                </Button>
              </motion.div>
            </Link>
            
            <motion.div
              whileHover={{ scale: 1.05, y: -5 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button
                size="lg"
                variant="outline"
                className="glass-morphism border-purple-500/30 text-purple-300 hover:bg-purple-500/10 text-lg px-8 py-4 rounded-2xl font-semibold backdrop-blur-xl"
              >
                <Globe className="w-5 h-5 mr-3" />
                Explorar Demo
              </Button>
            </motion.div>
          </motion.div>

          {/* 3D Floating Dashboard Preview */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8, rotateX: 20 }}
            animate={{ opacity: 1, scale: 1, rotateX: 0 }}
            transition={{ duration: 1, delay: 1.6 }}
            className="relative max-w-6xl mx-auto perspective-1000"
          >
            <div className="glass-card p-8 rounded-3xl cosmic-hover">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center space-x-3">
                  <motion.div 
                    className="w-3 h-3 bg-red-500 rounded-full"
                    animate={{ opacity: [1, 0.5, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  />
                  <motion.div 
                    className="w-3 h-3 bg-yellow-500 rounded-full"
                    animate={{ opacity: [1, 0.5, 1] }}
                    transition={{ duration: 2, repeat: Infinity, delay: 0.2 }}
                  />
                  <motion.div 
                    className="w-3 h-3 bg-green-500 rounded-full"
                    animate={{ opacity: [1, 0.5, 1] }}
                    transition={{ duration: 2, repeat: Infinity, delay: 0.4 }}
                  />
                </div>
                <Badge className="glass-morphism text-purple-300 border-purple-500/30">
                  Live Preview
                </Badge>
              </div>
              
              <div className="grid md:grid-cols-3 gap-6">
                {["To Do", "In Progress", "Done"].map((status, index) => (
                  <motion.div
                    key={status}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 1.8 + index * 0.2 }}
                    className="glass-morphism rounded-2xl p-4"
                  >
                    <h4 className="text-purple-300 font-semibold mb-4 flex items-center">
                      <div className={`w-3 h-3 rounded-full mr-2 ${
                        index === 0 ? 'bg-purple-500' : 
                        index === 1 ? 'bg-blue-500' : 'bg-green-500'
                      }`} />
                      {status}
                    </h4>
                    <div className="space-y-3">
                      {Array.from({ length: Math.max(1, 3 - index) }).map((_, i) => (
                        <motion.div
                          key={i}
                          className="glass-morphism rounded-xl p-3 text-sm text-white cursor-pointer cosmic-hover"
                          whileHover={{ scale: 1.02, y: -2 }}
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ 
                            duration: 0.4, 
                            delay: 2 + index * 0.2 + i * 0.1,
                            type: "spring"
                          }}
                        >
                          {index === 0 && i === 0 && "🚀 Lançar nova feature"}
                          {index === 0 && i === 1 && "📊 Análise de dados"}
                          {index === 0 && i === 2 && "🎨 Design da landing"}
                          {index === 1 && i === 0 && "⚡ Otimização do sistema"}
                          {index === 1 && i === 1 && "🔧 Correção de bugs"}
                          {index === 2 && i === 0 && "✨ Projeto concluído"}
                        </motion.div>
                      ))}
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </motion.div>
      </section>

      {/* Features Section */}
      <section className="relative z-10 container mx-auto px-4 py-32">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <Badge className="glass-morphism px-4 py-2 text-blue-300 border-blue-500/30 rounded-full mb-6">
            <Sparkles className="w-4 h-4 mr-2" />
            Recursos Estelares
          </Badge>
          <h2 className="text-5xl md:text-6xl font-bold text-white mb-6">
            Funcionalidades que{" "}
            <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              orbitam
            </span>{" "}
            ao seu redor
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Cada recurso foi pensado para maximizar sua produtividade com tecnologia de ponta
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {[
            {
              icon: Target,
              title: "Stations Inteligentes",
              description: "Workspaces que se adaptam ao seu fluxo de trabalho com IA integrada",
              gradient: "from-purple-600 to-pink-600",
              delay: 0.1
            },
            {
              icon: Zap,
              title: "Drag & Drop Cósmico",
              description: "Interface fluida com física realista e feedbacks visuais imersivos",
              gradient: "from-cyan-600 to-blue-600",
              delay: 0.2
            },
            {
              icon: Users,
              title: "Colaboração Quântica",
              description: "Sincronização em tempo real com múltiplas dimensões de trabalho",
              gradient: "from-pink-600 to-rose-600",
              delay: 0.3
            }
          ].map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 50, rotateY: -15 }}
              whileInView={{ opacity: 1, y: 0, rotateY: 0 }}
              transition={{ duration: 0.8, delay: feature.delay }}
              viewport={{ once: true }}
            >
              <Card className="glass-card cosmic-hover h-full group border-0">
                <CardContent className="p-8 text-center h-full flex flex-col">
                  <motion.div
                    className={`w-20 h-20 bg-gradient-to-r ${feature.gradient} rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300`}
                    whileHover={{ rotate: 360 }}
                    transition={{ duration: 0.6 }}
                  >
                    <feature.icon className="w-10 h-10 text-white" />
                  </motion.div>
                  <h3 className="text-2xl font-bold text-white mb-4">{feature.title}</h3>
                  <p className="text-gray-300 leading-relaxed flex-grow">{feature.description}</p>
                  <motion.div
                    className="mt-6 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    initial={{ y: 10 }}
                    whileHover={{ y: 0 }}
                  >
                    <Button 
                      variant="ghost" 
                      className="text-purple-400 hover:text-purple-300 hover:bg-purple-500/10"
                    >
                      Explorar →
                    </Button>
                  </motion.div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Interactive Demo Section */}
      <section className="relative z-10 container mx-auto px-4 py-32">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1 }}
          viewport={{ once: true }}
          className="glass-card p-8 md:p-12 rounded-3xl cosmic-hover"
        >
          <div className="text-center mb-12">
            <Badge className="glass-morphism px-4 py-2 text-green-300 border-green-500/30 rounded-full mb-6">
              <Satellite className="w-4 h-4 mr-2" />
              Demo Interativo
            </Badge>
            <h3 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Veja o Orbitask em{" "}
              <span className="bg-gradient-to-r from-green-400 to-blue-400 bg-clip-text text-transparent">
                ação
              </span>
            </h3>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Interface que combina beleza e funcionalidade em perfeita harmonia
            </p>
          </div>

          {/* Interactive Preview */}
          <motion.div 
            className="relative bg-gradient-to-br from-slate-900/50 to-purple-900/30 rounded-2xl p-8 backdrop-blur-xl border border-purple-500/20"
            whileHover={{ scale: 1.02, rotateX: 5 }}
            transition={{ duration: 0.3 }}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 via-pink-500/10 to-blue-500/10 rounded-2xl opacity-0 hover:opacity-100 transition-opacity duration-500" />
            
            <div className="relative z-10">
              <div className="flex items-center justify-between mb-8">
                <div className="flex items-center space-x-3">
                  <motion.div 
                    className="w-4 h-4 bg-purple-500 rounded-full"
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  />
                  <span className="text-white font-semibold text-lg">Marketing Galaxy</span>
                </div>
                <div className="flex space-x-2">
                  {[...Array(3)].map((_, i) => (
                    <motion.div
                      key={i}
                      className={`w-3 h-3 rounded-full ${
                        i === 0 ? 'bg-green-500' : i === 1 ? 'bg-yellow-500' : 'bg-red-500'
                      }`}
                      animate={{ 
                        opacity: [0.5, 1, 0.5],
                        scale: [1, 1.1, 1]
                      }}
                      transition={{ 
                        duration: 2, 
                        repeat: Infinity, 
                        delay: i * 0.3 
                      }}
                    />
                  ))}
                </div>
              </div>

              <div className="grid md:grid-cols-3 gap-6">
                {[
                  { title: "Planejamento", color: "purple", tasks: ["Pesquisa de mercado", "Definir personas"] },
                  { title: "Execução", color: "blue", tasks: ["Criar campanhas", "Design assets"] },
                  { title: "Análise", color: "green", tasks: ["Métricas de conversão"] }
                ].map((column, index) => (
                  <motion.div
                    key={column.title}
                    className="glass-morphism rounded-xl p-4"
                    initial={{ opacity: 0, x: index * 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.2 }}
                    viewport={{ once: true }}
                  >
                    <h4 className={`text-${column.color}-300 font-semibold mb-4 flex items-center`}>
                      <div className={`w-3 h-3 bg-${column.color}-500 rounded-full mr-2`} />
                      {column.title}
                    </h4>
                    <div className="space-y-3">
                      {column.tasks.map((task, i) => (
                        <motion.div
                          key={task}
                          className="glass-morphism rounded-lg p-3 text-sm text-white hover:bg-white/5 cursor-pointer transition-all duration-200"
                          whileHover={{ scale: 1.02, x: 5 }}
                          initial={{ opacity: 0, y: 10 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.4, delay: index * 0.2 + i * 0.1 }}
                          viewport={{ once: true }}
                        >
                          {task}
                        </motion.div>
                      ))}
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </motion.div>
      </section>

      {/* CTA Final Section */}
      <section className="relative z-10 container mx-auto px-4 py-32 text-center">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto"
        >
          <Badge className="glass-morphism px-4 py-2 text-pink-300 border-pink-500/30 rounded-full mb-8">
            <Rocket className="w-4 h-4 mr-2" />
            Pronto para Decolar?
          </Badge>
          
          <h2 className="text-5xl md:text-6xl font-bold text-white mb-8 leading-tight">
            Transforme sua produtividade em uma{" "}
            <span className="bg-gradient-to-r from-pink-400 via-purple-400 to-blue-400 bg-clip-text text-transparent">
              experiência espacial
            </span>
          </h2>
          
          <p className="text-xl text-gray-300 mb-12 max-w-2xl mx-auto leading-relaxed">
            Junte-se a milhares de equipes que já estão navegando pela produtividade 
            com a plataforma mais inovadora do universo
          </p>
          
          <motion.div
            className="flex flex-col sm:flex-row gap-6 justify-center items-center"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            viewport={{ once: true }}
          >
            <Link href="/register">
              <motion.div
                whileHover={{ scale: 1.05, y: -5 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button
                  size="lg"
                  className="btn-cosmic text-xl px-12 py-6 rounded-2xl font-bold relative overflow-hidden group"
                >
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-pink-600 via-purple-600 to-blue-600 opacity-0 group-hover:opacity-100"
                    initial={{ x: "-100%" }}
                    whileHover={{ x: "100%" }}
                    transition={{ duration: 0.6 }}
                  />
                  <span className="relative z-10 flex items-center">
                    <Sparkles className="w-6 h-6 mr-3" />
                    Começar Gratuitamente
                    <ArrowRight className="w-6 h-6 ml-3 group-hover:translate-x-2 transition-transform" />
                  </span>
                </Button>
              </motion.div>
            </Link>
            
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button
                size="lg"
                variant="outline"
                className="glass-morphism border-white/20 text-white hover:bg-white/10 text-xl px-12 py-6 rounded-2xl font-bold backdrop-blur-xl"
              >
                Agendar Demo
              </Button>
            </motion.div>
          </motion.div>

          {/* Trust Indicators */}
          <motion.div
            className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-8 max-w-2xl mx-auto"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            viewport={{ once: true }}
          >
            {[
              { number: "50K+", label: "Usuários Ativos" },
              { number: "99.9%", label: "Uptime" },
              { number: "4.9★", label: "Avaliação" },
              { number: "24/7", label: "Suporte" }
            ].map((stat, index) => (
              <motion.div
                key={stat.label}
                className="text-center"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.7 + index * 0.1 }}
                viewport={{ once: true }}
              >
                <div className="text-2xl md:text-3xl font-bold text-white mb-2">{stat.number}</div>
                <div className="text-gray-400 text-sm">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </section>

      {/* Footer */}
      <motion.footer 
        className="relative z-10 border-t border-white/10 py-12 backdrop-blur-xl"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <div className="container mx-auto px-4 text-center">
          <motion.div 
            className="flex items-center justify-center space-x-3 mb-6"
            whileHover={{ scale: 1.05 }}
          >
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            >
              <Image src="/logo.png" alt="Orbitask" width={32} height={32} />
            </motion.div>
            <span className="text-xl font-bold text-white">
              Orbit<span className="text-purple-400">ask</span>
            </span>
          </motion.div>
          <p className="text-gray-400 mb-4">
            © 2024 Orbitask. Todos os direitos reservados na galáxia.
          </p>
          <div className="flex justify-center space-x-6 text-sm text-gray-500">
            <a href="#" className="hover:text-purple-400 transition-colors">Privacidade</a>
            <a href="#" className="hover:text-purple-400 transition-colors">Termos</a>
            <a href="#" className="hover:text-purple-400 transition-colors">Suporte</a>
          </div>
        </div>
      </motion.footer>
    </div>
  )
}
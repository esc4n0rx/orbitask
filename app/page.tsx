"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowRight, Rocket, Users, Zap, Target, Star, Globe } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { ThemeToggle } from "@/components/theme-toggle"

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 dark:from-slate-950 dark:via-purple-950 dark:to-slate-950">
      {/* Header */}
      <header className="container mx-auto px-4 py-6 flex justify-between items-center">
        <div className="flex items-center space-x-3">
          <Image src="/logo.png" alt="Orbitask" width={40} height={40} />
          <span className="text-2xl font-bold text-white">Orbitask</span>
        </div>
        <div className="flex items-center space-x-4">
          <ThemeToggle />
          <Link href="/login">
            <Button variant="ghost" className="text-white hover:text-purple-300">
              Login
            </Button>
          </Link>
          <Link href="/register">
            <Button className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700">
              Começar Agora
            </Button>
          </Link>
        </div>
      </header>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-20 text-center">
        <motion.div initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
          <Badge className="mb-6 bg-purple-600/20 text-purple-300 border-purple-500/30">
            <Star className="w-4 h-4 mr-2" />
            Sistema de Gerenciamento Espacial
          </Badge>

          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6">
            Organize seus projetos
            <br />
            <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              como um sistema orbital
            </span>
          </h1>

          <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto">
            Orbitask é a plataforma de gerenciamento de tarefas que combina a simplicidade do Trello com a potência do
            Jira, tudo em uma interface espacial moderna e intuitiva.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/register">
              <Button
                size="lg"
                className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-lg px-8"
              >
                <Rocket className="w-5 h-5 mr-2" />
                Iniciar Missão
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </Link>
            <Button
              size="lg"
              variant="outline"
              className="border-purple-500 text-purple-300 hover:bg-purple-500/10 text-lg px-8"
            >
              <Globe className="w-5 h-5 mr-2" />
              Ver Demo
            </Button>
          </div>
        </motion.div>

        {/* Floating Elements */}
        <div className="relative mt-20">
          <motion.div
            className="absolute top-10 left-10 w-4 h-4 bg-purple-500 rounded-full opacity-60"
            animate={{ y: [0, -20, 0] }}
            transition={{ duration: 4, repeat: Number.POSITIVE_INFINITY }}
          />
          <motion.div
            className="absolute top-20 right-20 w-6 h-6 bg-pink-500 rounded-full opacity-40"
            animate={{ y: [0, -30, 0] }}
            transition={{ duration: 6, repeat: Number.POSITIVE_INFINITY, delay: 1 }}
          />
          <motion.div
            className="absolute bottom-10 left-1/4 w-3 h-3 bg-cyan-500 rounded-full opacity-50"
            animate={{ y: [0, -25, 0] }}
            transition={{ duration: 5, repeat: Number.POSITIVE_INFINITY, delay: 2 }}
          />
        </div>
      </section>

      {/* Features Preview */}
      <section className="container mx-auto px-4 py-20">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold text-white mb-4">Funcionalidades que orbitam ao seu redor</h2>
          <p className="text-gray-300 text-lg max-w-2xl mx-auto">
            Cada recurso foi pensado para maximizar sua produtividade e a do seu time
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            viewport={{ once: true }}
          >
            <Card className="bg-slate-800/50 border-purple-500/30 card-hover">
              <CardContent className="p-6 text-center">
                <div className="w-16 h-16 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Target className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-white mb-2">Stations</h3>
                <p className="text-gray-300">Crie workspaces temáticos para organizar diferentes projetos e equipes</p>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <Card className="bg-slate-800/50 border-purple-500/30 card-hover">
              <CardContent className="p-6 text-center">
                <div className="w-16 h-16 bg-gradient-to-r from-cyan-600 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Zap className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-white mb-2">Drag & Drop</h3>
                <p className="text-gray-300">
                  Interface intuitiva com arrastar e soltar para reorganizar tarefas rapidamente
                </p>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            viewport={{ once: true }}
          >
            <Card className="bg-slate-800/50 border-purple-500/30 card-hover">
              <CardContent className="p-6 text-center">
                <div className="w-16 h-16 bg-gradient-to-r from-pink-600 to-red-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Users className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-white mb-2">Colaboração</h3>
                <p className="text-gray-300">
                  Trabalhe em equipe com comentários, atribuições e notificações em tempo real
                </p>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </section>

      {/* Demo Preview */}
      <section className="container mx-auto px-4 py-20">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="bg-slate-800/30 rounded-2xl p-8 border border-purple-500/20"
        >
          <div className="text-center mb-8">
            <h3 className="text-3xl font-bold text-white mb-4">Veja o Orbitask em ação</h3>
            <p className="text-gray-300">Interface moderna e intuitiva para gerenciar seus projetos</p>
          </div>

          {/* Mock Dashboard Preview */}
          <div className="bg-slate-900/50 rounded-xl p-6 border border-slate-700">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-purple-600 rounded-full"></div>
                <span className="text-white font-semibold">Marketing Station</span>
              </div>
              <div className="flex space-x-2">
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                <div className="w-3 h-3 bg-red-500 rounded-full"></div>
              </div>
            </div>

            <div className="grid md:grid-cols-3 gap-4">
              <div className="bg-slate-800/50 rounded-lg p-4">
                <h4 className="text-purple-300 font-semibold mb-3">To Do</h4>
                <div className="space-y-2">
                  <div className="bg-slate-700/50 rounded p-3 text-sm text-white">Criar campanha Q1</div>
                  <div className="bg-slate-700/50 rounded p-3 text-sm text-white">Review do website</div>
                </div>
              </div>

              <div className="bg-slate-800/50 rounded-lg p-4">
                <h4 className="text-cyan-300 font-semibold mb-3">In Progress</h4>
                <div className="space-y-2">
                  <div className="bg-slate-700/50 rounded p-3 text-sm text-white">Design do logo</div>
                </div>
              </div>

              <div className="bg-slate-800/50 rounded-lg p-4">
                <h4 className="text-green-300 font-semibold mb-3">Done</h4>
                <div className="space-y-2">
                  <div className="bg-slate-700/50 rounded p-3 text-sm text-white">Pesquisa de mercado</div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-4 py-20 text-center">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl font-bold text-white mb-6">Pronto para decolar?</h2>
          <p className="text-gray-300 text-lg mb-8 max-w-2xl mx-auto">
            Junte-se a milhares de equipes que já estão orbitando a produtividade com o Orbitask
          </p>
          <Link href="/register">
            <Button
              size="lg"
              className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-lg px-8"
            >
              <Rocket className="w-5 h-5 mr-2" />
              Começar Gratuitamente
            </Button>
          </Link>
        </motion.div>
      </section>

      {/* Footer */}
      <footer className="border-t border-slate-800 py-8">
        <div className="container mx-auto px-4 text-center">
          <div className="flex items-center justify-center space-x-3 mb-4">
            <Image src="/logo.png" alt="Orbitask" width={32} height={32} />
            <span className="text-xl font-bold text-white">Orbitask</span>
          </div>
          <p className="text-gray-400">© 2024 Orbitask. Todos os direitos reservados.</p>
        </div>
      </footer>
    </div>
  )
}

"use client"

import type React from "react"

import { useState } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Eye, EyeOff, Mail, Lock, User, ArrowLeft } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { useToast } from "@/hooks/use-toast"

export default function RegisterPage() {
  const [showPassword, setShowPassword] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  })
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()
  const { toast } = useToast()

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    if (formData.password !== formData.confirmPassword) {
      toast({
        title: "Erro no cadastro",
        description: "As senhas não coincidem",
        variant: "destructive",
      })
      setIsLoading(false)
      return
    }

    // Simulate registration
    setTimeout(() => {
      if (formData.name && formData.email && formData.password) {
        localStorage.setItem(
          "orbitask_user",
          JSON.stringify({
            email: formData.email,
            name: formData.name,
            id: "1",
          }),
        )
        toast({
          title: "Conta criada com sucesso!",
          description: "Bem-vindo ao Orbitask",
        })
        router.push("/dashboard")
      } else {
        toast({
          title: "Erro no cadastro",
          description: "Por favor, preencha todos os campos",
          variant: "destructive",
        })
      }
      setIsLoading(false)
    }, 1000)
  }

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="w-full max-w-md"
      >
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center space-x-2 text-white hover:text-purple-300 mb-6">
            <ArrowLeft className="w-4 h-4" />
            <span>Voltar</span>
          </Link>
          <div className="flex items-center justify-center space-x-3 mb-4">
            <Image src="/logo.png" alt="Orbitask" width={40} height={40} />
            <span className="text-2xl font-bold text-white">Orbitask</span>
          </div>
          <p className="text-gray-300">Crie sua estação de controle</p>
        </div>

        <Card className="bg-slate-800/50 border-purple-500/30 backdrop-blur-sm">
          <CardHeader className="text-center">
            <CardTitle className="text-white">Criar Conta</CardTitle>
            <CardDescription className="text-gray-300">Junte-se à missão de produtividade espacial</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleRegister} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name" className="text-white">
                  Nome Completo
                </Label>
                <div className="relative">
                  <User className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input
                    id="name"
                    type="text"
                    placeholder="Seu nome"
                    value={formData.name}
                    onChange={(e) => handleInputChange("name", e.target.value)}
                    className="pl-10 bg-slate-700/50 border-slate-600 text-white placeholder:text-gray-400"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="email" className="text-white">
                  Email
                </Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input
                    id="email"
                    type="email"
                    placeholder="seu@email.com"
                    value={formData.email}
                    onChange={(e) => handleInputChange("email", e.target.value)}
                    className="pl-10 bg-slate-700/50 border-slate-600 text-white placeholder:text-gray-400"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="password" className="text-white">
                  Senha
                </Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Sua senha"
                    value={formData.password}
                    onChange={(e) => handleInputChange("password", e.target.value)}
                    className="pl-10 pr-10 bg-slate-700/50 border-slate-600 text-white placeholder:text-gray-400"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-3 text-gray-400 hover:text-white"
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="confirmPassword" className="text-white">
                  Confirmar Senha
                </Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input
                    id="confirmPassword"
                    type="password"
                    placeholder="Confirme sua senha"
                    value={formData.confirmPassword}
                    onChange={(e) => handleInputChange("confirmPassword", e.target.value)}
                    className="pl-10 bg-slate-700/50 border-slate-600 text-white placeholder:text-gray-400"
                    required
                  />
                </div>
              </div>

              <Button
                type="submit"
                className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
                disabled={isLoading}
              >
                {isLoading ? "Criando conta..." : "Criar Conta"}
              </Button>
            </form>

            <div className="mt-6">
              <Separator className="bg-slate-600" />
              <div className="text-center mt-4">
                <p className="text-gray-300 text-sm">
                  Já tem uma conta?{" "}
                  <Link href="/login" className="text-purple-400 hover:text-purple-300 font-semibold">
                    Fazer login
                  </Link>
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  )
}

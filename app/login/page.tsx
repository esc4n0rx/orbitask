"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { 
  Eye, 
  EyeOff, 
  Mail, 
  Lock, 
  ArrowLeft, 
  Sparkles,
  Github,
  Chrome,
  Rocket,
  Shield,
  Fingerprint
} from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { useToast } from "@/hooks/use-toast"

// Componente de partículas para login
const LoginParticles = () => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {Array.from({ length: 30 }).map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 bg-purple-400/30 rounded-full"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
          animate={{
            y: [-20, -40, -20],
            opacity: [0.3, 0.8, 0.3],
            scale: [1, 1.5, 1],
          }}
          transition={{
            duration: 3 + Math.random() * 2,
            repeat: Infinity,
            delay: Math.random() * 2,
          }}
        />
      ))}
    </div>
  )
}

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false)
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [socialLoading, setSocialLoading] = useState<string | null>(null)
  const router = useRouter()
  const { toast } = useToast()

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    // Simulate login
    setTimeout(() => {
      if (email && password) {
        localStorage.setItem(
          "orbitask_user",
          JSON.stringify({
            email,
            name: "Astronauta Demo",
            id: "1",
          }),
        )
        toast({
          title: "🚀 Login realizado com sucesso!",
          description: "Bem-vindo de volta à sua estação espacial",
        })
        router.push("/dashboard")
      } else {
        toast({
          title: "❌ Erro no login",
          description: "Por favor, preencha todos os campos",
          variant: "destructive",
        })
      }
      setIsLoading(false)
    }, 1500)
  }

  const handleSocialLogin = async (provider: string) => {
    setSocialLoading(provider)
    
    // Simulate social login
    setTimeout(() => {
      localStorage.setItem(
        "orbitask_user",
        JSON.stringify({
          email: `user@${provider}.com`,
          name: `Usuário ${provider}`,
          id: "1",
        }),
      )
      toast({
        title: `🚀 Login com ${provider} realizado!`,
        description: "Redirecionando para sua estação...",
      })
      router.push("/dashboard")
      setSocialLoading(null)
    }, 2000)
  }

  return (
    <div className="min-h-screen space-background flex items-center justify-center p-4 relative overflow-hidden">
      {/* Background Effects */}
      <div className="aurora-bg" />
      <LoginParticles />
      
      {/* Floating Orbs */}
      <motion.div
        className="absolute top-1/4 left-1/4 w-64 h-64 bg-purple-500/20 rounded-full blur-3xl"
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.6, 0.3],
        }}
        transition={{ duration: 4, repeat: Infinity }}
      />
      <motion.div
        className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-pink-500/20 rounded-full blur-3xl"
        animate={{
          scale: [1.2, 1, 1.2],
          opacity: [0.4, 0.7, 0.4],
        }}
        transition={{ duration: 5, repeat: Infinity }}
      />

      <motion.div
        initial={{ opacity: 0, y: 50, rotateX: 10 }}
        animate={{ opacity: 1, y: 0, rotateX: 0 }}
        transition={{ duration: 0.8 }}
        className="w-full max-w-md relative z-10"
      >
        {/* Back Button */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-center mb-8"
        >
          <Link 
            href="/" 
            className="inline-flex items-center space-x-2 text-white/80 hover:text-white transition-colors group"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            <span>Voltar ao espaço</span>
          </Link>
        </motion.div>

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="text-center mb-8"
        >
          <motion.div 
            className="flex items-center justify-center space-x-3 mb-6"
            whileHover={{ scale: 1.05 }}
          >
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            >
              <Image src="/logo.png" alt="Orbitask" width={48} height={48} />
            </motion.div>
            <span className="text-3xl font-bold text-white">
              Orbit<span className="text-purple-400">ask</span>
           </span>
         </motion.div>
         <motion.div
           initial={{ opacity: 0 }}
           animate={{ opacity: 1 }}
           transition={{ duration: 0.6, delay: 0.5 }}
         >
           <h1 className="text-2xl font-bold text-white mb-2">Bem-vindo de volta!</h1>
           <p className="text-gray-300">Entre na sua estação de controle</p>
         </motion.div>
       </motion.div>

       {/* Login Form */}
       <motion.div
         initial={{ opacity: 0, scale: 0.95 }}
         animate={{ opacity: 1, scale: 1 }}
         transition={{ duration: 0.6, delay: 0.4 }}
         className="form-glass p-8 cosmic-hover"
       >
         {/* Social Login Buttons */}
         <div className="space-y-4 mb-6">
           <motion.div
             whileHover={{ scale: 1.02, y: -2 }}
             whileTap={{ scale: 0.98 }}
           >
             <Button
               onClick={() => handleSocialLogin('Google')}
               disabled={socialLoading !== null}
               className="social-btn social-btn-google w-full py-6 rounded-xl font-semibold relative overflow-hidden group"
             >
               <AnimatePresence>
                 {socialLoading === 'Google' ? (
                   <motion.div
                     initial={{ opacity: 0 }}
                     animate={{ opacity: 1 }}
                     exit={{ opacity: 0 }}
                     className="flex items-center"
                   >
                     <motion.div
                       animate={{ rotate: 360 }}
                       transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                       className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full mr-3"
                     />
                     Conectando...
                   </motion.div>
                 ) : (
                   <motion.div
                     initial={{ opacity: 0 }}
                     animate={{ opacity: 1 }}
                     className="flex items-center"
                   >
                     <Chrome className="w-5 h-5 mr-3" />
                     Continuar com Google
                   </motion.div>
                 )}
               </AnimatePresence>
             </Button>
           </motion.div>

           <motion.div
             whileHover={{ scale: 1.02, y: -2 }}
             whileTap={{ scale: 0.98 }}
           >
             <Button
               onClick={() => handleSocialLogin('GitHub')}
               disabled={socialLoading !== null}
               className="social-btn social-btn-github w-full py-6 rounded-xl font-semibold relative overflow-hidden group"
             >
               <AnimatePresence>
                 {socialLoading === 'GitHub' ? (
                   <motion.div
                     initial={{ opacity: 0 }}
                     animate={{ opacity: 1 }}
                     exit={{ opacity: 0 }}
                     className="flex items-center"
                   >
                     <motion.div
                       animate={{ rotate: 360 }}
                       transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                       className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full mr-3"
                     />
                     Conectando...
                   </motion.div>
                 ) : (
                   <motion.div
                     initial={{ opacity: 0 }}
                     animate={{ opacity: 1 }}
                     className="flex items-center"
                   >
                     <Github className="w-5 h-5 mr-3" />
                     Continuar com GitHub
                   </motion.div>
                 )}
               </AnimatePresence>
             </Button>
           </motion.div>
         </div>

         {/* Divider */}
         <div className="relative my-8">
           <Separator className="bg-white/10" />
           <div className="absolute inset-0 flex items-center justify-center">
             <span className="glass-morphism px-4 py-2 text-sm text-gray-400 rounded-full">
               ou continue com email
             </span>
           </div>
         </div>

         {/* Email/Password Form */}
         <form onSubmit={handleLogin} className="space-y-6">
           <motion.div
             initial={{ opacity: 0, x: -20 }}
             animate={{ opacity: 1, x: 0 }}
             transition={{ duration: 0.6, delay: 0.6 }}
             className="space-y-2"
           >
             <Label htmlFor="email" className="text-white font-medium flex items-center">
               <Mail className="w-4 h-4 mr-2 text-purple-400" />
               Email
             </Label>
             <div className="relative group">
               <Input
                 id="email"
                 type="email"
                 placeholder="astronauta@orbitask.com"
                 value={email}
                 onChange={(e) => setEmail(e.target.value)}
                 className="input-glass text-white placeholder:text-gray-400 rounded-xl py-6 pl-4 pr-4 border-0 text-lg"
                 required
               />
               <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-purple-500/20 via-pink-500/20 to-blue-500/20 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
             </div>
           </motion.div>

           <motion.div
             initial={{ opacity: 0, x: -20 }}
             animate={{ opacity: 1, x: 0 }}
             transition={{ duration: 0.6, delay: 0.7 }}
             className="space-y-2"
           >
             <Label htmlFor="password" className="text-white font-medium flex items-center">
               <Lock className="w-4 h-4 mr-2 text-purple-400" />
               Senha
             </Label>
             <div className="relative group">
               <Input
                 id="password"
                 type={showPassword ? "text" : "password"}
                 placeholder="••••••••••"
                 value={password}
                 onChange={(e) => setPassword(e.target.value)}
                 className="input-glass text-white placeholder:text-gray-400 rounded-xl py-6 pl-4 pr-12 border-0 text-lg"
                 required
               />
               <motion.button
                 type="button"
                 onClick={() => setShowPassword(!showPassword)}
                 className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white transition-colors"
                 whileHover={{ scale: 1.1 }}
                 whileTap={{ scale: 0.9 }}
               >
                 {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
               </motion.button>
               <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-purple-500/20 via-pink-500/20 to-blue-500/20 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
             </div>
           </motion.div>

           {/* Forgot Password */}
           <motion.div
             initial={{ opacity: 0 }}
             animate={{ opacity: 1 }}
             transition={{ duration: 0.6, delay: 0.8 }}
             className="text-right"
           >
             <Link 
               href="#" 
               className="text-sm text-purple-400 hover:text-purple-300 transition-colors"
             >
               Esqueceu a senha?
             </Link>
           </motion.div>

           {/* Submit Button */}
           <motion.div
             initial={{ opacity: 0, y: 20 }}
             animate={{ opacity: 1, y: 0 }}
             transition={{ duration: 0.6, delay: 0.9 }}
           >
             <motion.div
               whileHover={{ scale: 1.02, y: -2 }}
               whileTap={{ scale: 0.98 }}
             >
               <Button
                 type="submit"
                 className="btn-cosmic w-full py-6 rounded-xl font-bold text-lg relative overflow-hidden group"
                 disabled={isLoading}
               >
                 <AnimatePresence mode="wait">
                   {isLoading ? (
                     <motion.div
                       key="loading"
                       initial={{ opacity: 0 }}
                       animate={{ opacity: 1 }}
                       exit={{ opacity: 0 }}
                       className="flex items-center"
                     >
                       <motion.div
                         animate={{ rotate: 360 }}
                         transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                         className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full mr-3"
                       />
                       Entrando na estação...
                     </motion.div>
                   ) : (
                     <motion.div
                       key="default"
                       initial={{ opacity: 0 }}
                       animate={{ opacity: 1 }}
                       className="flex items-center justify-center"
                     >
                       <Rocket className="w-5 h-5 mr-3 group-hover:animate-pulse" />
                       Entrar na Estação
                       <Sparkles className="w-5 h-5 ml-3 group-hover:rotate-12 transition-transform" />
                     </motion.div>
                   )}
                 </AnimatePresence>
               </Button>
             </motion.div>
           </motion.div>
         </form>

         {/* Security Badge */}
         <motion.div
           initial={{ opacity: 0 }}
           animate={{ opacity: 1 }}
           transition={{ duration: 0.6, delay: 1 }}
           className="mt-6 flex items-center justify-center space-x-2 text-sm text-gray-400"
         >
           <Shield className="w-4 h-4 text-green-400" />
           <span>Conexão segura protegida por criptografia quântica</span>
         </motion.div>

         {/* Register Link */}
         <motion.div
           initial={{ opacity: 0 }}
           animate={{ opacity: 1 }}
           transition={{ duration: 0.6, delay: 1.1 }}
           className="mt-8 text-center"
         >
           <p className="text-gray-300 text-sm">
             Novo na galáxia?{" "}
             <Link 
               href="/register" 
               className="text-purple-400 hover:text-purple-300 font-semibold transition-colors group"
             >
               Criar conta
               <motion.span
                 className="inline-block ml-1"
                 whileHover={{ x: 5 }}
               >
                 →
               </motion.span>
             </Link>
           </p>
         </motion.div>
       </motion.div>

       {/* Biometric Option (Future Feature) */}
       <motion.div
         initial={{ opacity: 0, y: 20 }}
         animate={{ opacity: 1, y: 0 }}
         transition={{ duration: 0.6, delay: 1.2 }}
         className="mt-8 text-center"
       >
         <motion.button
           className="glass-morphism p-4 rounded-full group hover:bg-white/5 transition-all duration-300"
           whileHover={{ scale: 1.1, y: -2 }}
           whileTap={{ scale: 0.9 }}
         >
           <Fingerprint className="w-6 h-6 text-purple-400 group-hover:text-purple-300" />
         </motion.button>
         <p className="text-xs text-gray-500 mt-2">Login biométrico (em breve)</p>
       </motion.div>
     </motion.div>

     {/* Shooting Stars Effect */}
     <div className="absolute inset-0 overflow-hidden pointer-events-none">
       {Array.from({ length: 5 }).map((_, i) => (
         <motion.div
           key={i}
           className="absolute w-1 h-20 bg-gradient-to-b from-white via-purple-400 to-transparent"
           style={{
             left: `${Math.random() * 100}%`,
             top: `${Math.random() * 100}%`,
             rotate: `${Math.random() * 360}deg`,
           }}
           animate={{
             x: [0, 200],
             y: [0, 200],
             opacity: [0, 1, 0],
           }}
           transition={{
             duration: 2,
             repeat: Infinity,
             delay: i * 3 + Math.random() * 2,
             ease: "easeOut",
           }}
         />
       ))}
     </div>
   </div>
 )
}
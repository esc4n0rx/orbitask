"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { Checkbox } from "@/components/ui/checkbox"
import { 
  Eye, 
  EyeOff, 
  Mail, 
  Lock, 
  User, 
  ArrowLeft, 
  Sparkles,
  Github,
  Chrome,
  Rocket,
  Shield,
  CheckCircle,
  XCircle,
  Zap
} from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { useToast } from "@/hooks/use-toast"

// Componente de verificação de força da senha
const PasswordStrength = ({ password }: { password: string }) => {
  const checks = [
    { label: "8+ caracteres", valid: password.length >= 8 },
    { label: "Letra maiúscula", valid: /[A-Z]/.test(password) },
    { label: "Letra minúscula", valid: /[a-z]/.test(password) },
    { label: "Número", valid: /\d/.test(password) },
    { label: "Símbolo", valid: /[!@#$%^&*(),.?":{}|<>]/.test(password) },
  ]

  const strength = checks.filter(check => check.valid).length
  const strengthColor = strength < 2 ? 'red' : strength < 4 ? 'yellow' : 'green'
  const strengthText = strength < 2 ? 'Fraca' : strength < 4 ? 'Média' : 'Forte'

  if (!password) return null

  return (
    <motion.div
      initial={{ opacity: 0, height: 0 }}
      animate={{ opacity: 1, height: 'auto' }}
      exit={{ opacity: 0, height: 0 }}
      className="mt-3 glass-morphism p-4 rounded-xl"
    >
      <div className="flex items-center justify-between mb-3">
        <span className="text-sm text-gray-300">Força da senha:</span>
        <span className={`text-sm font-semibold text-${strengthColor}-400`}>
          {strengthText}
        </span>
      </div>
      
      <div className="flex space-x-1 mb-3">
        {Array.from({ length: 5 }).map((_, i) => (
          <motion.div
            key={i}
            className={`h-1 flex-1 rounded-full ${
              i < strength ? `bg-${strengthColor}-400` : 'bg-gray-600'
            }`}
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: i * 0.1 }}
          />
        ))}
      </div>

      <div className="space-y-2">
        {checks.map((check, index) => (
          <motion.div
            key={check.label}
            className="flex items-center space-x-2"
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            {check.valid ? (
              <CheckCircle className="w-4 h-4 text-green-400" />
            ) : (
              <XCircle className="w-4 h-4 text-gray-500" />
            )}
            <span className={`text-xs ${check.valid ? 'text-green-400' : 'text-gray-500'}`}>
              {check.label}
            </span>
          </motion.div>
        ))}
      </div>
    </motion.div>
  )
}

export default function RegisterPage() {
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  })
  const [acceptTerms, setAcceptTerms] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [socialLoading, setSocialLoading] = useState<string | null>(null)
  const [step, setStep] = useState(1) // Multi-step form
  const router = useRouter()
  const { toast } = useToast()

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!acceptTerms) {
      toast({
        title: "⚠️ Termos não aceitos",
        description: "Você precisa aceitar os termos para continuar",
        variant: "destructive",
      })
      return
    }

    if (formData.password !== formData.confirmPassword) {
      toast({
        title: "❌ Senhas não coincidem",
        description: "As senhas digitadas são diferentes",
        variant: "destructive",
      })
      return
    }

    setIsLoading(true)

    // Simulate registration with steps
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
          title: "🚀 Conta criada com sucesso!",
          description: "Bem-vindo à constelação Orbitask",
        })
        router.push("/dashboard")
      } else {
        toast({
          title: "❌ Erro no cadastro",
          description: "Por favor, preencha todos os campos",
          variant: "destructive",
        })
      }
      setIsLoading(false)
    }, 2000)
  }

  const handleSocialRegister = async (provider: string) => {
    setSocialLoading(provider)
    
    setTimeout(() => {
      localStorage.setItem(
        "orbitask_user",
        JSON.stringify({
          email: `user@${provider}.com`,
          name: `Astronauta ${provider}`,
          id: "1",
        }),
      )
      toast({
        title: `🚀 Conta criada com ${provider}!`,
        description: "Iniciando jornada espacial...",
      })
      router.push("/dashboard")
      setSocialLoading(null)
    }, 2000)
  }

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const nextStep = () => {
    if (step === 1 && (!formData.name || !formData.email)) {
      toast({
        title: "⚠️ Campos obrigatórios",
        description: "Preencha nome e email para continuar",
        variant: "destructive",
      })
      return
    }
    setStep(2)
  }

  return (
    <div className="min-h-screen space-background flex items-center justify-center p-4 relative overflow-hidden">
      {/* Background Effects */}
      <div className="aurora-bg" />
      
      {/* Animated Background Orbs */}
      <motion.div
        className="absolute top-1/3 left-1/5 w-72 h-72 bg-purple-500/20 rounded-full blur-3xl"
        animate={{
          scale: [1, 1.3, 1],
          opacity: [0.2, 0.5, 0.2],
          x: [0, 50, 0],
        }}
        transition={{ duration: 6, repeat: Infinity }}
      />
      <motion.div
        className="absolute bottom-1/3 right-1/5 w-72 h-72 bg-pink-500/20 rounded-full blur-3xl"
        animate={{
          scale: [1.3, 1, 1.3],
          opacity: [0.3, 0.6, 0.3],
          y: [0, -50, 0],
        }}
        transition={{ duration: 7, repeat: Infinity }}
      />

      <motion.div
        initial={{ opacity: 0, y: 50, rotateX: 15 }}
        animate={{ opacity: 1, y: 0, rotateX: 0 }}
        transition={{ duration: 1 }}
        className="w-full max-w-lg relative z-10"
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
            <span>Voltar ao universo</span>
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
            <h1 className="text-2xl font-bold text-white mb-2">
              Junte-se à Constelação
            </h1>
            <p className="text-gray-300">
              Crie sua estação de controle pessoal
            </p>
          </motion.div>

          {/* Progress Steps */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="flex justify-center space-x-4 mt-6"
          >
            {[1, 2].map((num) => (
              <div
                key={num}
                className={`flex items-center ${num < 2 ? 'space-x-2' : ''}`}
              >
                <motion.div
                  className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold transition-all duration-300 ${
                    step >= num 
                      ? 'bg-purple-500 text-white' 
                      : 'bg-gray-700 text-gray-400'
                  }`}
                  animate={step >= num ? { scale: [1, 1.1, 1] } : {}}
                  transition={{ duration: 0.3 }}
                >
                  {step > num ? <CheckCircle className="w-4 h-4" /> : num}
                </motion.div>
                {num < 2 && (
                  <motion.div
                    className={`w-8 h-0.5 transition-colors duration-300 ${
                      step > num ? 'bg-purple-500' : 'bg-gray-700'
                    }`}
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: step > num ? 1 : 0 }}
                    transition={{ duration: 0.5 }}
                  />
                )}
              </div>
            ))}
          </motion.div>
        </motion.div>

        {/* Registration Form */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="form-glass p-8 cosmic-hover"
        >
          <AnimatePresence mode="wait">
            {step === 1 ? (
              <motion.div
                key="step1"
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                className="space-y-6"
              >
                {/* Social Registration */}
                <div className="space-y-4">
                  <motion.div
                    whileHover={{ scale: 1.02, y: -2 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Button
                      onClick={() => handleSocialRegister('Google')}
                      disabled={socialLoading !== null}
                      className="social-btn social-btn-google w-full py-6 rounded-xl font-semibold"
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
                            Criando conta...
                          </motion.div>
                        ) : (
                          <motion.div className="flex items-center">
                            <Chrome className="w-5 h-5 mr-3" />
                            Criar conta com Google
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
                      onClick={() => handleSocialRegister('GitHub')}
                      disabled={socialLoading !== null}
                      className="social-btn social-btn-github w-full py-6 rounded-xl font-semibold"
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
                            Criando conta...
                          </motion.div>
                        ) : (
                          <motion.div className="flex items-center">
                            <Github className="w-5 h-5 mr-3" />
                            Criar conta com GitHub
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
                      ou crie com email
                    </span>
                  </div>
                </div>

                {/* Step 1 Fields */}
                <div className="space-y-6">
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, delay: 0.6 }}
                  >
                    <Label htmlFor="name" className="text-white font-medium flex items-center">
                      <User className="w-4 h-4 mr-2 text-purple-400" />
                      Nome Completo
                    </Label>
                    <div className="relative group mt-2">
                      <Input
                        id="name"
                        type="text"
                        placeholder="Seu nome de astronauta"
                        value={formData.name}
                        onChange={(e) => handleInputChange("name", e.target.value)}
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
                 >
                   <Label htmlFor="email" className="text-white font-medium flex items-center">
                     <Mail className="w-4 h-4 mr-2 text-purple-400" />
                     Email
                   </Label>
                   <div className="relative group mt-2">
                     <Input
                       id="email"
                       type="email"
                       placeholder="astronauta@galáxia.com"
                       value={formData.email}
                       onChange={(e) => handleInputChange("email", e.target.value)}
                       className="input-glass text-white placeholder:text-gray-400 rounded-xl py-6 pl-4 pr-4 border-0 text-lg"
                       required
                     />
                     <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-purple-500/20 via-pink-500/20 to-blue-500/20 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
                   </div>
                 </motion.div>

                 <motion.div
                   initial={{ opacity: 0, y: 20 }}
                   animate={{ opacity: 1, y: 0 }}
                   transition={{ duration: 0.6, delay: 0.8 }}
                 >
                   <motion.div
                     whileHover={{ scale: 1.02, y: -2 }}
                     whileTap={{ scale: 0.98 }}
                   >
                     <Button
                       onClick={nextStep}
                       className="btn-cosmic w-full py-6 rounded-xl font-bold text-lg group"
                     >
                       <Zap className="w-5 h-5 mr-3 group-hover:animate-pulse" />
                       Continuar Jornada
                       <motion.div
                         className="ml-3"
                         animate={{ x: [0, 5, 0] }}
                         transition={{ duration: 1.5, repeat: Infinity }}
                       >
                         →
                       </motion.div>
                     </Button>
                   </motion.div>
                 </motion.div>
               </div>
             </motion.div>
           ) : (
             <motion.div
               key="step2"
               initial={{ opacity: 0, x: 50 }}
               animate={{ opacity: 1, x: 0 }}
               exit={{ opacity: 0, x: -50 }}
             >
               <form onSubmit={handleRegister} className="space-y-6">
                 {/* Password Field */}
                 <motion.div
                   initial={{ opacity: 0, x: -20 }}
                   animate={{ opacity: 1, x: 0 }}
                   transition={{ duration: 0.6, delay: 0.2 }}
                 >
                   <Label htmlFor="password" className="text-white font-medium flex items-center">
                     <Lock className="w-4 h-4 mr-2 text-purple-400" />
                     Senha
                   </Label>
                   <div className="relative group mt-2">
                     <Input
                       id="password"
                       type={showPassword ? "text" : "password"}
                       placeholder="••••••••••"
                       value={formData.password}
                       onChange={(e) => handleInputChange("password", e.target.value)}
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
                   
                   <AnimatePresence>
                     {formData.password && (
                       <PasswordStrength password={formData.password} />
                     )}
                   </AnimatePresence>
                 </motion.div>

                 {/* Confirm Password Field */}
                 <motion.div
                   initial={{ opacity: 0, x: -20 }}
                   animate={{ opacity: 1, x: 0 }}
                   transition={{ duration: 0.6, delay: 0.3 }}
                 >
                   <Label htmlFor="confirmPassword" className="text-white font-medium flex items-center">
                     <Lock className="w-4 h-4 mr-2 text-purple-400" />
                     Confirmar Senha
                   </Label>
                   <div className="relative group mt-2">
                     <Input
                       id="confirmPassword"
                       type={showConfirmPassword ? "text" : "password"}
                       placeholder="••••••••••"
                       value={formData.confirmPassword}
                       onChange={(e) => handleInputChange("confirmPassword", e.target.value)}
                       className="input-glass text-white placeholder:text-gray-400 rounded-xl py-6 pl-4 pr-12 border-0 text-lg"
                       required
                     />
                     <motion.button
                       type="button"
                       onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                       className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white transition-colors"
                       whileHover={{ scale: 1.1 }}
                       whileTap={{ scale: 0.9 }}
                     >
                       {showConfirmPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                     </motion.button>
                     <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-purple-500/20 via-pink-500/20 to-blue-500/20 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
                     
                     {/* Password Match Indicator */}
                     {formData.confirmPassword && (
                       <motion.div
                         initial={{ opacity: 0, scale: 0 }}
                         animate={{ opacity: 1, scale: 1 }}
                         className="absolute right-12 top-1/2 transform -translate-y-1/2"
                       >
                         {formData.password === formData.confirmPassword ? (
                           <CheckCircle className="w-5 h-5 text-green-400" />
                         ) : (
                           <XCircle className="w-5 h-5 text-red-400" />
                         )}
                       </motion.div>
                     )}
                   </div>
                 </motion.div>

                 {/* Terms and Conditions */}
                 <motion.div
                   initial={{ opacity: 0, y: 20 }}
                   animate={{ opacity: 1, y: 0 }}
                   transition={{ duration: 0.6, delay: 0.4 }}
                   className="glass-morphism p-4 rounded-xl"
                 >
                   <div className="flex items-start space-x-3">
                     <Checkbox
                       id="terms"
                       checked={acceptTerms}
                       onCheckedChange={(checked) => setAcceptTerms(checked as boolean)}
                       className="mt-1 border-purple-400 data-[state=checked]:bg-purple-500"
                     />
                     <Label
                       htmlFor="terms"
                       className="text-sm text-gray-300 leading-relaxed cursor-pointer"
                     >
                       Aceito os{" "}
                       <Link href="#" className="text-purple-400 hover:text-purple-300 transition-colors">
                         Termos de Uso
                       </Link>{" "}
                       e{" "}
                       <Link href="#" className="text-purple-400 hover:text-purple-300 transition-colors">
                         Política de Privacidade
                       </Link>{" "}
                       da constelação Orbitask
                     </Label>
                   </div>
                 </motion.div>

                 {/* Navigation Buttons */}
                 <motion.div
                   initial={{ opacity: 0, y: 20 }}
                   animate={{ opacity: 1, y: 0 }}
                   transition={{ duration: 0.6, delay: 0.5 }}
                   className="flex space-x-4"
                 >
                   <motion.div
                     whileHover={{ scale: 1.02, y: -2 }}
                     whileTap={{ scale: 0.98 }}
                     className="flex-1"
                   >
                     <Button
                       type="button"
                       onClick={() => setStep(1)}
                       variant="outline"
                       className="glass-morphism border-white/20 text-white hover:bg-white/10 w-full py-6 rounded-xl font-semibold"
                     >
                       <ArrowLeft className="w-5 h-5 mr-2" />
                       Voltar
                     </Button>
                   </motion.div>

                   <motion.div
                     whileHover={{ scale: 1.02, y: -2 }}
                     whileTap={{ scale: 0.98 }}
                     className="flex-2"
                   >
                     <Button
                       type="submit"
                       className="btn-cosmic w-full py-6 rounded-xl font-bold text-lg relative overflow-hidden group"
                       disabled={isLoading || !acceptTerms}
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
                             Criando sua estação...
                           </motion.div>
                         ) : (
                           <motion.div
                             key="default"
                             initial={{ opacity: 0 }}
                             animate={{ opacity: 1 }}
                             className="flex items-center justify-center"
                           >
                             <Rocket className="w-5 h-5 mr-3 group-hover:animate-pulse" />
                             Criar Estação
                             <Sparkles className="w-5 h-5 ml-3 group-hover:rotate-12 transition-transform" />
                           </motion.div>
                         )}
                       </AnimatePresence>
                     </Button>
                   </motion.div>
                 </motion.div>
               </form>
             </motion.div>
           )}
         </AnimatePresence>

         {/* Security Badge */}
         <motion.div
           initial={{ opacity: 0 }}
           animate={{ opacity: 1 }}
           transition={{ duration: 0.6, delay: 1 }}
           className="mt-6 flex items-center justify-center space-x-2 text-sm text-gray-400"
         >
           <Shield className="w-4 h-4 text-green-400" />
           <span>Dados protegidos por criptografia intergaláctica</span>
         </motion.div>

         {/* Login Link */}
         <motion.div
           initial={{ opacity: 0 }}
           animate={{ opacity: 1 }}
           transition={{ duration: 0.6, delay: 1.1 }}
           className="mt-8 text-center"
         >
           <p className="text-gray-300 text-sm">
             Já tem uma estação?{" "}
             <Link 
               href="/login" 
               className="text-purple-400 hover:text-purple-300 font-semibold transition-colors group"
             >
               Fazer login
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

       {/* Features Preview */}
       <motion.div
         initial={{ opacity: 0, y: 20 }}
         animate={{ opacity: 1, y: 0 }}
         transition={{ duration: 0.6, delay: 1.2 }}
         className="mt-12 grid grid-cols-3 gap-4 text-center"
       >
         {[
           { icon: Shield, text: "Seguro", color: "green" },
           { icon: Zap, text: "Rápido", color: "yellow" },
           { icon: Sparkles, text: "Intuitivo", color: "purple" }
         ].map((feature, index) => (
           <motion.div
             key={feature.text}
             className="glass-morphism p-4 rounded-xl cosmic-hover"
             initial={{ opacity: 0, y: 20 }}
             animate={{ opacity: 1, y: 0 }}
             transition={{ duration: 0.6, delay: 1.3 + index * 0.1 }}
             whileHover={{ scale: 1.05, y: -5 }}
           >
             <feature.icon className={`w-6 h-6 text-${feature.color}-400 mx-auto mb-2`} />
             <p className="text-white text-sm font-medium">{feature.text}</p>
           </motion.div>
         ))}
       </motion.div>
     </motion.div>

     {/* Background Elements */}
     <div className="absolute inset-0 overflow-hidden pointer-events-none">
       {/* Floating Cosmic Elements */}
       {Array.from({ length: 15 }).map((_, i) => (
         <motion.div
           key={i}
           className="absolute w-2 h-2 bg-purple-400/20 rounded-full"
           style={{
             left: `${Math.random() * 100}%`,
             top: `${Math.random() * 100}%`,
           }}
           animate={{
             y: [-10, -30, -10],
             opacity: [0.2, 0.8, 0.2],
             scale: [1, 1.5, 1],
           }}
           transition={{
             duration: 4 + Math.random() * 2,
             repeat: Infinity,
             delay: Math.random() * 2,
           }}
         />
       ))}

       {/* Constellation Lines */}
       <svg className="absolute inset-0 w-full h-full opacity-10">
         <defs>
           <linearGradient id="constellation" x1="0%" y1="0%" x2="100%" y2="100%">
             <stop offset="0%" stopColor="#8B5CF6" />
             <stop offset="50%" stopColor="#EC4899" />
             <stop offset="100%" stopColor="#3B82F6" />
           </linearGradient>
         </defs>
         {Array.from({ length: 8 }).map((_, i) => (
           <motion.line
             key={i}
             x1={`${Math.random() * 100}%`}
             y1={`${Math.random() * 100}%`}
             x2={`${Math.random() * 100}%`}
             y2={`${Math.random() * 100}%`}
             stroke="url(#constellation)"
             strokeWidth="1"
             initial={{ pathLength: 0, opacity: 0 }}
             animate={{ pathLength: 1, opacity: 0.3 }}
             transition={{
               duration: 3,
               delay: i * 0.5,
               repeat: Infinity,
               repeatType: "reverse",
             }}
           />
         ))}
       </svg>
     </div>
   </div>
 )
}
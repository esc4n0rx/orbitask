"use client"

import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { SidebarTrigger } from "@/components/ui/sidebar"
import { ThemeToggle } from "@/components/theme-toggle"
import { Bell, Search } from "lucide-react"
import { Input } from "@/components/ui/input"

interface DashboardHeaderProps {
  user: {
    name: string
    email: string
  }
}

export function DashboardHeader({ user }: DashboardHeaderProps) {
  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
  }

  return (
    <header className="border-b border-slate-800 bg-slate-900/80 backdrop-blur-sm relative z-20">
      <div className="flex items-center justify-between px-6 py-4">
        <div className="flex items-center space-x-4">
          <SidebarTrigger />
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <Input
              placeholder="Buscar tarefas, projetos..."
              className="pl-10 w-64 bg-slate-800/50 border-slate-700 text-white placeholder:text-gray-400 backdrop-blur-sm"
            />
          </div>
        </div>

        <div className="flex items-center space-x-4">
          <Button variant="ghost" size="icon" className="text-gray-400 hover:text-white">
            <Bell className="w-5 h-5" />
          </Button>
          <ThemeToggle />
          <div className="flex items-center space-x-3">
            <div className="text-right">
              <p className="text-sm font-medium text-white">{user.name}</p>
              <p className="text-xs text-gray-400">{user.email}</p>
            </div>
            <Avatar>
              <AvatarFallback className="bg-gradient-to-r from-purple-600 to-pink-600 text-white">
                {getInitials(user.name)}
              </AvatarFallback>
            </Avatar>
          </div>
        </div>
      </div>
    </header>
  )
}

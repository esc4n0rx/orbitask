"use client"

import { useState, useEffect } from "react"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@/components/ui/sidebar"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Home, Target, Settings, Plus, LogOut } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { useRouter } from "next/navigation"

export function AppSidebar() {
  const router = useRouter()
  const [stations, setStations] = useState([
    {
      id: "1",
      name: "Marketing Station",
      color: "bg-purple-600",
      boards: 3,
    },
    {
      id: "2",
      name: "Development Station",
      color: "bg-cyan-600",
      boards: 2,
    },
  ])

  // Adicionar useEffect para sincronizar com localStorage
  useEffect(() => {
    const savedStations = localStorage.getItem("orbitask_stations")
    if (savedStations) {
      setStations(JSON.parse(savedStations))
    }
  }, [])

  const handleLogout = () => {
    localStorage.removeItem("orbitask_user")
    router.push("/")
  }

  return (
    <Sidebar className="border-r border-slate-800 bg-slate-900/95 backdrop-blur-sm">
      <SidebarHeader className="border-b border-slate-800 p-4 bg-slate-900/50">
        <div className="flex items-center space-x-3">
          <Image src="/logo.png" alt="Orbitask" width={32} height={32} />
          <span className="text-xl font-bold text-white">Orbitask</span>
        </div>
      </SidebarHeader>

      <SidebarContent className="p-4 bg-slate-900/50">
        <SidebarGroup>
          <SidebarGroupLabel className="text-gray-400 text-xs uppercase tracking-wider mb-3">
            Navegação
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <Link
                    href="/dashboard"
                    className="sidebar-item flex items-center space-x-3 text-gray-300 hover:text-white hover:bg-slate-800/50 rounded-lg p-2 transition-colors"
                  >
                    <Home className="w-5 h-5" />
                    <span>Dashboard</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <Link
                    href="/dashboard/stations"
                    className="sidebar-item flex items-center space-x-3 text-gray-300 hover:text-white hover:bg-slate-800/50 rounded-lg p-2 transition-colors"
                  >
                    <Target className="w-5 h-5" />
                    <span>Todas as Stations</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupLabel className="text-gray-400 text-xs uppercase tracking-wider mb-3 flex items-center justify-between">
            Suas Stations
            <Button variant="ghost" size="sm" className="h-6 w-6 p-0 text-gray-400 hover:text-white">
              <Plus className="w-4 h-4" />
            </Button>
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {stations.map((station) => (
                <SidebarMenuItem key={station.id}>
                  <SidebarMenuButton asChild>
                    <Link
                      href={`/dashboard/station/${station.id}`}
                      className="sidebar-item flex items-center space-x-3 text-gray-300 hover:text-white hover:bg-slate-800/50 rounded-lg p-2 transition-colors"
                    >
                      <div className={`w-4 h-4 rounded-full ${station.color}`}></div>
                      <span className="flex-1 truncate">{station.name}</span>
                      <Badge variant="secondary" className="bg-slate-700/50 text-gray-400 text-xs">
                        {station.boards}
                      </Badge>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="border-t border-slate-800 p-4 bg-slate-900/50">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton asChild>
              <Link
                href="/dashboard/settings"
                className="sidebar-item flex items-center space-x-3 text-gray-300 hover:text-white hover:bg-slate-800/50 rounded-lg p-2 transition-colors"
              >
                <Settings className="w-5 h-5" />
                <span>Configurações</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton
              onClick={handleLogout}
              className="sidebar-item flex items-center space-x-3 text-gray-300 hover:text-red-400 hover:bg-red-500/10 rounded-lg p-2 transition-colors cursor-pointer"
            >
              <LogOut className="w-5 h-5" />
              <span>Sair</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>

      <SidebarRail />
    </Sidebar>
  )
}

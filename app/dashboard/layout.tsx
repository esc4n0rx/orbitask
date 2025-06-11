"use client"

import type React from "react"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { SidebarProvider } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/app-sidebar"
import { DashboardHeader } from "@/components/dashboard-header"

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const [user, setUser] = useState(null)
  const router = useRouter()

  useEffect(() => {
    const userData = localStorage.getItem("orbitask_user")
    if (!userData) {
      router.push("/login")
    } else {
      setUser(JSON.parse(userData))
    }
  }, [router])

  if (!user) {
    return (
      <div className="min-h-screen space-background flex items-center justify-center">
        <div className="text-white">Carregando...</div>
      </div>
    )
  }

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full space-background">
        {/* Floating particles */}
        <div className="floating-particles">
          <div className="particle"></div>
          <div className="particle"></div>
          <div className="particle"></div>
          <div className="particle"></div>
          <div className="particle"></div>
          <div className="particle"></div>
          <div className="particle"></div>
          <div className="particle"></div>
          <div className="particle"></div>
        </div>

        <AppSidebar />
        <div className="flex-1 flex flex-col">
          <DashboardHeader user={user} />
          <main className="flex-1 p-6 relative z-10">{children}</main>
        </div>
      </div>
    </SidebarProvider>
  )
}

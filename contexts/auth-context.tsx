"use client"

import { createContext, useContext, useState, useEffect } from "react"
import type { ReactNode } from "react"

type AuthContextType = {
  isAuthenticated: boolean
  login: (token: string) => void
  logout: () => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  useEffect(() => {
    const token = document.cookie.includes("auth-token")
    setIsAuthenticated(token)
  }, [])

  const login = (token: string) => {
    document.cookie = `auth-token=${token}; path=/`
    setIsAuthenticated(true)
  }

  const logout = () => {
    document.cookie = "auth-token=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT"
    setIsAuthenticated(false)
  }

  return <AuthContext.Provider value={{ isAuthenticated, login, logout }}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}


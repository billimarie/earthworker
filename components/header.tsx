"use client"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Bell, Search } from "lucide-react"
import type React from "react" // Added import for React

export function Header() {
  const [searchQuery, setSearchQuery] = useState("")
  const router = useRouter()

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchQuery)}`)
    }
  }

  return (
    <header className="border-b">
      <div className="container mx-auto flex items-center justify-between py-4 xl:px-4">
        <Link href="/" className="text-2xl font-bold">
          Earthworkers
        </Link>
        <div className="flex items-center space-x-4">
          <form onSubmit={handleSearch} className="relative">
            <Search className="absolute left-2 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500" />
            <Input
              className="pl-8"
              placeholder="Search..."
              type="search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </form>
          <Button size="icon" variant="ghost">
            <Bell className="h-5 w-5" />
          </Button>
          <Button>Profile</Button>
        </div>
      </div>
    </header>
  )
}


"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Home, Trophy, Users, PlusSquare, Award, DollarSign } from "lucide-react"
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog"
import { NewCampaignForm } from "./new-campaign-form"

export function Sidebar() {
  const [isNewCampaignOpen, setIsNewCampaignOpen] = useState(false)

  return (
    <aside className="w-64 border-r p-4">
      <nav className="space-y-2">
        <Button asChild variant="ghost" className="w-full justify-start">
          <Link href="/">
            <Home className="mr-2 h-4 w-4" />
            Home
          </Link>
        </Button>
        <Button asChild variant="ghost" className="w-full justify-start">
          <Link href="/badges">
            <Trophy className="mr-2 h-4 w-4" />
            Badges
          </Link>
        </Button>
        <Button asChild variant="ghost" className="w-full justify-start">
          <Link href="/campaigns">
            <Users className="mr-2 h-4 w-4" />
            Campaigns
          </Link>
        </Button>
        <Button asChild variant="ghost" className="w-full justify-start">
          <Link href="/leaderboard">
            <Award className="mr-2 h-4 w-4" />
            Leaderboard
          </Link>
        </Button>
        <Button asChild variant="ghost" className="w-full justify-start">
          <Link href="/fundraising">
            <DollarSign className="mr-2 h-4 w-4" />
            Fundraising
          </Link>
        </Button>
      </nav>
      <div className="mt-4">
        <Dialog open={isNewCampaignOpen} onOpenChange={setIsNewCampaignOpen}>
          <DialogTrigger asChild>
            <Button className="w-full">
              <PlusSquare className="mr-2 h-4 w-4" />
              New Campaign
            </Button>
          </DialogTrigger>
          <DialogContent>
            <NewCampaignForm />
          </DialogContent>
        </Dialog>
      </div>
    </aside>
  )
}


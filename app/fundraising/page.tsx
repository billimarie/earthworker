"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Button } from "@/components/ui/button"

type FundraisingCampaign = {
  title: string
  description: string
  goal: number
  current: number
  donateUrl: string
}

export default function FundraisingPage() {
  const [campaign, setCampaign] = useState<FundraisingCampaign | null>(null)

  useEffect(() => {
    // In a real application, you would fetch this data from the GoFundMe API
    // For this example, we'll use mock data
    setCampaign({
      title: "For Every Star a Tree",
      description: "Help us plant trees and combat climate change!",
      goal: 10000,
      current: 7500,
      donateUrl: "https://www.gofundme.com/charity/for-every-star-a-tree-inc",
    })
  }, [])

  if (!campaign) {
    return <div>Loading...</div>
  }

  const progress = (campaign.current / campaign.goal) * 100

  return (
    <div className="container mx-auto py-6 px-8">
      <h1 className="text-2xl font-bold mb-6">Fundraising</h1>
      <Card>
        <CardHeader>
          <CardTitle>{campaign.title}</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="mb-4">{campaign.description}</p>
          <Progress value={progress} className="w-full mb-2" />
          <p className="text-sm text-gray-500 mb-4">
            ${campaign.current.toLocaleString()} raised of ${campaign.goal.toLocaleString()} goal
          </p>
          <Button asChild>
            <a href={campaign.donateUrl} target="_blank" rel="noopener noreferrer">
              Donate Now
            </a>
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}


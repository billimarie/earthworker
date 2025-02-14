"use client";

import { notFound } from "next/navigation"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { BadgeList } from "@/components/badge-list"
import { Progress } from "@/components/ui/progress"

// Auth
import { useContext } from 'react';
import { createSupabaseClient } from '@/lib/supabase';
import { AuthContext } from '@/app/layout';

type User = {
  id: string
  name: string
  avatar: string
  role: "Earthcare" | "Fan" | "Collaborator" | "Donor"
  campaignProgress: number
  activities: { id: string; description: string; timestamp: string }[]
}

const users: User[] = [
  {
    id: "user1",
    name: "Alice Johnson",
    avatar: "/placeholder.svg?height=40&width=40",
    role: "Earthcare",
    campaignProgress: 75,
    activities: [
      { id: "1", description: "Planted 10 trees", timestamp: "2023-06-01T10:00:00Z" },
      { id: "2", description: "Completed 'Clean Park' campaign", timestamp: "2023-05-28T14:30:00Z" },
      { id: "3", description: "Earned 'Green Thumb' badge", timestamp: "2023-05-25T09:15:00Z" },
    ],
  },
  {
    id: "user2",
    name: "Bob Smith",
    avatar: "/placeholder.svg?height=40&width=40",
    role: "Fan",
    campaignProgress: 25,
    activities: [{ id: "4", description: "Liked 5 campaigns", timestamp: "2023-06-05T12:00:00Z" }],
  },
  {
    id: "user3",
    name: "Charlie Brown",
    avatar: "/placeholder.svg?height=40&width=40",
    role: "Collaborator",
    campaignProgress: 90,
    activities: [
      { id: "5", description: "Created 'Clean Ocean' campaign", timestamp: "2023-06-02T08:00:00Z" },
      { id: "6", description: "Updated 'Clean Ocean' campaign", timestamp: "2023-06-04T16:00:00Z" },
    ],
  },
  {
    id: "user4",
    name: "Diana Prince",
    avatar: "/placeholder.svg?height=40&width=40",
    role: "Donor",
    campaignProgress: 50,
    activities: [{ id: "7", description: "Donated to 3 campaigns", timestamp: "2023-05-31T11:00:00Z" }],
  },
]

export default function ProfilePage(
  { params }: { params: { id: string } }) {
  const user = users.find((u) => u.id === params.id)

  if (!user) {
    notFound()
  }

  return (
    <div className="container mx-auto py-6 px-8">
      <Card>
        <CardHeader>
          <div className="flex items-center space-x-4">
            <Avatar className="h-20 w-20">
              <AvatarImage src={user.avatar} alt={user.name} />
              <AvatarFallback>{user.name[0]}</AvatarFallback>
            </Avatar>
            <div>
              <CardTitle className="text-2xl">{user.name}</CardTitle>
              <p className="text-gray-500">{user.role}</p>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <h2 className="text-xl font-semibold mb-2">Campaign Progress</h2>
          <Progress value={user.campaignProgress} className="w-full" />
          <p className="mt-2 text-sm text-gray-500">{user.campaignProgress}% complete</p>

          <h2 className="text-xl font-semibold mt-6 mb-2">Activity Feed</h2>
          <div className="space-y-4">
            {user.activities.map((activity) => (
              <div key={activity.id} className="border-b pb-2">
                <p>{activity.description}</p>
                <p className="text-sm text-gray-500">{new Date(activity.timestamp).toLocaleString()}</p>
              </div>
            ))}
          </div>

          <h2 className="text-xl font-semibold mt-6 mb-2">Badges</h2>
          <BadgeList />
        </CardContent>
      </Card>
    </div>
  )
}


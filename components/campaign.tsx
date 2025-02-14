"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Button } from "@/components/ui/button"
import { TaskList } from "./task-list"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { toast } from "@/components/ui/use-toast"
import type React from "react" // Added import for React

type User = {
  id: string
  name: string
  avatar: string
}

type Task = {
  id: string
  title: string
  completed: boolean
}

type CampaignProps = {
  id: string
  title: string
  description: string
  tasks: Task[]
  participants: User[]
  isJoined?: boolean
  badge?: {
    name: string
    icon: React.ReactNode
  }
}

export function Campaign({
  id,
  title,
  description,
  tasks: initialTasks,
  participants: initialParticipants,
  isJoined = false,
  badge,
}: CampaignProps) {
  const [tasks, setTasks] = useState(initialTasks)
  const [participants, setParticipants] = useState(initialParticipants)
  const [joined, setJoined] = useState(isJoined)

  const completedTasks = tasks.filter((task) => task.completed).length
  const progress = (completedTasks / tasks.length) * 100

  const handleJoin = async () => {
    // In a real app, send to your API
    setJoined(true)
    toast({
      title: "Joined Campaign",
      description: "You have successfully joined the campaign",
    })
  }

  const handleSave = async () => {
    // In a real app, send to your API
    toast({
      title: "Progress Saved",
      description: "Your campaign progress has been saved",
    })

    if (progress === 100) {
      toast({
        title: "Congratulations!",
        description: `You've earned the ${badge?.name} badge!`,
      })
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>
        <Progress value={progress} className="mb-4" />
        <p className="text-sm text-gray-500 mb-4">
          {completedTasks} of {tasks.length} tasks completed
        </p>

        {!joined ? (
          <Button onClick={handleJoin} className="mb-4">
            Join Campaign
          </Button>
        ) : (
          <>
            <TaskList tasks={tasks} setTasks={setTasks} campaignId={id} />
            <Button onClick={handleSave} className="mt-4">
              Save Progress
            </Button>
          </>
        )}

        <div className="mt-6">
          <h3 className="text-sm font-medium mb-2">Participants</h3>
          <div className="flex -space-x-2">
            {participants.map((participant) => (
              <Avatar key={participant.id} className="border-2 border-background">
                <AvatarImage src={participant.avatar} alt={participant.name} />
                <AvatarFallback>{participant.name[0]}</AvatarFallback>
              </Avatar>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}


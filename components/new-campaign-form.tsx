"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export function NewCampaignForm() {
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [tasks, setTasks] = useState([""])

  const handleAddTask = () => {
    setTasks([...tasks, ""])
  }

  const handleTaskChange = (index: number, value: string) => {
    const newTasks = [...tasks]
    newTasks[index] = value
    setTasks(newTasks)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Here you would typically send this data to your backend
    console.log({ title, description, tasks })
    // Reset form
    setTitle("")
    setDescription("")
    setTasks([""])
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Create New Campaign</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input placeholder="Campaign Title" value={title} onChange={(e) => setTitle(e.target.value)} required />
          <Textarea
            placeholder="Campaign Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
          {tasks.map((task, index) => (
            <Input
              key={index}
              placeholder={`Task ${index + 1}`}
              value={task}
              onChange={(e) => handleTaskChange(index, e.target.value)}
              required
            />
          ))}
          <Button type="button" onClick={handleAddTask}>
            Add Task
          </Button>
          <Button type="submit">Create Campaign</Button>
        </form>
      </CardContent>
    </Card>
  )
}


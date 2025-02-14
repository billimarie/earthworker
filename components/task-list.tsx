"use client"

import { useState } from "react"
import { Checkbox } from "@/components/ui/checkbox"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { PlusCircle } from "lucide-react"

type Task = {
  id: string
  title: string
  completed: boolean
}

type TaskListProps = {
  tasks: Task[]
  setTasks: React.Dispatch<React.SetStateAction<Task[]>>
  campaignId: string
}

export function TaskList({ tasks, setTasks, campaignId }: TaskListProps) {
  const [newTaskTitle, setNewTaskTitle] = useState("")

  const toggleTask = (taskId: string) => {
    setTasks(tasks.map((task) => (task.id === taskId ? { ...task, completed: !task.completed } : task)))
  }

  const addTask = () => {
    if (newTaskTitle.trim()) {
      const newTask = {
        id: Date.now().toString(),
        title: newTaskTitle.trim(),
        completed: false,
      }
      setTasks([...tasks, newTask])
      setNewTaskTitle("")
    }
  }

  return (
    <div className="space-y-4">
      {tasks.map((task) => (
        <div key={task.id} className="flex items-center space-x-2">
          <Checkbox id={`task-${task.id}`} checked={task.completed} onCheckedChange={() => toggleTask(task.id)} />
          <label
            htmlFor={`task-${task.id}`}
            className={`text-sm ${task.completed ? "line-through text-gray-500" : ""}`}
          >
            {task.title}
          </label>
        </div>
      ))}
      <div className="flex items-center space-x-2">
        <Input
          type="text"
          placeholder="Add a new task"
          value={newTaskTitle}
          onChange={(e) => setNewTaskTitle(e.target.value)}
          onKeyPress={(e) => e.key === "Enter" && addTask()}
        />
        <Button onClick={addTask} size="icon">
          <PlusCircle className="h-4 w-4" />
        </Button>
      </div>
    </div>
  )
}


"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { toast } from "@/components/ui/use-toast"

type UserProfile = {
  id: string
  name: string
  avatar: string
  role: "Earthcare" | "Fan" | "Collaborator" | "Donor"
}

export function EditProfile({ user }: { user: UserProfile }) {
  const [name, setName] = useState(user.name)
  const [role, setRole] = useState(user.role)
  const [avatar, setAvatar] = useState(user.avatar)
  const [isLoading, setIsLoading] = useState(false)

  const handleAvatarChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      // In a real app, upload to your storage service
      const reader = new FileReader()
      reader.onloadend = () => {
        setAvatar(reader.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      // In a real app, send to your API
      await new Promise((resolve) => setTimeout(resolve, 1000))
      toast({
        title: "Profile Updated",
        description: "Your profile has been updated successfully",
      })
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update profile",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Edit Profile</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="flex items-center space-x-4">
            <Avatar className="h-20 w-20">
              <AvatarImage src={avatar} />
              <AvatarFallback>{name[0]}</AvatarFallback>
            </Avatar>
            <Input type="file" accept="image/*" onChange={handleAvatarChange} className="max-w-[200px]" />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Name</label>
            <Input value={name} onChange={(e) => setName(e.target.value)} required />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Role</label>
            <Select value={role} onValueChange={setRole}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Earthcare">Earthcare</SelectItem>
                <SelectItem value="Fan">Fan</SelectItem>
                <SelectItem value="Collaborator">Collaborator</SelectItem>
                <SelectItem value="Donor">Donor</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <Button type="submit" disabled={isLoading}>
            {isLoading ? "Saving..." : "Save Changes"}
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}


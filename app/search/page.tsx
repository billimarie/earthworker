"use client"

import { useSearchParams } from "next/navigation"
import Link from "next/link"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Card, CardContent, CardHeader } from "@/components/ui/card"

type User = {
  id: string
  name: string
  avatar: string
  role: "Earthcare" | "Fan" | "Collaborator" | "Donor"
  activity: string
}

const users: User[] = [
  {
    id: "user1",
    name: "Alice Johnson",
    avatar: "/placeholder.svg?height=40&width=40",
    role: "Earthcare",
    activity: "Planted 10 trees",
  },
  {
    id: "user2",
    name: "Bob Smith",
    avatar: "/placeholder.svg?height=40&width=40",
    role: "Fan",
    activity: "Liked 5 campaigns",
  },
  {
    id: "user3",
    name: "Charlie Brown",
    avatar: "/placeholder.svg?height=40&width=40",
    role: "Collaborator",
    activity: "Created 'Clean Ocean' campaign",
  },
  {
    id: "user4",
    name: "Diana Prince",
    avatar: "/placeholder.svg?height=40&width=40",
    role: "Donor",
    activity: "Donated to 3 campaigns",
  },
]

export default function SearchPage() {
  const searchParams = useSearchParams()
  const query = searchParams.get("q")?.toLowerCase() || ""

  const filteredUsers = users.filter(
    (user) =>
      user.name.toLowerCase().includes(query) ||
      user.role.toLowerCase().includes(query) ||
      user.activity.toLowerCase().includes(query),
  )

  return (
    <div className="container mx-auto py-6 px-8">
      <h1 className="text-2xl font-bold mb-6">Search Results for "{query}"</h1>
      <div className="space-y-4">
        {filteredUsers.map((user) => (
          <Card key={user.id}>
            <CardHeader>
              <div className="flex items-center space-x-4">
                <Avatar>
                  <AvatarImage src={user.avatar} alt={user.name} />
                  <AvatarFallback>{user.name[0]}</AvatarFallback>
                </Avatar>
                <div>
                  <Link href={`/profile/${user.id}`} className="font-semibold hover:underline">
                    {user.name}
                  </Link>
                  <p className="text-sm text-gray-500">{user.role}</p>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-sm">{user.activity}</p>
            </CardContent>
          </Card>
        ))}
        {filteredUsers.length === 0 && <p>No users found matching your search criteria.</p>}
      </div>
    </div>
  )
}


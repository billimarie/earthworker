"use client"

import { useState } from "react"
import Link from "next/link"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Heart, MessageCircle, Star } from "lucide-react"
import { StatusUpdate } from "./status/status-update"
import { toast } from "@/components/ui/use-toast"

type FeedItem = {
  id: string
  user: {
    id: string
    name: string
    avatar: string
    role: "Earthcare" | "Fan" | "Collaborator" | "Donor"
  }
  content: string
  image?: string
  likes: number
  comments: number
  timestamp: string
  isLiked?: boolean
  isFavorited?: boolean
}

const initialFeedItems: FeedItem[] = [
  {
    id: "1",
    user: {
      id: "user1",
      name: "Alice",
      avatar: "/placeholder.svg?height=40&width=40",
      role: "Earthcare",
    },
    content: "Just earned the 'Early Bird' badge! 🌅",
    likes: 15,
    comments: 3,
    timestamp: "2h ago",
    isLiked: false,
    isFavorited: false,
  },
  // Add more feed items as needed
]

export function Feed() {
  const [feedItems, setFeedItems] = useState(initialFeedItems)

  const handleLike = async (itemId: string) => {
    setFeedItems((items) =>
      items.map((item) =>
        item.id === itemId
          ? {
              ...item,
              likes: item.isLiked ? item.likes - 1 : item.likes + 1,
              isLiked: !item.isLiked,
            }
          : item,
      ),
    )

    toast({
      title: "Success",
      description: "Your interaction has been recorded",
    })
  }

  const handleFavorite = async (itemId: string) => {
    setFeedItems((items) =>
      items.map((item) => (item.id === itemId ? { ...item, isFavorited: !item.isFavorited } : item)),
    )

    toast({
      title: "Success",
      description: "Post has been added to your favorites",
    })
  }

  return (
    <div className="space-y-4">
      <StatusUpdate />
      {feedItems.map((item) => (
        <Card key={item.id}>
          <CardHeader>
            <div className="flex items-center space-x-4">
              <Link href={`/profile/${item.user.id}`}>
                <Avatar>
                  <AvatarImage src={item.user.avatar} alt={item.user.name} />
                  <AvatarFallback>{item.user.name[0]}</AvatarFallback>
                </Avatar>
              </Link>
              <div>
                <Link href={`/profile/${item.user.id}`} className="font-semibold hover:underline">
                  {item.user.name}
                </Link>
                <p className="text-sm text-gray-500">{item.user.role}</p>
                <p className="text-sm text-gray-500">{item.timestamp}</p>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <p>{item.content}</p>
            {item.image && (
              <img
                src={item.image || "/placeholder.svg"}
                alt="Post content"
                className="mt-4 rounded-md max-h-[300px] object-cover"
              />
            )}
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => handleLike(item.id)}
              className={item.isLiked ? "text-primary" : ""}
            >
              <Heart className="mr-2 h-4 w-4" />
              {item.likes}
            </Button>
            <Button variant="ghost" size="sm">
              <MessageCircle className="mr-2 h-4 w-4" />
              {item.comments}
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => handleFavorite(item.id)}
              className={item.isFavorited ? "text-primary" : ""}
            >
              <Star className="mr-2 h-4 w-4" />
              Favorite
            </Button>
          </CardFooter>
        </Card>
      ))}
    </div>
  )
}


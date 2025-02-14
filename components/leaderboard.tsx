import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

type LeaderboardEntry = {
  rank: number
  user: {
    name: string
    avatar: string
  }
  points: number
  badges: number
}

const leaderboardData: LeaderboardEntry[] = [
  { rank: 1, user: { name: "Alice Johnson", avatar: "/placeholder.svg?height=40&width=40" }, points: 1250, badges: 8 },
  { rank: 2, user: { name: "Bob Smith", avatar: "/placeholder.svg?height=40&width=40" }, points: 1100, badges: 7 },
  { rank: 3, user: { name: "Charlie Brown", avatar: "/placeholder.svg?height=40&width=40" }, points: 1000, badges: 6 },
  { rank: 4, user: { name: "Diana Prince", avatar: "/placeholder.svg?height=40&width=40" }, points: 950, badges: 5 },
  { rank: 5, user: { name: "Ethan Hunt", avatar: "/placeholder.svg?height=40&width=40" }, points: 900, badges: 5 },
]

export function Leaderboard() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Top Environmentalists</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {leaderboardData.map((entry) => (
            <div key={entry.rank} className="flex items-center space-x-4">
              <div className="w-8 text-center font-bold">{entry.rank}</div>
              <Avatar>
                <AvatarImage src={entry.user.avatar} alt={entry.user.name} />
                <AvatarFallback>{entry.user.name[0]}</AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <p className="font-medium">{entry.user.name}</p>
                <p className="text-sm text-gray-500">{entry.points} points</p>
              </div>
              <Badge variant="secondary">{entry.badges} badges</Badge>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}


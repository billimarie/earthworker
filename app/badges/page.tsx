import { BadgeList } from "@/components/badge-list"

export default function BadgesPage() {
  return (
    <div className="container mx-auto py-6 px-8">
      <h1 className="text-2xl font-bold mb-6">Your Badges</h1>
      <BadgeList />
    </div>
  )
}


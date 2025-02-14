import { Badge } from "./badge"
import { TreeIcon, LeafIcon, RecycleIcon } from "./badge-icons"

const badges = [
  { name: "Tree Planter", icon: <TreeIcon />, earned: true },
  { name: "Eco Warrior", icon: <LeafIcon />, earned: true },
  { name: "Recycling Master", icon: <RecycleIcon />, earned: false },
]

export function BadgeList() {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {badges.map((badge) => (
        <Badge key={badge.name} {...badge} />
      ))}
    </div>
  )
}


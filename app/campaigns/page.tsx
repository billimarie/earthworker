import { Campaign } from "@/components/campaign"

const campaigns = [
  {
    id: "1",
    title: "Local Park Cleanup",
    description: "Help clean up our local park and make it a better place for everyone.",
    tasks: [
      { id: "1", title: "Collect 10 pieces of trash", completed: true },
      { id: "2", title: "Plant 3 new trees", completed: false },
      { id: "3", title: "Set up 2 recycling bins", completed: false },
    ],
  },
  {
    id: "2",
    title: "Reduce Energy Consumption",
    description: "Work together to reduce our community's energy consumption.",
    tasks: [
      { id: "1", title: "Switch to LED bulbs", completed: true },
      { id: "2", title: "Conduct an energy audit", completed: false },
      { id: "3", title: "Organize a 'lights off' day", completed: false },
    ],
  },
]

export default function CampaignsPage() {
  return (
    <div className="container mx-auto py-6 px-8">
      <h1 className="text-2xl font-bold mb-6">Active Campaigns</h1>
      <div className="grid gap-6 md:grid-cols-2">
        {campaigns.map((campaign) => (
          <Campaign participants={[]} key={campaign.id} {...campaign} />
        ))}
      </div>
    </div>
  )
}


"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { ImagePlus, X } from "lucide-react"
import { toast } from "@/components/ui/use-toast"

export function StatusUpdate() {
  const [content, setContent] = useState("")
  const [image, setImage] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setImage(reader.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!content.trim()) return

    setIsLoading(true)
    try {
      // In a real app, send to your API
      await new Promise((resolve) => setTimeout(resolve, 1000))
      setContent("")
      setImage(null)
      toast({
        title: "Status Updated",
        description: "Your status has been posted successfully",
      })
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to post status",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Card className="mb-6">
      <form onSubmit={handleSubmit}>
        <CardContent className="pt-6">
          <Textarea
            placeholder="What's on your mind?"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="min-h-[100px]"
          />
          {image && (
            <div className="relative mt-4">
              <img
                src={image || "/placeholder.svg"}
                alt="Status update"
                className="max-h-[200px] rounded-md object-cover"
              />
              <Button size="icon" variant="ghost" className="absolute top-2 right-2" onClick={() => setImage(null)}>
                <X className="h-4 w-4" />
              </Button>
            </div>
          )}
        </CardContent>
        <CardFooter className="justify-between">
          <div>
            <input type="file" accept="image/*" id="image-upload" className="hidden" onChange={handleImageChange} />
            <label htmlFor="image-upload">
              <Button type="button" variant="ghost" size="icon">
                <ImagePlus className="h-4 w-4" />
              </Button>
            </label>
          </div>
          <Button type="submit" disabled={isLoading || !content.trim()}>
            {isLoading ? "Posting..." : "Post Update"}
          </Button>
        </CardFooter>
      </form>
    </Card>
  )
}


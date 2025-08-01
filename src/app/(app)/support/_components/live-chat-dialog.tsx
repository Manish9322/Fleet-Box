
"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/hooks/use-toast"
import { LifeBuoy } from "lucide-react"

export function LiveChatDialog() {
  const [open, setOpen] = useState(false)
  const { toast } = useToast()

  const handleStartChat = (e: React.FormEvent) => {
    e.preventDefault()
    toast({
      title: "Chat Session Started",
      description: "A support agent will be with you shortly.",
    })
    setOpen(false)
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>
          <LifeBuoy className="mr-2 h-4 w-4" />
          Start Live Chat
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Start Live Chat</DialogTitle>
          <DialogDescription>
            Fill in your details below to start a chat with a support agent.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleStartChat} className="space-y-4">
            <div className="space-y-2">
                <Label htmlFor="name">Name</Label>
                <Input id="name" defaultValue="Manish Sonawane" required />
            </div>
             <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" defaultValue="manish@fleet.com" required />
            </div>
             <div className="space-y-2">
                <Label htmlFor="issue">Describe your issue</Label>
                <Textarea id="issue" placeholder="Please tell us what you need help with..." required rows={4} />
            </div>
            <div className="flex justify-end">
                <Button type="submit">Start Chat</Button>
            </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}


"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { DriverForm } from "./driver-form"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { PlusCircle } from "lucide-react"

export function AddDriverDialog() {
  const [open, setOpen] = useState(false)
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>
          <PlusCircle className="mr-2 h-4 w-4" /> Add Driver
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add New Driver</DialogTitle>
          <DialogDescription>
            Enter the details of the new driver below.
          </DialogDescription>
        </DialogHeader>
        <DriverForm onSave={() => setOpen(false)} />
      </DialogContent>
    </Dialog>
  )
}

export function EditDriverDialog({ driver, children }: { driver: any, children: React.ReactNode }) {
  const [open, setOpen] = useState(false)
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit Driver</DialogTitle>
          <DialogDescription>
            Update the details of the driver below.
          </DialogDescription>
        </DialogHeader>
        <DriverForm driver={driver} onSave={() => setOpen(false)} />
      </DialogContent>
    </Dialog>
  )
}

export function ViewDriverDialog({ driver, children }: { driver: any, children: React.ReactNode }) {
  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <div className="flex items-center gap-4">
             <Avatar className="h-16 w-16">
                <AvatarImage data-ai-hint="person portrait" src={driver.avatarUrl} alt={driver.name} />
                <AvatarFallback>{driver.name.charAt(0)}</AvatarFallback>
              </Avatar>
            <div>
                <DialogTitle className="text-2xl">{driver.name}</DialogTitle>
                <DialogDescription>{driver.email}</DialogDescription>
            </div>
          </div>
        </DialogHeader>
        <div className="space-y-4 pt-4">
          <div className="grid grid-cols-2 gap-2 text-sm">
            <p className="text-muted-foreground">Phone</p>
            <p>{driver.phone}</p>
            <p className="text-muted-foreground">Vehicle</p>
            <p>{driver.vehicle}</p>
            <p className="text-muted-foreground">Status</p>
            <p>
                <Badge
                    variant={
                      driver.status === "Active"
                        ? "default"
                        : driver.status === "Inactive"
                        ? "destructive"
                        : "secondary"
                    }
                  >
                    {driver.status}
                </Badge>
            </p>
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" asChild><DialogTrigger>Close</DialogTrigger></Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

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
import { CabForm } from "./cab-form"
import Image from "next/image"
import { Badge } from "@/components/ui/badge"
import { PlusCircle } from "lucide-react"

interface Cab {
  _id: string;
  model: string;
  licensePlate: string;
  location: string;
  status: "Available" | "Booked" | "Maintenance";
  imageUrl: string;
}

export function AddCabDialog({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState(false)
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>
          <PlusCircle className="mr-2 h-4 w-4" /> Add Cab
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add New Cab</DialogTitle>
          <DialogDescription>
            Enter the details of the new cab below.
          </DialogDescription>
        </DialogHeader>
        <CabForm onSave={() => setOpen(false)} />
      </DialogContent>
    </Dialog>
  )
}

export function EditCabDialog({ cab, children }: { cab: Cab, children: React.ReactNode }) {
  const [open, setOpen] = useState(false)
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit Cab</DialogTitle>
          <DialogDescription>
            Update the details of the cab below.
          </DialogDescription>
        </DialogHeader>
        <CabForm cab={cab} onSave={() => setOpen(false)} />
      </DialogContent>
    </Dialog>
  )
}

export function ViewCabDialog({ cab, children }: { cab: Cab, children: React.ReactNode }) {
  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>{cab.model}</DialogTitle>
          <DialogDescription>License Plate: {cab.licensePlate}</DialogDescription>
        </DialogHeader>
        <div className="space-y-4">
          <div className="flex justify-center">
            <Image data-ai-hint="car side" src={cab.imageUrl} alt={cab.model} width={200} height={200} className="rounded-lg" />
          </div>
          <div className="grid grid-cols-2 gap-2 text-sm">
            <p className="text-muted-foreground">Status</p>
            <p>
              <Badge
                variant={
                  cab.status === "Available"
                    ? "default"
                    : cab.status === "Booked"
                    ? "secondary"
                    : "destructive"
                }
              >
                {cab.status}
              </Badge>
            </p>
            <p className="text-muted-foreground">Location</p>
            <p>{cab.location}</p>
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" asChild><DialogTrigger>Close</DialogTrigger></Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
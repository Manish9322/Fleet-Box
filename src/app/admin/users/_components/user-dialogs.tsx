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
import { UserForm } from "./user-form"
import { Badge } from "@/components/ui/badge"
import { PlusCircle } from "lucide-react"

interface User {
  _id: string;
  fullName: string;
  email: string;
  gender: string;
  phone: string;
}

export function AddUserDialog({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState(false)
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {children}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add New User</DialogTitle>
          <DialogDescription>
            Enter the details of the new user below.
          </DialogDescription>
        </DialogHeader>
        <UserForm onSave={() => setOpen(false)} />
      </DialogContent>
    </Dialog>
  )
}

export function EditUserDialog({ user, children }: { user: User, children: React.ReactNode }) {
  const [open, setOpen] = useState(false)
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit User</DialogTitle>
          <DialogDescription>
            Update the details of the user below.
          </DialogDescription>
        </DialogHeader>
        <UserForm user={user} onSave={() => setOpen(false)} />
      </DialogContent>
    </Dialog>
  )
}

export function ViewUserDialog({ user, children }: { user: User, children: React.ReactNode }) {
  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>{user.fullName}</DialogTitle>
          <DialogDescription>Email: {user.email}</DialogDescription>
        </DialogHeader>
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-2 text-sm">
            <p className="text-muted-foreground">Gender</p>
            <p>{user.gender}</p>
            <p className="text-muted-foreground">Phone</p>
            <p>{user.phone}</p>
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" asChild><DialogTrigger>Close</DialogTrigger></Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
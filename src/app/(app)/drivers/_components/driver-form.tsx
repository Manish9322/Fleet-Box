
"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { useToast } from "@/hooks/use-toast"
import { useCreateDriverMutation, useUpdateDriverMutation } from "../../../../../services/api"

const formSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email address"),
  phone: z.string().min(1, "Phone number is required"),
  vehicle: z.string().min(1, "Vehicle is required"),
  status: z.enum(["Active", "Inactive", "On-leave"]),
  avatarUrl: z.string().url({ message: "Please enter a valid URL." }).optional().or(z.literal('')),
})

export function DriverForm({ driver, onSave }: { driver?: any; onSave: () => void }) {
  const { toast } = useToast()
  const form = useForm<z.infer<typeof formSchema>>({
    // @ts-ignore

    resolver: zodResolver(formSchema),
    defaultValues: driver || {
      name: "",
      email: "",
      phone: "",
      vehicle: "",
      status: "Active",
      avatarUrl: "",
    },
  })

  const [createDriver, { isLoading: isCreating }] = useCreateDriverMutation();
  const [updateDriver, { isLoading: isUpdating }] = useUpdateDriverMutation();

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      if (driver) {
        await updateDriver({ id: driver._id, ...values }).unwrap();
        toast({
          title: "Driver Updated",
          description: `The driver "${values.name}" has been successfully updated.`,
        });
      } else {
        await createDriver(values).unwrap();
        toast({
          title: "Driver Added",
          description: `The driver "${values.name}" has been successfully added.`,
        });
      }
    } catch (error: any) {
      toast({
        title: "Operation failed",
        description: `Error: ${error?.data?.message || "An unexpected error occurred."}`,
        variant: "destructive",
      });
    }
    onSave()
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input placeholder="e.g. John Doe" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input type="email" placeholder="e.g. john.doe@gmail.com" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className="grid grid-cols-2 gap-4">
         <FormField
            control={form.control}
            name="phone"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Phone</FormLabel>
                <FormControl>
                  <Input placeholder="e.g. +1-202-555-0104" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
         <FormField
            control={form.control}
            name="vehicle"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Assigned Vehicle</FormLabel>
                <FormControl>
                  <Input placeholder="e.g. Toyota Camry" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <FormField
          control={form.control}
          name="status"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Status</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a status" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="Active">Active</SelectItem>
                  <SelectItem value="Inactive">Inactive</SelectItem>
                  <SelectItem value="On-leave">On-leave</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
         <FormField
          control={form.control}
          name="avatarUrl"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Avatar URL</FormLabel>
              <FormControl>
                <Input placeholder="https://placehold.co/40x40.png" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex justify-end pt-4">
          <Button type="submit" disabled={isCreating || isUpdating}>{isCreating || isUpdating ? "Saving..." : "Save changes"}</Button>
        </div>
      </form>
    </Form>
  )
}

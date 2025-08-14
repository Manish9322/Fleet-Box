"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import {
  useCreateCabMutation,
  useUpdateCabMutation,
} from "../../../../../services/api";

const formSchema = z.object({
  model: z.string().min(1, "Model is required"),
  licensePlate: z
    .string()
    .min(1, "License plate is required")
    .regex(
      /^[A-Z]{2}[0-9]{2}-[A-Z]{2}-[0-9]{4}$/,
      "License plate must follow the format MH43-AD-1234 (e.g., two letters, two numbers, hyphen, two letters, hyphen, four numbers)"
    ),
  location: z.string().min(1, "Location is required"),
  status: z.enum(["Available", "Booked", "Maintenance"]),
  imageUrl: z
    .string()
    .url({ message: "Please enter a valid URL." })
    .optional()
    .or(z.literal("")),
});

export function CabForm({ cab, onSave }: { cab?: any; onSave: () => void }) {
  const { toast } = useToast();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: cab || {
      model: "",
      licensePlate: "",
      location: "",
      status: "Available",
      imageUrl: "",
    },
  });

  const [createCab, { isLoading: isCreating }] = useCreateCabMutation();
  const [updateCab, { isLoading: isUpdating }] = useUpdateCabMutation();

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      if (cab) {
        await updateCab({ id: cab._id, ...values }).unwrap();
        toast({
          title: "Cab Updated",
          description: `The cab "${values.model}" has been successfully updated.`,
        });
      } else {
        await createCab(values).unwrap();
        toast({
          title: "Cab Added",
          description: `The cab "${values.model}" has been successfully added.`,
        });
      }
      onSave();
    } catch (error: any) {
      toast({
        title: "Operation failed",
        description: `Error: ${
          error?.data?.message || "An unexpected error occurred."
        }`,
        variant: "destructive",
      });
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="model"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Model</FormLabel>
                <FormControl>
                  <Input placeholder="e.g. Toyota Camry" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="licensePlate"
            render={({ field }) => (
              <FormItem>
                <FormLabel>License Plate</FormLabel>
                <FormControl>
                  <Input placeholder="e.g. MH43-AD-1234" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="location"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Current Location</FormLabel>
                <FormControl>
                  <Input placeholder="e.g. Vashi" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="status"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Status</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a status" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="Available">Available</SelectItem>
                    <SelectItem value="Booked">Booked</SelectItem>
                    <SelectItem value="Maintenance">Maintenance</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <FormField
          control={form.control}
          name="imageUrl"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Image URL</FormLabel>
              <FormControl>
                <Input
                  placeholder="https://placehold.co/64x64.png"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex justify-end pt-4">
          <Button type="submit" disabled={isCreating || isUpdating}>
            {isCreating || isUpdating ? "Saving..." : "Save changes"}
          </Button>
        </div>
      </form>
    </Form>
  );
}

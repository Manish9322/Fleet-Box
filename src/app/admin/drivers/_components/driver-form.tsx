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
  useCreateDriverMutation,
  useUpdateDriverMutation,
  useGetCabsQuery,
} from "../../../../../services/api";

interface Cab {
  _id: string;
  model: string;
  licensePlate: string;
}

const formSchema = z.object({
  name: z.string().min(3, "Name must be at least 3 characters"),
  email: z.string().email("Please enter a valid email address"),
  cabId: z.string().optional(), // cabId is optional
  phone: z.string().regex(/^\d{10,15}$/, "Please enter a valid phone number"),
  status: z.enum(["Active", "Inactive", "On-leave"]),
  avatarUrl: z.string().url({ message: "Please enter a valid URL." }).optional().or(z.literal("")),
});

export function DriverForm({ driver, onSave }: { driver?: any; onSave: () => void }) {
  const { toast } = useToast();
  const { data: cabs = [], isLoading: isCabsLoading } = useGetCabsQuery(undefined);
  const [createDriver, { isLoading: isCreating }] = useCreateDriverMutation();
  const [updateDriver, { isLoading: isUpdating }] = useUpdateDriverMutation();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: driver?.name || "",
      email: driver?.email || "",
      cabId: driver?.cabId || "none", // Default to "none" for no cab
      phone: driver?.phone || "",
      status: driver?.status || "Active",
      avatarUrl: driver?.avatarUrl || "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      // Convert "none" to null for cabId
      const submissionValues = {
        ...values,
        cabId: values.cabId === "none" ? null : values.cabId,
      };

      if (driver) {
        await updateDriver({ id: driver._id, ...submissionValues }).unwrap();
        toast({
          title: "Driver Updated",
          description: `The driver "${values.name}" has been successfully updated.`,
        });
      } else {
        await createDriver(submissionValues).unwrap();
        toast({
          title: "Driver Added",
          description: `The driver "${values.name}" has been successfully added.`,
        });
      }
      onSave();
    } catch (error: any) {
      toast({
        title: "Operation failed",
        description: `Error: ${error?.data?.message || "An unexpected error occurred."}`,
        variant: "destructive",
      });
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input placeholder="Enter driver name" {...field} />
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
                <Input placeholder="Enter driver email" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="cabId"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Assigned Cab</FormLabel>
              <FormControl>
                <Select
                  onValueChange={field.onChange}
                  value={field.value || "none"}
                  disabled={isCabsLoading}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select a cab (optional)" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="none">None</SelectItem>
                    {cabs.map((cab : Cab) => (
                      <SelectItem key={cab._id} value={cab._id}>
                        {cab.model} - {cab.licensePlate}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="phone"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Phone Number</FormLabel>
              <FormControl>
                <Input placeholder="Enter phone number" {...field} />
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
                <Input placeholder="Enter avatar URL" {...field} />
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
// app/admin/signin/page.tsx
"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useToast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";
import { useSignInAdminMutation } from "../../../../services/api"; // Adjusted path
import { Lock } from "lucide-react";

const adminSignInSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

type AdminSignInFormValues = z.infer<typeof adminSignInSchema>;

export default function AdminSignInPage() {
  const { toast } = useToast();
  const router = useRouter();
  const [signInAdmin, { isLoading }] = useSignInAdminMutation();

  const form = useForm<AdminSignInFormValues>({
    resolver: zodResolver(adminSignInSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function onSubmit(values: AdminSignInFormValues) {
    try {
      const result = await signInAdmin(values).unwrap();
      console.log("Admin sign-in result:", result);
      if (!result.user?._id) {
        throw new Error("No admin ID returned from server.");
      }
      localStorage.setItem("adminId", result.user._id);
      localStorage.setItem("adminLoginTimestamp", Date.now().toString());
      toast({
        title: "Admin Sign-In Successful",
        description: `Welcome, ${result.user.fullName}!`,
      });
      router.push("/admin/dashboard");
    } catch (error: any) {
      console.error("Admin sign-in error:", error);
      toast({
        title: "Admin Sign-In Failed",
        description:
          error?.data?.message ||
          error.message ||
          "An unexpected error occurred.",
        variant: "destructive",
      });
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-background p-4">
      <Card className="w-full max-w-md shadow-lg">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-bold font-headline">
            Admin Sign In
          </CardTitle>
          <CardDescription>
            Enter your admin credentials to access the Fleet-Box admin panel.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Lock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                        <Input
                          placeholder="Enter your email"
                          className="pl-10"
                          {...field}
                        />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Lock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                        <Input
                          type="password"
                          placeholder="Enter your password"
                          className="pl-10"
                          {...field}
                        />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? "Signing In..." : "Sign In as Admin"}
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
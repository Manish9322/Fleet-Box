"use client";

import { useForm } from "react-hook-form";
import Link from "next/link";
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
import { useSignInMutation } from "../../../services/api";

const signInSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

type SignInFormValues = z.infer<typeof signInSchema>;

export default function SignInPage() {
  const { toast } = useToast();
  const router = useRouter();
  const [signIn, { isLoading }] = useSignInMutation();

  const form = useForm<SignInFormValues>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function onSubmit(values: SignInFormValues) {
    try {
      const result = await signIn(values).unwrap();
      // Store user _id in local storage with timestamp
      localStorage.setItem("userId", result.user._id);
      localStorage.setItem("loginTimestamp", Date.now().toString());
      toast({
        title: "Sign-In Successful",
        description: `Welcome, ${result.user.fullName}!`,
      });
      router.push("/");
    } catch (error: any) {
      toast({
        title: "Sign-In Failed",
        description: error?.data?.message || "An unexpected error occurred.",
        variant: "destructive",
      });
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-background p-4">
      <Card className="w-full max-w-md shadow-lg">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-bold font-headline">
            Sign In to Fleet-Box
          </CardTitle>
          <CardDescription>
            Enter your email and password to access your account.
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
                      <Input placeholder="Enter your email" {...field} />
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
                      <Input
                        type="password"
                        placeholder="Enter your password"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />


              {/* <CardDescription>
                <div>
                <input type="checkbox" name="terms" id="terms" />
                <label htmlFor="terms" className="ml-2">
                  By signing in, you agree to our{" "}
                  <a href="/terms" className="underline">
                    Terms of Service
                  </a>{" "}
                  and{" "}
                  <a href="/privacy" className="underline">
                    Privacy Policy
                  </a>
                  .
                </label>
                </div>
              </CardDescription> */}

              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? "Signing In..." : "Sign In"}
              </Button>
            </form>

            <CardDescription className="text-center mt-4">
              <label htmlFor="">Don't have an account?</label>
              <Link href="/sign-in" className="ml-2 underline">
                Sign Up
              </Link>
            </CardDescription>

          </Form>
        </CardContent>
      </Card>
    </div>
  );
}

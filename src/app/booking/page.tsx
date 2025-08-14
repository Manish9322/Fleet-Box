"use client";

import { useEffect } from "react";
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
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { MapPin, Car, User, DollarSign, Shield, Star, Map } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  useGetCabsQuery,
  useGetDriversQuery,
  useCreateBookingMutation,
  useGetCurrentUserQuery,
} from "../../../services/api";

interface Driver {
  _id: string;
  name: string;
  phone: string;
  cabId: Cab;
}

interface Cab {
  _id: string;
  model: string;
  licensePlate: string;
  price?: number;
  image?: string;
}

const formSchema = z.object({
  cab: z.string().min(1, "Please select a cab"),
  currentLocation: z.string().min(1, "Pickup location is required"),
  destinationLocation: z.string().min(1, "Drop-off location is required"),
  fareAmount: z
    .string()
    .regex(/^\d+(\.\d{1,2})?$/, "Enter a valid fare amount (e.g., 350.00)"),
});

type FormValues = z.infer<typeof formSchema>;

export default function CreateBookingPage() {
  const { toast } = useToast();
  const router = useRouter();
  const { data: user, isError: isUserError, error: userError } = useGetCurrentUserQuery(undefined, {
    skip: !localStorage.getItem("userId"),
  });
  const { data: cabs = [], isLoading: isCabsLoading } = useGetCabsQuery(undefined);
  const { data: drivers = [], isLoading: isDriversLoading } = useGetDriversQuery(undefined);
  const [createBooking, { isLoading: isCreating }] = useCreateBookingMutation();

  // Check for login expiration
  useEffect(() => {
    const userId = localStorage.getItem("userId");
    const loginTimestamp = localStorage.getItem("loginTimestamp");
    if (userId && loginTimestamp) {
      const loginTime = parseInt(loginTimestamp, 10);
      const oneDayInMs = 24 * 60 * 60 * 1000; // 1 day in milliseconds
      if (Date.now() - loginTime > oneDayInMs) {
        localStorage.removeItem("userId");
        localStorage.removeItem("loginTimestamp");
        toast({
          title: "Session Expired",
          description: "Your session has expired. Please sign in again.",
          variant: "destructive",
        });
        router.push("/signin");
      }
    }
  }, [router, toast]);

  // Redirect to sign-in if user is not authenticated
  useEffect(() => {
    if (isUserError) {
      localStorage.removeItem("userId");
      localStorage.removeItem("loginTimestamp");
      toast({
        title: "Authentication Required",
        description:
          (userError && "data" in userError && (userError as any).data?.message) ||
          "Please sign in to create a booking.",
        variant: "destructive",
      });
      router.push("/signin");
    }
  }, [isUserError, userError, router, toast]);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      cab: "",
      currentLocation: "",
      destinationLocation: "",
      fareAmount: "",
    },
  });

  // Find the driver associated with the selected cab
  const selectedCabId = form.watch("cab");
  const driver = drivers.find(
    (driver: Driver) => driver.cabId?._id === selectedCabId
  );

  // Filter cabs that have an assigned driver
  const availableCabs = cabs.filter((cab: Cab) =>
    drivers.some((driver: Driver) => driver.cabId?._id === cab._id)
  );

  async function onSubmit(values: FormValues) {
    try {
      if (!driver) {
        throw new Error("No driver assigned to the selected cab.");
      }
      const customerId = localStorage.getItem("userId");
      if (!customerId) {
        throw new Error("User not authenticated. Please sign in.");
      }
      await createBooking({
        customerId: user._id,
        cabId: values.cab,
        driverId: driver._id,
        pickup: values.currentLocation,
        dropoff: values.destinationLocation,
        fare: `₹${values.fareAmount}`,
        status: "Scheduled",
      }).unwrap();
      toast({
        title: "Booking Created",
        description: "Your cab booking has been successfully created!",
      });
      form.reset();
    } catch (error: any) {
      toast({
        title: "Booking Failed",
        description: `Error: ${
          error?.data?.message ||
          error.message ||
          "An unexpected error occurred."
        }`,
        variant: "destructive",
      });
    }
  }

  return (
    <div className="flex flex-col min-h-screen bg-background">
      {/* Hero Section */}
      <section className="bg-primary text-primary-foreground py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-3xl sm:text-4xl font-bold font-headline mb-4">
            Book Your Ride with Fleet-Box
          </h1>
          <p className="text-lg sm:text-xl mb-8 max-w-2xl mx-auto">
            Plan your journey with ease. Select a cab, enter your details, and enjoy a comfortable ride.
          </p>
          <Button asChild size="lg">
            <a href="#booking-form" className="scroll-smooth">
              Start Booking Now
            </a>
          </Button>
        </div>
      </section>

      {/* Why Book with Us Section */}
      <section className="py-16 bg-muted">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold font-headline text-center mb-12">
            Why Book with Fleet-Box?
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card>
              <CardHeader>
                <Car className="h-12 w-12 text-primary mb-4 mx-auto" />
                <CardTitle className="text-center">Premium Vehicles</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                Ride in style with our fleet of well-maintained, modern cabs.
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <Shield className="h-12 w-12 text-primary mb-4 mx-auto" />
                <CardTitle className="text-center">Safe & Reliable</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                Our vetted drivers ensure your safety and punctuality every time.
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <DollarSign className="h-12 w-12 text-primary mb-4 mx-auto" />
                <CardTitle className="text-center">Transparent Pricing</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                Know your fare upfront with no hidden charges.
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Booking Form Section */}
      <section id="booking-form" className="py-16 bg-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <Card className="w-full max-w-3xl mx-auto shadow-lg">
            <CardHeader>
              <CardTitle>Book a Cab</CardTitle>
              <CardDescription>
                Enter the details to create a new cab booking.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                  <div className="grid gap-4 md:grid-cols-2">
                    <FormField
                      control={form.control}
                      name="cab"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Cab</FormLabel>
                          <FormControl>
                            <div className="relative">
                              <Car className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                              <Select
                                onValueChange={field.onChange}
                                value={field.value}
                                disabled={isCabsLoading || isDriversLoading}
                              >
                                <SelectTrigger className="pl-10">
                                  <SelectValue placeholder="Select cab" />
                                </SelectTrigger>
                                <SelectContent>
                                  {availableCabs.length > 0 ? (
                                    availableCabs.map((cab: Cab) => (
                                      <SelectItem key={cab._id} value={cab._id}>
                                        {cab.model} - {cab.licensePlate}
                                      </SelectItem>
                                    ))
                                  ) : (
                                    <SelectItem value="no-cabs" disabled>
                                      No cabs with assigned drivers available
                                    </SelectItem>
                                  )}
                                </SelectContent>
                              </Select>
                            </div>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <div className="space-y-2">
                      <Label>Driver</Label>
                      <div className="relative">
                        <User className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                        <Input
                          value={
                            isDriversLoading
                              ? "Loading..."
                              : driver?.name || "No driver assigned to selected cab"
                          }
                          disabled
                          className="pl-10"
                        />
                      </div>
                    </div>
                  </div>
                  <FormField
                    control={form.control}
                    name="currentLocation"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Current Location</FormLabel>
                        <FormControl>
                          <div className="relative">
                            <MapPin className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                            <Input
                              placeholder="Enter pickup location"
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
                    name="destinationLocation"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Destination Location</FormLabel>
                        <FormControl>
                          <div className="relative">
                            <MapPin className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                            <Input
                              placeholder="Enter drop-off location"
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
                    name="fareAmount"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Fare Amount</FormLabel>
                        <FormControl>
                          <div className="relative">
                            <DollarSign className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                            <Input
                              type="number"
                              placeholder="Enter fare amount"
                              className="pl-10"
                              {...field}
                            />
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <Button
                    type="submit"
                    className="w-full md:w-auto"
                    disabled={isCreating || !driver || availableCabs.length === 0}
                  >
                    {isCreating ? "Creating..." : "Create Booking"}
                  </Button>
                </form>
              </Form>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Fare Estimation Section */}
      <section className="py-16 bg-secondary">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold font-headline text-center mb-12">
            Estimate Your Fare
          </h2>
          <Card className="w-full max-w-md mx-auto shadow-lg">
            <CardHeader>
              <CardTitle>Fare Calculator</CardTitle>
              <CardDescription>
                Get an estimated fare for your trip (coming soon).
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="relative">
                  <MapPin className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <Input placeholder="Enter pickup location" className="pl-10" disabled />
                </div>
                <div className="relative">
                  <MapPin className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <Input placeholder="Enter drop-off location" className="pl-10" disabled />
                </div>
                <Button className="w-full" disabled>
                  Calculate Fare (Coming Soon)
                </Button>
              </div>
            </CardContent>
          </Card>
          <p className="text-center mt-4 text-muted-foreground">
            Our fare calculator will soon help you estimate costs based on distance and cab type.
          </p>
        </div>
      </section>

      {/* Safety Information Section */}
      <section className="py-16 bg-muted">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold font-headline text-center mb-12">
            Your Safety, Our Priority
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card>
              <CardHeader>
                <Shield className="h-12 w-12 text-primary mb-4 mx-auto" />
                <CardTitle className="text-center">Verified Drivers</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                All drivers undergo thorough background checks and training.
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <Map className="h-12 w-12 text-primary mb-4 mx-auto" />
                <CardTitle className="text-center">Real-Time Tracking</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                Track your ride live for added peace of mind.
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <Star className="h-12 w-12 text-primary mb-4 mx-auto" />
                <CardTitle className="text-center">Customer Support</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                24/7 support to assist you during your journey.
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Recent Bookings Section */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold font-headline text-center mb-12">
            Popular Routes
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card>
              <CardHeader>
                <MapPin className="h-10 w-10 text-primary mb-4 mx-auto" />
                <CardTitle className="text-center">Mumbai to Pune</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                Enjoy a comfortable inter-city ride with our reliable cabs.
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <MapPin className="h-10 w-10 text-primary mb-4 mx-auto" />
                <CardTitle className="text-center">Airport to South Mumbai</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                Hassle-free airport transfers with punctual service.
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <MapPin className="h-10 w-10 text-primary mb-4 mx-auto" />
                <CardTitle className="text-center">Navi Mumbai to Bandra</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                Quick and affordable rides within the city.
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
}
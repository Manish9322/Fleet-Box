"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Car, MapPin, Users, DollarSign, Star, CheckCircle, Map, UserCheck, Smartphone } from "lucide-react";
import Link from "next/link";

export default function HomePage() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="bg-primary text-primary-foreground py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl sm:text-5xl font-bold font-headline mb-4">
            Welcome to Fleet-Box
          </h1>
          <p className="text-lg sm:text-xl mb-8 max-w-2xl mx-auto">
            Book your cab effortlessly with our reliable and user-friendly platform.
            Enjoy safe, affordable, and convenient rides anywhere, anytime.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg">
              <Link href="/booking">Book a Cab Now</Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="bg-background text-primary">
              <Link href="/signin">Sign Up</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold font-headline text-center mb-12">
            Why Choose Fleet-Box?
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card>
              <CardHeader>
                <Car className="h-12 w-12 text-primary mb-4 mx-auto" />
                <CardTitle className="text-center">Reliable Cabs</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                Choose from a wide range of well-maintained cabs driven by professional drivers.
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <MapPin className="h-12 w-12 text-primary mb-4 mx-auto" />
                <CardTitle className="text-center">Easy Booking</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                Book your ride in just a few clicks with our intuitive platform.
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <DollarSign className="h-12 w-12 text-primary mb-4 mx-auto" />
                <CardTitle className="text-center">Affordable Pricing</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                Enjoy competitive fares with transparent pricing and no hidden fees.
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-16 bg-muted">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold font-headline text-center mb-12">
            What Our Customers Say
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card>
              <CardHeader>
                <Star className="h-10 w-10 text-primary mb-4 mx-auto" />
                <CardTitle className="text-center">Sarah M.</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                "Fleet-Box made my daily commute so easy! The drivers are friendly, and the app is super user-friendly."
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <Star className="h-10 w-10 text-primary mb-4 mx-auto" />
                <CardTitle className="text-center">James R.</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                "Affordable prices and reliable service. I always choose Fleet-Box for my airport transfers!"
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <Star className="h-10 w-10 text-primary mb-4 mx-auto" />
                <CardTitle className="text-center">Priya S.</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                "The booking process is seamless, and I love the transparent pricing. Highly recommend!"
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold font-headline text-center mb-12">
            How It Works
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <CheckCircle className="h-12 w-12 text-primary mb-4 mx-auto" />
              <h3 className="text-xl font-semibold mb-2">1. Choose Your Ride</h3>
              <p>Select a cab from our wide range of vehicles that suits your needs.</p>
            </div>
            <div className="text-center">
              <CheckCircle className="h-12 w-12 text-primary mb-4 mx-auto" />
              <h3 className="text-xl font-semibold mb-2">2. Book Instantly</h3>
              <p>Enter your pickup and drop-off locations, and book with a few clicks.</p>
            </div>
            <div className="text-center">
              <CheckCircle className="h-12 w-12 text-primary mb-4 mx-auto" />
              <h3 className="text-xl font-semibold mb-2">3. Enjoy Your Ride</h3>
              <p>Our professional driver picks you up on time for a safe, comfortable journey.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Popular Destinations Section */}
      <section className="py-16 bg-secondary">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold font-headline text-center mb-12">
            Popular Destinations
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            <Card>
              <CardHeader>
                <Map className="h-10 w-10 text-primary mb-4 mx-auto" />
                <CardTitle className="text-center">Mumbai Airport</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                Book a cab to or from Mumbai Airport with ease.
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <Map className="h-10 w-10 text-primary mb-4 mx-auto" />
                <CardTitle className="text-center">South Mumbai</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                Explore the vibrant heart of the city with our reliable cabs.
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <Map className="h-10 w-10 text-primary mb-4 mx-auto" />
                <CardTitle className="text-center">Pune</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                Travel to Pune comfortably with our inter-city services.
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <Map className="h-10 w-10 text-primary mb-4 mx-auto" />
                <CardTitle className="text-center">Navi Mumbai</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                Quick and affordable rides to Navi Mumbai and beyond.
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Driver Spotlight Section */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold font-headline text-center mb-12">
            Meet Our Drivers
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card>
              <CardHeader>
                <UserCheck className="h-12 w-12 text-primary mb-4 mx-auto" />
                <CardTitle className="text-center">Amit Sharma</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                With 10 years of experience, Amit ensures a safe and comfortable ride every time.
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <UserCheck className="h-12 w-12 text-primary mb-4 mx-auto" />
                <CardTitle className="text-center">Neha Patel</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                Neha’s friendly service and local knowledge make every trip enjoyable.
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <UserCheck className="h-12 w-12 text-primary mb-4 mx-auto" />
                <CardTitle className="text-center">Rahul Desai</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                Rahul’s punctuality and professionalism are trusted by thousands of riders.
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Mobile App Promotion Section */}
      <section className="py-16 bg-muted">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold font-headline mb-4">
            Book On the Go
          </h2>
          <p className="text-lg mb-8 max-w-xl mx-auto">
            Download the Fleet-Box app to book cabs anytime, anywhere, with real-time tracking and exclusive offers.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" className="bg-primary text-primary-foreground">
              <a href="https://www.apple.com/app-store/" target="_blank" rel="noopener noreferrer">
                <Smartphone className="h-6 w-6 mr-2" />
                Download on the App Store
              </a>
            </Button>
            <Button asChild size="lg" className="bg-primary text-primary-foreground">
              <a href="https://play.google.com/store" target="_blank" rel="noopener noreferrer">
                <Smartphone className="h-6 w-6 mr-2" />
                Get it on Google Play
              </a>
            </Button>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-secondary">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold font-headline mb-4">
            Ready to Ride?
          </h2>
          <p className="text-lg mb-8 max-w-xl mx-auto">
            Sign up today and start booking your cabs with Fleet-Box. Your next ride is just a click away!
          </p>
          <Button asChild size="lg">
            <Link href="/signup">Get Started</Link>
          </Button>
        </div>
      </section>
    </div>
  );
}
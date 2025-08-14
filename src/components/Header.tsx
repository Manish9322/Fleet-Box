"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Car, Menu, X } from "lucide-react";
import { useGetCurrentUserQuery } from "../../services/api";
import Link from "next/link";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [hasUserId, setHasUserId] = useState(false);
  const { toast } = useToast();
  const router = useRouter();

  // Only check localStorage on the client
  useEffect(() => {
    if (typeof window !== "undefined") {
      setHasUserId(!!localStorage.getItem("userId"));
    }
  }, []);

  const { data: user, isError } = useGetCurrentUserQuery(undefined, {
    skip: !hasUserId,
  });

  const handleLogout = () => {
    if (typeof window !== "undefined") {
      localStorage.removeItem("userId");
    }
    toast({
      title: "Logged Out",
      description: "You have been successfully logged out.",
    });
    router.push("/signin");
    setIsMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 bg-background border-b shadow-sm">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <Car className="h-8 w-8 text-primary" />
            <span className="text-xl font-bold font-headline">Fleet-Box</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-6">
            <Link href="/" className="text-sm font-medium hover:text-primary">
              Home
            </Link>
            <Link href="/booking" className="text-sm font-medium hover:text-primary">
              Book a Cab
            </Link>
            {user ? (
              <>
                <span className="text-sm font-medium text-muted-foreground">
                  Welcome, {user.fullName}
                </span>
                <Button variant="ghost" onClick={handleLogout}>
                  Logout
                </Button>
              </>
            ) : (
              <>
                <Link href="/signin" className="text-sm font-medium hover:text-primary">
                  Sign In
                </Link>
                <Link href="/sign-in" className="text-sm font-medium hover:text-primary">
                  Sign Up
                </Link>
              </>
            )}
          </nav>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <nav className="md:hidden py-4 flex flex-col gap-4 border-t">
            <Link
              href="/"
              className="text-sm font-medium hover:text-primary"
              onClick={() => setIsMenuOpen(false)}
            >
              Home
            </Link>
            <Link
              href="/booking"
              className="text-sm font-medium hover:text-primary"
              onClick={() => setIsMenuOpen(false)}
            >
              Book a Cab
            </Link>
            {user ? (
              <>
                <span className="text-sm font-medium text-muted-foreground">
                  Welcome, {user.fullName}
                </span>
                <Button
                  variant="ghost"
                  onClick={handleLogout}
                  className="w-fit"
                >
                  Logout
                </Button>
              </>
            ) : (
              <>
                <Link
                  href="signin"
                  className="text-sm font-medium hover:text-primary"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Sign In
                </Link>
                <Link
                  href="/sign-in"
                  className="text-sm font-medium hover:text-primary"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Sign Up
                </Link>
              </>
            )}
          </nav>
        )}
      </div>
    </header>
  );
}
// app/admin/page.tsx
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function AdminLandingPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background p-4">
      <div className="text-center">
        <h1 className="text-3xl font-bold font-headline mb-4">
          Fleet-Box Admin Panel
        </h1>
        <p className="text-lg mb-6">
          Access the admin dashboard to manage users, bookings, and more.
        </p>
        <Button asChild size="lg">
          <Link href="/admin/signin">Sign In as Admin</Link>
        </Button>
      </div>
    </div>
  );
}
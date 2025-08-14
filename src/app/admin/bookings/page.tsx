"use client";

import { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, AlertCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import {
  useGetBookingsQuery,
  useUpdateBookingMutation,
} from "../../../../services/api";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

interface Booking {
  _id: string;
  customerId: { fullName: string };
  driverId: { name: string };
  cabId: { model: string; licensePlate: string };
  pickup: string;
  dropoff: string;
  fare: string;
  status: "Scheduled" | "In Progress" | "Completed" | "Cancelled";
}

export default function BookingsPage() {
  const { toast } = useToast();
  const { data: bookings = [], isLoading, isError, error, refetch } = useGetBookingsQuery(undefined);
  const [updateBooking, { isLoading: isUpdating }] = useUpdateBookingMutation();
  const [searchTerm, setSearchTerm] = useState("");

  const statusOptions: Booking["status"][] = ["Scheduled", "In Progress", "Completed", "Cancelled"];

  const filteredBookings = bookings.filter(
    (booking: Booking) =>
      booking.customerId.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      booking.driverId.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      booking.pickup.toLowerCase().includes(searchTerm.toLowerCase()) ||
      booking.dropoff.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleStatusChange = async (bookingId: string, currentStatus: string) => {
    try {
      const currentIndex = statusOptions.indexOf(currentStatus as Booking["status"]);
      const nextStatus = statusOptions[(currentIndex + 1) % statusOptions.length];
      await updateBooking({ id: bookingId, status: nextStatus }).unwrap();
      toast({
        title: "Status Updated",
        description: `Booking status changed to ${nextStatus}.`,
      });
    } catch (error: any) {
      toast({
        title: "Status Update Failed",
        description: `Error: ${error?.data?.message || "An unexpected error occurred."}`,
        variant: "destructive",
      });
    }
  };

  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <Skeleton width={200} height={24} />
              <Skeleton width={150} height={16} />
            </div>
            <div className="relative">
              <Skeleton width={300} height={36} />
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead><Skeleton width={100} /></TableHead>
                <TableHead><Skeleton width={100} /></TableHead>
                <TableHead><Skeleton width={100} /></TableHead>
                <TableHead className="text-right"><Skeleton width={80} /></TableHead>
                <TableHead className="text-center"><Skeleton width={100} /></TableHead>
                <TableHead><Skeleton width={100} /></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {[...Array(3)].map((_, index) => (
                <TableRow key={index}>
                  <TableCell><Skeleton width={150} /></TableCell>
                  <TableCell><Skeleton width={100} /></TableCell>
                  <TableCell>
                    <Skeleton width={150} />
                    <Skeleton width={120} height={12} />
                  </TableCell>
                  <TableCell className="text-right"><Skeleton width={80} /></TableCell>
                  <TableCell className="text-center"><Skeleton width={100} /></TableCell>
                  <TableCell><Skeleton width={100} /></TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    );
  }

  if (isError) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="font-headline">Booking History</CardTitle>
          <CardDescription>
            View and search all past and current bookings.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col items-center justify-center py-12">
            <AlertCircle className="h-12 w-12 text-destructive mb-4" />
            <h2 className="text-xl font-semibold mb-2">Failed to Load Bookings</h2>
            <p className="text-muted-foreground mb-4">
              {error && "data" in error
                ? (error as any).data?.message || "An error occurred while fetching bookings."
                : "An unexpected error occurred."}
            </p>
            <Button onClick={refetch}>Retry</Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="font-headline">Booking History</CardTitle>
            <CardDescription>
              View and search all past and current bookings.
            </CardDescription>
          </div>
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search bookings..."
              className="pl-8 w-full md:w-[300px]"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Customer</TableHead>
              <TableHead>Driver</TableHead>
              <TableHead>Pickup / Drop-off</TableHead>
              <TableHead className="text-right">Fare</TableHead>
              <TableHead className="text-center">Status</TableHead>
              <TableHead className="text-center">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredBookings.length > 0 ? (
              filteredBookings.map((booking: Booking) => (
                <TableRow key={booking._id}>
                  <TableCell>
                    <div className="font-medium">{booking.customerId.fullName}</div>
                  </TableCell>
                  <TableCell>{booking.driverId.name}</TableCell>
                  <TableCell>
                    <div>{booking.pickup}</div>
                    <div className="text-muted-foreground text-xs">{booking.dropoff}</div>
                  </TableCell>
                  <TableCell className="text-right">{booking.fare}</TableCell>
                  <TableCell className="text-center">
                    <Badge
                      variant={
                        booking.status === "Completed"
                          ? "default"
                          : booking.status === "In Progress"
                          ? "secondary"
                          : booking.status === "Cancelled"
                          ? "destructive"
                          : "outline"
                      }
                      className="capitalize"
                    >
                      {booking.status.toLowerCase()}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-center">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleStatusChange(booking._id, booking.status)}
                      disabled={isUpdating}
                    >
                      Toggle Status
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={6} className="text-center">
                  No bookings found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
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
import { Search } from "lucide-react";

const bookings = [
  { id: 'BK001', customer: 'Alice Johnson', driver: 'John Doe', pickup: '123 Main St, Cityville', dropoff: '456 Oak Ave, Townburg', fare: '$25.50', status: 'Completed' },
  { id: 'BK002', customer: 'Bob Williams', driver: 'Jane Smith', pickup: '789 Pine Ln, Villagetown', dropoff: '101 Maple Dr, Hamletville', fare: '$15.00', status: 'Completed' },
  { id: 'BK003', customer: 'Charlie Brown', driver: 'John Doe', pickup: '212 Elm St, Suburbia', dropoff: '333 Birch Rd, Metrocity', fare: '$45.75', status: 'In Progress' },
  { id: 'BK004', customer: 'Diana Prince', driver: 'Emily Brown', pickup: '454 Spruce Ave, Cityville', dropoff: '565 Cedar Ct, Townburg', fare: '$32.20', status: 'Completed' },
  { id: 'BK005', customer: 'Ethan Hunt', driver: 'Jane Smith', pickup: '787 Willow Way, Villagetown', dropoff: '898 Aspen Pl, Hamletville', fare: '$18.90', status: 'Cancelled' },
  { id: 'BK006', customer: 'Fiona Glenanne', driver: 'Michael Clark', pickup: '321 Oak St, Suburbia', dropoff: '654 Pine Ave, Metrocity', fare: '$55.00', status: 'Scheduled' },
];

export default function BookingsPage() {
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
            <Input type="search" placeholder="Search bookings..." className="pl-8 w-full md:w-[300px]" />
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
            </TableRow>
          </TableHeader>
          <TableBody>
            {bookings.map((booking) => (
              <TableRow key={booking.id}>
                <TableCell>
                  <div className="font-medium">{booking.customer}</div>
                </TableCell>
                <TableCell>{booking.driver}</TableCell>
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
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}

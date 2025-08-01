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
  { id: 'BK001', customer: 'Harshal Mutadak', driver: 'Manish Sonawane', pickup: 'Seawoods Grand Central, Navi Mumbai', dropoff: 'Inorbit Mall, Vashi, Navi Mumbai', fare: '₹350', status: 'Completed' },
  { id: 'BK002', customer: 'Shubham Vanarse', driver: 'Vrutik Patil', pickup: 'Kharghar Valley Golf Course, Navi Mumbai', dropoff: 'Utsav Chowk, Kharghar, Navi Mumbai', fare: '₹200', status: 'Completed' },
  { id: 'BK003', customer: 'Aarav Sharma', driver: 'Manish Sonawane', pickup: 'DY Patil Stadium, Nerul, Navi Mumbai', dropoff: 'Belapur CBD, Navi Mumbai', fare: '₹275', status: 'In Progress' },
  { id: 'BK004', customer: 'Priya Patel', driver: 'Tejas Khairnar', pickup: 'Vashi Railway Station, Navi Mumbai', dropoff: 'Palm Beach Road, Navi Mumbai', fare: '₹180', status: 'Completed' },
  { id: 'BK005', customer: 'Rohan Mehta', driver: 'Vrutik Patil', pickup: 'Airoli Knowledge Park, Navi Mumbai', dropoff: 'Ghansoli, Navi Mumbai', fare: '₹220', status: 'Cancelled' },
  { id: 'BK006', customer: 'Anjali Gupta', driver: 'Sangram Rajput', pickup: 'Panvel, Navi Mumbai', dropoff: 'Juinagar, Navi Mumbai', fare: '₹450', status: 'Scheduled' },
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

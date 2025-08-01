
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MoreHorizontal, PlusCircle, Search } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";

const drivers = [
  {
    id: "DRV001",
    name: "John Doe",
    email: "john.doe@example.com",
    phone: "+1-202-555-0104",
    vehicle: "Toyota Camry",
    status: "Active",
    avatarUrl: "https://placehold.co/40x40.png"
  },
  {
    id: "DRV002",
    name: "Jane Smith",
    email: "jane.smith@example.com",
    phone: "+1-202-555-0162",
    vehicle: "Honda Accord",
    status: "Active",
    avatarUrl: "https://placehold.co/40x40.png"
  },
  {
    id: "DRV003",
    name: "Sam Wilson",
    email: "sam.wilson@example.com",
    phone: "+1-202-555-0185",
    vehicle: "Ford Fusion",
    status: "Inactive",
    avatarUrl: "https://placehold.co/40x40.png"
  },
  {
    id: "DRV004",
    name: "Emily Brown",
    email: "emily.brown@example.com",
    phone: "+1-202-555-0177",
    vehicle: "Chevrolet Malibu",
    status: "Active",
    avatarUrl: "https://placehold.co/40x40.png"
  },
  {
    id: "DRV005",
    name: "Michael Clark",
    email: "michael.clark@example.com",
    phone: "+1-202-555-0199",
    vehicle: "Nissan Altima",
    status: "On-leave",
    avatarUrl: "https://placehold.co/40x40.png"
  },
];

export default function DriversPage() {
  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="font-headline">Drivers</CardTitle>
            <CardDescription>
              Manage your drivers and their information.
            </CardDescription>
          </div>
          <div className="flex items-center gap-4">
             <div className="relative">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input type="search" placeholder="Search drivers..." className="pl-8 w-full md:w-[300px]" />
              </div>
            <Button>
              <PlusCircle className="mr-2 h-4 w-4" /> Add Driver
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Driver</TableHead>
              <TableHead>Vehicle</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Contact</TableHead>
              <TableHead>
                <span className="sr-only">Actions</span>
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {drivers.map((driver) => (
              <TableRow key={driver.id}>
                <TableCell>
                  <div className="flex items-center gap-3">
                    <Avatar>
                      <AvatarImage data-ai-hint="person portrait" src={driver.avatarUrl} alt={driver.name} />
                      <AvatarFallback>{driver.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div className="font-medium">{driver.name}</div>
                  </div>
                </TableCell>
                <TableCell>{driver.vehicle}</TableCell>
                <TableCell>
                  <Badge
                    variant={
                      driver.status === "Active"
                        ? "default"
                        : driver.status === "Inactive"
                        ? "destructive"
                        : "secondary"
                    }
                  >
                    {driver.status}
                  </Badge>
                </TableCell>
                <TableCell>{driver.phone}</TableCell>
                <TableCell>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button aria-haspopup="true" size="icon" variant="ghost">
                        <MoreHorizontal className="h-4 w-4" />
                        <span className="sr-only">Toggle menu</span>
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuLabel>Actions</DropdownMenuLabel>
                      <DropdownMenuItem>Edit</DropdownMenuItem>
                      <DropdownMenuItem>View Details</DropdownMenuItem>
                      <DropdownMenuItem className="text-destructive">Deactivate</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}

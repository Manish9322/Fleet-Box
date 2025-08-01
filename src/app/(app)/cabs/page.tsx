
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
import Image from "next/image";
import { Input } from "@/components/ui/input";

const cabs = [
  {
    id: 'CAB001',
    model: 'Toyota Camry',
    licensePlate: 'NYC-1234',
    location: 'Downtown',
    status: 'Available',
    imageUrl: 'https://placehold.co/64x64.png',
  },
  {
    id: 'CAB002',
    model: 'Honda Accord',
    licensePlate: 'LA-5678',
    location: 'Midtown',
    status: 'Booked',
    imageUrl: 'https://placehold.co/64x64.png',
  },
  {
    id: 'CAB003',
    model: 'Ford Fusion',
    licensePlate: 'CHI-9012',
    location: 'Uptown',
    status: 'Maintenance',
    imageUrl: 'https://placehold.co/64x64.png',
  },
  {
    id: 'CAB004',
    model: 'Chevrolet Malibu',
    licensePlate: 'MIA-3456',
    location: 'Airport',
    status: 'Available',
    imageUrl: 'https://placehold.co/64x64.png',
  },
  {
    id: 'CAB005',
    model: 'Nissan Altima',
    licensePlate: 'SF-7890',
    location: 'Downtown',
    status: 'Available',
    imageUrl: 'https://placehold.co/64x64.png',
  },
];

export default function CabsPage() {
  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="font-headline">Cab Catalog</CardTitle>
            <CardDescription>
              Manage your fleet of cabs.
            </CardDescription>
          </div>
           <div className="flex items-center gap-4">
             <div className="relative">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input type="search" placeholder="Search cabs..." className="pl-8 w-full md:w-[300px]" />
              </div>
              <Button>
                <PlusCircle className="mr-2 h-4 w-4" /> Add Cab
              </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Vehicle</TableHead>
              <TableHead>License Plate</TableHead>
              <TableHead>Current Location</TableHead>
              <TableHead className="text-center">Status</TableHead>
              <TableHead>
                <span className="sr-only">Actions</span>
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {cabs.map((cab) => (
              <TableRow key={cab.id}>
                <TableCell>
                  <div className="flex items-center gap-3">
                    <Image data-ai-hint="car side" src={cab.imageUrl} alt={cab.model} width={40} height={40} className="rounded-md" />
                    <div className="font-medium">{cab.model}</div>
                  </div>
                </TableCell>
                <TableCell>
                  <Badge variant="outline">{cab.licensePlate}</Badge>
                </TableCell>
                <TableCell>{cab.location}</TableCell>
                <TableCell className="text-center">
                  <Badge
                    variant={
                      cab.status === "Available"
                        ? "default"
                        : cab.status === "Booked"
                        ? "secondary"
                        : "destructive"
                    }
                  >
                    {cab.status}
                  </Badge>
                </TableCell>
                <TableCell className="text-right">
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
                      <DropdownMenuItem className="text-destructive">Remove</DropdownMenuItem>
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

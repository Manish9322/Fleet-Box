
"use client"

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
import { MoreHorizontal, Search } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { AddDriverDialog, EditDriverDialog, ViewDriverDialog } from "./_components/driver-dialogs";

const drivers = [
  {
    id: "DRV001",
    name: "Manish Sonawane",
    email: "manish.sonawane@example.com",
    phone: "+91-9876543210",
    vehicle: "Toyota Camry",
    status: "Active",
    avatarUrl: "https://placehold.co/40x40.png"
  },
  {
    id: "DRV002",
    name: "Vrutik Patil",
    email: "vrutik.patil@example.com",
    phone: "+91-9876543211",
    vehicle: "Honda Accord",
    status: "Active",
    avatarUrl: "https://placehold.co/40x40.png"
  },
  {
    id: "DRV003",
    name: "Sangram Rajput",
    email: "sangram.rajput@example.com",
    phone: "+91-9876543212",
    vehicle: "Ford Fusion",
    status: "Inactive",
    avatarUrl: "https://placehold.co/40x40.png"
  },
  {
    id: "DRV004",
    name: "Tejas Khairnar",
    email: "tejas.khairnar@example.com",
    phone: "+91-9876543213",
    vehicle: "Chevrolet Malibu",
    status: "Active",
    avatarUrl: "https://placehold.co/40x40.png"
  },
  {
    id: "DRV005",
    name: "Harshal Mutadak",
    email: "harshal.mutadak@example.com",
    phone: "+91-9876543214",
    vehicle: "Nissan Altima",
    status: "On-leave",
    avatarUrl: "https://placehold.co/40x40.png"
  },
  {
    id: "DRV006",
    name: "Shubham Vanarse",
    email: "shubham.vanarse@example.com",
    phone: "+91-9876543215",
    vehicle: "Hyundai Sonata",
    status: "Active",
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
            <AddDriverDialog />
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Driver</TableHead>
              <TableHead>Vehicle</TableHead>
              <TableHead>Contact</TableHead>
              <TableHead className="text-center">Status</TableHead>
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
                    <div>
                        <div className="font-medium">{driver.name}</div>
                        <div className="text-muted-foreground text-xs">{driver.email}</div>
                    </div>
                  </div>
                </TableCell>
                <TableCell>{driver.vehicle}</TableCell>
                <TableCell>{driver.phone}</TableCell>
                <TableCell className="text-center">
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
                      <EditDriverDialog driver={driver}>
                        <DropdownMenuItem onSelect={(e) => e.preventDefault()}>Edit</DropdownMenuItem>
                      </EditDriverDialog>
                      <ViewDriverDialog driver={driver}>
                        <DropdownMenuItem onSelect={(e) => e.preventDefault()}>View Details</DropdownMenuItem>
                      </ViewDriverDialog>
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

"use client";

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
import {
  AddDriverDialog,
  EditDriverDialog,
  ViewDriverDialog,
} from "./_components/driver-dialogs";
import { useGetDriversQuery, useDeleteDriverMutation } from "../../../../services/api";
import { Skeleton } from "@/components/ui/skeleton";
import { useToast } from "@/hooks/use-toast";

interface Driver {
  _id: string;
  name: string;
  email: string;
  vehicle: string;
  status: string;
  phone: string;
  avatarUrl: string;

}

export default function DriversPage() {
  const { data: drivers, error, isLoading } = useGetDriversQuery(undefined);
  const [deleteDriver, { isLoading: isDeleting }] = useDeleteDriverMutation();

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
              <Input
                type="search"
                placeholder="Search drivers..."
                className="pl-8 w-full md:w-[300px]"
              />
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
            {isLoading &&
              Array.from({ length: 5 }).map((_, index) => (
                <TableRow key={index}>
                  <TableCell>
                    <Skeleton className="h-8 w-32" />
                  </TableCell>
                  <TableCell>
                    <Skeleton className="h-8 w-24" />
                  </TableCell>
                  <TableCell>
                    <Skeleton className="h-8 w-24" />
                  </TableCell>
                  <TableCell className="text-center">
                    <Skeleton className="h-8 w-16 mx-auto" />
                  </TableCell>
                  <TableCell className="text-right">
                    <Skeleton className="h-8 w-8 ml-auto" />
                  </TableCell>
                </TableRow>
              ))}
            {error && (
              <TableRow>
                <TableCell colSpan={5} className="text-center text-destructive">
                  Failed to load drivers.
                </TableCell>
              </TableRow>
            )}
            {drivers &&
              drivers.map((driver : Driver) => (
                <TableRow key={driver._id}>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <Avatar>
                        <AvatarImage
                          data-ai-hint="person portrait"
                          src={driver.avatarUrl}
                          alt={driver.name}
                        />
                        <AvatarFallback>{driver.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="font-medium">{driver.name}</div>
                        <div className="text-muted-foreground text-xs">
                          {driver.email}
                        </div>
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
                    <DropdownMenu modal={false}>
                      <DropdownMenuTrigger asChild>
                        <Button
                          aria-haspopup="true"
                          size="icon"
                          variant="ghost"
                        >
                          <MoreHorizontal className="h-4 w-4" />
                          <span className="sr-only">Toggle menu</span>
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <EditDriverDialog driver={driver}>
                          <DropdownMenuItem
                            onSelect={(e) => e.preventDefault()}
                          >
                            Edit
                          </DropdownMenuItem>
                        </EditDriverDialog>
                        <ViewDriverDialog driver={driver}>
                          <DropdownMenuItem
                            onSelect={(e) => e.preventDefault()}
                          >
                            View Details
                          </DropdownMenuItem>
                        </ViewDriverDialog>
                        <DropdownMenuItem className="text-destructive">
                          Deactivate
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          className="text-destructive"
                          onSelect={async (e) => {
                            e.preventDefault();
                            try {
                              await deleteDriver(driver._id).unwrap();
                              useToast().toast({
                                title: "Driver Deactivated",
                                description: `Driver ${driver.name} has been deactivated.`,
                              });
                            } catch (err) {
                              useToast().toast({
                                title: "Deactivation Failed",
                                description: `Could not deactivate driver ${driver.name}.`,
                                variant: "destructive",
                              });
                            }
                          }}
                        >
                          Deactivate
                        </DropdownMenuItem>
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

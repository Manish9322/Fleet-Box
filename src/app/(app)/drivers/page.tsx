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
import { MoreHorizontal, Search, AlertCircle, PlusCircle } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import {
  AddDriverDialog,
  EditDriverDialog,
  ViewDriverDialog,
} from "./_components/driver-dialogs";
import {
  useGetDriversQuery,
  useDeleteDriverMutation,
} from "../../../../services/api";
import { useToast } from "@/hooks/use-toast";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

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
  const {
    data: drivers = [],
    isLoading,
    isError,
    error,
    refetch,
  } = useGetDriversQuery(undefined);
  const [deleteDriver, { isLoading: isDeleting }] = useDeleteDriverMutation();
  const { toast } = useToast();

  const handleDelete = async (id: string) => {
    try {
      await deleteDriver(id).unwrap();
      toast({
        title: "Driver Deactivated",
        description: "Driver has been deactivated.",
      });
    } catch (err) {
      toast({
        title: "Deactivation Failed",
        description: "Could not deactivate driver.",
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
            <div className="flex items-center gap-4">
              <div className="relative">
                <Skeleton width={300} height={36} />
              </div>
              <Skeleton width={120} height={36} />
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>
                  <Skeleton width={100} />
                </TableHead>
                <TableHead>
                  <Skeleton width={100} />
                </TableHead>
                <TableHead>
                  <Skeleton width={100} />
                </TableHead>
                <TableHead className="text-center">
                  <Skeleton width={100} />
                </TableHead>
                <TableHead>
                  <Skeleton width={50} />
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {[...Array(3)].map((_, index) => (
                <TableRow key={index}>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <Skeleton circle width={40} height={40} />
                      <div>
                        <Skeleton width={100} height={16} />
                        <Skeleton width={80} height={12} />
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Skeleton width={100} />
                  </TableCell>
                  <TableCell>
                    <Skeleton width={100} />
                  </TableCell>
                  <TableCell className="text-center">
                    <Skeleton width={80} />
                  </TableCell>
                  <TableCell className="text-right">
                    <Skeleton width={40} height={40} />
                  </TableCell>
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
          <CardTitle className="font-headline mb-1">Drivers</CardTitle>
          <CardDescription>
            Manage your drivers and their information.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col items-center justify-center py-12">
            <AlertCircle className="h-12 w-12 text-destructive mb-4" />
            <h2 className="text-xl font-semibold mb-2">
              Failed to Load Drivers
            </h2>
            <p className="text-muted-foreground mb-4">
              {error && "data" in error
                ? (error as any).data?.message ||
                  "An error occurred while fetching drivers."
                : "An unexpected error occurred."}
            </p>
            <Button onClick={refetch}>Retry</Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (drivers.length === 0) {
    return (
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="font-headline mb-1">Drivers</CardTitle>
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
          <div className="flex flex-col items-center justify-center py-12">
            <h2 className="text-xl font-semibold mb-2">No Drivers Found</h2>
            <p className="text-muted-foreground mb-4">
              It looks like you haven't added any drivers yet.
            </p>
            <AddDriverDialog>
              <Button>
                <PlusCircle className="mr-2 h-4 w-4" /> Add Your First Driver
              </Button>
            </AddDriverDialog>
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
            <CardTitle className="font-headline mb-1">Drivers</CardTitle>
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
            {drivers.map((driver: Driver) => (
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
                      <Button aria-haspopup="true" size="icon" variant="ghost">
                        <MoreHorizontal className="h-4 w-4" />
                        <span className="sr-only">Toggle menu</span>
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuLabel>Actions</DropdownMenuLabel>
                      <EditDriverDialog driver={driver}>
                        <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
                          Edit
                        </DropdownMenuItem>
                      </EditDriverDialog>
                      <ViewDriverDialog driver={driver}>
                        <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
                          View Details
                        </DropdownMenuItem>
                      </ViewDriverDialog>
                      <DropdownMenuItem
                        className="text-destructive"
                        onSelect={(e) => {
                          e.preventDefault();
                          handleDelete(driver._id);
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

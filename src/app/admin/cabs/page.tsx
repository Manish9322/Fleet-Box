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
import { MoreHorizontal, PlusCircle, Search, AlertCircle } from "lucide-react";
import Image from "next/image";
import { Input } from "@/components/ui/input";
import {
  AddCabDialog,
  EditCabDialog,
  ViewCabDialog,
} from "./_components/cab-dialogs";
import {
  useGetCabsQuery,
  useDeleteCabMutation,
} from "../../../../services/api";
import { useToast } from "@/hooks/use-toast";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

interface Cab {
  _id: string;
  model: string;
  licensePlate: string;
  location: string;
  status: "Available" | "Booked" | "Maintenance";
  imageUrl: string;
}

export default function CabsPage() {
  const {
    data: cabs = [],
    isLoading,
    isError,
    error,
    refetch,
  } = useGetCabsQuery(undefined);
  const [deleteCab] = useDeleteCabMutation();
  const { toast } = useToast();

  const handleDelete = async (id: string) => {
    try {
      await deleteCab(id).unwrap();
      toast({
        title: "Cab Deleted",
        description: "The cab has been successfully deleted.",
      });
    } catch (error: any) {
      toast({
        title: "Deletion Failed",
        description: `Error: ${
          error?.data?.message || "An unexpected error occurred."
        }`,
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
                      <Skeleton width={40} height={40} />
                      <Skeleton width={150} />
                    </div>
                  </TableCell>
                  <TableCell>
                    <Skeleton width={80} />
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
          <CardTitle className="font-headline mb-1">Cab Catalog</CardTitle>
          <CardDescription>Manage your fleet of cabs.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col items-center justify-center py-12">
            <AlertCircle className="h-12 w-12 text-destructive mb-4" />
            <h2 className="text-xl font-semibold mb-2">Failed to Load Cabs</h2>
            <p className="text-muted-foreground mb-4">
              {error && "data" in error
                ? (error as any).data?.message ||
                  "An error occurred while fetching cabs."
                : "An unexpected error occurred."}
            </p>
            <Button onClick={refetch}>Retry</Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (cabs.length === 0) {
    return (
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="font-headline mb-1">Cab Catalog</CardTitle>
              <CardDescription>Manage your fleet of cabs.</CardDescription>
            </div>
            <div className="flex items-center gap-4">
              <div className="relative">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Search cabs..."
                  className="pl-8 w-full md:w-[300px]"
                />
              </div>
              <AddCabDialog>
                <Button>
                  <PlusCircle className="mr-2 h-4 w-4" /> Add Cab
                </Button>
              </AddCabDialog>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col items-center justify-center py-12">
            <h2 className="text-xl font-semibold mb-2">No Cabs Found</h2>
            <p className="text-muted-foreground mb-4">
              It looks like you haven't added any cabs yet.
            </p>
            <AddCabDialog>
              <Button>
                <PlusCircle className="mr-2 h-4 w-4" /> Add Your First Cab
              </Button>
            </AddCabDialog>
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
            <CardTitle className="font-headline mb-1">Cab Catalog</CardTitle>
            <CardDescription>Manage your fleet of cabs.</CardDescription>
          </div>
          <div className="flex items-center gap-4">
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search cabs..."
                className="pl-8 w-full md:w-[300px]"
              />
            </div>
            <AddCabDialog>
              <Button>
                <PlusCircle className="mr-2 h-4 w-4" /> Add Cab
              </Button>
            </AddCabDialog>
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
            {cabs.map((cab: Cab) => (
              <TableRow key={cab._id}>
                <TableCell>
                  <div className="flex items-center gap-3">
                    <Image
                      data-ai-hint="car side"
                      src={cab.imageUrl}
                      alt={cab.model}
                      width={40}
                      height={40}
                      className="rounded-md"
                    />
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
                      <EditCabDialog cab={cab}>
                        <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
                          Edit
                        </DropdownMenuItem>
                      </EditCabDialog>
                      <ViewCabDialog cab={cab}>
                        <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
                          View Details
                        </DropdownMenuItem>
                      </ViewCabDialog>
                      <DropdownMenuItem
                        className="text-destructive"
                        onSelect={(e) => {
                          e.preventDefault();
                          handleDelete(cab._id);
                        }}
                      >
                        Remove
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

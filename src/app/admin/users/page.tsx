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
import { Input } from "@/components/ui/input";
import {
  AddUserDialog,
  EditUserDialog,
  ViewUserDialog,
} from "./_components/user-dialogs";
import {
  useGetUsersQuery,
  useDeleteUserMutation,
} from "../../../../services/api";
import { useToast } from "@/hooks/use-toast";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

interface User {
  _id: string;
  fullName: string;
  email: string;
  gender: string;
  phone: string;
}

export default function UsersPage() {
  const {
    data: users = [],
    isLoading,
    isError,
    error,
    refetch,
  } = useGetUsersQuery(undefined);
  const [deleteUser] = useDeleteUserMutation();
  const { toast } = useToast();

  const handleDelete = async (id: string) => {
    try {
      await deleteUser(id).unwrap();
      toast({
        title: "User Deleted",
        description: "The user has been successfully deleted.",
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
                <TableHead>
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
                    <Skeleton width={150} />
                  </TableCell>
                  <TableCell>
                    <Skeleton width={150} />
                  </TableCell>
                  <TableCell>
                    <Skeleton width={80} />
                  </TableCell>
                  <TableCell>
                    <Skeleton width={100} />
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
          <CardTitle className="font-headline mb-1">User Management</CardTitle>
          <CardDescription>Manage your system users.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col items-center justify-center py-12">
            <AlertCircle className="h-12 w-12 text-destructive mb-4" />
            <h2 className="text-xl font-semibold mb-2">Failed to Load Users</h2>
            <p className="text-muted-foreground mb-4">
              {error && "data" in error
                ? (error as any).data?.message ||
                  "An error occurred while fetching users."
                : "An unexpected error occurred."}
            </p>
            <Button onClick={refetch}>Retry</Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (users.length === 0) {
    return (
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="font-headline mb-1">
                User Management
              </CardTitle>
              <CardDescription>Manage your system users.</CardDescription>
            </div>
            <div className="flex items-center gap-4">
              <div className="relative">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Search users..."
                  className="pl-8 w-full md:w-[300px]"
                />
              </div>
              <AddUserDialog>
                <Button>
                  <PlusCircle className="mr-2 h-4 w-4" /> Add User
                </Button>
              </AddUserDialog>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col items-center justify-center py-12">
            <h2 className="text-xl font-semibold mb-2">No Users Found</h2>
            <p className="text-muted-foreground mb-4">
              It looks like you haven't added any users yet.
            </p>
            <AddUserDialog>
              <Button>
                <PlusCircle className="mr-2 h-4 w-4" /> Add Your First User
              </Button>
            </AddUserDialog>
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
            <CardTitle className="font-headline mb-1">
              User Management
            </CardTitle>
            <CardDescription>Manage your system users.</CardDescription>
          </div>
          <div className="flex items-center gap-4">
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search users..."
                className="pl-8 w-full md:w-[300px]"
              />
            </div>
            <AddUserDialog>
              <Button>
                <PlusCircle className="mr-2 h-4 w-4" /> Add User
              </Button>
            </AddUserDialog>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Full Name</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Gender</TableHead>
              <TableHead>Phone</TableHead>
              <TableHead>
                <span className="sr-only">Actions</span>
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {users.map((user: User) => (
              <TableRow key={user._id}>
                <TableCell>
                  <div className="font-medium">{user.fullName}</div>
                </TableCell>
                <TableCell>
                  <Badge variant="outline">{user.email}</Badge>
                </TableCell>
                <TableCell>{user.gender}</TableCell>
                <TableCell>{user.phone}</TableCell>
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
                      <EditUserDialog user={user}>
                        <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
                          Edit
                        </DropdownMenuItem>
                      </EditUserDialog>
                      <ViewUserDialog user={user}>
                        <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
                          View Details
                        </DropdownMenuItem>
                      </ViewUserDialog>
                      <DropdownMenuItem
                        className="text-destructive"
                        onSelect={(e) => {
                          e.preventDefault();
                          handleDelete(user._id);
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

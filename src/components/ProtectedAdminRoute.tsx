"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useGetCurrentAdminQuery } from "../../services/api"; // <-- use admin query
import { useToast } from "@/hooks/use-toast";

export default function ProtectedAdminRoute({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const { toast } = useToast();
  const [adminId, setAdminId] = useState<string | null>(null);
  const [checked, setChecked] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setAdminId(localStorage.getItem("adminId"));
      setChecked(true);
    }
  }, []);

  const {
    data: user,
    isError: isUserError,
    error: userError,
  } = useGetCurrentAdminQuery(undefined, {
    skip: !adminId || !checked,
  });

  useEffect(() => {
    if (!checked) return;
    if (!adminId) {
      localStorage.removeItem("adminId");
      localStorage.removeItem("adminLoginTimestamp");
      toast({
        title: "Authentication Required",
        description: "Please sign in as admin to access the admin panel.",
        variant: "destructive",
      });
      router.push("/admin/signin");
      return;
    }
    const loginTimestamp = localStorage.getItem("adminLoginTimestamp");
    if (loginTimestamp) {
      const loginTime = parseInt(loginTimestamp, 10);
      const oneDayInMs = 24 * 60 * 60 * 1000;
      if (Date.now() - loginTime > oneDayInMs) {
        localStorage.removeItem("adminId");
        localStorage.removeItem("adminLoginTimestamp");
        toast({
          title: "Admin Session Expired",
          description: "Your admin session has expired. Please sign in again.",
          variant: "destructive",
        });
        router.push("/admin/signin");
      }
    }
  }, [adminId, router, toast, checked]);

  useEffect(() => {
    if (!checked) return;
    if (isUserError) {
      localStorage.removeItem("adminId");
      localStorage.removeItem("adminLoginTimestamp");
      const errorData = userError as { message: string };
      toast({
        title: "Authentication Failed",
        description:
          (errorData && "message" in errorData && errorData.message) ||
          "Please sign in as admin to access the admin panel.",
        variant: "destructive",
      });
      router.push("/admin/signin");
    } else if (user && !user.isAdmin) {
      localStorage.removeItem("adminId");
      localStorage.removeItem("adminLoginTimestamp");
      toast({
        title: "Access Denied",
        description: "You are not authorized to access the admin panel.",
        variant: "destructive",
      });
      router.push("/admin/signin");
    }
  }, [isUserError, userError, user, router, toast, checked]);

  if (!checked || !user || !user.isAdmin) {
    return null;
  }

  return <>{children}</>;
}
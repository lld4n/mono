"use client";
import React from "react";
import { useConvexAuth } from "convex/react";
import Loading from "@/components/Loading/Loading/Loading";

export default function AuthProvider({ children }: { children: React.ReactNode }) {
  const { isAuthenticated } = useConvexAuth();
  return <>{isAuthenticated ? <>{children}</> : <Loading />}</>;
}

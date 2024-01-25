"use client";
import { useConvexAuth } from "convex/react";
import Loading from "@/components/Loading/Loading";
import Secondary from "@/components/Secondary/Secondary";
import Primary from "@/components/Primary/Primary";
export default function Home() {
  const { isLoading, isAuthenticated } = useConvexAuth();
  if (isLoading) {
    return <Loading />;
  }
  if (!isAuthenticated) {
    return <Primary />;
  }
  return <Secondary />;
}

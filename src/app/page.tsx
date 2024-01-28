"use client";
import { useConvexAuth } from "convex/react";
import Loading from "@/components/Global/Loading/Loading";
import Secondary from "@/components/Home/Secondary/Secondary";
import Primary from "@/components/Home/Primary/Primary";
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

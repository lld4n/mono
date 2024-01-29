"use client";
import { useConvexAuth } from "convex/react";
import Secondary from "@/components/Home/Secondary/Secondary";
import Primary from "@/components/Home/Primary/Primary";
import Authors from "@/components/Home/Authors/Authors";
export default function Home() {
  const { isAuthenticated } = useConvexAuth();

  if (!isAuthenticated) {
    return (
      <>
        <Primary />
        <Authors />
      </>
    );
  }
  return (
    <>
      <Secondary />
      <Authors />
    </>
  );
}

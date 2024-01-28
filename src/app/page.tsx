"use client";
import { useConvexAuth } from "convex/react";
import Loading from "@/components/Global/Loading/Loading";
import Secondary from "@/components/Home/Secondary/Secondary";
import Primary from "@/components/Home/Primary/Primary";
import Authors from "@/components/Home/Authors/Authors";
export default function Home() {
  const { isLoading, isAuthenticated } = useConvexAuth();
  if (isLoading) {
    return <Loading />;
  }
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

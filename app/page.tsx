"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function HomePage() {
  const router = useRouter();

  useEffect(() => {
    const hasToken = localStorage.getItem("token");
    router.replace(hasToken ? "/dictionary" : "/login");
  }, [router]);

  return null;
}

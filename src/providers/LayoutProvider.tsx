"use client";

import Footer from "@/components/Footer";
import FullScreenLoader from "@/components/loading/FullScreenLoader";
import Navbar from "@/components/Navbar/Navbar";
import React, { useEffect, useState } from "react";

function LayoutProvider({ children }: { children: React.ReactNode }) {
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 13000);
  }, []);
  if (loading) {
    return <FullScreenLoader />;
  }
  return (
    <>
      <Navbar />
      {children}
      <Footer />
    </>
  );
}

export default LayoutProvider;

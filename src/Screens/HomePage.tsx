"use client";

import React, { useEffect, useState } from "react";
import LandingComponent from "../components/homepage/HeroSection";
import { Achievements } from "@/components/homepage/Achievements";
import Footer from "@/components/Footer";
import WorldMap from "@/components/homepage/WorldMap";
import FlagshipEvents from "@/components/homepage/FlagShipEvents";
import FullScreenLoader from "@/components/loading/FullScreenLoader";
import Trailer from "@/components/homepage/Trailer";
import AboutUs from "@/components/homepage/AboutUs";
import Gallery from "@/components/homepage/Gallery";
import AndroidApp from "@/components/homepage/AndroidApp";
function HomePage() {
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
      <div className="snap-y  overflow-y-auto ">
        <LandingComponent />
        <Trailer />
        <AboutUs />
        <Gallery />
        <FlagshipEvents />
        <Achievements />
        <WorldMap />
        <AndroidApp />
        <Footer />
      </div>
    </>
  );
}

export default HomePage;

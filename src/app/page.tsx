"use client";

import React from "react";
import LandingComponent from "../components/homepage/HeroSection";
import WorldMap from "@/components/homepage/WorldMap";
import FlagshipEvents from "@/components/homepage/FlagShipEvents";
import Trailer from "@/components/homepage/Trailer";
import AboutUs from "@/components/homepage/AboutUs";
import Gallery from "@/components/homepage/Gallery";
import AndroidApp from "@/components/homepage/AndroidApp";
import Fests from "@/components/homepage/Fests";

function HomePage() {
  return (
    <div className="w-full overflow-x-hidden">
      <LandingComponent />
      <Trailer />
      <AboutUs />
      <Gallery />
      <Fests />
      <FlagshipEvents />
      <WorldMap />
      <AndroidApp />
    </div>
  );
}

export default HomePage;
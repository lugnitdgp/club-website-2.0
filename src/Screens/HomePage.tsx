"use client";

import React, { useEffect, useState } from "react";
import LandingComponent from "../components/homepage/HeroSection";
import { Achievements } from "@/components/homepage/Achievements";
import Footer from "@/components/Footer";
import WorldMap from "@/components/homepage/WorldMap";
import FlagshipEvents from "@/components/homepage/FlagShipEvents";
import Trailer from "@/components/homepage/Trailer";
import AboutUs from "@/components/homepage/AboutUs";
import Gallery from "@/components/homepage/Gallery";
import AndroidApp from "@/components/homepage/AndroidApp";
import Fests from "@/components/homepage/Fests";
function HomePage() {
  

 
  return (
    <>
      <div className="snap-y  overflow-y-auto ">
        <LandingComponent />
        <Trailer />
        <AboutUs />
        <Gallery />
        <Fests />
        <FlagshipEvents />
        <Achievements />
        <WorldMap />
        <AndroidApp />
      </div>
    </>
  );
}

export default HomePage;

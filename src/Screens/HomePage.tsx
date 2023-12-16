"use-client";

import Link from "next/link";
import React from "react";
import Image from "next/image";
import { group_photo, mindersnatch } from "../../public/assets";
import LandingComponent from "../components/homepage/LandingComponent";
import { Achievements } from "@/components/homepage/Achievements";
import LandingAbout from "@/components/homepage/LandingAbout";
import LandingEvents from "@/components/homepage/LandingEvents";
function HomePage() {
  return (
    <>
      <div className="snap-y h-screen overflow-y-auto no-scrollbar">
        <LandingComponent />
        <Achievements />
        <LandingAbout />
        <LandingEvents />
      </div>
    </>
  );
}

export default HomePage;

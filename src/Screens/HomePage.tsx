import React from "react";
import LandingComponent from "../components/homepage/LandingComponent";
import { Achievements } from "@/components/homepage/Achievements";
import LandingAbout from "@/components/homepage/LandingAbout";
import LandingEvents from "@/components/homepage/LandingEvents";
import ContactUs from "@/components/homepage/ContactUs";
function HomePage() {
  return (
    <>
      <div className="snap-y  overflow-y-auto ">
        <LandingComponent />
        <Achievements />
        <LandingAbout />
        <LandingEvents />
        <ContactUs />
      </div>
    </>
  );
}

export default HomePage;

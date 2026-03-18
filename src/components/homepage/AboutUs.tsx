"use client";

import React from "react";
import { StickyScroll } from "@/components/ui/sticky-scroll-reveal";
import { content } from "@/components/homepage/about-content";
import SectionTitle from "../Title";

function AboutUs() {
  return (
    <div className="w-full py-16 bg-background transition-colors duration-300">
      <SectionTitle
        title="About Us"
        description="We are a team of passionate developers and designers who love to create amazing things"
      />
      <div className="mt-8 w-full">
        <StickyScroll content={content} />
      </div>
    </div>
  );
}

export default AboutUs;
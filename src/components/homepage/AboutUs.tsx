"use client";

import React, { useEffect, useRef, useState } from "react";
import { StickyScroll } from "@/components/ui/sticky-scroll-reveal";
import { content } from "@/components/homepage/about-content";
import SectionTitle from "../Title";

function AboutUs() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setVisible(true);
        });
      },
      { threshold: 0.1 }
    );
    const el = sectionRef.current;
    if (el) observer.observe(el);
    return () => { if (el) observer.unobserve(el); };
  }, []);

  return (
    <div
      ref={sectionRef}
      className="w-full py-16 bg-background transition-colors duration-300 relative"
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(30px)",
        transition: "opacity 0.7s ease, transform 0.7s ease",
      }}
    >
      <SectionTitle
        title="About Us"
        description="We are a team of passionate developers and designers who love to create amazing things"
      />
      <div className="mt-8 w-full">
        <StickyScroll content={content} />
      </div>
      {/* Seamless bottom blend into Gallery */}
      <div className="absolute bottom-0 left-0 right-0 h-20 pointer-events-none bg-gradient-to-b from-transparent to-blue-200/20 dark:to-blue-900/10" />
    </div>
  );
}

export default AboutUs;
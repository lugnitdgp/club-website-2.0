"use client";

import React, { useEffect, useRef, useState } from "react";
import InteractiveBentoGallery from "../blocks/interactive-bento-gallery";
import SectionTitle from "../Title";

function Gallery() {
  const titleRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const [titleVisible, setTitleVisible] = useState(false);
  const [gridVisible, setGridVisible] = useState(false);

  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            if (entry.target === titleRef.current) setTitleVisible(true);
            if (entry.target === gridRef.current) setGridVisible(true);
          }
        });
      },
      { threshold: 0.1 }
    );
    if (titleRef.current) obs.observe(titleRef.current);
    if (gridRef.current) obs.observe(gridRef.current);
    return () => obs.disconnect();
  }, []);

  const mediaItems = [
    {
      id: 1,
      type: "video",
      title: "Open Source Starter Pack",
      // desc: "Driven, innovative, visionary",
      url: "https://res.cloudinary.com/dogqbjx8a/video/upload/WhatsApp_Video_2025-03-09_at_10.28.58_csakq3.mp4",
      span: "md:col-span-2 md:row-span-4 sm:col-span-2 sm:row-span-3",
    },
    {
      id: 2,
      type: "video",
      title: "ShowDownn",
      // desc: "Adorable loyal companion.",
      url: "https://res.cloudinary.com/dogqbjx8a/video/upload/WhatsApp_Video_2025-03-09_at_10.28.57_nl1hdd.mp4",
      span: "md:col-span-3 md:row-span-3 col-span-2 sm:col-span-3 sm:row-span-3",
    },
    {
      id: 3,
      type: "image",
      title: "Mukti",
      // desc: "Mystical forest trail",
      url: "https://res.cloudinary.com/dogqbjx8a/image/upload/WhatsApp_Image_2025-03-09_at_10.27.27_k8ckl9.jpg",
      span: "md:col-span-2 md:row-span-4 sm:col-span-3 sm:row-span-3",
    },
    {
      id: 4,
      type: "image",
      title: "Club 25-27",
      // desc: "Autumn scenery",
      url: "https://res.cloudinary.com/dogqbjx8a/image/upload/WhatsApp_Image_2025-03-09_at_10.27.29_1_gkl96r.jpg",
      span: "md:col-span-3 md:row-span-3 sm:col-span-2 sm:row-span-3",
    },
    {
      id: 5,
      type: "image",
      title: "Mandatory",
      // desc: "Vibrant feathered charm",
      url: "https://res.cloudinary.com/dogqbjx8a/image/upload/WhatsApp_Image_2025-03-09_at_10.27.29_vw9vgc.jpg",
      span: "md:col-span-2 md:row-span-4 sm:col-span-2 sm:row-span-3",
    },
    {
      id: 6,
      type: "image",
      title: "One more",
      // desc: "Sunny tropical beach",
      url: "https://res.cloudinary.com/dogqbjx8a/image/upload/WhatsApp_Image_2025-03-09_at_10.27.27_1_tsvq4m.jpg",
      span: "md:col-span-3 md:row-span-3 sm:col-span-2 sm:row-span-3",
    },
    {
      id: 7,
      type: "image",
      title: "Shiva Temple",
      // desc: "Peaceful Shiva sanctuary.",
      url: "https://res.cloudinary.com/dogqbjx8a/image/upload/WhatsApp_Image_2025-03-09_at_10.27.30_ugugge.jpg",
      span: "md:col-span-2 md:row-span-4 sm:col-span-2 sm:row-span-3",
    },
  ];

  return (
    <div className="flex flex-col items-center w-full pt-20 pb-16 bg-gradient-to-r from-blue-200/20 to-purple-200/20 dark:from-blue-900/10 dark:to-purple-900/10 transition-colors duration-300">
      <div
        ref={titleRef}
        style={{
          opacity: titleVisible ? 1 : 0,
          transform: titleVisible ? "translateY(0)" : "translateY(24px)",
          transition: "opacity 0.6s ease 0.1s, transform 0.6s ease 0.1s",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <SectionTitle
          title="Linux Gallery"
          description="Fun Fact : You can arrange them the way you like"
        />
      </div>
      <div
        ref={gridRef}
        style={{
          opacity: gridVisible ? 1 : 0,
          transform: gridVisible ? "translateY(0)" : "translateY(32px)",
          transition: "opacity 0.7s ease 0.25s, transform 0.7s ease 0.25s",
          width: "100%",
          maxWidth: "80rem",
          margin: "0 auto",
          padding: "0 1rem",
          marginTop: "1.5rem",
        }}
      >
        <InteractiveBentoGallery
          mediaItems={mediaItems}
          title=""
          description=""
        />
      </div>
    </div>
  );
}

export default Gallery;
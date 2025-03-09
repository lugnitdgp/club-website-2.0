import React from "react";
import { AnimatedGradientText } from "../magicui/animated-gradient-text";
import InteractiveBentoGallery from "../blocks/interactive-bento-gallery";
import SectionTitle from "../Title";

function Gallery() {
  const mediaItems = [
    {
      id: 1,
      type: "video",
      title: "Open Source Starter Pack",
      desc: "Driven, innovative, visionary",
      url: "https://res.cloudinary.com/dogqbjx8a/video/upload/WhatsApp_Video_2025-03-09_at_10.28.58_csakq3.mp4",
      span: "md:col-span-2 md:row-span-4 sm:col-span-2 sm:row-span-3",
    },
    {
      id: 2,
      type: "video",
      title: "ShowDownn",
      desc: "Adorable loyal companion.",
      url: "https://res.cloudinary.com/dogqbjx8a/video/upload/WhatsApp_Video_2025-03-09_at_10.28.57_nl1hdd.mp4",
      span: "md:col-span-3 md:row-span-3 col-span-2 sm:col-span-3 sm:row-span-3",
    },
    {
      id: 3,
      type: "image",
      title: "Mukti",
      desc: "Mystical forest trail",
      url: "https://res.cloudinary.com/dogqbjx8a/image/upload/WhatsApp_Image_2025-03-09_at_10.27.27_k8ckl9.jpg",
      span: "md:col-span-2 md:row-span-4 sm:col-span-3 sm:row-span-3",
    },
    {
      id: 4,
      type: "image",
      title: "Club 25-27",
      desc: "Autumn scenery",
      url: "https://res.cloudinary.com/dogqbjx8a/image/upload/WhatsApp_Image_2025-03-09_at_10.27.29_1_gkl96r.jpg",
      span: "md:col-span-3 md:row-span-3 sm:col-span-2 sm:row-span-3",
    },
    {
      id: 5,
      type: "image",
      title: "Mandatory",
      desc: "Vibrant feathered charm",
      url: "https://res.cloudinary.com/dogqbjx8a/image/upload/WhatsApp_Image_2025-03-09_at_10.27.29_vw9vgc.jpg",
      span: "md:col-span-2 md:row-span-4 sm:col-span-2 sm:row-span-3",
    },
    {
      id: 6,
      type: "image",
      title: "One more ",
      desc: "Sunny tropical beach",
      url: "https://res.cloudinary.com/dogqbjx8a/image/upload/WhatsApp_Image_2025-03-09_at_10.27.27_1_tsvq4m.jpg",
      span: "md:col-span-3 md:row-span-3 sm:col-span-2 sm:row-span-3",
    },
    {
      id: 7,
      type: "image",
      title: "Shiva Temple",
      desc: "Peaceful Shiva sanctuary.",
      url: "https://res.cloudinary.com/dogqbjx8a/image/upload/WhatsApp_Image_2025-03-09_at_10.27.30_ugugge.jpg",
      span: "md:col-span-2 md:row-span-4 sm:col-span-2 sm:row-span-3",
    },
  ];

  return (
    <div className=" flex flex-col items-center  w-full h-[100vh] overflow-y-auto">
      <SectionTitle
        title="Linux Gallery"
        description="Fun Fact : You can arrange them the way you like"
      />

      <InteractiveBentoGallery
        mediaItems={mediaItems}
        title=""
        description=""
      />
    </div>
  );
}

export default Gallery;

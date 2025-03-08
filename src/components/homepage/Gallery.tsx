import React from "react";
import { AnimatedGradientText } from "../magicui/animated-gradient-text";
import InteractiveBentoGallery from "../blocks/interactive-bento-gallery";
import SectionTitle from "../Title";

function Gallery() {
  const mediaItems = [
    {
      id: 1,
      type: "image",
      title: "Anurag Mishra",
      desc: "Driven, innovative, visionary",
      url: "https://kxptt4m9j4.ufs.sh/f/9YHhEDeslzkcbP3rYTiXwH7Y106CepJOsoAgQjyFi3MUfDkh",
      span: "md:col-span-1 md:row-span-3 sm:col-span-1 sm:row-span-2",
    },
    {
      id: 2,
      type: "video",
      title: "Dog Puppy",
      desc: "Adorable loyal companion.",
      url: "https://cdn.pixabay.com/video/2024/07/24/222837_large.mp4",
      span: "md:col-span-2 md:row-span-2 col-span-1 sm:col-span-2 sm:row-span-2",
    },
    {
      id: 3,
      type: "image",
      title: "Forest Path",
      desc: "Mystical forest trail",
      url: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e",
      span: "md:col-span-1 md:row-span-3 sm:col-span-2 sm:row-span-2 ",
    },
    {
      id: 4,
      type: "image",
      title: "Falling Leaves",
      desc: "Autumn scenery",
      url: "https://images.unsplash.com/photo-1506744038136-46273834b3fb",
      span: "md:col-span-2 md:row-span-2 sm:col-span-1 sm:row-span-2 ",
    },
    {
      id: 5,
      type: "video",
      title: "Bird Parrot",
      desc: "Vibrant feathered charm",
      url: "https://cdn.pixabay.com/video/2020/07/30/46026-447087782_large.mp4",
      span: "md:col-span-1 md:row-span-3 sm:col-span-1 sm:row-span-2 ",
    },
    {
      id: 6,
      type: "image",
      title: "Beach Paradise",
      desc: "Sunny tropical beach",
      url: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e",
      span: "md:col-span-2 md:row-span-2 sm:col-span-1 sm:row-span-2 ",
    },
    {
      id: 7,
      type: "video",
      title: "Shiva Temple",
      desc: "Peaceful Shiva sanctuary.",
      url: "https://cdn.pixabay.com/video/2020/05/25/40130-424930032_large.mp4",
      span: "md:col-span-1 md:row-span-3 sm:col-span-1 sm:row-span-2 ",
    },
  ];
  return (
    <div className=" flex flex-col items-center  w-full h-[80vh] overflow-y-auto">
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

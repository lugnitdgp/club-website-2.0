import React from "react";
import { FeatureSteps } from "../blocks/feature-section";
import { aarhn, aavishkar, mukti } from "@/assets";
import SectionTitle from "../Title";

function Fests() {
  const features = [
    {
      step: "Step 1",
      title: "Aavishkar ",
      content:
        "The Official Tech fest of NIT Durgapur held between 2017-2018",
      image: aavishkar,
    },
    {
      step: "Step 1",
      title: "Aarohan",
      content: "The official TechnoManagement fest of NIT Durgapur Organized by Team Aavishkar , 2020 - Present",
      image: aarhn,
    },
    
    {
      step: "Step 3",
      title: "Mukti",
      content:
        "The Official Open Source Conference of NIT Durgapur , organized by us to promote Open Source , 2023 - Present",
      image: mukti,
    },
  ];
  return (
    <div>
      {" "}
      <SectionTitle title="Our Fests" description="The Fests we have organized" />
      <FeatureSteps
        features={features}
        title=""
        autoPlayInterval={3000}
        imageHeight="h-[200px]"
      />
    </div>
  );
}

export default Fests;

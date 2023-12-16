import Image from "next/image";
import {
  group_photo,
  landing_image_1,
  landing_image_2,
  landing_image_3,
} from "../../../public/assets";

const AboutSection = ({ heading, content, image, reverse }: any) => {
  let flexProperty;
  if (reverse)
    flexProperty =
      "md:flex gap-4 justify-between items-center flex-row-reverse ";
  else flexProperty = "md:flex gap-4 justify-between items-center ";
  return (
    <div className={flexProperty}>
      <div className="md:w-[40%]">
        <h2 className="text-4xl font-bold text-onBackground dark:text-onBackgroundDark">
          {heading}
        </h2>
        <p className="mt-6 leading-6 text-sm mb-12 text-onBackground dark:text-onBackgroundDark">
          {content}
        </p>
      </div>
      <div className="relative w-full md:w-[40%] h-max">
        <Image src={image} alt="people" className="w-full h-auto rounded-2" />
      </div>
    </div>
  );
};

const LandingAbout = () => {
  return (
    <div className="snap-start flex flex-col gap-16 md:gap-24 h-full mt-4 justify-between pt-16 px-12 md:px-24 h-max">
      <AboutSection
        heading={
          <>
            <span className="text-primary dark:text-primaryDark">Who</span> We
            Are
          </>
        }
        content={`The GNU/Linux Users' Group, NIT Durgapur is a community of GNU/Linux
            Users that promote the use of Free and Open Source Software. The
            Group was established in 2003 by a bunch of FOSS enthusiasts with
            the idea of popularising and contributing to Open Source. We are a
            plethora of designers, contributors and developers that believe in
            learning and sharing through opening up your mind to Open Source.`}
        image={landing_image_1}
      />
      <AboutSection
        heading={
          <>
            <span className="text-primary dark:text-primaryDark">What</span> We
            Do
          </>
        }
        content={`We provide budding enthusiasts like ourselves a forum to contribute
            and learn about FOSS. Through varied workshops on revolutionary Open
            Technologies throughout the year, we spread the idea of Open Source
            to beginners and veterans alike. We bring people together to ideate
            and contribute to the leading Open technologies. We provide help and
            resources to everyone who wants to make the web world a better
            place.`}
        image={landing_image_2}
        reverse={true}
      />
      <AboutSection
        heading={
          <>
            Our{" "}
            <span className="text-primary dark:text-primaryDark">Vision</span>
          </>
        }
        content={`Being a bunch of FOSS enthusiasts, we preach the idea of “free
            things are the best things” and firmly believe in sharing knowledge.
            We strive to elevate the tech culture in our college and believe
            that this can only be done through giving people digital resources
            and knowledge in all realms from hardware to software and data to
            design. We promote FOSS through various endeavours because we
            believe in the freedom of expression for everyone.`}
        image={landing_image_3}
      />
    </div>
  );
};

export default LandingAbout;

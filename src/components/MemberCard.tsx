import React from "react";
import Image from "next/image";
import { email, facebook, github } from "../../public/assets";
import { motion } from "framer-motion";

const MemberCard = ({ memberObj, index }: any) => {
  return (
    <motion.div
      key={memberObj}
      className=" flex w-max mt-[90px] cursor-pointer"
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      exit={{ y: 20, opacity: 0 }}
      transition={{ duration: 0.3, ease: "easeIn" }}
    >
      <div
        className={
          index % 2 === 0
            ? "text-center relative bg-yellowPrimary dark:bg-secondaryDark dark:text-onSecondaryDark font-medium text-3xl w-[295px] h-[253px] rounded-md px-2"
            : "text-center relative bg-primaryContainer dark:bg-tertiaryDark dark:text-onTertiaryDark font-medium text-3xl w-[295px] h-[253px] rounded-md px-2"
        }
      >
        <div className="absolute left-0 right-0 flex justify-center -top-16 ">
          <motion.div
            className=" w-[153px] h-[153px] relative"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.2 }}
          >
            <Image
              src={memberObj.image}
              alt="member Image"
              width={153}
              height={153}
              loading="lazy"
              blurDataURL={memberObj.blurDataURL || "random"}
              placeholder="blur"
              className="object-contain rounded-full w-[153px] h-[153px]"
            />
          </motion.div>
        </div>
        <motion.div
          className="absolute bottom-4 left-0 right-0"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.1, ease: "easeIn" }}
        >
          <p className="mt-16 text-lg text-center truncate ">
            {memberObj.first_name + " " + memberObj.last_name}
          </p>
          <div>
            <p className="m-2 text-sm font-normal text-center truncate h-9 text-ellipsis">
              {memberObj?.bio?.length > 0 ? memberObj.bio : "GLUG Member"}
            </p>
          </div>
          <motion.div
            className="flex flex-row justify-center h-8 gap-6 items-center  "
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.1, ease: "easeIn" }}
          >

            {memberObj.facebook_link ? <div id="image" className="justify-center  rounded-20xl ">
              <a href={memberObj.facebook_link}>

                <Image src={facebook} alt="" className="object-contain " />
              </a>
            </div> : null}

            {memberObj?.email ? <div id="image" className=" rounded-20xl">
              <a href={`mailto:${memberObj.email}`}>
                <Image src={email} alt="" className="object-contain " />
              </a>
            </div> : null}
            {memberObj.git_link ? <div id="image" className=" rounded-20xl my-">
              <a href={memberObj.git_link}>
                <Image src={github} alt="" className="object-contain " />
              </a>
            </div> : null}
          </motion.div>
        </motion.div>
      </div>
    </motion.div>
  );
};
export default MemberCard;

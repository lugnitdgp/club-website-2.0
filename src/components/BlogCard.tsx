"use client"
import Image from "next/image";
import React from "react";
import { blog_img } from "../../public/assets";
const BlogCard = () => {
    return (
      <>
        <div className="relative flex flex-col items-start justify-start h-full py-8 gap-y-8 text-onBackground dark:text-onBackgroundDark">
          <Image
            src={blog_img}
            alt="err"
            height={1080}
            width={1920}
            className="w-auto max-h-72 rounded-md"
          ></Image>
          <div className="flex flex-col items-start justify-center font-bold text-2xl capitalize ">
            <div>Expressando (Part 1):A real-time sign</div>
            <div>language detection system</div>
          </div>
          <div className="flex flex-row w-full justify-between items-center font-medium text-xl">
            <div>
              <u>7th Sep 2023</u>
            </div>
            <div className="cursor-pointer">
              <u>Read more</u>
            </div>
          </div>
        </div>
      </>
    );
};

export default BlogCard;
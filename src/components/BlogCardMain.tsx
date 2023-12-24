"use client";
import React from "react";
import Image from "next/image";
import { blog_img2 } from "../../public/assets";

const BlogCardMain = () => {
  return (
    <div className="relative flex flex-col md:flex-row items-start justify-start h-full pt-4 pb-8 gap-x-12 px-10">
        <Image
          src={blog_img2}
          alt="err"
          height={1080}
          width={1920}
          className="w-auto max-h-96 rounded-md"
        ></Image>
        <div className="font-bold flex flex-col items-start justiy-evenly h-full text-onBackground dark:text-onBackgroundDark">
          <div className="text-xl">
            <u>7th Sep 2023</u>
          </div>
          <div className="flex flex-col items-start justify-around text-4xl py-8 capitalize">
            <div>Expressando (Part 1):</div>
            <div>A real-time sign </div>
            <div>language detection</div>
            <div>system</div>
          </div>
          <div className="cursor-pointer text-xl">
            <u>Read more</u>
          </div>
        </div>
    </div>
  );
};

export default BlogCardMain;

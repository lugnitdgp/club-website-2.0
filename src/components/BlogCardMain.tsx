"use client";
import React from "react";
import Image from "next/image";
import { blog_img2 } from "../../public/assets";

const BlogCardMain = ({
  imgSrc,
  title,
  desc,
  publish_date,
  blog_url,
}: {
  key: number;
  imgSrc: string;
  title: string;
  desc: string;
  publish_date: string;
  blog_url: string;
}) => {
  return (
    <div className="col-span-2 relative flex flex-col md:flex-row items-center justify-start h-full pt-4 pb-8 gap-x-12 ">
      <Image
        src={imgSrc}
        alt="err"
        height={1080}
        width={1920}
        className="w-1/2 object-contain h-auto rounded-md"
      />
      <div className=" flex flex-col items-start justiy-evenly h-full text-onBackground dark:text-onBackgroundDark">
        <div className="text-xl">
          <u>{publish_date}</u>
        </div>
        <h3 className=" text-4xl py-4 font-bold ">{title}</h3>

        <p>{desc}</p>
        <a href={blog_url} className="cursor-pointer text-sm font-bold mt-4">
          <u>Read more</u>
        </a>
      </div>
    </div>
  );
};

export default BlogCardMain;

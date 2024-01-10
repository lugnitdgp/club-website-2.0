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
    <>
      <div className="hidden md:flex md:col-span-2 relative flex flex-col md:flex-row items-center justify-start h-full pt-4 pb-8 gap-x-12 ">
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
      <div className="md:hidden relative flex flex-col items-center justify-center h-full py-8 gap-y-4  text-onBackground dark:text-onBackgroundDark">
        <Image
          src={imgSrc}
          alt="err"
          height={1080}
          width={1920}
          className="w-auto max-h-72 rounded-md"
        ></Image>
        <h3 className="flex flex-col items-start justify-center font-bold text-2xl  ">
          {title}
        </h3>
        <p className="">{desc}</p>
        <div className="flex flex-row w-full justify-between items-center font-medium text-sm">
          <p>
            <u>{publish_date}</u>
          </p>
          <a href={blog_url} className="cursor-pointer font-bold">
            <u>Read more</u>
          </a>
        </div>
      </div>
    </>
  );
};

export default BlogCardMain;

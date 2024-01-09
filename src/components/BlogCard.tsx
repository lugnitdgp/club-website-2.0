import Image from "next/image";
import React from "react";
import { blog_img } from "../../public/assets";
const BlogCard = ({
  imgSrc,
  title,
  desc,
  publish_date,
  blog_url,
}: {
  imgSrc: string;
  title: string;
  desc: string;
  publish_date: string;
  blog_url: string;
}) => {
  return (
    <>
      <div className="relative flex flex-col items-start justify-start h-full py-8 gap-y-4  text-onBackground dark:text-onBackgroundDark">
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
        <p className="">
          {desc}
        </p>
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

export default BlogCard;

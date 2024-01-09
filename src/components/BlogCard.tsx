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
      <div className="relative flex flex-col items-start justify-start h-full py-8 gap-y-8 text-onBackground dark:text-onBackgroundDark">
        <Image
          src={imgSrc}
          alt="err"
          height={1080}
          width={1920}
          className="w-auto max-h-72 rounded-md"
        ></Image>
        <div className="flex flex-col items-start justify-center font-bold text-2xl capitalize ">
          <h3>{title}</h3>
        </div>
        <div className="flex flex-col items-start justify-center font-bold text-2xl capitalize ">
          <h3>{desc}</h3>
        </div>
        <div className="flex flex-row w-full justify-between items-center font-medium text-xl">
          <p>
            <u>{publish_date}</u>
          </p>
          <div className="cursor-pointer">
            <a href={blog_url}>Read more</a>
          </div>
        </div>
      </div>
    </>
  );
};

export default BlogCard;

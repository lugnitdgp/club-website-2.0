'use client';
import React, { useState } from "react";
import BlogPageTab from "@/components/BlogPageTab";
import BlogCardMain from "@/components/BlogCardMain";
import BlogCard from "@/components/BlogCard";
const Blogpage = () => {
  const [activeTab, setactiveTab] = useState("BLOGS");
  return (
    <div className="h-screen align-middle">
      <div className="flex justify-center pt-8 md:pt-0">
        <div className="w-full mt-10 text-left px-10">
          <div className="text-4xl font-bold md:text-7xl ">
            <span className=" text-onBackground dark:text-onBackgroundDark">
              Our
            </span>
            <span className="text-primary dark:text-primaryDark"> Blogs</span>
          </div>

          <div className="mt-2 text-xl font-normal md:mt-4 text-onBackground dark:text-onBackgroundDark ">
            <p className="">To share. To connect. To create. To inspire.</p>
          </div>
        </div>
      </div>
      <div className="flex justify-center pb-4">
        <div className="flex flex-row justify-around w-full mt-6 md:mt-12 md:w-1/2 ">
          <BlogPageTab
            activeTab={activeTab}
            displayText={"BLOGS"}
            setactiveTab={setactiveTab}
          />

          <BlogPageTab
            activeTab={activeTab}
            displayText={"DEV"}
            setactiveTab={setactiveTab}
          />
        </div>
      </div>

      <div className="flex flex-col w-full justify-center items-center pt-10">
        <BlogCardMain />
        <div className="flex flex-wrap w-full justify-evenly py-10">
          <BlogCard />
          <BlogCard />
          <BlogCard />
          <BlogCard />
          <BlogCard />
          <BlogCard />
        </div>
      </div>
    </div>
  );
};

export default Blogpage;

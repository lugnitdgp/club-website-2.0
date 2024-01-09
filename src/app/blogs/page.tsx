import Blogpage from "@/Screens/Blogpage";
import { fetchDevPosts } from "@/lib/api";
import React from "react";

const blogs = async () => {
  const devArticles = await fetchDevPosts();
  return (
    <>
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
      <Blogpage devArticles={devArticles} />
    </>
  );
};

export default blogs;

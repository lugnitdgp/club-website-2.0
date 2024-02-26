import Blogpage from "@/Screens/Blogpage";
import { fetchBlogs, fetchDevPosts } from "@/lib/api";
import React from "react";
import { Suspense } from "react";
import EventPageLoading from "@/components/loading/EventPageLoading";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: 'Blogs'

}
const FetchAndDisplay = async () => {

  const devArticles = await fetchDevPosts();
  const blogPosts = await fetchBlogs();

  return <Blogpage devArticles={devArticles} blogPosts={blogPosts} />
};

const blogs = () => {
  return (
    <>
      <div className="flex justify-center pt-8 md:pt-0">
        <div className="w-full mt-10 text-center px-10">
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
      <Suspense fallback={<EventPageLoading />}>
        <FetchAndDisplay />
      </Suspense>
    </>
  );
};

export default blogs;

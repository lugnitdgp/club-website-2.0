"use client";

import Blogpage from "@/Screens/Blogpage";
import { fetchBlogs, fetchDevPosts } from "@/lib/api";
import React, { useEffect, useState } from "react";
import EventPageLoading from "@/components/loading/EventPageLoading";

const Blogs = () => {
  const [loading, setLoading] = useState(true);
  const [devArticles, setDevArticles] = useState<any[]>([]);
  const [blogPosts, setBlogPosts] = useState<any[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const fetchedDevArticles = await fetchDevPosts();
      const fetchedBlogPosts = await fetchBlogs();
      setDevArticles(fetchedDevArticles);
      setBlogPosts(fetchedBlogPosts);
      setLoading(false);
    };

    fetchData();
  }, []);

  if (loading) {
    return <EventPageLoading />;
  }

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
      <Blogpage devArticles={devArticles} blogPosts={blogPosts} />
    </>
  );
};

export default Blogs;

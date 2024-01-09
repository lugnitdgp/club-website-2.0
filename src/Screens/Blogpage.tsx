"use client";
import React, { useState } from "react";
import BlogPageTab from "@/components/BlogPageTab";
import BlogCardMain from "@/components/BlogCardMain";
import BlogCard from "@/components/BlogCard";
import Tabs from "@/components/Tabs";
const Blogpage = ({ devArticles }: { devArticles: any }) => {
  const [activeTab, setactiveTab] = useState("DEV");
  return (
    <div className="h-screen align-middle">
      <div className="flex justify-center pb-4">
        <div className="flex flex-row justify-around w-full mt-6 md:mt-12 md:w-1/2 ">
          <Tabs
            tabItems={["DEV", "BLOGS"]}
            tab={activeTab}
            setTab={setactiveTab}
          />
        </div>
      </div>

      <div className="flex flex-col w-full justify-center items-center pt-10">
        <BlogCardMain />
        <div className="flex flex-wrap w-full justify-evenly py-10">
          {devArticles?.map((article: any) => (
            <BlogCard
              imgSrc={article.cover_image}
              title={article.title}
              desc={article.description}
              publish_date={article.readable_publish_date}
              blog_url={article.url}
            />
          ))}
          {/* <BlogCard />
          <BlogCard />
          <BlogCard />
          <BlogCard />
          <BlogCard />
          <BlogCard /> */}
        </div>
      </div>
    </div>
  );
};

export default Blogpage;

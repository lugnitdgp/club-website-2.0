"use client";
import React, { useState } from "react";
import BlogCardMain from "@/components/BlogCardMain";
import BlogCard from "@/components/BlogCard";
import Tabs from "@/components/Tabs";
const Blogpage = ({
  devArticles,
  blogPosts,
}: {
  devArticles: any;
  blogPosts: any;
}) => {
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

      <div className="grid grid-cols-1 md:grid-cols-2 w-10/12 m-auto gap-8">
        {activeTab === "DEV"
          ? devArticles?.map((article: any, index: number) =>
            index === 0 ? (
              <BlogCardMain
                key={index}
                imgSrc={article.cover_image}
                title={article.title}
                desc={article.description}
                publish_date={article.readable_publish_date}
                blog_url={article.url}
               
               
              />
            ) : (

              <BlogCard
                key={index}
                imgSrc={article.cover_image}
                title={article.title}
                desc={article.description}
                publish_date={article.readable_publish_date}
                blog_url={article.url}
               
                
              />
            )
          )
          : null}
        {activeTab === "BLOGS"
          ? blogPosts?.map((article: any, index: number) =>
            index === 0 ? (
              <BlogCardMain
                key={index}
                imgSrc={article.thumbnail_image}
                title={article.title}
                desc={article.description}
                publish_date={article.readable_publish_date}
                blog_url={"/blogs/" + article.id}
                
              />
            ) : (
              <BlogCard
                key={index}
                imgSrc={article.thumbnail_image}
                title={article.title}
                desc={""}
                publish_date={article.readable_publish_date}
                blog_url={"/blogs/" + article.id}
              
            
              />
            )
          )
          : null}
      </div>
    </div>
  );
};

export default Blogpage;

"use client";
import React from "react";
import Image from "next/image";
import { Suspense } from "react";
import { fetchBlogs } from "@/lib/api";
import { useSearchParams,useParams } from "next/navigation"; 
import EventPageLoading from "@/components/loading/EventPageLoading";

const FetchAndDisplay = async ({blogId}:{blogId:string|string[]}) => {
  const blogPosts = await fetchBlogs();
    
  const blogPost = blogPosts.find(
    (article: any, index: number) => article.id == blogId
  );
  return (
    <div className="flex flex-col items-center justify-center px-4 md:px-32 py-4">
      <h1 className="text-3xl font-bold">{blogPost.title}</h1>
      <h3 className="text-xl font-light py-2 italic">{blogPost.author_name}</h3>
      <Image
        src={blogPost.thumbnail_image}
        alt="err"
        height={1080}
        width={1920}
        className="w-auto max-h-96 rounded-md pb-4"
      ></Image>
      <div className="" dangerouslySetInnerHTML={{ __html: blogPost.content_body }} />
    </div>
  );
};

const Page: React.FC = () => {
  const params = useParams();
    return (
    <>
        <FetchAndDisplay blogId = {params.blogId}/>
    </>
  );
};

export default Page;

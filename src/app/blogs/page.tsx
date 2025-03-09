"use client";

import { TextShimmerWave } from "@/components/ui/text-shimmer-wave";
import { useFetchDevArticlesQuery } from "@/store/slices/devArticlesSlice";
import React from "react";
import InteractiveBentoBlogs from "@/components/blocks/interactive-bento-blogs";
import SectionTitle from "@/components/Title";
import DataLoader from "@/components/loading/DataLoader";

function BlogsPage() {
  const { data, isLoading, error } = useFetchDevArticlesQuery({});
  if (isLoading) return <DataLoader text="Loading Blogs data..." />;
  if (error)
    return (
      <div className=" h-[70vh] w-screen text-center">Error loading the Blogs data.</div>
    );
  if (!data)
    return <div className=" h-[70vh] w-screen text-center">No Blogs data found.</div>;

  const mediaItems = data.map((article: any, index: number) => ({
    id: article.id,
    type: "image", // Assuming all articles have images
    title: article.title,
    desc: article.description,
    bg: article.cover_image,
    span:
      index % 3 === 0
        ? "md:col-span-1 md:row-span-3 sm:col-span-1 sm:row-span-2"
        : index % 3 === 1
        ? "md:col-span-2 md:row-span-2 col-span-1 sm:col-span-2 sm:row-span-2"
        : "md:col-span-1 md:row-span-3 sm:col-span-2 sm:row-span-2",
    user: {
      name: article.user.name,
      username: article.user.username,
      profile_image: article.user.profile_image,
      profile_image_90: article.user.profile_image_90,
    },
    organization: article.organization
      ? {
          name: article.organization.name,
          username: article.organization.username,
          profile_image: article.organization.profile_image,
          profile_image_90: article.organization.profile_image_90,
        }
      : null,
    url: article.url,
    canonical_url: article.canonical_url,
    comments_count: article.comments_count,
    public_reactions_count: article.public_reactions_count,
    positive_reactions_count: article.positive_reactions_count,
    tags: article.tags,
  }));

  return (
    <div className="w-[90%] mx-auto flex flex-col gap-10 mt-8 pt-20">
      <SectionTitle
        title="Our Blogs"
        description="We regulary post blogs on our website"
      />
      <div className=" flex flex-col items-center  w-full ">
        <p className=" text-center text-sm text-gray-500">
          Oops! Looks like these are not arranged properly! Can you help us😜{" "}
          <br />
          Althogth they are functional😎{" "}
        </p>
        <InteractiveBentoBlogs
          mediaItems={mediaItems}
          title=""
          description=""
        />
      </div>
    </div>
  );
}

export default BlogsPage;

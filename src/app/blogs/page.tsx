"use client";

import { TextShimmerWave } from "@/components/ui/text-shimmer-wave";
import { useFetchBlogPostsQuery } from "@/store/slices/blogSlice";
import React from "react";
import InteractiveBentoBlogs from "@/components/blocks/interactive-bento-blogs";
import SectionTitle from "@/components/Title";
import DataLoader from "@/components/loading/DataLoader";

function BlogsPage() {
  const { data, isLoading, error } = useFetchBlogPostsQuery();

  if (isLoading) return <DataLoader text="Loading Blogs data..." />;
  
  if (error)
    return (
      <div className="h-[70vh] w-screen flex items-center justify-center">
        <p className="text-red-500 text-lg">Error loading the Blogs data.</p>
      </div>
    );
  
  if (!data || data.length === 0)
    return (
      <div className="h-[70vh] w-screen flex items-center justify-center">
        <p className="text-gray-500 text-lg">No Blogs data found.</p>
      </div>
    );

  // Transform blog posts to match the InteractiveBentoBlogs format
  const mediaItems = data
    .filter((post) => post.show_bool) // Only show posts where show_bool is true
    .map((post, index) => ({
      id: post.id,
      type: "image",
      title: post.title,
      desc: extractTextFromHtml(post.content_body, 150), // Extract plain text from HTML
      bg: post.thumbnail_image,
      span:
        index % 3 === 0
          ? "md:col-span-1 md:row-span-3 sm:col-span-1 sm:row-span-2"
          : index % 3 === 1
          ? "md:col-span-2 md:row-span-2 col-span-1 sm:col-span-2 sm:row-span-2"
          : "md:col-span-1 md:row-span-3 sm:col-span-2 sm:row-span-2",
      user: {
        name: post.author_name,
        username: post.author_name.toLowerCase().replace(/\s+/g, "_"),
        profile_image: "https://ui-avatars.com/api/?name=" + encodeURIComponent(post.author_name),
        profile_image_90: "https://ui-avatars.com/api/?name=" + encodeURIComponent(post.author_name) + "&size=90",
      },
      organization: null,
      url: `/blog/${post.id}`, // Internal blog URL
      canonical_url: `/blog/${post.id}`,
      comments_count: post.comments?.length || 0,
      public_reactions_count: 0,
      positive_reactions_count: 0,
      tags: post.featured ? ["featured"] : [],
      date: new Date(post.date_to_show).toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
      }),
      featured: post.featured,
    }));

  return (
    <div className="w-[90%] mx-auto flex flex-col gap-10 mt-8 pt-20">
      <SectionTitle
        title="Our Blogs"
        description="We regularly post blogs on our website"
      />
      <div className="flex flex-col items-center w-full">
        <p className="text-center text-sm text-gray-500 mb-4">
          Explore our latest blogs and insights from the GLUG community 📝
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

// Helper function to extract plain text from HTML content
function extractTextFromHtml(html: string, maxLength: number = 150): string {
  if (!html) return "";
  
  // Remove HTML tags
  const text = html.replace(/<[^>]*>/g, " ");
  
  // Decode HTML entities
  const decoded = text
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&ldquo;/g, '"')
    .replace(/&rdquo;/g, '"')
    .replace(/&rsquo;/g, "'");
  
  // Clean up extra whitespace
  const cleaned = decoded.replace(/\s+/g, " ").trim();
  
  // Truncate to maxLength
  if (cleaned.length <= maxLength) return cleaned;
  return cleaned.substring(0, maxLength).trim() + "...";
}

export default BlogsPage;
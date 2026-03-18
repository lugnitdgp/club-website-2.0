"use client";

import dynamic from 'next/dynamic';
import DataLoader from "@/components/loading/DataLoader";
import { useFetchLinitQuery } from "@/store/slices/linitSlice";
import React from "react";
import { useState } from "react";
import Image from "next/image";
import { placeholder } from "@/assets";
import SectionTitle from "@/components/Title";

const FlipbookViewer = dynamic(() => import('@/components/linitViewer/FlipbookViewer'), { ssr: false });



function LinitPage() {
  const { data, isLoading, error } = useFetchLinitQuery({});
  const [isViewerOpen, setViewerOpen] = useState(false);
  const [pdf, setPdf] = useState("");

  if (isLoading) return <DataLoader text="Loading Linit editions..." />;
  if (error)
    return (
      <div className="min-h-screen w-full flex items-center justify-center text-center">
        Error loading the Linit editions.
      </div>
    );
  if (!data || data.length === 0)
    return (
      <div className="min-h-screen w-full flex items-center justify-center text-center">
        No Linit edition found.
      </div>
    );

  return (
    <>
      <div className="min-h-screen w-full relative">
        {/* Content Container */}
        <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-16">
          {/* Header Section */}
          <div className="text-center mb-12">
            <SectionTitle
              title="Linit"
              description="GLUG NIT Durgapur • Yearly Magazine on Open Source"
            />
            <p className="text-base md:text-lg text-gray-400 dark:text-gray-400">
              Stories, research, and ideas from the open-source community
            </p>
          </div>


          {/* Linit Editions List */}
          <div className="space-y-8">
            {data.map((linit: any) => (
              <div key={linit.id} className="flex flex-col md:flex-row gap-6 bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 items-center">
                {/* Cover Image Placeholder */}
                <div className="flex-shrink-0">
                  <div className="w-full md:w-48 h-54 bg-gradient-to-br from-gray-200 to-gray-300 dark:from-gray-700 dark:to-gray-800 rounded-lg overflow-hidden">
                    <Image
                      src={placeholder}
                      alt={`${linit.title} cover`}
                      width={192}
                      height={256}
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>

                {/* Content */}
                <div className="flex-grow">
                  <h2 className="text-3xl font-bold mb-2 text-gray-900 dark:text-white">
                    Linit {linit.year_edition}
                  </h2>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">
                    {linit.pages || 68} pages
                  </p>
                  <p className="text-gray-700 dark:text-gray-300 text-base">
                    {linit.description}
                  </p>
                </div>

                {/* Buttons - Right Side */}
                <div className="flex flex-col gap-3 flex-shrink-0">
                  <button
                    onClick={() => {
                      setPdf(linit.document_url);
                      setViewerOpen(true);
                    }}
                    className="px-8 py-3 bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700 text-white font-semibold rounded-full transition-all duration-300 shadow-md hover:shadow-lg whitespace-nowrap"
                  >
                    View
                  </button>
                  <a
                    href={linit.document_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    download
                    className="px-8 py-3 bg-white hover:bg-gray-50 dark:bg-gray-800 dark:hover:bg-gray-700 text-gray-800 dark:text-white font-semibold rounded-full transition-all duration-300 shadow-md hover:shadow-lg border border-gray-200 dark:border-gray-700 text-center whitespace-nowrap"
                  >
                    Download
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <FlipbookViewer
        isOpen={isViewerOpen}
        onClose={() => setViewerOpen(false)}
        pdfURL={pdf}
      />
    </>
  );
}

export default LinitPage;

"use client";

import dynamic from 'next/dynamic';
import DataLoader from "@/components/loading/DataLoader";
import { useFetchLinitQuery } from "@/store/slices/linitSlice";
import React from "react";
import { useState } from "react";
// import FlipbookViewer from "@/components/linitViewer/FlipbookViewer";
import LinitItem from "@/components/linitViewer/linit-item";

const FlipbookViewer = dynamic(() => import('@/components/linitViewer/FlipbookViewer'), { ssr: false });

function LinitPage() {
  const { data, isLoading, error } = useFetchLinitQuery({});
  const [isViewerOpen, setViewerOpen] = useState(false);
  const [pdf, setPdf] = useState("");

  // Debug logging
  React.useEffect(() => {
    console.log("FlipbookViewer state changed - isOpen:", isViewerOpen, "pdfURL:", pdf);
  }, [isViewerOpen, pdf]);

  if (isLoading) return <DataLoader text="Loading Linit editions..." />;
    if (error)
      return (
        <div className=" h-[70vh] w-screen text-center">
          Error loading the Linit editions.
        </div>
      );
    if (!data)
      return (
        <div className=" h-[70vh] w-screen text-center">
          No Linit edition found.
        </div>
      );

  return (
    <div className="min-h-screen w-screen">
      {data && data.length > 0 ? (
        <div className="w-full flex flex-col p-6 mt-16">
          {data.map((linit: any) => {
            console.log("Rendering linit item:", linit.title, "PDF URL:", linit.document_url);
            return (
              <LinitItem
                key={linit.id}
                title={linit.title}
                description={linit.description}
                pdfURL={linit.document_url}
                year={linit.year_edition}
                handleViewerOpen={(open: boolean) => {
                  console.log("handleViewerOpen called with:", open, "PDF:", linit.document_url);
                  setPdf(linit.document_url);
                  setViewerOpen(open);
                }}
              />
            );
          })}
        </div>
      ) : (
        <div className=" h-[70vh] w-screen text-center">
          No Linit edition found.
        </div>
      )}
      <FlipbookViewer
        isOpen={isViewerOpen}
        onClose={() => {
          console.log("Closing viewer");
          setViewerOpen(false);
        }}
        pdfURL={pdf}
      />
    </div>
  );
}

export default LinitPage;

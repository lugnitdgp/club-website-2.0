"use client";

import DataLoader from "@/components/loading/DataLoader";
import { useFetchLinitQuery } from "@/store/slices/linitSlice";
import React from "react";
import { useState } from "react";
import FlipbookViewer from "@/components/linitViewer/FlipbookViewer";
import LinitItem from "@/components/linitViewer/linit-item";

function LinitPage() {
  const { data, isLoading, error } = useFetchLinitQuery({});
  const [isViewerOpen, setViewerOpen] = useState(false);
  const [pdf, setPdf] = useState("");

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
    <div className=" h-[70vh] w-screen">
      {data && data.length > 0 ? (
        <div className="w-full flex flex-col p-6 mt-16">
          {data.map((linit: any) =>
            <LinitItem
              key={linit.id}
              title={linit.title}
              description={linit.description}
              pdfURL={linit.document_url}
              year={linit.year_edition}
              handleViewerOpen={(open: boolean) => {
                setPdf(linit.document_url);
                setViewerOpen(open);
              }}
            />
          )}
        </div>
      ) : (
        <div className=" h-[70vh] w-screen text-center">
          No Linit edition found.
        </div>
      )}
      <FlipbookViewer
        isOpen={isViewerOpen}
        onClose={() => setViewerOpen(false)}
        pdfURL={pdf}
      />
    </div>
  );
}

export default LinitPage;

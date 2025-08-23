import React from "react";
import { Button } from "@heroui/react";
import Link from "next/link";

interface LinitItemProps {
    title: string;
    description: string;
    pdfURL: string;
    year: number;
    handleViewerOpen: (open: boolean) => void;
}

function LinitItem({ title, description, pdfURL, year , handleViewerOpen}: LinitItemProps) {
  return (
    <div className="w-full bg-gradient-to-r from-blue-200/20 to-purple-500/20 border rounded-3xl m-2 p-6 shadow-md hover:shadow-lg transition-shadow duration-300 flex flex-row gap-4 justify-between">
      <div>
        <h2 className="text-2xl font-bold mb-2">{title} ({year})</h2>
        <p className="text-gray-700 mb-4">{description}</p>
      </div>
      <div className="flex flex-row gap-4 justify-end">
        <Button
          as={Link}
          href={pdfURL}
          target="_blank"
          className="bg-amber-400 hover:bg-amber-500 transition-all duration-300 font-semibold px-4 py-6 rounded-3xl"
          size="sm"
          download
        >
          Download
        </Button>
        <Button
          onPress={() => handleViewerOpen(true)}
          className="bg-violet-300 hover:bg-violet-400 transition-all duration-300 font-semibold px-4 py-6 rounded-3xl"
          size="sm"
        >
          View
        </Button>
      </div>
    </div>
  );
}

export default LinitItem;
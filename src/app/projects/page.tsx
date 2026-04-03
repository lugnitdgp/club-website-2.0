"use client";

import DataLoader from "@/components/loading/DataLoader";
import React from "react";
import { useFetchProjectsQuery } from "@/store/slices/projectsSlice";
import SectionTitle from "@/components/Title";
import { CardBody, CardContainer, CardItem } from "@/components/ui/3d-card";
import Image from "next/image";
import Link from "next/link";
import {
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalTrigger,
} from "@/components/ui/animated-modal";
import { Button } from "@/components/ui/button";
import { Code, Link2 } from "lucide-react";

function ProjectPage() {
  const { data, isLoading, error } = useFetchProjectsQuery({});

  const trimDescription = (description: string, maxLength: number) => {
    if (!description) return "";
    if (description.length <= maxLength) return description;
    return description.substring(0, maxLength) + "...";
  };

  if (isLoading) return <DataLoader text="Loading Projects..." />;
  if (error)
    return (
      <div className="h-[70vh] w-screen flex items-center justify-center">
        <p className="text-red-500 text-lg">Error loading projects.</p>
      </div>
    );
  if (!data)
    return (
      <div className="h-[70vh] w-screen flex items-center justify-center">
        <p className="text-gray-500 text-lg">No project found.</p>
      </div>
    );

  return (
    <div className="px-2 sm:px-6 pt-24 pb-12 overflow-x-hidden">
      <SectionTitle
        title="Our Projects"
        description="Explore our open source projects"
      />
      <div className="w-full max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 px-4 sm:px-6 mt-8">
        {data.map((project: any) => (
          <Modal key={project.id}>
            <ModalTrigger className="w-full h-full">
              <CardContainer className="inter-var w-full h-full">
                <CardBody
                  className="
    bg-gray-50 dark:bg-black
    relative group/card
    border border-black/[0.1] dark:border-white/[0.2]
    rounded-xl
    p-6
    w-full h-auto min-h-[420px]
    flex flex-col
    dark:hover:shadow-2xl dark:hover:shadow-emerald-500/[0.1]
    transition-all duration-300
  "
                >
                  <CardItem
                    translateZ="50"
                    className="text-xl font-bold text-neutral-600 dark:text-white mb-3 text-left min-h-[56px] flex items-start w-full"
                  >
                    <span className="line-clamp-2">{project.title}</span>
                  </CardItem>

                  {/* Description - Fixed Height and Left Aligned */}
                  <CardItem
                    translateZ="60"
                    className="text-neutral-500 text-sm dark:text-neutral-300 mb-4 text-left h-[72px] overflow-hidden w-full"
                  >
                    <div
                      className="line-clamp-3"
                      dangerouslySetInnerHTML={{
                        __html: trimDescription(project.description_markdown, 100),
                      }}
                    ></div>
                  </CardItem>

                  {/* Image - Fixed Height */}
                  <CardItem translateZ="100" className="w-full mb-6">
                    {project.image_link ? (
                      <Image
                        src={project.image_link}
                        alt={project.title}
                        height={1000}
                        width={1000}
                        className="h-48 w-full object-cover rounded-xl group-hover/card:shadow-xl"
                      />
                    ) : (
                      <div className="h-48 w-full bg-gray-200 dark:bg-gray-800 rounded-xl flex items-center justify-center">
                        <span className="text-gray-400 text-sm">No image available</span>
                      </div>
                    )}
                  </CardItem>

                  {/* Spacer to push buttons to bottom */}
                  <div className="flex-grow"></div>

                  {/* Buttons - Always at bottom, equal widths */}
                  <div className="flex flex-row gap-3 w-full mt-auto">
                    {project.gitlink && project.hosted_link ? (
                      // Both buttons - split equally
                      <>
                        <CardItem translateZ={20} as="div" className="flex-1">
                          <Link
                            href={project.gitlink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="w-full block"
                          >
                            <Button variant="outline" className="gap-2 rounded-xl w-full h-10">
                              <Code size={18} />
                              Code
                            </Button>
                          </Link>
                        </CardItem>
                        <CardItem translateZ={20} as="div" className="flex-1">
                          <Link
                            href={project.hosted_link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="w-full block"
                          >
                            <Button variant="outline" className="gap-2 rounded-xl w-full h-10">
                              <Link2 size={18} />
                              Demo
                            </Button>
                          </Link>
                        </CardItem>
                      </>
                    ) : project.gitlink ? (
                      // Only GitHub button - full width
                      <CardItem translateZ={20} as="div" className="w-full">
                        <Link
                          href={project.gitlink}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="w-full block"
                        >
                          <Button variant="outline" className="gap-2 rounded-xl w-full h-10">
                            <Code size={18} />
                            View on GitHub
                          </Button>
                        </Link>
                      </CardItem>
                    ) : project.hosted_link ? (
                      // Only Demo button - full width
                      <CardItem translateZ={20} as="div" className="w-full">
                        <Link
                          href={project.hosted_link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="w-full block"
                        >
                          <Button variant="outline" className="gap-2 rounded-xl w-full h-10">
                            <Link2 size={18} />
                            View Live Demo
                          </Button>
                        </Link>
                      </CardItem>
                    ) : null}
                  </div>
                </CardBody>
              </CardContainer>
            </ModalTrigger>

            {/* Modal Content */}
            <ModalBody>
              <ModalContent className="w-full max-w-4xl mx-auto">
                <div className="flex flex-col gap-6 p-6">
                  {/* Modal Title - Centered */}
                  <h2 className="text-2xl sm:text-3xl font-bold text-neutral-800 dark:text-white text-center">
                    {project.title}
                  </h2>

                  {/* Modal Image */}
                  <div className="w-full">
                    {project.image_link ? (
                      <Image
                        src={project.image_link}
                        alt={project.title}
                        height={1000}
                        width={1000}
                        className="h-64 sm:h-80 w-full object-cover rounded-xl shadow-lg"
                      />
                    ) : (
                      <div className="h-64 sm:h-80 w-full bg-gray-200 dark:bg-gray-800 rounded-xl flex items-center justify-center">
                        <span className="text-gray-400">No image available</span>
                      </div>
                    )}
                  </div>

                  {/* Modal Description - Left Aligned */}
                  <div className="w-full">
                    <h3 className="text-lg font-semibold text-neutral-700 dark:text-neutral-200 mb-3 text-left">
                      Description
                    </h3>
                    <div
                      className="prose prose-sm dark:prose-invert max-w-none overflow-y-auto max-h-[40vh] text-neutral-600 dark:text-neutral-300 leading-relaxed text-left"
                      dangerouslySetInnerHTML={{
                        __html: project.description_markdown,
                      }}
                    ></div>
                  </div>

                  {/* Modal Links - Equal Width Buttons */}
                  <div className="flex flex-col sm:flex-row gap-4 pt-4 border-t border-gray-200 dark:border-gray-700">
                    {project.gitlink && (
                      <Link
                        href={project.gitlink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1"
                      >
                        <Button variant="outline" className="w-full gap-2 rounded-xl h-11">
                          <Code size={18} />
                          View on GitHub
                        </Button>
                      </Link>
                    )}
                    {project.hosted_link && (
                      <Link
                        href={project.hosted_link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1"
                      >
                        <Button className="w-full gap-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 h-11">
                          <Link2 size={18} />
                          View Live Demo
                        </Button>
                      </Link>
                    )}
                  </div>
                </div>
              </ModalContent>
            </ModalBody>
          </Modal>
        ))}
      </div>
    </div>
  );
}

export default ProjectPage;
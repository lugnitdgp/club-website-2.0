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

function ProjectPage() {
  const { data, isLoading, error } = useFetchProjectsQuery({});

  const trimDescription = (description: string, maxLength: number) => {
    if (description.length <= maxLength) return description;
    return description.substring(0, maxLength) + "...";
  };

  if (isLoading) return <DataLoader text="Loading Projects..." />;
  if (error)
    return (
      <div className=" h-[70vh] w-screen text-center">
        Error loading projects.
      </div>
    );
  if (!data)
    return (
      <div className=" h-[70vh] w-screen text-center">
        No project found.
      </div>
    );

  return (
    <div className="p-6 pt-24">
      <SectionTitle
        title="Our Projects"
        description="Explore our open source projects"
      />
      <div className="w-[90%] mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 p-6">
        {data.map((project: any) => (
          <Modal key={project.id}>
            <ModalTrigger>
              <CardContainer className="inter-var hover:shadow-lg min-w-3xl">
                <CardBody className="bg-gray-50 relative group/card dark:hover:shadow-2xl dark:hover:shadow-emerald-500/[0.1] dark:bg-black dark:border-white/[0.2] border-black/[0.1] min-w-7xl h-auto rounded-xl p-6 border">
                  <CardItem
                    translateZ="50"
                    className="text-xl font-bold text-neutral-600 dark:text-white"
                  >
                    {project.title}
                  </CardItem>
                  <CardItem
                    translateZ="60"
                    className="text-neutral-500 text-sm max-w-sm mt-2 dark:text-neutral-300"
                  >
                    <div
                      dangerouslySetInnerHTML={{
                        __html: trimDescription(project.description_markdown, 100),
                      }}
                    ></div>
                  </CardItem>
                  <CardItem translateZ="100" className="w-full mt-4">
                    <Image
                      src={project.image_link}
                      alt={project.title}
                      height={1000}
                      width={1000}
                      className="h-60 w-full object-cover rounded-xl group-hover/card:shadow-xl"
                    />
                  </CardItem>
                  <div className="flex flex-col mt-8 gap-2">
                    {project.gitlink && (
                      <CardItem
                        translateZ={20}
                        as={Link}
                        href={project.gitlink}
                        className="text-blue-500"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        GitHub Repo
                      </CardItem>
                    )}
                    {project.hosted_link && (
                      <CardItem
                        translateZ={20}
                        as={Link}
                        href={project.hosted_link}
                        className="text-green-600"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        Live Demo
                      </CardItem>
                    )}
                  </div>
                </CardBody>
              </CardContainer>
            </ModalTrigger>
            <ModalBody>
              <ModalContent className="w-full h-full flex flex-col justify-center items-center gap-3 overflow-y-scroll">
                <div className="text-xl font-bold text-neutral-600 dark:text-white">
                  {project.title}
                </div>
                <Image
                  src={project.image_link}
                  alt={project.title}
                  height={1000}
                  width={1000}
                  className="h-60 w-full object-cover rounded-xl group-hover/card:shadow-xl"
                />
                <div
                  className="h-[40vh] overflow-y-scroll"
                  dangerouslySetInnerHTML={{
                    __html: project.description_markdown,
                  }}
                ></div>
                <div className="flex flex-col mt-3 gap-2">
                  {project.gitlink && (
                    <Link
                      href={project.gitlink}
                      className="text-blue-500"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      GitHub Repo
                    </Link>
                  )}
                  {project.hosted_link && (
                    <Link
                      href={project.hosted_link}
                      className="text-green-600"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Live Demo
                    </Link>
                  )}
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
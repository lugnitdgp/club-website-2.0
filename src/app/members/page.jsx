"use client";

import React from "react";
import { useFetchMembersQuery } from "@/store/slices/membersSlice";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import SectionTitle from "@/components/Title";
import { placeholder } from "@/assets";
import { FaFacebook, FaGithub, FaLinkedin } from "react-icons/fa";
import DataLoader from "@/components/loading/DataLoader";

function MembersPage() {
  const { data, isLoading, error } = useFetchMembersQuery({});

  if (isLoading) return <DataLoader text="Loading members data..." />;
  if (error)
    return (
      <div className=" h-[70vh] w-screen text-center">Error loading the members data.</div>
    );
  if (!data)
    return <div className=" h-[70vh] w-screen text-center">No members data found.</div>;

  const fourthYearMembers = data.filter((member) => member.year_name === 4);
  const thirdYearMembers = data.filter((member) => member.year_name === 3);
  const secondYearMembers = data.filter((member) => member.year_name === 2);

  const renderMemberCards = (members) => {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 mt-8">
        {members.map((member) => (
          <div
            key={member.id}
            className={`shadow-lg p-6 rounded-xl bg-gradient-to-r ${
              member.id % 3 === 0
                ? "from-blue-500/5 to-purple-500/5"
                : member.id % 3 === 1
                ? "from-orange-500/5 to-yellow-500/5"
                : "from-pink-500/5 to-purple-500/5"
            }`}
          >
            <div className="flex flex-col items-center mb-4">
              <Image
                src={member.image || placeholder}
                alt={`${member.first_name} ${member.last_name}`}
                width={160}
                height={160}
                className="w-24 h-24 object-cover rounded-full mb-4"
              />
              <div className="text-xl font-bold text-neutral-600 dark:text-white">
                {member.first_name} {member.last_name}
              </div>
            </div>

            <div className="border-t border-gray-200 dark:border-gray-700 pt-4">
              {/* {member.bio && (
                <p className="text-gray-600 dark:text-gray-300 mb-4">
                  {member.bio}
                </p>
              )} */}
              <p className="text-gray-600 dark:text-gray-300 mb-2 text-center">
                {member.email}
              </p>
              <div className="flex justify-center items-center space-x-4 mt-4">
                {member.git_link && (
                  <Link
                    href={member.git_link || "#"}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-700 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white cursor-pointer"
                  >
                    <FaGithub className=" text-xl" />
                  </Link>
                )}
                {member.linkedin_link && (
                  <Link
                    href={member.linkedin_link || "#"}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-700 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white cursor-pointer"
                  >
                    <FaLinkedin className=" text-xl" />
                  </Link>
                )}
                {member.facebook_link && (
                  <Link
                    href={member.facebook_link || "#"}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-700 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white cursor-pointer"
                  >
                    <FaFacebook className=" text-xl" />
                  </Link>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  };

  return (
    <section className="mt-8 pt-20">
      <div className="w-[90%] mx-auto">
        <div className="flex flex-col items-center gap-4 text-center">
          <SectionTitle
            title="Meet Our Members"
            description="No of us is smarter than all of us"
          />
        </div>

        <div className="mx-auto mt-8 max-w-screen-2xl rounded-2xl bg-muted/70 p-6 lg:p-16">
          <div className="text-center">
            <h2 className="text-2xl font-semibold">Fourth Year Members</h2>
            <p className="text-muted-foreground">
              Our senior members leading the way
            </p>
          </div>
          {renderMemberCards(fourthYearMembers)}

          <div className="text-center my-10">
            <h2 className="text-2xl font-semibold">Third Year Members</h2>
            <p className="text-muted-foreground">
              Our experienced members contributing to the club
            </p>
          </div>
          {renderMemberCards(thirdYearMembers)}

          <div className="text-center my-10">
            <h2 className="text-2xl font-semibold">Second Year Members</h2>
            <p className="text-muted-foreground">
              Our enthusiastic members growing with the club
            </p>
          </div>
          {renderMemberCards(secondYearMembers)}
        </div>
      </div>
    </section>
  );
}

export default MembersPage;

"use client";

import React, { useRef } from "react";
import Link from "next/link";
import SectionTitle from "@/components/Title";
import { FaFacebook, FaGithub, FaLinkedin } from "react-icons/fa";
import PixelCard from "@/components/PixelCard";
// import ProfileCard from "./ProfileCard";
import { useFetchMembersQuery } from "@/store/slices/membersSlice";
import DataLoader from "@/components/loading/DataLoader";

function MemberCard({ member, variant }) {
  const cardRef = useRef(null);

  const handleMouseMove = (e) => {
    const card = cardRef.current;
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const cx = rect.width / 2;
    const cy = rect.height / 2;
    const rotateX = ((y - cy) / cy) * -10;
    const rotateY = ((x - cx) / cx) * 10;
    card.style.transform = `perspective(800px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(10px) scale(1.03)`;
    card.style.boxShadow = `${-rotateY * 2}px ${rotateX * 2}px 40px rgba(0,0,0,0.15)`;
  };

  const handleMouseLeave = () => {
    const card = cardRef.current;
    if (!card) return;
    card.style.transform = "perspective(800px) rotateX(0deg) rotateY(0deg) translateZ(0px) scale(1)";
    card.style.boxShadow = "0px 4px 20px rgba(0,0,0,0.08)";
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        transform: "perspective(800px) rotateX(0deg) rotateY(0deg)",
        transition: "transform 0.15s ease-out, box-shadow 0.15s ease-out",
        boxShadow: "0px 4px 20px rgba(0,0,0,0.08)",
        borderRadius: "25px",
        willChange: "transform",
        width: "300px",
        height: "400px",
        flexShrink: 0,
      }}
    >
      <PixelCard variant={variant}>
        <div className="absolute inset-0 flex flex-col items-center justify-center p-4 text-center gap-2">
          {member.image ? (
            <img
              src={member.image}
              alt={`${member.first_name} ${member.last_name}`}
              className="w-36 h-36 object-cover object-top rounded-full mb-3 border-4 border-white/50 shadow-2xl"
              onError={(e) => { e.currentTarget.style.display = "none"; }}
            />
          ) : (
            <div className="w-36 h-36 rounded-full mb-3 border-4 border-white/50 shadow-2xl bg-gradient-to-br from-purple-200 to-blue-200 flex items-center justify-center text-4xl font-bold text-gray-600">
              {member.first_name?.[0]}{member.last_name?.[0]}
            </div>
          )}
          <div className="text-xl font-bold text-neutral-700 dark:text-white leading-tight">
            {member.first_name} {member.last_name}
          </div>
          {member.bio && (
            <p className="text-gray-500 dark:text-gray-300 text-sm mt-1 font-medium line-clamp-2 px-2">
              {member.bio}
            </p>
          )}
          <div className="w-full border-t border-gray-200 dark:border-gray-600 my-3" />
          <p className="text-gray-500 dark:text-gray-400 text-sm truncate w-full text-center mb-2 px-2">
            {member.email}
          </p>
          <div className="flex justify-center items-center space-x-6 mt-1">
            {member.git_link && (
              <Link href={member.git_link} target="_blank" rel="noopener noreferrer"
                className="text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white transition-colors">
                <FaGithub className="text-3xl" />
              </Link>
            )}
            {member.linkedin_link && (
              <Link href={member.linkedin_link} target="_blank" rel="noopener noreferrer"
                className="text-gray-600 hover:text-blue-600 dark:text-gray-300 dark:hover:text-blue-400 transition-colors">
                <FaLinkedin className="text-3xl" />
              </Link>
            )}
            {member.facebook_link && (
              <Link href={member.facebook_link} target="_blank" rel="noopener noreferrer"
                className="text-gray-600 hover:text-blue-500 dark:text-gray-300 dark:hover:text-blue-400 transition-colors">
                <FaFacebook className="text-3xl" />
              </Link>
            )}
          </div>
        </div>
      </PixelCard>
    </div>
  );
}

function MembersPage() {
  const { data, isLoading, error } = useFetchMembersQuery({});

  if (isLoading) return <DataLoader text="Loading members data..." />;
  if (error)
    return (
      <div className="h-[70vh] w-screen text-center">
        Error loading the members data.
      </div>
    );
  if (!data)
    return (
      <div className="h-[70vh] w-screen text-center">
        No members data found.
      </div>
    );

  const fourthYearMembers = data.filter((member) => member.year_name === 4);
  const thirdYearMembers = data.filter((member) => member.year_name === 3);
  const secondYearMembers = data.filter((member) => member.year_name === 2);
  const firstYearMembers = data.filter((member) => member.year_name === 1);

  const getVariant = (id) => {
    const variants = ["pink", "blue", "yellow"];
    return variants[id % 3];
  };

  const renderMemberCards = (members) => {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 mt-8">
        {members
          .sort((a, b) => a.first_name.localeCompare(b.first_name))
          .map((member) => (
            <MemberCard key={member.id} member={member} variant={getVariant(member.id)} />
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
            <p className="text-muted-foreground">Our senior members leading the way</p>
          </div>
          {renderMemberCards(fourthYearMembers)}

          <div className="text-center my-10">
            <h2 className="text-2xl font-semibold">Third Year Members</h2>
            <p className="text-muted-foreground">Our experienced members contributing to the club</p>
          </div>
          {renderMemberCards(thirdYearMembers)}

          <div className="text-center my-10">
            <h2 className="text-2xl font-semibold">Second Year Members</h2>
            <p className="text-muted-foreground">Our enthusiastic members growing with the club</p>
          </div>
          {renderMemberCards(secondYearMembers)}

          {firstYearMembers && firstYearMembers.length > 0 && (
            <>
              <div className="text-center my-10">
                <h2 className="text-2xl font-semibold">First Year Members</h2>
                <p className="text-muted-foreground">Our enthusiastic members growing with the club</p>
              </div>
              {renderMemberCards(firstYearMembers)}
            </>
          )}
        </div>
      </div>
    </section>
  );
}

export default MembersPage;
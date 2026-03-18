"use client";

import React, { useRef } from "react";
import Link from "next/link";
import SectionTitle from "@/components/Title";
import { FaFacebook, FaGithub, FaLinkedin } from "react-icons/fa";
import { useFetchMembersQuery } from "@/store/slices/membersSlice";
import DataLoader from "@/components/loading/DataLoader";
import dynamic from "next/dynamic";

const PixelCard = dynamic(() => import("@/components/PixelCard"), { ssr: false });

function MemberCard({ member, variant }) {
  const cardRef = useRef(null);

  const handleMouseMove = (e) => {
    const card = cardRef.current;
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const rotateX = (((e.clientY - rect.top) - rect.height / 2) / (rect.height / 2)) * -8;
    const rotateY = (((e.clientX - rect.left) - rect.width / 2) / (rect.width / 2)) * 8;
    card.style.transform = `perspective(800px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(8px) scale(1.02)`;
    card.style.boxShadow = `${-rotateY * 1.5}px ${rotateX * 1.5}px 32px rgba(0,0,0,0.12)`;
  };

  const handleMouseLeave = () => {
    const card = cardRef.current;
    if (!card) return;
    card.style.transform = "perspective(800px) rotateX(0deg) rotateY(0deg) translateZ(0px) scale(1)";
    card.style.boxShadow = "0px 2px 16px rgba(0,0,0,0.07)";
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        transform: "perspective(800px) rotateX(0deg) rotateY(0deg)",
        transition: "transform 0.15s ease-out, box-shadow 0.15s ease-out",
        boxShadow: "0px 2px 16px rgba(0,0,0,0.07)",
        borderRadius: "25px",
        willChange: "transform",
        height: "420px",
      }}
    >
      <PixelCard variant={variant}>
        <div className="absolute inset-0 flex flex-col items-center justify-between p-5 text-center">
          {/* Top section */}
          <div className="flex flex-col items-center gap-1 flex-1 justify-center">
            {member.image ? (
              <img
                src={member.image}
                alt={`${member.first_name} ${member.last_name}`}
                className="w-28 h-28 object-cover object-top rounded-full border-4 border-white/60 shadow-xl"
                onError={(e) => { e.currentTarget.style.display = "none"; }}
              />
            ) : (
              <div className="w-28 h-28 rounded-full border-4 border-white/60 shadow-xl bg-gradient-to-br from-purple-200 to-blue-200 flex items-center justify-center text-3xl font-bold text-gray-600">
                {member.first_name?.[0]}{member.last_name?.[0]}
              </div>
            )}
            <div className="text-base font-bold text-neutral-700 dark:text-white leading-tight mt-2">
              {member.first_name} {member.last_name}
            </div>
            {member.bio && (
              <p className="text-gray-500 dark:text-gray-300 text-xs font-medium line-clamp-2 px-2 leading-relaxed mt-1">
                {member.bio}
              </p>
            )}
          </div>
          {/* Bottom section */}
          <div className="w-full">
            <div className="w-full border-t border-gray-200/70 dark:border-gray-600/70 mb-3" />
            <p className="text-gray-400 dark:text-gray-400 text-xs truncate w-full text-center mb-3 px-2">
              {member.email}
            </p>
            <div className="flex justify-center items-center gap-5">
              {member.git_link && (
                <Link href={member.git_link} target="_blank" rel="noopener noreferrer"
                  className="text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white transition-colors">
                  <FaGithub className="text-xl" />
                </Link>
              )}
              {member.linkedin_link && (
                <Link href={member.linkedin_link} target="_blank" rel="noopener noreferrer"
                  className="text-gray-500 hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-400 transition-colors">
                  <FaLinkedin className="text-xl" />
                </Link>
              )}
              {member.facebook_link && (
                <Link href={member.facebook_link} target="_blank" rel="noopener noreferrer"
                  className="text-gray-500 hover:text-blue-500 dark:text-gray-400 dark:hover:text-blue-400 transition-colors">
                  <FaFacebook className="text-xl" />
                </Link>
              )}
            </div>
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
    return <div className="h-[70vh] w-screen text-center">Error loading the members data.</div>;
  if (!data)
    return <div className="h-[70vh] w-screen text-center">No members data found.</div>;

  const fourthYearMembers = data.filter((m) => m.year_name === 4);
  const thirdYearMembers  = data.filter((m) => m.year_name === 3);
  const secondYearMembers = data.filter((m) => m.year_name === 2);
  const firstYearMembers  = data.filter((m) => m.year_name === 1);

  const getVariant = (id) => ["pink", "blue", "yellow"][id % 3];

  const renderMemberCards = (members) => (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mt-8">
      {members
        .sort((a, b) => a.first_name.localeCompare(b.first_name))
        .map((member) => (
          <MemberCard key={member.id} member={member} variant={getVariant(member.id)} />
        ))}
    </div>
  );

  const Section = ({ title, subtitle, members }) => (
    <>
      <div className="text-center my-10 first:mt-0">
        <h2 className="text-2xl font-semibold">{title}</h2>
        <p className="text-muted-foreground">{subtitle}</p>
      </div>
      {renderMemberCards(members)}
    </>
  );

  return (
    <section className="mt-8 pt-20">
      <div className="w-[90%] mx-auto">
        <div className="flex flex-col items-center gap-4 text-center">
          <SectionTitle title="Meet Our Members" description="No of us is smarter than all of us" />
        </div>
        <div className="mx-auto mt-8 max-w-screen-2xl rounded-2xl bg-muted/70 p-6 lg:p-12">
          <Section title="Fourth Year Members" subtitle="Our senior members leading the way" members={fourthYearMembers} />
          <Section title="Third Year Members" subtitle="Our experienced members contributing to the club" members={thirdYearMembers} />
          <Section title="Second Year Members" subtitle="Our enthusiastic members growing with the club" members={secondYearMembers} />
          {firstYearMembers.length > 0 && (
            <Section title="First Year Members" subtitle="Our newest members joining the club" members={firstYearMembers} />
          )}
        </div>
      </div>
    </section>
  );
}

export default MembersPage;
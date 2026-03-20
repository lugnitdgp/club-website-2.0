"use client";

import React, { useRef, useState, useEffect } from "react";
import Link from "next/link";
import SectionTitle from "@/components/Title";
import { FaFacebook, FaGithub, FaLinkedin } from "react-icons/fa";
import { useFetchMembersQuery } from "@/store/slices/membersSlice";
import DataLoader from "@/components/loading/DataLoader";
import dynamic from "next/dynamic";
import { useTheme } from "next-themes";
import { PixelatedCanvas } from "@/components/ui/pixelated-canvas";

const PixelCard = dynamic(() => import("@/components/PixelCard"), { ssr: false });

function MemberCard({ member, variant }) {
  const cardRef = useRef(null);
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  const isDark = mounted && resolvedTheme === "dark";

  const handleMouseMove = (e) => {
    const card = cardRef.current;
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const rotateX = (((e.clientY - rect.top) - rect.height / 2) / (rect.height / 2)) * -8;
    const rotateY = (((e.clientX - rect.left) - rect.width / 2) / (rect.width / 2)) * 8;
    card.style.transform = `perspective(800px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(8px) scale(1.02)`;
    card.style.boxShadow = isDark
      ? `${-rotateY * 1.5}px ${rotateX * 1.5}px 32px rgba(255,255,255,0.08), 0 0 20px rgba(255,255,255,0.05)`
      : `${-rotateY * 1.5}px ${rotateX * 1.5}px 32px rgba(0,0,0,0.12)`;
  };

  const handleMouseLeave = () => {
    const card = cardRef.current;
    if (!card) return;
    card.style.transform = "perspective(800px) rotateX(0deg) rotateY(0deg) translateZ(0px) scale(1)";
    card.style.boxShadow = isDark
      ? "0 0 0 1.5px rgba(255,255,255,0.15), 0 0 18px rgba(255,255,255,0.07)"
      : "0px 2px 16px rgba(0,0,0,0.07)";
  };

  const cardContent = (
    <div className="absolute inset-0 flex flex-col items-center justify-between p-5 text-center">
      {/* Top section */}
      <div className="flex flex-col items-center gap-1 flex-1 justify-center">
        {member.image ? (
          <img
            src={member.image}
            alt={`${member.first_name} ${member.last_name}`}
            className={`w-28 h-28 object-cover object-top rounded-full border-4 shadow-xl ${
              isDark ? "border-white/30" : "border-white/60"
            }`}
            onError={(e) => { e.currentTarget.style.display = "none"; }}
          />
        ) : (
          <div className={`w-28 h-28 rounded-full border-4 shadow-xl bg-gradient-to-br flex items-center justify-center text-3xl font-bold ${
            isDark
              ? "border-white/20 from-indigo-900 to-blue-900 text-white"
              : "border-white/60 from-purple-200 to-blue-200 text-gray-600"
          }`}>
            {member.first_name?.[0]}{member.last_name?.[0]}
          </div>
        )}
        <div className={`text-base font-bold leading-tight mt-2 ${isDark ? "text-white" : "text-neutral-700"}`}>
          {member.first_name} {member.last_name}
        </div>
        {member.bio && (
          <p className={`text-xs font-medium line-clamp-2 px-2 leading-relaxed mt-1 ${isDark ? "text-gray-300" : "text-gray-500"}`}>
            {member.bio}
          </p>
        )}
      </div>
      {/* Bottom section */}
      <div className="w-full">
        <div className={`w-full border-t mb-3 ${isDark ? "border-white/10" : "border-gray-200/70"}`} />
        <p className={`text-xs truncate w-full text-center mb-3 px-2 ${isDark ? "text-gray-400" : "text-gray-400"}`}>
          {member.email}
        </p>
        <div className="flex justify-center items-center gap-5">
          {member.git_link && (
            <Link href={member.git_link} target="_blank" rel="noopener noreferrer"
              className={`transition-colors ${isDark ? "text-gray-300 hover:text-white" : "text-gray-500 hover:text-gray-900"}`}>
              <FaGithub className="text-xl" />
            </Link>
          )}
          {member.linkedin_link && (
            <Link href={member.linkedin_link} target="_blank" rel="noopener noreferrer"
              className={`transition-colors ${isDark ? "text-gray-300 hover:text-blue-400" : "text-gray-500 hover:text-blue-600"}`}>
              <FaLinkedin className="text-xl" />
            </Link>
          )}
          {member.facebook_link && (
            <Link href={member.facebook_link} target="_blank" rel="noopener noreferrer"
              className={`transition-colors ${isDark ? "text-gray-300 hover:text-blue-400" : "text-gray-500 hover:text-blue-500"}`}>
              <FaFacebook className="text-xl" />
            </Link>
          )}
        </div>
      </div>
    </div>
  );

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        transform: "perspective(800px) rotateX(0deg) rotateY(0deg)",
        transition: "transform 0.15s ease-out, box-shadow 0.15s ease-out",
        boxShadow: isDark
          ? "0 0 0 1.5px rgba(255,255,255,0.15), 0 0 18px rgba(255,255,255,0.07)"
          : "0px 2px 16px rgba(0,0,0,0.07)",
        borderRadius: "25px",
        willChange: "transform",
        height: "420px",
        // Neon white outline in dark mode
        outline: isDark ? "1.5px solid rgba(255,255,255,0.18)" : "none",
      }}
    >
      {isDark ? (
        // Dark mode: PixelatedCanvas as background + card content on top
        <div className="relative w-full h-full rounded-[25px] overflow-hidden">
          {member.image && (
            <PixelatedCanvas
              src={member.image}
              width={300}
              height={420}
              cellSize={4}
              dotScale={0.85}
              shape="square"
              backgroundColor="#0a0a0f"
              dropoutStrength={0.3}
              interactive={true}
              distortionMode="swirl"
              distortionStrength={4}
              distortionRadius={90}
              tintColor="#38bdf8"
              tintStrength={0.15}
              fadeOnLeave={true}
              className="absolute inset-0 w-full h-full"
            />
          )}
          {!member.image && (
            <div className="absolute inset-0 bg-gradient-to-br from-[#0a0a1a] to-[#0d1525]" />
          )}
          {/* Dark overlay so text is readable */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
          {cardContent}
        </div>
      ) : (
        // Light mode: original PixelCard
        <PixelCard variant={variant}>
          {cardContent}
        </PixelCard>
      )}
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

  return (
    <section className="mt-8 pt-20">
      <div className="w-[90%] mx-auto">
        <div className="flex flex-col items-center gap-4 text-center">
          <SectionTitle title="Meet Our Members" description="No of us is smarter than all of us" />
        </div>
        <div className="mx-auto mt-8 max-w-screen-2xl rounded-2xl bg-muted/70 p-6 lg:p-12">
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

          {firstYearMembers.length > 0 && (
            <>
              <div className="text-center my-10">
                <h2 className="text-2xl font-semibold">First Year Members</h2>
                <p className="text-muted-foreground">Our newest members joining the club</p>
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
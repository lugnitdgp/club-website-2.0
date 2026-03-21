"use client";

import React, { useRef, useState, useEffect } from "react";
import Link from "next/link";
import SectionTitle from "@/components/Title";
import { FaFacebook, FaGithub, FaLinkedin } from "react-icons/fa";
import { useFetchAlumniQuery } from "@/store/slices/alumniSlice";
import DataLoader from "@/components/loading/DataLoader";
import dynamic from "next/dynamic";
import { useTheme } from "next-themes";

const PixelCard = dynamic(() => import("@/components/PixelCard"), { ssr: false });

type PixelVariant = "default" | "blue" | "pink" | "yellow";

function AlumniCard({ alumni, variant }: { alumni: any; variant: PixelVariant }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  const isDark = mounted && resolvedTheme === "dark";

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = cardRef.current;
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const rotateX = (((e.clientY - rect.top) - rect.height / 2) / (rect.height / 2)) * -8;
    const rotateY = (((e.clientX - rect.left) - rect.width / 2) / (rect.width / 2)) * 8;
    card.style.transform = `perspective(800px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(8px) scale(1.02)`;
    card.style.boxShadow = isDark
      ? `${-rotateY * 1.5}px ${rotateX * 1.5}px 32px rgba(255,255,255,0.08), 0 0 24px rgba(255,255,255,0.08), 0 0 0 1.5px rgba(255,255,255,0.2)`
      : `${-rotateY * 1.5}px ${rotateX * 1.5}px 32px rgba(0,0,0,0.12)`;
  };

  const handleMouseLeave = () => {
    const card = cardRef.current;
    if (!card) return;
    card.style.transform = "perspective(800px) rotateX(0deg) rotateY(0deg) translateZ(0px) scale(1)";
    card.style.boxShadow = isDark
      ? "0 0 0 1.5px rgba(255,255,255,0.18), 0 0 18px rgba(255,255,255,0.07)"
      : "0px 2px 16px rgba(0,0,0,0.07)";
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        transform: "perspective(800px) rotateX(0deg) rotateY(0deg)",
        transition: "transform 0.15s ease-out, box-shadow 0.15s ease-out",
        boxShadow: isDark
          ? "0 0 0 1.5px rgba(255,255,255,0.18), 0 0 18px rgba(255,255,255,0.07)"
          : "0px 2px 16px rgba(0,0,0,0.07)",
        borderRadius: "25px",
        willChange: "transform",
        height: "420px",
      }}
    >
      <PixelCard variant={variant}>
        <div className="absolute inset-0 flex flex-col items-center justify-between p-5 text-center">
          <div className="flex flex-col items-center gap-1 flex-1 justify-center">
            {alumni.image ? (
              <img
                src={alumni.image}
                alt={`${alumni.first_name} ${alumni.last_name}`}
                className="w-28 h-28 object-cover object-top rounded-full border-4 border-white/60 shadow-xl"
                onError={(e) => { (e.currentTarget as HTMLImageElement).style.display = "none"; }}
              />
            ) : (
              <div className="w-28 h-28 rounded-full border-4 border-white/60 shadow-xl bg-gradient-to-br from-purple-200 to-blue-200 flex items-center justify-center text-3xl font-bold text-gray-600">
                {alumni.first_name?.[0]}{alumni.last_name?.[0]}
              </div>
            )}
            <div className="text-base font-bold text-neutral-700 dark:text-white leading-tight mt-2">
              {alumni.first_name} {alumni.last_name}
            </div>
            {alumni.bio && (
              <p className="text-gray-500 dark:text-gray-300 text-xs font-medium line-clamp-2 px-2 leading-relaxed mt-1">
                {alumni.bio}
              </p>
            )}
          </div>
          <div className="w-full">
            <div className="w-full border-t border-gray-200/70 dark:border-gray-600/70 mb-3" />
            <p className="text-gray-400 text-xs truncate w-full text-center mb-3 px-2">
              {alumni.email}
            </p>
            <div className="flex justify-center items-center gap-5">
              {alumni.git_link && (
                <Link href={alumni.git_link} target="_blank" rel="noopener noreferrer"
                  className="text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white transition-colors">
                  <FaGithub className="text-xl" />
                </Link>
              )}
              {alumni.linkedin_link && (
                <Link href={alumni.linkedin_link} target="_blank" rel="noopener noreferrer"
                  className="text-gray-500 hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-400 transition-colors">
                  <FaLinkedin className="text-xl" />
                </Link>
              )}
              {alumni.facebook_link && (
                <Link href={alumni.facebook_link} target="_blank" rel="noopener noreferrer"
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

function AlumniPage() {
  const { data, isLoading, error } = useFetchAlumniQuery({});

  if (isLoading) return <DataLoader text="Loading alumni data..." />;
  if (error) return <div className="h-[70vh] w-screen text-center">Error loading the alumni data.</div>;
  if (!data) return <div className="h-[70vh] w-screen text-center">No alumni data found.</div>;

  const getVariant = (id: number): PixelVariant => {
    const variants: PixelVariant[] = ["pink", "blue", "yellow"];
    return variants[id % 3];
  };

  const renderAlumniCards = (alumniList: any[]) => {
    const sorted = alumniList.slice().sort((a, b) => a.first_name.localeCompare(b.first_name));
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mt-8">
        {sorted.map((alumni) => (
          <AlumniCard key={alumni.id} alumni={alumni} variant={getVariant(alumni.id)} />
        ))}
      </div>
    );
  };

  return (
    <section className="mt-8 pt-20">
      <div className="w-[90%] mx-auto">
        <div className="flex flex-col items-center gap-4 text-center">
          <SectionTitle title="Our Alumni" description="Those who paved the way before us" />
        </div>
        <div className="mx-auto mt-8 max-w-screen-2xl rounded-2xl bg-muted/70 p-6 lg:p-12">
          {Object.keys(data)
            .reverse()
            .map((year, index) => (
              <div key={year}>
                <div className={`text-center ${index === 0 ? "mb-4" : "my-10"}`}>
                  <h2 className="text-2xl font-semibold">{year} Batch</h2>
                  <p className="text-muted-foreground">Alumni from the {year} graduating batch</p>
                </div>
                {renderAlumniCards(data[year])}
              </div>
            ))}
        </div>
      </div>
    </section>
  );
}

export default AlumniPage;
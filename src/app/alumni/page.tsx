"use client";

import React, { useState } from "react";
import Link from "next/link";
import SectionTitle from "@/components/Title";
import { FaFacebook, FaGithub, FaLinkedin } from "react-icons/fa";
import { useFetchAlumniQuery } from "@/store/slices/alumniSlice";
import DataLoader from "@/components/loading/DataLoader";
import styles from "./alumni.module.css";

function AlumniCard({ alumni }: { alumni: any }) {
  const [hasError, setHasError] = useState(false);
  const initials = `${alumni.first_name?.[0] || ""}${alumni.last_name?.[0] || ""}`.toUpperCase();

  return (
    <div className={styles.card}>
      <div className={styles.imageContainer}>
        {alumni.image && !hasError ? (
          <img
            src={alumni.image}
            alt={`${alumni.first_name} ${alumni.last_name}`}
            className={styles.portraitImage}
            onError={() => setHasError(true)}
          />
        ) : (
          <div className={styles.avatarFallback}>
            {initials || "?"}
          </div>
        )}
        <div className={styles.gradientOverlay} />
      </div>

      {/* GitHub badge moved outside imageContainer to Card level so it can render on top of details */}
      {alumni.git_link && (
        <Link
          href={alumni.git_link}
          target="_blank"
          rel="noopener noreferrer"
          className={styles.socialBadge}
          title="GitHub Profile"
        >
          <FaGithub />
        </Link>
      )}

      <div className={styles.details}>
        <h3 className={styles.name}>
          {alumni.first_name} {alumni.last_name}
        </h3>

        <div className={styles.revealWrapper}>
          <div className={styles.revealGroup}>
            {alumni.email && <p className={styles.email}>{alumni.email}</p>}
            {alumni.bio && <p className={styles.role}>{alumni.bio}</p>}
          </div>
        </div>

        <div className={styles.socialLinks}>
          {alumni.linkedin_link && (
            <Link
              href={alumni.linkedin_link}
              target="_blank"
              rel="noopener noreferrer"
              className={`${styles.socialIcon} ${styles.linkedinIcon}`}
              title="LinkedIn Profile"
            >
              <FaLinkedin />
            </Link>
          )}
          {alumni.facebook_link && (
            <Link
              href={alumni.facebook_link}
              target="_blank"
              rel="noopener noreferrer"
              className={`${styles.socialIcon} ${styles.facebookIcon}`}
              title="Facebook Profile"
            >
              <FaFacebook />
            </Link>
          )}
          {alumni.git_link && (
            <Link
              href={alumni.git_link}
              target="_blank"
              rel="noopener noreferrer"
              className={`${styles.socialIcon} ${styles.githubIcon}`}
              title="GitHub Profile"
            >
              <FaGithub />
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}

function AlumniPage() {
  const { data, isLoading, error } = useFetchAlumniQuery({});

  if (isLoading) return <DataLoader text="Loading alumni data..." />;
  if (error) return <div className="h-[70vh] w-screen text-center">Error loading the alumni data.</div>;
  if (!data) return <div className="h-[70vh] w-screen text-center">No alumni data found.</div>;

  const renderAlumniCards = (alumniList: any[]) => {
    const sorted = alumniList.slice().sort((a, b) => a.first_name.localeCompare(b.first_name));
    return (
      <div className={styles.gridContainer}>
        {sorted.map((alumni) => (
          <AlumniCard key={alumni.id} alumni={alumni} />
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
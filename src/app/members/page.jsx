"use client";

import React, { useState } from "react";
import Link from "next/link";
import SectionTitle from "@/components/Title";
import { FaFacebook, FaGithub, FaLinkedin } from "react-icons/fa";
import { useFetchMembersQuery } from "@/store/slices/membersSlice";
import DataLoader from "@/components/loading/DataLoader";
import styles from "./members.module.css";

function MemberCard({ member }) {
  const [hasError, setHasError] = useState(false);
  const initials = `${member.first_name?.[0] || ""}${member.last_name?.[0] || ""}`.toUpperCase();

  return (
    <div className={styles.card}>
      <div className={styles.imageContainer}>
        {member.image && !hasError ? (
          <img
            src={member.image}
            alt={`${member.first_name} ${member.last_name}`}
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
      {member.git_link && (
        <Link
          href={member.git_link}
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
          {member.first_name} {member.last_name}
        </h3>

        <div className={styles.revealWrapper}>
          <div className={styles.revealGroup}>
            {member.email && <p className={styles.email}>{member.email}</p>}
            {member.bio && <p className={styles.role}>{member.bio}</p>}
          </div>
        </div>

        <div className={styles.socialLinks}>
          {member.linkedin_link && (
            <Link
              href={member.linkedin_link}
              target="_blank"
              rel="noopener noreferrer"
              className={`${styles.socialIcon} ${styles.linkedinIcon}`}
              title="LinkedIn Profile"
            >
              <FaLinkedin />
            </Link>
          )}
          {member.facebook_link && (
            <Link
              href={member.facebook_link}
              target="_blank"
              rel="noopener noreferrer"
              className={`${styles.socialIcon} ${styles.facebookIcon}`}
              title="Facebook Profile"
            >
              <FaFacebook />
            </Link>
          )}
          {member.git_link && (
            <Link
              href={member.git_link}
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

  const renderMemberCards = (members) => (
    <div className={styles.gridContainer}>
      {members
        .sort((a, b) => a.first_name.localeCompare(b.first_name))
        .map((member) => (
          <MemberCard key={member.id} member={member} />
        ))}
    </div>
  );

  return (
    <section className="mt-8 pt-20">
      <div className="w-[90%] mx-auto">
        <div className="flex flex-col items-center gap-4 text-center">
          <SectionTitle title="Meet Our Members" description="None of us is smarter than all of us" />
        </div>
        <div className="mx-auto mt-8 max-w-screen-2xl rounded-2xl p-6 lg:p-12">
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
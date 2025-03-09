"use client";

import React from "react";
import { useFetchAlumniQuery } from "@/store/slices/alumniSlice";
import Image from "next/image";
import { placeholder } from "@/assets";
import Link from "next/link";
import { FaFacebook, FaGithub, FaLinkedin } from "react-icons/fa";
import DataLoader from "@/components/loading/DataLoader";

function AlumniPage() {
  const { data, isLoading, error } = useFetchAlumniQuery({});

  if (isLoading) return <DataLoader text="Loading alumni data..." />;
  if (error)
    return (
      <div className=" h-[70vh] w-screen text-center">Error loading the alumni data.</div>
    );
  if (!data)
    return <div className=" h-[70vh] w-screen text-center">No alumni data found.</div>;
  console.log(data);
  return (
    <section className="mt-8 pt-20">
      <div className="w-[90%] mx-auto">
        {Object.keys(data)
          .reverse()
          .map((year) => (
            <div key={year} className="text-center my-10">
              <h2 className="text-2xl font-semibold">{year} Year Alumni</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8 max-w-screen-xl mx-auto">
                {data[year].map((alumni: any) => (
                  <div
                    key={alumni.id}
                    className={`shadow-lg p-6 rounded-xl bg-gradient-to-r ${
                      alumni.id % 3 === 0
                        ? "from-blue-500/5 to-purple-500/5"
                        : alumni.id % 3 === 1
                        ? "from-orange-500/5 to-yellow-500/5"
                        : "from-pink-500/5 to-purple-500/5"
                    }`}
                  >
                    <div className="flex flex-col items-center mb-4">
                      <Image
                        src={alumni.image || placeholder}
                        alt={`${alumni.first_name} ${alumni.last_name}`}
                        width={160}
                        height={160}
                        className="w-24 h-24 object-cover rounded-full mb-4"
                      />
                      <div className="text-xl font-bold text-neutral-600 dark:text-white">
                        {alumni.first_name} {alumni.last_name}
                      </div>
                    </div>

                    <div className="border-t border-gray-200 dark:border-gray-700 pt-4">
                      {alumni.bio && (
                        <p className="text-gray-600 dark:text-gray-300 mb-4">
                          {alumni.bio}
                        </p>
                      )}
                      <p className="text-gray-600 dark:text-gray-300 mb-2">
                        {alumni.email}
                      </p>
                      <div className="flex justify-center items-center space-x-4 mt-4">
                        {alumni.git_link && (
                          <Link
                            href={alumni.git_link || "#"}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-gray-700 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white"
                          >
                            <FaGithub className=" text-xl" />
                          </Link>
                        )}
                        {alumni.linkedin_link && (
                          <Link
                            href={alumni.linkedin_link || "#"}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-gray-700 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white"
                          >
                            <FaLinkedin className=" text-xl" />
                          </Link>
                        )}
                        {alumni.facebook_link && (
                          <Link
                            href={alumni.facebook_link || "#"}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-gray-700 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white"
                          >
                            <FaFacebook className=" text-xl" />
                          </Link>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
      </div>
    </section>
  );
}

export default AlumniPage;

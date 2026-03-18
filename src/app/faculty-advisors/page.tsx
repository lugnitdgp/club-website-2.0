"use client";

import React from "react";
import Image from "next/image";
import SectionTitle from "@/components/Title";

function FacultyAdvisorsPage() {
  const facultyAdvisors = [
    {
      id: 1,
      name: "Dr.",
      department: "Department of Computer Science and Engineering",
      image: null, // Placeholder for faculty image
    },
    {
      id: 2,
      name: "Dr.",
      department: "Department of Computer Science and Engineering",
      image: null, // Placeholder for faculty image
    },
  ];

  return (
    <div className="relative z-10">
      {/* Main Content */}
      <section className="pt-32 pb-8">
        <div className="w-[90%] max-w-6xl mx-auto">
          {/* Title Section */}
          {/* <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Meet{" "}
              <span className="bg-gradient-to-r from-pink-500 via-purple-500 to-purple-600 bg-clip-text text-transparent">
                Our Faculty
              </span>{" "}
              <span className="bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                Advisors
              </span>
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300">
              Our Biggest Supporters
            </p>
          </div> */}
          <SectionTitle
                  title="Our Faculty Advisors"
                  description="Our Biggest Supporters"
                />

          {/* Faculty Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-4xl mx-auto">
            {facultyAdvisors.map((faculty) => (
              <div
                key={faculty.id}
                className="flex flex-col items-center text-center"
              >
                {/* Faculty Image */}
                <div className="w-48 h-48 rounded-full bg-gray-300 dark:bg-gray-600 mb-6 flex items-center justify-center overflow-hidden">
                  {faculty.image ? (
                    <Image
                      src={faculty.image}
                      alt={faculty.name}
                      width={192}
                      height={192}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full bg-gradient-to-br from-gray-200 to-gray-300 dark:from-gray-700 dark:to-gray-600" />
                  )}
                </div>

                {/* Faculty Info */}
                <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mb-2">
                  {faculty.name}
                </h3>
                <p className="text-gray-600 dark:text-gray-300 max-w-sm">
                  {faculty.department}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

export default FacultyAdvisorsPage;

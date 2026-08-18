"use client";

import React from "react";
import Image from "next/image";
import SectionTitle from "@/components/Title";
import { motion } from "framer-motion";
import { FaLinkedin } from "react-icons/fa";
import Link from "next/link";
import suvrojit from "@/assets/Images/suvrojit.jpg";
import ankush from "@/assets/Images/ankush.jpeg";

const facultyAdvisors = [
  {
    id: 1,
    name: "Dr. Suvrojit Das",
    department: "Department of Computer Science and Engineering",
    image: suvrojit,
    linkedin: "https://www.linkedin.com/in/suvrojit-das-50685b242/",
  },
  {
    id: 2,
    name: "Dr. Ankush Acharyya",
    department: "Department of Computer Science and Engineering",
    image: ankush,
    linkedin: "https://www.linkedin.com/in/ankush-acharyya-a7047258/",
  },
];

function FacultyAdvisorsPage() {
  return (
    <div className="relative z-10 min-h-screen">
      <section className="pt-32 pb-16">
        <div className="w-[90%] max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <SectionTitle
              title="Our Faculty Advisors"
              description="Our Biggest Supporters"
            />
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 max-w-3xl mx-auto mt-16">
            {facultyAdvisors.map((faculty, index) => (
              <motion.div
                key={faculty.id}
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.15 }}
                whileHover={{ y: -6, transition: { duration: 0.2 } }}
                className="group flex flex-col items-center text-center bg-white/60 dark:bg-white/5 backdrop-blur-md border border-gray-200 dark:border-white/10 rounded-3xl p-8 shadow-lg dark:shadow-none hover:shadow-xl dark:hover:border-white/20 transition-all duration-300"
              >
                {/* Glow ring on hover */}
                <div className="relative mb-6">
                  <div className="absolute inset-0 rounded-full bg-gradient-to-br from-purple-400 to-blue-400 opacity-0 group-hover:opacity-30 blur-xl transition-opacity duration-500" />
                  <div className="w-44 h-44 rounded-full overflow-hidden border-4 border-white dark:border-white/20 shadow-lg relative z-10">
                    <Image
                      src={faculty.image}
                      alt={faculty.name}
                      width={176}
                      height={176}
                      className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>
                </div>

                {/* Info */}
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-1">
                  {faculty.name}
                </h3>
                <p className="text-sm text-gray-500 dark:text-gray-400 max-w-xs leading-relaxed mb-4">
                  {faculty.department}
                </p>

                {/* Divider */}
                <div className="w-12 h-px bg-gray-200 dark:bg-white/10 mb-4" />

                {/* LinkedIn */}
                <Link
                  href={faculty.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-sm font-medium text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 transition-colors"
                >
                  <FaLinkedin className="text-lg" />
                  View Profile
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

export default FacultyAdvisorsPage;
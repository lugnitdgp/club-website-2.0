"use client";

import { useFetchContactQuery } from "@/store/slices/contactSlice";
import React from "react";
import { AnimatedTooltip } from "../ui/animated-tooltip";
import {
  Facebook,
  MessageCircle,
  Youtube,
  Github,
  Instagram,
  Mail,
  Linkedin,
  Code,
} from "lucide-react";
import Image from "next/image";
import { logo } from "@/assets";
import { Particles } from "../magicui/particles";
import Link from "next/link";

const socialLinks = [
  {
    name: "Facebook",
    icon: Facebook,
    url: "https://www.facebook.com/nitdgplug",
    hover: "hover:text-[#1877F2]",
  },
  {
    name: "Gitter",
    icon: MessageCircle,
    url: "https://gitter.im/lugnitdgp",
    hover: "hover:text-[#ED1965]",
  },
  {
    name: "YouTube",
    icon: Youtube,
    url: "https://www.youtube.com/channel/UCYZPnN5vP5B1sINLLkI1aDA",
    hover: "hover:text-[#FF0000]",
  },
  {
    name: "GitHub",
    icon: Github,
    url: "https://github.com/lugnitdgp",
    hover: "hover:text-[#333]",
  },
  {
    name: "Instagram",
    icon: Instagram,
    url: "https://www.instagram.com/nitdgplug",
    hover: "hover:text-[#E4405F]",
  },
  {
    name: "Email",
    icon: Mail,
    url: "mailto:contact@nitdgplug.org",
    hover: "hover:text-[#D44638]",
  },
  {
    name: "LinkedIn",
    icon: Linkedin,
    url: "https://in.linkedin.com/company/lugnitdgp",
    hover: "hover:text-[#0077B5]",
  },
  {
    name: "Dev.to",
    icon: Code,
    url: "https://dev.to/nitdgplug",
    hover: "hover:text-[#0A0A0A]",
  },
];

export default function Footer() {
  const { data: people, isLoading } = useFetchContactQuery({});

  function addImagesToUsers(users: []) {
    const usersWithImages = users.map((user: any) => {
      let image = user.image; // Default to existing image if any

      if (user.name === "Suman Karmakar (President)") {
        image =
          "https://api.nitdgplug.org/media/member_images/WhatsApp_Image_2022-05-31_at_9.58.25_PM.jpeg";
      } else if (user.name === "Ayush Bhartia (General Secretary)") {
        image =
          "https://api.nitdgplug.org/media/member_images/WhatsApp_Image_2024-01-26_at_1.44.23_AM.jpeg";
      } else if (user.name === "Navneet Berwal (Treasurer)") {
        image =
          "https://api.nitdgplug.org/media/member_images/42FB0696-90A8-47FC-88C4-2F993B138FA4.jpeg";
      } else if (user.name === "Aiman Aisha (Vice President)") {
        image =
          "https://api.nitdgplug.org/media/member_images/IMG_20240508_145945.jpg";
      } else if (user.name === "Siddhi Agarkar (Convener)") {
        image = "https://api.nitdgplug.org/media/member_images/IMG_1499.jpeg";
      }

      return { ...user, image };
    });
    return usersWithImages;
  }

  return (
    <footer className="bg-gradient-to-r from-[#d9d8f1] via-[#f7e0f1] to-[#FFF4D8] text-gray-900 py-10 mt-10 relative">
      <Particles
        className="absolute inset-0 z-0"
        quantity={100}
        ease={80}
        color={"#000"}
        refresh
      />
      <div className="container mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-8">
        <div className="flex flex-col  gap-2">
          <Image src={logo} alt="logo" className="w-10 h-10" />
          <h3 className="font-bold text-lg">GNU/Linux Users' Group</h3>
          <p className="mt-2">📍 NIT Durgapur, West Bengal, India 713209</p>
          <p>
            📧{" "}
            <Link
              href="mailto:contact@nitdgplug.org"
              className=" text-gray-700 font-medium hover:underline hover:text-black"
            >
              president@nitdgplug.org
            </Link>
          </p>
          <p>
            📞{" "}
            <Link
              href="tel:+919679670516"
              className=" text-gray-700 font-medium hover:underline hover:text-black"
            >
              +91 9679670516
            </Link>
          </p>
          {!isLoading || people ? (
            <AnimatedTooltip items={addImagesToUsers(people)} />
          ) : null}
        </div>

        <div>
          <h3 className="font-bold text-lg">Links</h3>
          <ul className="mt-2 space-y-2">
            {[
              {
                href: "https://admin.nitdgplug.org/",
                text: "GLUG internal Portal",
                target: "_blank",
              },
              { href: "#", text: `ShowDownn ${new Date().getFullYear()}` },
              { href: "#", text: `Mukti ${new Date().getFullYear()}` },
              { href: "#", text: `Aarohan ${new Date().getFullYear()}` },
            ].map((link) => (
              <li key={link.text}>
                <Link
                  href={link.href}
                  target={link.target || undefined}
                  className="text-gray-700 font-medium hover:underline hover:text-black"
                >
                  {link.text}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h3 className="font-bold text-lg">Resources</h3>
          <ul className="mt-2 space-y-2">
            {[
              { href: "/blogs", text: "Blogs" },
              { href: "/CTF", text: "CTF" },
              { href: "/articles", text: "Articles" },
              { href: "/techbytes", text: "Techbytes" },
            ].map((link) => (
              <li key={link.text}>
                <Link
                  href={link.href}
                  className="text-gray-700 font-medium hover:underline hover:text-black"
                >
                  {link.text}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="flex flex-col items-start">
          <h3 className="font-bold text-lg">Community</h3>
          <ul className="mt-2 space-y-2">
            <li>
              <Link
                href="/faculty-advisors"
                className=" text-gray-700 font-medium hover:underline hover:text-black"
              >
                Faculty Advisors
              </Link>
            </li>
            <li>
              <Link
                href="/alumni"
                className=" text-gray-700 font-medium hover:underline hover:text-black"
              >
                Alumni
              </Link>
            </li>
            <li>
              <Link
                href="/sponsers"
                className=" text-gray-700 font-medium hover:underline hover:text-black"
              >
                Sponsers
              </Link>
            </li>
            <li>
              <Link
                href="#"
                className=" text-gray-700 font-medium hover:underline hover:text-black"
              >
                Discord
              </Link>
            </li>
          </ul>
          {/* Google Play Button */}
          <Link href="https://play.google.com/store" className="mt-4">
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/7/78/Google_Play_Store_badge_EN.svg"
              alt="Get it on Google Play"
              className="w-40"
            />
          </Link>
        </div>
      </div>

      {/* Social Media Links */}
      <div className="mt-8 text-center flex justify-center space-x-4">
        {socialLinks.map(({ name, icon: Icon, url, hover }) => (
          <Link
            key={name}
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className={`text-gray-700 transition-colors duration-300 ${hover}`}
          >
            <Icon className="w-6 h-6" />
          </Link>
        ))}
      </div>

      {/* Footer Bottom */}
      <div className="mt-6 mb-4 text-center text-gray-600 text-sm">
        <p>
          © {new Date().getFullYear()} GNU/Linux Users' Group NIT Durgapur. All
          rights reserved.
        </p>
      </div>
    </footer>
  );
}

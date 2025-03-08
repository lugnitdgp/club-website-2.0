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

  return (
    <footer className="bg-gradient-to-r from-[#d9d8f1] via-[#f7e0f1] to-[#FFF4D8] text-gray-900 py-10 mt-10 relative">
      <Particles
        className="absolute inset-0 z-0"
        quantity={100}
        ease={80}
        color={"#000"}
        refresh
      />
      <div className="container mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Contact Section */}
        <div className="flex flex-col  gap-2">
          <Image src={logo} alt="logo" className="w-10 h-10" />
          <h3 className="font-bold text-lg">GNU/Linux Users' Group</h3>
          <p className="mt-2">📍 NIT Durgapur, West Bengal, India 713209</p>
          <p>
            📧{" "}
            <a
              href="mailto:contact@nitdgplug.org"
              className="text-blue-600 hover:text-blue-800"
            >
              contact@nitdgplug.org
            </a>
          </p>
          <p>
            📞{" "}
            <a
              href="tel:+919679670516"
              className="text-blue-600 hover:text-blue-800"
            >
              +91 9679670516
            </a>
          </p>
          {!isLoading || people ? <AnimatedTooltip items={people} /> : null}
        </div>

        {/* Resources Section */}
        <div>
          <h3 className="font-bold text-lg">Resources</h3>
          <ul className="mt-2 space-y-2">
            <li>
              <a href="#" className="text-blue-600 hover:text-blue-800">
                Blog
              </a>
            </li>
            <li>
              <a href="#" className="text-blue-600 hover:text-blue-800">
                CTF
              </a>
            </li>
            <li>
              <a href="#" className="text-blue-600 hover:text-blue-800">
                Projects
              </a>
            </li>
            <li>
              <a href="#" className="text-blue-600 hover:text-blue-800">
                Events
              </a>
            </li>
          </ul>
        </div>

        {/* Community & Play Store Section */}
        <div className="flex flex-col items-start">
          <h3 className="font-bold text-lg">Community</h3>
          <ul className="mt-2 space-y-2">
            <li>
              <a href="#" className="text-blue-600 hover:text-blue-800">
                Discord
              </a>
            </li>
            <li>
              <a href="#" className="text-blue-600 hover:text-blue-800">
                Faculty Advisors
              </a>
            </li>
            <li>
              <a href="#" className="text-blue-600 hover:text-blue-800">
                Sponsers
              </a>
            </li>
            <li>
              <a href="#" className="text-blue-600 hover:text-blue-800">
                Team
              </a>
            </li>
          </ul>
          {/* Google Play Button */}
          <a href="https://play.google.com/store" className="mt-4">
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/7/78/Google_Play_Store_badge_EN.svg"
              alt="Get it on Google Play"
              className="w-40"
            />
          </a>
        </div>
      </div>

      {/* Social Media Links */}
      <div className="mt-8 text-center flex justify-center space-x-4">
        {socialLinks.map(({ name, icon: Icon, url, hover }) => (
          <a
            key={name}
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className={`text-gray-700 transition-colors duration-300 ${hover}`}
          >
            <Icon className="w-6 h-6" />
          </a>
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

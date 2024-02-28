'use client';
import Link from 'next/link';
import Image from 'next/image';

import {
  calendar,
  edit_light,
  group,
  video_light,
  logo,
  home_icon
} from '../../public/assets';
import ThemeSwitcher from './ThemeSwitcher';
import MobileNav from './MobileNav';
import { AnimatePresence, motion } from "framer-motion"
import { useState } from 'react';

type Props = {};
const icons = [
  { path: "/", icon: home_icon, name: 'Home' },
  { path: '/events', icon: video_light, name: 'Events' },
  { path: '/timeline', icon: calendar, name: 'Timeline' },
  { path: '/blogs', icon: edit_light, name: 'Blogs' },
  { path: '/members', icon: group, name: 'Members' },
];

const IconComponent = ({ icon }: { icon: any }) => {
  const [isHovering, setIsHovering] = useState(false)

  return (

    <motion.div
      whileHover={{
        scale: 1.2
      }}
      whileTap={{ scale: 1.1 }}
      className="relative"
      onMouseOver={() => setIsHovering(true)}
      onMouseOut={() => setIsHovering(false)}
    >
      <Link href={icon.path} className="py-4 ">
        <Image
          src={icon.icon}
          alt="Navbar icon"
          className="dark:invert"
          width={35}
          height={35}
        />
      </Link>
      <AnimatePresence>
        {isHovering ? <motion.div

          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -10 }}
          className="absolute top-0 bottom-0 mt-auto mb-auto left-10 px-1 py-1 h-max text-xs text-gray-100  bg-gray-800 rounded-md ">
          {icon.name}
        </motion.div> : null}
      </AnimatePresence>
    </motion.div>
  )
}
function Navbar({ }: Props) {
  return (
    <>
      <MobileNav icons={icons} />
      <motion.nav

        whileHover={{
          width: 80
        }}

        className="fixed flex flex-col items-center justify-center hidden h-screen px-4 md:flex bg-pinkSecondary dark:bg-surfaceDark">
        <div className="flex flex-col items-center space-y-4">
          <div className="absolute mx-auto top-5">
            <Link href="/">
              <Image src={logo} alt="logo" width={45} height={45} />
            </Link>
          </div>
          {icons.map((icon, index) => {
            return (
              <IconComponent key={index} icon={icon} />
            );
          })}
        </div>
        <ThemeSwitcher />
      </motion.nav>
    </>
  );
}

export default Navbar;

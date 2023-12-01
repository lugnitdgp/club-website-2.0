'use client';
import Link from 'next/link';
import Image from 'next/image';

import {
  add_square_light,
  calendar,
  edit_light,
  group,
  mortarboard_light,
  video_light,
  logo,
  notebook,
} from '../../public/assets';
import ThemeSwitcher from './ThemeSwitcher';
import { Dialog, Transition } from '@headlessui/react';
import { Fragment, useState } from 'react';
import { MdOutlineCancel } from 'react-icons/md';
import { CiMenuBurger } from 'react-icons/ci';
import { slide as Menu } from 'react-burger-menu';

type Props = { icons: any[] };
const icons = [
  { path: '/events', icon: video_light, name: 'Events' },
  { path: '/timeline', icon: calendar, name: 'Timeline' },
  { path: '/blogs', icon: edit_light, name: 'Blogs' },
  { path: '/members', icon: group, name: 'Members' },
];

const navigation = [
  { name: 'Events', href: '#', icon: video_light, current: true },
  { name: 'Timeline', href: '#', icon: calendar, current: false },
  { name: 'Blogs', href: '#', icon: edit_light, current: false },
  { name: 'Members', href: '#', icon: group, current: false },
];

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ');
}

function MobileNav({}: Props) {
  return (
    <Menu className="bg-[#fffbff] dark:bg-[#201A19]">
      {icons.map((icon, index) => {
        return (
          <Link href={icon.path} key={index}>
            <div className="flex items-center gap-4 py-2">
              <Image
                src={icon.icon}
                alt="Navbar icon"
                className="dark:invert"
                width={35}
                height={35}
              />

              <p className="text:black">{icon.name}</p>
            </div>
          </Link>
        );
      })}
      <div className="mt-10" />
      <ThemeSwitcher />
    </Menu>
  );
}

export default MobileNav;

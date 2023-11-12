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

type Props = {};
const icons = [
  { path: '/events', icon: video_light, name: 'Events' },
  { path: '/timeline', icon: calendar, name: 'Timeline' },
  { path: '/blogs', icon: edit_light, name: 'Blogs' },
  { path: '/members', icon: group, name: 'Members' },
];
function Navbar({}: Props) {
  return (
    <>
      <nav className="fixed flex flex-col items-center justify-center h-screen px-4 bg-pinkSecondary dark:bg-surfaceDark">
        <div className="flex flex-col items-center space-y-4">
          <div className="absolute mx-auto top-5">
            <Link href="/">
              <Image src={logo} alt="logo" width={45} height={45} />
            </Link>
          </div>
          {icons.map((icon, index) => {
            return (
              <div
                className="relative flex flex-col items-start group"
                key={index}
              >
                <Link href={icon.path} key={index} className="py-2 ">
                  <Image
                    src={icon.icon}
                    alt="Navbar icon"
                    className="dark:invert"
                    width={35}
                    height={35}
                  />
                </Link>
                <span className="absolute px-1 m-4 mx-auto text-sm text-gray-100 transition-opacity -translate-x-1/2 translate-y-full bg-gray-800 rounded-md opacity-0 left-full group-hover:opacity-100">
                  {icon.name}
                </span>
              </div>
            );
          })}
        </div>
        <ThemeSwitcher />
      </nav>
    </>
  );
}

export default Navbar;

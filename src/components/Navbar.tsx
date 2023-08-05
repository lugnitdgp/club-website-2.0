import Link from "next/link";
import Image from "next/image";
import {
  add_square_light,
  calendar,
  edit_light,
  group,
  mortarboard_light,
  video_light,
  logo,
  notebook,
} from "../../public";
import ThemeSwitcher from "./ThemeSwitcher";

type Props = {};
const icons = [
  { path: "/video", icon: video_light },
  { path: "/calendar", icon: calendar },
  { path: "/edit", icon: edit_light },
  { path: "/group", icon: group },
  { path: "/notebook", icon: notebook },
  { path: "/motoboard_light", icon: mortarboard_light },
  { path: "/edit", icon: add_square_light },
];
function Navbar({}: Props) {
  return (
    <>
      <nav className="bg-background h-screen  px-3 fixed flex flex-col items-center justify-center">
        <div className="flex flex-col items-center space-y-4">
          <div className="absolute top-2 mx-2">
            <Link href="/">
              <Image src={logo} alt="logo" width={51} height={51} />
            </Link>
          </div>
          {icons.map((icon) => {
            return (
              <Link href={icon.path} className=" py-2">
                <Image src={icon.icon} alt="video" width={35} height={35} />
              </Link>
            );
          })}
        </div>
        <ThemeSwitcher />
      </nav>
    </>
  );
}

export default Navbar;

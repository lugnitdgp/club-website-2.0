import Link from "next/link"
import Image from "next/image"

type Props = {}
const icons = [{path: "/video", icon: "/icons/Video_light.svg"}, {path: "/calendar", icon: "/icons/Calendar.svg"}, {path: "/edit", icon: "/icons/Edit_light.svg"}, {path: "/group", icon: "/icons/Group.svg"},{path:"/notebook",icon:"icons/notebook.svg"},{path: "/motoboard_light", icon: "/icons/Mortarboard_light.svg"}, {path: "/edit", icon: "/icons/Add_square_light.svg"}]
function Navbar({}: Props) {
  return (
    <>
    <nav className="bg-background h-screen w-20 flex flex-col items-center justify-center">
        <div className="flex flex-col items-center space-y-4">
        <div className="absolute top-2">
        <Link href="/">
            <Image src="/icons/Logo.svg" alt="logo" width={45} height={45}/>
        </Link>
        </div>
        {icons.map((icon) => {
            return ( <Link href={icon.path}>
            <Image src={icon.icon} alt="video" width={45} height={45}/>
        </Link>)
})}
        
        </div>
    </nav>
    </>
  )
}

export default Navbar
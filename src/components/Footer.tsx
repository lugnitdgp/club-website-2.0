import { CiFacebook } from "react-icons/ci";
import { FaGithub } from "react-icons/fa";
import { CiMail } from "react-icons/ci";
const Footer = () => {
  return (
    <div className="flex justify-center items-center mb-2 ">
      <div className="flex flex-col items-center gap-2">
        <div className="flex gap-2 items-center">
          <CiFacebook />
          <FaGithub />
          <CiMail />
        </div>
        <p className="text-xs">@2023 GNU/Linux Users' Group</p>
      </div>
    </div>
  );
};

export default Footer;

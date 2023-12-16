import { CiMail } from "react-icons/ci";
import { CiPhone } from "react-icons/ci";
const Contact = () => {
  return (
    <div>
      <h6 className="font-bold text-lg md:text-xl">President</h6>
      <p>Shashank Shekhar</p>
      <div>
        <div className="flex gap-2 items-center font-xs">
          <CiMail />
          <p>president@nitdgplug.org</p>
        </div>

        <div className="flex gap-2 items-center font-xs">
          <CiPhone />
          <p>+91 9554355234</p>
        </div>
      </div>
    </div>
  );
};
const ContactUs = () => {
  return (
    <div className="snap-y px-12 md:px-24 mt-24 text-onBackround dark:text-onBackroundDark mb-12">
      <h2 className="text-4xl md:text-6xl font-bold">
        <span className="text-primary dark:text-onPrimaryDark ">Contact</span>{" "}
        Us
      </h2>
      <div className="flex gap-4 flex-col md:flex-row mt-6 md:mt-8 md:justify-between">
        <Contact />
        <Contact />
        <Contact />
      </div>
    </div>
  );
};

export default ContactUs;

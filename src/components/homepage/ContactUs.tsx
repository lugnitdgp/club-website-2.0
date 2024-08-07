"use client";
import { CiMail } from "react-icons/ci";
import { CiPhone } from "react-icons/ci";
import { motion } from "framer-motion";
const Contact = ({
  position,
  name,
  email,
  phone,
}: {
  position: string;
  name: string;
  email: string;
  phone: string;
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <h6 className="font-bold text-lg md:text-xl">{position}</h6>
      <p>{name}</p>
      <div>
        <div className="flex gap-2 items-center font-xs">
          <CiMail />
          <p>{email}</p>
        </div>

        <div className="flex gap-2 items-center font-xs">
          <CiPhone />
          <p>{phone}</p>
        </div>
      </div>
    </motion.div>
  );
};
const ContactUs = () => {
  return (
    <div className="snap-y px-12 md:px-24 mt-24 text-onBackround dark:text-onBackroundDark mb-12">
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="text-4xl md:text-6xl font-bold"
      >
        <span className="text-primary dark:text-primaryDark ">Contact</span> Us
      </motion.h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mt-6 md:mt-8">
        <Contact
          position="President"
          name="Suman Karmakar"
          email="president@nitdgplug.org"
          phone="+91 9679670516"
        />
        <Contact
          position="General Secretary"
          name="Ayush Bhartia"
          email="gs@nitdgplug.org"
          phone="+91 7890912728"
        />
        <Contact
          position="Treasurer"
          name="Navneet Berwal"
          email="treasurer@nitdgplug.org"
          phone="+91 8529622552"
        />
        <Contact
          position="Convener"
          name="Siddhi Agarkar"
          email="convenor@nitdgplug.org"
          phone="+91 9372583314"
        />
        <Contact
          position="Vice President"
          name="Aiman Aisha"
          email="vp@nitdgplug.org"
          phone="+91 8515080541"
        />
      </div>
    </div>
  );
};

export default ContactUs;

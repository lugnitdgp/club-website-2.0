'use client';
import { CiMail } from "react-icons/ci";
import { CiPhone } from "react-icons/ci";
import { motion } from 'framer-motion'
const Contact = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: .300 }}
    >
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
    </motion.div>
  );
};
const ContactUs = () => {
  return (
    <div className="snap-y px-12 md:px-24 mt-24 text-onBackround dark:text-onBackroundDark mb-12">
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: .300 }}
        className="text-4xl md:text-6xl font-bold">
        <span className="text-primary dark:text-primaryDark ">Contact</span> Us
      </motion.h2>
      <div className="flex gap-4 flex-col md:flex-row mt-6 md:mt-8 md:justify-between">
        <Contact />
        <Contact />
        <Contact />
      </div>
    </div>
  );
};

export default ContactUs;

import React from "react";
import { android_app } from "@/assets";
import Image from "next/image";

function AndroidApp() {
  return (
    <div className="md:h-[50vh] h-[70vh] w-[90%] md:w-4/5 mx-auto bg-gradient-to-r from-purple-200 to-purple-100 rounded-[5rem] relative overflow-hidden shadow-md">
      <div className="flex flex-col items-center md:justify-center absolute z-10 h-full w-full md:w-3/5 text-center pt-16 md:pt-0">
        <p className="text-4xl font-bold text-gray-900">
          Download the GLUG App
        </p>
        <p className="text-md font-medium text-gray-700 mt-2 w-4/5 md:w-max">
          Stay updated with the latest news, events, and discussions from GLUG.
        </p>
        {/* Call to Action Button */}
        <a href="https://play.google.com/store/apps/details?id=com.nitdlug.app" className="mt-4">
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/7/78/Google_Play_Store_badge_EN.svg"
            alt="Get it on Google Play"
            className="w-40"
          />
        </a>
      </div>

      <div className="relative">
        <Image
          src={android_app}
          className="absolute z-10 md:h-[70vh] md:w-[55vh] h-[50vh] w-[35vh] md:right-20 md:top-10 top-80 right-12 rounded-lg"
          alt="Android App"
        />
      </div>
    </div>
  );
}

export default AndroidApp;

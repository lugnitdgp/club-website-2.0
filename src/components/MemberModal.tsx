import { Fragment } from "react";
import { Dialog, Transition } from "@headlessui/react";
import Image from "next/image";
import { email, facebook, github } from "../../public/assets";
import { motion } from "framer-motion";

interface MemberModalProps {
  memberObj: any;
  open: boolean;
  setOpen: (open: boolean) => void;
}

const MemberModal = ({ memberObj, open, setOpen }: MemberModalProps) => {
  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog as="div" className="fixed z-10 inset-0 overflow-y-auto" onClose={() => setOpen(false)}>
        <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Dialog.Overlay className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
          </Transition.Child>

          <span className="inline-block align-middle h-screen" aria-hidden="true">
            &#8203;
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <div className="relative z-50 px-4 py-6 mx-auto shadow-lg bg-yellowPrimary md:w-96 max-h-full overflow-auto rounded-xl">
                <div className="flex flex-col items-center">
                  <div className="w-40 h-40 mb-6 rounded-full overflow-hidden">
                    <Image
                      src={memberObj.image || "/assets/Images/homepage_penguin_dark.png"}
                      alt="member Image"
                      width={153}
                      height={153}
                      loading="lazy"
                      blurDataURL={memberObj.blurDataURL || "random"}
                      placeholder="blur"
                      className="object-contain rounded-full w-[153px] h-[153px]"
                    />
                  </div>
                  <h2 className="text-2xl font-semibold mb-2 dark:text-black">{memberObj.first_name + " " + memberObj.last_name}</h2>
                  <p className="text-lg w-72 md:w-auto mb-4 text-center dark:text-black">{memberObj.bio || "GLUG Member"}</p>
                  <div className="flex flex-row justify-center gap-4 mb-4">
                    {memberObj.facebook_link && (
                      <a href={memberObj.facebook_link} target="_blank" rel="noopener noreferrer">
                        <Image src={facebook} alt="Facebook" width={24} height={24} className="object-contain" />
                      </a>
                    )}
                    {memberObj.email && (
                      <a href={`mailto:${memberObj.email}`}>
                        <Image src={email} alt="Email" width={24} height={24} className="object-contain" />
                      </a>
                    )}
                    {memberObj.git_link && (
                      <a href={memberObj.git_link} target="_blank" rel="noopener noreferrer">
                        <Image src={github} alt="GitHub" width={24} height={24} className="object-contain" />
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </Transition.Child>
          </span>
        </div>
      </Dialog>
    </Transition.Root>
  );
};

export default MemberModal;

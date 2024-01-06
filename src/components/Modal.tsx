import { Fragment, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { alarm, location_on } from "../../public/assets/index";

import Image from "next/image";
import dayjs from "dayjs";

export default function Modal({
  eventObj,
  open,
  setOpen,
}: {
  eventObj: any;
  open: boolean;
  setOpen: any;
}) {
  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog
        as="div"
        className="fixed z-10 inset-0 overflow-y-auto"
        onClose={setOpen}
      >
        <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
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

          {/* This element is to trick the browser into centering the modal contents. */}
          <span
            className="inline-block align-middle h-screen"
            aria-hidden="true"
          >
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
              <div className="z-50 px-2 py-4 mx-auto shadow-lg modal-container bg-yellowPrimary md:max-w-[70%] rounded-xl">
                <div className="flex flex-col overflow-y-scroll no-scrollbar cursor-pointer rounded-3xl">
                  <div className="mt-8 text-3xl font-medium text-center md:m-4">
                    <p className="uppercase dark:text-black ">
                      {eventObj?.title}
                    </p>
                  </div>
                  <div className="flex justify-center mb-3 h-96">
                    <Image
                      src={eventObj?.event_image}
                      alt=""
                      height={1080}
                      width={1920}
                      className="object-contain w-full h-auto"
                    />
                  </div>
                  <div className="flex flex-col justify-center m-2 md:flex-row">
                    <div className="flex ">
                      <Image src={alarm} alt={""} className="m-2" />

                      <p className="self-center font-semibold dark:text-black">
                        {dayjs(eventObj?.event_timing).format("DD MMM h:mm A")}
                      </p>
                    </div>
                    <div className="flex h-10 mx-2 ">
                      <>
                        {!eventObj?.venue ? null : (
                          <>
                            <Image src={location_on} alt={""} className="m-2" />
                            <p className="self-center font-semibold dark:text-black">
                              {eventObj?.venue}
                            </p>
                          </>
                        )}
                      </>
                    </div>
                  </div>
                  <div className="self-center w-5/6 h-44 dark:text-black">
                    <div
                      dangerouslySetInnerHTML={{
                        __html: eventObj?.description,
                      }}
                    />
                  </div>
                </div>
              </div>
            </Transition.Child>
          </span>
        </div>
      </Dialog>
    </Transition.Root>
  );
}

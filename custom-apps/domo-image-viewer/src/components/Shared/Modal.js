import { Dialog, Transition } from "@headlessui/react";
import { ArrowPathIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { Fragment, useEffect, useState } from "react";
import { classNames } from "src/helpers";

const Modal = ({ title, secondaryTitle = "", isOpen = false, size = "md", onCancel = () => {}, onSuccess = () => {}, onClose = null, defaultOptions = null, isLoading = false, defaultStyles = null, children, hideCrossIcon = false, ...props }) => {
  const modalSize = {
    xs: "sm:max-w-lg",
    sm: "sm:max-w-xl",
    md: "sm:max-w-2xl",
    lg: "sm:max-w-3xl",
    xl: "sm:max-w-4xl",
    xxl: "sm:max-w-5xl",
    xxxl: "sm:max-w-6xl",
    xxxxl: "sm:max-w-7xl",
    xxxxxl: "sm:max-w-[1800px]",
    full: "max-w-full",
  };

  const [options, setOptions] = useState({
    onCancelButtonVisible: true,
    onCancelButtonText: "Cancel",
    onSuccessButtonVisible: true,
    onSuccessButtonText: "Submit",
    onSuccessLoaderVisible: false,
    onSuccessLoaderStart: false,
  });

  const [styles, setStyles] = useState({
    containerStyles: "w-full",
    overFlowYVisible: true,
  });

  const [lastClicked, setLastClicked] = useState("success");

  useEffect(() => {
    if (defaultOptions) setOptions({ ...options, ...defaultOptions });
    if (defaultStyles) setStyles({ ...styles, ...defaultStyles });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [defaultOptions, defaultStyles]);

  useEffect(() => {
    if (isLoading) {
      setOptions((prev) => ({ ...prev, onSuccessLoaderStart: isLoading, onSuccessLoaderVisible: isLoading }));
    } else {
      setTimeout(() => {
        setOptions((prev) => ({ ...prev, onSuccessLoaderStart: isLoading, onSuccessLoaderVisible: isLoading }));
      }, 300);
    }
  }, [isLoading]);

  return (
    <Transition.Root
      show={isOpen}
      as={Fragment}>
      <Dialog
        as="div"
        className="relative z-30"
        onClose={onCancel}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0">
          <div className="fixed inset-0 bg-black bg-opacity-50 transition-opacity" />
        </Transition.Child>

        <div className="fixed z-10 inset-0 overflow-y-auto">
          <div className="flex items-center justify-center max-h-full sm:h-full p-2 sm:px-6 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95">
              <Dialog.Panel className={classNames(`relative bg-white rounded-lg max-h-screen h-full sm:h-auto text-left shadow-xl transform transition-all sm:my-8 p-0`, modalSize[size], styles.containerStyles)}>
                <div className="flex justify-between py-4 px-4">
                  <Dialog.Title
                    as="h3"
                    className="text-xl text-left leading-6 font-semibold text-gray-900">
                    {title} {secondaryTitle && <span className="text-gray-400">/ {secondaryTitle}</span>}
                  </Dialog.Title>
                  {!hideCrossIcon && (
                    <button
                      type="button"
                      className="bg-white rounded-md text-gray-400 hover:text-gray-200 focus:outline-none"
                      onClick={onClose ? () => onClose() : () => onCancel()}>
                      <span className="sr-only">Close</span>
                      <XMarkIcon
                        className="h-6 w-6"
                        aria-hidden="true"
                      />
                    </button>
                  )}
                </div>

                <div className={`px-4 lg:px-8 sm:py-2 max-h-[calc(100vh-10rem)] ${styles?.overFlowYVisible ? "" : "overflow-y-scroll"}`}>{children}</div>
                <div className="p-4 flex justify-end space-x-4">
                  {options.onCancelButtonVisible && (
                    <button
                      disabled={(options.onCancelLoaderVisible && options.onCancelLoaderStart) || (options.onSuccessLoaderVisible && options.onSuccessLoaderStart)}
                      type="button"
                      className="w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:text-gray-500 focus:outline-none sm:mt-0 sm:w-auto sm:text-sm"
                      onClick={() => {
                        setLastClicked("cancel");
                        onCancel();
                      }}>
                      {options.onCancelButtonText}
                      {options.onCancelLoaderVisible && options.onCancelLoaderStart && lastClicked !== "success" && <ArrowPathIcon className="h-5 w-5 ml-2 animate-spin" />}
                    </button>
                  )}
                  {options.onSuccessButtonVisible && (
                    <button
                      type="button"
                      disabled={(options.onCancelLoaderVisible && options.onCancelLoaderStart) || (options.onSuccessLoaderVisible && options.onSuccessLoaderStart)}
                      className={`w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 text-base font-medium focus:outline-none sm:w-auto sm:text-sm ${
                        !((options.onCancelLoaderVisible && options.onCancelLoaderStart) || (options.onSuccessLoaderVisible && options.onSuccessLoaderStart)) ? "bg-amber-500 text-amber-950" : "bg-gray-50 text-gray-500"
                      }`}
                      onClick={() => {
                        setLastClicked("success");
                        onSuccess();
                      }}>
                      {options.onSuccessButtonText}
                      {options.onSuccessLoaderVisible && options.onSuccessLoaderStart && (lastClicked === "success" || !options.onCancelLoaderVisible) && (
                        <ArrowPathIcon className={`h-5 w-5 ml-2 animate-spin text-white ${!((options.onCancelLoaderVisible && options.onCancelLoaderStart) || (options.onSuccessLoaderVisible && options.onSuccessLoaderStart)) ? "text-white" : "!text-gray-500"}`} />
                      )}
                    </button>
                  )}
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
};

export default Modal;

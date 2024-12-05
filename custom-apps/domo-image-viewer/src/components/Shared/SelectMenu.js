import { Listbox, Transition } from "@headlessui/react";
import { CheckIcon, ChevronUpDownIcon } from "@heroicons/react/24/solid";
import { useEffect, useState } from "react";
import { classNames } from "src/helpers";

export default function SelectMenu({ options, defaultText = "Select an option", disabled = false, emptyListText = "No listed items", setOption, label, startIndex = 0, classes = "", size = "base" }) {
  const [selected, setSelected] = useState(0);
  const handleSelection = (e) => {
    setSelected(e);
    setOption(e);
  };

  const sizeGuide = {
    sm: "",
    base: "h-10",
    md: "h-12",
    lg: "",
    xl: "",
  };

  useEffect(() => {
    if (startIndex >= 0) {
      setSelected(options[startIndex]);
    } else {
      setSelected({ key: defaultText, value: -1 });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [startIndex]);

  return (
    <div className="relative">
      <div className={classNames("absolute top-0 left-0 h-full w-full z-20", disabled ? "cursor-not-allowed" : "hidden")}></div>
      <Listbox
        value={selected}
        onChange={handleSelection}>
        {({ open }) => (
          <>
            {label && <Listbox.Label className="block text-sm font-medium text-gray-700">{label}</Listbox.Label>}
            <div className={classNames("relative flex rounded-md", sizeGuide[size])}>
              <Listbox.Button
                disabled={options.length === 0}
                className={classNames("bg-white relative w-full border border-gray-300 hover:bg-gray-50 rounded-md shadow-sm pl-3 pr-10 py-2 text-left cursor-pointer focus:outline-none sm:text-sm", disabled ? "bg-gray-100" : "", classes)}>
                {disabled ? (
                  options.length && options[startIndex]?.Component ? (
                    options[startIndex]?.Component()
                  ) : (
                    defaultText
                  )
                ) : (
                  <span className="block truncate">{options.length === 0 ? emptyListText : selected ? (selected?.Component ? selected.Component() : selected.key) : defaultText}</span>
                )}
                <span className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                  <ChevronUpDownIcon
                    className="h-5 w-5 text-gray-400"
                    aria-hidden="true"
                  />
                </span>
              </Listbox.Button>
              <Transition
                show={open}
                as="div"
                leave="transition ease-in duration-100"
                leaveFrom="opacity-100"
                leaveTo="opacity-0">
                <div className="absolute z-50 left-0 top-0 bg-white flex flex-col shadow-lg max-h-60 min-w-[200px] rounded-md overflow-hidden text-base sm:text-sm">
                  <Listbox.Options className={classNames("py-1 text-base ring-1 ring-black ring-opacity-5 overflow-auto focus:outline-none sm:text-sm")}>
                    {options.length === 0 ? (
                      <Listbox.Option
                        key="no-option"
                        value={0}
                        className="text-gray-400 cursor-pointer hover:bg-gray-50 select-none relative py-2 pl-3 pr-9">
                        {emptyListText}
                      </Listbox.Option>
                    ) : (
                      options.map((option) => (
                        <Listbox.Option
                          key={option.value}
                          className={({ active }) => classNames(active ? "text-highlightColor" : "text-gray-900", "cursor-pointer hover:bg-gray-50 select-none relative py-2 pl-3 pr-9")}
                          value={option}>
                          {({ selected, active }) => (
                            <>
                              {option.Component ? option.Component() : <p className={classNames(selected ? "font-semibold" : "font-normal", "block truncate")}>{option.key}</p>}
                              {selected ? (
                                <span className={classNames(active ? "text-highlightColor" : "text-gray-900", "absolute inset-y-0 right-0 flex items-center pr-4")}>
                                  <CheckIcon
                                    className="h-5 w-5"
                                    aria-hidden="true"
                                  />
                                </span>
                              ) : null}
                            </>
                          )}
                        </Listbox.Option>
                      ))
                    )}
                  </Listbox.Options>
                </div>
              </Transition>
            </div>
          </>
        )}
      </Listbox>
    </div>
  );
}

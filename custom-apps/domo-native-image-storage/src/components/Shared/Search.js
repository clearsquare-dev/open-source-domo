import { XMarkIcon } from "@heroicons/react/24/outline";
import { MagnifyingGlassIcon } from "@heroicons/react/24/solid";
import { useState } from "react";
import { classNames } from "src/helpers";

const Search = ({ label, labelClasses, keyword, setKeyword, placeholder, clearIcon = false }) => {
  const [focused, setFocused] = useState(false);
  const [timeoutId, setTimeoutId] = useState(null);
  const [text, setText] = useState(keyword);

  const handleInputChange = (event) => {
    const newValue = event.target.value;

    setText(newValue);
    if (timeoutId) {
      clearTimeout(timeoutId);
    }

    const newTimeoutId = setTimeout(() => {
      setKeyword(newValue);
    }, 50);

    setTimeoutId(newTimeoutId);
  };

  return (
    <div className="relative w-full flex flex-col">
      {label && <label className={"block text-sm font-medium text-gray-700 " + labelClasses}>{label}</label>}
      <div className="group relative rounded-md shadow-sm w-full flex">
        <button
          className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none"
          aria-hidden="true">
          <MagnifyingGlassIcon
            className={classNames("mr-3 h-4", focused ? "text-highlightColor" : "text-gray-400")}
            aria-hidden="true"
          />
        </button>
        <input
          type="text"
          name="search"
          id="search"
          onBlur={() => setFocused(false)}
          onFocus={() => setFocused(true)}
          value={text}
          className="block w-full pl-9 h-10 border-gray-300 text-sm rounded-md focus:ring-0 focus:border-highlightColor"
          placeholder={placeholder}
          onChange={handleInputChange}
        />
      </div>
      {clearIcon && text && (
        <button
          onClick={() => handleInputChange({ target: { value: "" } })}
          className="h-7 hover:border-gray-200 border-transparent border-[1px] focus:ring-0 focus:border-highlightColor transition-all duration-200 rounded-full absolute z-20 group cursor-pointer bg-gray-50 bottom-1.5 right-1 p-1.5 flex items-center justify-center gap-x-1 pointer-cursor">
          <XMarkIcon
            className="h-4 w-4 text-gray-400 group-hover:text-gray-500 group-hover:bg-gray-100"
            aria-hidden="true"
          />
          <p className="pr-1 text-sm text-gray-400 group-hover:text-gray-500">clear</p>
        </button>
      )}
    </div>
  );
};

export default Search;

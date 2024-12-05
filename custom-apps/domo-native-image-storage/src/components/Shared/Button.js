import { Tooltip as ReactTooltip } from "react-tooltip";
import PreloaderIcon from "src/components/Shared/PreloaderIcon";
import { classNames } from "src/helpers";

const versions = {
  primary: {
    default: "text-sky-100 bg-sky-600 opacity-90 hover:shadow-md",
    disabled: "bg-gray-50 text-gray-400 cursor-not-allowed border border-gray-200",
  },
  secondary: {
    default: "bg-white text-sky-200 border-[1px] border-sky-200 hover:shadow-sm",
    disabled: "bg-gray-50 text-gray-300 cursor-not-allowed border-400",
  },
  black: {
    default: "bg-white text-gray-700 border-gray-500 hover:border-gray-700 border-[1px] hover:border-sky-200 hover:shadow-sm hover:text-sky-200",
    disabled: "cursor-not-allowed text-gray-400",
  },
  gray: {
    default: "bg-white text-gray-400 border-gray-200 hover:border-gray-400 border-[1px] hover:shadow-sm hover:text-gray-00",
    solid: "border-transparent bg-gray-50 text-gray-400 hover:bg-gray-100 hover:shadow-sm hover:text-gray-500",
    disabled: "cursor-not-allowed text-gray-200 border-gray-200/60",
  },
};

const Button = ({ children, version = "primary", color = "default", onClick, disabled = false, hoverText = null, style = "", className = "", width = "", loading = false }) => {
  return (
    <>
      <button
        data-tooltip-id={hoverText ? `${hoverText}-custom-link` : null} // Conditionally set data-tooltip-id
        onClick={onClick}
        disabled={disabled}
        style={style ? style : {}}
        className={classNames(
          "group inline-flex items-center justify-center transition-all duration-200 rounded-md border px-4 py-2 text-regular font-medium focus:ring-2 focus:border-sky-200",
          disabled ? versions[version].disabled : versions[version][color],
          width ? width : " sm:w-auto",
          className
        )}>
        <div className="flex items-center gap-x-2">
          {children}
          {loading && (
            <PreloaderIcon
              height="h-5"
              width="w-5"
            />
          )}
        </div>
      </button>
      <ReactTooltip
        id={`${hoverText}-custom-link`}
        delayShow={200}
        positionStrategy="fixed"
        className="opacity-100 bg-gray-700 rounded px-2 py-2">
        <div className="font-normal leading-[10px]">{hoverText}</div>
      </ReactTooltip>
    </>
  );
};

export default Button;

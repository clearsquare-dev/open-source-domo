import { classNames } from "src/helpers";

const Input = ({ autoComplete = "off", label, name, placeholder, disabled = false, value = "", error = false, type = "text", inputClassNames = "", labelClassNames = "", onChange = () => {}, onFocus = () => {}, onKeyDown = () => {}, onBlur = () => {} }) => {
  const labelClasses = classNames(labelClassNames, "flex justify-between text-sm font-medium", error ? "text-red-600" : "", disabled ? "text-gray-400 cursor-not-allowed" : "text-gray-400");
  const inputClasses = classNames(
    "h-10 block w-full flex items-center sm:text-sm border-gray-300 rounded-md shadow-sm focus:ring-0 focus:border-highlightColor",
    error ? "border-red-300" : "",
    disabled ? "text-gray-300 cursor-not-allowed bg-gray-50/50" : "",
    inputClassNames ? inputClassNames : "leading-normal" // Adjusted line height
  );
  return (
    <>
      {label && (
        <label
          htmlFor={name}
          className={labelClasses}>
          {label} <div className="pl-2">{error ? "*Required" : ""}</div>
        </label>
      )}
      <div>
        <input
          disabled={disabled}
          value={value}
          type={type}
          name={name}
          autoComplete={autoComplete}
          onFocus={onFocus}
          onChange={onChange}
          onKeyDown={onKeyDown}
          onBlur={onBlur}
          className={inputClassNames ? inputClassNames : inputClasses}
          placeholder={disabled ? "" : placeholder}
        />
      </div>
    </>
  );
};

export default Input;

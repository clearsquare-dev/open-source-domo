import { Switch } from "@headlessui/react";
import { classNames } from "src/helpers";

export default function Toggle({ checked, onChange, disabled = false }) {
  return (
    <div className={classNames(disabled ? "cursor-not-allowed" : "")}>
      <Switch.Group
        as="div"
        className="flex items-center">
        <Switch
          checked={checked}
          disabled={disabled}
          onChange={onChange}
          className={classNames(
            disabled ? "cursor-not-allowed" : "cursor-pointer",
            disabled && checked ? "bg-gray-300" : checked ? "bg-amber-500" : "bg-gray-200",
            "relative inline-flex h-[21px] w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-offset-2"
          )}>
          <span className="sr-only">Toggle item</span>
          <span
            aria-hidden="true"
            className={classNames(disabled ? "cursor-not-allowed" : "", checked ? "translate-x-5" : "translate-x-0", "pointer-events-none inline-block h-[19px] w-[19px] transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out")}
          />
        </Switch>
      </Switch.Group>
    </div>
  );
}

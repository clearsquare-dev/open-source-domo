import { ArrowPathIcon } from "@heroicons/react/24/solid";
import { useState } from "react";
import domo from "ryuu.js";
import { classNames } from "./helpers";

// let isDevelopment = false;
// let isDevelopment = true;

const App = () => {
  const [isLoading, setIsLoading] = useState(false);

  const startFunction = () => {
    setIsLoading(true);

    let payload = { datasetId: "dc609d37-4857-47ec-af72-c3fefd2bf990" };

    setTimeout(() => {
      domo
        .post(`/domo/codeengine/v2/packages/runDataset`, payload)
        .then((response) => {
          console.log("response", response)
          setIsLoading(false);
        })
        .catch((err) => {
          setIsLoading(false);
        });
    }, 600);
  };

  return (
    <div className="h-screen w-screen flex items-center justify-center">
      <button
        className="hover:bg-sky-400 transition-all px-3 py-2 rounded bg-sky-300 text-white text-lg font-extrabold flex items-center justify-center gap-x-3"
        onClick={startFunction}>
        Refresh <ArrowPathIcon className={classNames(isLoading ? "animate-spin" : "", "h-5 w-5 stroke-2")} />
      </button>
    </div>
  );
};

export default App;

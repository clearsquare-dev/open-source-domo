import { useState } from "react";
import { classNames } from "src/helpers";
import UploadNew from "src/components/Paritals/UploadNew/UploadNew";
import History from "./components/Paritals/History/History";

const App = () => {
  const [selectedTab, setSelectedTab] = useState("NEW"); // "HISTORY","HELP"
  let tabs = [
    { key: "NEW", text: "Upload New" },
    { key: "HISTORY", text: "History" },
    // { key: "HELP", text: "Help & Support" },
  ];

  return (
    <div className="w-screen h-[800px] p-4">
      <div className="mb-4 flex gap-x-2 relative">
        {tabs.map((tab) => {
          return (
            <div
              key={tab.key}
              onClick={() => setSelectedTab(tab.key)}
              className={classNames(
                "group transition-all cursor-pointer flex rounded-t-md border border-b-0 px-4 py-3",
                selectedTab === tab.key ? "border-b relative z-20 border-indigo-500 bg-indigo-100" : "border-gray-300 bg-white hover:border-indigo-300 hover:bg-indigo-50 hover:shadow"
              )}>
              <div className={classNames("transition-all font-light flex items-center justify-center text-md", selectedTab === tab.key ? "text-indigo-800" : "text-gray-400 group-hover:text-indigo-400")}>{tab.text}</div>
            </div>
          );
        })}
        <div className="absolute h-2 bg-white -bottom-2 left-0 z-10 w-full border-t border-gray-200"></div>
      </div>
      <div className={classNames("h-full w-full", selectedTab === "NEW" ? "block" : "hidden")}>
        <UploadNew />
      </div>
      <div className={classNames("h-full w-full", selectedTab === "HISTORY" ? "block" : "hidden")}>
        <History />
      </div>
    </div>
  );
};

export default App;

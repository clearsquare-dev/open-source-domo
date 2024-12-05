import moment from "moment";
import { classNames, formatFileSize } from "src/helpers";
import UserProfile from "./UserProfile";
import PreloaderIcon from "../../Shared/PreloaderIcon";
import { useState } from "react";

export default function FilesTable({ files = [], setSelectedFile = () => {}, isSelectedFileLoading = false, setIsSelectedFileLoading = () => {}, isLoadingFiles = true, users = {} }) {
  const [selectedDataFileId, setSelectedDataFileId] = useState(false);
  return (
    <div className="overflow-x-auto">
      <div className="inline-block min-w-full align-middle">
        {/* Add a div wrapper for the table with a max height and overflow-y-scroll */}
        <div className="max-h-[1000px] overflow-y-scroll">
          <table className="mt-3 min-w-full divide-y divide-gray-300">
            <thead className="sticky top-0 bg-white z-10">
              <tr>
                <th
                  scope="col"
                  className="py-2 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-1">
                  Name/Description
                </th>
                <th
                  scope="col"
                  className="px-3 py-2 text-left text-sm font-semibold text-gray-900">
                  Type
                </th>
                <th
                  scope="col"
                  className="px-3 py-2 text-left text-sm font-semibold text-gray-900">
                  Creator
                </th>
                <th
                  scope="col"
                  className="px-3 py-2 text-left text-sm font-semibold text-gray-900">
                  Date
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {!isLoadingFiles ? (
                files.map((file) => {
                  let type = file?.currentRevision?.contentType ? file?.currentRevision?.contentType : "undefined";
                  if (type?.includes("application/")) {
                    type = file?.currentRevision?.contentType?.split("application/")[1];
                  }
                  if (type?.includes(".")) {
                    type = type.split(".")[type.split(".").length - 1];
                  }
                  return (
                    <tr
                      onClick={() => {
                        if (selectedDataFileId !== file.dataFileId && !isSelectedFileLoading) {
                          setIsSelectedFileLoading(true);
                          setSelectedDataFileId(file.dataFileId);
                          setSelectedFile(file);
                        }
                      }}
                      key={file.dataFileId}
                      className={classNames(selectedDataFileId === file.dataFileId ? "bg-indigo-50" : isSelectedFileLoading ? "cursor-not-allowed" : "cursor-pointer hover:bg-indigo-50")}>
                      <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-2">
                        <div className="flex flex-col h-[34px] justify-center">
                          <p className=" truncate w-[220px]">{file.name}</p>
                          <p className="text-sm text-gray-300 truncate w-[220px]">{file?.currentRevision?.description}</p>
                        </div>
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                        <div>
                          <div>{type}</div>
                          <div>{formatFileSize(+file?.currentRevision?.sizeBytes)}</div>
                        </div>
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500 w-[140px] h-[18px]">
                        {users[file?.responsibleUserId] ? (
                          <UserProfile
                            size="xs"
                            user={users[file?.responsibleUserId]}
                          />
                        ) : (
                          <div className="animate-pulse rounded-full bg-gray-100 h-4 w-32" />
                        )}
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                        <div className="flex flex-col">
                          <p>{moment(file.datetimeCreated).format("MMM D, YYYY")}</p>
                          <p>{moment(file.datetimeCreated).format("h:mm:ssa")}</p>
                        </div>
                      </td>
                    </tr>
                  );
                })
              ) : (
                <div className="flex items-start">
                  <div className="pl-3 mt-4 pt-2 flex justify-center text-lg gap-x-3 items-center text-gray-500">
                    <PreloaderIcon
                      height="h-8"
                      width="h-8"
                    />{" "}
                    Loading...
                  </div>
                </div>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

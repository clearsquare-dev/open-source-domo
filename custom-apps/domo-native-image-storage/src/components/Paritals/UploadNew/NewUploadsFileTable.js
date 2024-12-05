import { TrashIcon } from "@heroicons/react/24/outline";
import { classNames } from "src/helpers";

export default function NewUploadsFilesTable({ files = [], deleteFileUpload = () => {} }) {
  return (
    <div className="-my-2 overflow-x-auto">
      <div className="inline-block min-w-full py-2 align-middle">
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
                  Status
                </th>
                <th
                  scope="col"
                  className="px-3 py-2 text-left text-sm font-semibold text-gray-900">
                  Action
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {files?.length === 0 && <div className="mt-4 inline-flex py-2 px-4 rounded bg-slate-100 text-slate-400 text-lg">No images uploaded.</div>}
              {files?.length > 0 &&
                files.map((file, i) => {
                  return (
                    <tr key={file?.name + "_" + file?.metadataDescription + "_" + i}>
                      <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-2">
                        <div className="flex flex-col h-[34px] justify-center">
                          <p className=" truncate w-[220px]">{file?.name || file?.metadataName}</p>
                          <p className="text-sm text-gray-300 truncate w-[220px]">{file?.metadataDescription}</p>
                        </div>
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                        <div>
                          <div>{file?.type}</div>
                          <div>{file?.size}</div>
                        </div>
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm w-[140px] h-[18px]">
                        <span
                          className={classNames(
                            "whitespace-nowrap px-3 py-1 rounded-full text-sm w-[140px] h-[18px]",
                            file?.upload?.type === "waiting" && "bg-gray-100 text-gray-400",
                            file?.upload?.type === "success" && "bg-green-50 text-green-400",
                            file?.upload?.type === "fail" && "bg-red-50 text-red-400"
                          )}>
                          {file?.upload?.type === "waiting" && "Waiting"}
                          {/* {file?.upload?.type === "waiting" && "Pending"} */}
                          {file?.upload?.type === "success" && "Uploaded"}
                          {file?.upload?.type === "fail" && "Failed"}
                        </span>
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                        {file?.upload?.type === "waiting" ? (
                          <div
                            className="cursor-pointer transition-all text-gray-400 hover:bg-red-100 hover:text-red-500 bg-white hover:shadow-sm rounded-sm flex justify-center items-center h-9 w-9"
                            onClick={() => deleteFileUpload(i)}>
                            <TrashIcon className="h-6 w-6" />
                          </div>
                        ) : (
                          file?.upload?.message && <div className="flex flex-col">{/* {file?.upload?.message} */}</div>
                        )}
                      </td>
                    </tr>
                  );
                })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

import { ArrowDownOnSquareIcon } from "@heroicons/react/24/outline";
import moment from "moment";
import { useState } from "react";
import PDFViewer from "src/components/Paritals/FileViewers/PDFViewer";
import UserProfile from "src/components/Paritals/FileViewers/UserProfile";
import Modal from "src/components/Shared/Modal";
import PreloaderIcon from "src/components/Shared/PreloaderIcon";
import { deleteFile, downloadFile } from "src/domo-functions/filesAPI";
import { formatFileSize } from "src/helpers";

export default function FileDisplay({ isFileLoading, file, countryStatus = "US" }) {
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  let type = file?.currentRevision?.contentType ? file?.currentRevision?.contentType : "undefined";
  if (type?.includes("application/")) {
    type = file?.currentRevision?.contentType?.split("application/")[1];
  }
  if (type?.includes(".")) {
    type = type.split(".")[type.split(".").length - 1];
  }

  async function handleDeleteDocument() {
    setIsDeleteModalOpen(false);
    await deleteFile(file.dataFileId);
  }

  return (
    <div className="h-full bg-white p-1 lg:p-8 overflow-y-scroll">
      {isFileLoading ? (
        <div className="h-full w-full flex justify-center">
          <div className="flex flex-col items-center justify-center gap-y-3">
            <PreloaderIcon />
            <p className="text-gray-300 text-lg font-medium">Loading document...</p>
          </div>
        </div>
      ) : (
        <div className="space-y-6 pb-16">
          <div className="w-full lg:max-w-2xl xl:max-w-2xl">
            <div className="relative aspect-h-7 aspect-w-10 min-h-[70px] min-w-[100px] block w-full overflow-hidden rounded-lg">
              {!file?.currentRevision?.contentType ? <div className="h-[20px] w-[20px] bg-gray-200">Document cannot load.</div> : ""}
              {file?.currentRevision?.contentType === "application/pdf" && <PDFViewer file={file} />}
              {["image/jpeg", "image/png"].includes(file?.currentRevision?.contentType) && (
                <div>
                  <img
                    src={file.image}
                    alt=""
                    className="object-cover"
                  />
                </div>
              )}
              <div className="flex">
                <button
                  type="button"
                  onClick={() => downloadFile({ dataFileId: file?.dataFileId })}
                  className="absolute bottom-2 right-2 h-12 w-12 flex items-center justify-center">
                  <ArrowDownOnSquareIcon className="text-white h-9 w-9 bg-opacity-20 transition-all hover:bg-opacity-40 bg-white px-1.5 pt-1 pb-2 rounded-md" />
                </button>
              </div>
            </div>
            <div className="mt-4 flex items-start justify-between">
              <div>
                <h2 className="text-base font-semibold leading-6 text-gray-900">
                  <span className="sr-only">Details for </span>
                  {file?.name}
                </h2>
                <p className="my-1.5 text-sm font-medium text-gray-500">
                  {formatFileSize(+file?.currentRevision?.sizeBytes)} <span className="ml-5 p-2 rounded-md bg-gray-100">{type}</span>
                </p>
                <dd className="text-gray-900">
                  {/* <img
                  alt={file?.currentRevision?.contentType.split("application/")[1]}
                  src={typeToIcon(file?.currentRevision?.contentType.split("application/")[1])}
                /> */}
                </dd>
              </div>
            </div>
          </div>
          <div>
            <dl className="divide-y divide-gray-200">
              <div className="flex justify-between py-3 text-sm font-medium">
                <dt className="text-gray-500">dataFileId</dt>
                <dd className="text-gray-900">{file?.dataFileId}</dd>
              </div>
              <div className="flex justify-between py-3 text-sm font-medium">
                <dt className="text-gray-500">Created by</dt>
                <div>
                  <dd className="text-gray-900">
                    <UserProfile user={file?.createdByUser} />{" "}
                  </dd>
                  <dd className="text-gray-900">{moment(file?.datetimeCreated).format(countryStatus === "US" ? "MMM D, YYYY h:mm:ssa" : "MMM D, YYYY hh:mm:ss")}</dd>
                </div>
              </div>
              <div className="flex justify-between py-3 text-sm font-medium">
                <dt className="text-gray-500">Last modified</dt>
                <div>
                  <dd className="text-gray-900">
                    <UserProfile user={file?.currentRevision?.updatedByUser} />
                  </dd>
                  <dd className="text-gray-900">{moment(file?.currentRevision?.datetimeUploaded).format(countryStatus === "US" ? "MMM D, YYYY h:mm:ssa" : "MMM D, YYYY hh:mm:ss")}</dd>
                </div>
              </div>
            </dl>
          </div>
          <div>
            <h3 className="font-medium text-gray-900">Description</h3>
            <div className="mt-2 flex items-center justify-between">
              <p className="text-sm italic text-gray-500">{file?.currentRevision?.description || <span className="text-gray-200">Add a description to this image.</span>}</p>
              {/* <button
                type="button"
                className="relative -mr-2 flex h-8 w-8 items-center justify-center rounded-full bg-white text-gray-400 hover:bg-gray-100 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500">
                <span className="absolute -inset-1.5" />
                <PencilIcon
                  className="h-5 w-5"
                  aria-hidden="true"
                />
                <span className="sr-only">Add description</span>
              </button> */}
            </div>
          </div>
          <div>
            <h3 className="font-medium text-gray-900 flex justify-between">Shared with {file?.publicAccess ? <span className="bg-gray-50 text-gray-300 rounded py-1 px-2">Public</span> : null}</h3>
            <ul className="mt-2 divide-y divide-gray-200 border-b border-t border-gray-200">
              {file?.permissions?.entries &&
                file?.permissions?.entries?.map((entry) => {
                  return (
                    <li
                      key={entry.entityId}
                      className="flex flex-col gap-y-2 py-3">
                      <p>
                        {entry.entityType}: {entry.entityId}
                      </p>
                      <p>Grant: {entry.grant}</p>
                      <p>Pass: {entry.pass}</p>
                    </li>
                  );
                })}
              {/* 
              <li className="flex items-center justify-between py-2">
                <button
                  type="button"
                  className="group -ml-1 flex items-center rounded-md bg-white p-1 focus:outline-none focus:ring-2 focus:ring-indigo-500">
                  <span className="flex h-8 w-8 items-center justify-center rounded-full border-2 border-dashed border-gray-300 text-gray-400">
                    <PlusIcon
                      className="h-5 w-5"
                      aria-hidden="true"
                    />
                  </span>
                  <span className="ml-4 text-sm font-medium text-indigo-600 group-hover:text-indigo-500">Share</span>
                </button>
              </li> */}
            </ul>
            {/* <div>
            <div className="text-gray-400 font-semibold w-full gap-y-4 flex flex-col">
              <div className="w-full flex justify-between">
                <p className="flex gap-x-2 items-center justify-center">
                  <GlobeAltIcon className="h-5 w-5 stroke-2" />
                  Create Public Link
                </p>
                <Toggle
                  checked={isPublic}
                  onChange={() => setIsPublic(!isPublic)}
                />
              </div>
              <div className="">
                <Input
                  label="Public URL"
                  disabled={true}
                  value={fileMetadataDescription}
                  onChange={(e) => setFileMetadataDescription(e.target.value)}
                />
              </div>
            </div>
          </div> */}
          </div>
          {/* <div className="flex">
            <button
              type="button"
              onClick={() => setIsDeleteModalOpen(true)}
              className="ml-3 flex-1 bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50">
              Delete
            </button>
          </div> */}
        </div>
      )}
      <Modal
        title="Document"
        secondaryTitle="Delete"
        defaultOptions={{
          onSuccessButtonText: "Confirm",
        }}
        isOpen={!!isDeleteModalOpen}
        onCancel={() => setIsDeleteModalOpen(false)}
        onSuccess={handleDeleteDocument}>
        <div className="grid gap-y-8 whitespace-nowrap text-sm text-gray-500">Are you sure you want to delete?</div>
      </Modal>
    </div>
  );
}

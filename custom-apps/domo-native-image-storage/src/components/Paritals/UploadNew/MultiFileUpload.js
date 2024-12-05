import { CloudArrowDownIcon, ComputerDesktopIcon } from "@heroicons/react/24/outline";
import { useRef, useState } from "react";
import domo from "ryuu.js";
import PreloaderIcon from "src/components/Shared/PreloaderIcon";
import { classNames } from "src/helpers";

const MultiFileUpload = ({ files, setFiles, uploadingFilesStatus, setUploadingFilesStatus }) => {
  const inputFileRef = useRef(null);

  // const [disable, setDisable] = useState(false);
  // const [isPublic, setIsPublic] = useState(true);

  const [filesUploaded, setFilesUploaded] = useState([]);

  function formatFileSize(size) {
    if (size < 1024) {
      return size + " B";
    } else if (size < 1024 * 1024) {
      return (size / 1024).toFixed(2) + " KB";
    } else {
      return (size / (1024 * 1024)).toFixed(2) + " MB";
    }
  }

  const handleFileChange = (e) => {
    const selectedFiles = Array.from(e.target.files);
    const formattedFiles = selectedFiles.map((file) => ({
      file,
      name: file.name.trim(),
      type: file.type.trim(),
      upload: { type: "waiting", message: {} },
      size: formatFileSize(file.size),
      metadataName: file.name.trim(),
      metadataDescription: file.type.trim() + " | " + formatFileSize(file.size),
    }));
    setFiles(formattedFiles);
    // setDisable(false);
    inputFileRef.current.value = null;
    setUploadingFilesStatus("FILES_SELECTED");
  };

  const onSubmit = async () => {
    setFilesUploaded(0);
    setUploadingFilesStatus("UPLOADING_FILES");
    const csvRows = ["Name,Type,Size,dataFileId"];
    try {
      for (let i = 0; i < files.length; i++) {
        const fileData = files[i];
        const formData = new FormData();
        formData.append("file", fileData.file);
        const url = `/domo/data-files/v1?name=${fileData.metadataName}${fileData.metadataDescription ? "&description=" + fileData.metadataDescription : ""}&public=${true}`;
        const options = { contentType: "multipart" };
        let upload = { type: "success", message: {} };
        try {
          const response = await domo.post(url, formData, options);
          const dataFileId = response.dataFileId;
          csvRows.push(`${fileData.name},${fileData.type},${fileData.size},${dataFileId}`);

          // Use functional update to ensure you're incrementing based on the current state
          // files
        } catch (err) {
          upload = { type: "fail", message: err };
          // setDocumentUploadFailures((prevUploadFailures) => {
          //   return [...prevUploadFailures, { id: fileData.metadataName, message: "Failure to upload: " + fileData.metadataName }];
          // });
        }
        let updatedFiles = files.map((file, j) => {
          if (i === j) {
            file.upload = upload;
          }
          return file;
        });
        setFilesUploaded(i + 1);
        setFiles(updatedFiles);
      }
      // setFiles([]);
      // filesUploadsDataset <-- Upload to Domo dataset
      setUploadingFilesStatus("UPLOADING_FILES");
      downloadCSV(csvRows);
    } catch (err) {
      console.dir(err);
    }
    setUploadingFilesStatus("FILES_UPLOADED");
  };

  const onClear = () => {
    setFilesUploaded(0);
    setFiles([]);
    setUploadingFilesStatus("SELECT_FILES");
  };

  function downloadCSV(rows) {
    const csvContent = rows.join("\n");
    const blob = new Blob([csvContent], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.setAttribute("href", url);
    a.setAttribute("download", "file_uploads.csv");
    a.click();
  }

  return (
    <>
      <div className={classNames("mx-auto relative flex gap-y-5 flex-col w-full", ["UPLOADING_FILES", "FILES_UPLOADED"].includes(uploadingFilesStatus) ? "bg-gray-50":"")}>
        <div className="relative">
          <div className="transition-all duration-150 h-[280px] relative border p-5 overflow-x-hidden overflow-y-scroll flex flex-col justify-center items-center border-dotted border-gray-300 rounded-md">
            <input
              ref={inputFileRef}
              disabled={["UPLOADING_FILES", "FILES_UPLOADED"].includes(uploadingFilesStatus)}
              type="file"
              multiple
              onChange={handleFileChange}
              className="absolute top-0 left-0 h-full w-full z-10 opacity-0 cursor-pointer"
            />

            <div className="h-full w-full p-5 flex flex-col justify-center items-center relative">
              <div className="relative">
                <div className="relative flex flex-col items-center justify-center gap-2 h-40">
                  <input
                    id="bulk_upload-input"
                    disabled={["UPLOADING_FILES", "FILES_UPLOADED"].includes(uploadingFilesStatus)}
                    type={"file"}
                    multiple
                    onChange={handleFileChange}
                    className="absolute top-0 right-0 w-full h-full opacity-0 z-10"
                  />
                  <CloudArrowDownIcon className="w-12 h-12 text-gray-500 text-sm stroke-1" />
                  <div className="text-gray-500 font-thin">Drag and drop to upload files from your computer</div>
                </div>
              </div>
              <div className="relative z-20 cursor-pointer">
                <label htmlFor="bulk_upload-input">
                  <div className="text-indigo-500 hover:shadow border border-transparent hover:border-indigo-100 cursor-pointer font-light bg-indigo-50 transition-all py-4 px-7 text-lg rounded-md flex gap-x-4 ">
                    <ComputerDesktopIcon className="h-6 w-7 stroke-1" />
                    Upload from computer
                  </div>
                </label>
              </div>
            </div>
          </div>
        </div>

        {/* {["FILES_SELECTED", "UPLOADING_FILES", "FILES_UPLOADED"].includes(uploadingFilesStatus) && files.length > 0 && (
          <div className="w-full space-y-4">
            {files.map((fileData, index) => (
              <div
                key={index}
                className="font-light flex focus:outline-none text-gray-400 h-12 border border-gray-200 sm:w-auto relative">
                <div className="flex w-full items-center gap-x-5">
                  <div className="relative w-9 h-9">
                    <DocumentTextIcon className="absolute bottom-0 left-0 pl-2 w-9 h-9 stroke-1" />
                    {fileData.upload?.type === "success" && (
                      <div className="absolute z-10 top-0 -right-2 text-green-600">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="white"
                          viewBox="0 0 24 24"
                          strokeWidth="1.5"
                          class="h-6 w-6 stroke-green-600">
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                          />
                        </svg>
                      </div>
                    )}
                    {fileData.upload?.type === "fail" && (
                      <div className="absolute z-10 top-0 -right-2 text-red-600">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="white"
                          viewBox="0 0 24 24"
                          strokeWidth="1.5"
                          class="h-6 w-6 stroke-red-600">
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25Zm-1.72 6.97a.75.75 0 1 0-1.06 1.06L10.94 12l-1.72 1.72a.75.75 0 1 0 1.06 1.06L12 13.06l1.72 1.72a.75.75 0 1 0 1.06-1.06L13.06 12l1.72-1.72a.75.75 0 1 0-1.06-1.06L12 10.94l-1.72-1.72Z"
                          />
                        </svg>
                      </div>
                    )}
                  </div>
                  <div>
                    <div className="text-xl w-[380px] truncate">{fileData.name}</div>
                    <div className="text-sm font-thin">
                      {fileData.size} | {fileData.type}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )} */}

        {["FILES_SELECTED", "UPLOADING_FILES"].includes(uploadingFilesStatus) && (
          <div className="mt-4 w-full">
            <div className="w-full justify-end transition-all flex">
              {/* {documentUploadFailures?.map((uploadFailure) => {
              return <div>{uploadFailure.id}</div>;
              })} */}
              <button
                disabled={uploadingFilesStatus === "UPLOADING_FILES"}
                className="hover:shadow-lg w-full rounded-md cursor-pointer text-indigo-600 hover:text-indigo-700 border border-indigo-400 hover:border-indigo-600 hover:bg-indigo-50 transition-all py-4 px-7 text-lg flex justify-center items-center"
                onClick={onSubmit}>
                {uploadingFilesStatus === "UPLOADING_FILES" && <PreloaderIcon />}
                {uploadingFilesStatus === "FILES_SELECTED" && "Upload file(s)"}
              </button>
            </div>
            <p className="h-10 text-gray-400 text-sm">
              {uploadingFilesStatus === "UPLOADING_FILES" ? (
                <div>
                  Uploading {filesUploaded}/{files?.length}
                </div>
              ) : null}
            </p>
          </div>
        )}

        {["FILES_UPLOADED"].includes(uploadingFilesStatus) && (
          <div className="mt-4 w-full justify-end transition-all flex opacity-100">
            <button
              className="text-indigo-950 hover:shadow-lg w-full cursor-pointer bg-indigo-500 transition-all py-4 px-7 text-lg rounded-sm flex justify-center items-center"
              onClick={onClear}>
              Clear
            </button>
          </div>
        )}
      </div>
    </>
  );
};

export default MultiFileUpload;

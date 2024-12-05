import { useState } from "react";
import MultiFileUpload from "src/components/Paritals/UploadNew/MultiFileUpload";
import NewUploadsFilesViewer from "src/components/Paritals/UploadNew/NewUploadsFilesViewer";

const UploadNew = () => {
  const [files, setFiles] = useState([]);
  const [uploadingFilesStatus, setUploadingFilesStatus] = useState("SELECT_FILES"); // FILES_SELECTED, UPLOADING_FILES, FILES_UPLOADED

  function deleteFileUpload(index) {
    setFiles((prevFiles) => prevFiles.filter((_, i) => i !== index));
  }

  return (
    <div className="flex flex-col md:flex-row">
      <div className="h-full w-full md:min-w-[350px] lg:max-w-2xl xl:max-w-2xl flex">
        <MultiFileUpload
          files={files}
          setFiles={setFiles}
          uploadingFilesStatus={uploadingFilesStatus}
          setUploadingFilesStatus={setUploadingFilesStatus}
        />
      </div>
      <div className="h-full w-full">
        <NewUploadsFilesViewer
          files={files}
          deleteFileUpload={deleteFileUpload}
          // clearsFilesUpload={clearsFilesUpload}
          uploadingFilesStatus={uploadingFilesStatus}
          setUploadingFilesStatus={setUploadingFilesStatus}
        />
      </div>
    </div>
  );
};

export default UploadNew;

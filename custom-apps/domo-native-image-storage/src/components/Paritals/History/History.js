import { useEffect, useState } from "react";
import FileDisplay from "src/components/Paritals/FileViewers/FileDisplay";
import FileViewer from "src/components/Paritals/FileViewers/FileViewer";
import { getFilePermissions, previewFile } from "src/domo-functions/filesAPI";
import { getSingleUser } from "src/domo-functions/usersAPI";

const History = () => {
  const [files, setFiles] = useState([]);
  const [firstLoad, setFirstLoad] = useState(true);
  const [selectedFile, setSelectedFile] = useState(null);

  const [isSelectedFileLoading, setIsSelectedFileLoading] = useState(true);

  async function handleFileSelection(file) {
    let { dataFileId, responsibleUserId, currentRevision } = file;
    let filePermissionsResponse = await getFilePermissions({ dataFileId });
    let filePreviewResponse = await previewFile({ file, dataFileId });
    let creationUserResponse = await getSingleUser({ userId: responsibleUserId });
    let currentUserResponse = await getSingleUser({ userId: currentRevision?.uploadUserId });

    setSelectedFile({ ...file, currentRevision: { ...currentRevision, updatedByUser: currentUserResponse }, permissions: filePermissionsResponse, image: filePreviewResponse, createdByUser: creationUserResponse });
    setIsSelectedFileLoading(false);
  }

  useEffect(() => {
    if (firstLoad && files.length > 0) {
      handleFileSelection(files[0]);
      setFirstLoad(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [files?.length]);

  return (
    <div className="flex w-full h-full">
      <div className="border border-gray-100 rounded-md shadow h-full w-full md:min-w-[350px] lg:max-w-2xl xl:max-w-2xl flex justify-center">
        <FileDisplay
          isFileLoading={isSelectedFileLoading}
          file={selectedFile}
        />
      </div>
      <FileViewer
        files={files}
        setFiles={setFiles}
        handleFileSelection={handleFileSelection}
        selectedFile={selectedFile}
        setSelectedFile={setSelectedFile}
        isSelectedFileLoading={isSelectedFileLoading}
        setIsSelectedFileLoading={setIsSelectedFileLoading}
      />
    </div>
  );
};

export default History;

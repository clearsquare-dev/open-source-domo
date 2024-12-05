import { useEffect, useState } from "react";
import domo from "ryuu.js";
import FileDisplay from "src/components/Paritals/FileDisplay";
import { getFileDetailsList, getFilePermissions, previewFile } from "src/domo-functions/filesAPI";
import { getSingleUser } from "src/domo-functions/usersAPI";
import PreloaderIcon from "./components/Shared/PreloaderIcon";

const App = () => {
  const [isDebugginMode, setIsDebugginMode] = useState(false);
  const [imageFile, setImageFile] = useState(null);
  const [isImageFileLoading, setIsImageFileLoading] = useState(false);

  const [howToRenderMultipleImages, setHowToRenderMultipleImages] = useState("first");
  const [defaultElement, setDefaultElement] = useState(null);

  const [maxHeight, setMaxHeight] = useState("auto");
  const [maxWidth, setMaxWidth] = useState("auto");

  const [imageType, setImageType] = useState("dataFileId");

  const [noImages, setNoImages] = useState(false);

  useEffect(() => {
    let isLocalhost = checkBrowserEnvironment();

    async function loadFiles() {
      setIsImageFileLoading(true);
      let data = await domo.get(`/data/v1/imagesDataset?limit=10`);
      let imageSettingsResponse = await domo.get(`/data/v1/imageSettings?limit=10`);
      let imageSettings = imageSettingsResponse[0];

      if (data.length === 0) {
        // There is nothing to load: Show breaking error message
        setNoImages(true);
      }

      if (data.length > 1) {
        // Check if you should load the first image
        if (imageSettings?.howToRenderMultipleImages === "element") {
          setHowToRenderMultipleImages(imageSettings?.howToRenderMultipleImages || "");
          setDefaultElement(imageSettings?.defaultElement || "");
        }
      }

      if (imageSettings?.maxWidth) {
        setMaxWidth(imageSettings?.maxWidth);
      }
      if (imageSettings?.maxHeight) {
        setMaxHeight(imageSettings?.maxHeight);
      }

      let file = {};
      if (imageSettings?.imageType === "dataFileId") {
        let filesResponse = await getFileDetailsList({ idList: [data[0].dataFileId], sortOrder: "ASC", debugging: isLocalhost });
        file = filesResponse[0];
        handleDomoDataFileId(file);
      } else if (imageSettings?.imageType === "dataFileUrl") {
        setImageFile(data[0]);
        setImageType(imageSettings?.imageType);
      }
      setIsImageFileLoading(false);
    }
    loadFiles();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function checkBrowserEnvironment() {
    let isLocalhost = window.location.hostname === "localhost" || window.location.hostname === "127.0.0.1";
    if (isLocalhost) {
      setIsDebugginMode(true);
    }
    return isLocalhost;
  }

  async function handleDomoDataFileId(file) {
    let { dataFileId, responsibleUserId, currentRevision } = file;
    let filePermissionsResponse = await getFilePermissions({ dataFileId, debugging: isDebugginMode });
    let filePreviewResponse = await previewFile({ file, dataFileId, debugging: isDebugginMode });
    let creationUserResponse = await getSingleUser({ userId: responsibleUserId, debugging: isDebugginMode });
    let currentUserResponse = await getSingleUser({ userId: currentRevision?.uploadUserId, debugging: isDebugginMode });

    setImageFile({ ...file, currentRevision: { ...currentRevision, updatedByUser: currentUserResponse }, permissions: filePermissionsResponse, image: filePreviewResponse, createdByUser: creationUserResponse });
  }

  return (
    <div className="w-full h-full">
      {isImageFileLoading ? (
        <div className="h-full w-full flex items-center justify-center">
          <div className="flex flex-col items-center justify-center gap-y-3">
            <PreloaderIcon />
          </div>
        </div>
      ) : noImages ? (
        <div className="flex h-full w-full justify-center items-center text-2xl text-gray-400">No images were detected.</div>
      ) : (
        <>
          {howToRenderMultipleImages === "none" && null}
          {howToRenderMultipleImages === "first" && imageFile && (
            <FileDisplay
              file={imageFile}
              maxHeight={maxHeight}
              maxWidth={maxWidth}
              imageType={imageType}
              debugging={isDebugginMode}
            />
          )}
          {howToRenderMultipleImages === "element" && (
            <div
              className="flex h-full w-full justify-center items-center text-2xl text-gray-400"
              dangerouslySetInnerHTML={{ __html: defaultElement }}
            />
          )}
        </>
      )}
    </div>
  );
};

export default App;

import { useEffect, useState } from "react";
import domo from "ryuu.js";
import Files from "src/components/Paritals/FileViewers/Files";
import Search from "src/components/Shared/Search";
import { getFileDetailsList } from "src/domo-functions/filesAPI";
import { getSingleUser } from "src/domo-functions/usersAPI";

const FileViewer = ({ files, setFiles, handleFileSelection = () => {}, selectedFile = null, setSelectedFile = () => {}, isSelectedFileLoading = false, setIsSelectedFileLoading = () => {} }) => {
  // const [countryStatus, setCountryStatus] = useState("US");
  // const [isDebugginMode, setIsDebugginMode] = useState(false);

  const [isLoadingFiles, setIsLoadingFiles] = useState(true);
  const [filteredFiles, setFilteredFiles] = useState([]);
  const [users, setUsers] = useState([]);
  const [keyword, setKeyword] = useState("");

  useEffect(() => {
    // let isLocalhost = checkBrowserEnvironment();
    // findCountrySettings();

    async function loadFiles() {
      setIsLoadingFiles(true);

      // let data = await domo.get(`/data/v1/imagesDataset`);
      // let idList = data.map((image) => image.dataFileId);
      // let filesResponse = await getFileDetailsList({ idList, sortOrder: "ASC", debugging: false });
      let filesResponse = await getFileDetailsList({ sortOrder: "ASC", debugging: false });
      setFiles(filesResponse);
      setIsLoadingFiles(false);
      setFilteredFiles(filesResponse);
      setSelectedFile(filesResponse[0]);
      let userIds = filesResponse.reduce((ids, fileResponse) => {
        if (ids.includes(fileResponse.responsibleUserId)) {
          return ids;
        }
        return [...ids, fileResponse.responsibleUserId];
      }, []);

      let userProfiles = {};
      for (let i = 0; i < userIds.length; i++) {
        userProfiles[userIds[i]] = await getSingleUser({ userId: userIds[i] });
      }
      setUsers(userProfiles);
    }
    loadFiles();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (keyword === "") {
      setFilteredFiles(files);
    }
    let searchedFiles = files.filter((file) => {
      if (file.name.includes(keyword) || (file.currentRevision.description && file.currentRevision.description.includes(keyword))) {
        return true;
      } else {
        return false;
      }
    });
    setFilteredFiles(searchedFiles);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [keyword]);

  return (
    <div className="relative w-full h-full flex px-3">
      <div className="flex flex-col items-center w-full h-full">
        <div className="w-full max-w-5xl">
          {/* <div className="mt-4 sm:ml-16 sm:mt-0 sm:flex-none">
            <button
              type="button"
              className="flex items-center justify-center bg-indigo-500 px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500">
              Upload file
            </button>
          </div> */}

          <div>
            <div className="max-w-md">
              <Search
                keyword={keyword}
                setKeyword={setKeyword}
              />
            </div>
            {files && (
              <Files
                files={filteredFiles || []}
                selectedFile={selectedFile}
                setSelectedFile={handleFileSelection}
                isLoadingFiles={isLoadingFiles}
                isSelectedFileLoading={isSelectedFileLoading}
                setIsSelectedFileLoading={setIsSelectedFileLoading}
                users={users || {}}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FileViewer;

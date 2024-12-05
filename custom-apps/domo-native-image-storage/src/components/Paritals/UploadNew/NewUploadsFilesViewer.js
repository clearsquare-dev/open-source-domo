import { useEffect, useState } from "react";
import Search from "src/components/Shared/Search";
import NewUploadsFile from "src/components/Paritals/UploadNew/NewUploadsFiles";

const NewUploadsFilesViewer = ({ files = [], deleteFileUpload }) => {
  const [filteredFiles, setFilteredFiles] = useState([]);
  const [keyword, setKeyword] = useState("");
  const [filesLoaded, setFilesLoaded] = useState(false);

  useEffect(() => {
    if (keyword === "") {
      setFilteredFiles(files);
    }
    let searchedFiles = files.filter((file) => {
      if (file.name.includes(keyword) || file.metadataName.includes(keyword) || (file.metadataDescription && file.metadataDescription.includes(keyword))) {
        return true;
      } else {
        return false;
      }
    });
    setFilteredFiles(searchedFiles);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [keyword]);

  useEffect(() => {
    if (files?.length > 0 && !filesLoaded) {
      setFilteredFiles(files);
      setFilesLoaded(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [files.length]);

  return (
    <div className="relative w-full max-w-5xl h-full flex px-3">
      <div className="flex flex-col w-full h-full">
        <div className="w-full max-w-5xl">
          <div>
            <div className="max-w-md">
              <Search
                keyword={keyword}
                setKeyword={setKeyword}
              />
            </div>
            <NewUploadsFile
              files={filteredFiles || []}
              deleteFileUpload={deleteFileUpload}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewUploadsFilesViewer;

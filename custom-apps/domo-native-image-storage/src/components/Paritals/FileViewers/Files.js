import { useState } from "react";
import FilesTable from "src/components/Paritals/FileViewers/FilesTable";
import PaginationFooter from "src/components/Shared/PaginationFooter";

export default function Files({ files = [], selectedFile = null, setSelectedFile = () => {}, isSelectedFileLoading=false, setIsSelectedFileLoading = () => {}, isLoadingFiles = true, users = {} }) {
  // const [sortDirection, setSortDirection] = useState("ASC");

  const [limit, setLimit] = useState(50);
  const [offset, setOffset] = useState(0);
  // const [startDate, setStateDate] = useState("");
  // const [endDate, setEndDate] = useState("");

  const handlePaginationChange = ({ limit, offset }) => {
    setLimit(limit);
    setOffset(offset);
  };

  const currentPageFiles = files.slice(offset, offset + limit);

  return (
    <div className="h-full w-full max-w-5xl">
      <FilesTable
        files={currentPageFiles}
        selectedFile={selectedFile}
        setSelectedFile={setSelectedFile}
        isSelectedFileLoading={isSelectedFileLoading}
        setIsSelectedFileLoading={setIsSelectedFileLoading}
        isLoadingFiles={isLoadingFiles}
        users={users}
      />
      {!isLoadingFiles && (
        <div className="pb-[200px]">
          <PaginationFooter
            itemName="File record"
            limit={limit}
            offset={offset}
            count={files.length}
            onChange={handlePaginationChange}
          />
        </div>
      )}
    </div>
  );
}

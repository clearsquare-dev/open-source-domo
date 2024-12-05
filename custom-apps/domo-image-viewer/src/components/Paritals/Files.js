import { useState } from "react";
import PaginationFooter from "../Shared/PaginationFooter";
import FilesTable from "./FilesTable";

export default function Files({ files = [], setSelectedFile = () => {}, isLoadingFiles = true, users = {} }) {
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
        setSelectedFile={setSelectedFile}
        isLoadingFiles={true}
        users={users}
      />
      <div className="pb-[200px]">
        <PaginationFooter
          itemName="File record"
          limit={limit}
          offset={offset}
          count={files.length}
          onChange={handlePaginationChange}
        />
      </div>
    </div>
  );
}

import { useState } from "react";
import PaginationFooter from "src/components/Shared/PaginationFooter";
import NewUploadsFilesTable from "src/components/Paritals/UploadNew/NewUploadsFileTable";

export default function NewUploadsFile({ files = [], deleteFileUpload = () => {} }) {
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
    <div className="relative h-full w-full max-w-5xl">
      <NewUploadsFilesTable
        files={currentPageFiles}
        deleteFileUpload={deleteFileUpload}
      />
      {currentPageFiles.length > 0 && (
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

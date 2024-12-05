import PDFViewer from "src/components/Paritals/FileViewers/PDFViewer";

export default function FileDisplay({ isFileLoading = true, file, imageType = "dataFileId", maxHeight = "auto", maxWidth = "auto" }) {
  let type = file?.currentRevision?.contentType ? file?.currentRevision?.contentType : "undefined";
  if (type?.includes("application/")) {
    type = file?.currentRevision?.contentType?.split("application/")[1];
  }
  if (type?.includes(".")) {
    type = type.split(".")[type.split(".").length - 1];
  }

  return (
    <div>
      {imageType === "dataFileId" ? (
        <>
          {!file?.currentRevision?.contentType ? <div className="h-[20px] w-[20px] bg-gray-200">Document cannot load.</div> : ""}
          {file?.currentRevision?.contentType === "application/pdf" && <PDFViewer file={file} />}
          {["image/jpeg", "image/png"].includes(file?.currentRevision?.contentType) && (
            <img
              src={file.image}
              alt=""
              style={{ maxHeight, maxWidth }}
              className="object-cover"
            />
          )}
        </>
      ) : (
        <img
          src={file.dataFileUrl}
          alt=""
          style={{ maxHeight, maxWidth }}
          className="object-cover"
        />
      )}
    </div>
  );
}

import { Document, Page } from "react-pdf";
import { pdfjs } from "react-pdf";

// pdfjs.GlobalWorkerOptions.workerSrc needs to be specified to use the worker
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

const PDFViewer = ({ file }) => {
  return (
    <Document file={file.image}>
      <Page pageNumber={1} />
    </Document>
  );
};
export default PDFViewer;

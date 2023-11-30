import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Document, Page, pdfjs } from "react-pdf";
import axios from "axios";
import "react-pdf/dist/esm/Page/AnnotationLayer.css";
import "react-pdf/dist/Page/TextLayer.css";
import { useDispatch, useSelector } from "react-redux";
import { fetchApiBookById } from "../../redux/reducers/bukuReducer";

pdfjs.GlobalWorkerOptions.workerSrc = `https://unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.js`;

const BacaBuku = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { book } = useSelector((state) => state.book);
  // const [book, setBook] = useState({});
  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);

  // const getDataApiById = async () => {
  //   try {
  //     const response = await axios(`http://localhost:3000/books/${id}`);
  //     const data = response.data.data;
  //     setBook(data);
  //   } catch (error) {
  //     console.error("Error fetching book data:", error);
  //   }
  // };

  useEffect(() => {
    // getDataApiById();
    dispatch(fetchApiBookById(id));
  }, [dispatch]); // Include 'id' as a dependency to fetch data when the ID changes

  const onDocumentLoadSuccess = ({ numPages }) => {
    setNumPages(numPages);
  };

  const nextPage = () => {
    if (pageNumber < numPages) {
      setPageNumber(pageNumber + 1);
    }
  };

  const prevPage = () => {
    if (pageNumber > 1) {
      setPageNumber(pageNumber - 1);
    }
  };

  // Define max and min scale
  const maxScale = 0.6;
  const minScale = 0.5;

  return (
    <div
      className="container my-5 py-5 d-flex flex-column align-items-center"
      id="baca-buku"
    >
      <h5 className="fw-semibold mt-md-0 mt-3">{book.title}</h5>
      <div
        className="ratio ratio-16x9"
        style={{ width: "35%", height: "500px" }}
      >
        <Document
          file={book.book_url}
          onLoadSuccess={onDocumentLoadSuccess}
          loading="Loading..."
          error="Failed to load PDF"
        >
          <Page
            pageNumber={pageNumber}
            scale={0.6}
            maxScale={maxScale}
            minScale={minScale}
          />
        </Document>
      </div>
      <div className="d-flex mt-3">
        <button
          className="btn btn-primary me-2"
          onClick={prevPage}
          disabled={pageNumber <= 1}
        >
          Previous Page
        </button>
        <button
          className="btn btn-primary"
          onClick={nextPage}
          disabled={pageNumber >= numPages}
        >
          Next Page
        </button>
      </div>
      <p>
        Page {pageNumber} of {numPages}
      </p>
    </div>
  );
};

export default BacaBuku;

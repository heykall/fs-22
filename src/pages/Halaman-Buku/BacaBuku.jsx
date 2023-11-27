import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export default function BacaBuku() {
  const { id } = useParams();
  const [book, setBook] = useState([]);
  const getDataApiById = async () => {
    const response = await axios(
      `https://645611f25f9a4f23613a06ba.mockapi.io/book/${id}`
    );
    const data = response.data;
    setBook(data);
  };

  useEffect(() => {
    getDataApiById();
  }, []);

  return (
    <>
      <div
        className="container my-5 py-5 mx-auto"
        style={{ alignItems: "center" }}
        id="baca-buku"
      >
        <h5 className="fw-semibold mt-md-0 mt-3">{book.title}</h5>
        <div
          className="ratio ratio-16x9"
          style={{ display: "flex", justifyContent: "center" }}
        >
          <iframe
            src={book.book_url}
            title="Baca Buku"
            style={{ width: "100%", height: "500px", border: "none" }}
            allowfullscreen
          ></iframe>
        </div>
      </div>
    </>
  );
}

import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import styles from "./Buku.module.css";
import CardBuku from "../../components/CardBuku";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
export default function DetailBuku() {
  const dataLocalStorage = localStorage.getItem("data");
  const userData = JSON.parse(dataLocalStorage);
  const navigate = useNavigate();
  const { id } = useParams();
  const [book, setBook] = useState([]);
  const [bookRandom, setBookRandom] = useState([]);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const getDataApiById = async () => {
    try {
      const response = await axios(
        `https://rich-eel-blazer.cyclic.app/books/${id}`
      );
      const data = response.data.data;
      setBook(data);
    } catch (error) {
      console.error("Error fetching book by ID:", error.response);
    }
  };

  // ngambil data dari api
  const getDataApi = async () => {
    try {
      const response = await axios(`https://rich-eel-blazer.cyclic.app/books`);
      // hasil response
      const data = response.data.data;
      // Buku Rekomendasi
      const randomData = randomBooks(data, 6);
      // Memasukan data diatas kedalam state
      // duplikat dulu datanya pakai ...data
      // kemudian masukan datanya disesuaikan
      setBookRandom(randomData);
    } catch (error) {
      console.error("Error fetching books:", error);
    }
  };

  //Logic Buku Rekomendasi
  const randomBooks = (data, numBook) => {
    const dataRandom = [...data];
    for (let i = dataRandom.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [dataRandom[i], dataRandom[j]] = [dataRandom[j], dataRandom[i]];
    }
    return dataRandom.slice(0, numBook);
  };
  const getBookmarkStatus = async () => {
    try {
      const response = await axios.get(
        `http://localhost:3000/bookmark/user/${userData._id}/${id}`
      );
      setIsBookmarked(response.data.isBookmarked);
    } catch (error) {
      console.error("Error fetching bookmark status:", error.response);
    }
  };

  const toggleBookmark = async () => {
    try {
      const response = await axios.post(
        `http://localhost:3000/bookmark/user/${userData._id}`,
        {
          bookID: id,
        }
      );

      setIsBookmarked(response.data.success);

      if (isBookmarked) {
        setIsBookmarked(false);
        localStorage.removeItem(`bookmark_status_buku_${id}`);
        toast.success("Buku berhasil di-unbookmark!");
      } else {
        setIsBookmarked(true);
        localStorage.setItem(`bookmark_status_buku_${id}`, "true");
        toast.success("Buku berhasil di-bookmark!");
      }
    } catch (error) {
      console.error("Error:", error.response);
      toast.error("Terjadi kesalahan server");
    }
  };
  useEffect(() => {
    getDataApiById();
    getBookmarkStatus();
  }, []);

  useEffect(() => {
    getDataApi();
  }, []);
  useEffect(() => {
    const storedBookmarkStatus = localStorage.getItem(
      `bookmark_status_buku_${id}`
    );
    setIsBookmarked(storedBookmarkStatus === "true");
    if (!userData) {
      toast.info("Anda Perlu Login Terlebih Dahulu !");
      setTimeout(() => {
        navigate("/login");
      }, 5000);
    }
  }, [userData, id, navigate]);
  return (
    <>
      <ToastContainer />
      <div className="container mt-5">
        <div className="card mb-3" id={styles.detailBuku}>
          <div className="card-body">
            <div className="row">
              <div className="col-md-3 col-12">
                <img
                  src={book.img_url}
                  className="card-img-top p-2 rounded-4 mt-2"
                  alt="detail-buku"
                />
                <div className="d-flex justify-content-end me-2">
                  <a href="#" className="mx-3">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      fill="white"
                      className="bi bi-heart"
                      viewBox="0 0 16 16"
                    >
                      <path d="M8 2.748-.717-.737C5.6.281 2.514.878 1.4 3.053c-.523 1.023-.641 2.5.314 4.385.920 1.815 2.834 3.989 6.286 6.357 3.452-2.368 5.365-4.542 6.286-6.357.955-1.886.838-3.362.314-4.385C13.486.878 10.4.28 8.717 2.01L8 2.748zM8 15C-7.333 4.868 3.279-3.04 7.824 1.143c.060.055.119.112.176.171a3.12 3.12 0 0 1 .176-.17C12.72-3.042 23.333 4.867 8 15z" />
                    </svg>
                  </a>
                  <a href="#" onClick={toggleBookmark}>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      fill={isBookmarked ? "red" : "white"}
                      className="bi bi-bookmark"
                      viewBox="0 0 16 16"
                    >
                      <path d="M2 2a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v13.5a.5.5 0 0 1-.777.416L8 13.101l-5.223 2.815A.5.5 0 0 1 2 15.5V2zm2-1a1 1 0 0 0-1 1v12.566l4.723-2.482a.5.5 0 0 1 .554 0L13 14.566V2a1 1 0 0 0-1-1H4z" />
                    </svg>
                  </a>
                </div>
              </div>
              <div className="col-md-8 col-12">
                <h5 className="fw-semibold mt-md-0 mt-3">{book.title}</h5>
                <p>{book.author}</p>
                <div className="d-flex">{book.star}</div>
                <p className="mt-3 fw-medium">Deskripsi Buku :</p>
                <p className="mt-0">{book.description}</p>
                <div className="d-flex justify-content-center justify-content-md-start">
                  <Link to={`/halaman-buku/baca-buku/${id}`} className="me-3">
                    <button
                      type="button"
                      className="btn text-white rounded-5 px-3 py-2 shadow-sm fw-semibold"
                      id={styles.tombolBaca}
                    >
                      Baca Buku
                    </button>
                  </Link>

                  <a href={book.download_url} target="_blank" rel="noreferrer">
                    <button
                      type="button"
                      className="btn rounded-5 px-3 py-2 shadow-sm fw-semibold"
                      id={styles.tombolUnduh}
                    >
                      Unduh Buku
                    </button>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="container mt-5 pt-5 buku-baru">
        <div className="row mt-3 kategori">
          <div className="col-md-6 col-12">
            <h5 className="text-center text-md-start">
              Direkomendasikan untuk mu
            </h5>
          </div>
          <div className="col-md-6 text-md-end text-end col-12">
            <p>Selengkapnya</p>
          </div>
          <div
            className="scroll-buku row row-cols-1 row-cols-lg-5 row-cols-md-3 g-lg-4 overflow-x-auto d-flex flex-nowrap mt-2 mt-lg-0 mb-5"
            id="direkomendasikan-buku"
          >
            {bookRandom.map((book) => (
              <CardBuku key={book._id} book={book} />
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

import layer1 from "../../assets/img/motivasi-layer1.png";
import layer2 from "../../assets/img/motivasi-layer2.png";
import layer3 from "../../assets/img/motivasi-layer3.png";
import layer4 from "../../assets/img/motivasi-layer3.png";

import axios from "axios";
import "./video.css";
import { useEffect, useState } from "react";
import CardVideo from "../../components/CardVideo";
export default function Video() {
  const [ditambahkan, setDitambahkan] = useState([]);
  const [data, setData] = useState({
    dataRandom: [],
    dataPopuler: [],
    dataAkademik: [],
    dataLainnya: [],
  });

  // ngambil data dari api
  const getDataApi = async () => {
    const response = await axios(
      `https://652d3ffcf9afa8ef4b271ed7.mockapi.io/Video`
    );
    // hasil response
    const data = response.data;
    // data ditambahkan
    setDitambahkan(data.slice(data.length - 2));
    // Video Rekomendasi
    const randomData = randomVideos(data, 6);
    // Video Terpopuler
    const populerData = populerVideos(data);
    // Video Akademik
    const akademikData = akademikVideos(data);
    // Video Akademik
    const lainnyaData = lainnyaVideos(data);
    // Memasukan data diatas kedalam state
    setData({
      ...data,
      dataRandom: randomData,
      dataPopuler: populerData,
      dataAkademik: akademikData,
      dataLainnya: lainnyaData,
    });
  };
  //Logic Video Rekomendasi
  const randomVideos = (data, numItem) => {
    const dataRandom = data.sort(() => 0.5 - Math.random());
    return dataRandom.slice(0, numItem);
  };
  // logic Video Terpopuler
  const populerVideos = (data) => {
    const videoPopuler = data.filter((item) => item.category === "Terpopuler");
    return videoPopuler;
  };

  // logic Video Akademik
  const akademikVideos = (data) => {
    const videoAkademik = data.filter((item) => item.category === "Akademik");
    return videoAkademik;
  };
  // logic Video Lainya
  const lainnyaVideos = (data) => {
    const videoLainnya = data.filter((item) => item.category === "Lainnya");
    return videoLainnya;
  };

  const [searchInput, setSearchInput] = useState("");
  const [searchType, setSearchType] = useState("All");
  const [searchResult, setSearchResult] = useState([]);

  const handleSearch = () => {
    let filteredData = [];
    if (searchInput.trim() === "") {
      setSearchResult([]);
    } else {
      const allData = [
        ...data.dataRandom,
        ...data.dataPopuler,
        ...data.dataAkademik,
        ...data.dataLainnya,
      ];

      if (searchType === "All") {
        filteredData = allData.filter((item) =>
          Object.values(item).some(
            (value) =>
              value &&
              value.toString().toLowerCase().includes(searchInput.toLowerCase())
          )
        );
      } else {
        filteredData = allData.filter((item) =>
          item[searchType.toLowerCase()]
            .toString()
            .toLowerCase()
            .includes(searchInput.toLowerCase())
        );
      }
      filteredData = Array.from(new Set(filteredData.map(JSON.stringify))).map(
        JSON.parse
      );
      setSearchResult(filteredData);
    }
  };
  console.log(searchResult);
  useEffect(() => {
    getDataApi();
  }, []);

  return (
    <>
      {/* <!-- SEARCH VIDEO */}
      <div className="container mt-5">
        <div className="row justify-content-center">
          <div className="input-group mb-3 w-75 mt-3">
            <button
              className="btn btn-outline-dark dropdown-toggle rounded-start-5 border border-black shadow-sm"
              type="button"
              data-bs-toggle="dropdown"
              aria-expanded="false"
              id="filter-button"
            >
              {searchType}
            </button>
            <ul className="dropdown-menu">
              <li>
                <button
                  className="dropdown-item"
                  onClick={() => setSearchType("All")}
                >
                  All
                </button>
              </li>
              <li>
                <button
                  className="dropdown-item"
                  onClick={() => setSearchType("Title")}
                >
                  Title
                </button>
              </li>
              <li>
                <button
                  className="dropdown-item"
                  onClick={() => setSearchType("Author")}
                >
                  Author
                </button>
              </li>
            </ul>
            <input
              type="text"
              className="form-control border border-black border-end-0"
              aria-label="Text input with dropdown button"
              id="search-input"
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
            />
            <button
              className="btn btn-outline-secondary border border-black rounded-end-5"
              type="button"
              id="search-button"
              onClick={handleSearch}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                className="bi bi-search"
                viewBox="0 0 16 16"
              >
                <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z"></path>
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* MOTIVASI */}
      <div className="container mt-5">
        <div className="row">
          <div className="col-lg-6 col-md-12">
            <div
              id="carouselExampleAutoplaying"
              className="carousel slide"
              data-bs-ride="carousel"
            >
              <div className="carousel-indicators">
                <button
                  type="button"
                  data-bs-target="#carouselExampleCaptions"
                  data-bs-slide-to="0"
                  className="active rounded-circle"
                  style={{ width: "5px", height: "5px" }}
                  aria-current="true"
                  aria-label="Slide 1"
                ></button>
                <button
                  type="button"
                  data-bs-target="#carouselExampleCaptions"
                  data-bs-slide-to="1"
                  aria-label="Slide 2"
                  className="rounded-circle"
                  style={{ width: "5px", height: "5px" }}
                ></button>
                <button
                  type="button"
                  data-bs-target="#carouselExampleCaptions"
                  data-bs-slide-to="2"
                  aria-label="Slide 3"
                  className="rounded-circle"
                  style={{ width: "5px", height: "5px" }}
                ></button>
                <button
                  type="button"
                  data-bs-target="#carouselExampleCaptions"
                  data-bs-slide-to="3"
                  aria-label="Slide 4"
                  className="rounded-circle"
                  style={{ width: "5px", height: "5px" }}
                ></button>
              </div>
              <div className="carousel-inner mt-md-4">
                <div className="carousel-item active">
                  <img
                    src={layer1}
                    className="d-block w-75 mx-auto mx-lg-0"
                    alt="..."
                  />
                </div>
                <div className="carousel-item">
                  <img
                    src={layer2}
                    className="d-block w-75 mx-auto mx-lg-0"
                    alt="..."
                  />
                </div>
                <div className="carousel-item">
                  <img
                    src={layer3}
                    className="d-block w-75 mx-auto mx-lg-0"
                    alt="..."
                  />
                </div>
                <div className="carousel-item">
                  <img
                    src={layer4}
                    className="d-block w-75 mx-auto mx-lg-0"
                    alt="..."
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="col-lg-6 col-md-12 mt-lg-0 mt-5 rounded-3 border border-primary">
            <div className="text-blue">
              <h3 className="rotated-text">Baru ditambahkan</h3>
            </div>
            <div className="row row-cols-2 row-cols-md-2 g-4 mb-sm-2">
              {ditambahkan.map((item) => (
                <div className="col" key={item.id}>
                  <div className="card p-2">
                    <img
                      src={item.url_thumbnail}
                      className="img-fluid"
                      alt="ditambahkan-1"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/*  VIDEO  */}

      <div className="container mt-5 pt-3">
        <div className="row">
          <h3 className="text-center fw-bold text-lg-start">Selamat Datang</h3>
        </div>

        {searchResult.length > 0 && (
          <div className="row mt-3" id="hasil-pencarian">
            <div className="col-md-6 col-12">
              <h5 className="text-center text-md-start">
                Berdasarkan Pencarianmu
              </h5>
            </div>
            <div
              className="scroll-video row row-cols-1 row-cols-md-4 g-lg-4 overflow-x-auto d-flex flex-nowrap mt-2 mt-lg-0 mb-5"
              id="videos-container"
            >
              {searchResult.map((item) => (
                <CardVideo key={item.id} item={item} />
              ))}
            </div>
          </div>
        )}

        {searchResult.length === 0 && searchInput === "" && (
          <>
            <div className="row mt-3 kategori" id="direkomendasi">
              <div className="col-md-6 col-12">
                <h5 className="text-center text-md-start">
                  Direkomendasikan untuk mu
                </h5>
              </div>
              <div className="col-md-6 text-md-end text-end col-12">
                <p>Selengkapnya</p>
              </div>
              <div
                className="scroll-video row row-cols-1 row-cols-lg-4 row-cols-md-3 g-lg-4 overflow-x-auto d-flex flex-nowrap mt-2 mt-lg-0 mb-5"
                id="direkomendasikan-videos"
              >
                {data.dataRandom.map((item) => (
                  <CardVideo key={item.id} item={item} />
                ))}
              </div>
            </div>
            <div className="row mt-3 kategori" id="terpopuler">
              <div className="col-md-6 col-12">
                <h5 className="text-center text-md-start">Terpopuler</h5>
              </div>
              <div className="col-md-6 text-md-end text-end col-12">
                <p>Selengkapnya</p>
              </div>
              <div
                className="scroll-video row row-cols-1 row-cols-lg-4 row-cols-md-3 g-lg-4 overflow-x-auto d-flex flex-nowrap mt-2 mt-lg-0 mb-5"
                id="terpopuler-videos"
              >
                {data.dataPopuler.map((item) => (
                  <CardVideo key={item.id} item={item} />
                ))}
              </div>
            </div>
            <div className="row mt-3 kategori" id="akademik">
              <div className="col-md-6 col-12">
                <h5 className="text-center text-md-start">Video Akademik</h5>
              </div>
              <div className="col-md-6 text-md-end text-end col-12">
                <p>Selengkapnya</p>
              </div>
              <div
                className="scroll-video row row-cols-1 row-cols-lg-4 row-cols-md-3 g-lg-4 overflow-x-auto d-flex flex-nowrap mt-2 mt-lg-0 mb-5"
                id="akademik-videos"
              >
                {data.dataAkademik.map((item) => (
                  <CardVideo key={item.id} item={item} />
                ))}
              </div>
            </div>
            <div className="row mt-3 kategori" id="lainnya">
              <div className="col-md-6 col-12">
                <h5 className="text-center text-md-start">Lainnya</h5>
              </div>
              <div className="col-md-6 text-md-end text-end col-12">
                <p>Selengkapnya</p>
              </div>
              <div
                className="scroll-video row row-cols-1 row-cols-lg-4 row-cols-md-3 g-4 overflow-x-auto d-flex flex-nowrap mt-1 mt-lg-0 mb-5"
                id="lainnya-videos"
              >
                {data.dataLainnya.map((item) => (
                  <CardVideo key={item.id} item={item} />
                ))}
              </div>
            </div>
          </>
        )}

        {searchResult.length === 0 && searchInput !== "" && (
          <div className="row mt-3" id="hasil-pencarian">
            <div className="col">
              <p className="text-center">Sedang mencari data...</p>
            </div>
          </div>
        )}
      </div>
    </>
  );
}

import layer1 from "../../assets/img/motivasi-layer1.png";
import layer2 from "../../assets/img/motivasi-layer2.png";
import layer3 from "../../assets/img/motivasi-layer3.png";
import layer4 from "../../assets/img/motivasi-layer3.png";

import axios from "axios";
import "./video.css";
import { useEffect, useState } from "react";
import CardVideo from "../../components/CardVideo";
export default function Video() {
  // handle card ditambahkan, dari api, data dari 2 paling belakang
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
      `https://charming-cloak-boa.cyclic.app/videos`
    );
    // hasil response
    const data = response.data.data;
    // data ditambahkan data diambil dari 2 paling belakang
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
    // duplikat dulu datanya pakai ...data
    // kemudian masukan datanya disesuaikan
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
    // sorting secara random
    const dataRandom = data.sort(() => 0.5 - Math.random());
    // mengambil 6 data dari depan
    return dataRandom.slice(0, numItem);
  };
  // logic Video Terpopuler
  const populerVideos = (data) => {
    // filter berdasarkan category terpopuler
    const videoPopuler = data.filter((item) => item.category === "Terpopuler");
    return videoPopuler;
  };

  // logic Video Akademik
  const akademikVideos = (data) => {
    // filter berdasarkan category Akademik
    const videoAkademik = data.filter((item) => item.category === "Akademik");
    return videoAkademik;
  };
  // logic Video Lainnya
  const lainnyaVideos = (data) => {
    // filter berdasarkan category Lainnya
    const videoLainnya = data.filter((item) => item.category === "Lainnya");
    return videoLainnya;
  };

  //untuk menghandle search inputan
  const [searchInput, setSearchInput] = useState("");
  // untuk menghandle pemilihan search berdasarkan all, title, author
  const [searchType, setSearchType] = useState("All");
  // untuk handle hasil search yang sudah di olah
  const [searchResult, setSearchResult] = useState([]);

  // logic menghandle search
  const handleSearch = () => {
    // variable untuk menampung data hasil yang telah di proses
    let filteredData = [];
    // jika data kosong
    if (searchInput.trim() === "") {
      setSearchResult([]);
    } else {
      // duplikasi semua data, dari state data diatas, kedalam satu variable
      // bernama allData
      const allData = [
        ...data.dataRandom,
        ...data.dataPopuler,
        ...data.dataAkademik,
        ...data.dataLainnya,
      ];
      // jika type search nya itu all
      if (searchType === "All") {
        // looping semua data menggunakan filter
        filteredData = allData.filter((item) =>
          // object.values mengembalikan array  dari nilai  setiap item
          // .some () adalah mengecek  apakah setidaknya salah satu nilai tersebut
          // mengandung bagian dari kata kunci  yang di inputkan pengguna
          Object.values(item).some(
            (value) =>
              value &&
              // value dijadikan string, dijadikan huruf kecil
              // dan mengandung inputkan dari pengguna yang di jadikan hurufh kecil semua
              value.toString().toLowerCase().includes(searchInput.toLowerCase())
          )
        );
      }
      // jika searchTypenya bukan all maka akan di handle dibagian ini
      else {
        // all data akan di filter berdasarkan kata kunci yang dimasukkan  kedalam
        // search input.
        filteredData = allData.filter((item) =>
          //  mengakses nilai dari properti objek sesuai dengan nilai dari searchType
          // kemudian di ubah menjadi huruf kecil
          item[searchType.toLowerCase()]
            // kemudian di ubah menjadi string , dan huruf huruf kecil
            // yang mengandung search input
            .toString()
            .toLowerCase()
            .includes(searchInput.toLowerCase())
        );
      }

      // untuk menghapus duplikasi dari array filteredData
      // filteredData.map(JSON.stringify) mengonversi setiap objek dalam array filteredData
      // menjadi string dengan menggunakan JSON.stringify. Ini dilakukan agar setiap objek
      // direpresentasikan dalam bentuk string.
      // new Set(...) menciptakan sebuah Set, yang secara alami menghilangkan duplikasi,
      //  dari array string yang dihasilkan dari langkah sebelumnya. Set adalah struktur
      //  data yang hanya dapat menyimpan nilai unik, sehingga jika ada duplikasi, hanya
      //  satu nilai yang akan disimpan.
      // Array.from(...) mengonversi kembali hasil Set ke dalam bentuk array.
      // map(JSON.parse) melakukan parsing kembali dari setiap string yang ada di dalam
      // array kembali menjadi objek menggunakan JSON.parse, sehingga Anda mendapatkan
      // kembali array dengan objek yang unik dari objek-objek yang sebelumnya mungkin
      //  memiliki duplikasi.
      filteredData = Array.from(new Set(filteredData.map(JSON.stringify))).map(
        JSON.parse
      );
      setSearchResult(filteredData);
    }
  };

  useEffect(() => {
    getDataApi();
  }, []);

  return (
    <>
      <div className="halaman-video">
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
                  <div className="col" key={item._id}>
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
            <h3 className="text-center fw-bold text-lg-start">
              Selamat Datang
            </h3>
          </div>
          {/* handle ketika pengguna searching */}
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
                  <CardVideo key={item._id} item={item} />
                ))}
              </div>
            </div>
          )}
          {/* handle ketika tidak ada inputan atau tidak melakukan search */}
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
                    <CardVideo key={item._id} item={item} />
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
                    <CardVideo key={item._id} item={item} />
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
                    <CardVideo key={item._id} item={item} />
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
                    <CardVideo key={item._id} item={item} />
                  ))}
                </div>
              </div>
            </>
          )}
          {/* saat lagi search pertama kali  */}
          {searchResult.length === 0 && searchInput !== "" && (
            <div className="row mt-3" id="hasil-pencarian">
              <div className="col">
                <p className="text-center">Sedang mencari data...</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

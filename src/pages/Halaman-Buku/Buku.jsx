import axios from "axios";
import { useEffect, useState } from "react";
import CardBuku from "../../components/CardBuku";
import styles from "./Buku.module.css";

export default function Buku() {
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
    const response = await axios(`http://localhost:3000/books`);
    // hasil response
    const data = response.data.data;
    // data ditambahkan data diambil dari 2 paling belakang
    setDitambahkan(data.slice(data.length - 3));
    // Buku Rekomendasi
    const randomData = randomBuku(data, 6);
    // Buku Terpopuler
    const populerData = populerBuku(data);
    // Buku Akademik
    const akademikData = akademikBuku(data);
    // Buku Akademik
    const lainnyaData = lainnyaBuku(data);
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
  //Logic Buku Rekomendasi
  const randomBuku = (data, numBook) => {
    // sorting secara random
    const dataRandom = [...data];
    for (let i = dataRandom.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [dataRandom[i], dataRandom[j]] = [dataRandom[j], dataRandom[i]];
    }
    // mengambil 6 data dari depan
    return dataRandom.slice(0, numBook);
  };
  // logic Buku Terpopuler
  const populerBuku = (data) => {
    // filter berdasarkan category terpopuler
    const bukuPopuler = data.filter((book) => book.category === "Terpopuler");
    return bukuPopuler;
  };

  // logic Buku Akademik
  const akademikBuku = (data) => {
    // filter berdasarkan category Akademik
    const bukuAkademik = data.filter((book) => book.category === "Akademik");
    return bukuAkademik;
  };
  // logic Buku Lainnya
  const lainnyaBuku = (data) => {
    // filter berdasarkan category Lainnya
    const bukuLainnya = data.filter((book) => book.category === "Lainnya");
    return bukuLainnya;
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
        filteredData = allData.filter((book) =>
          // object.values mengembalikan array  dari nilai  setiap item
          // .some () adalah mengecek  apakah setidaknya salah satu nilai tersebut
          // mengandung bagian dari kata kunci  yang di inputkan pengguna
          Object.values(book).some(
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
        filteredData = allData.filter((book) =>
          //  mengakses nilai dari properti objek sesuai dengan nilai dari searchType
          // kemudian di ubah menjadi huruf kecil
          book[searchType.toLowerCase()]
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
      {/* <!-- SEARCH BUKU */}
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
            <div className="container mt-5">
              <div
                id={styles.quoteCarousel}
                className="col-8 carousel slide"
                data-bs-ride="carousel"
              >
                <h3 className={styles.judulCarousel}>Motivasi Hari Ini</h3>
                <div className="carousel-inner">
                  <div className="carousel-item active">
                    <p className={styles.quote}>
                      "Di balik kesuksesan terciptanya sebuah produk, ada sebuah
                      tim kuat di dalamnya."
                    </p>
                    <p className={styles.author1}>- Itadori Yuji</p>
                  </div>
                  <div className="carousel-item">
                    <p className={styles.quote}>
                      "Kemampuan membaca adalah jendela dunia."
                    </p>
                    <p className={styles.author2}>- George Washington Carver</p>
                  </div>
                  <div className="carousel-item">
                    <p className={styles.quote}>
                      "Literasi membuka pintu menuju pemahaman dan pemikiran
                      yang mendalam"
                    </p>
                    <p className={styles.author3}>- Barack Obama</p>
                  </div>
                </div>
                <ol className={styles.indikator}>
                  <li
                    data-bs-target="#quoteCarousel"
                    data-bs-slide-to={0}
                    className="active"
                  />
                  <li data-bs-target="#quoteCarousel" data-bs-slide-to={1} />
                  <li data-bs-target="#quoteCarousel" data-bs-slide-to={2} />
                </ol>
              </div>
            </div>
          </div>
          <div
            className="col-lg-5 col-md-12 mt-lg-3 mt-5 rounded-2 border border-primary"
            id={styles.bukuBaru}
          >
            <div className={styles.blueTeks}>
              <h3 className={styles.rotatedTeks}>Baru ditambahkan</h3>
            </div>
            <div
              className="row row-cols-2 row-cols-md-3 mb-sm-2"
              id={styles.listBuku}
            >
              {ditambahkan.map((book) => (
                <div className="col" key={book._id}>
                  <div className="card p-2 ">
                    <img
                      src={book.img_url}
                      className={styles.cardImg}
                      alt="ditambahkan-1"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/*  BUKU  */}

      <div className="container mt-5 pt-3">
        <div className="row">
          <h3 className="text-center fw-bold text-lg-start">Selamat Datang</h3>
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
              className="scroll-buku row row-cols-1 row-cols-md-5 g-lg-4 overflow-x-auto d-flex flex-nowrap mt-2 mt-lg-0 mb-5"
              id="buku-container"
            >
              {searchResult.map((book) => (
                <CardBuku key={book._id} book={book} />
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
                className="scroll-buku row row-cols-1 row-cols-lg-5 row-cols-md-3 g-lg-4 overflow-x-auto d-flex flex-nowrap mt-2 mt-lg-0 mb-5"
                id="direkomendasikan-buku"
              >
                {data.dataRandom.map((book) => (
                  <CardBuku key={book._id} book={book} />
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
                className="scroll-buku row row-cols-1 row-cols-lg-5 row-cols-md-3 g-lg-4 overflow-x-auto d-flex flex-nowrap mt-2 mt-lg-0 mb-5"
                id="terpopuler-buku"
              >
                {data.dataPopuler.map((book) => (
                  <CardBuku key={book._id} book={book} />
                ))}
              </div>
            </div>
            <div className="row mt-3 kategori" id="akademik">
              <div className="col-md-6 col-12">
                <h5 className="text-center text-md-start">Buku Akademik</h5>
              </div>
              <div className="col-md-6 text-md-end text-end col-12">
                <p>Selengkapnya</p>
              </div>
              <div
                className="scroll-buku row row-cols-1 row-cols-lg-5 row-cols-md-3 g-lg-4 overflow-x-auto d-flex flex-nowrap mt-2 mt-lg-0 mb-5"
                id="akademik-buku"
              >
                {data.dataAkademik.map((book) => (
                  <CardBuku key={book._id} book={book} />
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
                className="scroll-buku row row-cols-1 row-cols-lg-5 row-cols-md-3 g-4 overflow-x-auto d-flex flex-nowrap mt-1 mt-lg-0 mb-5"
                id="lainnya-buku"
              >
                {data.dataLainnya.map((book) => (
                  <CardBuku key={book._id} book={book} />
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
    </>
  );
}

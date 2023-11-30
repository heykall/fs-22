import axios from "axios";
import donasiBarang from "../../../assets/svg/donasi-barang.svg";
import donasiTerkumpul from "../../../assets/svg/donasi-terkumpul.svg";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
export default function DonasiBarang() {
  const [donasiVideo, setDonasiVideo] = useState(0);
  const getTotalDonasiVideo = async () => {
    const response = await axios.get(
      `http://localhost:3000/donasi/all-donasi-videos`
    );
    // console.log(response.data[0].total_donasi_video);
    setDonasiVideo(response.data[0].total_donasi_video);
  };

  // console.log(donasiVideo);
  useEffect(() => {
    getTotalDonasiVideo();
  }, []);

  return (
    <section>
      <div className="container mt-5 mb-5 text-center text-md-start">
        <div className="row align-items-center">
          <img src={donasiBarang} className="img-fluid" alt="donasi-barang" />
        </div>
        <div className="row align-items-center mt-4">
          <h3 className="fw-bold text-center text-md-start">Donasi Barang</h3>
          <p className="text-start">
            Dengan setiap donasi yang Anda berikan, kita dapat membuka pintu
            untuk lebih banyak kesempatan bagi mereka yang membutuhkan bantuan.
            Donasi Anda memiliki kekuatan untuk mendorong perubahan positif
            dalam kehidupan mereka, membantu mereka meraih pendidikan yang lebih
            baik, dan memberikan harapan untuk masa depan yang lebih cerah.
            Lebih dari sekadar memberikan bantuan finansial, donasi Anda adalah
            investasi dalam pembangunan komunitas yang lebih kuat dan
            berkelanjutan. Setiap kontribusi memungkinkan kita untuk menciptakan
            dampak positif yang mendalam dalam masyarakat, memperluas akses
            pendidikan, dan mendukung upaya-upaya untuk menciptakan dunia yang
            lebih inklusif dan berkeadilan.
          </p>
        </div>

        <div className="row align-items-center mt-4 justify-between">
          <div className="col-12 col-md-3">
            <p>20+ donasi terkumpul</p>
            <img src={donasiTerkumpul} alt="donasi-terkumpul" />
          </div>
          <div className="col-12 col-md-5"></div>
          <div className="col-12 col-md-2">
            <p>Total Donasi Buku</p>
            <h4 className="fw-bold">21 Buku</h4>
          </div>
          <div className="col-12 col-md-2">
            <p>Total Donasi Video</p>
            <h4 className="fw-bold">{donasiVideo} Video</h4>
          </div>
        </div>
        <div className="row align-items-center mt-5 text-center">
          <div className="col-12 col-md-3"></div>
          <div className="col-12 col-md-3">
            <Link
              className="btn btn-light w-100 border-0 text-white rounded-pill shadow px-3 py-2 mb-5"
              style={{ backgroundColor: " #29AB92" }}
              to={`/halaman-donasi/donasi-barang/donasi-buku`}
            >
              Donasi Buku
            </Link>
          </div>
          <div className="col-12 col-md-3">
            <Link
              className="btn btn-light w-100 border-0 text-white rounded-pill shadow px-3 py-2 mb-5"
              style={{ backgroundColor: " #29AB92" }}
              to={`/halaman-donasi/donasi-barang/donasi-video`}
            >
              Donasi Video
            </Link>
          </div>
          <div className="col-12 col-md-3"></div>
        </div>
      </div>
    </section>
  );
}

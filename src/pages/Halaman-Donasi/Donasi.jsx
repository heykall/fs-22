import donasiUang from "../../assets/svg/donasi-uang.svg";
import donasiBarang from "../../assets/svg/donasi-barang.svg";
import { Link } from "react-router-dom";
export default function Donasi() {
  return (
    <section>
      <div className="container  mt-5 mb-5 text-center text-md-start">
        <div className="row align-items-center">
          <img src={donasiUang} className="img-fluid" alt="donasi-uang" />
        </div>
        <div className="row align-items-center mt-4">
          <h3 className="fw-bold text-center text-md-start">Donasi Uang</h3>
          <p className="text-start">
            Dengan setiap donasi yang Anda berikan, kita dapat membuka pintu
            untuk lebih banyak kesempatan bagi mereka yang membutuhkan bantuan,
            memungkinkan mereka untuk meraih pendidikan yang lebih baik dan
            berkontribusi positif dalam masyarakat.
          </p>
        </div>
        <Link
          className="btn btn-light  border-0 text-white rounded-pill shadow px-3 py-2 mb-5"
          style={{ backgroundColor: " #29AB92" }}
          to={`/halaman-donasi/donasi-uang`}
        >
          Mulai Donasi &rarr;
        </Link>

        <div className="row align-items-center">
          <img src={donasiBarang} className="img-fluid" alt="donasi-uang" />
        </div>
        <div className="row align-items-center mt-4">
          <h3 className="fw-bold text-center text-md-start">Donasi Barang</h3>
          <p className="text-start">
            Dengan setiap sumbangan yang diberikan, kita membuka peluang yang
            lebih besar bagi individu yang memerlukan bantuan, memungkinkan
            mereka untuk mendapatkan akses ke sumber daya yang lebih baik dan
            memberikan dampak positif dalam komunitas mereka.
          </p>
        </div>

        <Link
          className="btn btn-light  border-0 text-white rounded-pill shadow px-3 py-2"
          style={{ backgroundColor: " #29AB92" }}
          to={`/halaman-donasi/donasi-barang`}
        >
          Mulai Donasi &rarr;
        </Link>
      </div>
    </section>
  );
}

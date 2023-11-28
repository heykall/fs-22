import donasiUang from "../../../assets/svg/donasi-uang.svg";
import donasiTerkumpul from "../../../assets/svg/donasi-terkumpul.svg";
import { Link } from "react-router-dom";
export default function DonasiUang() {
  return (
    <section>
      <div className="container mt-5 mb-5 text-center text-md-start">
        <div className="row align-items-center">
          <img src={donasiUang} className="img-fluid" alt="donasi-uang" />
        </div>
        <div className="row align-items-center mt-4">
          <h3 className="fw-bold text-center text-md-start">Donasi Uang</h3>
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
          <div className="col-12 col-md-7"></div>
          <div className="col-12 col-md-2">
            <p>Total Donasi</p>
            <h4 className="fw-bold">Rp.15.000</h4>
          </div>
        </div>
        <div className="row align-items-center mt-5 text-center">
          <div className="col-12 col-md-4"></div>
          <div className="col-12 col-md-4">
            <Link
              className="btn btn-light w-100 border-0 text-white rounded-pill shadow px-3 py-2 mb-5"
              style={{ backgroundColor: " #29AB92" }}
              to={``}
            >
              Donasi Sekarang
            </Link>
          </div>
          <div className="col-12 col-md-4"></div>
        </div>
      </div>
    </section>
  );
}

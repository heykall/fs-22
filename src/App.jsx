import { Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import Homepage from "./pages/Homepage";
import Buku from "./pages/Halaman-Buku/Buku";
import BacaBuku from "./pages/Halaman-Buku/BacaBuku";
import DetailBuku from "./pages/Halaman-Buku/DetailBuku";
import Video from "./pages/Halaman-Video/Video";
import DetailVideo from "./pages/Halaman-Video/DetailVideo";
import TontonVideo from "./pages/Halaman-Video/TontonVideo";
import Footer from "./components/Footer";
import Register from "./pages/Register";
import Login from "./pages/Login";
import TeamLiterasiKita from "./pages/TimLiterasiKita";
import ProfileUser from "./pages/ProfileUser";
import Donasi from "./pages/Halaman-Donasi/Donasi";
import DonasiUang from "./pages/Halaman-Donasi/Donasi-Uang/DonasiUang";
import Payment from "./pages/Halaman-Donasi/Donasi-Uang/Payment";
import DonasiBarang from "./pages/Halaman-Donasi/Donasi-Barang/DonasiBarang";
import DonasiBuku from "./pages/Halaman-Donasi/Donasi-Barang/DonasiBuku";
import DonasiVideo from "./pages/Halaman-Donasi/Donasi-Barang/DonasiVideo";

function App() {
  return (
    <>
      <Navbar />
      {/* routing halaman */}
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/halaman-buku" element={<Buku />} />
        <Route path="/halaman-buku/detail-buku/:id" element={<DetailBuku />} />
        <Route path="/halaman-buku/baca-buku/:id" element={<BacaBuku />} />
        <Route path="/halaman-video" element={<Video />} />
        <Route
          path="/halaman-video/detail-video/:id"
          element={<DetailVideo />}
        />
        <Route
          path="/halaman-video/detail-video/tonton-video/:id"
          element={<TontonVideo />}
        />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/tim-LiterasiKita" element={<TeamLiterasiKita />} />
        <Route path="/profile" element={<ProfileUser />} />
        <Route path="/halaman-donasi" element={<Donasi />} />
        <Route path="/halaman-donasi/donasi-uang" element={<DonasiUang />} />
        <Route path="/halaman-donasi/donasi-uang/payment" element={<Payment />} />
        <Route  path="/halaman-donasi/donasi-barang" element={<DonasiBarang />} />
        <Route path="/halaman-donasi-buku" element={<DonasiBuku />} />
        <Route path="/halaman-donasi-video" element={<DonasiVideo />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;

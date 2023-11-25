import { Route, Routes } from "react-router-dom";
import Homepage from "./pages/Homepage";
import Buku from "./pages/Halaman-Buku/Buku";
import DetailBuku from "./pages/Halaman-Buku/DetailBuku";
import BacaBuku from "./pages/Halaman-Buku/BacaBuku";
import Video from "./pages/Halaman-Video/Video";
import DetailVideo from "./pages/Halaman-Video/DetailVideo";
import TontonVideo from "./pages/Halaman-Video/TontonVideo";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";

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
      </Routes>
      <Footer />
    </>
  );
}

export default App;

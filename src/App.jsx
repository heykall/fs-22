import { Route, Routes } from "react-router-dom";
import Homepage from "./pages/Homepage";
import Video from "./pages/Halaman-Video/Video";
import DetailVideo from "./pages/Halaman-Video/DetailVideo";
import TontonVideo from "./pages/Halaman-Video/TontonVideo";
import Footer from "./components/Footer";

function App() {
  return (
    <>
      {/* routing halaman */}
      <Routes>
        <Route path="/" element={<Homepage />} />
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
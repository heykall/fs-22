import { Route, Routes } from "react-router-dom";
import Homepage from "./pages/Homepage";
import Video from "./pages/Halaman-Video/Video";
import DetailVideo from "./pages/Halaman-Video/DetailVideo";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/halaman-video" element={<Video />} />
        <Route
          path="/halaman-video/detail-video/:id"
          element={<DetailVideo />}
        />
      </Routes>
    </>
  );
}

export default App;

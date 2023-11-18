import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Navbar } from "react-bootstrap";
import Homepage from "./pages/Homepage";
import Buku from "./pages/Halaman-Buku/Buku";
import BacaBuku from "./pages/Halaman-Buku/BacaBuku"
import DetailBuku from "./pages/Halaman-Buku/DetailBuku";

import Video from "./pages/Halaman-Video/Video";
import DetailVideo from "./pages/Halaman-Video/DetailVideo";
import TontonVideo from "./pages/Halaman-Video/TontonVideo";
import Footer from "./components/Footer";
import Register from "./pages/Register";
import Login from "./pages/Login";

function App() {
  return (
      <>
        {/* routing halaman */}
        <Navbar />
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/halaman-buku" element={<Buku />} />
          <Route path="/halaman-buku/detail-buku/:id" element={<DetailBuku />} />
          <Route path="/halaman-buku/baca-buku/:id" element={<BacaBuku />} />
          <Route path="/halaman-video" element={<Video />} />
          <Route path="/halaman-video/detail-video/:id" element={<DetailVideo />} />
          <Route path="/halaman-video/detail-video/tonton-video/:id" element={<TontonVideo />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
        </Routes>
        <Footer />
      </>
  );
}

export default App;

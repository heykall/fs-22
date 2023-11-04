import React from 'react';
import { Routes, Route } from "react-router-dom";

// Navbar & Footer
import Navbar from './components/Navbar';
// import Footer from './components/Footer';

// Bagian Beranda
import Homepage from './pages/Homepage';
// import TimLiterasiKita from './pages/TimLiterasiKita';

// Bagian Halaman Buku
import BookCard from './pages/Halaman-Buku/components/BookCard';
import Buku from './pages/Halaman-Buku/Buku';
import DetailBuku from './pages/Halaman-Buku/DetailBuku';
import BacaBuku from './pages/Halaman-Buku/BacaBuku';

// Bagian Halaman Video
// import Video from './pages/Halaman-Video/Video';
// import DetailVideo from './pages/Halaman-Video/DetailVideo';
// import TontonVideo from './pages/Halaman-Video/TontonVideo';

// Bagian Halaman Donasi
// import Donasi from './pages/Halaman-Donasi/Donasi';
// import DonasiUang from './pages/Halaman-Donasi/Donasi-Uang/DonasiUang';
// import DetailDonasiUang from './pages/Halaman-Donasi/Donasi-Uang/DetailDonasiUang';
// import Payment from './pages/Halaman-Donasi/Donasi-Uang/Payment';
// import DonasiBarang from './pages/Halaman-Donasi/Donasi-Barang/DonasiBarang';
// import DetailDonasiBarang from './pages/Halaman-Donasi/Donasi-Barang/DetailDonasiBarang';
// import UploadBarang from './pages/Halaman-Donasi/Donasi-Barang/UploadBarang';

// Bagian Auth
// import ProfileUser from './pages/ProfileUser';
// import Login from './pages/Login';
// import Register from './pages/Register';
// import ResetPassword from './pages/ResetPassword';
// import LupaPassword from './pages/LupaPassword';

// Bagian Admin
// import DashboardAdmin from './pages/DashboardAdmin';

function App() {
  // const [isLoggedIn, setIsLoggedIn] = useState(false);
  // const location = useLocation();

  // const isNavbarVisible = location.pathname !== "/login" && location.pathname !== "/daftar";
  // const isFooterVisible = location.pathname !== "/login" && location.pathname !== "/daftar";
  return (
    <>
    <Navbar />
      <div>
        {/* {isNavbarVisible && (<Navbar userType={isLoggedIn} setIsLoggedIn={setIsLoggedIn} /> )} */}
         <Routes>
          <Route path="/" exact element={<Homepage/>} />
          {/* <Route path="/tim-literasi-kita" element={TimLiterasiKita} /> */}
          <Route path="/book-card" element={<BookCard />} />
          <Route path="/halaman-buku" element={<Buku/>} />
          <Route path="/halaman-buku/:id" element={<DetailBuku/>} />
          <Route path="/baca-buku/:id" element={<BacaBuku/>} />
          {/* <Route path="/halaman-video" exact element={Video} />
          <Route path="/halaman-video/:id" element={DetailVideo} />
          <Route path="/tonton-video/:id" element={TontonVideo} />
          <Route path="/halaman-donasi" exact element={Donasi} />
          <Route path="/halaman-donasi/donasi-uang" exact element={DonasiUang} />
          <Route path="/halaman-donasi/donasi-uang/:id" element={DetailDonasiUang} />
          <Route path="/halaman-donasi/donasi-uang/:id/payment" element={Payment} />
          <Route path="/halaman-donasi/donasi-barang" exact element={DonasiBarang} />
          <Route path="/halaman-donasi/donasi-barang/:id" element={DetailDonasiBarang} />
          <Route path="/halaman-donasi/donasi-barang/:id/upload" element={UploadBarang} />
          <Route path="/auth/profile" element={ProfileUser} />
          <Route path="/auth/login" element={Login} />
          <Route path="/auth/register" element={Register} />
          <Route path="/auth/reset-password" element={ResetPassword} />
          <Route path="/auth/lupa-password" element={LupaPassword} />
          <Route path="/admin/dashboard" element={DashboardAdmin} /> */}
         </Routes>
        {/* {isFooterVisible && (<Footer userType={isLoggedIn} setIsLoggedIn={setIsLoggedIn} /> )} */}
      </div>
    </>
  );
}

export default App;

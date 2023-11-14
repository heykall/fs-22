import { Route, Routes } from "react-router-dom";
import Homepage from "./pages/Homepage";
import Footer from "./components/Footer";

function App() {
  return (
    <>
      {/* routing halaman */}
      <Routes>
        <Route path="/" element={<Homepage />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;

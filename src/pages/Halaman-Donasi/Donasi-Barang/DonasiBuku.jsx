import { Container, Row, Col, Form, Button } from "react-bootstrap";
import axios from "axios";
import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function DonasiBuku() {
  const dataLocalStorage = localStorage.getItem("data");
  const userData = JSON.parse(dataLocalStorage);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    author: "",
    tahun_terbit: "",
    rating: "",
    star: "",
    category: "-- Pilih kategori --",
    bookFile: null,
    imageFile: null,
  });

  const handleFileChange = (e) => {
    const { id, files } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [id]: files[0],
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();

      formData.append("title", formData.title);
      formData.append("description", formData.description);
      formData.append("author", formData.author);
      formData.append("tahun_terbit", formData.tahun_terbit);
      formData.append("rating", formData.rating);
      formData.append("star", formData.star);
      formData.append("category", formData.category);
      formData.append("book_url", formData.bookFile);
      formData.append("img_url", formData.imageFile);

      const config = {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${userData.token}`,
        },
        withCredentials: true,
      };

      const response = await axios.post(
        `http://localhost:3000/donasi/donasibuku/${userData._id}`,
        formData,
        config
      );

      toast.success("Donasi buku berhasil!");

      // Reset form after successful donation
      setFormData({
        title: "",
        description: "",
        author: "",
        tahun_terbit: "",
        rating: "",
        star: "",
        category: "-- Pilih kategori --",
        bookFile: null,
        imageFile: null,
      });
    } catch (error) {
      console.error("Error:", error);
      toast.error("Gagal donasi buku");
    }
  };

  return (
    <>
      <ToastContainer />
      <Container className="mt-5 mb-5">
        <Row>
          <h1>Halaman Donasi Buku</h1>
        </Row>
        <Row className="mt-3">
          <Form onSubmit={handleSubmit}>
            <Row>
              <Col lg={6}>
                <Form.Group className="mb-3">
                  <Form.Label htmlFor="judul_buku">Judul Buku</Form.Label>
                  <Form.Control
                    type="text"
                    id="title"
                    onChange={(e) =>
                      setFormData({ ...formData, title: e.target.value })
                    }
                    value={formData.title}
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label htmlFor="penerbit_buku">Penerbit Buku</Form.Label>
                  <Form.Control type="text" id="penerbit_buku" />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label htmlFor="deskripsi_buku">
                    Deskripsi Buku
                  </Form.Label>
                  <Form.Control as="textarea" id="deskripsi_buku" />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label htmlFor="kategori_buku">Kategori Buku</Form.Label>
                  <Form.Select
                    id="kategori_buku"
                    defaultValue="-- Pilih kategori --"
                  >
                    <option disabled>-- Pilih kategori --</option>
                    <option>Akademik</option>
                    <option>Seni dan Budaya</option>
                    <option>Anak - anak</option>
                    <option>Sains dan Teknologi</option>
                    <option>Bahasa</option>
                  </Form.Select>
                </Form.Group>
              </Col>
              <Col lg={6}>
                <Form.Group className="mb-3">
                  <Form.Label htmlFor="upload-buku">Upload Buku</Form.Label>
                  <Form.Control
                    id="bookFile"
                    type="file"
                    onChange={handleFileChange}
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label htmlFor="upload-img">Upload Gambar</Form.Label>
                  <Form.Control
                    id="imageFile"
                    type="file"
                    onChange={handleFileChange}
                  />
                </Form.Group>
              </Col>
            </Row>
            <Row className="mb-5">
              <div className="mt-4 mb-5">
                <Button
                  type="submit"
                  className="btn btn-light text-white rounded-5"
                  style={{ backgroundColor: "#29AB92" }}
                >
                  Submit
                </Button>
              </div>
            </Row>
          </Form>
        </Row>
      </Container>
    </>
  );
}

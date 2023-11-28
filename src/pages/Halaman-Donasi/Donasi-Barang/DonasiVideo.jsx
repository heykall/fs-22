import axios from "axios";
import { useState } from "react";
import { Container, Row, Col, Form, Button, Spinner } from "react-bootstrap";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function DonasiVideo() {
  const dataLocalStorage = localStorage.getItem("data");
  const userData = JSON.parse(dataLocalStorage);
  const [dataDonasi, setDataDonasi] = useState({
    title: "",
    description: "",
    author: "",
    category: "",
    file: null,
  });

  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    const { id, value, files } = e.target;
    setDataDonasi((prevData) => ({
      ...prevData,
      [id]: id === "file" ? files[0] : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setIsLoading(true);

      const formData = new FormData();
      formData.append("title", dataDonasi.title);
      formData.append("description", dataDonasi.description);
      formData.append("author", dataDonasi.author);
      formData.append("category", dataDonasi.category);
      formData.append("file", dataDonasi.file);
      const config = {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${userData.token}`,
        },
        withCredentials: true,
      };

      // const response = await axios.post(
      //   `https://rich-eel-blazer.cyclic.app/donasi/donasivideo/${userData._id}`,
      //   formData,
      //   config
      // );
      const response = await axios.post(
        `http://localhost:3000/donasi/donasivideo/${userData._id}`,
        formData,
        config
      );

      toast.success("Donasi berhasil!");

      // Reset form setelah donasi berhasil
      setDataDonasi({
        title: "",
        description: "",
        author: "",
        category: "",
        file: null,
      });
    } catch (error) {
      console.error("Error:", error);
      toast.error("Gagal donasi");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <ToastContainer />
      <Container className="mt-5 mb-5">
        <Row>
          <h1>Halaman Donasi Video</h1>
        </Row>
        <Row className="mt-3">
          <Form onSubmit={handleSubmit}>
            <Row>
              <Col lg={6}>
                <Form.Group className="mb-3">
                  <Form.Label htmlFor="judul-video">Judul Video</Form.Label>
                  <Form.Control
                    type="text"
                    id="title"
                    onChange={handleChange}
                    value={dataDonasi.title}
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label htmlFor="author-video">Author Video</Form.Label>
                  <Form.Control
                    type="text"
                    id="author"
                    onChange={handleChange}
                    value={dataDonasi.author}
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label htmlFor="deskripsi-buku">
                    Deskripsi Video
                  </Form.Label>
                  <Form.Control
                    as="textarea"
                    id="description"
                    onChange={handleChange}
                    value={dataDonasi.description}
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label htmlFor="jenis-video">Kategori Video</Form.Label>
                  <Form.Select
                    id="category"
                    onChange={handleChange}
                    value={dataDonasi.category}
                  >
                    <option>-- Pilih kategori --</option>
                    <option>Akademik</option>
                    <option>Terpopuler</option>
                    <option>Lainnya</option>
                  </Form.Select>
                </Form.Group>
              </Col>
              <Col lg={6}>
                <Form.Group className="mb-3">
                  <Form.Label htmlFor="upload-video">Upload Video</Form.Label>
                  <Form.Control type="file" id="file" onChange={handleChange} />
                </Form.Group>
              </Col>
            </Row>
            <Row className="mb-5">
              <div className="mt-4 mb-5">
                <Button
                  type="submit"
                  className="btn btn-light text-white rounded-5"
                  style={{ backgroundColor: "#29AB92" }}
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <>
                      <Spinner animation="border" size="sm" className="me-2" />
                    </>
                  ) : (
                    "Submit"
                  )}
                </Button>
              </div>
            </Row>
          </Form>
        </Row>
      </Container>
    </>
  );
}

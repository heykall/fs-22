import { Container, Row, Col, Form, Button, Spinner } from "react-bootstrap";
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
    rating: "1.0/5",
    star: "⭐⭐⭐",
    category: "-- Pilih kategori --",
    bookFile: null,
    imageFile: null,
  });

  const [isLoading, setIsLoading] = useState(false);

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
      setIsLoading(true);

      const data = new FormData();
      data.append("title", formData.title);
      data.append("description", formData.description);
      data.append("author", formData.author);
      data.append("tahun_terbit", formData.tahun_terbit);
      data.append("rating", formData.rating);
      data.append("star", formData.star);
      data.append("category", formData.category);
      data.append("book_url", formData.bookFile);
      data.append("img_url", formData.imageFile);

      const config = {
        headers: {
          "Content-Type": "multipart/form-data",
          "Access-Control-Allow-Origin": "*",
        },
      };

      console.log(formData);
      const response = await axios.post(
        `https://charming-cloak-boa.cyclic.app/donasi/donasibuku/${userData._id}`,
        data,
        config
      );

      console.log(response.data);
      toast.success("Donasi berhasil!");

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
      setTimeout(() => {
        window.location.reload();
      }, 3000);
    } catch (error) {
      console.error("Error:", error);
      toast.error("Gagal donasi buku");
    }
  };

  return (
    <>
      <div className="donasi-buku">
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
                    <Form.Label htmlFor="title">Judul Buku</Form.Label>
                    <Form.Control
                      type="text"
                      id="title"
                      onChange={(e) =>
                        setFormData({ ...formData, title: e.target.value })
                      }
                      value={formData.title}
                      required // Added HTML5 required attribute for validation
                    />
                  </Form.Group>
                  <Form.Group className="mb-3">
                    <Form.Label htmlFor="author">Penerbit Buku</Form.Label>
                    <Form.Control
                      type="text"
                      id="author"
                      onChange={(e) =>
                        setFormData({ ...formData, author: e.target.value })
                      }
                      value={formData.author}
                      required
                    />
                  </Form.Group>
                  <Form.Group className="mb-3">
                    <Form.Label htmlFor="author">Tahun Terbit</Form.Label>
                    <Form.Control
                      type="number"
                      id="tahun_terbit"
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          tahun_terbit: e.target.value,
                        })
                      }
                      value={formData.tahun_terbit}
                      required
                    />
                  </Form.Group>
                  <Form.Group className="mb-3">
                    <Form.Label htmlFor="description">
                      Deskripsi Buku
                    </Form.Label>
                    <Form.Control
                      as="textarea"
                      id="description"
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          description: e.target.value,
                        })
                      }
                      value={formData.description}
                      required
                    />
                  </Form.Group>
                  <Form.Group className="mb-3">
                    <Form.Label htmlFor="category">Kategori Buku</Form.Label>
                    <Form.Select
                      id="category"
                      value={formData.category}
                      onChange={(e) =>
                        setFormData({ ...formData, category: e.target.value })
                      }
                      required
                    >
                      <option>-- Pilih kategori --</option>
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
                    <Form.Label htmlFor="bookFile">Upload Buku</Form.Label>
                    <Form.Control
                      id="bookFile"
                      type="file"
                      onChange={handleFileChange}
                      accept=".pdf, .doc, .docx" // Example of limiting file types
                      required
                    />
                  </Form.Group>
                  <Form.Group className="mb-3">
                    <Form.Label htmlFor="imageFile">Upload Gambar</Form.Label>
                    <Form.Control
                      id="imageFile"
                      type="file"
                      onChange={handleFileChange}
                      accept="image/*" // Example of limiting file types to images
                      required
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
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <>
                        <Spinner
                          animation="border"
                          size="sm"
                          className="me-2"
                        />
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
      </div>
    </>
  );
}

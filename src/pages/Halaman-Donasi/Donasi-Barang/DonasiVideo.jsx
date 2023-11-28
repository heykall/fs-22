import React from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";

export default function DonasiVideo() {
  return (
    <>
      <Container className="mt-5 mb-5">
        <Row>
          <h1>Halaman Donasi Video</h1>
        </Row>
        <Row className="mt-3">
          <Form>
            <Row>
              <Col lg={6}>
                <Form.Group className="mb-3">
                  <Form.Label htmlFor="judul-video">Judul Video</Form.Label>
                  <Form.Control type="text" id="judul-video" />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label htmlFor="author-video">Author Video</Form.Label>
                  <Form.Control type="text" id="author-video" />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label htmlFor="deskripsi-buku">
                    Deskripsi Video
                  </Form.Label>
                  <Form.Control as="textarea" id="deskripsi-buku" />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label htmlFor="jenis-video">Kategori Video</Form.Label>
                  <Form.Select id="kategori-video">
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
                  <Form.Label htmlFor="upload-video">Upload Video</Form.Label>
                  <Form.Control id="upload-video" type="file" />
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

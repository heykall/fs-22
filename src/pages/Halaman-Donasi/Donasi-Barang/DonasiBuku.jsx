import React, { useState } from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";

export default function DonasiBuku() {
  return (
    <>
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
                  <Form.Control type="text" id="judul_buku" />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label htmlFor="penerbit_buku">Penerbit Buku</Form.Label>
                  <Form.Control type="text" id="penerbit_buku" />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label htmlFor="deskripsi_buku">Deskripsi Buku</Form.Label>
                  <Form.Control as="textarea" id="deskripsi_buku" />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label htmlFor="kategori_buku">Kategori Buku</Form.Label>
                  <Form.Select id="kategori_buku" defaultValue="-- Pilih kategori --">
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
                  <Form.Control id="upload-buku" type="file" onChange={handleFileChange} />
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
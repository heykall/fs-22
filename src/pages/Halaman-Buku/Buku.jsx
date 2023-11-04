import React, { useState } from 'react';
import { Container, Row, Col, InputGroup, FormControl, Dropdown, Button, Carousel } from 'react-bootstrap';
import { Search } from 'react-bootstrap-icons';

function Buku () {
  const [selectedFilter, setSelectedFilter] = useState('All');

  const searchBooks = () => {
    // Isi fungsi ini dengan logika pencarian buku Anda
    console.log(`Searching books with filter: ${selectedFilter}`);
  };

  const handleSelect = (selectedKey) => {
    setSelectedFilter(selectedKey);
    searchBooks();
  };

  return (
    <div>
    <Container className="mt-5">
      <Row className="justify-content-center">
        <InputGroup className="mb-3 w-75 mt-3">
          <Dropdown onSelect={handleSelect}>
            <Dropdown.Toggle variant="outline-dark" className="rounded-start-5 border border-black shadow-sm" id="dropdown-basic">
              {selectedFilter}
            </Dropdown.Toggle>
            <Dropdown.Menu>
              <Dropdown.Item eventKey="All">All</Dropdown.Item>
              <Dropdown.Item eventKey="Title">Title</Dropdown.Item>
              <Dropdown.Item eventKey="Author">Author</Dropdown.Item>
              <Dropdown.Item eventKey="Text">Text</Dropdown.Item>
              <Dropdown.Item eventKey="Subject">Subject</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
          <FormControl aria-label="Text input with dropdown button" className="border border-black border-end-0" id="search-input" />
          <Button variant="outline-secondary" className="border border-black rounded-end-5" id="search-button">
            <Search />
          </Button>
        </InputGroup>
      </Row>
      {/* {selectedFilter === 'All' && <AllBooks />}
      {selectedFilter === 'Title' && <TitleBooks />}
      {selectedFilter === 'Author' && <AuthorBooks />}
      {selectedFilter === 'Text' && <TextBooks />}
      {selectedFilter === 'Subject' && <SubjectBooks />} */}
    </Container>

    <div className="d-flex justify-content-around position-relative" style={{right: '-15px'}}>
        <Container className="mt-5">
          <Col xs={8} id="quoteCarousel" class="col-8 carousel slide rounded-3" style={{background: 'linear-gradient(to right, #044a5f, #00c3ff)', height: '180px'}}>
            <h3 className='text-white fs-5 fw-bold' >Motivasi Hari Ini</h3>
            <Carousel>
              <Carousel.Item>
                <p className="text-white fs-6 fw-semibold">"Di balik kesuksesan terciptanya sebuah produk, ada sebuah tim kuat di dalamnya."</p>
                <p className="text-white fs-6 fw-semibold">- Itadori Yuji</p>
              </Carousel.Item>
              <Carousel.Item>
                <p className="text-white fs-6 fw-semibold">"Kemampuan membaca adalah jendela dunia."</p>
                <p className="text-white fs-6 fw-semibold">- George Washington Carver</p>
              </Carousel.Item>
              <Carousel.Item>
                <p className="text-white fs-6 fw-semibold">"Literasi membuka pintu menuju pemahaman dan pemikiran yang mendalam"</p>
                <p className="text-white fs-6 fw-semibold">- Barack Obama</p>
              </Carousel.Item>
            </Carousel>
          </Col>
        </Container>

        <Container className="mt-5" style={{position: 'relative'}}>
          <div className="text-blue">
            <h3 className="rotated-text">Baru ditambahkan</h3>
          </div>
          <Row className="py-2 px-4 border border-primary-subtle border-2 rounded" style={{ width: '95%' }}>
            <Col xs={3} className="py-2 mx-2 border border-primary-subtle rounded" style={{ width: '148px' }}>
              {/* <img src="assets/Rekomendasi-buku-1.svg" alt="" /> */}
            </Col>
            <Col xs={3} className="py-2 px-2 mx-2 border border-primary-subtle rounded" style={{ width: '148px' }}>
              {/* <img src="assets/Rekomendasi-buku-2.svg" alt="" /> */}
            </Col>
            <Col xs={3} className="py-2 px-2 mx-2 border border-primary-subtle rounded" style={{ width: '148px' }}>
              {/* <img src="assets/Rekomendasi-buku-3.svg" alt="" /> */}
            </Col>
          </Row>
        </Container>
      </div>
    </div>
  );
}

export default Buku;
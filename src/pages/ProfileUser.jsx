import { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import readings from "../assets/svg/asset-readings.svg";
import contributions from "../assets/svg/asset-contribution.svg";
import styles from "./ProfileUser.module.css";
import axios from "axios";
import CardBuku from "../components/CardBuku";
import CardVideo from "../components/CardVideo";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
export default function ProfileUser() {
  const [totalBookmarks, setTotalBookmarks] = useState(0);
  const [donasi, setDonasi] = useState("0");
  const fileInputRef = useRef(null);
  const [videoIds, setVideoIds] = useState([]);
  const [bookIds, setBookIds] = useState([]);
  const [dataBooks, setDataBooks] = useState([]);
  const [dataVideos, setDataVideos] = useState([]);
  const [data, setData] = useState({
    nama: "",
    jenisKelamin: "",
    email: "",
    profileImage: "",
    noHp: "",
    bio: "",
  });
  const navigate = useNavigate();
  const dataLocalStorage = localStorage.getItem("data");
  const userData = JSON.parse(dataLocalStorage);

  const handleChange = (e) => {
    const { id, value } = e.target;
    setData((prevData) => ({
      ...prevData,
      [id]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();

      formData.append("profileImage", fileInputRef.current.files[0]);
      formData.append("nama", data.nama);
      formData.append("jenisKelamin", data.jenisKelamin);
      formData.append("email", data.email);
      formData.append("noHp", data.noHp);
      formData.append("bio", data.bio);

      const config = {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${userData.token}`,
        },
      };

      const dataEdit = await axios.put(
        `http://localhost:3000/users/edit-profile/${userData._id}`,
        formData,
        config
      );

      const { role, nama, jenisKelamin, _id, email, profileImage, bio, noHp } =
        dataEdit.data;

      const userUpdateData = {
        role,
        nama,
        jenisKelamin,
        email,
        profileImage,
        bio,
        noHp,
        _id,
      };

      localStorage.setItem("data", JSON.stringify(userUpdateData));
      toast.success("Update berhasil!");
      // setTimeout(() => {
      //   window.location.reload();
      // }, 3000);
    } catch (error) {
      toast.error("Update gagal");
    }
  };

  const getTotalDonasiByUser = async () => {
    try {
      const { data } = await axios.get(
        `http://localhost:3000/donasi/total-donasi/${userData._id}`
      );
      // console.log(data[0].total_donasi);
      setDonasi(data[0].total_donasi);
    } catch (error) {
      console.log(error);
    }
  };
  const getTotalBookmarks = async () => {
    try {
      const response = await axios.get(
        `http://localhost:3000/bookmark/user/total-bookmark/${userData._id}`
      );
      setTotalBookmarks(response.data.totalBookmarks);
    } catch (error) {
      console.error("Error fetching total bookmarks:", error.response);
    }
  };

  const getBookmarkByUser = async () => {
    try {
      const response = await axios.get(
        `http://localhost:3000/bookmark/user/data-bookmark/${userData._id}`
      );
      const videoIds = [];
      const bookIds = [];
      response.data.forEach((bookmark) => {
        if (bookmark.videoID) {
          videoIds.push(bookmark.videoID);
        }

        if (bookmark.bookID) {
          bookIds.push(bookmark.bookID);
        }
      });

      setVideoIds(videoIds);
      setBookIds(bookIds);
    } catch (error) {
      console.log(error);
    }
  };
  // console.log(dataBooks);
  // console.log(dataVideos);
  useEffect(() => {
    if (!userData) {
      navigate("/login");
    } else {
      setData({
        nama: userData.nama,
        jenisKelamin: userData.jenisKelamin,
        email: userData.email,
        profileImage: userData.profileImage,
        noHp: userData.noHp,
        bio: userData.bio,
      });
    }
  }, []);

  useEffect(() => {
    getBookmarkByUser();
    getTotalBookmarks();
    getTotalDonasiByUser();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      const videoData = [];
      const bookData = [];

      for (const videoId of videoIds) {
        try {
          const response = await axios.get(
            `http://localhost:3000/videos/${videoId}`
          );
          videoData.push(response.data);
        } catch (error) {
          console.error("Error fetching video data:", error);
        }
      }

      for (const bookId of bookIds) {
        try {
          const response = await axios.get(
            `http://localhost:3000/books/${bookId}`
          );
          bookData.push(response.data);
        } catch (error) {
          console.error("Error fetching book data:", error);
        }
      }

      setDataVideos(videoData);
      setDataBooks(bookData);
    };

    fetchData();
  }, [videoIds, bookIds]);
  return (
    <>
      <ToastContainer />
      <Container className="mt-5">
        <Row>
          <h2 className="text-center">Profile</h2>
        </Row>

        <Row className="justify-content-center mt-5">
          <Col md={6} className="d-flex justify-content-center">
            <div className={styles.photoContainer}>
              <div className={styles.roundedPhoto}>
                <img
                  id="previewPhoto"
                  src={data.profileImage}
                  alt="Preview"
                  className={styles.previewPhoto}
                />
              </div>
            </div>
          </Col>
        </Row>
        <Row className="justify-content-center mt-1 mb-5">
          <Col md={6} className="d-flex justify-content-center">
            <Form.Group className="mb-3">
              <Form.Label
                htmlFor="upload-button"
                className={styles.customfileupload}
              >
                Upload Foto
              </Form.Label>
              <Form.Control
                type="file"
                id="upload-button"
                ref={fileInputRef}
                style={{ display: "none" }}
              />
            </Form.Group>
          </Col>
        </Row>

        <Container>
          <Row className="justify-content-center align-items-center">
            <Col lg={4} md={4} sm={12}>
              <div
                className="bgWarna rounded p-3 text-center"
                id={styles.bgReadings}
              >
                <img className="img-fluid w-25" src={readings} alt="" />
                <div className="text-white fs-2 mt-3">{totalBookmarks}</div>
                <div className="text-white fs-2">Readings</div>
              </div>
            </Col>
            <Col lg={1} md={1} sm={3} className="col12 mt-2"></Col>
            <Col lg={4} md={4} sm={12}>
              <div
                className="bgWarna rounded p-3 text-center"
                id={styles.bgContributions}
              >
                <img className="img-fluid w-25" src={contributions} alt="" />
                <div className="text-white fs-2 mt-3">{donasi}</div>
                <div className="text-white fs-2">Contribution</div>
              </div>
            </Col>
          </Row>
        </Container>
        <br />
        <br />
        <br />
        <Container className="mt-5">
          <Form onSubmit={handleSubmit}>
            <Row>
              <Col lg={6} md={12} sm={12}>
                <Form.Group className="mb-3">
                  <Form.Label htmlFor="nama-lengkap">Nama lengkap</Form.Label>
                  <Form.Control
                    type="text"
                    id="nama"
                    value={data.nama}
                    placeholder="Masukkan nama lengkap Anda"
                    onChange={handleChange}
                  />
                </Form.Group>
              </Col>
              <Col lg={6} md={12} sm={12}>
                <Form.Group className="mb-3">
                  <Form.Label htmlFor="email">Email address</Form.Label>
                  <Form.Control
                    type="email"
                    id="email"
                    value={data.email}
                    placeholder="Masukkan email Anda"
                    onChange={handleChange}
                  />
                </Form.Group>
              </Col>
            </Row>
            <Row>
              <Col lg={6} md={12} sm={12}>
                <Form.Group className="mb-3">
                  <Form.Label htmlFor="jenis-kelamin">Jenis kelamin</Form.Label>
                  <Form.Select
                    id="jenisKelamin"
                    value={data.jenisKelamin}
                    onChange={handleChange}
                  >
                    <option value="pria">Pria</option>
                    <option value="wanita">Wanita</option>
                  </Form.Select>
                </Form.Group>
              </Col>
              <Col lg={6} md={12} sm={12}>
                <Form.Group className="mb-3">
                  <Form.Label htmlFor="no-tlp">No telepon</Form.Label>
                  <Form.Control
                    type="text"
                    id="noHp"
                    value={data.noHp}
                    placeholder="Masukkan no telepon Anda"
                    onChange={handleChange}
                  />
                </Form.Group>
              </Col>
            </Row>
            <Row>
              <Col>
                <Form.Group className="mb-3">
                  <Form.Label htmlFor="bio">Bio</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={3}
                    id="bio"
                    placeholder="Tuliskan bio Anda"
                    value={data.bio}
                    onChange={handleChange}
                  />
                </Form.Group>
              </Col>
            </Row>

            <Row className="justify-content-center">
              <Col>
                <div className="d-flex justify-content-center">
                  <Button
                    type="submit"
                    className="btn btn-light bgWarna text-white"
                    id={styles.bgupdateProfile}
                  >
                    Update Profile
                  </Button>
                </div>
              </Col>
            </Row>
          </Form>
        </Container>
        <h3 className="text-center mt-5 mb-3">Bookmark Buku</h3>
        {/* {console.log(dataBooks[0].data)} */}

        <Container
          className="mt-5 px-5 py-2"
          style={{ backgroundColor: "#81CDE5" }}
        >
          <div className="scroll-video row row-cols-1 row-cols-lg-4 row-cols-md-3 g-lg-4 overflow-x-auto d-flex flex-nowrap mt-2 mt-lg-0 mb-5">
            {dataBooks.map((item) => (
              <CardBuku key={item.data._id} book={item.data} />
              // console.log(item.data), console.log(item.data._id)
            ))}
          </div>
        </Container>
        <h3 className="text-center mt-5 mb-3">Bookmark Video</h3>
        <Container
          className="mt-5 px-5 py-2"
          style={{ backgroundColor: "#81CDE5" }}
        >
          <div className="scroll-video row row-cols-1 row-cols-lg-4 row-cols-md-3 g-lg-4 overflow-x-auto d-flex flex-nowrap mt-2 mt-lg-0 mb-5">
            {dataVideos.map((item) => (
              <CardVideo key={item.data._id} item={item.data} />
            ))}
          </div>
        </Container>
        <br />
        <br />
        <br />
        <br />
        <br />
      </Container>
    </>
  );
}

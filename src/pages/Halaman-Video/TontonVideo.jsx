import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ReactPlayer from "react-player";
import { Container } from "react-bootstrap";

export default function TontonVideo() {
  const { id } = useParams();
  const [dataById, setDataById] = useState([]);

  const getDataApiById = async () => {
    try {
      const response = await axios.get(
        `https://charming-cloak-boa.cyclic.app/videos/${id}`
      );
      const data = response.data.data;
      setDataById(data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    getDataApiById();
  }, []);

  return (
    <>
      <div className="tonton-video">
        <Container className="d-flex justify-content-center align-items-center text-center mt-5 mb-5">
          <ReactPlayer
            controls={true}
            url={dataById.url_unduh}
            width="90%"
            height="100%"
          />
        </Container>
      </div>
    </>
  );
}

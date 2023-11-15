import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export default function TontonVideo() {
  const { id } = useParams();
  const [dataById, setDataById] = useState([]);
  const getDataApiById = async () => {
    const response = await axios(
      `https://652d3ffcf9afa8ef4b271ed7.mockapi.io/Video/${id}`
    );
    const data = response.data;
    setDataById(data);
  };

  useEffect(() => {
    getDataApiById();
  }, []);

  return (
    <>
      <div className="container my-5 py-5 mx-auto" id="tonton-video">
        <div className="ratio ratio-16x9">
          <iframe
            src={dataById.url_video}
            title="YouTube video"
            allowFullScreen
          ></iframe>
        </div>
      </div>
    </>
  );
}

import { useEffect } from "react";
import { useParams } from "react-router-dom";
import ReactPlayer from "react-player";
import { Container } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { fetchApiVideoById } from "../../redux/reducers/videoReducer";

export default function TontonVideo() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { dataById } = useSelector((state) => state.video);
  // const [dataById, setDataById] = useState([]);

  // const getDataApiById = async () => {
  //   try {
  //     const response = await axios.get(`http://localhost:3000/videos/${id}`);
  //     const data = response.data.data;
  //     setDataById(data);
  //   } catch (error) {
  //     console.error("Error fetching data:", error);
  //   }
  // };

  useEffect(() => {
    // getDataApiById();
    dispatch(fetchApiVideoById(id));
  }, [dispatch]);

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

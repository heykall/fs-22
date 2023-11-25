import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";
export default function CardVideo({ item }) {
  const navigate = useNavigate();
  const handleClick = () => {
    // console.log(item.id);
    navigate(`/halaman-video/detail-video/${item._id}`);
    window.location.reload();
  };

  return (
    <>
      <div className="col-6">
        <div
          className=" card h-100 rounded-3"
          id="warna-card"
          onClick={handleClick}
        >
          <img
            src={item.url_thumbnail}
            className="card-img-top p-2 rounded-4"
            alt="..."
          />
          <div className="card-body">
            <h6 className="card-title">{item.title}</h6>
            <p id="font-card-detail" className="opacity-50 mb-1">
              {item.tanggal_upload}
            </p>
            <div className="d-flex align-items-baseline" id="font-card-detail">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="10"
                height="10"
                fill="none"
                className="bi bi-star-fill"
                viewBox="0 0 16 16"
              >
                <defs>
                  <linearGradient
                    id="star-gradient"
                    x1="0%"
                    y1="0%"
                    x2="0%"
                    y2="100%"
                  >
                    <stop offset="0%" style={{ stopColor: "#fffdee" }} />
                    <stop offset="100%" style={{ stopColor: "#ffee02" }} />
                  </linearGradient>
                </defs>
                <path
                  d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256"
                  fill="url(#star-gradient)"
                />
              </svg>
              <span className="ms-1">{item.likes}</span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

CardVideo.propTypes = {
  item: PropTypes.object,
};

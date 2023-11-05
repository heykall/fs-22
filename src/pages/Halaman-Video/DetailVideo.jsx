import { useParams } from "react-router-dom";

export default function DetailVideo() {
  const { id } = useParams();
  return <div>DetailVideo {id}</div>;
}

import axios from "axios";

const initialValue = {
  dataById: [],
  isLoading: false,
};

export default function videoReducer(state = initialValue, action) {
  switch (action.type) {
    case "START_FETCHING":
      return {
        ...state,
        isLoading: true,
      };
    case "GET_TODOBYID":
      return {
        ...state,
        dataById: action.payload,
        isLoading: false,
      };

    default:
      return state;
  }
}
export function startFetching() {
  return {
    type: "START_FETCHING",
  };
}

export function successGetApi(data) {
  return {
    type: "GET_TODOBYID",
    payload: data,
  };
}
export function fetchApiVideoById(id) {
  return async function (dispatch) {
    dispatch(startFetching());

    const response = await axios.get(`http://localhost:3000/videos/${id}`);
    const data = response.data.data;
    dispatch(successGetApi(data));
  };
}

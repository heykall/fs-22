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
    case "GET_VIDEOBYID":
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
    type: "GET_VIDEOBYID",
    payload: data,
  };
}
export function fetchApiVideoById(id) {
  return async function (dispatch) {
    dispatch(startFetching());

    const response = await axios.get(
      `https://charming-cloak-boa.cyclic.app/videos/${id}`
    );
    const data = response.data.data;
    dispatch(successGetApi(data));
  };
}

import axios from "axios";

const initialValue = {
  book: {},
  isLoading: false,
};

export default function bookReducer(state = initialValue, action) {
  switch (action.type) {
    case "START_FETCHING":
      return {
        ...state,
        isLoading: true,
      };
    case "GET_BOOKBYID":
      return {
        ...state,
        book: action.payload,
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
    type: "GET_BOOKBYID",
    payload: data,
  };
}
export function fetchApiBookById(id) {
  return async function (dispatch) {
    dispatch(startFetching());

    const response = await axios.get(
      `https://charming-cloak-boa.cyclic.app/books/${id}`
    );
    const data = response.data.data;
    dispatch(successGetApi(data));
  };
}

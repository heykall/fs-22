import { configureStore } from "@reduxjs/toolkit";
import videoReducer from "./reducers/videoReducer";
import bukuReducer from "./reducers/bukuReducer";
const store = configureStore({
  reducer: {
    video: videoReducer,
    book: bukuReducer,
  },
});

export default store;

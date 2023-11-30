import { configureStore } from "@reduxjs/toolkit";
import videoReducer from "./reducers/videoReducer";
const store = configureStore({
  reducer: {
    video: videoReducer,
  },
});

export default store;

import { configureStore } from "@reduxjs/toolkit"
import Reducer from "./mainsSlice";

const store = configureStore({
    reducer: Reducer
})

export default store;
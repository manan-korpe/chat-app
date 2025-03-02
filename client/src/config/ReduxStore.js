import { configureStore } from '@reduxjs/toolkit'
import userSlice from "../store/userSlice.js";

const Store =configureStore({
    reducer: {
        user:userSlice,
    },
  })

  export default Store
import { configureStore } from "@reduxjs/toolkit";
import menuReducer from "@/redux/slices/menuSlice";
import optionsReducer from "@/redux/slices/optionsSlice";
import userReducer from "@/redux/slices/userSlice";

export const store = configureStore({
  reducer: {
    menu: menuReducer,
    options: optionsReducer,
    users: userReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

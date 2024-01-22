import { MENU_ITEMS } from "@/constants";
import { createSlice } from "@reduxjs/toolkit";
export interface MenuState {
    activeMenuItem: string;
}
const initialState: MenuState = {
  activeMenuItem: MENU_ITEMS.BRUSH,
};

export const menuSlice = createSlice({
  name: "menu",
  initialState,
  reducers: {
    menuItemClick: (state, action) => {
      state.activeMenuItem = action.payload;
    },
  },
});

export const { menuItemClick } = menuSlice.actions;
export default menuSlice.reducer;

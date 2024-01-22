import { createSlice } from "@reduxjs/toolkit";

export interface OptionState {
  brushSize: number;
  brushColor: string;
}
const initialState: OptionState = {
  brushSize: 5,
  brushColor: "#000000",
};
export const optionsSlice = createSlice({
  name: "options",
  initialState,
  reducers: {
    brushSizeChange: (state, action) => {
      state.brushSize = action.payload;
    },
    brushColorChange: (state, action) => {
      state.brushColor = action.payload;
    },
  },
});

export const { brushSizeChange, brushColorChange } = optionsSlice.actions;
export default optionsSlice.reducer;

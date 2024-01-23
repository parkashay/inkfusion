import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface UserState {
  name: string;
  color: string;
}
const initialState: UserState[] = [];

export const userSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    setUsers: (state, action: PayloadAction<UserState[]>) => {
      // const users = action.payload;
      console.log(action.payload)
      if(action.payload.length > 0){
        state = action.payload
        return state
        console.log(state)
      }
     
    },
  },
});

export const { setUsers } = userSlice.actions;
export default userSlice.reducer;

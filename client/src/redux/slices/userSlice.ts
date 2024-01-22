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
      const users = action.payload;
      users.forEach((user) => {
        if (!state.find((stateUser) => stateUser.name === user.name)) {
          state.push(user);
        }
      });
    },
    updateUser: (state, action: PayloadAction<UserState>) => {
      const index = state.findIndex(
        (user) => user.name === action.payload.name
      );
      if (index !== -1) {
        state[index] = action.payload;
      }
    },
    removeUser: (state, action: PayloadAction<string>) => {
      return state.filter((user) => user.name !== action.payload);
    },
  },
});

export const { setUsers, removeUser } = userSlice.actions;
export default userSlice.reducer;

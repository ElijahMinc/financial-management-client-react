import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../store';
import { IUser, Nullable } from '../../types/types';

interface IUserState {
  user: Nullable<IUser>;
  isAuth: boolean;
}

// Define the initial state using that type
const initialState: IUserState = {
  user: null,
  isAuth: false,
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    login: (state, action: PayloadAction<IUser>) => {
      state.user = action.payload;
      state.isAuth = true;
    },
    logout: (state) => {
      state.user = null;
      state.isAuth = false;
    },
  },
});

export const { login, logout } = userSlice.actions;

// // Other code such as selectors can use the imported `RootState` type
// export const selectCount = (state: RootState) => state.counter.value;

export default userSlice.reducer;

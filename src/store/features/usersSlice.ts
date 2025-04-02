import {
  createSlice,
  createAsyncThunk,
  type PayloadAction,
  createSelector,
} from "@reduxjs/toolkit";
import type { User } from "@lib/interfaces";
import * as api from "@lib/api";
import { RootState } from "@store/store";

interface UsersState {
  users: User[];
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
  editingUserId: number | null;
  originalUserData: User | null;
  selectedUserId: number | null;
}

const initialState: UsersState = {
  users: [],
  status: "idle",
  error: null,
  editingUserId: null,
  originalUserData: null,
  selectedUserId: null,
};

export const fetchUsers = createAsyncThunk(
  "users/fetchUsers",
  async () => await api.getUsers()
);

export const updateUser = createAsyncThunk(
  "users/updateUser",
  async ({ userId, userData }: { userId: number; userData: Partial<User> }) =>
    await api.updateUser(userId, userData)
);

const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    setSelectedUserId: (state, action: PayloadAction<number>) => {
      state.selectedUserId = action.payload;
    },
    startEditingUser: (state, action: PayloadAction<number>) => {
      state.editingUserId = action.payload;
      state.originalUserData =
        state.users.find((user) => user.id === action.payload) || null;
    },
    cancelEditingUser: (state) => {
      if (state.editingUserId && state.originalUserData) {
        const index = state.users.findIndex(
          (user) => user.id === state.editingUserId
        );
        if (index !== -1) {
          state.users[index] = state.originalUserData;
        }
      }
      state.editingUserId = null;
      state.originalUserData = null;
    },
    updateUserLocal: (
      state,
      action: PayloadAction<{ userId: number; userData: Partial<User> }>
    ) => {
      const { userId, userData } = action.payload;
      const index = state.users.findIndex((user) => user.id === userId);
      if (index !== -1) {
        state.users[index] = { ...state.users[index], ...userData };
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.users = action.payload;
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message || "Failed to fetch users";
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        const updatedUser = action.payload;
        const index = state.users.findIndex(
          (user) => user.id === updatedUser.id
        );
        if (index !== -1) {
          state.users[index] = updatedUser;
        }
        state.editingUserId = null;
        state.originalUserData = null;
      });
  },
});

export const usersState = (state: RootState) => state.users;
export const users = createSelector(usersState, (state) => state.users);
export const getUser = (userId: number) =>
  createSelector(usersState, (state) => {
    return state.users.find((user) => user.id === userId);
  });
export const status = createSelector(usersState, (state) => state.status);
export const originalUserData = createSelector(
  usersState,
  (state) => state.originalUserData
);
export const { startEditingUser, cancelEditingUser, updateUserLocal } =
  usersSlice.actions;

export default usersSlice.reducer;

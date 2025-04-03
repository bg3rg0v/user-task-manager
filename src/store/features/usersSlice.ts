import {
  createSlice,
  createAsyncThunk,
  type PayloadAction,
} from "@reduxjs/toolkit";
import type { User } from "@lib/interfaces";
import * as api from "@lib/api";
import { RootState, StoreStatusType } from "@store/store";

interface UsersState {
  users: User[];
  error: boolean;
  editingUserId: number | null;
  originalUserData: User | null;
  selectedUserId: number | null;
  status: {
    fetchUsers: StoreStatusType;
    updateUser: StoreStatusType;
  };
}

const initialState: UsersState = {
  users: [],
  status: { fetchUsers: "idle", updateUser: "idle" },
  error: false,
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
  async (updatedUser: User) => await api.updateUser(updatedUser)
);

const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    setSelectedUserId: (state, action: PayloadAction<number>) => {
      state.selectedUserId = action.payload;
    },
    updateUserLocal: (state, action: PayloadAction<User>) => {
      const updatedUser = action.payload;
      const index = state.users.findIndex((user) => user.id === updatedUser.id);
      if (index !== -1) {
        state.users[index] = { ...state.users[index], ...updatedUser };
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.pending, (state) => {
        state.status.fetchUsers = "loading";
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.status.fetchUsers = "success";
        state.users = action.payload;
      })
      .addCase(fetchUsers.rejected, (state) => {
        state.status.fetchUsers = "failed";
        state.error = true;
      })
      .addCase(updateUser.pending, (state) => {
        state.status.updateUser = "loading";
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        state.status.updateUser = "success";
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

export const selectUsers = (state: RootState) => state.users.users;
export const selectError = (state: RootState) => state.users.error;
export const selectFetchUsersStatus = (state: RootState) =>
  state.users.status.fetchUsers;
export const selectUpdateUserStatus = (state: RootState) =>
  state.users.status.updateUser;

export const { updateUserLocal } = usersSlice.actions;

export default usersSlice.reducer;

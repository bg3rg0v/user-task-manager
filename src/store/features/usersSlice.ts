import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { User } from "@lib/interfaces";
import * as api from "@lib/api";
import { RootState, StoreStatusType } from "@store/store";

interface UsersState {
  users: User[];
  editingUserId: number | null;
  selectedUserId: number | null;
  status: {
    fetchUsers: StoreStatusType;
    updateUser: StoreStatusType;
  };
}

const initialState: UsersState = {
  users: [],
  status: { fetchUsers: "idle", updateUser: "idle" },
  editingUserId: null,
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
  reducers: {},
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
      })
      .addCase(updateUser.rejected, (state) => {
        state.status.updateUser = "failed";
      });
  },
});

export const selectUsers = (state: RootState) => state.users.users;
export const selectFetchUsersStatus = (state: RootState) =>
  state.users.status.fetchUsers;
export const selectUpdateUserStatus = (state: RootState) =>
  state.users.status.updateUser;

export default usersSlice.reducer;

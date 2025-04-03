import {
  createSlice,
  createAsyncThunk,
  type PayloadAction,
} from "@reduxjs/toolkit";
import { Task } from "@lib/interfaces";
import * as api from "@lib/api";
import { RootState, StoreStatusType } from "@store/store";

export interface TableFilters {
  statusFilter: "all" | "completed" | "incomplete";
  userIdFilter: number | number[] | null;
  titleFilter: string;
}

interface TasksState {
  tasks: Task[];
  filteredTasks: Task[];
  status: StoreStatusType;
  error: boolean;
  statusFilter: "all" | "completed" | "incomplete";
  userIdFilter: number | number[] | null;
  titleFilter: string;
  currentPage: number;
}

const initialState: TasksState = {
  tasks: [],
  filteredTasks: [],
  status: "idle",
  error: false,
  statusFilter: "all",
  titleFilter: "",
  userIdFilter: null,
  currentPage: 1,
};

export const fetchTasks = createAsyncThunk("tasks/fetchTasks", async () => {
  return await api.getTasks();
});

export const updateTaskStatus = createAsyncThunk(
  "tasks/updateTaskStatus",
  async ({ taskId, completed }: { taskId: number; completed: boolean }) => {
    return await api.updateTask(taskId, { completed });
  }
);

const tasksSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {
    setStatusFilter: (
      state,
      action: PayloadAction<"all" | "completed" | "incomplete">
    ) => {
      state.statusFilter = action.payload;
      state.currentPage = 1;
      applyFilters(state);
    },
    setTitleFilter: (state, action: PayloadAction<string>) => {
      state.titleFilter = action.payload;
      state.currentPage = 1;
      applyFilters(state);
    },
    setUserIdFilter: (state, action: PayloadAction<number | null>) => {
      state.userIdFilter = action.payload;
      state.currentPage = 1;
      applyFilters(state);
    },
    setCurrentPage: (state, action: PayloadAction<number>) => {
      state.currentPage = action.payload;
    },
    updateTaskLocal: (
      state,
      action: PayloadAction<{ taskId: number; completed: boolean }>
    ) => {
      const { taskId, completed } = action.payload;
      const taskIndex = state.tasks.findIndex((task) => task.id === taskId);
      if (taskIndex !== -1) {
        state.tasks[taskIndex].completed = completed;
      }
      applyFilters(state);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTasks.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchTasks.fulfilled, (state, action) => {
        state.status = "success";
        state.tasks = action.payload;
        applyFilters(state);
      })
      .addCase(fetchTasks.rejected, (state) => {
        state.status = "failed";
        state.error = true;
      })
      .addCase(updateTaskStatus.fulfilled, (state, action) => {
        const updatedTask = action.payload;
        const index = state.tasks.findIndex(
          (task) => task.id === updatedTask.id
        );
        if (index !== -1) {
          state.tasks[index] = updatedTask;
        }
        applyFilters(state);
      });
  },
});

const applyFilters = (state: TasksState) => {
  let filtered = [...state.tasks];

  if (state.statusFilter === "completed") {
    filtered = filtered.filter((task) => task.completed);
  } else if (state.statusFilter === "incomplete") {
    filtered = filtered.filter((task) => !task.completed);
  }

  if (state.userIdFilter !== null) {
    filtered = filtered.filter((task) => task.userId === state.userIdFilter);
  }

  if (state.titleFilter) {
    const titleLower = state.titleFilter.toLowerCase();
    filtered = filtered.filter((task) =>
      task.title.toLowerCase().includes(titleLower)
    );
  }

  state.filteredTasks = filtered;
};

export const selectAllTasks = (state: RootState) => state.tasks.tasks;
export const selectStatus = (state: RootState) => state.tasks.status;
export const selectError = (state: RootState) => state.tasks.error;
export const selectFilteredTasks = (state: RootState) =>
  state.tasks.filteredTasks;
export const selectStatusFilter = (state: RootState) =>
  state.tasks.statusFilter;
export const selectUserIdFilter = (state: RootState) =>
  state.tasks.userIdFilter;
export const selectTitleFilter = (state: RootState) => state.tasks.titleFilter;
export const selectCurrentPage = (state: RootState) => state.tasks.currentPage;

export const {
  setStatusFilter,
  setTitleFilter,
  setUserIdFilter,
  setCurrentPage,
  updateTaskLocal,
} = tasksSlice.actions;

export default tasksSlice.reducer;

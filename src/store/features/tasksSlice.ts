import {
  createSlice,
  createAsyncThunk,
  type PayloadAction,
  createSelector,
} from "@reduxjs/toolkit";
import { Task } from "@lib/interfaces";
import * as api from "@lib/api";
import { RootState } from "@store/store";

export interface TableFilters {
  status: "all" | "completed" | "incomplete";
  userId: number | number[] | null;
  // TODO: title
}

interface TasksState {
  tasks: Task[];
  filteredTasks: Task[];
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
  filters: TableFilters & { title: string };
  currentPage: number;
}

const initialState: TasksState = {
  tasks: [],
  filteredTasks: [],
  status: "idle",
  error: null,
  filters: {
    status: "all",
    title: "",
    userId: null,
  },
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
      state.filters.status = action.payload;
      state.currentPage = 1;
      applyFilters(state);
    },
    setTitleFilter: (state, action: PayloadAction<string>) => {
      state.filters.title = action.payload;
      state.currentPage = 1;
      applyFilters(state);
    },
    setUserIdFilter: (state, action: PayloadAction<number | null>) => {
      console.log(action);

      state.filters.userId = action.payload;
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
        state.status = "succeeded";
        state.tasks = action.payload;
        applyFilters(state);
      })
      .addCase(fetchTasks.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message || "Failed to fetch tasks";
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

  if (state.filters.status === "completed") {
    filtered = filtered.filter((task) => task.completed);
  } else if (state.filters.status === "incomplete") {
    filtered = filtered.filter((task) => !task.completed);
  }

  if (state.filters.userId !== null) {
    filtered = filtered.filter((task) => task.userId === state.filters.userId);
  }

  state.filteredTasks = filtered;
};

export const tasksState = (state: RootState) => state.tasks;
export const allTasks = createSelector(tasksState, (state) => state.tasks);
export const filteredTasks = createSelector(
  tasksState,
  (state) => state.filteredTasks
);
export const filters = createSelector(tasksState, (state) => state.filters);

export const {
  setStatusFilter,
  setTitleFilter,
  setUserIdFilter,
  setCurrentPage,
  updateTaskLocal,
} = tasksSlice.actions;

export default tasksSlice.reducer;

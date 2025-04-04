import {
  createSlice,
  createAsyncThunk,
  type PayloadAction,
  createSelector,
} from "@reduxjs/toolkit";
import { Task } from "@lib/interfaces";
import * as api from "@lib/api";
import { RootState, StoreStatusType } from "@store/store";

interface TasksState {
  tasks: Task[];
  filteredTasks: Task[];
  fetchTasksStatus: StoreStatusType;
  updateTaskId: number | null;
  statusFilter: "all" | "completed" | "incomplete";
  userIdFilter: number | null;
  titleFilter: string;
  currentPage: number;
}

const initialState: TasksState = {
  tasks: [],
  filteredTasks: [],
  fetchTasksStatus: "idle",
  updateTaskId: null,
  statusFilter: "all",
  titleFilter: "",
  userIdFilter: null,
  currentPage: 1,
};

export const fetchTasks = createAsyncThunk("tasks/fetchTasks", async () => {
  return await api.getTasks();
});

export const updateTask = createAsyncThunk(
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
    },
    setTitleFilter: (state, action: PayloadAction<string>) => {
      state.titleFilter = action.payload;
      state.currentPage = 1;
    },
    setUserIdFilter: (state, action: PayloadAction<number | null>) => {
      state.userIdFilter = action.payload;
      state.currentPage = 1;
    },
    resetAllFilters: (state) => {
      state.statusFilter = "all";
      state.titleFilter = "";
      state.userIdFilter = null;
      state.currentPage = 1;
    },
    setCurrentPage: (state, action: PayloadAction<number>) => {
      state.currentPage = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTasks.pending, (state) => {
        state.fetchTasksStatus = "loading";
      })
      .addCase(fetchTasks.fulfilled, (state, action) => {
        state.fetchTasksStatus = "success";
        state.tasks = action.payload;
      })
      .addCase(fetchTasks.rejected, (state) => {
        state.fetchTasksStatus = "failed";
      })
      .addCase(updateTask.rejected, (state) => {
        state.updateTaskId = null;
      })
      .addCase(updateTask.pending, (state, action) => {
        state.updateTaskId = action.meta.arg.taskId;
      })
      .addCase(updateTask.fulfilled, (state, action) => {
        state.updateTaskId = null;
        const updatedTask = action.payload;
        const index = state.tasks.findIndex(
          (task) => task.id === updatedTask.id
        );
        if (index !== -1) {
          state.tasks[index] = updatedTask;
        }
      });
  },
});

export const selectFetchTasksStatus = (state: RootState) =>
  state.tasks.fetchTasksStatus;
export const selectStatusFilter = (state: RootState) =>
  state.tasks.statusFilter;
export const selectUserIdFilter = (state: RootState) =>
  state.tasks.userIdFilter;
export const selectTitleFilter = (state: RootState) => state.tasks.titleFilter;
export const selectCurrentPage = (state: RootState) => state.tasks.currentPage;
export const selectTaskUpdateId = (state: RootState) =>
  state.tasks.updateTaskId;
export const selectIsFilterApplied = createSelector(
  [selectStatusFilter, selectUserIdFilter, selectTitleFilter],
  (statusFilter, userIdFilter, titleFilter) => {
    return (
      statusFilter !== "all" || userIdFilter !== null || titleFilter !== ""
    );
  }
);

export const selectFilteredTasks = createSelector(
  [
    (state: RootState) => state.tasks.tasks,
    (state: RootState) => state.tasks.statusFilter,
    (state: RootState) => state.tasks.userIdFilter,
    (state: RootState) => state.tasks.titleFilter,
  ],
  (tasks, statusFilter, userIdFilter, titleFilter) => {
    let filtered = [...tasks];

    if (statusFilter === "completed") {
      filtered = filtered.filter((task) => task.completed);
    } else if (statusFilter === "incomplete") {
      filtered = filtered.filter((task) => !task.completed);
    }

    if (userIdFilter !== null) {
      filtered = filtered.filter((task) => task.userId === userIdFilter);
    }

    if (titleFilter) {
      const titleLower = titleFilter.toLowerCase();
      filtered = filtered.filter((task) =>
        task.title.toLowerCase().includes(titleLower)
      );
    }

    return filtered;
  }
);

export const {
  setStatusFilter,
  setTitleFilter,
  setUserIdFilter,
  setCurrentPage,
  resetAllFilters,
} = tasksSlice.actions;

export default tasksSlice.reducer;

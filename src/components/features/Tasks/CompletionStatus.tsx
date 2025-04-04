import LoadingSpinner from "@components/ui/LoadingSpinner";
import { Task } from "@lib/interfaces";
import { updateTask, selectTaskUpdateId } from "@store/features/tasksSlice";
import { useAppDispatch, useAppSelector } from "@store/hooks";
import { Checkbox, CheckboxChangeEvent } from "antd";
import { useNotificationContext } from "~/context/useNotificationContext";

const CompletionStatus = ({ task }: { task: Task }) => {
  const dispatch = useAppDispatch();
  const { notification } = useNotificationContext();
  const updateTaskId = useAppSelector(selectTaskUpdateId);

  const isUpdateTaskLoading = updateTaskId === task.id;

  const handleTaskStatusChange = async (task: Task, e: CheckboxChangeEvent) => {
    const completed = e.target.checked;

    try {
      const resultAction = await dispatch(
        updateTask({ taskId: task.id, completed })
      );

      if (updateTask.fulfilled.match(resultAction)) {
        notification(
          `Task ${task.id} ${completed ? "completed" : "status updated"}`,
          completed ? "success" : "info"
        );
      } else {
        const errorMessage =
          resultAction.error.message || "Failed to update task status";
        notification(`Error: ${errorMessage}`, "error");
      }
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "Unknown error occurred";
      notification(`Error: ${errorMessage}`, "error");
    }
  };

  return isUpdateTaskLoading ? (
    <LoadingSpinner size="small" />
  ) : (
    <Checkbox
      checked={task.completed}
      onChange={(e) => handleTaskStatusChange(task, e)}
      disabled={isUpdateTaskLoading}
    />
  );
};

export default CompletionStatus;

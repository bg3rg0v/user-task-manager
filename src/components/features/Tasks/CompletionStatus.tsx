import LoadingSpinner from "@components/ui/LoadingSpinner";
import { Task } from "@lib/interfaces";
import { updateTask, selectTaskUpdateId } from "@store/features/tasksSlice";
import { useAppDispatch, useAppSelector } from "@store/hooks";
import { Checkbox, type CheckboxChangeEvent } from "antd";
import { useNotificationContext } from "~/context/useNotificationContext";

const CompletionStatus = ({ task }: { task: Task }) => {
  const dispatch = useAppDispatch();
  const { notification } = useNotificationContext();
  const updateTaskId = useAppSelector(selectTaskUpdateId);
  const isUpdateTaskLoading = updateTaskId === task.id;

  const handleTaskStatusChange = async (task: Task, e: CheckboxChangeEvent) => {
    const completed = e.target.checked;
    await dispatch(updateTask({ taskId: task.id, completed }));
    notification(
      `Task ${task.id} ${completed ? "completed" : "status updated"}`,
      completed ? "success" : "info"
    );
  };

  return isUpdateTaskLoading ? (
    <LoadingSpinner size="small" />
  ) : (
    <Checkbox
      checked={task.completed}
      onChange={async (e) => {
        try {
          await handleTaskStatusChange(task, e);
        } catch (error) {
          console.log(error);
        }
      }}
      disabled={isUpdateTaskLoading}
    />
  );
};

export default CompletionStatus;

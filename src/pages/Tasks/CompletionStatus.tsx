import { Task } from "@lib/interfaces";
import { updateTaskLocal, updateTaskStatus } from "@store/features/tasksSlice";
import { useAppDispatch } from "@store/hooks";
import { Checkbox, CheckboxChangeEvent } from "antd";
import { useNotificationContext } from "~/context/useNotificationContext";

const CompletionStatus = ({ task }: { task: Task }) => {
  const dispatch = useAppDispatch();
  const { notification } = useNotificationContext();

  const handleTaskStatusChange = (task: Task, e: CheckboxChangeEvent) => {
    const completed = e.target.checked;
    dispatch(updateTaskLocal({ taskId: task.id, completed }));
    dispatch(updateTaskStatus({ taskId: task.id, completed }));
    notification(
      `Task ${task.id} ${completed ? "completed" : "status updated"}`,
      completed ? "success" : "info"
    );
  };

  return (
    <Checkbox
      checked={task.completed}
      onChange={(e) => handleTaskStatusChange(task, e)}
    />
  );
};

export default CompletionStatus;

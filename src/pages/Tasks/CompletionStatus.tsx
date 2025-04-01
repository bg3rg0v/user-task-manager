import { Task } from "@lib/interfaces";
import { updateTaskLocal, updateTaskStatus } from "@store/features/tasksSlice";
import { useAppDispatch } from "@store/hooks";
import { Checkbox, CheckboxChangeEvent } from "antd";

const CompletionStatus = ({ task }: { task: Task }) => {
  const dispatch = useAppDispatch();

  const handleTaskStatusChange = (task: Task, e: CheckboxChangeEvent) => {
    const completed = e.target.checked;
    dispatch(updateTaskLocal({ taskId: task.id, completed }));
    dispatch(updateTaskStatus({ taskId: task.id, completed }));
  };

  return (
    <Checkbox
      checked={task.completed}
      onChange={(e) => handleTaskStatusChange(task, e)}
    />
  );
};

export default CompletionStatus;

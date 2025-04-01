import { Task, User } from "@lib/interfaces";
import { TableColumnsType } from "antd";
import CompletionStatus from "./CompletionStatus";

export const getTableColumns = (
  users: User[],
  tasks: Task[]
): TableColumnsType<Task> => [
  {
    title: "Name",
    dataIndex: "userId",
    key: "userId",
    filterMultiple: false,
    filters: users.map((user) => ({ text: user.name, value: user.id })),
    filterSearch: true,
    onFilter: (userId, record) => {
      const user = users.find((user) => user.id === userId);
      if (!user) return false;
      return record.userId === user.id;
    },
    render: (userId: number) => {
      const user = users.find((u) => u.id === userId);
      return <span>{user ? user.name : `User ${userId}`}</span>;
    },
  },
  // TODO: title filtering in progress
  {
    title: "Task",
    dataIndex: "title",
    key: "title",
    filterSearch: true,
    filterMultiple: false,
    filters: tasks.map((task: Task) => ({
      text: task.title,
      value: task.title,
    })),
    onFilter: (value, record) =>
      record.title
        .toString()
        .toLowerCase()
        .includes((value as string).toLowerCase()),
    render: (_: string, task) => <span>{task.title}</span>,
  },
  {
    title: "Status",
    align: "center",
    dataIndex: "completed",
    key: "status",
    filters: [
      { text: "Completed", value: true },
      { text: "Not Completed", value: false },
    ],
    onFilter: (value, task) => {
      return task.completed === value;
    },
    filterMultiple: false,
    width: 80,
    render: (_: boolean, task) => <CompletionStatus task={task} />,
  },
];

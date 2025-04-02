import { Task, User } from "@lib/interfaces";
import { TableColumnsType, TableColumnType } from "antd";
import CompletionStatus from "./CompletionStatus";
import { SearchOutlined } from "@ant-design/icons";
import TableSearch from "./TableSearch";

export type DataIndex = keyof Task;
const getColumnSearchProps = (
  dataIndex: DataIndex,
  handleSearch: (selectedKeys: string[], confirmCallBack: () => void) => void
): TableColumnType<Task> => ({
  filterDropdown: ({
    setSelectedKeys,
    selectedKeys,
    confirm,
    clearFilters,
    close,
  }) => (
    <TableSearch
      dataIndex={dataIndex}
      selectedKeys={selectedKeys}
      setSelectedKeys={setSelectedKeys}
      confirm={confirm}
      close={close}
      clearFilters={clearFilters}
      handleSearch={handleSearch}
    />
  ),
  filterIcon: (filtered: boolean) => (
    <SearchOutlined style={{ color: filtered ? "#1677ff" : undefined }} />
  ),
  onFilter: (value, record) =>
    record[dataIndex]
      .toString()
      .toLowerCase()
      .includes((value as string).toLowerCase()),
  render: (text) => (
    <div style={{ backgroundColor: "#ffc069", padding: 0 }}>
      {text}
      {"searchText"}
    </div>
  ),
});

export const getTableColumns = (
  users: User[],
  handleSearch: (selectedKeys: string[], confirmCallBack: () => void) => void
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
  {
    title: "Task",
    dataIndex: "title",
    key: "title",
    ...getColumnSearchProps("title", handleSearch),
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

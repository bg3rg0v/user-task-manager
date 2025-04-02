import { Task, User } from "@lib/interfaces";
import { TableColumnsType, TableColumnType } from "antd";
import CompletionStatus from "./CompletionStatus";
import { SearchOutlined } from "@ant-design/icons";
import TableSearch from "./TableSearch";

export type DataIndex = keyof Task;
const getColumnSearchProps = (dataIndex: DataIndex): TableColumnType<Task> => ({
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
  // filterDropdownProps: {
  //   onOpenChange(open) {
  //     if (open) {
  //       setTimeout(() => searchInput.current?.select(), 100);
  //     }
  //   },
  // },
  render: (text) => (
    <div
      style={{ backgroundColor: "#ffc069", padding: 0 }}
      // searchWords={[searchText]}
      // autoEscape
      // textToHighlight={text ? text.toString() : ""}
    >
      {text}
      {"searchText"}
    </div>
  ),
});

export const getTableColumns = (users: User[]): TableColumnsType<Task> => [
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
    ...getColumnSearchProps("title"),
    // filterSearch: true,
    // filterMultiple: false,
    // filters: tasks.map((task: Task) => ({
    //   text: task.title,
    //   value: task.title,
    // })),
    // onFilter: (value, record) =>
    //   record.title
    //     .toString()
    //     .toLowerCase()
    //     .includes((value as string).toLowerCase()),
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

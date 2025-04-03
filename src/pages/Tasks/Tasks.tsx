import { Table } from "antd";
import { size } from "lodash";
import useTasksData from "./useTasksData";
import StatusWrapper from "@components/StatusWrapper";

const Tasks = () => {
  const {
    columns,
    isError,
    isLoading,
    currentPage,
    filteredTasks,
    handleTableChange,
  } = useTasksData();

  return (
    <StatusWrapper loading={isLoading} error={isError}>
      <Table
        bordered
        dataSource={filteredTasks.map((task) => ({
          ...task,
          key: `task-${task.id}`,
        }))}
        columns={columns}
        pagination={{
          align: "start",
          current: currentPage,
          pageSize: 10,
          total: size(filteredTasks),
          showSizeChanger: false,
        }}
        onChange={handleTableChange}
      />
    </StatusWrapper>
  );
};

export default Tasks;
